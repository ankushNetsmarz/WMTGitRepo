/*********************************************************/
/************* Ajax Call Custom Made Plugin *************/
//----------------------------------------------------------//
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
            url: settings.url,
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

