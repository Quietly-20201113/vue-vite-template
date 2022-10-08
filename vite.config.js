import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import AutoImport from 'unplugin-auto-import/vite';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
// import svgLoader from 'vite-svg-loader';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
// import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import IconsResolver from 'unplugin-icons/resolver';
import { resolve } from 'path';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: process.env.VITE_BASE_PUBLIC_PATH,
    server: {
      // proxy: {
      //   '/api': {
      //     target: 'http://39.106.168.143:8001',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '/api'),
      //   },
      // },
    },
    plugins: [
      // createSvgIconsPlugin({
      //   iconDirs: [resolve(process.cwd(), 'src/assets/svg/mian')],
      //   symbolId: 'icon-[name]',
      //   customDomId: '__svg__icons__dom__',
      // }),
      eslint({ cache: false }),
      stylelint(),
      viteCommonjs(),
      // svgLoader(),
      Icons({
        compiler: 'vue3',
        autoInstall: true,
        // 自定义图标加载
        customCollections: {
          // home图标集
          // 给svg文件设置fill="currentColor"属性，使图标的颜色具有适应性
          home: FileSystemIconLoader('src/assets/svg/mian', (svg) => svg.replace(/^<svg /, '<svg fill="currentColor" ')),
        },
      }),
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          // Icon自动引入解析器
          IconsResolver({
            // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
            prefix: 'icon',
            // 当图标集名字过长时，可使用集合别名
            alias: {
              system: 'system-uicons',
            },
          }),
        ],
      }),
      VueSetupExtend(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  });
};
