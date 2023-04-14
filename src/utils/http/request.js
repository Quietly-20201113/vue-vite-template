/* eslint-disable no-plusplus */
import axios from 'axios';
import adapter from 'axios/lib/adapters/xhr';
import 'element-plus/es/components/notification/style/css';
import 'element-plus/es/components/loading/style/css';

// 基础地址
// const baseURL = window.rootData.ROOT_SERVER;
// const baseURL = "/api";

axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.adapter = import.meta.glob('axios/lib/adapters/http');

axios.defaults.timeout = 30000;
// 控制loading 变量
let reqNum = 0;
let loading = null;
const request = axios.create({
  contentType: 'application/x-www-form-urlencoded',
  adapter,
  // transformRequest: [
  //   // eslint-disable-next-line func-names
  //   function (data) {
  //     console.log(data);
  //     if (data) {
  //       let ret = '';
  //       // eslint-disable-next-line no-return-assign
  //       data.map((item, index) => ret += `${encodeURIComponent(index)}=${encodeURIComponent(item)}&`);
  //       return ret;
  //     }
  //     return '';
  //   },
  // ],
});

const startLoading = () => {
  if (reqNum === 0) {
    // loading 开始
    loading = ElLoading.service({
      lock: true,
      text: '请求中...',
      background: 'rgba(0, 0, 0, 0.2)',
    });
  }
  reqNum++;
};

const endLoading = () => {
  if (reqNum <= 0) return;
  reqNum--;
  if (reqNum === 0) {
    // loading 结束
    loading.close();
  }
};
// export const serviceJson = axios.create({ adapter });

// eslint-disable-next-line no-use-before-define
interceptors(request);
// eslint-disable-next-line no-use-before-define
// interceptors(serviceJson);

// 创建一个错误
function errorCreat(msg, response) {
  const err = new Error(msg);
  // eslint-disable-next-line no-use-before-define
  errorLog(err, response);
  throw err;
}
// 创建一个错误,且返回结果
function errorCreat2(msg, response) {
  const err = new Error(msg);
  // eslint-disable-next-line no-use-before-define
  errorLog(err, response);
}
// 记录和显示错误
function errorLog(err, response) {
  const errorId = response.headers['x-request-id'];
  const code = errorId.split('-');
  // 显示提示
  ElNotification({
    title: 'Error',
    message: `${err.message}，日志标识：[${code[code.length - 1]}]`,
    type: 'error',
  });
}

function interceptors(service) {
  // 请求拦截器
  service.interceptors.request.use(
    (config) => {
      // eslint-disable-next-line no-unused-expressions
      config.isLoading && startLoading();
      return config;
    },
    (error) => {
      // 发送失败
      Promise.reject(error);
    },
  );

  // 响应拦截器
  request.interceptors.response.use(
    // eslint-disable-next-line consistent-return
    (response) => {
      // dataAxios 是 axios 返回数据中的 data
      const dataAxios = response;
      // 这个状态码是和后端约定的
      const { code } = dataAxios.data;
      // 根据 code 进行判断
      if (code === undefined) {
        // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
        return dataAxios;
      }
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      // eslint-disable-next-line no-unused-expressions
      dataAxios.config.isLoading && endLoading();
      switch (code) {
        case 200:
          return dataAxios.data;
        case 500:
          errorCreat('服务请求失败,请联系管理员', dataAxios);
          return dataAxios;
        case 'success':
          return dataAxios.data;
        case 'warnning':
          return dataAxios.data;
        case 'fail':
          // [ 示例 ] 其它和后台约定的 code
          errorCreat(dataAxios.data.message, dataAxios);
          break;
        case '1000':
          // [ 示例 ] 其它和后台约定的 code
          // router.replace({
          //   path: "/login"
          // });
          // sessionStorage.clear();
          errorCreat2('登录状态失效，请重新登录', dataAxios);
          // break;
          return dataAxios;
        default:
          // 不是正确的 code
          errorCreat('服务器内部错误,请联系管理员', dataAxios);
          break;
      }
    },
    (error) => {
      console.log(error.response);
      // eslint-disable-next-line no-unused-expressions
      error.response.config.isLoading && endLoading();
      if (error && error.response) {
        switch (error.response.status) {
          case 400:
            // eslint-disable-next-line no-param-reassign
            error.message = '请求错误';
            break;
          case 401:
            // eslint-disable-next-line no-param-reassign
            error.message = '未授权，请登录';
            break;
          case 403:
            // eslint-disable-next-line no-param-reassign
            error.message = '拒绝访问';
            break;
          case 404:
            // eslint-disable-next-line no-param-reassign
            error.message = '请求地址出错，请联系管理员';
            break;
          case 408:
            // eslint-disable-next-line no-param-reassign
            error.message = '请求超时';
            break;
          case 500:
            // eslint-disable-next-line no-param-reassign
            error.message = '服务器内部错误';
            break;
          case 501:
            // eslint-disable-next-line no-param-reassign
            error.message = '服务未实现';
            break;
          case 502:
            // eslint-disable-next-line no-param-reassign
            error.message = '网关错误';
            break;
          case 503:
            // eslint-disable-next-line no-param-reassign
            error.message = '服务不可用';
            break;
          case 504:
            // eslint-disable-next-line no-param-reassign
            error.message = '网关超时';
            break;
          case 505:
            // eslint-disable-next-line no-param-reassign
            error.message = 'HTTP版本不受支持';
            break;
          default:
            // eslint-disable-next-line no-param-reassign
            error.message = '未知错误，请联系管理员';
            break;
        }
      }
      errorLog(error, error.response);
      // dataAxios.config.isLoading && endLoading();
      return Promise.reject(error);
    },
  );
}
export default request;
