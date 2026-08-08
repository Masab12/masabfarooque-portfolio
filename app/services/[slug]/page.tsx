import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { site } from '@/app/data/site';
import { services, getService } from '@/app/data/services';
import ServicePage, { serviceSchema } from '@/app/components/services/ServicePage';

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: 'Service not found' };

  const url = `${site.url}/services/${service.slug}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: url },
    keywords: service.keywords,
    openGraph: {
      type: 'website',
      title: `${service.metaTitle} | ${site.name}`,
      description: service.metaDescription,
      url,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      {serviceSchema(service).map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <ServicePage service={service} />
    </>
  );
}
