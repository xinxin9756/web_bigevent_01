// 入口函数
$(function() {
    // 1.点击去注册账号，隐藏登陆区域，显示注册区域
    $("#link_reg").on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 2.点击去登录，隐藏注册区域，显示登陆区域
    $("#link_login").on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    // 3.自定义验证规则
    var form = layui.form;
    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,16}$/,
            "密码必须6-16位，且不能为空格"
        ],
        // 确认密码规则
        repwd: function(value) {
            //选择器必须带空格，选择的是后代中的input，name属性值为password的那一个标签
            var pwd = $(".reg-box [name=password]").val()
                // 比较
            if (value != pwd) {
                return '两次密码不一致，请重新输入'
            }
        }
    });
    // 4.注册功能
    var layer = layui.layer;
    $("#form_reg").on('submit', function(e) {
            // 阻止表单提交
            e.preventDefault();
            // alert($(this).serialize())
            // 发送ajax
            $.ajax({
                method: 'POST',
                url: 'http://ajax.frontend.itheima.net/api/reguser',
                data: {
                    username: $(".reg-box [name=username]").val(),
                    password: $(".reg-box [name=password]").val(),
                },
                success: function(res) {
                    // 返回判断状态
                    if (res.status != 0) {
                        // return alert(res.message);
                        return layer.msg(res.message);
                    }
                    // alert(res.message);
                    layer.msg('注册成功，请登录！');
                    $("#link_login").click();
                    $("#form_reg")[0].reset();

                }
            })
        })
        // 5.登陆功能（给form标签绑定事件，button按钮出发提交事件）
    $("#form_login").submit(function(e) {
        // 阻止表单默认提交
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method: 'POST',
            // url: 'http://ajax.frontend.itheima.net/api/login',
            url: 'api/login',
            // serialize获取form表单元素里面的内容
            data: $(this).serialize(),
            success: function(res) {
                // console.log(res);
                // 校验返回状态
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 提示信息，保存token，跳转页面
                layer.msg('恭喜您登陆成功');
                // 保存token，未来的接口要是用token
                localStorage.setItem('token', res.token);
                // 跳转
                location.href = "/index.html"
            }
        })
    })
})