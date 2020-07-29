//获取用户信息
function getuserinfo() {
    $.ajax({
        type: "get",
        url:'http://ajax.frontend.itheima.net/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            console.log(res);
            if (res.status == 0) {
                randeravatar(res.data)
            } else {
                return layui.layer.msg(res.message)
            }
        },//无论成功还是失败都会调用complete
        complete: function (res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败") {
                localStorage.removeItem('token')
                location.href = '/bigNews/login.html'
            }
        }
    })
}

// 渲染用户名和头像
function randeravatar(user) {
    //渲染用户名
    let name = user.nickname || user.username
    $('#welcome').html('欢迎您&nbsp;' + name)

    //渲染用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()//字符串头像第一个字符大写
        $('.text-avatar').html(first).show()
    }
}
