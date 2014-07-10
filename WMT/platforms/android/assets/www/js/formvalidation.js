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
        txtResetPwdByMobileNumber: {
            required: true
        },
        txtResetPwdByEmail: {
            required: true,
            email: true
        }
    }
});

$('#frmStep1').validate({
    rules: {
        txtMobileNumber: {
            required: true           
        },
        txtEmailAddress: {
            required: false,
            email: false
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

$('#frmPublishPin').validate({
    rules: {
        txtPublishedPassword: {
            required: true
        }
    }
});

$('#frmStoreInformation').validate({
    rules: {
        txtStoreInformation: {
            required: true
        }
    }
});

$('#frmMembershipDiscount').validate({
    rules: {
        txtMembershipdiscount: {
            required: true,
            number:true
        }
    }
});

$('#frmProductDiscount').validate({
    rules: {
        txtProductInformation: {
            required: true
        },
        txtPrice: {
            required: true
        },
        txtdiscount: {
            required: true
        }
    }
});

$('#frmProductDuration').validate({
    rules: {
        frmProductDuration: {
            required: true
        },
        txtProductDurationdiscount: {
            required: true
        },
        txtProductDurationInformation: {
            required: true
        }
    }
})
$('#frmGiftPoint').validate({
    rules: {
        txtProductGiftPrice: {
            required: true
        },
        txtProductGiftPoint: {
            required: true
        },
        txtProductGiftInformation: {
            required: true
        }
    }
})