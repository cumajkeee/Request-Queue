var RequestQueue = (function (){
    var queue = [];
    var request = {};
    var i=0;
    var counter = 0;

    function getXmlHttp(){
        var xmlhttp;
        if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
            xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
    }
    request.load = function (elem){
        queue[queue.length] = elem;
    };

    function multiCb (){
        console.log('loaded successful');
        counter++;
        if (counter === queue[i].length){
            i++;
            console.log('array uploaded');
            request.start(queue);
        }
    }

    function singleCb (){
        console.log('loaded successful');
        console.log('element uploaded');
        i++;
        request.start(queue);
    }

    function loader (el, callback){
//        var response = el.type+' file '+el.url+' loaded successful';
        if (el.type == "js"){
            setLoader = document.createElement('script');
            setLoader.setAttribute("src", el.url);
            setLoader.addEventListener('load', callback, false);
        }
        else if (el.type == "css"){
            setLoader = document.createElement("link");
            setLoader.setAttribute("rel", "stylesheet");
            setLoader.setAttribute("href", el.url);
            setLoader.addEventListener('load', callback, false);

        } else if (el.type == "ajax"){
            var xmlhttp = getXmlHttp();
            xmlhttp.open('GET', el.url, true);
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4) {
                    if(xmlhttp.status == 200) {
                        callback();
                    }
                }
            };
            xmlhttp.send(null);
        }

        if (typeof setLoader!=="undefined"){
            document.getElementsByTagName("head")[0].appendChild(setLoader);
        }
    }

    request.start = function (arr){
        if(Object.prototype.toString.call(arr[i]) === '[object Array]' ) {
            for (var k=0; k<arr[i].length; k++){
                loader(arr[i][k], multiCb);
            }
        } else {
            loader(arr[i], singleCb);
        }
    };

    RequestQueue = function (){
        return request;
    };

    request.load({url:'js/underscore-min.js',type:'js'});
    request.load([{url:'js/backbone-min.js', type:'js'},{url:'css/style.css', type:'css'}]);
    request.load({url:'generated.json', type:'ajax'});
    request.start(queue);
})();