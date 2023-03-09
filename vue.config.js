const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave: false,

	pluginOptions: {
		i18n: {
			locale: "en",
			fallbackLocale: "de",
			localeDir: "locales",
			enableInSFC: false,
			enableBridge: false,
		},
	},
});
