var RequestQueue = (function (){
    var queue = [];
    var request = {};
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

    request.start = function (arr){
        var setLoader,
            i;
        var status = 'loading';
        for (i = 0; i<arr.length; i++){
            var log = arr[i].type+' file '+arr[i].url+' loaded successful';
            if (arr[i].type == "js"){
                setLoader = document.createElement('script');
                setLoader.setAttribute("src", arr[i].url);
                setLoader.addEventListener('load', console.log(log), false);
            }
            else if (arr[i].type == "css"){
                setLoader = document.createElement("link");
                setLoader.setAttribute("rel", "stylesheet");
                setLoader.setAttribute("href", arr[i].url);
                setLoader.addEventListener('load', console.log(log), false);

            }
            if (typeof setLoader!="undefined"){
                document.getElementsByTagName("head")[0].appendChild(setLoader);
            }

            if (arr[i].type == "ajax"){
                var xmlhttp = getXmlHttp();
                xmlhttp.open('GET', arr[i].url, true);
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4) {
                        if(xmlhttp.status == 200) {
                            console.log('AJAX request completed');
                        }
                    }
                };
                xmlhttp.send(null);
            }
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