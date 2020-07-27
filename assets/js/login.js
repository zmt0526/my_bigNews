$(function () {
    let url = 'http://ajax.frontend.itheima.net'

    //点击去注册
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()

    })

    //点击去登陆
    $('#link-login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    //自定义表单校验
    //https://www.layui.com/doc/modules/form.html#verify
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //校验两次密码是否一致
        repwd: function (repwd) {
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== repwd) {
                return '两次密码不一致!'
            }
        },
        uname: [
            /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/, '用户名必须字母开头，允许字母数字下划线,长度为5-16字，)'
        ]
    })

    //注册账号
    $('#form-reg').on('submit', function (e) {
        e.preventDefault()
        let data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val()
        }
        $.post(url + '/api/reguser', data, function (res) {
            if (res.status !== 0) {
                layer.msg(res.message);
                return
            }
            layer.msg('注册成功请登录');//layui的内置弹出层
            $('#link-login').click()//去登陆按钮的自调用 切换到登录界面
        })
    })

    //监听登陆表单提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: url + '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status!==0) {
                    layer.msg(res.message);
                    return
                }
                layer.msg(res.message);
                //把token存到本地
                localStorage.setItem('token', res.token)
                
                //跳转页面
                location.href='./index.html'

            }
        })
    })






})// 最后一个括号