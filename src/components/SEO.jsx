import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
    const siteTitle = "NEEV (NTW) Academy — JEE, NEET & Foundation Experts";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const siteDescription = "NEEV (NTW) Academy is India's premier coaching institute for Classes 6-12, JEE Main, Advanced, and NEET. Experience structured learning with our elite faculty panel.";
    const metaDescription = description || siteDescription;
    const metaKeywords = keywords || "IIT JEE, NEET, Foundation, Class 6-12 coaching, NTW Academy, Neev, entrance exam preparation";
    const siteUrl = "https://www.neevthreadofwisdom.com"; // Updated to the intended domain
    const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
    const previewImage = image || "/og-image.jpg";

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={previewImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={previewImage} />

            {/* Canonical Link */}
            <link rel="canonical" href={fullUrl} />
        </Helmet>
    );
};

export default SEO;
