
(function ($) {
    $.mobile.defaultPageTransition = 'slide';
    //$.mobile.page.prototype.options.domCache = true;
    $(document).on('click', '.clsback', function () {
        $('label.error').hide();
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


    $(document).on('click', '.clsok', function () {       
        $('#txtUserName').focus();
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
        // $.mobile.changePage($(document.location.href = "/modules/registernewstore.html"), 'fade');
        $.mobile.navigate("#wstep1");
    });


})(jQuery)