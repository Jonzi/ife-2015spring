/**
 * Created by Caizirong on 16/10/17.
 */
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    // return arr instanceof Array;  // 不够准确
    return Object.prototype.toString.call(arr) === '[object Array]';
}

/*
 *或者这样也可以
function isArray(arr) {
    return Array.isArray(arr);
}
*/

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return Object.prototype.toString.call(fn) === '[object Function]';
}

// 将对象及其名称作为参数传入时，显示对象的属性
function showProps(obj, objName) {
  var result = "";
  for (var i in obj) {
    console.log(i);
    console.log(obj[i]);
    if (obj.hasOwnProperty(i)) {
        result += objName + "." + i + " = " + obj[i] + "\n";
    }
  }
  return result;
}

/*
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};

console.log(showProps(srcObj,'srcObj'));
-->srcObj.a = 2
-->srcObj.b = [object Object]
*/

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    var o;
    if (Object.prototype.toString.call(src) === "[object Array]") {
        o = [];
    } else {
        o = {};
    }
    for (var i in src) {
        if (src.hasOwnProperty(i)) {
            if (typeof src[i] === "object") {
                o[i] = cloneObject(src[i]);
            } else {
                o[i] = src[i];
            }
        }
    }
    return o;
}

/*
// 测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);  // 2
console.log(abObj.b.b1[0]); // "Hello"

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"
*/

//数组去重
function uniuqArr(arr) {
    var newArr = [];
    for (var i in arr) {
        if (newArr.indexOf(arr[i]) === -1) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
/*
var arr = [2,3,3,4];
console.log(uniuqArr(arr));


//trim方法去除空格

//比较笨的方法
function simpleTrimW(str) {
    var newStr = "";
    var pos = str.indexOf(" ");
    while(pos > -1) {
        var pos_previous = pos;
        pos = str.indexOf(" ", pos + 1);
        if (pos != pos_previous +1 ) {  //说明中间隔了非空格字符
            break;
        }
    }
    var posTwo = str.lastIndexOf(" ");
    console.log(posTwo);
    while(posTwo > -1) {
        var posTwo_pre = posTwo;
        posTwo = str.lastIndexOf(" ", posTwo - 1);
        if (posTwo != posTwo_pre - 1) {
            break;
        }
    }
    return(str.slice(pos_previous + 1, posTwo_pre));
}
var str = "    hi ed  ";
console.log(simpleTrim(str)); //hi ed

//去除所有空格和制表符
function simpleTrim1(str) {
    var newStr = "";
    for (var i = 0; i < str.length; i++) {

        if (str[i] != " " && str [i] != "\t") {
           newStr = newStr.concat(str[i]); //中间出现的也会被去除
        }
    }
    console.log(newStr);
}
var str = "   h i           io  \t o";
console.log(str);
simpleTrim1(str); // hiioo
*/

function simpleTrim(str) {
    var newStr = "";
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) != " " && str.charAt(i) != "\t") {
            break;
        }
    }
    for (var j = str.length - 1; j >= 0; j--) {
        if (str.charAt(j) != " " && str.charAt(j) != "\t") {
            break;
        }
    }
    newStr = str.slice(i, j+1);
    console.log(newStr);
}
/*
var str = "  hel  log     ";
simpleTrim(str); //hel  log
*/

function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}
//var str = '   hi!  ';
//str = trim(str);
//console.log(str); // 'hi!'

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for (var i in arr) {  // 遍历数组
        fn(arr[i],i);     // 针对数组中每一个元素执行fn函数
    }
}
/*
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item) //java c php html
}
each(arr, output);

var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);//0: java
                  // 1: c
                  // 2: php
                  // 3: html

*/
function eachA(arr, fn) {
    arr.forEach(fn);
}
//var arr = ['java', 'c++', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
//eachA(arr, output); //0: java, 1: c++, 2: php, 3: html

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var n = 0;
    for (var key in obj) {
      //  console.log(key); //a, b, c
        n++;
    }
    return n;
}

/*
// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3
*/

// 判断是否为邮箱地址
function isEmail(emailStr) {
    // math_phys.d.d@VIP.163.com
    // 用户名必须以字母开头，不能以点结尾
    // 考虑域名的级联
    var pattern = /^(\w+\.)*\w+@\w+(\.\w+)+$/;
    return pattern.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var pattern = /^(\+\d{1,4})?\d{7,11}$/;
    return pattern.test(phone);
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    var oldClassName = element.className;
    element.className = oldClassName === "" ? newClassName : oldClassName + " " + newClassName;
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var originalClassName = element.className; // 取原来的所有类名
    var pattern = new RegExp("\\b" + oldClassName + "\\b"); // 匹配指定类名
    element.className = originalClassName.replace(pattern,''); // 移除样式
}


// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var pos = {};
    pos.x = element.getBoundingClientRect(element).left + Math.max(document.documentElement.scrollLeft,
        document.body.scrollLeft);
    pos.y = element.getBoundingClientRect(element).top + Math.max(document.documentElement.scrollTop,
        document.body.scrollTop);
    return pos;
}

// 实现一个简单的Query
function $(selector) {
    if (!selector) {
        return null;
    }

    if (selector == document) {
        return document;
    }

    selector = selector.trim(); //去除首尾空格
    if (selector.indexOf(" ") !== -1) {    // 存在空格，即组合查询
        var selectorArr = selector.split(/\s+/);

        var rootScope = myQuery(selectorArr[0]);  // 找出在第一个查询条件下的所有子节点，作为第二次查询的范围
        var i = null;
        var j = null;
        var result = [];

        for (i = 1; i < selectorArr.length; i++) {  // i从1开始，rootScope即i=0时
            for (j = 0; j < rootScope.length; j++) {
                result.push(myQuery(selectorArr[i], rootScope[j]));
            }
        }
        return result[0][0];
    } else {  // 单一查询
        return myQuery(selector,document)[0];
    }

}

/**
 * 针对一个内容查找结果 success
 * @param  {String} selector 选择器内容
 * @param  {Element} root    根节点元素
 * @return {NodeList数组}    节点列表，可能是多个节点也可能是一个
 */
function myQuery(selector, root) {
    var signal = selector[0]; //
    var allChildren = null;
    var content = selector.substr(1);
    var currAttr = null;
    var result = [];
    root = root || document; //若没有给root，赋值document
    switch (signal) {
        case "#":
            result.push(document.getElementById(content));
            break;
        case ".":
            allChildren = root.getElementsByTagName("*");
            // var pattern0 = new RegExp("\\b" + content + "\\b");
            for (i = 0; i < allChildren.length; i++) {
                currAttr = allChildren[i].getAttribute("class");
                if (currAttr !== null) {
                    var currAttrsArr = currAttr.split(/\s+/);
                    console.log(currAttr);
                    for (j = 0; j < currAttrsArr.length; j++) {
                        if (content === currAttrsArr[j]) {
                            result.push(allChildren[i]);
                            console.log(result);
                        }
                    }
                }
            }
            break;
        case "[": //属性选择
            if (content.search("=") == -1) { //只有属性，没有值
                allChildren = root.getElementsByTagName("*");
                for (i = 0; i < allChildren.length; i++) {
                    if (allChildren[i].getAttribute(selector.slice(1, -1)) !== null) {
                        result.push(allChildren[i]);
                    }
                }
            } else { //既有属性，又有值
                allChildren = root.getElementsByTagName("*");
                var pattern = /\[(\w+)\s*\=\s*(\w+)\]/; //为了分离等号前后的内容
                var cut = selector.match(pattern); //分离后的结果，为数组
                var key = cut[1]; //键
                var value = cut[2]; //值
                for (i = 0; i < allChildren.length; i++) {
                    if (allChildren[i].getAttribute(key) == value) {
                        result.push(allChildren[i]);
                    }
                }
            }
            break;
        default: //tag
            result = root.getElementsByTagName(selector);
            break;
    }
    return result;
}

/*
// 可以通过id获取DOM对象，通过#标示，例如
$("#adom"); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
$("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
$(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
$("[data-log]"); // 返回第一个包含属性data-log的对象

$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象
*/

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if (element.addEventListener) {   // IE8+
        element.addEventListener(event,listener);
    } else if (element.attachEvent) {  // IE8以下
        element.attachEvent("on" + event, listener);
    } else {
        element["on" + event] = listener;  // dom0级
    }
}

// 例如：
//function clicklistener(event) {
//    ...
//}
//addEvent($("#doma"), "click", a);

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if (element.removeEventListener) {
        element.removeEventListener(event,listener);
    } else if (element.detachEvent) {
        element.detachEvent("on" + event, listener);
    } else {
        element["on" + event] = null;
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element, "click", listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element, "keydown", function(event) {
        event = event || window.event;
        if (event.keyCode === 13) {
            listener();
        }
    })
}

//接下来我们把上面几个函数和$做一下结合，把他们变成$对象的一些方法

$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.enter = addEnterEvent;
// task 4.2
// 对一个列表里所有的<li>增加点击事件的监听
function clickListener(event) {
    console.log(event);
}

/*
$.click($("#item1"), clickListener);
$.click($("#item2"), clickListener);
$.click($("#item3"), clickListener);
*/


// 我们通过自己写的函数，取到id为list这个ul里面的所有li，然后通过遍历给他们绑定事件。这样我们就不需要一个一个去绑定了。
function clickListener(event) {
    console.log(event);
}

function renderList() {
    $("#list").innerHTML = '<li>new item</li>';
}

function init() {
    /*
    each($("#list").getElementsByTagName('li'), function(item) {
        $.click(item, clickListener);
    });
    */

    $.click($("#btn"), renderList);
}

function delegateEvent(element,tag,eventName,listener){
    addEvent(element, eventName, function(event){
        var target = event.target || event.srcElement;
        if(target.tagName.toLowerCase() == tag.toLowerCase()) {
            listener.call(target, event);
        }
    });
}

$.delegate = delegateEvent;
//$.delegate($("#list"), "li", "click", clickHandle);



//判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var s = navigator.userAgent.toLowerCase();
    console.log(s);
    //ie10的信息：
    //mozilla/5.0 (compatible; msie 10.0; windows nt 6.2; trident/6.0)
    //ie11的信息：
    //mozilla/5.0 (windows nt 6.1; trident/7.0; slcc2; .net clr 2.0.50727; .net clr 3.5.30729; .net clr 3.0.30729; media center pc 6.0; .net4.0c; .net4.0e; infopath.2; rv:11.0) like gecko
    var ie = s.match(/rv:([\d.]+)/) || s.match(/msie ([\d.]+)/);
    if (ie) {
        return ie[1];
    } else {
        return -1;
    }
}


function setCookie(cookieName, cookieValue, expiredays) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate + expiredays);
    document.cookie = cookieName + '=' + cookieValue + ';expires=' + oDate;
}

function getCookie(cookieName) {
    var arr = document.cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("=");
        if (arr2[0] === cookieName) {
            return arr2[1];
        }
    }
    return "";
}


function removeCookie(cookieName) {
    setCookie(cookieName, "1", -1);
}

//AJAX
function ajax(url, options) {
    // 创建对象
    xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    // 处理data
    if (options.data) {
        var dataArr = [];
        for (var item in options.data) {
            dataArr.push(item + "=" + options.data[item]);
        }
        var newData = dataArr.join("&");
    }
    // 处理type
    if (!options.type) {
        options.type = "GET";
    }
    options.type = options.type.toUpperCase();
    // 发送请求
    if (options.type = "GET") {
        var newUrl = '';
        if (options.data) {
            newUrl = url + "?" + newData;
        } else {
            newUrl = url;
        }
        xhr.open("GET", newUrl, true);
        xhr.send();
    } else if (options.type = "POST") {
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }
    // onreadystatechange 事件
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (options.success) {
                    options.success(xhr.responseText, xhr.responseXML);
                }
            } else {
                if (options.onfail) {
                    options.onfail();
                }
            }
        }
    }
}
