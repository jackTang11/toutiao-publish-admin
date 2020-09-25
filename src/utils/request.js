import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

//Add a request interceptor
request.interceptors.request.use(
  function (config) {
    const  user = JSON.parse(window.localStorage.getItem('user'))
    if(user){
      config.headers.Authorization = `Bearer ${user.token}`
    }

    return config
  },

  function (error) {
    return Promise.reject(error)
  }
)


// Add a response interceptor
request.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});


export default request
