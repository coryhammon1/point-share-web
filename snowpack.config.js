module.exports = {
    mount: {
        public: "/",
        src: "/dist"
    },
    buildOptions: {
        baseUrl: "https://coryhammon1.github.io/point-share-web"
    },
    plugins: [
        [
            "@snowpack/plugin-webpack",
            {

            }
        ]
    ]
}