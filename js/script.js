var queue = [];

function load (url, type){
    queue[queue.length] = {
        url : url,
        type : type
    }
}

function start (obj){
    var setLoader,
        i;
    for (i = 0; i<obj.length; i++){
        if (obj[i].type=="js"){
            setLoader = document.createElement('script');
            setLoader.setAttribute("type","text/javascript");
            setLoader.setAttribute("src", obj[i].url);
        }
        else if (obj[i].type=="css"){
            setLoader = document.createElement("link");
            setLoader.setAttribute("rel", "stylesheet");
            setLoader.setAttribute("type", "text/css");
            setLoader.setAttribute("href", obj[i].url);
        }
        if (typeof setLoader!="undefined"){
            document.getElementsByTagName("head")[0].appendChild(setLoader);
        }
    }
    console.log(queue);
}

load('js/backbone-min.js', 'js');
load('js/jquery.min.js', 'js');
load('js/underscore-min.js', 'js');
start(queue);