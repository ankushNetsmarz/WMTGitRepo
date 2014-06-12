/*********************************************************/
/************* Ajax Call Custom Made Plugin *************/
//----------------------------------------------------------//
var option = {};
option.url = ""; option.data = ""; option.HttpVerb = "POST";

(function ($) {   
    $.fn.jqXHR = function (option, Callback) {
        var defaults = {
            HttpVerb: "POST",
            data: {},
            async: true,           
            dataType: "json"
        }
        var settings = $.extend({}, defaults, option);
        console.log(settings.url);
        $.ajax({
            type: "POST",
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
})(jQuery)