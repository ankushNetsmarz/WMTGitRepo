(function ($) {

    /* Scan Membership Card function */
    QRScan.ScanMemberShipCard = function () {
       cordova.plugins.barcodeScanner.scan(
		function (result) {
			   alert(result.text);
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
                    alert(result.text);

                },
                function (error) {
                    alert("Scanning failed: " + error);
                }
            );
    }

})(jQuery);