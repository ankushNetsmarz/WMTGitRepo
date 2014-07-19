
(function ($) {

    var retObj = {};
    var regObj = {};
    var addressObj = {};
    $(document).on('submit', '#frmStep1', function () {

        var MobileNo = $.trim($('#txtMobileNumber').val());
        var Email = $.trim($('#txtEmailAddress').val());
        var ajaxcallobj = {
            url: "existuser",
            data: { phoneNumber: MobileNo, emailAddress: Email }
        }
        WMT.jqXHR(ajaxcallobj, function (response) {
            if (parseInt(response.success) == 0) {
                $.mobile.navigate("#wstep2");
                regObj.mobileNumber = MobileNo; regObj.emailAddress = Email;
            }
            else {
                $.dynamic_popup(' <p>Phone number already exist.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
            }
        });

    });



    $(document).on('submit', '#frmStep2', function () {
        regObj.password = $.trim($('#txtRegPassword').val());
        $.mobile.navigate("#wstep3");
    });


    $(document).on('submit', '#frmStep3', function () {
        regObj.storeName = $.trim($('#txtStoreName').val());
        regObj.phoneNumber = $.trim($('#txtPhone').val());
        regObj.address1 = $.trim($('#txtAddressDetail1').val());
        regObj.address2 = $.trim($('#txtAddressDetail2').val());
        regObj.Industrylevel1 = $('#selectIndustrylevel1').val();
        regObj.Industrylevel2 = $('#selectIndustrylevel2').val();
        regObj.Industrylevel3 = $('#selectIndustrylevel3').val();
        regObj.Type = $('#sltIndustryType').val();
        $.mobile.navigate("#wstep4");
    });

    $(document).on('submit', '#frmStep4', function () {
        regObj.ownerName = $.trim($('#txtOwnerName').val());
        regObj.owner_id = $.trim($('#txtID').val());
        regObj.ProfilePicPath = window.localStorage.getItem("imageData");
        $.mobile.navigate("#wstep5");
    });

    $(document).on('submit', '#frmStep5', function () {
        regObj.publishPassword = $.trim($('#txtPublishPassword').val());
        var ajaxcallobj = {
            url: "completereg",
            data: {
                RegisterData: regObj
            }
        }
        WMT.jqXHR(ajaxcallobj, function (response) {
            if (response.store_id > 0) {
                $('#frmStep1, #frmStep2, #frmStep3, #frmStep4, #frmStep5')[0].reset();
                $.mobile.navigate("#wstep6");
            }
        });

    });


    $.fn.StartNow = function () {
        $.mobile.navigate("#dvStore");
    }
    $.fn.StartNow = function () {
        $.mobile.navigate("#login");
    }
    $.fn.Exit = function () {
    	   navigator.app.exitApp();
    }


    /* show agreement screen */

    $('#termAgreement').on("click", function () {
        $.mobile.navigate("#dvTermAndAgreement");
    });

})(jQuery)