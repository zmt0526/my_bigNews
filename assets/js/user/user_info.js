$(function () {
    let url='http://ajax.frontend.itheima.net'
    let form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称長度必須在1-6個字符之間'
            }
        }
    })

    let layer=layui.layer
    //初始化用户信息
    function inituserinfo() {
        $.ajax({
            type: 'get',
            url: url + '/my/userinfo',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function (res) {
                if (res.status!==0) {
                  return layer.msg(res.message)
                }  
                console.log(res);
                //layui方式:快速给表单赋值
                form.val('formuserinfo',res.data)
            }
        })
    }

    inituserinfo() 

    //重置表单按钮
    $('.btnreset').on('click', function (e) {
        e.preventDefault()
        inituserinfo() 
    })

    //监听表单提交事件
    $('.layui-form').submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: url + '/my/userinfo',
            data: $(this).serialize(),
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function (res) {
                if (res.status!==0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
              //调用父页面方法 重新渲染页面头像和名称
              getuserinfo()
            }
        })
    })

})