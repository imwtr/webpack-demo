# webpack-demo
一份基础的webpack配置，包含解析sass，提取css文件，公共文件，热更新替换，开发线上环境区分，jQuery插件引入，页面文件资源引入等项目中基础功能

# 详细介绍
http://www.cnblogs.com/imwtr/p/6278968.html


# 使用说明
1. 确保你已经安装了python2.7，并且设置了环境变量
2. 如果你是非Unix用户（如windows）,就修改 webpack-demo/public/package.json中的scripts命令
将环境变量的设置方式由 export NODE_ENV=production && webpack... 修改成 SET NODE_ENV=production&& webpack...


# 使用方法
1. cd webpack-demo && node server.js  开启node服务
2. cd webpack-demo/public
3. npm install 或 cnpm install
4. npm run build:dev 或 npm run build:prod 开始编译，查看编译结果
5. 浏览器访问 localhost:8088/views/home/home_tpl.html 或 localhost:8088/views/home/home.html 查看页面
6. 根据自己需要，修改配置项或各模块，重新编译查看结果 
   
 
