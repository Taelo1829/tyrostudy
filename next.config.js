const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development"
});

module.exports = withPWA({
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pub-d7475f21432949fd83e16ee9fdf86140.r2.dev',
            },
        ],
    },

});