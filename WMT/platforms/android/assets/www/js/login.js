
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
                //  console.log()
                localStorage.setItem("LocalStorageObj", JSON.stringify(objlocalStorage));
                $.mobile.navigate("#dvStore");
            }
            else {
                $.dynamic_popup('<p>Wrong user name or password.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
            }
        });
    });


    $('.clsok').on('click', function () {
        $('#txtUserName').focus();
    });


    $.fn.ShowPasswordiv = function () {
        $('#frmForgetPassword').hide();        
        $.mobile.navigate("#dvForgetPassword");
        $("input[type='radio']").attr("checked", false).checkboxradio("refresh");
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
        var Email = $.trim($('#txtResetPwdByEmail').val());
        var Type = 1; // For Email
        var ajaxcallobj = {
            url: "http://weexcel.biz/zend_webservice/public/index.php/user/forgetpassword",
            data: { EmailAddress: Email, Type: Type }
        }
        WMT.jqXHR(ajaxcallobj, function (response) {
            if (response.success > 0) {
                $('#frmForgetPassword')[0].reset();
                $.dynamicSuccess_popup(' <p>We have sent you a new password on your email.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
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