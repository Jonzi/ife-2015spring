// 初始化
(function () {
    // 初始化左侧分类及子分类

    countAllTask();
    each(data.cates, addCate);
    each(data.lists, addList);

    // 初始化中间
    // 默认分类下的内容
    addMedium(data.tasks[0]);

    // 初始化右侧
    addRightContent(data.tasks[0]);

    // 初始化选中
    initSelected();

    // 初始化浮层下拉列表
    initSelectCate();

})();

function initSelectCate() {
    updateData();
    var num = 1;
    // each(data.cates, function (cate) {
    // 用each()不能给第一个加selected
    // TODO
    // 新增主分类
    $('#selectCate').innerHTML = '<option value = 0 >' + '新增主分类' + '</option>';
//     for (var i = 0; i < data.cates.length; i++) {
//         if (data.cates[0]) {
//             $('#selectCate').innerHTML = '<option value =' + num + ' selected>' + data.cates[0].category + '</option>';
//         }
//         $('#selectCate').innerHTML += '<option value =' + num + '>' + data.cates[i].category + '</option>';
//             num++;
//     }
// }
    each(data.cates, function (cate) {
        $('#selectCate').innerHTML += '<option value =' + num + '>' + cate.category + '</option>';
        num++;
    })
}
function initSelected() {
    // addClass($('[data-cate-id=默认分类]'), 'selected');  会连带子节点一起取到
    // addClass($('#cateList span')[1], 'selected')
    addClass($('[data-list-id=使用说明]'), 'selectedCate');
    addClass($('#all'), 'selectedStatus');
    addClass($('.task-title')[0], 'selectedTask');
}


function countAllTask() {
    $('#taskNum').innerHTML = '(' + toCount('data.tasks') + ')';
}

function addCate(obj) {
    // if (obj.category) {
    //     console.log('a');
    // }
    var liCate = $('[data-cate-id=' + obj.category + ']');
    if (!liCate) {
        liCate = document.createElement('li');
        liCate.setAttribute('data-cate-id', obj.category);
        liCate.innerHTML =  '<span><i class="fa fa-folder-open fa-fw"></i>'
        + '<span>' + obj.category + '(' + toCount('data.cates', obj.category) + ')' + '</span>' + '<i class="fa fa-minus-circle"></i></span>';
        $('#cateList').appendChild(liCate);

    }
}

// $.delegate = function(element, tag, eventName, listener) {
//     delegateEvent(element, tag, eventName, listener);
// };

// // 取到所有的子分类
// var lists = document.querySelectorAll("[data-list-id]");
// // for (var i = 0; i < lists.length; i++) {
// //     $.click(lists[i], click(lists[i]));
// // }
// $.click(lists[1], click[lists[1]])

// function click(obj) {
//     // console.log('')
//     // event = event? event : window.event;
//     // var task;
//     // var target = event.target || event.srcElement;
//     // if (task === target) {
//         console.log('a');
//         each(data.tasks, function (task) {
//             if (task.cateList[1] === obj) {
//                 $('#tasksList').innerHTML = '';
//                 $('#tasksList').innerHTML += '<li><ul><li>' +task.time+ '</li><li>'+task.title+'</li></ul></li>';
//             }
//             // else {console.log('b')};
//         })

//     // }
// }




// 鼠标点击切换样式
// 取所有子分类
var listItem = [];
var ulList = document.getElementsByClassName('data-cate');
var statusList = document.getElementsByClassName('data-status');
var tasksList = $('.data-lists');


// 切换样式
// 无论点击多少次都应该是只添加一次类名
// 所以添加类名前应该先判断是否已经有‘selected'

// TODO
// 切换status显示清单详情和点击子分类显示清单详情
// 有冗余的代码
function changeClassName(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    stopBubble(event);
    if (target.parentNode) {
        var cateClassName = 'selectedCate', // 左侧子分类
            statusClassName = 'selectedStatus', // 中部状态栏
            taskClassName = 'selectedTask', // 中部单项任务
            targetParentClassName = target.parentNode.className;
        switch (targetParentClassName) {
            case 'data-cate':
                for (var i = 0; i < ulList.length; i++) {
                    updateData();
                    var liList = ulList[i].getElementsByTagName('li');
                    each(liList, function (item) {
                        listItem.push(item);
                    })
                }
                // console.log(listItem);
                for (var i = 0; i < listItem.length; i++) {
                    if (listItem[i].className === cateClassName) {
                        removeClass(listItem[i], cateClassName);
                    }
                }
                addClass(target, cateClassName);
                console.log(target);
                // var taskAll = tasksList[0].querySelectorAll('.task-title');

                // for (var i = 0; i < taskAll.length; i++) {

                //     if (taskAll[i] === target) {
                //         each(taskAll, function (item) {
                //             console.log('a')
                //             if (hasClass(item, taskClassName)) {
                //                 removeClass(item, taskClassName);
                //             }
                //             console.log('b')
                //         })
                //         addClass(target, taskClassName);
                //     }
                // }
                break;

            // TODO
            case 'data-status':
                // $('#all').className = '';
                // $('#finished').className = '';
                // $('#unfinished').className = '';  // 这样会有class,但是为空,html标签内会有空的class
                removeClass($('#all'), statusClassName);
                removeClass($('#finished'), statusClassName);
                removeClass($('#unfinished'), statusClassName);
                addClass(target, statusClassName);

                var id = target.id, // 选中状态id
                    listId, // 选中子分类名称
                    data_tasks = $('.data-task'), // 中间显示的所有任务（时间+标题的ul）
                    data_lists = document.querySelectorAll('[data-list-id]'); // 取左侧所有子分类
                    each(data_lists, function (item) {  // 在所有子分类中选出选中的那一个
                        if (hasClass(item, cateClassName)) {
                            listId = item.getAttribute('data-list-id');
                        }
                    })
                $('#tasksList').innerHTML = '';
                if (id === 'all') {
                    each(data.tasks, function (task) {
                        if (task.cateList[1] === listId) {
                            $('#tasksList').innerHTML += '<li><ul class = data-task isDone ='+ task.isDone + '><li>' +task.time+ '</li><li class = task-title isDone ='+ task.isDone + '>'+task.title+'</li></ul></li>';
                        }
                    });
                } if (id === 'finished') {
                    each(data.tasks, function (task) {
                        if (task.cateList[1] === listId && task.isDone) {
                            $('#tasksList').innerHTML += '<li><ul class = data-task isDone ='+ task.isDone + '><li>' +task.time+ '</li><li class = task-title isDone ='+ task.isDone + '>'+task.title+'</li></ul></li>';
                        }
                    });
                } if (id === 'unfinished') {
                    each(data.tasks, function (task) {
                        console.log(listId);
                        if (task.cateList[1] === listId && !task.isDone) {
                            $('#tasksList').innerHTML += '<li><ul class = data-task isDone ='+ task.isDone + '><li>' +task.time+ '</li><li class = task-title isDone ='+ task.isDone + '>'+task.title+'</li></ul></li>';
                        }
                    });
                }


                break;
            case "data-task":
                var taskAll = tasksList[0].querySelectorAll('.task-title');

                for (var i = 0; i < taskAll.length; i++) {

                    if (taskAll[i] === target) {
                        each(taskAll, function (item) {
                            console.log('a')
                            if (hasClass(item, taskClassName)) {
                                removeClass(item, taskClassName);
                            }
                            console.log('b')
                        })
                        addClass(target, taskClassName);
                    }
                }
                break;
            }
    }
}
// $.delegate(ulList, 'li', 'click', changeClassName);
delegateClickEvent(ulList, changeClassName);
delegateClickEvent(statusList, changeClassName);
delegateClickEvent(tasksList, changeClassName);


// 点击子分类切换任务清单
// 通过getAttribute取子分类名字（不含未完成任务数）
// TODO
function changeMedium(event) {
        event = event || window.event;
        var target = event.target || event.srcElement;
        var listId = target.getAttribute('data-list-id');
        var text = $('.selectedStatus')[0].innerText;
        $('#tasksList').innerHTML = '';
        each(data.tasks, function (task) {
            if (task.cateList[1] === listId && text === '所有') {
                $('#tasksList').innerHTML += '<li><ul class = data-task isDone ='+ task.isDone + '><li>' +task.time+ '</li><li class = task-title isDone ='+ task.isDone + '>'+task.title+'</li></ul></li>';
            } if (task.cateList[1] === listId && text === '已完成' && task.isDone) {

                console.log(listId);
                if (task.cateList[1] === listId ) {
                    $('#tasksList').innerHTML += '<li><ul class = data-task isDone ='+ task.isDone + '><li>' +task.time+ '</li><li class = task-title isDone ='+ task.isDone + '>'+task.title+'</li></ul></li>';
                }
            } if (task.cateList[1] === listId && text === '未完成' && !task.isDone) {

                        console.log(listId);
                        if (task.cateList[1] === listId ) {
                            $('#tasksList').innerHTML += '<li><ul class = data-task isDone ='+ task.isDone + '><li>' +task.time+ '</li><li class = task-title isDone ='+ task.isDone + '>'+task.title+'</li></ul></li>';
                        }

            }
            // else {console.log('b')};
        })

}
delegateClickEvent(ulList, changeMedium);

// 右侧显示任务详情
function changeRight() {
    var task = $('.selectedTask')[0];
    var text = task.innerText;
    each(data.tasks, function (task) {
        if (task.title === text) {
            $('#hidTitle').innerHTML = task.title;
            $('#hidDate').innerHTML = task.time;
            $('#taskContent').innerText = '';
            $('#taskContent').innerText = task.content;
        }
    })
}
delegateClickEvent(tasksList, changeRight);

// 初始化左侧子分类
function addList(obj) {
    var liList = $('[data-cate-id=' + obj[0] + ']');
    // new TaskList出来的对象是数组
    if (!liList.getElementsByTagName('ul')[0]) {
        ulList = document.createElement('ul');
        ulList.setAttribute('data-cate-id', obj[0]);
        ulList.className = 'data-cate';
        ulList.style.padding = '0 0 0 20px';
        ulList.innerHTML=  '<li data-list-id=' + obj[1] + '><span class="fa fa-file-o fa-fw"></span>'
        + obj[1] + '(' + toCount('data.lists', obj[1]) + ')' + '<span class="fa fa-minus-circle"></span></li>';
        liList.appendChild(ulList);
        return; // 不return会重复第一个任务
    }
    if (liList.getElementsByTagName('ul')[0]) {

    // ulList.style.padding-left = '30px'; wrong
        console.log(obj[1]);
        // console.log(toCount(obj[1]))
        liList.getElementsByTagName('ul')[0].innerHTML +=  '<li data-list-id=' + obj[1] + '><span class="fa fa-file-o fa-fw"></span>'
    + obj[1] + '(' + toCount('data.lists', obj[1]) + ')'+ '<span class="fa fa-minus-circle"></span></li>';
    }


}

function toCount(arr, type) {
    // var num =0;
    // for (var i = 0; i < data.tasks.length; i++) {
    //         if ((tasks[i].cateList)[1] === tpye && tasks[i].isDone === false) {
    //                 num++;
    //         }


    // }
    // return num;

    var count = 0;
    switch (arr) {
        case 'data.lists':
            // var count = 0;
            each(data.tasks, function (item) {
                if (!item.isDone && item.cateList[1] === type) {
                    count++;
            }
        });
            return count;
            break;
        case 'data.cates':
            // var count = 0;
            each(data.tasks, function (item) {
                if (!item.isDone && item.cateList[0] === type) {
                    count++;
                }
            })
            return count;
            break;
        case 'data.tasks':
            each(data.tasks, function (item) {
                if (!item.isDone) {
                    count++;
                }
            });
            return count;
    }

    // return count;
}

function addMedium(obj) {
    $('#tasksList').innerHTML = '<li><ul class = data-task isDone ='+ obj.isDone + '><li>' +obj.time+ '</li><li class = task-title>'  +obj.title+'</li></ul></li>'
}

function addRightContent(obj) {
    $('#hidTitle').innerHTML = obj.title;
    $('#hidDate').innerHTML = obj.time;
    $('#taskContent').innerHTML = obj.content;
}

// 通过status切换任务清单
// var statusList = $('.data-status')[0].getElementsByTagName('li')
// var statusL = statusList[0].getElementsByTagName('li');
// function toggle() {
//     var limedium = $('.data-task');
//     each(statusL, function (item) {
//         var id = item.id;
//         switch (id) {
//         case 'all':
//             console.log('all task');

//             break;
//         case "unfinished":
//             for (var i = 0; i < limedium.length; i++) {
//                 if (limedium[i].getAttribute('isDone')) {
//                     limedium[i].innerHTML = ''
//                 }
//             }
//             break;
//         case "finished":
//             for (var i = 0; i < limedium.length; i++) {
//                 if (!limedium[i].getAttribute('isDone')) {
//                     limedium[i].innerHTML = ''
//                 }
//             }
//         }
//     })
// }
// delegateClickEvent(statusL, toggle);

// 左侧添加分类按钮
var addCate = $('#addCate'),
    cancel = $('#cancel'),
    confirm = $('#confirm'),
    coverStyle = $('#cover').style,
    selectCate = $('#selectCate');

    // newCateName = $('#newCateName').value
    // XXX：不要在这里设置，这样newCateName是''

// var cate = $('#selectCate').options[0].innerHTML;
var cate, node, newCateName, outCateName;
// 监听下拉框改变分类名
selectCate.onchange = function () {
    each(selectCate, function (theCate) {
        if (theCate.selected) {
            newCateName = $('#newCateName').value; // 新建子分类名
            cate = theCate.innerHTML;
            if (cate === '新增主分类') {
                outCateName = $('#newCateName').value;
                // console.log($('[data-cate-id='+cate+']'));
                // console.log($('[data-cate-id='+cate+']').children[1]);
            }

        }
    });
}
$.click(cancel, function () {
    console.log('cancel add cate');
    coverStyle.display = 'none';
});
$.click(confirm, addACate);
function addACate() {
    alert('confirm')

    node = document.createElement('li');
    if ($('#selectCate')[0].selected) {

        var outCateName = $('#newCateName').value;
        node.setAttribute('data-cate-id', outCateName);
        node.innerHTML = '<span><i class="fa fa-folder-open fa-fw"></i>'
        + '<span>' + outCateName + '(' + toCount('data.cates', outCateName) + ')' + '</span>' + '<i class="fa fa-minus-circle"></i></span><ul data-cate-id="IFE" class="data-cate" style="padding: 0px 0px 0px 20px;">';
        $('#cateList').appendChild(node);
        outCateName = new Category(outCateName);
        data.cates.push(outCateName);
        updateData();
        initSelectCate(); // 更新下拉框
    }
    if (!$('#selectCate')[0].selected) {
        // node = document.createElement('li');
        var newCateName = $('#newCateName').value;
        node.setAttribute('data-list-id', newCateName);
        node.innerHTML ='<span class="fa fa-file-o fa-fw"></span>' + newCateName + '(' + toCount('data.lists', newCateName) + ')'+ '<span class="fa fa-minus-circle"></span>';
        $('[data-cate-id='+cate+']').children[1].appendChild(node);
        removeClass($('.selectedCate')[0], 'selectedCate');
        addClass(node, 'selectedCate');
        // 本地保存
        newCateName = new TaskList(cate, newCateName);
        data.lists.push(newCateName);
        updateData();
        // removeClass($('.selectedCate')[0], 'selectedCate');
        // addClass()

        // TODO：正则排除重复空类名
    }
    coverStyle.display = 'none';
    // node = document.createElement('li');
    // var newCateName = $('#newCateName').value;
    // node.setAttribute('data-list-id', newCateName);
    // node.innerHTML ='<span class="fa fa-file-o fa-fw"></span>' + newCateName + '(' + toCount('data.lists', newCateName) + ')'+ '<span class="fa fa-minus-circle"></span>';
    // $('[data-cate-id='+cate+']').children[1].appendChild(node);
    // addClass(node, 'selectedCate');
    // // 本地保存
    // newCateName = new TaskList(cate, newCateName);
    // data.lists.push(newCateName);
    // updateData();
    // // removeClass($('.selectedCate')[0], 'selectedCate');
    // // addClass()
    // coverStyle.display = 'none';
    // // TODO：正则排除重复空类名
}
$.on(addCate, 'click', function () {
    // 不保留上次选中项
    $('#selectCate').options[0].selected = true; // 设置默认显示文本
    coverStyle.display = 'block';
    $('#newCateName').value = '';
});


function updateData() {
    setData('cates', data.cates);
    setData('lists', data.lists);
    setData('tasks', data.tasks);
}





// 最右侧
// 标记完成按钮
$.click($('#done'), doneTask);
function doneTask() {
        var title = $('.selectedTask')[0].innerHTML;
        each(data.tasks, function (task) {
        if (task.title === title) {
            task.isDone = true;
        }
        console.log('check task')
        })
        updateData();
}

// 编辑按钮
$.click($('#edit'), editTask);
function editTask() {
    $('.rightContent')[0].style.display = 'none';
    $('.rightHideWrap')[0].style.display = 'block';
    // 初始化编辑界面
    $('#inputTitle').value = $('#hidTitle').innerHTML;  // 任务标题
    $('#inputDate').value = $('#hidDate').innerHTML // 任务时间
    $('#inputContent').value = $('#taskContent').innerHTML; // 任务内容

}


// 保存编辑按钮
$.click($('#save'), saveEdit);
function saveEdit() {

    $('.rightContent')[0].style.display = 'block';
    $('.rightHideWrap')[0].style.display = 'none';
    // XXX：刷新页面，本地数据没有刷新
    $('#hidTitle').innerHTML = $('#inputTitle').value; // 更新标题
    $('#hidDate').innerHTML = $('#inputDate').value; // 更新日期
    $('#taskContent').innerHTML = $('#inputContent').value // 更新内容

    // 如何更改task的content
    // 而不是只更改taskcontent的innerHTML
    // 要再次遍历data.tasks？判断title是否相同然后改？

    // TODO(繁琐)
    // 刷新数据
    each(data.tasks, function (task) {
        // 为了避免与新增任务的保存按钮冲突，$('.selectedTask')[0]起了作用
        var title;
        if ($('.selectedTask')[0]) {
            title = $('.selectedTask')[0].innerHTML;    // 选中任务的标题

            if (task.title === title) {
                task.title = $('#inputTitle').value;        // 标题
                task.time = $('#inputDate').value;          // 日期
                task.content = $('#inputContent').value;    // 任务内容
                $('.selectedTask')[0].innerHTML = $('#hidTitle').innerHTML; // 更新选中任务标题
                $('.selectedTask')[0].previousSibling.innerHTML = $('#hidDate').innerHTML; // 选中任务时间

            }
        }
        updateData();
    })
    if (!$('.selectedTask')[0]) {
        // $('#tasksList').innerHTML += '<li><ul class="data-task" isDone="false"><li>' + $('#inputDate').value + '</li><li class="task-title">' + $('#inputTitle').value + '</li></li>';
        node = document.createElement('li');
        node.innerHTML ='<ul class="data-task" isDone="false"><li>' + $('#inputDate').value + '</li><li class="task-title">' + $('#inputTitle').value + '</li>';
        $('#tasksList').appendChild(node);
        var pra1 = $('.selectedCate')[0].parentNode.getAttribute('data-cate-id');   // 主分类
        var pra2 = $('.selectedCate')[0].getAttribute('data-list-id') // 子分类
        var newTaskList = new TaskList(pra1, pra2);
        var newTask = new TaskDetail(newTaskList, $('#inputTitle').value, $('#inputDate').value, $('#inputContent').value, false);
        data.tasks.push(newTask);
        updateData();
    }

}

// 添加任务
$.click($('#addTask'), addATask);
function addATask() {
    $('.rightContent')[0].style.display = 'none';
    $('.rightHideWrap')[0].style.display = 'block';
    // 初始化编辑界面
    // $('.selectedCate')[0]
    removeClass($('.selectedTask')[0], 'selectedTask');
}


// 取消编辑按钮
$.click($('#return'), returnEdit);
function returnEdit() {
    $('.rightContent')[0].style.display = 'block';
    $('.rightHideWrap')[0].style.display = 'none';
}


