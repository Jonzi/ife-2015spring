#任务
掌握`JavaScript`基础知识，能够使用`JavaScript`编写一些复杂度不大的交互功能。                                      
##1.创建第一个页面交互
### 了解`javascript`是什么
* JavaScript 是一门跨平台、面向对象的轻量级脚本语言。 在宿主环境（例如 web 浏览器）中， JavaScript 能够通过其所连接的环境提供的编程接口进行控制。* JavaScript 内置了一些对象的标准库，比如数组（Array），日期（Date），数学（Math）和一套核心语句，包括运算符，流程控制符以及申明方式等。JavaScript 的核心部分可以通过添加对象来扩展语言以适应不同用途；例如：
客户端的 JavaScript 通过提供控制浏览器及其文档对象模型（DOM）的对象来扩展语言核心。例如：客户端版本直接支持应用将元素放在HTML表单中并且支持响应用户事件比如鼠标点击、表单提交和页面导航。
服务端的 JavaScript 则通过提供有关在服务器上运行 JavaScript 的对象来可扩展语言核心。例如：服务端版本直接支持应用和数据库通信，提供应用不同调用间的信息连续性，或者在服务器上执行文件操作。
### 如何在HTML页面上加载`javascript`代码
* 使用外链式，然后在HTML用`<script src ="">`引入
* 使用内建式，`<script></script>`
### 标签`<script></script>`位置
* 阻塞：当浏览器在执行 JavaScript 代码时，不能同时做其他任何事情。
* 脚本位置
从 IE 8、Firefox 3.5、Safari 4 和 Chrome 2 开始都允许并行下载 JavaScript 文件，但JavaScript 下载过程仍然会阻塞其他资源的下载，比如样式文件和图片。尽管脚本的下载过程不会互相影响，但页面仍然必须等待所有 JavaScript 代码下载并执行完成才能继续。由于脚本会阻塞页面其他资源的下载，因此推荐将所有'<script>'标签尽可能放到'<body>'标签的底部，以尽量减少对整个页面下载的影响。
* 组织脚本
下载单个 100Kb 的文件将比下载 5 个 20Kb 的文件更快。也就是说，减少页面中外链脚本的数量将会改善性能。
可以把多个文件合并成一个，这样只需要引用一个<script>标签，就可以减少性能消耗。文件合并的工作可通过离线的打包工具或者一些实时的在线服务来实现。
把一段内嵌脚本放在引用外链样式表的<link>之后会导致页面阻塞去等待样式表的下载。这样做是为了确保内嵌脚本在执行时能获得最精确的样式信息。因此，建议不要把内嵌脚本紧跟在<link>标签后面。
* 无阻塞的脚本：
问题：减少 JavaScript 文件大小并限制 HTTP 请求数在功能丰富的 Web 应用或大型网站上并不总是可行。下载单个较大的 JavaScript 文件只产生一次 HTTP 请求，却会锁死浏览器的一大段时间。
方法：在页面加载完成后才加载 JavaScript 代码。这就意味着在 window 对象的 onload事件触发后再下载脚本。
延迟加载脚本：
defer:任何带有 defer 属性的<script>元素在 DOM 完成加载之前都不会被执行
```
<html>
<head>
    <title>Script Defer Example</title>
</head>
<body>
    <script type="text/javascript" defer>
        alert("defer");
    </script>
    <script type="text/javascript">
        alert("script");
    </script>
    <script type="text/javascript">
        window.onload = function(){
            alert("load");
        };
    </script>
</body>
</html>
```
这段代码在页面处理过程中弹出三次对话框。不支持 defer 属性的浏览器的弹出顺序是：“defer”、“script”、“load”。而在支持 defer 属性的浏览器上，弹出的顺序则是：“script”、“defer”、“load”。请注意，带有 defer 属性的<script>元素不是跟在第二个后面执行，而是在 onload 事件被触发前被调用。
aysnc:能够异步地加载和执行脚本，不因为加载脚本而阻塞页面的加载。但是有一点需要注意，在有 async 的情况下，JavaScript 脚本一旦下载好了就会执行，所以很有可能不是按照原本的顺序来执行的。如果 JavaScript 脚本前后有依赖性，使用 async 就很有可能出现错误。
   动态脚本加载：
```
function loadScript(url, callback){
    var script = document.createElement ("script")
    script.type = "text/javascript";
    if (script.readyState){ //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" || script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { //Others
        script.onload = function(){
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}
```
```
loadScript("script1.js", function(){
    alert("File is loaded!");
});
```
* 减少 JavaScript 对性能的影响有以下几种方法：
将所有的<script>标签放到页面底部，也就是</body>闭合标签之前，这能确保在脚本执行前页面已经完成了渲染。
尽可能地合并脚本。页面中的<script>标签越少，加载也就越快，响应也越迅速。无论是外链脚本还是内嵌脚本都是如此。
采用无阻塞下载 JavaScript 脚本的方法：
使用<script>标签的 defer 属性（仅适用于 IE 和 Firefox 3.5 以上版本）；
使用动态创建的<script>元素来下载并执行代码；
使用 XHR 对象下载 JavaScript 代码并注入页面中。
##2.Javscript数据类型及语言基础
* 动态类型
`JavaScript` 是一种弱类型或者说动态语言。这意味着你不用提前声明变量的类型，在程序运行过程中，类型会被自动确定。这也意味着你可以使用同一个变量保存不同类型的数据：
```
var foo = 42;    // foo is a Number now
var foo = "bar"; // foo is a String now
var foo = true;  // foo is a Boolean now
```
* 数据类型
最新的 ECMAScript 标准定义了 7 种数据类型:
6 种 原始类型:
Boolean
Null
Undefined
Number
String
Symbol (ECMAScript 6 新定义)
和 Object

特别的
1. 除 Object 以外的所有类型都是不可变的（值本身无法被改变）。
1. 一个没有被赋值的变量会有个默认值 undefined。
### 实践判断各种数据类型的方法
```
// 判断数组
function isArray(arr) {
    return Array.isArray(arr);
}
// 判断函数
function isFunction(fn) {
    return Object.prototype.toString.call(fn) === '[object Function]';
}
```
###了解值类型和引用类型的区别，了解各种对象的读取、遍历方式： 
####值类型和引用类型的区别
* 值类型
声明一个值类型变量，编译器会在栈上分配一个空间，这个空间对应着该值类型变量，空间里存储的就是该变量的值。存储在栈（stack）中的简单数据段，也就是说，它们的值直接存储在变量访问的位置。
 
* 引用类型
引用类型的实例分配在堆上，新建一个引用类型实例，得到的变量值对应的是该实例的内存分配地址，这就像您的银行账号一样。存储在堆（heap）中的对象，也就是说，存储在变量处的值是一个指针（point），指向存储对象的内存处。
为变量赋值时，ECMAScript 的解释程序必须判断该值是原始类型，还是引用类型。要实现这一点，解释程序则需尝试判断该值是否为 ECMAScript 的原始类型之一，即 Undefined、Null、Boolean、Number 和 String 型。由于这些原始类型占据的空间是固定的，所以可将他们存储在较小的内存区域 - 栈中。这样存储便于迅速查寻变量的值。
在许多语言中，字符串都被看作引用类型，而非原始类型，因为字符串的长度是可变的。ECMAScript 打破了这一传统。
如果一个值是引用类型的，那么它的存储空间将从堆中分配。由于引用值的大小会改变，所以不能把它放在栈中，否则会降低变量查寻的速度。相反，放在变量的栈空间中的值是该对象存储在堆中的地址。地址的大小是固定的，所以把它存储在栈中对变量性能无任何负面影响。如下图所示：

 
JavaScript中原始值包括：undefined，null，布尔值，数字和字符串。
引用类型主要指对象（包括数组和函数）。
 
原始值是不可更改的。对象的值是可修改的。
原始值的比较是值的比较。对象的比较并非值的比较。对象的值都是引用，对象的比较均是引用的比较，当且仅当他们都引用同一个基对象时，他们才相等。
参考：
 
[ECMAScript 原始值和引用值](http://www.w3school.com.cn/js/pro_js_value.asp)
对象的读取、遍历方式
参考：[JavaScript 指南-使用对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects)
 
* 对象
在javascript中，一个对象可以是一个单独的拥有属性和类型的实体。我们拿它和一个杯子做下类比。一个杯子是一个对象(物体)，拥有属性。杯子有颜色，图案，重量，由什么材质构成等等。同样，javascript对象也有属性来定义它的特征。
 
* 属性
一个 javascript 对象有很多属性。一个对象的属性可以被解释成一个附加到对象上的变量。对象的属性和普通的 javascript 变量基本没什么区别，仅仅是属性属于某个对象。属性定义了对象的特征(译注：动态语言面向对象的鸭子类型)。你可以通过点符号来访问一个对象的属性。JavaScript 对象的属性也可以通过方括号访问。
 
* 枚举
你可以在 for...in 语句中使用方括号标记以枚举一个对象的所有属性。为了展示它如何工作，下面的函数当你将对象及其名称作为参数传入时，显示对象的属性：
```
function showProps(obj, objName) {
  var result = "";
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
        result += objName + "." + i + " = " + obj[i] + "\n";
    }
  }
  return result;
}
 
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
 
console.log(showProps(srcObj,'srcObj'));
console:
 
srcObj.a = 2
srcObj.b = [object Object]
```
这里使用 hasOwnProperty() 是为了确保是自己的属性而非继承的属性。
 
可以如下写，跳过这个对象的方法：
```
function showPropsWithoutFun(obj, objName) {
    var result = "";
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) {       //跳过继承属性
            continue;
        }
        if (typeof obj[i] === "function") { //跳过这个对象的方法
            continue;
        }
        result += objName + "." + i + "=" + obj[i] + "\n";
    }
    return result;
}
```
相关的方法还有：Object.keys(), Object.getOwnPropertyNames()
 
Object.keys() 方法会返回一个由给定对象的所有可枚举自身属性的属性名组成的数组，数组中属性名的排列顺序和使用for-in循环遍历该对象时返回的顺序一致（两者的主要区别是 for-in 还会遍历出一个对象从其原型链上继承到的可枚举属性）。
 
Object.getOwnPropertyNames() 方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性）组成的数组。
 
* 创建对象
创建对象的方式有三种：对象直接量，关键字 new，使用 Object.create() 方法。
 
Object.create() 方法创建一个拥有指定原型和若干个指定属性的对象。
 
* * 继承
所有的 JavaScript 对象继承于至少一个对象。被继承的对象被称作原型，并且继承的属性可能通过构造函数的 prototype 对象找到。
 
定义方法
一个方法 是关联到某个对象的函数，或者简单地说，一个方法是一个值为某个函数的对象属性。定义方法就象定义普通的函数，除了它们必须被赋给对象的某个属性。例如：
```
objectName.methodname = function_name;
 
var myObj = {
  myMethod: function(params) {
    // ...do something
  }
};
```
#### 深度克隆
```
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
```
浅度克隆：基本类型为值传递，对象仍为引用传递。
深度克隆：所有元素或属性均完全克隆，并于原引用类型完全独立，即，在后面修改对象的属性的时候，原对象不会被修改。 
简单来说，对于浅度克隆，讲一个对象通过简单的传递给另一变量时，实际相当于给该对象增添了一个别名，这两个名字都是指向同一个对象，当源对象更改时，复制的对象也随之改变。对于深度克隆，则是新建了一个指针指向另一个对象，这个对象是源对象的一个副本，但源对象更改时，副本不会随之改变。
 * [白话简单克隆和深度克隆](http://blog.csdn.net/java2000_net/article/details/3014934)
 * [js的浅克隆和深度克隆](http://www.jianshu.com/p/afc55e33a36a)
###学习数组、字符串、数字等相关方法，在util.js中实现以下函数:
####数组去重
* 思路：
1. 先创建一个空数组，记为数组2，原数组记为数组1 
2. 遍历数组1，做一个判断，当遍历到的数组元素不为空并且在数组2中找不到时该元素时，将该元素添加到数组2中
3. 应用for循环遍历，应用indexof值是否为-1判断元素是否能在数组2找到
2. 返回数组2
* 代码实现：
```
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
```
####实现一个类trim方法

* 一开始的，用了很笨的两个循环，分别从头遍历和从尾遍历判断空格是否存在及查找空格位置。虽然勉强去除了首尾空格，但没有办法去除Tab
```
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
```
* 另外的，无意中发现了去除所有空格的方法，利用concat方法连接非空格字符，组成新字符串
```
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
```
* 接下来实现一个真正符合要求的trim函数
```
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
```
 同样是用了两个循环遍历，一个从头开始，一个从尾开始，找到第一个非空格非Tab的字符就跳出遍历。巧妙在于用了两个变量i和j来循环，跳出循环时得到了i和j的值，即字符串中从头开始和从尾开始的第一个非空格非Tab的字符索引值，从而可以利用slice方法切割字符串，注意slice中第二个参数要加1。
* 精简代码

思路：利用正则匹配开头和结尾的空白字符，将其替换为空字符
```
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}
```
* 参考MDN的正则表达式章节
[正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)
#### 遍历数组执行函数

```
function each(arr, fn) {
    for (var i in arr) {  // 遍历数组
        fn(arr[i],i);     // 针对数组中每一个元素执行fn函数
    }
}
 
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
```
 也可以使用forEach方法
```
function eachA(arr, fn) {
    arr.forEach(fn);
}
//var arr = ['java', 'c++', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
//eachA(arr, output); //0: java, 1: c++, 2: php, 3: html
```
#### 获取一个对象里面第一层元素的数量，返回一个整数
```
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
```
 * 思路：获取的是第一层，所以用一个循环，遍历第一层的key值，每找到一个元素数量便加一
#### 学习正则表达式，在util.js完成以下代码：

 * 思路：邮箱地址的组成
```
// 判断是否为邮箱地址
function isEmail(emailStr) {
    // math_phys.d.d@VIP.163.com
    // 用户名必须以字母开头，不能以点结尾
    // 考虑域名的级联
    var pattern = /^(\w+\.)*\w+@\w+(\.\w+)+$/;
    return pattern.test(emailStr);
}
```
```
// 判断是否为手机号
function isMobilePhone(phone) {
    var pattern = /^(\+\d{1,4})?\d{7,11}$/;
    return pattern.test(phone);
}
```
## 3.DOM
###先来一些简单的，在你的util.js中完成以下任务：

#### 增加样式：先判断是否存在旧样式，不存在直接将新样式赋给样式名，存在则在旧样式基础上增加新样式。
```
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    var oldClassName = element.className;
    element.className = oldClassName === "" ? newClassName : oldClassName + " " + newClassName;
}
```
#### 移除样式：
首先通过元素的className属性取出原来的所有类名，注意当有多个类名时，输出是一个字符串
```
<div id="div" class="one two three">test</div>
<script>
        div = document.getElementById('div');
        console .log(originalClassName = div.className); // one two three
</script>
```
由于oldclassName是动态可变的，所以要用动态的正则表达式匹配该样式，\b是匹配单词边界，在这里要使用转义字符，最后把匹配到的样式名利用replace方法替换为空。
```
// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var originalClassName = element.className; // 取原来的所有类名
    var pattern = new RegExp("\\b" + oldClassName + "\\b"); // 匹配指定类名
    element.className = originalClassName.replace(pattern,''); // 移除样式
}
```
#### 判断是否为同一级元素
很简单，只需判断父元素是否相同即可。
```
// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}
```
#### 获取元素相对于浏览器窗口的位置
Window 尺寸
有三种方法能够确定浏览器窗口的尺寸（浏览器的视口，不包括工具栏和滚动条）。
对于Internet Explorer、Chrome、Firefox、Opera 以及 Safari：
window.innerHeight - 浏览器窗口的内部高度
window.innerWidth - 浏览器窗口的内部宽度
对于 Internet Explorer 8、7、6、5：
document.documentElement.clientHeight
document.documentElement.clientWidth
或者
document.body.clientHeight
document.body.clientWidth
实用的 JavaScript 方案（涵盖所有浏览器）：
实例
var w=window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;
 
var h=window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

getBoundingClientRect方法返回一个包含left,top,bottom,right四个属性的对象，可以获取元素的相对位置，再加上滚动条的位置，就能得到元素的绝对位置。
```
// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var pos = {};
    pos.x = element.getBoundingClientRect(element).left + Math.max(document.documentElement.scrollLeft,
        document.body.scrollLeft);
    pos.y = element.getBoundingClientRect(element).top + Math.max(document.documentElement.scrollTop,
        document.body.scrollTop);
    return pos;
}
```
offsetWidth	clientWidth	scrollWidth
offsetHeight	clientHeight	scrollHeight
offsetLeft	clientLeft	scrollLeft
offsetTop	clientTop	scrollTop
offsetWidth/offsetHeight: 元素内容 + 内边距 + 边框（不包括外边距、滚动条）
clientWidth/clientHeight: 元素内容 + 内边距 ；不包括边框（IE下实际包括）、外边距、滚动条部分
offsetLeft/offsetTop: 该元素的左上角（边框外边缘）与已定位的父容器（offsetParent对象）左上角的距离 ----实际就是外边距加上父容器内边距
clientLeft/clientTop: 内边距的边缘和边框的外边缘之间的水平和垂直距离，也就是边框宽度
scrollWidth和scrollHeight是元素的内容区域加上内边距加上溢出尺寸，当内容正好和内容区域匹配没有溢出时，这些属性与clientWidth和clientHeight相等
scrollLeft和scrollTop是指元素滚动条位置，它们是可写的
* 参考资料
[用Javascript获取页面元素的位置](http://www.ruanyifeng.com/blog/2009/09/find_element_s_position_using_javascript.html)
[document.body.scrollTop or document.documentElement.scrollTop](http://www.cnblogs.com/zhenyu-whu/archive/2012/11/13/2768004.html)
[JavaScript获取窗口位置和元素坐标（兼容版](http://caibaojian.com/getelementposition.html)
### 接下来挑战一个mini`$`，它和之前的`$`是不兼容的，它应该是document.querySelector的功能子集，在不直接使用document.querySelector的情况下，在你的util.js中完成以下任务：

* 这部分感觉是在封装一个小的jQuery...想了很久才勉强写出了一些代码，特别是组合查询很难，网上参考了别人的代码，大概思路是先得写一个$(selector)的辅助函数，然后需要在$(selector)里调用该函数。由于document.getElementsByClassName是HTML5新增的方法，在IE8及以下不能使用，所以这个辅助函数应该是document.getElementById、document.getElementsByTagName的封装。可以利用swith语句将两个方法结合在一起放在一个函数里面。
#### 取类名的方法
先建一个空列表，用来存放拥有指定样式名称的DOM对象，然后取得所有元素（document.getElementsByTagName返回带有指定标签名的所有元素，当传入的标签名为*时取全部元素），接着遍历所有元素，利用getAttribute方法，判断元素是否有class属性，如果找到了有class属性的元素，由于类不同于id，需要考虑一个元素多个类名的情况，由于getAttribute方法返回一个字符串，先要将字符串切割成数组，从而能得到类名个数，然后再遍历该元素的类名，当有一个元素类名与指定的样式名一样时，说明找到了拥有指定className的对象，将其压入列表，最后得到了样式定义包含样式名的对象列表。在这里用了两个for循环，外部的for循环是遍历所有元素找出有class属性的元素，内部的for循环是遍历有class属性的元素找出有指定class名的元素。
* getAttribute() 方法返回指定属性名的属性值。
* slice() 方法切割字符串，返回一个数组
```
        function getClassName(name) {
                var result = [];
                var allChildren = null;
                var currAttr = null;
                allChildren = document.getElementsByTagName('*');
                for (var i = 0; i < allChildren.length; i++) {
                    currAttr =allChildren[i].getAttribute('class');
                    if (currAttr !== null) {
                        console.log(currAttr);
                        var currAttrsArr = currAttr.split(/\s+/); //类名可能不止一个样式
                        console.log(currAttrsArr);
                        for (var j = 0; j < currAttrsArr.length; j++) {
                            if (name === currAttrsArr[j]) { // 不管有多少个类名，只有有一个找到符合的就可以
                                result.push(allChildren[i]);
                            }
                        }
                    }
                }
                //console.log(result);
        }
``` 
#### 辅助函数myQuery
* myQuery（）应该至少传入一个参数，即对应于$(selector)中的参数。又由于组合查询时是在特定父节点下，所以应该还要有一个表示查询范围的参数。
* 传入的selector参数可以看出是由两部分组成的字符串，第一部分是一个特殊符号，#\.\[，代表了进行id\class\tagName\attribute，第二部分是是对应的名称。思路是取得特殊符号，作为swith语句的case分支。代码如下：
```
function myQuery(selector, root) {
    var signal = selector[0];
    var allChildren = null;
    var content = selector.substr(1); // 选择器名称
    var currAttr = null; // 是否有class属性的判据
    var result = []; // 查找的结果
    root = root || document; // 没有定义父节点，在整个document中查找

    switch(signal) {
        case '#':
            result.push(document.getElementById(content)); // id只有一个，查找范围document
            break;
        case '.':
            allChildren = root.getElementsByTagName('*');  // class不只一个，查找范围root，取出范围下所有子元素
            for (var i = 0; i < allChildren.length; i++) {  // 遍历所有子元素
                currAttr = allChildren[i].getAttribute('class'); // 判断是否有class属性，返回属性值
                if (currAttr !== null) {
                    currAttrsArr = currAttr.split(/\s+/);  // 将属性值分割成数组
                    for(var j = 0; j < currAttrsArr.length; j++) { // 遍历属性值
                    if (content === currAttrsArr[j]) {  // 当选择器名称与某个属性值相同时
                        result.push(allChildren[i]);  // 将对应拥有该属性的元素压入result
                    }
                }
            }
        }
            break;
        case '[':
            if (content.search('=') === -1) { // 只有属性没有值
                allChildren = root.getElementsByTagName('*');
                for (var i = 0; i < allChildren.length; i++) {
                    if(allChildren[i].getAttribute(selector.slice(1, -1)) !== null) {
                        result.push(allChildren[i]);
                    }
                }
            } else { //既有属性，又有值
                allChildren = root.getElementsByTagName("*");
                var pattern = /\[(\w+)\s*\=\s*(\w+)\]/; //为了分离等号前后的内容
                var cut = selector.match(pattern); //分离后的结果，为数组
                //alert(cut);
                //console.log(cut);
                var key = cut[1]; //键
                var value = cut[2]; //值
                for (i = 0; i < allChildren.length; i++) {
                    if (allChildren[i].getAttribute(key) == value) {
                        result.push(allChildren[i]);
                    }
                }
            }
          break;
        default: // 开头不是特殊字符，即查找tagName
            result = root.getElementsByTagName(selector);
            break;
    }
    return result;
}
```
* match方法
match() 方法可传入字符串值或正则表达式。
match() 方法将检索字符串 stringObject，以找到一个或多个与 regexp 匹配的文本。这个方法的行为在很大程度上有赖于 regexp 是否具有标志 g。
如果 regexp 没有标志 g，那么 match() 方法就只能在 stringObject 中执行一次匹配。如果没有找到任何匹配的文本， match() 将返回 null。否则，它将返回一个数组，其中存放了与它找到的匹配文本有关的信息。该数组的第 0 个元素存放的是匹配文本，而其余的元素存放的是与正则表达式的子表达式匹配的文本。除了这些常规的数组元素之外，返回的数组还含有两个对象属性。index 属性声明的是匹配文本的起始字符在 stringObject 中的位置，input 属性声明的是对 stringObject 的引用。
如果 regexp 具有标志 g，则 match() 方法将执行全局检索，找到 stringObject 中的所有匹配子字符串。若没有找到任何匹配的子串，则返回 null。如果找到了一个或多个匹配子串，则返回一个数组。不过全局匹配返回的数组的内容与前者大不相同，它的数组元素中存放的是 stringObject 中所有的匹配子串，而且也没有 index 属性或 input 属性。
注意：在全局检索模式下，match() 即不提供与子表达式匹配的文本的信息，也不声明每个匹配子串的位置。如果您需要这些全局检索的信息，可以使用 RegExp.exec()。
举个例子，现在页面有一个div元素，用setAttribute设置了属性'date = 2016'。调用myQuery函数时，当正则表达式没有全局匹配时，输出的cut如下：

 当全局匹配时，输出的cut如下：

 此时会看到数组cut存放的只是匹配串，于是下面的key和value就为空，输出的result就是所有元素了。
#### $(selector)函数
```
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
```
 ## 4.事件
我们来继续用封装自己的小jQuery库来实现我们对于JavaScript事件的学习，还是在你的util.js，实现以下函数：
```
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    // your implement
}
 
// 例如：
function clicklistener(event) {
    ...
}
addEvent($("#doma"), "click"    , a);
 
// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    // your implement
}
```
```
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
addEvent($("#doma"), "click", a);
 
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
    element.onkeydown = function(e) {
        e = e || window.event;
        if (e.keyCode === 13) {
            listener();
        }
    }
}

```
接下来我们把上面几个函数和$做一下结合，把他们变成$对象的一些方法
```
addEvent(element, event, listener) -> $.on(element, event, listener);
removeEvent(element, event, listener) -> $.un(element, event, listener);
addClickEvent(element, listener) -> $.click(element, listener);
addEnterEvent(element, listener) -> $.enter(element, listener); 
```
```
$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.enter = addEnterEvent;
```
* [DOM0,DOM2,DOM3事件,事件基础知识入门](http://www.cnblogs.com/diligenceday/p/4175721.html)
* 不可以使用document.getElementsByTagName 获取button？
接下来考虑这样一个场景，我们需要对一个列表里所有的`<li>`增加点击事件的监听
```
//考虑这样一个场景，我们需要对一个列表里所有的<li>增加点击事件的监听
        function clickListener(event) {
            console.log(event);
        }
        //方法一：针对每一个item去绑定事件，这样显然是一件很麻烦的事情。
        $.click($("#item1"), clickListener);
        $.click($("#item2"), clickListener);
        $.click($("#item3"), clickListener);
 
        //方法二：通过自己写的函数，取到id为list这个ul里面的所有li，然后通过遍历给他们绑定事件。这样我们就不需要一个一个去绑定了。
        each($("#list2").getElementsByTagName('li'), function(li) {
            addClickEvent(li, clickListener);
        });
        // 再此基础上考虑另一个场景，加了一个按钮，当点击按钮时，改变list里面的项目。这个时候你再点击一下li，绑定事件不再生效了。
        function renderList() {
            $("#list").innerHTML = '<li>new item</li>';
            /* 需要重新绑定事件
            // 当加入
            // each($("#list").getElementsByTagName('li'), function(item) {
                $.click(item, clickListener);
            });
             点击按钮时绑定事件才会重新生效*/
        }
 
 
        function init() {
            each($("#list").getElementsByTagName('li'), function(item) {
                $.click(item, clickListener);
            });
 
            $.click($("#btn"), renderList);
        }
        init();
```
```
        // 方法三：事件代理，改变DOM结构或内容不需要重新绑定事件
        // 先简单一些
        function renderList() {
            $("#list").innerHTML = '<li>new item</li>';
        }
        $.click($("#btn"), renderList);
        function delegateEvent(element,tag,eventName,listener){
            addEvent(element, eventName, function(event){
                var target = event.target || event.srcElement;
                if(target.tagName.toLowerCase() == tag.toLowerCase()) {
                    listener.call(target, event);
                }
            });
        }
        $.delegate = delegateEvent;
        var clickHandle = function (event) {
            alert(event);
        }
 
        // 使用示例
        // 还是上面那段HTML，实现对list这个ul里面所有li的click事件进行响应
        $.delegate($("#list"), "li", "click", clickHandle);
        // 这时改变DOM结构不需要重新绑定事件了。
```
### 事件代理
简单来讲，当需要为多个子元素添加事件时，可以把事件加在父元素上，在DOM2级事件的冒泡阶段父元素事件被触发，于是底下所有子元素也一并添加了事件。
* [JS-事件代理](http://www.cnblogs.com/leo388/p/4461579.html)
* [javascript事件代理](http://www.cnblogs.com/rubylouvre/archive/2009/08/09/1542174.html)
* [ JavaScript事件代理和委托（Delegation）](http://blog.csdn.net/majian_1987/article/details/8591385)
* [JavaScript中arguments[0]()表示的是什么？](https://www.zhihu.com/question/21466212)
## 5.BOM
```
// 实现以下函数
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    // your implement
}
 
// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    // your implement
}
 
// 获取cookie值
function getCookie(cookieName) {
    // your implement
}
```
```
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
```
```
// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate + expiredays);
    document.cookie = cookieName + '=' + cookieValue + ';expires=' + oDate;
}
// 获取cookie
function getCookie(cookieName) {
    var arr = document.cookie.split("; ");   // 多条cookie以分号加空格隔开
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("=");
        if (arr2[0] === cookieName) {
            return arr2[1];
        }
    }
    return "";
}
// 移除cookie
function removeCookie(cookieName) {
    setCookie(cookieName, "1", -1); // 把有效时间设置为-1
}
```
## 6.AJAX
学习Ajax，并尝试自己封装一个Ajax方法。实现如下方法：
``` 
//
function ajax(url, options) {
    // your implement
}
 
// 使用示例：
ajax(
    'http://localhost:8080/server/ajaxtest',
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        }
    }
);
```
```
function ajax(url, options) {
 
    var dataResult; //结果data
 
    // 处理data
    if (typeof(options.data) === 'object') {
        var str = '';
        for (var c in options.data) {
            str = str + c + '=' + options.data[c] + '&';
        }
        dataResult = str.substring(0, str.length - 1);
    }
 
    // 处理type
    options.type = options.type || 'GET';
 
    //获取XMLHttpRequest对象
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
 
    // 发送请求
    xhr.open(options.type, url, true);
    if (options.type == 'GET') {
        xhr.send(null);
    } else {
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(dataResult);
    }
 
    // readyState
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (options.onsuccess) {
                    options.onsuccess(xhr.responseText, xhr.responseXML);
                }
            } else {
                if (options.onfail) {
                    options.onfail();
                }
            }
        }
    };
}
```
