$('#login').bind('pageinit', function (event) {
    $('form').validate({
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
$('#frmStep1').validate({
    rules: {
        txtMobileNumber: {
            required: true
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
        txtAddressDetail: {
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
            required: true
        },
        txtRepPublishPassword: {
            required: true,
            equalTo: "#txtPublishPassword"
        }
    }
});
