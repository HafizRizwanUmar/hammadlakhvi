import { Helmet } from 'react-helmet-async';

/**
 * Reusable SEO component for managing page titles and meta descriptions.
 */
const SEO = ({ title, description, keywords, canonical }) => {
  const defaultDescription = "Official website of Prof. Dr. Muhammad Hammad Lakhvi. Exploring Islamic research, lectures, and community services.";
  const defaultKeywords = "Dr. Hammad Lakhvi, Islamic Scholar, Quran Tafseer, Islamic Research, Faith Foundation";
  const siteName = "Dr. Muhammad Hammad Lakhvi";

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || siteName} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteName} />
      <meta name="twitter:description" content={description || defaultDescription} />
    </Helmet>
  );
};

export default SEO;
