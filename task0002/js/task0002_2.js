window.onload = function() {
    var iNow = null;
    var iNew = null;
    var timer = null;
    var show = $(".show")[0];
    $.click($("button")[0],function() {
        clearInterval(timer);
        var inputTime = $("input")[0].value;
        iNew = new Date(inputTime.replace("-","/"));
        // console.log(iNew);
        // iNow = new Date();  //这里定义的iNow与下面第二个不一样
        // console.log("1"+iNow);
        var reg = /(^\d{4})-(\d{2})-(\d{2}$)/;
        if(!reg.test(inputTime)){
            show.innerHTML = "请按格式输入";
        } else{
            timer = setInterval(function() {
            iNow = new Date();
            // console.log("2"+iNow);
            if (iNew <= iNow) {
                show.innerHTML = "请输入未来的某一天";
            } else {
                var t = Math.floor((iNew - iNow)/1000);
                if (t > 0) {
                    var str = Math.floor( t / 86400) + "天" + Math.floor(t % 86400 / 3600) + "时" + Math.floor(t % 86400 % 3600 / 60) + "分"
                    + Math.floor(t % 60) +"秒";
                    show.innerHTML = "距离" + inputTime.slice(0, 4) + "年" + inputTime.slice(5, 7) + "月" + inputTime.slice(8) + "日" + "还有" + str;
                } else {
                    clearInterval(timer);
                }
            }
            }, 1000);
        }

    });
};
