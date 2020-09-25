import request from '@/utils/request.js';


export const login = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data
  });
}

export const getUserInfo = () => {
    return  request({
      method: 'GET',
      url: '/mp/v1_0/user/profile'
    });
}
