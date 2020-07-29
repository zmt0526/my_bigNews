$(function () {
    let url = 'http://ajax.frontend.itheima.net'
    
    let form = layui.form 
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位']
        ,
        samePwd: function (value) {
            let oldpwd = $('[name=oldPwd]').val()
            if (value==oldpwd) {
                return '新旧密码不能相同'
            }
        },
        repwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    })


    $('.layui-form').submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: url+'/my/updatepwd',
            data: $('.layui-form').serialize(),
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function (res) {
                console.log(res);
                if (res.status===0) {
                    layui.layer.msg(res.message)
                    $('.layui-form')[0].reset()//重置表单
                } else {
                    layui.layer.msg(res.message)
                }

            }
        })
    })


})