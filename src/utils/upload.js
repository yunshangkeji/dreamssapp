import axios from "axios";
export default (file) => {
    uni.showLoading({ title: "文件传送中...", mask: true });
    return new Promise((resolve, reject) => {
        const service = axios.create({
            // axios中请求配置有baseURL选项，表示请求URL公共部分
            baseURL: 'https://upload.qiniup.com',
            // 超时
            timeout: 10000
        });
        const data = new FormData();
        data.append('file', file);
        service.post('/', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        }).then(() => {
            uni.hideLoading();
        });
    });
};
