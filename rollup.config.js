import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

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
        babel({ 
            babelHelpers: "bundled"
        }),
        resolve(),
        commonjs({
            include: "node_modules/**"
        })
    ]
}