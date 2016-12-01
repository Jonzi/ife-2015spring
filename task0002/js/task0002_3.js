window.onload = function () {
    clearTimeout(timer);

    var container = document.getElementsByClassName("container")[0];
    var list = document.getElementsByClassName('list')[0];
    var buttons = document.getElementsByClassName('buttons')[0].getElementsByTagName('span');
    var prev = document.getElementsByClassName('prev')[0];
    var next = document.getElementsByClassName('next')[0];
    var index = 1;
    var len = 5;
    var animated = false;
    var interval = 2000;
    var timer;



    function animate(offset) {
        animated = true;
        var left = parseInt(list.style.left) + offset ;
        //加入动画
        var time = 470; //位移总时间
        var interval = 10; // 隔10ms位移一次
        var speed = offset / (time/interval);//每次位移量

        var go = function() {
            if ((speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
                //clearInterval(timer);
                speed = speed>0? Math.ceil(speed):Math.floor(speed);
                list.style.left = parseInt(list.style.left)+ speed + 'px';
                setTimeout(go, interval);
            } else {
                list.style.left = left + 'px';
                if (left > -940) {
                    list.style.left = "-4700px";
                }
                if (left < -4700) {
                    list.style.left = "-940px";
                }
                animated = false;
            }
        }
        go();

    }

    function play() {
        clearTimeout(timer);
        timer = setTimeout(function() {

            next.onclick();
            play(); //不加入则只自动滚动一次，只播放下一张一次
        }, interval);
        }



    function stop() {
        clearTimeout(timer);
    }

    function showButton() {
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className === "on") {
                buttons[i].className = "";
                break;
            }
        }
        buttons[index-1].className = "on";
    }

    next.onclick = function () {
        // 避免切换到其它页面再切回来轮播图次序混乱飞快播放
        if (animated) {
            return;
        }
        if (index === 5) {
            index = 1;
        } else {
            index += 1;
        }
        animate(-940);
        showButton();
    };
    prev.onclick = function() {
        if (animated) {
            return;
        }
        if (index === 1) {
            index = 5;
        } else {
            index -= 1;
        }
        animate(940);
        showButton();
    }
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {
            if (animated) {
                return;
            }
            if (this.className == "on") {
                return;
            }

            var myIndex = parseInt(this.getAttribute("index"));

            var offset = -940 * (myIndex - index);
            animate(offset);
            index = myIndex;
            showButton();


        }
    }

    play();

    container.onmousemove = stop;
    container.onmouseleave = play;
}

// 通过animated的设置，使得判断当前是否正在进行动画过渡得到允许
// 从而当触发箭头点击事件及按钮点击事件时，自动播放停止，不然会有一些bug出现
// 如果当前正在进行动画过渡使轮播图人为点击箭头按钮或底下五个导航按钮时不会影响到自动播放
// 通过在next.onclick中设置if(animated) {return;} 可以避免切换到其他页面再切回来轮播图次序混论及飞速滚动

// 动画过渡仍不完美，接近停止时有抖动

