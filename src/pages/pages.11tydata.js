const slugify = require("@sindresorhus/slugify");

module.exports = {
    layout: "layouts/base",
    eleventyComputed: {
        permalink: data => `/${slugify(data.title)}/`,
    }
};
