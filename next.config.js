const { withPlausibleProxy } = require("next-plausible");

module.exports = withPlausibleProxy()({
  images: {
    domains: ["raw.githubusercontent.com"],
    minimumCacheTTL: 6000000,
  },
});
