/*********************************************************/
/************* Ajax Call Custom Made Plugin *************/
//----------------------------------------------------------//
var mainUrl = "http://182.92.83.16/ZendApp/public/index.php/user/";
//var mainUrl = "http://weexcel.biz/zend_webservice/public/index.php/user/";
    var option = {};
option.url = ""; option.data = ""; option.HttpVerb = "POST";

/* Alise for wmt common module */

var WMT = myStore = membership = QRScan = $.fn;
(function ($) {
    WMT.jqXHR = function (option, Callback) {
        var defaults = {
            HttpVerb: "POST",
            data: {},
            async: true,
            dataType: "json"
        }
        var settings = $.extend({}, defaults, option);
        
            $.ajax({
                type: settings.HttpVerb,
                url: settings.url =    settings.url = settings.xml == true ? settings.url: mainUrl + settings.url,           
                data: settings.data,
                dataType: settings.dataType,
                async: settings.async,
                beforeSend: function () { $.mobile.loading('show'); },
                complete: function () { $.mobile.loading('hide'); },
                success: function (data) {
                    return Callback(data);
                },
                error: function (error) {
                    alert(error.status + "<-and-> " + error.statusText);
                }
            });
        
       
    }

})(jQuery);

