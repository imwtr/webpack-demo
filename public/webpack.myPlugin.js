let extend = require('util')._extend;


// HtmlWebpackPlugin 运行后调整公共script文件在html中的位置，主要用于jQuery插件的引入
function HtmlOrderCommonScriptPlugin(options) {
    this.options = extend({
        commonName: 'common'
    }, options);
}

HtmlOrderCommonScriptPlugin.prototype.apply = function(compiler) {
    compiler.plugin('compilation', compilation => {
        compilation.plugin('html-webpack-plugin-after-html-processing', (htmlPluginData, callback) => {
            // console.log(htmlPluginData.assets);

            // 组装数组，反转保证顺序
            this.options.commonName = [].concat(this.options.commonName).reverse();

            let str = htmlPluginData.html,
                scripts = [],
                commonScript,
                commonIndex,
                commonJS;

            //获取编译后html的脚本标签，同时在原html中清除
            str = str.replace(/(<script[^>]*>(\s|\S)*?<\/script>)/gi, ($, $1) => {
                scripts.push($1);
                return '';
            });

            this.options.commonName.forEach(common => {
                if (htmlPluginData.assets.chunks[common]) {
                    // 找到公共JS标签位置
                    commonIndex = scripts.findIndex(item => {
                        return item.includes(htmlPluginData.assets.chunks[common].entry);
                    });

                    // 提升该公共JS标签至顶部
                    if (commonIndex !== -1) {
                        commonScript = scripts[commonIndex];
                        scripts.splice(commonIndex, 1);
                        scripts.unshift(commonScript);
                    }
                }
            });

            // 重新插入html中
            htmlPluginData.html = str.replace('</body>', scripts.join('\r\n') + '\r\n</body>');

            callback(null, htmlPluginData);
        });
    });
};


module.exports = {
    HtmlOrderCommonScriptPlugin,
};
