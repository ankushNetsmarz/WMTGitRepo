(function ($) {

    /* Scan Membership Card function */
    $.fn.ScanMemberShipCard = function () {
       cordova.plugins.barcodeScanner.scan(
		function (result) {
			   alert(result.text);
		}, 
		function (error) {
			alert("Scanning failed: " + error);
		}
	);
    }

    /* Load Local Picture function */
    $.fn.LoadPicture = function () {

    }

    /* Offline Scan function */
    $.fn.ScanOffline = function () {
cordova.plugins.barcodeScanner.scan(
		function (result) {
			 alert(result.text);
			
		}, 
		function (error) {
			alert("Scanning failed: " + error);
		}
	);
    }

})(jQuery);