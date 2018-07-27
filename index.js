var oLi = document.getElementsByTagName('li'),
    page = 1,
    flag = true;

function ajaxFun() {
    if(flag){
        flag = false;
        ajax('get', 'getPics.php', piclist, 'cpage=' + page, true);
        page++;
    }
    
}
ajaxFun();

function piclist (data) {
    var value = JSON.parse(data);
    console.log(value);
    if(value.length > 0){
        value.forEach(function (ele, index) {
            var index = getMinLi(oLi);
            var oDiv = document.createElement('div'),
                oP = document.createElement('p'),
                oImg = new Image();

            oImg.style.height = ele.height / ele.width * 236 + 'px';
            oImg.src = ele.preview;
            oP.innerHTML = ele.title;
            oDiv.className = 'item';

            oDiv.appendChild(oImg);
            oDiv.appendChild(oP);

            oLi[index].appendChild(oDiv);
            oImg.onerror = function() {
                oImg.style.margin = '-1px';
                oImg.style.width = '238px';
            }
        })
        flag = true;
    }
    
}

function getMinLi(dom) {
    var min = dom[0].offsetHeight,
        index = 0,
        len = dom.length;
    for (var i=1;i < len;i ++){
        if(min > dom[i].offsetHeight){
            min = dom[i].offsetHeight;
            index = i;
        }
    }

    return index;
}

function throttle(func, wait) {
    var timer = null;
    return function () {
        var _this = this;
        var argus = arguments;
        if (!timer) {
            timer = setTimeout(function () {
                func.apply(_this, argus);
                timer = null;
            }, wait)

        }
    }
}

window.onscroll = throttle(show, 1000);
function show() {
    var scrollheight = document.documentElement.scrollTop || document.body.scrollTop,
        clientheight = document.documentElement.clientHeight || document.body.clientHeight,
         oLiHeight = oLi[getMinLi(oLi)].offsetHeight;
    if (scrollheight + clientheight >= oLiHeight ) {
        ajaxFun();
    }
}