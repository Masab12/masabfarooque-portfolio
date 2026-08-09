import type { Metadata } from 'next';
import Link from 'next/link';
import { site, socials } from '@/app/data/site';
import { getPost } from '@/app/data/posts';
import ArticleLayout, { articleSchema, faqSchema } from '@/app/components/blog/ArticleLayout';
import { BeforeAfterBars, EffortSplit } from '@/app/components/blog/Charts';
import {
  H2,
  P,
  Lede,
  UL,
  Code,
  Note,
  Takeaways,
  Checklist,
  Table,
  FAQ,
  ReadNext,
  Resources,
  type FaqItem,
} from '@/app/components/blog/Prose';

const post = getPost('wordpress-vs-sanity-headless-cms')!;
const fiverr = socials.find((s) => s.glyph === 'fiverr');

export const metadata: Metadata = {
  title: post.title,
  description: post.summary,
  alternates: { canonical: `${site.url}/blog/${post.slug}` },
  keywords: [
    'WordPress vs Sanity',
    'Sanity vs WordPress headless CMS',
    'headless CMS for Next.js',
    'Sanity CMS schema in code',
    'ACF Pro alternative',
    'seed Sanity content with API token',
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

const faqs: FaqItem[] = [
  {
    q: 'Do I need ACF Pro to run WordPress headless?',
    a: 'Not for a simple site. You need it the moment you want repeating sections, flexible page builders, galleries or cloned field groups, because those field types sit behind the paid licence. Most real marketing sites reach that point in the first week.',
  },
  {
    q: 'Can I move my content out of Sanity later?',
    a: 'Yes. The Sanity CLI exports a whole dataset to newline delimited JSON with the images alongside it, and you can run that export on a schedule as your backup. Rich text is stored as Portable Text, which is a documented open format you can convert to HTML or Markdown with a small script.',
  },
  {
    q: 'Is one of them better for SEO?',
    a: 'Neither. Your CMS does not decide your titles, canonicals or Core Web Vitals, your front end does. What matters is that whichever one you pick lets you store a title, a description, a canonical and a social image per page, and both do.',
  },
  {
    q: 'Can I use WordPress and Sanity together?',
    a: 'You can, and I would usually talk you out of it. Two content systems means two sets of credentials, two backup routines and a standing argument about which one owns a given page. Pick one and move everything into it.',
  },
  {
    q: 'How long does it take to switch a site from WordPress to Sanity?',
    a: 'The schema work is fast, often a day or two, because it is code. The slow part is migrating existing content, mapping old URLs to new ones and rebuilding whatever your plugins were doing. On a normal marketing site with a few hundred pages, plan for weeks rather than days.',
  },
  {
    q: 'Do you build these, and where are you based?',
    a: 'Yes. I am a full stack engineer in Islamabad and I do this work for clients worldwide, either moving a WordPress site onto Next.js with Sanity behind it, or keeping WordPress as the headless CMS if your team is happy in that editor.',
  },
];

export default function Page() {
  return (
    <>
      {[...articleSchema(post), faqSchema(faqs)].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <ArticleLayout post={post}>
        <Lede>
          Sanity keeps your content model in code. WordPress keeps it in a database.
        </Lede>

        <P>
          Almost every real difference between the two comes out of that one sentence. Where the
          model lives decides how you review a change, how you copy it to staging, how a second
          developer picks it up, and what happens when someone edits the wrong thing on a Friday
          afternoon.
        </P>

        <P>
          I have shipped sites on both. This is the comparison I give clients when they ask which
          one to put behind a Next.js front end, including the parts where WordPress is still the
          better answer.
        </P>

        <Takeaways
          items={[
            'Sanity schemas are TypeScript files in your repository. You can diff them, review them, branch them and roll them back.',
            'WordPress keeps custom fields in the database. ACF Pro can mirror them to JSON, but only if someone switches that on and keeps it in sync.',
            'Seeding content is a solved problem in Sanity: one API token, one script, deterministic ids, safe to rerun. In WordPress it works, with more moving parts.',
            'ACF Pro is a paid annual licence and the field types most sites need sit behind it. Sanity puts the equivalent structures in the open source Studio.',
            'WordPress still wins on a fluent editorial team, commerce, memberships and a plugin you cannot replace in a week.',
          ]}
        />

        <H2 id="where-the-model-lives">Where the content model lives</H2>

        <P>
          Open a Sanity project and the shape of your content is sitting in files. A document type
          is a TypeScript object with a name, a list of fields and validation rules. It goes through
          pull requests like any other code, and a new developer who clones the repository has the
          entire model before they have logged into anything.
        </P>

        <P>
          Open a WordPress project and the same information is scattered across database rows. Post
          types come from a function call or, on a lot of sites, from a plugin someone clicked
          through. Custom fields live in Advanced Custom Fields, which stores each field group as a
          post in the database with its configuration in post meta.
        </P>

        <P>
          You cannot read that in a diff. You cannot revert it with a commit. To see what changed
          you compare two admin screens by eye.
        </P>

        <Table
          head={['What you want to do', 'Sanity', 'WordPress with ACF']}
          rows={[
            ['See what changed in the model', 'git diff', 'Compare two admin screens'],
            ['Review a change before it ships', 'Pull request', 'Trust whoever made it'],
            ['Undo a bad change', 'Revert the commit', 'Rebuild it by hand'],
            ['Copy the model to staging', 'Deploy the branch', 'Export JSON, import JSON'],
            ['Onboard a second developer', 'They clone the repo', 'They get an admin login'],
            ['Know who changed a field', 'Commit history', 'Nothing, unless a plugin logs it'],
          ]}
          caption="Neither column is a trick. This is what each system does by default, and the default is what teams actually live with a year later."
        />

        <Note title="The honest counterpoint">
          <P>
            ACF can write field groups to JSON files in your theme, which puts them under version
            control, and you can register groups in PHP with acf_add_local_field_group so they never
            touch the database at all. Both work well. The catch is that they are opt in, the JSON
            sync needs a folder you create yourself, and anyone with admin access can still change a
            field in the browser and leave your files behind. In Sanity there is no browser path to
            get out of sync with, because the browser cannot edit the schema.
          </P>
        </Note>

        <H2 id="content-model">Defining a content model</H2>

        <P>
          Take a small example. An article with a title, a slug, a publish date, a cover image with
          alt text and a rich text body.
        </P>

        <P>In Sanity, the whole thing is one file.</P>

        <Code filename="sanity/schemaTypes/article.ts" lang="ts">{`import { defineType, defineField } from 'sanity';

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
    defineField({
      name: 'cover',
      type: 'image',
      options: { hotspot: true },
      // Alt text is a field on the image, so an editor cannot upload
      // one without being asked for it.
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    }),
  ],
});`}</Code>

        <P>
          That file is the model, the editing interface and the validation at once. Commit it, deploy
          the Studio, and every editor sees the change. The maximum title length is now enforced for
          everyone, and you can prove when it started being enforced.
        </P>

        <P>The WordPress half of the same job splits in two. The post type goes in PHP.</P>

        <Code filename="wp-content/mu-plugins/content-model.php" lang="php">{`<?php
add_action('init', function () {
  register_post_type('article', [
    'label'        => 'Articles',
    'public'       => true,
    'show_in_rest' => true,      // leave this out and the REST API returns nothing
    'rest_base'    => 'articles',
    'supports'     => ['title', 'editor', 'thumbnail', 'revisions'],
  ]);

  register_post_meta('article', 'published_at', [
    'type'         => 'string',
    'single'       => true,
    'show_in_rest' => true,      // and again, once per field, or it stays invisible
  ]);
});

// Everything else lives in the database. You build it by clicking through
// Custom Fields, Field Groups, Add New, and repeating that per field.`}</Code>

        <P>
          The rest happens in the browser. You add a field group, pick a field type from a dropdown,
          type a label, type a name, set required, set the return format, choose which post type it
          attaches to, and save. Then you do it again for the next field.
        </P>

        <P>
          None of that is hard. It is just slow, and it is invisible to everyone who was not in the
          room.
        </P>

        <BeforeAfterBars
          rows={[
            { label: 'Project setup', before: 5, after: 3 },
            { label: 'New type', before: 6, after: 0 },
            { label: 'Eight fields', before: 8, after: 0 },
            { label: 'Expose to API', before: 3, after: 0 },
            { label: 'To staging', before: 4, after: 0 },
          ]}
          beforeLabel="WordPress with ACF Pro"
          afterLabel="Sanity"
          label="Steps that happen in an admin screen and leave nothing in the repository, counted for WordPress and for Sanity"
          caption={
            <>
              Counted from the two setup procedures described in this article. A step counts when it
              happens in a browser and leaves nothing behind in your repository. The three on the
              Sanity side are creating the project, creating the dataset and issuing an API token,
              and you do all three once.
            </>
          }
        />

        <P>
          The zeros are the point. Once a Sanity project exists, the model stops being something you
          administer and becomes something you write.
        </P>

        <H2 id="seeding">Seeding content over the API</H2>

        <P>
          This is where the gap gets wide, and it is the part clients underestimate. You will need
          to load content programmatically more often than you expect: migrating a few hundred old
          posts, building demo data so the design gets reviewed against real text, resetting a
          staging environment, or importing a product feed every night.
        </P>

        <P>
          In Sanity you issue a write token in the project settings, drop it in an environment file,
          and write a script.
        </P>

        <Code filename="scripts/seed.ts" lang="ts">{`import { createClient } from '@sanity/client';
import articles from './articles.json';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET ?? 'production',
  apiVersion: '2026-01-01',        // pinned by date, so an upgrade never surprises you
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

// Deterministic ids make the script safe to rerun. Run it twice and you
// still have 40 documents, not 80.
async function seed() {
  const tx = articles.reduce(
    (batch, item) =>
      batch.createOrReplace({
        _id: \`article.\${item.slug}\`,
        _type: 'article',
        title: item.title,
        slug: { _type: 'slug', current: item.slug },
        publishedAt: item.publishedAt,
      }),
    client.transaction(),
  );

  const { results } = await tx.commit();
  console.log('wrote', results.length, 'documents');
}

seed();`}</Code>

        <P>
          One transaction, one commit, all of it or none of it. If the fortieth record is malformed,
          the first thirty nine do not land either, so you never have to work out how far the script
          got before it fell over.
        </P>

        <P>
          Moving the whole dataset between environments does not need a script at all. The CLI does
          it, images included.
        </P>

        <Code filename="terminal" lang="bash">{`# Pull production down to a file, images and all
npx sanity dataset export production ./backup.tar.gz

# Push it into staging, replacing what is there
npx sanity dataset import ./backup.tar.gz staging --replace

# And the same command is your backup, so run it on a schedule
npx sanity dataset export production ./backups/$(date +%F).tar.gz`}</Code>

        <P>WordPress can do this too. It takes more setup and more care.</P>

        <Code filename="scripts/seed-wordpress.ts" lang="ts">{`import articles from './articles.json';

// Application passwords are generated per user in wp-admin, under Users,
// Profile. Anyone who gets this string has that user's permissions.
const auth = Buffer.from(
  \`\${process.env.WP_USER}:\${process.env.WP_APP_PASSWORD}\`,
).toString('base64');

async function createArticle(item: Article) {
  const res = await fetch('https://cms.example.com/wp-json/wp/v2/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: \`Basic \${auth}\`,
    },
    body: JSON.stringify({
      title: item.title,
      slug: item.slug,
      status: 'publish',
      meta: { published_at: item.publishedAt },  // needs show_in_rest on that meta key
      acf: { subtitle: item.subtitle },          // needs ACF REST support switched on
    }),
  });

  if (!res.ok) throw new Error(res.status + ' ' + (await res.text()));
  return res.json();
}

// No transaction. If this loop dies at item 27, items 1 to 26 are live on
// your site and you get to work out how to clean them up.
for (const item of articles) {
  await createArticle(item);
}`}</Code>

        <P>
          Four things make this harder than it looks. Meta fields stay invisible to the API until you
          register each key with show_in_rest. ACF fields need their own REST support turned on
          before they appear. Images go up as a separate multipart request with a
          Content&#8209;Disposition header, and then you attach the returned id to the post. And
          there is no transaction, so a failure halfway leaves you in a state you have to unpick by
          hand.
        </P>

        <P>
          WP&#8209;CLI is a better tool for this than the REST API, and if you have shell access on
          the box I would use it. That is the catch. Managed WordPress hosts often do not give you
          one, which is exactly when you fall back to the script above.
        </P>

        <Note title="Why this matters more than it sounds">
          <P>
            Seeding is a proxy for how automatable the whole system is. A CMS you can fill from a
            script is a CMS you can test against, reset, back up and migrate. A CMS you fill by hand
            quietly turns into the one environment nobody dares touch, and every content change
            becomes a manual job on production.
          </P>
        </Note>

        <H2 id="editors">What editors actually get</H2>

        <P>
          Sanity Studio is a React application that you configure and deploy yourself. It gives your
          team live collaboration on the same document, real time previews, structured rich text, and
          custom input components when a field needs one. Because it is your code, you can hide
          fields, reorder them, group them into tabs and write a preview pane that renders the actual
          page.
        </P>

        <P>It also has no plugin directory worth the name.</P>

        <P>
          WordPress has twenty years of that. Gutenberg is familiar to a huge number of writers, the
          media library is good, user roles are mature, and if you need redirects or a form or an SEO
          checklist there is a plugin for it that someone on your team has already used.
        </P>

        <P>
          Be honest about the retraining cost. If your marketing team publishes in WordPress every
          day and likes it, moving them to a new editor is a real project with a real morale cost,
          and it is not one you should take on just because the schema story is nicer for developers.
          That is exactly the case where{' '}
          <Link href="/blog/wordpress-as-headless-cms">
            keeping WordPress as the headless CMS
          </Link>{' '}
          is the right call: the editor never changes, and the public site still gets served as
          static files.
        </P>

        <H2 id="cost">What each one costs</H2>

        <P>
          The sticker prices move, so check both pricing pages before you decide. The shape of the
          bill is stable, and the shape is what catches people out.
        </P>

        <P>
          With headless WordPress you are still running a server. You pay for the origin, you pay an
          annual ACF Pro licence per site tier for the field types real projects need, and you
          usually pay for two or three more plugins on top. Then you pay in time, which never shows
          up on the invoice.{' '}
          <Link href="/blog/hosting-headless-wordpress">
            I went through the hosting side in detail here
          </Link>
          .
        </P>

        <P>
          With Sanity there is no server. The free tier covers small projects, and paid plans scale
          on seats, API usage and bandwidth. Your bill grows with traffic and team size rather than
          with the box you provisioned.
        </P>

        <UL
          items={[
            <>
              <strong>Small brochure site, one editor.</strong> Sanity is usually free or close to
              it. WordPress costs you hosting plus the ACF Pro licence from the moment you need a
              repeater.
            </>,
            <>
              <strong>Content site with a team.</strong> Sanity starts charging per seat. WordPress
              charges nothing extra for the tenth user, which is a genuine advantage for a large
              editorial group.
            </>,
            <>
              <strong>High traffic.</strong> Both sit behind a static front end, so visitor traffic
              barely touches the CMS. Your bill is the front end, not the backend.
            </>,
          ]}
        />

        <P>
          Note the second row. Per seat pricing is the one place where Sanity gets more expensive as
          you grow and WordPress does not, and if you have twenty writers it can decide the argument
          on its own.
        </P>

        <H2 id="maintenance">What breaks later</H2>

        <P>
          A headless WordPress install is still a PHP application on the public internet. It still
          needs PHP version upgrades, plugin updates, core updates and someone paying attention to
          security advisories. Going headless removes the front end from the attack surface. It does
          not remove wp&#8209;admin.
        </P>

        <EffortSplit
          parts={[
            { name: 'Plugins and licences', percent: 12 },
            { name: 'Field groups by hand', percent: 24 },
            { name: 'Exposing fields to the API', percent: 18 },
            { name: 'Auth and seeding scripts', percent: 16 },
            { name: 'Locking down the admin', percent: 14 },
            { name: 'Preview and revalidation', percent: 16 },
          ]}
          label="Rough split of setup effort on a headless WordPress build"
          caption="My own rough split across the headless WordPress builds I have delivered. Treat it as an estimate rather than a measurement. The useful part is the shape: over half the work is configuration and plumbing that a schema in code removes outright."
        />

        <P>
          There is a supply risk too, and it is not theoretical. In October 2024 the WordPress.org
          plugin directory took over the Advanced Custom Fields listing and forked it as Secure
          Custom Fields, so sites updating from the directory started receiving a different plugin
          than the one their developers installed. Whatever you think of the dispute behind it, that
          is a dependency you do not control sitting underneath your content model.
        </P>

        <P>
          Sanity moves that risk somewhere else rather than deleting it. You depend on a hosted
          service, and if it goes down your editors cannot publish, although a statically built site
          keeps serving. What you get back is that nobody has to patch it, and the API is pinned by
          date in your client config, so a change on their side cannot alter your responses until you
          bump that string yourself.
        </P>

        <P>Then there is the everyday case, which is changing a field.</P>

        <Table
          head={['Step', 'Sanity', 'WordPress with ACF']}
          rows={[
            ['Make the change', 'Edit a file', 'Click through wp-admin'],
            ['Test it', 'Run the Studio locally', 'Do it on staging, or on production'],
            ['Review it', 'Pull request', 'None available'],
            ['Ship it', 'Merge and deploy', 'Export JSON, import on production'],
            ['Roll it back', 'Revert the commit', 'Reverse the clicks from memory'],
          ]}
          caption="The rollback row is the one that decides it for me. Every system eventually needs a change undone at a bad moment, and one of these columns has an answer for that."
        />

        <H2 id="when-wordpress-wins">When WordPress is the right pick</H2>

        <P>I recommend WordPress for a good share of the projects that come to me.</P>

        <UL
          items={[
            <>
              <strong>Your editors are fluent and happy.</strong> A team that publishes daily in
              Gutenberg has real speed in that tool. Do not throw that away for developer comfort.
            </>,
            <>
              <strong>You sell things.</strong> WooCommerce, memberships and subscriptions are years
              of work to replace and you will not enjoy any of it.
            </>,
            <>
              <strong>A plugin is doing something load bearing.</strong> Events, bookings, a
              directory, a forum. If it works, rebuilding it is a project of its own.
            </>,
            <>
              <strong>Multilingual is already running.</strong> If WPML or Polylang is set up and
              your translators know it, that is a lot of working machinery to hand back.
            </>,
            <>
              <strong>Nobody is on call.</strong> If you have no developer after launch, a familiar
              system somebody local can pick up beats a nicer one nobody in your building knows.
            </>,
          ]}
        />

        <P>
          In every one of those cases you can still take the slow front end away. Keep WordPress as
          the content source, build the public site in Next.js, and your editors never notice the
          difference except that the site got fast.
        </P>

        <Checklist
          title="Decide it in one sitting"
          items={[
            'Count your editors. More than about ten and per seat pricing starts to matter.',
            'List the plugins doing real work. Anything you cannot rebuild in a week argues for staying.',
            'Ask whether a developer will still be around in six months. If not, favour the familiar system.',
            'Ask how often the content model changes. Often means code, rarely means it matters less.',
            'Check whether you need commerce, memberships or multilingual. Any of those and WordPress usually wins.',
            'Look at who reviews changes today. If the answer is nobody, a schema in code fixes that for free.',
          ]}
        />

        <P>
          If you want a hand with any of this, that is the work I do. I move WordPress sites onto
          Next.js without losing their rankings, I set up Sanity with the schema and a seed script so
          your content model lives in your repository from day one, and where it makes more sense I
          wire WordPress up as a headless CMS so your team keeps the editor it already knows. I work
          from Islamabad with clients across Europe, North America and the Gulf.
        </P>

        <P>
          Tell me what you are running now and I will give you a straight answer on which of the two
          fits, including when the answer is to leave things alone.{' '}
          <Link href="/services/wordpress-to-nextjs">See how the migration work runs</Link>, or{' '}
          <Link href="/contact">send me the details</Link>.
          {fiverr ? (
            <>
              {' '}
              You can also{' '}
              <a href={fiverr.href} target="_blank" rel="noopener noreferrer">
                hire me on Fiverr
              </a>{' '}
              if you would rather work through a platform with the reviews attached.
            </>
          ) : null}
        </P>

        <H2 id="faq">Questions people ask me</H2>

        <FAQ items={faqs} />

        <ReadNext
          slug="wordpress-as-headless-cms"
          title="Keep the WordPress editor, drop the WordPress front end"
        />

        <ReadNext
          slug="headless-cms-vs-website-builders"
          title="Why a headless CMS beats building on WordPress or Wix"
        />

        <P>
          If you have already decided to move and you want the mechanics, the{' '}
          <Link href="/blog/wordpress-to-nextjs-migration">migration guide</Link> covers redirects
          and metadata, and the{' '}
          <Link href="/blog/wordpress-to-nextjs-migration-checklist">checklist</Link> is the version
          you can hand to whoever does the work.
        </P>

        <H2 id="resources">Resources</H2>

        <Resources
          items={[
            {
              label: 'Sanity: schema types',
              href: 'https://www.sanity.io/docs/schema-types',
              note: 'The full field type reference, which is the file you will spend most of your setup time in.',
            },
            {
              label: 'Sanity: the JavaScript client',
              href: 'https://www.sanity.io/docs/js-client',
              note: 'Transactions, createOrReplace and token auth, which is everything the seed script above uses.',
            },
            {
              label: 'Sanity: dataset export and import',
              href: 'https://www.sanity.io/docs/migrating-data',
              note: 'How to move a whole dataset between environments, and how to get your content back out.',
            },
            {
              label: 'Portable Text',
              href: 'https://github.com/portabletext/portabletext',
              note: 'The open rich text format Sanity stores, so you can see what you would be converting from later.',
            },
            {
              label: 'WordPress REST API handbook',
              href: 'https://developer.wordpress.org/rest-api/',
              note: 'Endpoints, authentication and the show_in_rest rules that decide whether your fields appear at all.',
            },
            {
              label: 'WordPress application passwords',
              href: 'https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/',
              note: 'The built in way to authenticate a script against WordPress without installing a JWT plugin.',
            },
            {
              label: 'ACF: local JSON',
              href: 'https://www.advancedcustomfields.com/resources/local-json/',
              note: 'How to get ACF field groups into version control, if you stay on WordPress.',
            },
            {
              label: 'WordPress.org on Secure Custom Fields',
              href: 'https://wordpress.org/news/2024/10/secure-custom-fields/',
              note: 'The October 2024 announcement behind the ACF fork, worth reading before you build on the plugin.',
            },
          ]}
        />
      </ArticleLayout>
    </>
  );
}
