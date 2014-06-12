/// <reference path="" />
(function ($) {
    $.mobile.defaultPageTransition = 'slide';
    $(document).on('click', '.clsback', function () {
        window.history.back();
    });

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

        $.fn.jqXHR(ajaxcallobj, function (response) {
            if (response.success > 0) {
                $.mobile.navigate("#dvQRCode");
            }
            else {
                $('#amsg').trigger('click');
            }
        });
    });

    /* */
    $.fn.ShowPasswordiv = function () {
        $.mobile.navigate("#dvForgetPassword");
    }


    /* Forget Password Function */
    $(document).on('submit', '#frmForgetPassword', function () {
        var Phone = $.trim($('#txtUserName').val());
        var ajaxcallobj = {
            url: "http://weexcel.biz/zend_webservice/public/index.php/user/forgetPassword",
            data: { phoneNumber: UserName, password: Password, RememberMe: RememberMe }
        }
        $.fn.jqXHR(ajaxcallobj, function (response) {
            if (response.success > 0) {
                $.mobile.navigate("#login");
            }           
        });
    });

    $(document).on('click', '#btnRegister', function () {
        $.mobile.navigate("#wstep1");
    });


})(jQuery)