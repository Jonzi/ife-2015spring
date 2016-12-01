var myText = $('.myText');
var list = $('.list');
var choice = $('.list').getElementsByTagName('li');
var suggestData = ['texotne', 'textwoo', 'textwoothree', 'textonefour'];

//监听input的值
myText.oninput=check;
function check() {
    var input=myText.value;
    if(input==="") {
        list.innerHTML="";
    } else {
        var result; //用来作为li的文本
        var reg= new RegExp("^" +myText.value, "i"); //正则表达式匹配开头

        //设置输入不匹配所有suggestData时隐藏list
        // 一开始假设输入不匹配，输入后，遍历所有后台数据，当所有都不匹配才隐藏list（利用逻辑或）
        // show要定义在for循环外
        var show = false;
        for (var i = 0; i < suggestData.length; i++) {
            show = show || reg.test(suggestData[i]);
            }
        if (!show) {
                list.style.display = 'none'; //全都不匹配时
            }
        // 可匹配时，过滤出匹配的内容
        // 过滤出开头（随输入改变）跟输入的值一样的字符串
        result=suggestData.filter(function(item){
            return item.match(reg);
        });
        var litext="";
        for(var i=0;i<result.length;i++){
            litext+= "<li>"+result[i]+"</li>"
            list.innerHTML=litext;
            list.style.display="block";
            //choice[0].className = 'active';
        }
        for (var i = 0; i < choice.length; i++) {
            //choice[i].innerHTML = suggestData[i]
            choice[i].onclick = function () {
                myText.value = this.innerHTML;
            };
            choice[i].onmousemove = function() {
                for (var i = 0; i < choice.length; i++) {
                    choice[i].className = '';
                    //choice[i].style.cursor = default;
                }
                this.className = 'active';
            }
            choice[i].onmouseleave = function() {
                this.className = '';
            }
        }
    }
}

myText.addEventListener("focus",function(e) {//文本框点击事件
    if(myText.value="") {
        list.innerHTML="";
    }else {
        document.onkeydown = function (e) {
            // 获取键盘按下的字符
            if(window.event) {
                var keynum = e.keyCode;   // IE
            } else if(e.which) {
                var keynum = e.which; // Netscape/Firefox/Opera
            }
            // 向下
            if(keynum==40 && list.style.display ==='block') { //避免选中后列表已经隐藏还能通过上下键切换
                // 改变当前节点下一个节点的样式
                // 去下一个节点的innerText（去除HTML标签）作为值
                var actli=document.querySelector(".active");
                if(actli){
                    if(actli.nextElementSibling==null){
                        //alert(myText.value);
                        return false;   // 访问到最后一个节点，如何返回到第一个？
                    }
                    actli.className="";
                    actli.nextElementSibling.className="active";
                    myText.value = actli.nextElementSibling.innerText;
                } else {
                    choice[0].className = 'active';
                }
            }
            if(keynum==38 && list.style.display ==='block'){
                var actli=document.querySelector(".active");
                if(actli){
                    if(actli.previousElementSibling==null){
                        return false;
                    }
                    actli.previousElementSibling.className="active";
                    myText.value = actli.previousElementSibling.innerText;
                    actli.className="";
                }
            }
            if(keynum==13){
                var actli=document.querySelector(".active");
                var val=actli.innerText;
                myText.value=val;
                actli.className="";
                list.style.display="none";
            }
        }//下拉栏键盘事件
    }
});

// 未解决：
// 循环向下（向上）

// 点击其他区域提示消失(已解决)
window.onload = function() {
    document.onclick = function() {
        list.style.display = 'none';
    }
}



