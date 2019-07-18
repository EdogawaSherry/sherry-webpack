const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pageInfo = [];
// entry对象
const Entries = {};
// 插件数组
const HtmlPlugins = [];
const fixPath = '../src/page';

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath, callBack) {
    // 根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, (err, files) => {
        if (err) {
            console.warn(err);
        } else {
            let count = 0;
            const checkEnd = () => {
                ++count === files.length && callBack();
            };
            // 遍历读取到的文件列表
            files.forEach((filename) => {
                const filedir = path.join(filePath, filename);
                fs.stat(filedir, (eror, stats) => {
                    if (eror) {
                        console.warn('获取文件stats失败');
                    } else {
                        const isFile = stats.isFile();
                        const isDir = stats.isDirectory();
                        if (isFile) {
                            if (/\.html$/.test(filedir)) {
                                const filePath = filedir.replace(path.join(__dirname, fixPath) + path.sep, '').replace('.html', '');
                                const arr = filePath.split(path.sep);
                                const name = arr.pop();
                                const chunk = arr.join('/');
                                // 得到入口文件的name 以chunk名 路径
                                pageInfo.push({
                                    name,
                                    chunk,
                                    filePath: fixPath + '/' + chunk + '/' + name
                                });
                            }
                            checkEnd();
                        }
                        if (isDir) {
                            fileDisplay(filedir, checkEnd);
                        }
                    }
                });
            });
            files.length === 0 && callBack();
        }
    });
}

exports.readPage = () => {
    return new Promise((resolve) => {
        fileDisplay(path.join(__dirname, fixPath), () => {
            // 判断环境 处理html
            const minify = process.env.NODE_ENV === 'production' && {
                removeComments: true,
                collapseWhitespace: true
            };
            pageInfo.forEach((page) => {
                const htmlPlugin = new HtmlWebpackPlugin({
                    filename: `${page.chunk}.html`,
                    template: path.resolve(__dirname, `${page.filePath}.html`),
                    // chunkName集合，page.chunk为当前入口文件chunkName common为公共模块chunkName，和正式环境抽离代码的命名有关
                    chunks: ['common', page.chunk],
                    minify
                });
                HtmlPlugins.push(htmlPlugin);
                Entries[page.chunk] = path.resolve(__dirname, `${page.filePath}.js`);
            });
            resolve({
                entries: Entries,
                htmlPlugin: HtmlPlugins
            });
        });
    });
};
