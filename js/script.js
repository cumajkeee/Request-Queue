var RequestQueue = (function (){
    var queue = [];
    var request = {};

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

    request.load = function (url, type){
        queue[queue.length] = {
            url : url,
            type : type
        }
    };

    request.start = function (arr){
        var setLoader,
            i;
        for (i = 0; i<arr.length; i++){
            if (arr[i].type == "js"){
                setLoader = document.createElement('script');
                setLoader.setAttribute("src", arr[i].url);
                console.log('JavaScript file '+arr[i].url+' loaded successful');
            }
            else if (arr[i].type == "css"){
                setLoader = document.createElement("link");
                setLoader.setAttribute("rel", "stylesheet");
                setLoader.setAttribute("href", arr[i].url);
                console.log('CSS file '+arr[i].url+' loaded successful');
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
                            console.log('AJAX request '+arr[i].url+' completed');
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

    request.load('js/underscore-min.js', 'js');
    request.load('js/backbone-min.js', 'js');
    request.load('css/style.css', 'css');
    request.load('generated.json', 'ajax');
    request.start(queue);
})();


