import axios from "axios";
export default (file, upload_form) => {
    uni.showLoading({ title: "文件传送中...", mask: true });
    return new Promise((resolve, reject) => {
        const service = axios.create({
            // axios中请求配置有baseURL选项，表示请求URL公共部分
            baseURL: upload_form.url,
            // 超时
            timeout: 10000
        });
        const data = new FormData();
        for (var fieldName in upload_form.formdata) {
            data.append(fieldName, upload_form.formdata[fieldName]);
        }
        data.append(upload_form.file_field_name, file);
        service.post('/', data, {
            headers: upload_form.headers,
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        }).then(() => {
            uni.hideLoading();
        });
    });
};
