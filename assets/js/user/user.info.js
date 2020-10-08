$(function () {
    var form = layui.form
    var layer = layui.layer


    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间!'
            }
        }
    })
    inituserInfo()

    // 初始化用户的基本信息
    function inituserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // 调用form.val()快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }


    //重置表单的数据
    $('#btnReset').on('click', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        inituserInfo()
    })


    $('.layui-form').on('submit', function (e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                // 调用父页面中的方法,重新渲染用户的头像和信息
                window.parent.getUserInfo()
            }
        })
    })
})