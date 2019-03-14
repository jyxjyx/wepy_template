// 对对象的深拷贝
export default function deepclone(data) {
    if(!data || typeof data !== 'object' || typeof data === 'function') return data;
    const CP_constructor = data.constructor;
    let cloneObj = new CP_constructor();
    Object.getOwnPropertyNames(data).forEach(nameItem => {
        cloneObj[nameItem] = deepclone(data[nameItem]);
    })
    return cloneObj;
}