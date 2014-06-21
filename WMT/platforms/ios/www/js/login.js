
(function ($) {


    $(document).on('submit', '#frmLogin', function () {
        var UserName = $.trim($('#txtUserName').val());
        var Password = $.trim($('#txtPassword').val());
        var RememberMe = false;
        if ($('#rememberme').is(':checked')) {
            RememberMe = true;
        }
        var ajaxcallobj = {
            url: "http://weexcel.biz/zend_webservice/public/index.php/user/userlogin",
            data: { phoneNumber: UserName, password: Password, RememberMe: RememberMe }
        }

        WMT.jqXHR(ajaxcallobj, function (response) {
            if (response.success > 0) {

                /* Create Local Storage */
                objlocalStorage.User_ID = response.user_id;
                objlocalStorage.Store_ID = response.store_id;
                objlocalStorage.Publish_Pin = response.publish_password;
                localStorage.setItem("LocalStorageObj", JSON.stringify(objlocalStorage));
                $.mobile.navigate("#dvStore");
            }
            else {
                $('#amsg').trigger('click');
            }
        });
    });


    $('.clsok').on('click', function () {
        $('#txtUserName').focus();
    });


    $.fn.ShowPasswordiv = function () {
        $('#frmForgetPassword').hide();
        $.mobile.navigate("#dvForgetPassword");
    }


    $('.clsRecover').change(function () {
        $('.clsHide').hide();
        if ($(this).attr('id') == "rdoEmail") {            
            $('#dvShowEmail').show();
        }
        else if ($(this).attr('id') == "rdoSMS") {         
            $('#dvShowSMS').show();
        }
        $('#frmForgetPassword').show();

    });


    /* Forget Password Function */
    $(document).on('submit', '#frmForgetPassword', function () {
        var Phone = $.trim($('#txtUserName').val());
        var ajaxcallobj = {
            url: "http://weexcel.biz/zend_webservice/public/index.php/user/forgetPassword",
            data: { phoneNumber: UserName, password: Password, RememberMe: RememberMe }
        }
        WMT.jqXHR(ajaxcallobj, function (response) {
            if (response.success > 0) {
                $.mobile.navigate("#login");
            }
        });
    });

    $('#btnRegister').on('click', function () {
        $.mobile.navigate("#wstep1");
    });


    /* logout event */
    $('.aLogout').on("click", function () {
        localStorage.clear();
        $.mobile.navigate('#login');
    });




})(jQuery)