
(function ($) {


    $(document).on('submit', '#frmLogin', function () {
        var UserName = $.trim($('#txtUserName').val());
        var Password = $.trim($('#txtPassword').val());       
        if ($('#rememberme').is(':checked')) {
            RememberMe = true;
        } 
        var ajaxcallobj = {
            url: "userlogin",
            data: { phoneNumber: UserName, password: Password, RememberMe: RememberMe }
        }

        WMT.jqXHR(ajaxcallobj, function (response) {
            if (response.success > 0) {

                /* Create Local Storage */
                objlocalStorage.User_ID = response.user_id;
                objlocalStorage.Store_ID = response.store_id;
                objlocalStorage.Publish_Pin = response.publish_password;

                localStorage.setItem("LocalStorageObj", JSON.stringify(objlocalStorage));
                if (RememberMe) {
                    window.localStorage.setItem("username", UserName);
                    window.localStorage.setItem("pwd", Password);
                }
                else {
                    window.localStorage.setItem("username", '');
                    window.localStorage.setItem("pwd", '');
                }
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
            $('#dvShowEmail').removeClass('clsHide').show();
            $('#dvShowSMS').addClass('clsHide');
        }
        else if ($(this).attr('id') == "rdoSMS") {         
            $('#dvShowSMS').removeClass('clsHide').show();
            $('#dvShowEmail').addClass('clsHide');
        }
        $('#frmForgetPassword').removeClass('clsHide').show();

    });


    /* Forget Password Function */
    $(document).on('submit', '#frmForgetPassword', function () {
        var Email = $.trim($('#txtResetPwdByEmail').val());
        var Type = 1; // For Email
        var ajaxcallobj = {
            url: "forgetpassword",
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
        
        if (RememberMe) {
            window.localStorage.setItem("username", window.localStorage.getItem("username"));
            window.localStorage.setItem("pwd", window.localStorage.getItem("pwd"));
        }
        else {
            window.localStorage.setItem("username", '');
            window.localStorage.setItem("pwd", '');
            $('#txtUserName, #txtPassword').val('');
           // $('#rememberme').prop('checked', false).checkboxradio('refresh');
        }
        localStorage.clear();
        $.mobile.navigate('#login');
    });

})(jQuery)