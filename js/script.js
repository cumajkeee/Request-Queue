function getXmlHttp(){
    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

var queue = [];

function load (url, type){
    queue[queue.length] = {
        url : url,
        type : type
    }
}

function start (arr){
    var setLoader,
        i;
    for (i = 0; i<arr.length; i++){
        if (arr[i].type == "js"){
            setLoader = document.createElement('script');
            setLoader.setAttribute("src", arr[i].url);
        }
        else if (arr[i].type == "css"){
            setLoader = document.createElement("link");
            setLoader.setAttribute("rel", "stylesheet");
            setLoader.setAttribute("href", arr[i].url);
        }
        else if (arr[i].type == "ajax"){
            var xmlhttp = getXmlHttp();
            xmlhttp.open('GET', arr[i].url, true);
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4) {
                    if(xmlhttp.status == 200) {
                        alert('success');
                    }
                }
            };
            xmlhttp.send(null);
        }
        if (typeof setLoader!="undefined"){
            document.getElementsByTagName("head")[0].appendChild(setLoader);
        }
    }
    console.log(queue);
}

load('js/underscore-min.js', 'js');
load('js/backbone-min.js', 'js');
load('css/style.css', 'css');
load('generated.json', 'ajax');
start(queue);