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

    request.start = function (arr){
        if(Object.prototype.toString.call(arr[i]) === '[object Array]' ) {
            for (var k=0; k<arr[i].length; k++){
                var setLoader = '';
                counter++;
                var response = arr[i][k].type+' file '+arr[i][k].url+' loaded successful';
                if (arr[i][k].type == "js"){
                    setLoader = document.createElement('script');
                    setLoader.setAttribute("src", arr[i][k].url);
                    setLoader.addEventListener('load', console.log(response), false);
                }
                else if (arr[i][k].type == "css"){
                    setLoader = document.createElement("link");
                    setLoader.setAttribute("rel", "stylesheet");
                    setLoader.setAttribute("href", arr[i][k].url);
                    setLoader.addEventListener('load', console.log(response), false);

                } else if (arr[i][k].type == "ajax"){
                    var xmlhttp = getXmlHttp();
                    xmlhttp.open('GET', arr[i][k].url, true);
                    xmlhttp.onreadystatechange = function() {
                        if (xmlhttp.readyState == 4) {
                            if(xmlhttp.status == 200) {
                                console.log(arr[i][k].type+' request completed');
                                counter++;
                            }
                        }
                    };
                    xmlhttp.send(null);
                }

                if (typeof setLoader!=="undefined"){
                    document.getElementsByTagName("head")[0].appendChild(setLoader);
                }

                setLoader.onload = function (){
                    if (counter === arr[i].length){
                        i++;
                        request.start(arr);
                    }
                };

            }
        } else {
            var setLoader = '';
            var response = arr[i].type+' file '+arr[i].url+' loaded successful';
            if (arr[i].type == "js"){
                setLoader = document.createElement('script');
                setLoader.setAttribute("src", arr[i].url);
                setLoader.addEventListener('load', console.log(response), false);
            }
            else if (arr[i].type == "css"){
                setLoader = document.createElement("link");
                setLoader.setAttribute("rel", "stylesheet");
                setLoader.setAttribute("href", arr[i].url);
                setLoader.addEventListener('load', console.log(response), false);

            } else if (arr[i].type == "ajax"){
                var xmlhttp = getXmlHttp();
                xmlhttp.open('GET', arr[i].url, true);
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4) {
                        if(xmlhttp.status == 200) {
                            console.log(arr[i].type+' request completed');
                            i++;
                            request.start(arr);
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
                request.start(arr);
            }
        }
//        console.log(i);
    };

    RequestQueue = function (){
        return request;
    };

    request.load({url:'js/underscore-min.js',type:'js'});
    request.load([{url:'js/backbone-min.js', type:'js'},{url:'css/style.css', type:'css'}]);
    request.load({url:'generated.json', type:'ajax'});
    request.start(queue);
})();