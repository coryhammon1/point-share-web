import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import sucrase from "@rollup/plugin-sucrase";

const NODE_ENV = process.env.NODE_ENV || "development";
//const outputFile = NODE_ENV === "production" ? "./lib/prod.js" : "./lib/dev.js";

export default {
    input: 'src/app.js',
    output: {
        file: 'dist/app.js',
        format: 'iife'
    },
    plugins: [
        replace({
            "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
            //"firebase.initializeApp": "firebase.default.initializeApp"
        }),
        // async(),
        // babel({ 
        //     babelHelpers: "bundled"
        // }),
        resolve({
            extensions: [".js"]
        }),
        sucrase({
            exclude: ["node_modules/**"],
            transforms: ["jsx"]
        }),
        commonjs({
            include: "node_modules/**",
            sourceMap: true
        })
    ]
}