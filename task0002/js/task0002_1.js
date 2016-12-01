(function() {
    var inp = document.getElementById('user_input');
    var out = document.getElementById('user_output');
    var Btn = document.getElementById('btn');
    $.click($("#btn"), function(){
        var arr = inp.value.split(/\s+|\n|\,|\，|\;|\、/);
        var unArr = uniuqArr(arr);
        /*var i = 0;
        var len = unArr.length;
        if (len > 10 || unArr == "") {
            $("p").style.disautoPlay = "block";
        } else {
            $("p").style.disautoPlay = "none";
            for (; i < len; i++) {
                var trimValue = trim(unArr[i]); //对每一项进行去除首尾空格操作
                console.log(trimValue);
                if (trimValue !== "") { //只有在去除首尾空格后不为空的数组才输出。
                    out.innerHTML += "<label>" + "<input type='checkbox'>" + trimValue + "</label>"
                }
            }
        }*/
        if (unArr.length > 10) {
            var sg = document.getElementById('suggest');
            sg.style.display="block";
        } else {
            out.innerHTML = "";   //不保留上次点击的输出
            for (var i = 0; i < unArr.length; i++) {
                var trimValue = trim(unArr[i]);
                console.log(trimValue);
                if (trimValue !== "") {
                    out.innerHTML += "<label>" + "<input type = 'checkbox'>" + trimValue + "</label>"
                }
            }
        }


      // out.innerHTML = "<li>" + unValue;
    });
})();

