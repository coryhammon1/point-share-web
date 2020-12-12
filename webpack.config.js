const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        app: path.resolve(__dirname, "src", "app.js")
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        sourceMapFilename: "[name].js.map"
    },
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: ["babel-loader"]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html")
        })
    ]
};