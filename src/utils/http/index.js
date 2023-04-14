// 导入封装好的axios实例
import request from '@/utils/request';

const http = {
  /**
     * methods: 请求
     * @param url 请求地址
     * @param params 请求参数
     */
  get(url, { params, isLoading = true } = {}) {
    const config = {
      method: 'get',
      url,
      isLoading,
    };
    if (params) config.params = params;
    return request(config);
  },
  post(url, { params, isLoading = true } = {}) {
    const config = {
      method: 'post',
      url,
      isLoading,
    };
    if (params) config.data = params;
    return request(config);
  },
  put(url, { params, isLoading = true } = {}) {
    const config = {
      method: 'put',
      url,
      isLoading,
    };
    if (params) config.data = params;
    return request(config);
  },
  delete(url, { params, isLoading = true } = {}) {
    const config = {
      method: 'delete',
      url,
      isLoading,
    };
    if (params) config.params = params;
    return request(config);
  },
};
export default http;
