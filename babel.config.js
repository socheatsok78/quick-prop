module.exports = {
    presets: [
        [
            "@babel/preset-flow",
        ],
    ],
    plugins: [
        "@babel/plugin-transform-flow-strip-types",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-private-methods"
    ]
};
