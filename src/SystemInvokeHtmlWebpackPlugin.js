var HtmlWebpackPlugin = require('html-webpack-plugin');

function SystemInvokeHtmlWebpackPlugin() {
    // TODO: validateOptions()
    // this.options = options;
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
    var tags = (data.assetTags && data.assetTags.scripts) || data.body || [];     // v4 || v3
    var main = tags[tags.length - 1];
    
    // 加在最后
    tags.push({
        tagName: 'script',
        attributes: {
            type: 'text/javascript'
        },
        innerHTML: `System.import("${main.attributes.src}");`,
        closeTag: true
    });
};

module.exports = SystemInvokeHtmlWebpackPlugin;
