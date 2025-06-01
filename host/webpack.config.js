const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
    entry: "./src/index",
    mode: "development",
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        port: 3000,
        historyApiFallback: true,
    },
    output: {
        publicPath: "auto",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: require('./sass-loader.config.js')
                    }
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "host",
            remotes: {
                app1: "app1@http://localhost:3001/remoteEntry.js",
                app2: "app2@http://localhost:3002/remoteEntry.js",
            },
            shared: {
                react: { singleton: true, requiredVersion: "^18.2.0" },
                "react-dom": { singleton: true, requiredVersion: "^18.2.0" },
                "react-router-dom": { singleton: true, requiredVersion: "^6.14.1" },
            },
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};