$(function() {
    var layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 为上传按钮绑定点击事件
    $('#btnChooseImage').on('click', function() {
        $('#file').click();
    });

    // 为文件选择框绑定 change 事件
    var layer = layui.layer;
    $("#file").on('change', (function(e) {
        // 获取用户选择的文件
        // var filelist = e.target.files
        // console.log(filelist);
        var file = e.target.files[0];
        // 非空校验
        if (file === undefined) {
            return layer.msg('请选择图片！')
        }
        // 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file)

        // 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    }))

    // 4.上传头像
    // 为确定按钮，绑定点击事件
    $("#btnUpload").on('click', function() {
        // 获取base64类型的头像（字符串）
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            // 发送ajax
            // console.log(dataURL);
            // console.log(typeof dataURL);
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);

                }
                layer.msg('头像更换成功')
                window.parent.getUserInfo();
            }
        })
    })
})