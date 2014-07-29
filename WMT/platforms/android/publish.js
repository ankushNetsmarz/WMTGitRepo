
(function ($) {


    /* Apply active class on selected menu */
    var $navTo = "", membershipDiscount = "", imagePath = "http://weexcel.biz/";
    var PID = 0, counter = 1;


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
        }
        PID = 0, counter = 1;
        $('.clrPublishedInfo').val('');
    });


    /************************* Picture event from camera *****************/
    var $thisImage;
    $(document).on('click', '.uploadImage', function () {
        $thisImage = $(this).children('img');
    });
    $(document).on('click', '#btnPickImageCamera', function () {
        capturePhotoCamera();
                   setTimeout(function()
                              {
                              $thisImage.attr('src', "data:image/jpeg;base64," + imageDataObject);
                              imageDataObject='';
                              $('#cancelUpload').trigger('click');
                              },2000);
      

    });
    $(document).on('click', '#btnPickImageGallery', function () {
                   capturePhotoLibrary();
                   
                   setTimeout(function()
                              {
                              $thisImage.attr('src', "data:image/jpeg;base64," + imageDataObject);
                              imageDataObject='';
                              $('#cancelUpload').trigger('click');
                              },2000);
//                   
//                   $thisImage.attr('src', "data:image/jpeg;base64," + imageDataObject);
//                   imageDataObject='';
//                   $('#cancelUpload').trigger('click');
    });


    /************************** validate publish pin *********************/

    $(document).on('submit', '#frmPublishPin', function () {
        var publishedPin = $.trim($('#txtPublishedPassword').val());

        var ajaxcallobj = {
            url: "validatepublishpin",
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
                $.dynamicSuccess_popup('<p>Membership discount published succesfully.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
            }
        });

    });


    /*************************** Publish product discount information **************************/

    $(document).on('submit', '#frmProductDiscount', function () {
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

    });

    /******************** Publish product duration information ******************************/

    $(document).on('submit', '#frmProductDuration', function () {
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
    });



    /************************* Publish product gift point information ******************************/

    $(document).on('submit', '#frmGiftPoint', function () {
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

    });


    /******************************** Get published product informatio ****************************/

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
                         + ' <div class="callbacks_container"> <ul class="rslides callbacks callbacks4" id="slider4 ">' + response.StorePicture[i].Images + '</ul></div>'
                         + '</div></div>'
                         + '<div class="view-txt"><p><span id="ProductInfroduction" class="clsShow"> ' + response.StorePicture[i].introduction + '</span>'
                         + '<textarea id="ProductInfroduction" class="textarea ui-input-text ui-shadow-inset ui-body-inherit ui-corner-all ui-textinput-autogrow clsHide">' + response.StorePicture[i].introduction + '</textarea></p></div>'
                         + '<div class="ui-btn ui-input-btn ui-btn-b ui-corner-all ui-shadow ui-btn-inline">Delete<input type="button" name="Help" value="Delete" class="btn-download btnDelete" data-id="' + response.StorePicture[i].PID + '" data-type="storepicture" data-inline="true" data-theme="b"></div>'
                         + '<div class="ui-btn ui-input-btn ui-btn-b ui-corner-all ui-shadow ui-btn-inline"><span>Modify</span><input type="button" name="Help" value="Edit" class="btn-download btnEdit" data-type="storepicture" data-id="' + response.StorePicture[i].PID + '" data-inline="true" data-theme="b"></div></div></div></div></div>';
                }
            }
            if (response.ProductDiscount.length > 0) {
                 
                for (var i = 0; i < response.ProductDiscount.length; i++) {
                    html += '<div class="points-main"><p></p><div class="uploder"><div class="view-published">'
                         + ' <div class="callbacks_container"> <ul class="rslides callbacks callbacks4" id="slider4 ">' + response.ProductDiscount[i].Images + '</ul></div>'
                         + '</div></div>'
                         + '<div class="view-txt"><p><span id="ProductInfroduction"> ' + response.ProductDiscount[i].introduction + '</span>'
                         + '<textarea id="ProductInfroduction" class="textarea ui-input-text ui-shadow-inset ui-body-inherit ui-corner-all ui-textinput-autogrow clsHide">' + response.ProductDiscount[i].introduction + '</textarea></p></div>'

                         + '<div class="price-yaun"><div class="price-yaun-left"><p>Price: <span id="spnProductPrice" class="clsShow">' + response.ProductDiscount[i].price + '</span>'
                         + '<input type="text" id="ProductPrice" class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset clsHide" value="' + response.ProductDiscount[i].price + '" /><span class="currencyName">Yuan</span></p></div>'

                         + '<div class="price-yaun-left"><p>Discount: <span id="spnDiscount" class="clsShow">' + response.ProductDiscount[i].discount + '</span>'
                         + '<input type="text" id="ProductDiscount" class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset clsHide" value="' + response.ProductDiscount[i].discount + '" /><span class="currencyName">%</span></p></div>'
                         + '<p class="price-yaun-left price-yaun-status">Status: Active / Finished</p>'

                         + '<div class="price-yaun-left"><div class="help-btn-publish">'
                         + '<div class="ui-btn ui-input-btn ui-btn-b ui-corner-all ui-shadow ui-btn-inline">Delete<input type="button" name="Help" value="Delete" class="btn-download btnDelete" data-id="' + response.ProductDiscount[i].PID + '" data-type="productdiscount" data-inline="true" data-theme="b"></div>'
                         + '<div class="ui-btn ui-input-btn ui-btn-b ui-corner-all ui-shadow ui-btn-inline"><span>Modify</span><input type="button" name="Help" value="Edit" class="btn-download btnEdit" data-type="productdiscount" data-id="' + response.ProductDiscount[i].PID + '" data-inline="true" data-theme="b"></div></div></div></div></div>';
                }
            }
            if (response.ProductPromotion.length > 0) {
                 
                for (var i = 0; i < response.ProductPromotion.length; i++) {
                    html += '<div class="points-main"><p></p><div class="uploder"><div class="view-published">'
                         + ' <div class="callbacks_container"> <ul class="rslides callbacks callbacks4" id="slider4 ">' + response.ProductPromotion[i].Images + '</ul></div>'
                         + '</div></div>'
                         + '<div class="view-txt"><p><span id="ProductInfroduction" class="clsShow"> ' + response.ProductPromotion[i].introduction + '</span>'
                         + '<textarea id="ProductInfroduction" class="textarea ui-input-text ui-shadow-inset ui-body-inherit ui-corner-all ui-textinput-autogrow clsHide">' + response.ProductPromotion[i].introduction + '</textarea></p></div>'

                         + '<div class="price-yaun"><div class="price-yaun-left"><p>Price: <span id="spnProductPrice" class="clsShow">' + response.ProductPromotion[i].price + '</span>'
                         + '<input type="text" id="ProductPrice" class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset clsHide" value="' + response.ProductPromotion[i].price + '" /><span class="currencyName">Yuan</span></p></div>'

                         + '<div class="price-yaun-left"><p>Discount: <span id="spnDiscount" class="clsShow">' + response.ProductPromotion[i].discount + '</span>'
                         + '<input type="text" id="ProductDiscount" class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset clsHide" value="' + response.ProductPromotion[i].discount + '" /><span class="currencyName">%</span></p></div>'
                         + '<p class="price-yaun-left price-yaun-status">Status: Active / Finished</p>'

                         + '<div class="price-yaun-left"><div class="help-btn-publish">'
                         + '<div class="ui-btn ui-input-btn ui-btn-b ui-corner-all ui-shadow ui-btn-inline">Delete<input type="button" name="Help" value="Delete" class="btn-download btnDelete" data-id="' + response.ProductPromotion[i].PID + '" data-type="productproduction" data-inline="true" data-theme="b"></div>'
                         + '<div class="ui-btn ui-input-btn ui-btn-b ui-corner-all ui-shadow ui-btn-inline"><span>Modify</span><input type="button" name="Help" value="Edit" class="btn-download btnEdit" data-type="productproduction" data-id="' + response.ProductPromotion[i].PID + '" data-inline="true" data-theme="b"></div></div></div></div></div>';
                }
            }
            if (response.GiftPoint.length > 0) {
                  
                for (var i = 0; i < response.GiftPoint.length; i++) {
                    html += '<div class="points-main"><p></p><div class="uploder"><div class="view-published">'
                         + ' <div class="callbacks_container"> <ul class="rslides callbacks callbacks4" id="slider4 ">' + response.GiftPoint[i].Images + '</ul></div>'
                         + '</div></div>'

                         + '<div class="view-txt"><p><span id="ProductInfroduction" class="clsShow"> ' + response.GiftPoint[i].introduction + '</span>'
                         + '<textarea id="ProductInfroduction" class="textarea ui-input-text ui-shadow-inset ui-body-inherit ui-corner-all ui-textinput-autogrow clsHide">' + response.GiftPoint[i].introduction + '</textarea></p></div>'

                         + '<div class="price-yaun"><div class="price-yaun-left"><p>Price: <span id="spnProductPrice" class="clsShow">' + response.GiftPoint[i].price + '</span>'
                         + '<input type="text" id="ProductPrice" class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset clsHide" value="' + response.GiftPoint[i].price + '" /><span class="currencyName">Yuan</span></p></div>'

                         + '<div class="price-yaun-left"><p>Gift Point: <span id="spnGifPoint" class="clsShow">' + response.GiftPoint[i].giftPoint + '</span>'
                         + '<input type="text" id="ProductGifPoint" class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset clsHide" value="' + response.GiftPoint[i].giftPoint + '" /></p></div>'
                         + '<p class="price-yaun-left price-yaun-status">Status: Active / Finished</p>'

                         + '<div class="price-yaun-left"><div class="help-btn-publish">'
                         + '<div class="ui-btn ui-input-btn ui-btn-b ui-corner-all ui-shadow ui-btn-inline">Delete<input type="button" name="Help" value="Delete" class="btn-download btnDelete" data-id="' + response.GiftPoint[i].PID + '" data-type="giftpoint" data-inline="true" data-theme="b"></div>'
                         + '<div class="ui-btn ui-input-btn ui-btn-b ui-corner-all ui-shadow ui-btn-inline"><span>Modify</span><input type="button" name="Help" value="Edit" class="btn-download btnEdit" data-type="giftpoint" data-id="' + response.GiftPoint[i].PID + '" data-inline="true" data-theme="b"></div></div></div></div></div>';
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




    /********************* Edit published picutuer information *****************************/

    $(document).on('click', '.btnEdit', function () {
        var $this = $(this);
        var type = $this.attr('data-type');
        switchToSpan($this);
        setTimeout(function () {
            switchToInputs($this);
        }, 300);

    });
    var switchToSpan = function (obj) {
        $('div#dvPublishedProduct').find('span.clsHide').removeClass('clsHide').addClass('clsShow');
        $('div#dvPublishedProduct').find('textarea.clsShow').removeClass('clsShow').addClass('clsHide');

        $('div#dvPublishedProduct').find('input.clsShow').removeClass('clsShow').addClass('clsHide');


        $('div#dvPublishedProduct').find('div.ui-btn-inline').find('span').html('Modify');
        $('div#dvPublishedProduct').find('input[type=button]').removeClass('btnUpdate').addClass('btnEdit');
    }

    var switchToInputs = function (obj) {
        obj.parents('div.points-main').find('span.clsShow').removeClass('clsShow').addClass('clsHide');
        obj.parents('div.points-main').find('textarea.clsHide').removeClass('clsHide').addClass('clsShow');

        obj.parents('div.points-main').find('input.clsHide').removeClass('clsHide').addClass('clsShow');

        obj.parent('div.ui-btn-inline').find('span').html('Save');
        obj.parent('div.ui-btn-inline').find('input[type=button]').removeClass('btnEdit').addClass('btnUpdate');
    }





    /******************************* Update publishd information *************************************/
    var $this;
    $(document).on('click', '.btnUpdate', function () {
        $this = $(this);
        var type = $(this).attr('data-type');
        var info = $(this).parents('div.points-main').find('textarea#ProductInfroduction').val();
        var price = $(this).parents('div.points-main').find('input#ProductPrice').val();
        var discount = $(this).parents('div.points-main').find('input#ProductDiscount').val();
        var giftPoint = $(this).parents('div.points-main').find('input#ProductGifPoint').val();
        var PID = $(this).attr('data-id');
        console.log(type, info, price, discount, giftPoint, PID, $this);
        updatePublishedInformation(type, info, price, discount, giftPoint, PID, $this);


    });
    var updatePublishedInformation = function (type, info, price, discount, giftPoint, PID, $this) {
        var ajaxcallobj = {
            HttpVerb: "POST",
            url: "modifyproduct",
            data: { store_id: objlocalStorage.Store_ID, p_id: PID, gift_point: giftPoint, info: info, discount: discount, price: price, type: type }
        }

        WMT.jqXHR(ajaxcallobj, function (response) {
            if (response.success > 0) {
                $this.parents('div.points-main').find('span#ProductInfroduction').html(info);
                $this.parents('div.points-main').find('span#spnProductPrice').html(price);
                $this.parents('div.points-main').find('span#spnDiscount').html(discount);
                $this.parents('div.points-main').find('span#spnGifPoint').html(giftPoint);
                switchToSpan($this);
                $.dynamicSuccess_popup('<p>Product detail Updated succesfully.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
            }
            else {
                $.dynamic_popup('<p>Error.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
            }
        });

    }



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
})(jQuery)