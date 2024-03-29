import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteSentry from 'vite-plugin-sentry';
import eslint from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import AutoImport from 'unplugin-auto-import/vite';
import legacy from '@vitejs/plugin-legacy'; // 兼容ie
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import viteCompression from 'vite-plugin-compression'; // gzip 压缩
// import svgLoader from 'vite-svg-loader';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
// import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import IconsResolver from 'unplugin-icons/resolver';
import { resolve } from 'path';

const packageJson = require('./package.json');

const sentryConfig = {
  configFile: './.sentryclirc',
  release: packageJson.version, // package.json version 保持同步
  deploy: {
    env: 'production',
  },
  skipEnvironmentCheck: true, // 可以跳过环境检查
  sourceMaps: {
    include: ['./dist/assets'],
    ignore: ['node_modules'],
    urlPrefix: '~/assets',
  },
};
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: process.env.VITE_BASE_PUBLIC_PATH,
    server: {
      // proxy: {
      //   '/api': {
      //     target: 'xxx',
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
      viteCompression(),
      legacy({
        targets: ['defaults', 'not IE 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),
      process.env.NODE_ENV === 'production' ? viteSentry(sentryConfig) : null,
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
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
      }),
      Components({
        resolvers: [
          ElementPlusResolver({ importStyle: 'sass' }),
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
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "src/assets/styles/element/index.scss" as *;',
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    build: {
      sourcemap: process.env.NODE_ENV === 'production',
    },
  });
};
