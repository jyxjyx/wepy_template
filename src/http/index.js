import wepy from 'wepy'
import test from './module/test'

const domain = 'localhost:8081';
// const domian = '';

const apis = Object.assign(
    {}, 
    test
);
export default new  Proxy(apis, {
    get: (target, property) => {
        // TODO:
        // 可扩展接口传参
        return (params) => {
            return new Promise((resolve, reject) => {
                if(!target[property]) throw ReferenceError(`未定义的接口名:${property}`);
    
                wepy.request({
                    url: 'http://' + domain + target[property].url,
                    method: target[property].method,
                    header: { 'content-type': 'application/x-www-form-urlencoded' },
                    data: params,
                    success: (res) => {
                        resolve(res);
                        console.log('success')
                    },
                    fail: err => {
                        reject(err);
                        console.log('error', err)
                    }
                })
    
            })
        }
    }
})