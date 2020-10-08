//每次调用$.get() 或$.post() 或$.ajax()的时候,都会先调用$.ajaxPerfilter()这个函数
//在这个函数中就能拿到我们ajax提供的配置对象 options是一个形参
$.ajaxPrefilter(function (options) {
    //在发起真正的ajax请求之前,统一拼接请求的跟路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url


    // 统一为有权限的接口,设置Header 请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂载complete回调函数
    options.complete = function (res) {
            // complete回调函数中可以使用res.responseJSON 拿到服务器响应回来的数据
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                // 1.强制清空token
                localStorage.removeItem('token')
                // 2.强制跳转到登录页面
                location.href = '/login.html'
            }
    }
})