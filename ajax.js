
function ajax(method, url, callback, data,flag) {
   
    //    建立一个ajax对象

    var ajaxj = null;
    if (window.XMLHttpRequest) {
        ajaxj = new XMLHttpRequest();
    } else {
        ajaxj = new ActiveXObject('Microsoft.XMLHttp');
    }

    // 监听状态值

    ajaxj.onreadystatechange = function() {
        if (ajaxj.readyState == 4) {
            if (ajaxj.status == 200) {
                callback(ajaxj.responseText);
            }else {
                console.log('error');
            }
        }
    }
    
    // 判断请求方式
   method = method.toUpperCase();
    if(method == 'GET') {
        var oDate = new Date().getTime();
        ajaxj.open(method,url + '?' + data +'&time=' + oDate,flag);
        ajaxj.send();
    }else if(method == 'POST') {
        ajaxj.open(method, url, flag);
        ajaxj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        ajaxj.send(data);
    }
}