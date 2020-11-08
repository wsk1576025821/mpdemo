# my-project

> A Mpvue project

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 引入sass
npm install -D node-sass sass-loader

# 引入iview
# 找到iview-weapp官网,将clone下来的dist文件引入到mpvue的static文件中，然后通过cnpm run build进行一次编译。在相应的文件中，新建main.json，在里面通过usingComponents配置项，进行自定义组件，然后就可以正常使用了。
# 预览(注意: 此处微信开发者工具打开/dist/wx,否则一直报错)
# 打开微信开发者工具，新建项目，将目录指向 /dist/wx 即可

# 生成 bundle 分析报告
npm run build --report
```


For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
