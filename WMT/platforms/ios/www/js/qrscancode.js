(function ($) {

    /* Scan Membership Card function */
    QRScan.ScanMemberShipCard = function () {
       cordova.plugins.barcodeScanner.scan(
		function (result) {
		  //  $.mobile.navigate('#dvScanMemberShip');

		    var code = 'sad'
		    var ajaxcallobj = {
		        url: 'getmembershippoints',
		        data: { qr_code: code }
		    }

		    WMT.jqXHR(ajaxcallobj, function (response) {
		        if (response != undefined && response != null) {
		            $('#abl_pnt').html(response[0].availPoints);
		            $('#str_pnt').html(response[0].storePoints);
		            $('#wmt_pnt').html(response[0].wmtPoints);
		            
		        }
		    });
		    var ajaxcallobj1 = {
		        url: 'getmembershipdsicount',
		        data: { store_id: 157 }
		    }
		    WMT.jqXHR(ajaxcallobj1, function (response) {
		        if (response != undefined && response != null) {
		          
		            $('#dis_rte').html(' ' + response[0].Membership_discount );
		          
		        }
		    });

		}, 
		function (error) {
			alert("Scanning failed: " + error);
		}
	);
    }

    /* Load Local Picture function */
    QRScan.LoadPicture = function () {
        capturePhotoLibrary2();
    }

    /* Offline Scan function */
    QRScan.ScanOffline = function () {
        cordova.plugins.barcodeScanner.scan(
                function (result) {
                   
         //   $.mobile.navigate('#dvScanMemberShip');

                },
                function (error) {
                    alert("Scanning failed: " + error);
                }
            );
    }

})(jQuery);


/* Restricte to number */
$('#total_cost').bind('keyup', function () {
    $(this).val($(this).val().replace(/[^0-9]/g, ''));
});

$('#total_cost').blur(function () {
    var cost = $('#total_cost').val();
    if ($('#chkMbr_dis').prop('checked')) {
       
        var discount = $('#dis_rte').html();
        var netcost = cost - (cost * (discount / 100));
        $('#net_cost').html('&nbsp  ' + netcost);
    }
    else {
        $('#net_cost').html('&nbsp  ' + cost);
    }


});
$('#chkMbr_dis').change(function () {
    var cost = $('#total_cost').val();
    if ($('#chkMbr_dis').prop('checked')) {
        var discount = $('#dis_rte').html();
        var netcost = cost - (cost * (discount / 100));
        $('#net_cost').html('&nbsp  ' + netcost);
    }
    else {
        $('#net_cost').html('&nbsp  ' + cost);
    }
});