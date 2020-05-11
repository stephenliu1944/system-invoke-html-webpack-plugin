function SystemHtmlWebpackPlugin(htmlWebpackPlugin) {
    // TODO: validateOptions()
    // this.options = options;
    this.htmlWebpackPlugin = htmlWebpackPlugin;
}

SystemHtmlWebpackPlugin.prototype.apply = function(compiler) {
    compiler.hooks.afterPlugins.tap(SystemHtmlWebpackPlugin.name, () => {
        // afterPlugins > compilation 事件后才能拿到 HtmlWebpackPlugin 相关的 hooks
        compiler.hooks.compilation.tap(SystemHtmlWebpackPlugin.name, compilation => {
            var hook;

            if (this.htmlWebpackPlugin && this.htmlWebpackPlugin.getHooks) {
                // HtmlWebpackPlugin v4
                hook = this.htmlWebpackPlugin.getHooks(compilation).alterAssetTags;
            } else {
                // HtmlWebpackPlugin v3
                hook = compilation.hooks.htmlWebpackPluginAlterAssetTags;   // Event: html-webpack-plugin-alter-asset-tags
            }
                
            hook.tap(SystemHtmlWebpackPlugin.name, this.appendSystemImport.bind(this));
        });
    });
};

SystemHtmlWebpackPlugin.prototype.appendSystemImport = function(data) {
    if (Array.isArray(data.body) && data.body.length > 0) {
        var entry = data.body[data.body.length - 1];
        data.body.push({
            tagName: 'script',
            attributes: {
                type: 'text/javascript'
            },
            innerHTML: `System.import("${entry.attributes.src}");`,
            closeTag: true
        });
    }
};

module.exports = SystemHtmlWebpackPlugin;
