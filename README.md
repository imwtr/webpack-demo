# webpack-demo
一份基础的webpack3配置指南，包含解析Sass/ES6，提取(多个)CSS文件，公共文件，热更新替换，开发线上环境区分，jQuery插件引入，页面文件资源引入，编写插件，模块异步加载 等基础功能
请移步使用[新版webpack4的配置](https://github.com/imwtr/webpack-project-config-reference)，在笔者的中小项目中，升级为v4之后，编译性能提升了至少7倍！

# 详细介绍
http://www.cnblogs.com/imwtr/p/7786204.html


# 使用说明
1. 确保你已经安装了`Python2.7`，并且设置了环境变量
2. 安装了`Node.JS`, 全局安装 `npm i -g webpack`
2. 如果你是非Unix用户（如Windows），修改 `webpack-demo/public/package.json`中的`scripts`命令
将环境变量的设置方式由 `export NODE_ENV=production && webpack...` 修改成 `SET NODE_ENV=production&& webpack...`（注意引号前无空格）


# 使用方法
1. `cd webpack-demo && node server.js`  开启node服务
2. `cd webpack-demo/public`
3. `npm install` 或 `cnpm install`
4. `npm run build:unix:dev`(开发环境，windows将unix换为win) 或 `npm run build:unix:prod`(生产环境，windows将unix换为win) 开始编译，查看编译结果
5. 浏览器访问 http://localhost:8088/views/home/home_tpl.html 或 http://localhost:8088/views/home/home.html 查看页面
6. 根据自己需要，修改配置项或各模块，重新编译查看结果 
   
 
