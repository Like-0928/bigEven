$(function () {


    initArtCateList()
    var layer = layui.layer
    var form = layui.form

    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    // 为添加按钮添加点击事件
    var indexAdd = null;
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog').html()
        });
    })

    // 通过代理的行为,为form-add表单绑定事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败')
                }
                initArtCateList()
                layer.msg('新增分类成功')

                // 这是根据索引,关闭对应的弹出层
                layer.close(indexAdd)
            }
        })

    })


    // 文章分类的编辑功能 
    // 1.为编辑按钮绑定点击事件
    var indexEdit = null;
    $('tbody').on('click', '.bianAdd', function () {
        // 这是弹出一个修改文章的分类弹层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }

        })
    })



    // 文章分类的修改功能
    // 通过代理的行为,为修改分类的表单绑定submit事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类信息失败')
                }

                layer.msg('更新分类信息成功')

                // 这是根据索引,关闭对应的弹出层
                layer.close(indexEdit)
                initArtCateList()
            }
        })

    })


    // 删除按钮的绑定事件
    $('tbody').on('click', '.shanAdd', function () {
        var id = $(this).attr('data-id')

        // 这是提示用户是否要删除
        layer.confirm('确定要删除吗?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章分类失败！')
                    }
                    layer.msg('删除文章分类成功！')
                    layer.close(index);
                    initArtCateList()
                }
            })

        })
    })

})