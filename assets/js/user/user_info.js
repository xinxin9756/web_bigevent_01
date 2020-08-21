$(function() {
    // 自定义验证规则
    var form = layui.form;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "昵称长度为1~6位之间"
            }
        }
    })

    // 2.用户渲染
    initUserInFo();
    // 导出layer
    var layer = layui.layer;
    // 封装函数
    function initUserInFo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.massage);
                }
                // layer.msg(res.massage);
                // 成功后渲染
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 3.表单重置
    $("#btnReset").on('click', function(e) {
        // 阻止重置
        e.preventDefault();
        // 从新用户渲染
        initUserInFo();
    })

    // 4.修改用户信息
    $(".layui-form").on('submit', function(e) {
        // 阻止重置
        e.preventDefault();
        // 从新用户渲染
        initUserInFo();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.massage);
                }
                // layer.msg(res.massage);
                // 成功后渲染
                layer.msg('修改用户信息成功')
                    // 调用父框架的全局方法
                window.parent.getUserInfo();
            }
        })
    })
})