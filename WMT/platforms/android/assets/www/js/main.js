/*********************************************************/
/************* Ajax Call Custom Made Plugin *************/
//----------------------------------------------------------//
var mainUrl = "http://182.92.83.16/ZendApp/public/index.php/user/";
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
            url: mainUrl + settings.url,
            data: settings.data,
            dataType: settings.dataType,
            async: settings.async,
            beforeSend: function () { $.mobile.loading('show'); },
            complete: function () { $.mobile.loading('hide'); },
            success: function (data) {
                return Callback(data);
            },
            error: function (error) {                
                $.dynamic_popup('<p>Operation Failed.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">OK</a>');
            }
        });
    }

})(jQuery);

