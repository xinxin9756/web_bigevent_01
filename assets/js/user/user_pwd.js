$(function() {
    // 1.定义校验规则
    var form = layui.form;
    form.verify({
        // 1.1密码
        pwd: [
            /^[\S]{6,16}$/,
            "密码必须6-16位，且不能为空格"
        ],
        // 1.2新旧密码不重复
        samePwd: function(value) {
            if (value === $("[name=oldPwd]").val()) {
                return '新密码和原密码不能相同，请重新输入！'
            }
        },
        // 1.3两次新密码必须相同
        rePwd: function(value) {
            if (value !== $("[name=newPwd]").val()) {
                return '两次新密码输入不一致，请重新输入！'
            }
        }
    })

    // 2.表单提交
    $(".layui-form").on('submit', function(e) {
        // e.preventDedault();
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg('修改密码成功！');
                $('.layui-form')[0].reset();
            }
        })
    })
})