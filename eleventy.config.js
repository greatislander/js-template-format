const esbuild = require("esbuild");

module.exports = function (eleventyConfig) {
    eleventyConfig.addTemplateFormats("js");
    eleventyConfig.addExtension("js", {
        outputFileExtension: "js",
        compileOptions: {
            permalink: function (inputContent, inputPath) {
                if (!inputPath.startsWith("./src/scripts")) {
                    return false;
                }
            }
        },
        compile: async (inputContent, inputPath) => {
            if (!inputPath.startsWith("./src/scripts")) {
                return;
            }
            
            return async () => {
                let output = await esbuild.build({
                    target: "es2020",
                    entryPoints: [inputPath],
                    minify: true,
                    bundle: true,
                    write: false
                });

                return output.outputFiles[0].text;
            };
        }
    });

    return {
        dir: {
            input: "src",
        }
    };
};
