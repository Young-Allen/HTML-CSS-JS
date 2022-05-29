window.addEventListener('load', function() {
    var btnl = this.document.querySelector('.prev');
    var btnr = this.document.querySelector('.next');
    var img = this.document.querySelector('img');
    var nav = this.document.querySelector('.nav');
    var focus = this.document.querySelector('.focus');
    var tb = this.document.querySelector('.tb');

    tb.addEventListener('mouseenter', function() {
        timer = null;
        console.log('tb');
    })

    //动态生成小圆圈，有几张图片就生成几个小圆圈
    for (var i = 0; i < focus.children.length; i++) {
        //创建一个li
        var li = this.document.createElement('li');

        //记录当前校园去哪的索引号，通过自定义属性来做
        li.setAttribute('index', i);

        //把li插入到ul里面
        nav.appendChild(li);

        //小圆圈的排他思想，我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function() {
            //清除所有的li的类名
            for (var i = 0; i < nav.children.length; i++) {
                nav.children[i].className = '';
            }
            //留下自己的 设置当前的类名
            this.className = 'sel';

            //点击小圆圈，移动图片
            //当我们点击了某个li，就拿到当期的li的索引号
            var index = this.getAttribute('index');

            //当我们点击了某个li，就要把这个li的索引号给num 和 circle
            num = index;
            circle = index;

            // console.log(index);
            //ul移动的距离 = 小圆圈的索引号 * 图片的宽度（注意是负值）
            var focuswidth = focus.offsetWidth;

            animatemove(focus, -index * 520)

        })
    }
    //把第一个小圆圈类名设置为默认
    nav.children[0].className = 'sel';

    //克隆第一张图片li放到ul最后面
    var first = focus.children[0].cloneNode(true);
    focus.appendChild(first);

    //cricle是控制小圆点跟随图片移动的变量
    var circle = 0
        //点击右侧按钮，图片滚动一张
    var num = 0;

    btnr.addEventListener('click', function() {
        //如果走到了最后复制的一张照片，此时，我们的ul要快速恢复原 left 改为 0
        if (num == focus.children.length - 1) {

            focus.style.left = 0;
            num = 0;
        }
        num++;
        animatemove(focus, -num * 520);


        //点击右侧按钮，小圆圈跟随一起变化
        circle++;
        //如果circle==4 说明走到最后我们克隆的这张图了，我们就复原
        if (circle == nav.children.length) {
            circle = 0;
        }
        //先清除其余小圆圈的sel类名
        for (var i = 0; i < nav.children.length; i++) {
            nav.children[i].className = '';
        }
        //留下当前的小圆圈的sel类名
        nav.children[circle].className = 'sel';

        console.log(circle);
    })

    btnl.addEventListener('click', function() {
        //如果走到了最后复制的一张照片，此时，我们的ul要快速恢复原 left 改为 0
        if (num == 0) {
            num = focus.children.length - 1;
            focus.style.left = -num * 520 + 'px';
        }
        num--;
        animatemove(focus, -num * 520);


        //点击右侧按钮，小圆圈跟随一起变化
        circle--;
        //如果circle < 0 说明走到最后我们克隆的这张图了，我们就复原
        if (circle < 0) {
            circle = nav.children.length - 1;
        }
        //先清除其余小圆圈的sel类名
        for (var i = 0; i < nav.children.length; i++) {
            nav.children[i].className = '';
        }
        //留下当前的小圆圈的sel类名
        nav.children[circle].className = 'sel';

        console.log(circle);
    })

    //自动播放轮播图
    // var timer = this.setInterval(function() {
    //     //手动调用点击事件
    //     btnr.click();
    // }, 2000);
})