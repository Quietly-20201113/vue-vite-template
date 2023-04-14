import { createApp } from 'vue';
import '@/assets/styles/tailwind.css';
import './style.css';
// import { createRouter, createWebHistory } from 'vue-router';
// import { progressStart, progressClose } from '@/utils/nprogress';
import * as Sentry from '@sentry/vue';
import App from './App.vue';

const app = createApp(App);
// const router = createRouter({
//   history: createWebHistory(import.meta.env.VITE_BASE_PUBLIC_PATH),
// });

// 路由进度条
// router.beforeEach((to, from, next) => {
//   progressStart();
//   next();
// });
// router.afterEach(() => {
//   progressClose();
// });
// eslint-disable-next-line no-unused-expressions, no-undef
process.env.NODE_ENV === 'production' && Sentry.init({
  app,
  dsn: 'user_dsn',
  integrations: [
    new Sentry.BrowserTracing({
    //   routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracePropagationTargets: ['localhost', 'my-site-url.com', /^\//],
    }),
    new Sentry.Replay(),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  // If the entire session is not sampled, use the below sample rate to sample
  // sessions when an error occurs.
  replaysOnErrorSampleRate: 1.0,
});
createApp(App).mount('#app');
