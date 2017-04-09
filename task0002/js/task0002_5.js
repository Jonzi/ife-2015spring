var DragDrop = function() {
    var dragging = null,
        diffX = 0,
        diffY = 0;
    var leftLi = $(".draggable_l"); // 左边
    var rightLi = $(".draggable_r"); // 右边
    var list = $(".list"); // 全部
    var previousTop; // 刚点击鼠标时的位置top
    function handleEvent(event) {
        event = event || window.event;
        var target = event.target || event.srcElement;
        switch(event.type) {

            case "mousedown":
                if (target.className.indexOf("draggable") > -1) {
                    dragging = target;
                    diffX = event.clientX - target.offsetLeft;
                    diffY = event.clientY - target.offsetTop;
                    previousTop = dragging.style.top; // 用于拖拽不成功返回原处
                }
                break;

            case "mousemove":
                if (dragging !== null) {
                    dragging.style.left = (event.clientX - diffX) + "px";
                    dragging.style.top = (event.clientY - diffY) + "px";
                    dragging.style.opacity = 0.5;
                    if (dragging.className.indexOf('move') === -1) {
                        addClass(dragging, 'move');
                    }

                }
                break;

            case "mouseup":
                // 当前的位置
                var currentLeft = parseInt(dragging.style.left);
                var currentTop = parseInt(dragging.style.top);

                // 从左向右
                if (dragging.className.indexOf("draggable_l") > -1) {
                    if (currentLeft > 300 ) {
                        var rightLi = $(".draggable_r");

                        // 高度是40的几倍
                        var count = Math.round(currentTop / 40);
                        if (count > rightLi.length-1) { // 已经拖到放置容器的队尾 直接最后面添加节点
                            dragging.style.top = 40 * (rightLi.length) + 'px';
                            $('#rightList').appendChild(dragging);
                        } else if (count <= 0) { // 拖到最上方
                            dragging.style.top = 0;
                            each(rightLi, function (item) {
                                item.style.top = parseInt(item.style.top) + 40 + 'px';
                            })
                            $('#rightList').insertBefore(dragging, $('.draggable_r')[0]);
                        } else { // 插入
                            dragging.style.top = 40 * count + 'px';
                            // 因为是插入
                            // 所以后边整体后移一个高度
                            for (var i = count; i < rightLi.length; i++) {
                                rightLi[i].style.top = parseInt(rightLi[i].style.top) + 40 + 'px';
                            }
                            // 插入节点
                            $('#rightList').insertBefore(dragging, $('.draggable_r')[count]);

                        }
                        dragging.style.left = 0 + "px";
                        dragging.className = "draggable_r";

                        // 重新排列，去除移走后留下的空白
                        if (dragging.className.indexOf('draggable_r') > -1) {
                            var leftLi = $('.draggable_l');
                            var num = leftLi.length;
                            for (var i = 0; i < num; i++) {
                                $('.draggable_l')[i].style.top = 40 * i + 'px';
                            }
                        }

                    } else if (currentLeft < 300) {
                        // 视为取消拖拽
                        dragging.style.top = previousTop;
                        dragging.style.left = 0 + "px";
                    }

                } else if (dragging.className.indexOf("draggable_r") > -1) { // 从右向左
                    if (currentLeft < -300 ) {
                        // 插入节点
                        var count = Math.round(currentTop / 40);    // 判断重叠时该在第几个前插入
                        var leftLi = $(".draggable_l");
                        if (count > leftLi.length) {
                            dragging.style.top = 40 * (leftLi.length) + 'px';
                            $('#leftList').appendChild(dragging);
                        } else if (count <= 0) {
                            dragging.style.top = 0;
                            each(leftLi, function (item) {
                                item.style.top = parseInt(item.style.top) + 40 + 'px';
                            })
                            $('#leftList').insertBefore(dragging, $('.draggable_l')[0]);
                        } else {

                            dragging.style.top = 40 * count + 'px';

                            for (var i = count; i < leftLi.length; i++) {
                                leftLi[i].style.top = parseInt(leftLi[i].style.top) + 40 + 'px';
                            }
                            $('#leftList').insertBefore(dragging, $('.draggable_l')[count]);
                        }

                        dragging.style.left = 0 + "px";
                        dragging.className = "draggable_l";
                        // 移走后有空距
                        // 重新排列
                        var leftLi = $('.draggable_r');
                        var num = leftLi.length;
                        for (var i = 0; i < num; i++) {
                            $('.draggable_r')[i].style.top = 40 * i + 'px';

                        }
                        // }
                    } else if (currentLeft > -300) {
                        dragging.style.left = 0 + "px";
                        dragging.style.top = previousTop;
                    }
                }
                removeClass(dragging, 'move');
                dragging.style.opacity = 1;
                dragging = null;
                break;
        }
    }

    return {
        enable: function() {
            $.on(document, "mousedown", handleEvent);
            $.on(document, "mousemove", handleEvent);
            $.on(document, "mouseup", handleEvent);
        },

        disable: function() {
            $.un(document, "mousedown", handleEvent);
            $.un(document, "mousemove", handleEvent);
            $.un(document, "mouseup", handleEvent);
        }
    }
}();

DragDrop.enable();


// 禁止选中文本
window.onload = function () {
    var element = document;
    if (typeof(element.onselectstart) != "undefined") {
        // IE下禁止元素被选取
        element.onselectstart = new Function("return false");
    } else {
        // firefox下禁止元素被选取的变通办法
        element.onmousedown = new Function("return false");
        element.onmouseup = new Function("return true");
    }
}

