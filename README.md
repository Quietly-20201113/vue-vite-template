# Vue 3 + Vite

# 使用方式
>  `npx vue-vite-template vue-vite-app --ignore-existing`其中 `vue-vite-app`是你项目本身名字
> 


This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

### 使用vue3.0+vite+js+tailwind 搭建配置的一个空项目模板,欢迎使用

### 集成
> stylelint  
> tailwind  
> .eslintrc配置  
> element-plus  
> 处理了icons使用问题  
> 处理element-plus使用消息提示时不用引入,在eslintrc中已做配置,后续使用只需要直接使用即可;  
> 样式缺失自行引入`import 'element-plus/es/components/notification/style/css';`  
> 添加了element 主题更新  
> 添加`nprogress`实现路由进度条  
> 添加`sentry`前端错误监听模块  
> 添加`axios`简易集成  
> 

### 扩展
> `@vitejs/plugin-legacy`: 作用是为打包后的文件提供传统浏览器兼容性支持  
> 请在本地安装全局 `terser`  
> `vite-plugin-compression`: gzip 压缩  

### 注意
> 如果不适用sentry,请将sentry相关移除在进行打包,否则会导致找不到`sourcemaps`,注意`.sentryclirc`文件处理




