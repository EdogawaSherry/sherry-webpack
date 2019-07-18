# sherry-webpack

### 如何使用
* 下载 `git clone https://github.com/EdogawaSherry/sherry-webpack.git`
* 安装 `yarn install` 或者 `npm install`
* 开发 `yarn start` 或者 `npm start`
* 生产 `yarn run build` 或者 `npm run build`

### 功能描述
* 模块化、组件化开发，拼啥字符串~用`.tpl`来进行一个个组件开发吧
* 样式预处理、自动加浏览器前缀
* 愉快es6/es7语法，不过这里的babel配置还是比较基础的~可以自行升级
* 资源引用处理
* 单页面/多页面开发，多页面时候公共js/css将被抽离
webpack+es6+jq这样的组合，不知道目前是否还有这样的需求——在这个框架盛行的时代~

### 目录介绍
```
|————build—————————————————————————————webpack配置
|		|————config.js—————————————————开发生产环境配置
|		|————page.config.js————————————获取多页面配置
|		|————utils.js——————————————————工具
|		|————webpack.base.js———————————基础设置
|		|————webpack.dev.js————————————开发环境设置
|		|————webpack.prod.js———————————生产环境设置
|————src———————————————————————————————工程目录
|		|————common————————————————————公共目录(自定义)
|				|————js————————————————公共脚本方法
|				|————style—————————————公共样式
|				|————tpl———————————————公共模板(之后介绍)
|		|————page——————————————————————各大页面(重点，程序自动读取该文件下面的.html文件组合成入口配置)
|		|————static————————————————————静态资源
|————.babelrc——————————————————————————babel配置
|————.browserslistrc———————————————————浏览器兼容设置
|————.eslintignore—————————————————————js代码检测过滤
|————.eslintrc.js——————————————————————js代码检测配置
|————.package.json—————————————————————依赖
|————.postcss.config.js————————————————poctcss配置
|————yarn.lock————————————————————————yarn的版本锁
```

### page目录基础介绍
```
//先上个栗子
|————index——————————————————————————index页面目录(目录下面可包含模板、资源)
|   |————index.html————————————————index对应的html(自动读取*.html文件，来生成配置)
|   |————index.js——————————————————入口文件
|   |————index.styl————————————————样式
|   |————img———————————————————————属于index的资源
|————login————————————————————————login页面目录
|   |————login.html
|   |————login.js
|   |————login.styl
```
上述栗子中，每一个`page`下面的第一级文件夹就是一个独立的页面工程，例如在`page/index`下可以放当前页面单独拥有的资源文件，无论图片，还是媒体资源，小于10kb，base64形式引入，大于10kb，路径形式引用

### tpl模板介绍
使用`ejs-loader`处理`.tpl`文件，这个模块可以理解成一个组件，它可以是个存`.tpl`文件，也可以由`.js``.styl`组合成一个组件来使用，使用`ejs`的语法来写模板文件，`import tpl from 'xxx.tpl'`，打印可以知道这是个函数，通过参数来渲染字符串，剩下的就可以自由发挥，无论是通过构造函数，还是class，还是普通函数来组合成模板，就看自己如何使用

### 样式处理
可以使用`.less` `.styl` `.scss` `.sass`来写样式，目前只是内置`.styl`，处于少一点包的理念就没加其它的`loaer`，如果想使用其它样式预处理语言，可以自行安装相关包
* .less `yarn add less less-loader` 或者 `npm i -D less less-loader`
* .scss/.sass `yarn add node-sass sass-loader` 或者 `npm i -D node-sass sass-loader`
