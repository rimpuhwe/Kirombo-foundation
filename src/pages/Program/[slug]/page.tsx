import { works } from "../../../../types/Work";
import ProgramReader from "./ProgramReader";

function parseBlogDate(dateStr) {
  const clean = dateStr.replace(/(\d+)(st|nd|rd|th)/, "$1");
  const parsed = new Date(clean);
  return isNaN(parsed.getTime()) ? new Date(0) : parsed;
}

export default function Page({ slug }) {
  const work = works.find((w) => w.slug === slug);
  if (!work) {
    return <div>Program Not Found</div>;
  }

  const workUrl = `https://www.igirerwanda.org/program/${work.slug}`;
  const imageUrl = work.img.startsWith("http")
    ? work.img
    : `https://www.igirerwanda.org${work.img}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: work.title,
    image: [imageUrl],
    author: work.author
      ? { "@type": "Organization", name: work.author }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "IGiRE Rwanda",
      logo: {
        "@type": "ImageObject",
        url: "https://www.igirerwanda.org/logo.png",
      },
    },
    datePublished: work.date
      ? parseBlogDate(work.date).toISOString()
      : undefined,
    description: work.seo?.metaDescription || work.content.slice(0, 160),
    keywords: work.seo?.keywords,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": workUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <img
        src={work.img}
        alt={work.title}
        className="object-cover opacity-50 scale-105 transition-transform duration-700 w-full h-full"
      />
      <ProgramReader work={work} />
    </>
  );
}
