import { PortfolioExperience } from "@/components/portfolio-experience";
import { siteConfig } from "@/data/portfolio";

export default function HomePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    email: `mailto:${siteConfig.email}`,
    telephone: siteConfig.phone,
    url: siteUrl,
    image: `${siteUrl}/images/salman-portrait.png`,
    sameAs: [siteConfig.linkedin],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "professional inquiries",
      availableLanguage: ["English", "Urdu"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karachi",
      addressCountry: "PK",
    },
    knowsAbout: [
      "Angular",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "REST APIs",
      "Frontend performance",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PortfolioExperience />
    </>
  );
}
