
(function ($) {

    var retObj = {};
    var addressObj = {};
    $(document).on('submit', '#frmStep1', function () {
        var MobileNo = $.trim($('#txtMobileNumber').val());
        var Email = $.trim($('#txtEmailAddress').val());
        var ajaxcallobj = {
            url: "http://weexcel.biz/zend_webservice/public/index.php/user/adduser",
            data: { phoneNumber: MobileNo, emailAddress: Email }
        }
        WMT.jqXHR(ajaxcallobj, function (response) {
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

        WMT.jqXHR(ajaxcallobj, function (response) {
            if (response.success > 0) {
                $.mobile.navigate("#wstep3");
            }
        });

    });

    /* Store addresss detail in array */
    $('#selectAddress').change(function () {
        $('#txtAddressDetail').val('');
        if ($('#selectAddress option:selected').attr('id') == 1) {
            $('#txtAddressDetail').val(addressObj.Address1);
        }
        else if ($('#selectAddress option:selected').attr('id') == 2) {
            $('#txtAddressDetail').val(addressObj.Address2);
        }
        else if ($('#selectAddress option:selected').attr('id') == 3) {
            $('#txtAddressDetail').val(addressObj.Address3);
        }
        else if ($('#selectAddress option:selected').attr('id') == 4) {
            $('#txtAddressDetail').val(addressObj.Address4);
        }
    });

    $('.SaveAddress').on('click', function () {
        if ($('#selectAddress option:selected').attr('id') == 1) {
            addressObj.Address1 = $.trim($('#txtAddressDetail').val());

        }
        else if ($('#selectAddress option:selected').attr('id') == 2) {
            addressObj.Address2 = $.trim($('#txtAddressDetail').val());
        }
        else if ($('#selectAddress option:selected').attr('id') == 3) {
            addressObj.Address3 = $.trim($('#txtAddressDetail').val());
        }
        else if ($('#selectAddress option:selected').attr('id') == 4) {
            addressObj.Address4 = $.trim($('#txtAddressDetail').val());
        }
        alert('Address saved');
    });

    $(document).on('submit', '#frmStep3', function () {
        var StoreName = $.trim($('#txtStoreName').val());
        var AddressLocation = $.trim($('#selectAddress').val());
        var Phone = $.trim($('#txtPhone').val());
        var address1 = $.trim($('#txtAddressDetail1').val());
        var address2 = $.trim($('#txtAddressDetail2').val());
        var Industrylevel1 = $('#selectIndustrylevel1').val();
        var Industrylevel2 = $('#selectIndustrylevel2').val();
        var Industrylevel3 = $('#selectIndustrylevel3').val();
        var Type = $('#sltIndustryType').val();
        var ajaxcallobj = {
            url: "http://weexcel.biz/zend_webservice/public/index.php/user/updatestoredata",
            data: {
                store_id: retObj.storeID, storeName: StoreName, phoneNumber: Phone, address1: address1, address2: address2,
                Industrylevel1: Industrylevel1, Industrylevel2: Industrylevel2, Industrylevel3: Industrylevel3, Type: Type
            }
        }
        WMT.jqXHR(ajaxcallobj, function (response) {
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

        WMT.jqXHR(ajaxcallobj, function (response) {
            $.mobile.navigate("#wstep5");

        });

    });

    $(document).on('submit', '#frmStep5', function () {
        var PublishPassword = $.trim($('#txtPublishPassword').val());
        var RepPublishPassword = $.trim($('#txtRepPublishPassword').val());
        if (PublishPassword != '') {
            var ajaxcallobj = {
                url: "http://weexcel.biz/zend_webservice/public/index.php/user/publishpassword",
                data: {
                    store_id: retObj.storeID, publishPassword: PublishPassword, Published: true
                }
            }
            WMT.jqXHR(ajaxcallobj, function (response) {
                if (response.success > 0) {
                    $.mobile.navigate("#wstep6");
                }
            });
        }
        else {

            var ajaxcallobj = {
                url: "http://weexcel.biz/zend_webservice/public/index.php/user/publishpassword",
                data: {
                    store_id: retObj.storeID, Published: false
                }
            }
            WMT.jqXHR(ajaxcallobj, function (response) {
                if (response.success > 0) {
                    $.mobile.navigate("#wstep6");
                }
            });
        }

    });


    $.fn.StartNow = function () {
        $.mobile.navigate("#dvStore");
    }
    $.fn.StartNow = function () {
        $.mobile.navigate("#login");
    }


    /* show agreement screen */

    $('#termAgreement').on("click", function () {
        $.mobile.navigate("#dvTermAndAgreement");
    });
})(jQuery)