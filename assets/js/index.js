$(function() {
    // 1.获取用户信息
    getUserInfo();
    // console.warn("警告");
    // console.error('报错');
});

// 2.退出
var layer = layui.layer;
$("#btn_logout").on('click', function() {
        //框架提供的询问框
        layer.confirm('是否确认退出?', {
            icon: 3,
            title: '提示'
        }, function(index) {
            //清空本地token
            // layer.close(index);
            localStorage.removeItem('token');
            // 页面跳转
            location.href = '/login.html';
            // 关闭询问框
            layer.close(index)
        });
    })
    // 获取用户信息（封装入口函数的外面）
    // 原因：后面其他的页面要调用
function getUserInfo() {
    // 发送ajax
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     // 重新登录，因为token过期时间12小时
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res);
            // 判断状态码
            if (res.status !== 0) {
                // 请求失败
                return layui.layer.msg(res.message)
            }
            // 请求成功,渲染用户头像信息
            renderAvatar(res.data);
        }

    })
};

// 封装用户头像渲染函数
function renderAvatar(user) {
    // 用户名（昵称优先，没有用username）;
    var name = user.nickname || user.username;
    $("#welcome").html('欢迎&nbsp;&nbsp;' + name);
    // 2.用户头像
    if (user.user_pic != null) {
        // 有头像
        $(".layui-nav-img").show().attr('src', user.user_pic);
        $(".user-avatar").hide();
    } else {
        // 没有头像
        $(".layui-nav-img").hide();
        var text = name[0].toUpperCase();
        $(".user-avatar").show().html(text);
    }
}