import axios from 'axios'
function apiAxios(method, url, data, params, success, failure) {
   axios({
      method: method,
      url: url,
      data: data,
      params: params,
      headers: {
         'Content-Type': 'application/json;charset=UTF-8',
         'token': localStorage.getItem('token')
      }
   })
      .then(function (res) {

         if (res.data.errCode == 10000) {
            success(res.data);
         }
         else {
            failure(res.data);
         }

      })
      .catch(function (err) {
         console.log(err);
         failure(-1);
      })

}
export default {

   get: function (url, data, success, failure) {
      return apiAxios('get', url, null, data, success, failure);
   },
   post: function (url, data, success, failure) {

      return apiAxios('post', url, data, null, success, failure);

   }
}