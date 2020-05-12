var HtmlWebpackPlugin = require('html-webpack-plugin');

function SystemInvokeHtmlWebpackPlugin(options) {
    // TODO: validateOptions()
    this.options = options;
}

SystemInvokeHtmlWebpackPlugin.prototype.apply = function(compiler) {
    compiler.hooks.afterPlugins.tap(SystemInvokeHtmlWebpackPlugin.name, () => {
        // afterPlugins > compilation 事件后才能拿到 HtmlWebpackPlugin 相关的 hooks
        compiler.hooks.compilation.tap(SystemInvokeHtmlWebpackPlugin.name, compilation => {
            var hook;

            if (HtmlWebpackPlugin && HtmlWebpackPlugin.getHooks) {
                // HtmlWebpackPlugin v4
                hook = HtmlWebpackPlugin.getHooks(compilation).alterAssetTags;
            } else {
                // HtmlWebpackPlugin v3
                hook = compilation.hooks.htmlWebpackPluginAlterAssetTags;   // Event: html-webpack-plugin-alter-asset-tags
            }

            hook.tap(SystemInvokeHtmlWebpackPlugin.name, this.appendSystemImport.bind(this));
        });
    });
};

SystemInvokeHtmlWebpackPlugin.prototype.appendSystemImport = function(data) {
    var name;

    if (typeof this.options === 'string') {
        name = this.options;
    } else {
        let tags = (data.assetTags && data.assetTags.scripts) || data.body || [];     // v4 || v3
        let main = tags[tags.length - 1];
        name = main.attributes.src;
    }
    
    // 加在最后
    tags.push({
        tagName: 'script',
        attributes: {
            type: 'text/javascript'
        },
        innerHTML: `System.import("${name}");`,
        closeTag: true
    });
};

module.exports = SystemInvokeHtmlWebpackPlugin;
