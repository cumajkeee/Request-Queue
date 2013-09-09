var RequestQueue = (function (){
    var queue = [];
    var request = {};
    var i=0;
    function getXmlHttp(){
        var xmlhttp;
        if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
            xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
    }

    request.load = function (elem){
        if(Object.prototype.toString.call(elem) === '[object Array]' ) {
            for (var i=0; i<elem.length; i++){
                queue.push(elem[i]);
            }
        } else {
            queue[queue.length] = elem;
        }
    };

    request.start = function (){
        var setLoader = '';
        var response = queue[i].type+' file '+queue[i].url+' loaded successful';
        if (queue[i].type == "js"){
            setLoader = document.createElement('script');
            setLoader.setAttribute("src", queue[i].url);
            setLoader.addEventListener('load', console.log(response), false);
        }
        else if (queue[i].type == "css"){
            setLoader = document.createElement("link");
            setLoader.setAttribute("rel", "stylesheet");
            setLoader.setAttribute("href", queue[i].url);
            setLoader.addEventListener('load', console.log(response), false);

        } else if (queue[i].type == "ajax"){
            var xmlhttp = getXmlHttp();
            xmlhttp.open('GET', queue[i].url, true);
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4) {
                    if(xmlhttp.status == 200) {
                        console.log(queue[i].type+' request completed');
                        i++;
                        request.start();
                    }
                }
            };

            xmlhttp.send(null);
        }

        if (typeof setLoader!=="undefined"){
            document.getElementsByTagName("head")[0].appendChild(setLoader);
        }

        setLoader.onload = function (){
           i++;
           request.start();
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