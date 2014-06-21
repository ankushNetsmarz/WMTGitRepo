$('#login').bind('pageinit', function (event) {
    $('#frmLogin').validate({
        rules: {
            txtUserName: {
                required: true
            },
            txtPassword: {
                required: true
            }
        }
    });
});

$('#frmForgetPassword').validate({
    rules: {
        txtEnterMobileNumber: {
            required: true
        }
    }
});

$('#frmStep1').validate({
    rules: {
        txtMobileNumber: {
            required: true           
        },
        txtEmailAddress: {
            required: true,
            email: true
        }
    }
});
$("#frmStep2").validate({
    rules: {
        txtRegPassword: {
            required: true
        },
        txtRegRepPassword: {
            required: true,
            equalTo: "#txtRegPassword"
        }
    }
});
$("#frmStep3").validate({
    rules: {
        txtStoreName: {
            required: true
        },
        txtAddressDetail1: {
            required: true
        },
        txtPhone: {
            required: true            
        }
    }
});
$("#frmStep4").validate({
    rules: {
        txtOwnerName: {
            required: true
        },
        txtID: {
            required: true
        }
    }
});

$("#frmStep5").validate({
    rules: {
        txtPublishPassword: {
            required: false,
            noSpace: true

        },
        txtRepPublishPassword: {
            required: false,
            noSpace: true,
            equalTo: "#txtPublishPassword"
        }
    }
});

jQuery.validator.addMethod("noSpace", function (value, element) {
    return value.indexOf(" ") < 0;
}, "Space not allowed");

$("#frmSaveStoreChanges").validate({
    rules: {
        txtEditStore: {
            required: true
        }
    }
});

