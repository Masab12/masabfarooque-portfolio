import type { Metadata } from 'next';
import { site } from '@/app/data/site';
import { getPost } from '@/app/data/posts';
import ArticleLayout, { articleSchema } from '@/app/components/blog/ArticleLayout';
import {
  H2,
  H3,
  P,
  Lede,
  UL,
  Code,
  Note,
  Takeaways,
  Table,
  ReadNext,
  Resources,
} from '@/app/components/blog/Prose';

const post = getPost('wordpress-as-headless-cms')!;

export const metadata: Metadata = {
  title: post.title,
  description: post.summary,
  alternates: { canonical: `${site.url}/blog/${post.slug}` },
  keywords: [
    'WordPress headless CMS',
    'headless WordPress Next.js',
    'WPGraphQL',
    'WordPress REST API Next.js',
    'headless CMS developer Islamabad',
  ],
  openGraph: {
    type: 'article',
    title: post.title,
    description: post.summary,
    url: `${site.url}/blog/${post.slug}`,
    publishedTime: post.published,
    authors: [site.url],
  },
};

export default function Page() {
  return (
    <>
      {articleSchema(post).map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <ArticleLayout post={post}>
        <Lede>
          Your writers do not need to lose their editor. They only need to stop serving the site
          from it.
        </Lede>

        <P>
          This is the setup I recommend most often, and it is the one people resist until they see
          it working. WordPress stays exactly as it is for whoever writes the content. Next.js
          reads from it over an API and publishes static pages. Visitors never touch WordPress at
          all.
        </P>

        <Takeaways
          items={[
            'WordPress becomes a private content database with a good editing interface. Nothing public runs on it.',
            'Use the REST API unless you need to fetch deeply nested data in one request, then use WPGraphQL.',
            'A webhook on save gives editors near instant publishing without rebuilding the whole site.',
            'Lock the WordPress install down properly, because it is now infrastructure rather than a website.',
          ]}
        />

        <H2 id="what-headless-means">What headless actually means here</H2>

        <P>
          A normal WordPress install does two jobs. It stores and edits content, and it renders that
          content into HTML for visitors. Headless means you keep the first job and delete the
          second.
        </P>

        <P>
          The theme stops mattering. Nobody sees it. WordPress runs somewhere quiet, often on a
          subdomain like <code>cms.example.com</code>, and the only things that talk to it are your
          build process and your editors. The public site is a set of static files on a CDN.
        </P>

        <Table
          head={['Job', 'Traditional WordPress', 'Headless with Next.js']}
          rows={[
            ['Writing and editing', 'WordPress admin', 'WordPress admin, unchanged'],
            ['Storing content', 'MySQL', 'MySQL, unchanged'],
            ['Rendering HTML', 'PHP theme, per request', 'Next.js, once at build'],
            ['Serving visitors', 'PHP and MySQL on every hit', 'Static files from a CDN edge'],
            ['Public attack surface', 'The whole WordPress install', 'Static files only'],
          ]}
          caption="Only the bottom three rows change. That is the reason editors do not need retraining."
        />

        <H2 id="rest-or-graphql">REST or GraphQL</H2>

        <P>
          WordPress ships a REST API with no plugins required. It lives at{' '}
          <code>/wp-json/wp/v2/</code> and it covers posts, pages, media, taxonomies and custom post
          types. For most content sites this is all you need.
        </P>

        <Code filename="terminal" lang="bash">{`# Ten most recent posts with their featured image and author expanded
curl "https://cms.example.com/wp-json/wp/v2/posts?per_page=10&_embed=1"

# A single post by slug
curl "https://cms.example.com/wp-json/wp/v2/posts?slug=moving-to-nextjs"

# Only the fields you need, which keeps the response small
curl "https://cms.example.com/wp-json/wp/v2/posts?_fields=id,slug,title,excerpt,date"`}</Code>

        <P>
          The REST API has one real weakness. Fetching a post plus its author plus its categories
          plus its custom fields can take several round trips, and <code>_embed</code> only helps
          with some of them. When that gets painful, install WPGraphQL and ask for the whole shape
          in one query.
        </P>

        <Code filename="query.graphql" lang="graphql">{`query PostBySlug($slug: ID!) {
  post(id: $slug, idType: SLUG) {
    title
    content
    date
    modified
    author { node { name } }
    categories { nodes { name slug } }
    featuredImage { node { sourceUrl altText mediaDetails { width height } } }
    seo { title metaDesc canonical }   # from the Yoast WPGraphQL add-on
  }
}`}</Code>

        <P>
          My rule is simple. Start with REST because it needs no plugins and one less thing can
          break. Move to WPGraphQL when you find yourself making three requests to build one page.
        </P>

        <H2 id="fetching-content">Fetching content at build time</H2>

        <P>
          In the App Router, a page that fetches content is just an async component.{' '}
          <code>generateStaticParams</code> tells Next.js which slugs exist so it can build a file
          for each one.
        </P>

        <Code filename="lib/wp.ts" lang="typescript">{`const WP = process.env.WORDPRESS_URL!; // https://cms.example.com

export type WpPost = {
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  modified: string;
};

export async function getPosts(): Promise<WpPost[]> {
  const res = await fetch(
    WP + '/wp-json/wp/v2/posts?per_page=100&_fields=slug,title,excerpt,date,modified',
    // Cache the response and refresh it at most once an hour
    { next: { revalidate: 3600, tags: ['posts'] } },
  );
  if (!res.ok) throw new Error('WordPress returned ' + res.status);
  return res.json();
}

export async function getPostBySlug(slug: string): Promise<WpPost | null> {
  const res = await fetch(
    WP + '/wp-json/wp/v2/posts?slug=' + encodeURIComponent(slug),
    { next: { revalidate: 3600, tags: ['posts', 'post:' + slug] } },
  );
  if (!res.ok) return null;
  const [post] = await res.json();
  return post ?? null;
}`}</Code>

        <Code filename="app/blog/[slug]/page.tsx" lang="typescript">{`import { notFound } from 'next/navigation';
import { getPosts, getPostBySlug } from '@/lib/wp';

// One static page per post, built ahead of time
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <h1>{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </article>
  );
}`}</Code>

        <Note title="About that dangerouslySetInnerHTML">
          <P>
            WordPress hands you HTML that it has already rendered, so you do have to inject it. That
            is safe only while you trust every account that can publish. If contributors outside
            your team can post, run the HTML through a sanitiser first and strip anything you did
            not expect. Treat the API output as content you are responsible for, not as trusted
            markup.
          </P>
        </Note>

        <H2 id="publish-instantly">Publishing without a rebuild wait</H2>

        <P>
          The old objection to static sites was that publishing meant waiting for a full rebuild.
          That stopped being true. You can rebuild a single page on demand when WordPress tells you
          something changed.
        </P>

        <P>
          Two pieces make this work. A route handler in Next.js that revalidates a path, and a
          WordPress hook that calls it on save.
        </P>

        <Code filename="app/api/revalidate/route.ts" lang="typescript">{`import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const secret = request.headers.get('x-webhook-secret');

  // Compare against a secret only you and WordPress know
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Not allowed' }, { status: 401 });
  }

  const { slug } = await request.json();

  // Refresh the index and the one post that changed
  revalidateTag('posts');
  if (slug) revalidateTag('post:' + slug);

  return NextResponse.json({ revalidated: true });
}`}</Code>

        <Code filename="wp-content/mu-plugins/notify-build.php" lang="php">{`<?php
/**
 * Tell the Next.js site when a post is published or updated.
 * Sits in mu-plugins so it cannot be deactivated by accident.
 */
add_action( 'wp_after_insert_post', function ( $post_id, $post, $update ) {
  if ( wp_is_post_revision( $post_id ) || wp_is_post_autosave( $post_id ) ) {
    return;
  }
  if ( 'publish' !== $post->post_status ) {
    return;
  }

  wp_remote_post( 'https://example.com/api/revalidate', array(
    'blocking' => false, // do not make the editor wait on us
    'headers'  => array(
      'Content-Type'     => 'application/json',
      'x-webhook-secret' => getenv( 'REVALIDATE_SECRET' ),
    ),
    'body'     => wp_json_encode( array( 'slug' => $post->post_name ) ),
  ) );
}, 10, 3 );`}</Code>

        <P>
          An editor hits publish, WordPress fires the webhook, Next.js drops that page from cache
          and rebuilds it on the next request. The delay is a couple of seconds, not a couple of
          minutes, and no full deploy runs.
        </P>

        <H3>Previewing drafts</H3>

        <P>
          Editors need to see unpublished work. Next.js has Draft Mode for this. It sets a cookie
          that makes your data fetching bypass the cache and request the draft from WordPress with
          an authenticated call.
        </P>

        <Code filename="app/api/preview/route.ts" lang="typescript">{`import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  if (secret !== process.env.PREVIEW_SECRET || !slug) {
    return new Response('Invalid token', { status: 401 });
  }

  (await draftMode()).enable();
  redirect('/blog/' + slug);
}`}</Code>

        <H2 id="locking-it-down">Locking down the WordPress install</H2>

        <P>
          Your CMS is now infrastructure. It should not be reachable or indexable as a website. This
          part gets skipped and it is the one that causes duplicate content problems.
        </P>

        <UL
          items={[
            <>
              Put it on its own subdomain and add <code>noindex</code> across the whole install so
              the CMS copy never competes with your real pages in search results.
            </>,
            <>
              Restrict <code>/wp-admin</code> and <code>/wp-login.php</code> by IP where you can, and
              require two factor authentication where you cannot.
            </>,
            <>
              Use Application Passwords for API access instead of a real user password, and give
              that account only the capabilities it needs.
            </>,
            <>
              Turn off XML-RPC unless something depends on it, and disable the theme and plugin file
              editor with <code>DISALLOW_FILE_EDIT</code>.
            </>,
            <>
              Keep the REST API read only for anonymous requests. Anything that writes should require
              authentication.
            </>,
          ]}
        />

        <Code filename="wp-config.php" lang="php">{`// No editing PHP from inside the admin
define( 'DISALLOW_FILE_EDIT', true );

// Keep the CMS out of search results entirely
add_action( 'pre_option_blog_public', fn() => '0' );`}</Code>

        <H2 id="what-editors-see">What editors actually see</H2>

        <P>
          Nothing changes for them, and that is the point of the whole exercise. Same login, same
          block editor, same media library, same categories. The only visible difference is that the
          &quot;View post&quot; link points at your Next.js domain instead of the WordPress one, which
          you fix by filtering the permalink.
        </P>

        <Code filename="wp-content/mu-plugins/frontend-links.php" lang="php">{`<?php
/** Point every permalink at the real site. */
add_filter( 'post_link', function ( $url, $post ) {
  return 'https://example.com/blog/' . $post->post_name;
}, 10, 2 );

add_filter( 'preview_post_link', function ( $link, $post ) {
  return add_query_arg( array(
    'secret' => getenv( 'PREVIEW_SECRET' ),
    'slug'   => $post->post_name,
  ), 'https://example.com/api/preview' );
}, 10, 2 );`}</Code>

        <P>
          I usually spend twenty minutes with the content team after launch. That is the entire
          training cost, because there is nothing new to learn.
        </P>

        <H2 id="when-not-to">When not to do this</H2>

        <P>
          I talk clients out of this setup regularly. It is a bad fit when:
        </P>

        <UL
          items={[
            <>
              The site leans on WooCommerce. Headless commerce is possible and it is a much bigger
              project. Keep the WooCommerce front end unless you have a specific reason and a real
              budget.
            </>,
            <>
              The team relies on page builders like Elementor or Divi to lay out pages visually.
              Those store layout as theme specific markup, and it does not travel. You would be
              rebuilding their workflow, not preserving it.
            </>,
            <>
              You have five pages that change twice a year. Two systems to maintain is worse than
              one slightly slow one. Just build it statically and skip WordPress.
            </>,
            <>
              Nobody on your side can maintain a Node deploy. Adding a build pipeline to a team with
              no appetite for it creates a different problem.
            </>,
          ]}
        />

        <P>
          Where it fits best is a content heavy site with a real editorial team: a blog with
          hundreds of posts, a marketing site with a content calendar, a publication. You get static
          delivery and they keep their tools.
        </P>

        <ReadNext
          slug="headless-cms-vs-website-builders"
          title="Why a headless CMS beats building on WordPress or Wix"
        />

        <P>
          If you are coming from an existing WordPress site, do the routing work first. Getting the
          redirects right matters more than the architecture you land on.
        </P>

        <ReadNext
          slug="wordpress-to-nextjs-migration"
          title="Moving a WordPress site to Next.js without losing your rankings"
        />

        <H2 id="resources">Resources</H2>

        <Resources
          items={[
            {
              label: 'WordPress REST API handbook',
              href: 'https://developer.wordpress.org/rest-api/',
              note: 'Endpoint reference, including _fields and _embed for trimming responses.',
            },
            {
              label: 'WPGraphQL',
              href: 'https://www.wpgraphql.com/',
              note: 'GraphQL for WordPress, plus add-ons for Yoast and Advanced Custom Fields.',
            },
            {
              label: 'Next.js: revalidateTag',
              href: 'https://nextjs.org/docs/app/api-reference/functions/revalidateTag',
              note: 'On demand cache invalidation, which is what the publish webhook triggers.',
            },
            {
              label: 'Next.js: Draft Mode',
              href: 'https://nextjs.org/docs/app/guides/draft-mode',
              note: 'Previewing unpublished content from a CMS.',
            },
            {
              label: 'WordPress Application Passwords',
              href: 'https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/',
              note: 'The right way to authenticate API access without sharing a login.',
            },
          ]}
        />
      </ArticleLayout>
    </>
  );
}
