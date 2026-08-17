/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://arian.my",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalRobotsTxt: "Host: https://arian.cheddybytes.com",
  },
};
