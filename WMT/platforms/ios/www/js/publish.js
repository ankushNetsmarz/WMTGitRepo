
(function ($) {


    /* Apply active class on selected menu */
    var $navTo = "", membershipDiscount = "", imagePath = "http://weexcel.biz/"
    $(document).on('click', '.clsPublisNav', function () {
        $navTo = $(this).attr('navigateTo');

        $('.publishPusinessinfo li').removeClass('current');
        $(this).parent('li').addClass('current');


        /* check if store has published pin then show publish screen*/
        if (objlocalStorage.Publish_Pin != null && objlocalStorage.Publish_Pin != undefined && $navTo != "#dvViewPublishedInfo" && objlocalStorage.Publish_Pin != "") {
            $.mobile.navigate('#dvPublishPin');
        }
        else {
            if ($navTo == "#dvMemberShipDiscount") {
                membership.getMemberShipdiscount();
                $.mobile.navigate($navTo);
            }
            else if ($navTo == "#dvViewPublishedInfo") {
                $.fn.getPublishedInfo();
                $.mobile.navigate($navTo);
            }
            else {
                $.mobile.navigate($navTo);
            }
        }

    });


    /* Picture event from camera */

    $(document).on('click', '#btnPickImageCamera', function () {
        capturePhotoCamera();
        $('#cancelUpload').trigger('click');
    });
    $(document).on('click', '#btnPickImageGallery', function () {

    });


    /* validate publish pin */

    $(document).on('submit', '#frmPublishPin', function () {
        var publishedPin = $.trim($('#txtPublishedPassword').val());

        var ajaxcallobj = {
            url: "http://weexcel.biz/zend_webservice/public/index.php/user/validatepublishpin",
            data: {
                store_id: objlocalStorage.Store_ID, published_pin: publishedPin
            }
        }
        WMT.jqXHR(ajaxcallobj, function (response) {
            if (response.success > 0) {
                $('#frmPublishPin')[0].reset();
                $.mobile.navigate($navTo);
                if ($navTo == "#dvMemberShipDiscount") {
                    membership.getMemberShipdiscount();
                }
            }
            else {
                $.dynamic_popup(' <p>Invalid Publish Password.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
            }
        });

    });

    /* Get membership discount */

    membership.getMemberShipdiscount = function () {
        if (membershipDiscount != '') {
            $('#txtMembershipdiscount').val(membershipDiscount);
        }
        else {
            var ajaxcallobj = {
                url: "http://weexcel.biz/zend_webservice/public/index.php/user/getmembershipdiscount",
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

    /* Publish store information */

    $(document).on('submit', '#frmStoreInformation', function () {
                  
        if (imageDataObject!='') {
                   
            var info = $.trim($('#txtStoreInformation').val());
            if (info.length <= 4000) {
                var ajaxcallobj = {
                    HttpVerb: "POST",
                    url: "http://weexcel.biz/zend_webservice/public/index.php/user/storepicturesinformation",
                    data: { store_id: objlocalStorage.Store_ID, store_info: info, upload_pic: imageDataObject }
                }

                WMT.jqXHR(ajaxcallobj, function (response) {
                    if (response.success > 0) {
                        $('#frmStoreInformation')[0].reset(); $.fn.ResetImageUpload();
                        $.dynamicSuccess_popup('<p>Store infromation published succesfully.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                    }
                    else {
                        $.dynamic_popup('<p>You can upload only 5 picture.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                    }
                });
            }
            else {
                $.dynamic_popup(' <p>Product information should only contain max 4000 words.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
            }
        }
        else {

            $.dynamic_popup('<p>Image can not be blank.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');

        }

    });

    /* Publish membership information */

    $(document).on('submit', '#frmMembershipDiscount', function () {
        var discount = $.trim($('#txtMembershipdiscount').val());
        var ajaxcallobj = {
            HttpVerb: "POST",
            url: "http://weexcel.biz/zend_webservice/public/index.php/user/membershipdiscount",
            data: { store_id: objlocalStorage.Store_ID, discount: discount }
        }

        WMT.jqXHR(ajaxcallobj, function (response) {
            if (response.success > 0) {
                membershipDiscount = discount;
                $.dynamicSuccess_popup('<p>Membership discount published succesfully.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
            }
        });

    });


    /* Publish product discount information */

    $(document).on('submit', '#frmProductDiscount', function () {
        if (imageDataObject!='') {
            var Price = $.trim($('#txtPrice').val());
            var discount = $.trim($('#txtdiscount').val());
            var info = $.trim($('#txtProductInformation').val());
            if (info.length <= 4000) {
                var ajaxcallobj = {
                    HttpVerb: "POST",
                    url: "http://weexcel.biz/zend_webservice/public/index.php/user/discountproduct",
                    data: { store_id: objlocalStorage.Store_ID, discount: discount, information: info, original_price: Price, upload_pic: imageDataObject }
                }

                WMT.jqXHR(ajaxcallobj, function (response) {
                    if (response.success > 0) {
                        $('#frmProductDiscount')[0].reset(); $.fn.ResetImageUpload();
                        $.dynamicSuccess_popup('<p>Product detail published succesfully.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                    }
                    else {
                        $.dynamic_popup('<p>You can upload only 5 picture.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                    }
                });
            } else {
                $.dynamic_popup(' <p>Product information should only contain max 4000 words.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
            }
        }
        else {

            $.dynamic_popup('<p>Image can not be blank.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
        }

    });

    /* Publish product duration information */

    $(document).on('submit', '#frmProductDuration', function () {
        if (imageDataObject!='') {
            var Price = $.trim($('#txtProductDurationPrice').val());
            var discount = $.trim($('#txtProductDurationdiscount').val());
            var info = $.trim($('#txtProductDurationInformation').val());
            var days = $('#sltDuration').val();
            if (info.length <= 4000) {
                var ajaxcallobj = {
                    HttpVerb: "POST",
                    url: "http://weexcel.biz/zend_webservice/public/index.php/user/productpromotion",
                    data: { store_id: objlocalStorage.Store_ID, exp_day: days, discount: discount, promotion_information: info, price: Price, upload_pic: imageDataObject }
                }

                WMT.jqXHR(ajaxcallobj, function (response) {
                    if (response.success > 0) {
                        $('#frmProductDuration')[0].reset(); $.fn.ResetImageUpload();
                        $.dynamicSuccess_popup('<p>Product detail published succesfully.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                    }
                    else {
                        $.dynamic_popup('<p>You can upload only 5 picture.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                    }
                });
            }
            else {
                $.dynamic_popup(' <p>Product information should only contain max 4000 words.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
            }
        }
        else {

            $.dynamic_popup('<p>Image can not be blank.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
        }
    });

    /* Publish product gift point information */

    $(document).on('submit', '#frmGiftPoint', function () {
        if (imageDataObject!='') {
            var Price = $.trim($('#txtProductGiftPrice').val());
            var giftPoint = $.trim($('#txtProductGiftPoint').val());
            var info = $.trim($('#txtProductGiftInformation').val());
            if (info.length <= 4000) {
                var ajaxcallobj = {
                    HttpVerb: "POST",
                    url: "http://weexcel.biz/zend_webservice/public/index.php/user/giftpoint",
                    data: { store_id: objlocalStorage.Store_ID, gift_point: giftPoint, gift_info: info, gift_price: Price, gift_upload_pic: imageDataObject }
                }

                WMT.jqXHR(ajaxcallobj, function (response) {
                    if (response.success > 0) {
                        $('#frmGiftPoint')[0].reset();
                        $.fn.ResetImageUpload();
                        $.dynamicSuccess_popup('<p>Product detail published succesfully.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                    }
                    else {
                        $.dynamic_popup('<p>You can upload only 5 picture.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                    }
                });
            } else {
                $.dynamic_popup(' <p>Product information should only contain max 4000 words.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
            }
        }
        else {

            $.dynamic_popup('<p>Image can not be blank.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
        }

    });


    /* Get published product informatio */
    $.fn.getPublishedInfo = function () {
        var ajaxcallobj = {
            HttpVerb: "GET",
            url: "http://weexcel.biz/zend_webservice/public/index.php/user/getallproductstoreinfo",
            data: { store_id: objlocalStorage.Store_ID }
        }

        WMT.jqXHR(ajaxcallobj, function (response) {
            var html = "";
            console.log(response.StorePicture);
            if (response.StorePicture.length > 0) {
                for (var i = 0; i < response.StorePicture.length; i++) {
                    html += '<div class="points-main"><p></p><div class="uploder"><div class="view-published"><img alt="" height="145" width="265" src="' + response.StorePicture[i].productImagePath + '" id="imgPublishedImage"></div></div>'
                     + '<div class="view-txt"><p><span id="ProductInfroduction"> ' + response.StorePicture[i].introduction + '</span></p></div>'
                     + '<div class="ui-btn ui-input-btn ui-btn-b ui-corner-all ui-shadow ui-btn-inline">Delete<input type="button" name="Help" value="Delete" class="btn-download btnDelete" data-id="' + response.StorePicture[i].ID + '" data-type="storepicture" data-inline="true" data-theme="b"></div>'
                     + '<div class="ui-btn ui-input-btn ui-btn-b ui-corner-all ui-shadow ui-btn-inline">Modify<input type="button" name="Help" value="Edit" class="btn-download btnEdit" data-inline="true" data-theme="b"></div></div></div></div></div>';
                }
            }
            if (response.ProductDiscount.length > 0) {
                for (var i = 0; i < response.ProductDiscount.length; i++) {
                    html += '<div class="points-main"><p></p><div class="uploder"><div class="view-published"><img alt="" height="145" width="265" src="' + response.ProductDiscount[i].productImagePath + '" id="imgPublishedImage"></div></div>'
                    + '<div class="view-txt"><p><span id="ProductInfroduction"> ' + response.ProductDiscount[i].introduction + '</span></p></div><div class="price-yaun"><div class="price-yaun-left"><p>Price: <span id="spnProductPrice">' + response.ProductDiscount[i].price + '</span> Yuan</p></div>'
                    + '<div class="price-yaun-left"><p>Discount: <span id="spnDiscount">' + response.ProductDiscount[i].discount + '</span> %</p></div><p class="price-yaun-left">Status: Active / Finished</p>'
                    + '<div class="price-yaun-left"><div class="help-btn-publish">'
                    + '<div class="ui-btn ui-input-btn ui-btn-b ui-corner-all ui-shadow ui-btn-inline">Delete<input type="button" name="Help" value="Delete" class="btn-download btnDelete" data-id="' + response.ProductDiscount[i].ID + '" data-type="productdiscount" data-inline="true" data-theme="b"></div>'
                    + '<div class="ui-btn ui-input-btn ui-btn-b ui-corner-all ui-shadow ui-btn-inline">Modify<input type="button" name="Help" value="Edit" class="btn-download btnEdit" data-inline="true" data-theme="b"></div></div></div></div></div>';
                }
            }
            if (response.ProductPromotion.length > 0) {
                for (var i = 0; i < response.ProductPromotion.length; i++) {
                    html += '<div class="points-main"><p></p><div class="uploder"><div class="view-published"><img alt="" height="145" width="265" src="' + response.ProductPromotion[i].productImagePath + '" id="imgPublishedImage"></div></div>'
                   + '<div class="view-txt"><p><span id="ProductInfroduction">' + response.ProductPromotion[i].introduction + '</span></p></div><div class="price-yaun"><div class="price-yaun-left"><p>Price: <span id="spnProductPrice">' + response.ProductPromotion[i].price + '</span> Yuan</p></div>'
                   + '<div class="price-yaun-left"><p>Discount: <span id="spnDiscount">' + response.ProductPromotion[i].discount + '</span> %</p></div><p class="price-yaun-left">Status: Active / Finished</p>'
                   + '<div class="price-yaun-left"><div class="help-btn-publish">'
                   + '<div class="ui-btn ui-input-btn ui-btn-b ui-corner-all ui-shadow ui-btn-inline">Delete<input type="button" name="Help" value="Delete" class="btn-download btnDelete" data-inline="true" data-id="' + response.ProductPromotion[i].ID + '" data-type="productpromotion" data-theme="b"></div>'
                   + '<div class="ui-btn ui-input-btn ui-btn-b ui-corner-all ui-shadow ui-btn-inline">Modify<input type="button" name="Help" value="Edit" class="btn-download btnEdit" data-inline="true" data-theme="b"></div></div></div></div></div>';
                }
            }
            if (response.GiftPoint.length > 0) {
                for (var i = 0; i < response.GiftPoint.length; i++) {
                    html += '<div class="points-main"><p></p><div class="uploder"><div class="view-published"><img alt="" height="145" width="265" src="' + response.GiftPoint[i].productImagePath + '" id="imgPublishedImage"></div></div>'
                    + '<div class="view-txt"><p><span id="ProductInfroduction">' + response.GiftPoint[i].introduction + '</span></p></div><div class="price-yaun"><div class="price-yaun-left"><p>Price: <span id="spnProductPrice">' + response.GiftPoint[i].price + '</span> Yuan</p></div>'
                    + '<div class="price-yaun-left"><p>Gift Point: <span id="spnDiscount">' + response.GiftPoint[i].giftPoint + '</span></p></div><p class="price-yaun-left">Status: Active / Finished</p>'
                    + '<div class="price-yaun-left"><div class="help-btn-publish">'
                    + '<div class="ui-btn ui-input-btn ui-btn-b ui-corner-all ui-shadow ui-btn-inline">Delete<input type="button" name="Help" value="Delete" class="btn-download btnDelete" data-inline="true" data-id="' + response.GiftPoint[i].ID + '" data-type="giftpoint" data-theme="b"></div>'
                    + '<div class="ui-btn ui-input-btn ui-btn-b ui-corner-all ui-shadow ui-btn-inline">Modify<input type="button" name="Help" value="Edit" class="btn-download btnEdit" data-inline="true" data-theme="b"></div></div></div></div></div>';
                }
            }
            if (html != '') {
                $('#dvPublishedProduct').html(html);
            }
            else {
                $('#dvPublishedProduct').html('<p>No record found!');
            }
        });
    }

    /* delete published picture */
    $(document).on('click', '.btnDelete', function () {
        var $this = $(this);
        var type = $(this).attr('data-type');
        var id = $(this).attr('data-id');       
        var ajaxcallobj = {
            HttpVerb: "POST",
            url: "http://weexcel.biz/zend_webservice/public/index.php/user/deletepublishedproduct",
            data: { store_id: objlocalStorage.Store_ID, type: type, id: id }
        }

        WMT.jqXHR(ajaxcallobj, function (response) {
            if (response.success > 0) {
                $.dynamicSuccess_popup('<p>Product deleted succesfully.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                $this.parent().closest('div.points-main').remove();
            }
        });

    });

    $.fn.ResetImageUpload = function () {
        $('img.clsImage').attr('src', 'css/images/camra.jpg');
 imageDataObject='';

    }

})(jQuery)