var pinentered = 0;
var pictureid = 0;
var storepictureid = 0;
var discountpictureid = 0;
var giftpictureid = 0;
var promotionpictureid = 0;
(function ($) {


    /* Apply active class on selected menu */
    var $navTo = "", membershipDiscount = "", imagePath = "http://weexcel.biz/";
    var PID = 0, counter = 1;


    $(document).on('click', '.clsPublisNav', function () {

        $navTo = $(this).attr('navigateTo');

        $('.publishPusinessinfo li').removeClass('current');
        $(this).parent('li').addClass('current');


        /* check if store has published pin then show publish screen*/
        //if (objlocalStorage.Publish_Pin != null && objlocalStorage.Publish_Pin != undefined && $navTo != "#dvViewPublishedInfo" && objlocalStorage.Publish_Pin != "") {
        //$.mobile.navigate('#dvPublishPin');
        //}
        //else {
        if ($navTo == "#dvMemberShipDiscount") {
            $.mobile.navigate($navTo);
            membership.getMemberShipdiscount();
        }
        else if ($navTo == "#dvViewPublishedInfo") {
            $.fn.getPublishedInfo();
            setTimeout(function () {
                $.mobile.navigate($navTo);
            }, 1000);

        }
        else {
            $.mobile.navigate($navTo);
        }
        //}
        PID = 0, counter = 1;
        $('.clrPublishedInfo').val('');
    });


    /************************* Picture event from camera *********************/
    var $thisImage;
    $(document).on('click', '.uploadImage', function () {
        $thisImage = $(this).children('img');
    });
    $(document).on('click', '#btnPickImageCamera', function () {
        capturePhotoCamera($thisImage);
        $('#cancelUpload').trigger('click');

    });
    $(document).on('click', '#btnPickImageGallery', function () {
        capturePhotoLibrary($thisImage);
        $thisImage.attr('src', "data:image/jpeg;base64," + imageDataObject);
        $('#cancelUpload').trigger('click');
    });


    /************************** validate publish pin *******************************/

    $(document).on('submit', '#frmPublishPin', function () {
        var publishedPin = $.trim($('#txtPublishedPassword').val());

        var ajaxcallobj = {
            url: "validatepublishpin",
            data: {
                store_id: objlocalStorage.Store_ID, published_pin: publishedPin
            }
        }
        WMT.jqXHR(ajaxcallobj, function (response) {
            $('#change_password').html('******');
            $('#Publish_Password').html('******');
            if (response.success > 0) {
                if (Publishpinfor == "Password") {
                    ChangePassword();
                    Publishpinfor = "";
                  

                    $.mobile.navigate('#dvStore');
                    $('#act-pub').addClass('active');
                    $('#act-sto').removeClass('active');
                    var pubsrc = $('#act-pub').find('img').attr('src').replace('.png', '-active.png')
                    var stosrc = $('#act-sto').find('img').attr('src').replace('-active.png', '.png')

                    $('#act-pub').find('img').attr('src', pubsrc)
                    $('#act-sto').find('img').attr('src', stosrc)
                    $('#publishinfotext').html('<h1>Publish Info</h1>');

                }
                else if (Publishpinfor == "Store") {
                    Publishpinfor = "";
                    savestoreinformation();
                    $('#act-pub').addClass('active');
                    $('#act-sto').removeClass('active');
                    var pubsrc = $('#act-pub').find('img').attr('src').replace('.png', '-active.png')
                    var stosrc = $('#act-sto').find('img').attr('src').replace('-active.png', '.png')

                    $('#act-pub').find('img').attr('src', pubsrc)
                    $('#act-sto').find('img').attr('src', stosrc)
                    $.mobile.navigate('#dvStore');
                    $('#publishinfotext').html('<h1>Publish Info</h1>');

                }
                else if (Publishpinfor == "Industries") {
                    Publishpinfor = "";
                    saveindustriesinformation();
                    $.mobile.navigate('#dvStore');
                    $('#act-pub').addClass('active');
                    $('#act-sto').removeClass('active');
                    var pubsrc = $('#act-pub').find('img').attr('src').replace('.png', '-active.png')
                    var stosrc = $('#act-sto').find('img').attr('src').replace('-active.png', '.png')

                    $('#act-pub').find('img').attr('src', pubsrc)
                    $('#act-sto').find('img').attr('src', stosrc)
                    $('#publishinfotext').html('<h1>Publish Info</h1>');

                }
                else if (Publishpinfor == "PublishPassword") {
                    Publishpinfor = "";
                    ChangePublishPassword();
                    $.mobile.navigate('#dvStore');
                    $('#act-pub').addClass('active');
                    $('#act-sto').removeClass('active');
                    var pubsrc = $('#act-pub').find('img').attr('src').replace('.png', '-active.png')
                    var stosrc = $('#act-sto').find('img').attr('src').replace('-active.png', '.png')
                    $('#act-pub').find('img').attr('src', pubsrc)
                    $('#act-sto').find('img').attr('src', stosrc)
                    $('#publishinfotext').html('<h1>Publish Info</h1>');

                }
                else {

                
                    $('#frmPublishPin')[0].reset();
                    $('#publishinfotext').html('<h1>Publish Info</h1>');
                    $.mobile.navigate('#dvPublishInfo');
                }

            }
            else {


                $.dynamic_popup(' <p>Invalid Publish Password.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                pinentered = parseInt(pinentered) + 1;
                if (pinentered == 3) {
                    pinentered = 0;
                    $.mobile.navigate('#login');

                }

            }
        });

    });

    /********************* Get membership discount ********************************/

    membership.getMemberShipdiscount = function () {
        if (membershipDiscount != '') {
            $('#txtMembershipdiscount').val(membershipDiscount);
        }
        else {
            var ajaxcallobj = {
                url: "getmembershipdiscount",
                HttpVerb: "GET",
                data: {
                    store_id: objlocalStorage.Store_ID
                }
            }
            WMT.jqXHR(ajaxcallobj, function (response) {
                if (response[0].Membership_discount != '' || response[0].Membership_discount != undefined) {
                    membershipDiscount = response[0].Membership_discount;
                    $('#txtMembershipdiscount').val(response[0].Membership_discount);
                }
            });
        }
    }

    /************************** Publish store information ********************************/

    $(document).on('submit', '#frmStoreInformation', function () {

        var edit = $('#sto-submit').hasClass('editimg');
        if (edit) {
            $(this).removeClass('editimg');
            var Information = $('#txtStoreInformation').val();
            var PID = $('#sto-submit').attr('data-id')
            var ajaxcallobj = {
                HttpVerb: "POST",
                url: "editstoreproduct",
                data: { store_id: objlocalStorage.Store_ID, id: pictureid, pic: imageDataObject, pid: PID, information: Information }
            }
            WMT.jqXHR(ajaxcallobj, function (response) {
                if (response.success > 0) {
                    pictureid = 0;
                    $('#sto-submit').removeClass('editimg');
                    window.history.back();
                    $.fn.getPublishedInfo();
                    //$.mobile.navigate('#dvViewPublishedInfo');
                    setTimeout(function () {
                        $.dynamicSuccess_popup('<p>Product detail Saved succesfully.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                    }, 2000)
                }

            });
        }
        else {

            if (imageDataObject != '') {

                var info = $.trim($('#txtStoreInformation').val());
                if (info.length <= 4000) {
                    if (counter <= 5) {
                        var ajaxcallobj = {
                            HttpVerb: "POST",
                            url: "storepicturesinformation",
                            data: { store_id: objlocalStorage.Store_ID, store_info: info, upload_pic: imageDataObject, PID: PID }
                        }

                        WMT.jqXHR(ajaxcallobj, function (response) {
                            if (response.success > 0) {
                                PID = response.PID;
                                counter = counter + 1;
                                //$('#frmStoreInformation')[0].reset();
                                $.fn.ResetImageUpload();
                                $.dynamicSuccess_popup('<p>Store infromation published succesfully.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                            }
                        });
                    }
                    else {
                        $.dynamic_popup('<p>You can upload only 5 picture.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                    }
                }
                else {
                    $.dynamic_popup(' <p>Product information should only contain max 4000 words.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                }
            }
            else {
                $.dynamic_popup('<p>Image can not be blank.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');

            }
        }
    });

    /************************* Publish membership information **********************************/

    $(document).on('submit', '#frmMembershipDiscount', function () {
        var discount = $.trim($('#txtMembershipdiscount').val());
        var ajaxcallobj = {
            HttpVerb: "POST",
            url: "membershipdiscount",
            data: { store_id: objlocalStorage.Store_ID, discount: discount }
        }
        WMT.jqXHR(ajaxcallobj, function (response) {
            if (response.success > 0) {
                membershipDiscount = discount;
                $('#dis_rte').html(membershipDiscount);
                $.dynamicSuccess_popup('<p>Membership discount published succesfully.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
            }
        });

    });

    /*************************** Publish product discount information **************************/

    $(document).on('submit', '#frmProductDiscount', function () {
        var edit = $('#dis-submit').hasClass('editimg');
        if (edit) {
            $(this).removeClass('editimg');
            var Information = $('#txtProductInformation').val();
            var Price = $('#txtPrice').val();
            var Discount = $('#Text2').val();
            var PID = $('#dis-submit').attr('data-id')
            var ajaxcallobj = {
                HttpVerb: "POST",
                url: "editproductdiscount",
                data: { store_id: objlocalStorage.Store_ID, id: pictureid, pic: imageDataObject, pid: PID, information: Information, price: Price, discount: Discount }
            }
            WMT.jqXHR(ajaxcallobj, function (response) {
                if (response.success > 0) {
                    pictureid = 0;
                    $('#dis-submit').removeClass('editimg');
                  
                    $.fn.getPublishedInfo();
                    window.history.back();
                   // $.mobile.navigate('#dvViewPublishedInfo');
                    setTimeout(function () {
                        $.dynamicSuccess_popup('<p>Product detail Saved succesfully.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                    }, 2000)
                }

            });
        }
        else {
            if (imageDataObject != '') {
                var Price = $.trim($('#txtPrice').val());
                var discount = $.trim($('#txtdiscount').val());
                var info = $.trim($('#txtProductInformation').val());
                if (info.length <= 4000) {
                    if (counter <= 5) {
                        var ajaxcallobj = {
                            HttpVerb: "POST",
                            url: "discountproduct",
                            data: { store_id: objlocalStorage.Store_ID, discount: discount, information: info, original_price: Price, upload_pic: imageDataObject, PID: PID }
                        }

                        WMT.jqXHR(ajaxcallobj, function (response) {
                            if (response.success > 0) {
                                $('#frmProductDiscount')[0].reset(); $.fn.ResetImageUpload();
                                $.dynamicSuccess_popup('<p>Product detail published succesfully.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                            }

                        });

                    }
                    else {
                        $.dynamic_popup('<p>You can upload only 5 picture.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                    }

                } else {
                    $.dynamic_popup(' <p>Product information should only contain max 4000 words.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                }
            }
            else {

                $.dynamic_popup('<p>Image can not be blank.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
            }
        }
    });

    /******************** Publish product duration information ******************************/

    $(document).on('submit', '#frmProductDuration', function () {
        var edit = $('#btn-promotion').hasClass('editimg');
        if (edit) {
            $(this).removeClass('editimg');
            var Information = $('#txtProductDurationInformation').val();
            var Price = $('#txtProductDurationPrice').val();
            var Discount = $('#txtProductDurationdiscount').val();
            var Duration = $('#sltDuration').val();
            var PID = $('#btn-promotion').attr('data-id')
            var ajaxcallobj = {
                HttpVerb: "POST",
                url: "editproduct",
                data: { store_id: objlocalStorage.Store_ID, id: pictureid, pid: PID, information: Information, price: Price, duration: Duration, discount: Discount, pic: imageDataObject, }
            }
            WMT.jqXHR(ajaxcallobj, function (response) {              
                if (response.success > 0) {
                    pictureid = 0;
                    $('#btn-promotion').removeClass('editimg');
                  
                    $.fn.getPublishedInfo();
                    window.history.back();
                    //$.mobile.navigate('#dvViewPublishedInfo');
                    setTimeout(function () { 
                        $.dynamicSuccess_popup('<p>Product detail Saved succesfully.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                    }, 2000)
                }

            });
        }
        else {
            if (imageDataObject != '') {
                var Price = $.trim($('#txtProductDurationPrice').val());
                var discount = $.trim($('#txtProductDurationdiscount').val());
                var info = $.trim($('#txtProductDurationInformation').val());
                var days = $('#sltDuration').val();
                if (info.length <= 4000) {
                    if (counter <= 5) {
                        var ajaxcallobj = {
                            HttpVerb: "POST",
                            url: "productpromotion",
                            data: { store_id: objlocalStorage.Store_ID, exp_day: days, discount: discount, promotion_information: info, price: Price, upload_pic: imageDataObject, PID: PID }
                        }

                        WMT.jqXHR(ajaxcallobj, function (response) {
                            if (response.success > 0) {
                                $('#frmProductDuration')[0].reset(); $.fn.ResetImageUpload();
                                $.dynamicSuccess_popup('<p>Product detail published succesfully.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                            }

                        });
                    }

                    else {
                        $.dynamic_popup('<p>You can upload only 5 picture.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                    }

                }
                else {
                    $.dynamic_popup(' <p>Product information should only contain max 4000 words.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');

                }
            }
            else {

                $.dynamic_popup('<p>Image can not be blank.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');

            }
        }
    });

    /************************* Publish product gift point information ******************************/

    $(document).on('submit', '#frmGiftPoint', function () {
        var edit = $('#gift-submit').hasClass('editimg');
        if (edit) {
            $(this).removeClass('editimg');
            var Information = $('#txtProductGiftInformation').val();
            var Price = $('#txtProductGiftPrice').val();
            var giftpoint = $('#txtProductGiftPoint').val();
            var PID = $('#gift-submit').attr('data-id')
            var ajaxcallobj = {
                HttpVerb: "POST",
                url: "editproductgift",
                data: { store_id: objlocalStorage.Store_ID, id: pictureid, pic: imageDataObject, pid: PID, information: Information, price: Price, discount: giftpoint }
            }
            WMT.jqXHR(ajaxcallobj, function (response) {
                if (response.success > 0) {
                    pictureid = 0;
                    $('#gift-submit').removeClass('editimg');

                    $.fn.getPublishedInfo();
                    window.history.back();
                    //$.mobile.navigate('#dvViewPublishedInfo');
                    setTimeout(function () {
                        $.dynamicSuccess_popup('<p>Product detail Saved succesfully.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                    }, 2000)
                }

            });
        }
        else {
            if (imageDataObject != '') {
                var Price = $.trim($('#txtProductGiftPrice').val());
                var giftPoint = $.trim($('#txtProductGiftPoint').val());
                var info = $.trim($('#txtProductGiftInformation').val());
                if (info.length <= 4000) {
                    if (counter <= 5) {
                        var ajaxcallobj = {
                            HttpVerb: "POST",
                            url: "giftpoint",
                            data: { store_id: objlocalStorage.Store_ID, gift_point: giftPoint, gift_info: info, gift_price: Price, gift_upload_pic: imageDataObject, PID: PID }
                        }

                        WMT.jqXHR(ajaxcallobj, function (response) {
                            if (response.success > 0) {
                                $('#frmGiftPoint')[0].reset();
                                $.fn.ResetImageUpload();
                                $.dynamicSuccess_popup('<p>Product detail published succesfully.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                            }

                        });
                    } else {
                        $.dynamic_popup('<p>You can upload only 5 picture.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                    }

                } else {
                    $.dynamic_popup(' <p>Product information should only contain max 4000 words.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                }
            }
            else {

                $.dynamic_popup('<p>Image can not be blank.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
            }
        }
    });

    /******************************** Get published product information ****************************/

    $.fn.getPublishedInfo = function () {
        var ajaxcallobj = {
            HttpVerb: "GET",
            url: "getallproductstoreinfo",
            data: { store_id: objlocalStorage.Store_ID }
        }

        WMT.jqXHR(ajaxcallobj, function (response) {

            var html = "";
            if (response.StorePicture.length > 0) {

                for (var i = 0; i < response.StorePicture.length; i++) {

                    html += '<div class="points-main"><p></p><div class="uploder"><div class="view-published">'
                   // +'<div class="callbacks_container"> <ul class="rslides callbacks callbacks4" id="slider4 "> <li ><img  tid="25" height="145" width="265" class="clsImage" src="http://182.92.83.16/ZendApp/public/product_promotion/53dfb2617d6d4.png" id="imgPublishedImage" /></li></ul></div>'
                    + ' <div class="callbacks_container"> <ul class="rslides callbacks callbacks4" id="slider4 ">' + response.StorePicture[i].Images + '</ul></div>'
                    + '</div></div>'
                    + '<div class="view-txt"><p><span id="sto-information" class="clsShow"> ' + response.StorePicture[i].introduction + '</span>'
                   // + '<textarea id="ProductInfroduction" class="textarea ui-input-text ui-shadow-inset ui-body-inherit ui-corner-all ui-textinput-autogrow clsHide">' + response.StorePicture[i].introduction + '</textarea></p></div>'
                    + '</p></div>'
                    + '<div class="ui-btn ui-input-btn ui-btn-b ui-corner-all ui-shadow ui-btn-inline"><span class="pub_del deletepublish">Delete</span><input type="button" name="Help" value="Delete" class="btn-download btnDelete" data-id="' + response.StorePicture[i].PID + '" data-type="storepicture" data-inline="true" data-theme="b"></div>'
                    + '<div class="ui-btn ui-input-btn ui-btn-b ui-corner-all ui-shadow ui-btn-inline"><span class="pub_mod">Modify</span><input type="button" Pic-name="Store" name="Help" value="Edit" class="btn-download btnEdit" data-type="storepicture" data-id="' + response.StorePicture[i].PID + '" data-inline="true" data-theme="b"></div></div></div></div></div>';
                }
            }
            if (response.ProductDiscount.length > 0) {
                for (var i = 0; i < response.ProductDiscount.length; i++) {
                    html += '<div class="points-main"><p></p><div class="uploder"><div class="view-published">'
                    + ' <div class="callbacks_container"> <ul class="rslides callbacks callbacks4" id="slider4 ">' + response.ProductDiscount[i].Images + '</ul></div>'
                    + '</div></div>'
                    + '<div class="view-txt"><p><span id="dis-information"> ' + response.ProductDiscount[i].introduction + '</span>'
                    //+ '<textarea id="ProductInfroduction" class="textarea ui-input-text ui-shadow-inset ui-body-inherit ui-corner-all ui-textinput-autogrow clsHide">' + response.ProductDiscount[i].introduction + '</textarea></p></div>'
                    + '</p></div>'
                    + '<div class="price-yaun"><div style="text-align:left"><p>Price: <span id="dis-ProductPrice" class="clsShow">' + response.ProductDiscount[i].price + '</span>'
                    //  + '<input type="text" id="ProductPrice" class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset clsHide" value="' + response.ProductDiscount[i].price + '" /><span class="currencyName">Yuan</span></p></div>'
                    + '</p></div>'
                    + '<div style="text-align:left"><p>Discount: <span id="dis-Discount" class="clsShow">' + response.ProductDiscount[i].discount + '</span>'
                    //+ '<input type="text" id="ProductDiscount" class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset clsHide" value="' + response.ProductDiscount[i].discount + '" /><span class="currencyName">%</span></p></div>'
                    + '</p></div>'
                    + '<p class="price-yaun-left price-yaun-status">Status: <select><option value="Active">Active<option><option value="Finish">Finished<option></select></p>'

                    + '<div style="text-align:Center"><div class="help-btn-publish">'
                    + '<div class="ui-btn ui-input-btn ui-btn-b ui-corner-all ui-shadow ui-btn-inline"><span class="pub_del">Delete</span><input type="button" name="Help" value="Delete" class="btn-download btnDelete" data-id="' + response.ProductDiscount[i].PID + '" data-type="productdiscount" data-inline="true" data-theme="b"></div>'
                    + '<div class="ui-btn ui-input-btn ui-btn-b ui-corner-all ui-shadow ui-btn-inline"><span class="pub_mod">Modify</span><input type="button" name="Help" value="Edit" Pic-name="discount" class="btn-download btnEdit" data-type="productdiscount" data-id="' + response.ProductDiscount[i].PID + '" data-inline="true" data-theme="b"></div></div></div></div></div>';
                }
            }
            if (response.ProductPromotion.length > 0) {
                for (var i = 0; i < response.ProductPromotion.length; i++) {
                    html += '<div class="points-main"><p></p><div class="uploder"><div class="view-published">'
                    + ' <div class="callbacks_container"> <ul class="rslides callbacks callbacks4" id="slider4 ">' + response.ProductPromotion[i].Images + '</ul></div>'
                    + '</div></div>'
                    + '<div class="view-txt"><p><span id="pp-information" class="clsShow"> ' + response.ProductPromotion[i].introduction + '</span>'
                   // + '<textarea id="ProductInfroduction" class="textarea ui-input-text ui-shadow-inset ui-body-inherit ui-corner-all ui-textinput-autogrow clsHide">' + response.ProductPromotion[i].introduction + '</textarea>'
                    + '</p></div>'
                    + '<div class="price-yaun"><div style="text-align:left"><p>Price: <span id="spnProductPrice" class="clsShow">' + response.ProductPromotion[i].price + '</span>'
                   // + '<input type="text" id="ProductPrice" class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset clsHide" value="' + response.ProductPromotion[i].price + '" /><span class="currencyName">Yuan</span></p></div>'
                    + '</p></div>'
                    + '<div style="text-align:left"><p>Discount: <span id="spnDiscount" class="clsShow">' + response.ProductPromotion[i].discount + '</span>'
                   // + '<input type="text" id="ProductDiscount" class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset clsHide" value="' + response.ProductPromotion[i].discount + '" /><span class="currencyName">%</span></p></div>'
                    + '</p></div>'
                   + '<p class="price-yaun-left price-yaun-status">Status: <select><option value="Active">Active<option><option value="Finish">Finished<option></select></p>'

                    + '<div style="text-align:Center"><div class="help-btn-publish">'
                    + '<div class="ui-btn ui-input-btn ui-btn-b ui-corner-all ui-shadow ui-btn-inline"><span Class="pub_del">Delete</span><input type="button" name="Help" value="Delete" class="btn-download btnDelete" data-id="' + response.ProductPromotion[i].PID + '" data-type="productproduction" data-inline="true" data-theme="b"></div>'
                    + '<div class="ui-btn ui-input-btn ui-btn-b ui-corner-all ui-shadow ui-btn-inline"><span class="pub_mod">Modify</span><input type="button" Pic-name="Promotion" name="Help" value="Edit" class="btn-download btnEdit" data-type="productpromotion" Expiry-Date="' + response.ProductPromotion[i].expiryDate + '" data-id="' + response.ProductPromotion[i].PID + '" data-inline="true" data-theme="b"></div></div></div></div></div>';
                }
            }
            if (response.GiftPoint.length > 0) {

                for (var i = 0; i < response.GiftPoint.length; i++) {
                    html += '<div class="points-main"><p></p><div class="uploder"><div class="view-published">'
                    + ' <div class="callbacks_container"> <ul class="rslides callbacks callbacks4" id="slider4 ">' + response.GiftPoint[i].Images + '</ul></div>'
                    + '</div></div>'

                    + '<div class="view-txt"><p><span id="gift-information" class="clsShow"> ' + response.GiftPoint[i].introduction + '</span>'
                   // + '<textarea id="ProductInfroduction" class="textarea ui-input-text ui-shadow-inset ui-body-inherit ui-corner-all ui-textinput-autogrow clsHide">' + response.GiftPoint[i].introduction + '</textarea></p></div>'
                    + '</p></div>'
                    + '<div class="price-yaun"><div style="text-align:left"><p>Price: <span id="gift-ProductPrice" class="clsShow">' + response.GiftPoint[i].price + '</span>'
                   // + '<input type="text" id="ProductPrice" class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset clsHide" value="' + response.GiftPoint[i].price + '" /><span class="currencyName">Yuan</span></p></div>'
                     + '</p></div>'
                    + '<div style="text-align:left"><p>Gift Point: <span id="gift-GifPoint" class="clsShow">' + response.GiftPoint[i].giftPoint + '</span>'
                    //+ '<input type="text" id="ProductGifPoint" class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset clsHide" value="' + response.GiftPoint[i].giftPoint + '" /></p></div>'
                     + '</p></div>'
                    + '<p class="price-yaun-left price-yaun-status">Status: <select><option value="Active">Active<option><option value="Finish">Finished<option></select></p>'

                    + '<div style="text-align:Center"><div class="help-btn-publish">'
                    + '<div class="ui-btn ui-input-btn ui-btn-b ui-corner-all ui-shadow ui-btn-inline"><span class="pub_del">Delete</span><input type="button" name="Help" value="Delete" class="btn-download btnDelete" data-id="' + response.GiftPoint[i].PID + '" data-type="giftpoint" data-inline="true" data-theme="b"></div>'
                    + '<div class="ui-btn ui-input-btn ui-btn-b ui-corner-all ui-shadow ui-btn-inline"><span class="pub_mod">Modify</span><input type="button" Pic-name="Gift" name="Help" value="Edit" class="btn-download btnEdit" data-type="giftpoint" data-id="' + response.GiftPoint[i].PID + '" data-inline="true" data-theme="b"></div></div></div></div></div>';
                }
            }
            if (html != '') {
                $('#dvPublishedProduct').html(html);
                $.fn.slider();
            }
            else {
                $('#dvPublishedProduct').html('<p>No record found!');
            }
        });
    }

    /********************** delete published picture **************************************/

    $(document).on('click', '.btnDelete', function () {
        var $this = $(this);
        var type = $(this).attr('data-type');
        var id = $(this).attr('data-id');
        var ajaxcallobj = {
            HttpVerb: "POST",
            url: "deletepublishedproduct",
            data: { store_id: objlocalStorage.Store_ID, type: type, id: id }
        }

        WMT.jqXHR(ajaxcallobj, function (response) {
            if (response.success > 0) {
                $.dynamicSuccess_popup('<p>Product deleted succesfully.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                $this.parent().closest('div.points-main').remove();
            }
        });

    });

    /********************* Edit published picture information *****************************/

    $(document).on('click', '.btnEdit', function () {
        var screenname = $(this).attr('Pic-name');
        if (screenname == "Store") {
            $('#dvStoreInformation').addClass('$back');
            var information = $(this).parent().parent().parent().parent().parent().find('#sto-information').html();
            var $this = $(this).parent().parent().find('img');
            var imglength = $this.length;
            $('#txtStoreInformation').val(information);
            for (var i = 0; i < imglength; i++) {
                var newsrc = $($this).eq(i).attr('src');
                var tid = $($this).eq(i).attr('id');
                $('#frmStoreInformation').find('.upload').addClass('edituploder')
                $('#frmStoreInformation').find('.upload img').eq(i).attr('src', newsrc).attr('Tid', tid)
            }
            $('#sto-submit').attr('Data-id', $(this).attr('data-id'));
            $('#sto-submit').attr('class', 'editimg')
            $('#txtBack').addClass('pub-sto-Back');
            $('#sto-submit').val('Save')
            if (storepictureid) {
                $('#sto-submit').button("refresh");
            }
            storepictureid = 1;
            $.mobile.navigate('#dvStoreInformation');
        }

        else if (screenname == "discount") {
            var Information = $(this).parent().parent().parent().parent().parent().find('#dis-information').html();
            var Price = $(this).parent().parent().parent().parent().find('#dis-ProductPrice').html();
            var discount = $(this).parent().parent().parent().parent().find('#dis-Discount').html();
            var $this = $(this).parent().parent().parent().parent().prev().prev().find('img');
            var imglength = $this.length;
            $('#dvProductDiscount').addClass('$back');
            $('#txtProductInformation').val(Information);
            $('#txtPrice').val(Price);
            $('#Text2').val(discount);
            for (var i = 0; i < imglength; i++) {
                var newsrc = $($this).eq(i).attr('src');
                var tid = $($this).eq(i).attr('id');
                $('#frmProductDiscount').find('.upload').addClass('edituploder')
                $('#frmProductDiscount').find('.upload img').eq(i).attr('src', newsrc).attr('Tid', tid)
            }
            $('#dis-submit').attr('Data-id', $(this).attr('data-id'));
            $('#dis-submit').attr('class', 'editimg')
            $('#txtBack2').addClass('pub-dis-Back');
            $('#dis-submit').val('Save')
            if (discountpictureid) {
                $('#dis-submit').button("refresh");
            }
            discountpictureid = 1;
            $.mobile.navigate('#dvProductDiscount');

        }

        else if (screenname == "Promotion") {

            var information = $(this).parent().parent().parent().parent().parent().find('#pp-information').html();
            var price = $(this).parent().parent().parent().parent().find('#spnProductPrice').html();
            var discount = $(this).parent().parent().parent().parent().find('#spnDiscount').html();
            var duration = $(this).parent().parent().parent().parent().find(this).attr('expiry-date');
            var $this = $(this).parent().parent().parent().parent().prev().prev().find('img');
            var imglength = $this.length;
            $('#dvProductforShortDuration').addClass('$back');
            $('#txtProductDurationInformation').val(information);
            $('#txtProductDurationPrice').val(price);
            $('#txtProductDurationdiscount').val(discount);
            $('#sltDuration').val(duration);
            for (var i = 0; i < imglength; i++) {
                var newsrc = $($this).eq(i).attr('src');
                var tid = $($this).eq(i).attr('id');
                $('#frmProductDuration').find('.upload').addClass('edituploder')
                $('#frmProductDuration').find('.upload img').eq(i).attr('src', newsrc).attr('Tid', tid)
            }
            $('#btn-promotion').attr('Data-id', $(this).attr('data-id'));
            $('#btn-promotion').attr('class', 'editimg')
            $('#Publish').addClass('pub-pro-Back');
            $('#btn-promotion').val('Save');
            if (promotionpictureid) {
                $('#btn-promotion').button("refresh");
            }
            promotionpictureid = 1;
            $.mobile.navigate('#dvProductforShortDuration');
        }
        else {          
            var Information = $(this).parent().parent().parent().parent().parent().find('#gift-information').html();
            var Price = $(this).parent().parent().parent().parent().find('#gift-ProductPrice').html();
            var discount = $(this).parent().parent().parent().parent().find('#gift-GifPoint').html();
            var $this = $(this).parent().parent().parent().parent().prev().prev().find('img');
            var imglength = $this.length;
            $('#dvGiftPoint').addClass('$back');
            $('#txtProductGiftInformation').val(Information);
            $('#txtProductGiftPrice').val(Price);
            $('#txtProductGiftPoint').val(discount);

            for (var i = 0; i < imglength; i++) {
                var newsrc = $($this).eq(i).attr('src');
                var tid = $($this).eq(i).attr('id');
                $('#frmGiftPoint').find('.upload').addClass('edituploder')
                $('#frmGiftPoint').find('.upload img').eq(i).attr('src', newsrc).attr('Tid', tid)
            }
            $('#gift-submit').attr('Data-id', $(this).attr('data-id'));
            $('#gift-submit').attr('class', 'editimg')
            $('#txtBack4').addClass('pub-gift-Back');
            $('#gift-submit').val('Save')
            if (giftpictureid) {
                $('#gift-submit').button("refresh");
            }
            giftpictureid = 1;
            $.mobile.navigate('#dvGiftPoint');
        }
   
     
    });

    /**************************************************************************************/

    /********************* Reset control *************************/
    $.fn.ResetImageUpload = function () {
        $('img.clsImage').attr('src', 'css/images/camra.jpg');
        imageDataObject = '';

    }


    // slider
    $.fn.slider = function () {
        $(".rslides").responsiveSlides({
            auto: false,
            pager: false,
            nav: true,
            speed: 300,
            namespace: "callbacks",
            before: function () {
                $('.events').append("<li>before event fired.</li>");
            },
            after: function () {
                $('.events').append("<li>after event fired.</li>");
            }
        });
    }

    /*************** Check Publish Pin ***********************/
    $('.Publish_screen').click(function () {

        if (objlocalStorage.Publish_Pin != null && objlocalStorage.Publish_Pin != undefined && $navTo != "#dvViewPublishedInfo" && objlocalStorage.Publish_Pin != "") {
            $.mobile.navigate('#dvPublishPin');
        }
        else {
            $.mobile.navigate('#dvPublishInfo');
        }

    });

    /********************************************************/

    /**************************Submit Edit Image****************************/

    $(document).on('click', '.edituploder  img', function () {
        pictureid = $(this).attr('tid');
        $(this).closest('.edituploder').removeClass('edituploder');
    });

    /***********************************************************************/

    /***************************Back button on Image Edit *****************************/

    $(document).on('click', '.pub-pro-Back', function () {
       pictureid = 0;
        $('#txtProductDurationInformation').val('');
        $('#txtProductDurationPrice').val('');
        $('#txtProductDurationdiscount').val('');
        $('#sltDuration').val('');
        $('#btn-promotion').val('Publish');
        $('#btn-promotion').button("refresh");
        $('#btn-promotion').removeClass('editimg');       
        $('#Publish').removeClass('pub-pro-Back');
       
    });

    $(document).on('click', '.pub-sto-Back', function () {
        pictureid = 0;
        $('#txtStoreInformation').val('');      
        $('#sto-submit').val('Publish');
        $('#sto-submit').button("refresh");
        $('#sto-submit').removeClass('editimg');
        $('#txtBack').removeClass('pub-sto-Back');
    });

    $(document).on('click', '.pub-dis-Back', function () {
        pictureid = 0;
        $('#txtProductInformation').val('');
        $('#txtPrice').val('');
        $('#Text2').val('');
        $('#dis-submit').val('Publish');
        $('#dis-submit').button("refresh");
        $('#dis-submit').removeClass('editimg');
        $('#txtBack2').removeClass('pub-dis-Back')

    });

    $(document).on('click', '.pub-gift-Back', function () {
        pictureid = 0;
        $('#txtProductGiftInformation').val('');
        $('#txtProductGiftPrice').val('');
        $('#txtProductGiftPoint').val('');
        $('#gift-submit').val('Publish');
        $('#gift-submit').button("refresh");
        $('#gift-submit').removeClass('editimg');
        $('#txtBack4').removeClass('pub-gift-Back');
    });

    /********************************************************************************/

    /************************** Already screen Button text ****************************/
    $('#txtStoreInformation1').click(function () {
        storepictureid = 1;
    });
    
    $('#txtProductDiscount').click(function () {
        discountpictureid = 1;
    });

    $('#txtLastMinutesSale').click(function () {
        promotionpictureid = 1;
    });

    $('#txtInShopGift').click(function () {
        giftpictureid = 1;
    });

    /**********************************************************************************/
})(jQuery)