
(function ($) {
    var retObj = {};
    $(document).on('click', '.clsback', function () {
        window.history.back();
    });

    $(document).on('submit', '#frmStep1', function () {
        var MobileNo = $.trim($('#txtMobileNumber').val());
        var ajaxcallobj = {
            url: "http://weexcel.biz/zend_webservice/public/index.php/user/adduser",
            data: { phoneNumber: MobileNo }
        }
        $.fn.jqXHR(ajaxcallobj, function (response) {
            if (response.store_id > 0) {
                retObj.storeID = response.store_id;
                $.mobile.navigate("#wstep2");
            }
            else if (parseInt(response.success) == 0) {
                $('#amsgExist').trigger('click');
            }
        });

    });


    $(document).on('submit', '#frmStep2', function () {
        var RegPassword = $.trim($('#txtRegPassword').val());
        var ajaxcallobj = {
            url: "http://weexcel.biz/zend_webservice/public/index.php/user/updatepassword",
            data: { password: RegPassword, store_id: retObj.storeID }
        }

        $.fn.jqXHR(ajaxcallobj, function (response) {
            if (response.success > 0) {
                $.mobile.navigate("#wstep3");
            }
        });

    });


    $(document).on('submit', '#frmStep3', function () {
        var StoreName = $.trim($('#txtStoreName').val());
        var AddressLocation = $.trim($('#selectAddress').val());
        var Phone = $.trim($('#txtPhone').val());
        var AddressDetail = $.trim($('#txtAddressDetail').val());
        var Industrylevel1 = $.trim($('#selectIndustrylevel1').val());
        var Industrylevel2 = $.trim($('#selectIndustrylevel2').val());
        var Industrylevel3 = $.trim($('#selectIndustrylevel3').val());
        var ajaxcallobj = {
            url: "http://weexcel.biz/zend_webservice/public/index.php/user/updatestoredata",
            data: {
                store_id: retObj.storeID, storeName: StoreName, address: AddressLocation, addressDetails: AddressDetail, phoneNumber: Phone,
                Industrylevel1: Industrylevel1, Industrylevel2: Industrylevel2, Industrylevel3: Industrylevel3
            }
        }
        $.fn.jqXHR(ajaxcallobj, function (response) {
            if (response.success > 0) {
                $.mobile.navigate("#wstep4");
            }
        });
    });




    $(document).on('submit', '#frmStep4', function () {
   
        var OwnerName = $.trim($('#txtOwnerName').val());
        var ID = $.trim($('#txtID').val());
        var ajaxcallobj = {
            url: "http://weexcel.biz/zend_webservice/public/index.php/user/ownerprofile",
            data: {
                store_id: retObj.storeID, ownerName: OwnerName, owner_id: ID, ProfilePicPath: window.localStorage.getItem("imageData")
            }
        }
       
        $.fn.jqXHR(ajaxcallobj, function (response) {
            $.mobile.navigate("#wstep5");
           
        });

    });

    $(document).on('submit', '#frmStep5', function () {
        var PublishPassword = $.trim($('#txtPublishPassword').val());
        var RepPublishPassword = $.trim($('#txtRepPublishPassword').val());
        var ajaxcallobj = {
            url: "http://weexcel.biz/zend_webservice/public/index.php/user/publishpassword",
            data: {
                store_id: retObj.storeID, publishPassword: PublishPassword
            }
        }
        $.fn.jqXHR(ajaxcallobj, function (response) {
            if (response.success > 0) {
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

})(jQuery)