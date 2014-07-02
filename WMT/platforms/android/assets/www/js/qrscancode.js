(function ($) {

    /* Scan Membership Card function */
    QRScan.ScanMemberShipCard = function () {
    	
       cordova.plugins.barcodeScanner.scan(
		function (result) {
			//alert(result);
		    $.mobile.navigate('#dvScanMemberShip');
		
		}, 
		function (error) {
			alert("Scanning failed: " + error);
		}
	);
    }

    /* Load Local Picture function */
    QRScan.LoadPicture = function () {
       
    }

    /* Offline Scan function */
    QRScan.ScanOffline = function () {
        cordova.plugins.barcodeScanner.scan(
                function (result) {
                   
            $.mobile.navigate('#dvScanMemberShip');

                },
                function (error) {
                    alert("Scanning failed: " + error);
                }
            );
    }

})(jQuery);