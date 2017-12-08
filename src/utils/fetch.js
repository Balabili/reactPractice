import fetch from 'isomorphic-fetch';

const ajax = (url, data) => {
  let formatUrl = 'http://192.168.51.66:8088/app' + url;
  if (url.indexOf('http') !== -1) {
    formatUrl = url;
  }
  return new Promise((resolve, reject) => {
    fetch(formatUrl, { method: 'POST', body: JSON.stringify(data) }).then((response) => {
      if (response.ok) {
        return response.json().then((data) => {
          if (data.state === 'success') {
            resolve(data.data);
          } else {
            reject(data.msg);
          }
        });
      } else {
        reject('请求失败，状态码为', response.status);
      }
    }, (err) => { reject(`出错：${err}`); });
  });

}

export default ajax;