import axios from "axios";
export default (file, upload_form) => {
    uni.showLoading({ title: "文件传送中...", mask: true });
    return new Promise((resolve, reject) => {
        const service = axios.create({
            // axios中请求配置有baseURL选项，表示请求URL公共部分
            baseURL: upload_form.url,
            // 超时
            timeout: 20000
        });
        const data = new FormData();
        for (var fieldName in upload_form.formdata) {
            data.append(fieldName, upload_form.formdata[fieldName]);
        }
        data.append(upload_form.file_field_name, file);
        service.post('/', data, {
            headers: upload_form.headers,
        }).then(res => {
            console.log('upload.res.data', res.data);
            uni.hideLoading();
            const isOK = (res.data.errno === 0)
            uni.showToast({ title: res.data.message, icon: isOK ? "success" : "none" });
            resolve(res.data);
        }).catch(err => {
            uni.hideLoading();
            uni.showToast({ title: "上传失败\r\n" + err, icon: "none" });
        }).then(() => {
        });
    });
};
