
(function ($) {

    

    /* Apply active class on selected menu */
    var $navTo = "", membershipDiscount = "";
    $(document).on('click', '.clsPublisNav', function () {
        $navTo = $(this).attr('navigateTo');

        $('.publishPusinessinfo li').removeClass('current');
        $(this).parent('li').addClass('current');
                   
                  
        /* check if store has published pin then show publish screen*/
        if (objlocalStorage.Publish_Pin != null && objlocalStorage.Publish_Pin != undefined && $navTo != "#dvViewPublishedInfo" && objlocalStorage.Publish_Pin!="") {
            $.mobile.navigate('#dvPublishPin');
        }
        else {
            if ($navTo == "#dvMemberShipDiscount") {
                membership.getMemberShipdiscount();
            }
            $.mobile.navigate($navTo);
        }

    });

 
    /* Picture event from camera */
 
  $(document).on('click', '#btnPickImageCamera', function () {
                 capturePhotoCamera();
//                 setTimeout(function()
//                            {
//    $("#imageHolder1").attr('src',"http://www.hdnewpictures.com/wp-content/uploads/2014/06/Funny-1.jpg");
//                            },5000);
//               
//                 
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
        var info = $.trim($('#txtStoreInformation').val());
        if (info.length <= 1000) {
            var ajaxcallobj = {
                HttpVerb: "POST",
                url: "http://weexcel.biz/zend_webservice/public/index.php/user/storepicturesinformation",
                data: { store_id: objlocalStorage.Store_ID, store_info: info, upload_pic: "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" }
            }

            WMT.jqXHR(ajaxcallobj, function (response) {
                if (response.success > 0) {
                    $('#frmStoreInformation')[0].reset();
                    $.dynamicSuccess_popup('<p>Store infromation published succesfully.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                }
                else {
                    $.dynamic_popup('<p>You can upload only 5 picture.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
                }
            });
        }
        else {
            $.dynamic_popup(' <p>Product information should only contain 1000 words.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
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
        var Price = $.trim($('#txtPrice').val());
        var discount = $.trim($('#txtdiscount').val());
        var info = $.trim($('#txtProductInformation').val());
        var ajaxcallobj = {
            HttpVerb: "POST",
            url: "http://weexcel.biz/zend_webservice/public/index.php/user/discountproduct",
            data: { store_id: objlocalStorage.Store_ID, discount: discount, information: info, original_price: Price, upload_pic: "/9j/4AAQSkZJRgABAQAAAQABAAD/4QBYRXhpZgAATU0AKgAAAAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAUABQDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+0P4j/ts/s2+BfBHjbxNb/GX4aa1rHhXw9rupWnhmy8X6Pc6zqusaXZ3D2mhW+mwXbXz397qEcVh9nWHzopZD5ioEcr8VmviBwpl2X5hi459lNevg8LiKsMJTx1CVetXpQk4YaNKM3UdWpVUaXLy80ZP3krNqXOKV7r7/AOra9z5P/YW/ae07wF8OPEfwn/aq+JHhPwR8VfBniceISvjPxNYaTcax4a+LOmWXxR0q4tJNVltHvG0+78U6npd6sPmLYzWyWYIjjiLfFeHXF9LLcqxeScZZrgsvzrL8Z9a/27F06Mq+EzqjTzihODrODm6U8ZWo1LXVOUFDZJuYOyak7NPrpo9f6e7P0y8KfEXwN460aHxF4M8U6N4q0C5lngtta0C8TVdLuZbaQxXCW9/Z+dbTmCUNFKYpXCSq8bEOjAfreCzTL8yoLFZfjKGNw0pSjHEYaoq1GUoO01GpDmhLlekuVu0k09U0aXuflb+3j4Y+BHwJ+L/wI+N8OkeF/C3jL4j/ABFk8PfE5L7whpni3w149+Guk6VLq/i6bV/Ak+l6h/bfjnz49A0nwrq+iw2evyaxq9pHc3d3CFjX8a8SMHw5w5nnDnEMaGDwePzXNXhc3VTA0sbhMyymhRdfGuvlsqNX6xmPMsNRwdfDqniXXrQjOc46GU1GLUtm3r1uuunV9ut36nmXjL4ifCv9rj9qn4A/Cv4tfC/Wfhho3iWw8Q3XjL4TeOPBmmeE/iLrviPwzYnxH8K7zxJ4whsW1bXPhr4i8ORzW9noGhazZraeJbC60jVvOiht5H8nH5pk3G/GXDWTZ3k9fJ6GMpYqePyTMcBRwWa4nFYSn9byapi8dGm62IynFYVShTw2GxEOTF050K3MoxbltSnGLVr7prVvdXfbb56X3P2/0bRdH8OaVYaF4f0rTtD0XSrWGx0zSNJsrfTtN0+zt0EcFrZWNpHFbW1vCihI4YY0jRQAqgV/QmHw9DC0aWGw1Glh8PRhGnRoUKcaVKlTirRhTpwUYwjFKyjFJI32PLte+EHw/wDGPxf8OfE3xVoFv4g8VfDnw19i8Cy6t/pmn+F5/EGo3susazpOmTBrSDX7xNK062/thke8trW0jis5LffM0vj4nI8sx2eYXN8bho4rGZVhFDLpV/3lLByxVWq69ehSkuSOJqKhSj7dp1IRglTcLybVtb9f6/HzG/Fz4SeAfiC3hPxV4l0G2uPFnw18SaP4p8DeKbbFp4g8O6rZajbSMtlqUQ85tNv032+qaTcedpuoQOftFs00cE0RneSZZmjwWMxeGhLG5Ti6GNy7GQ9zE4WtTqxf7uqvedKorxrUZc1KrF+9ByUZRGk7NrVapns1e8M//9k=" }
        }

        WMT.jqXHR(ajaxcallobj, function (response) {
            if (response.success > 0) {
                $('#frmProductDiscount')[0].reset();
                $.dynamicSuccess_popup('<p>Product detail published succesfully.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
            }
            else {
                $.dynamic_popup('<p>You can upload only 5 picture.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
            }
        });


    });

    /* Publish product duration information */

    $(document).on('submit', '#frmProductDuration', function () {
        var Price = $.trim($('#txtProductDurationPrice').val());
        var discount = $.trim($('#txtProductDurationdiscount').val());
        var info = $.trim($('#txtProductDurationInformation').val());
        var days = $('#sltDuration').val();
        var ajaxcallobj = {
            HttpVerb: "POST",
            url: "http://weexcel.biz/zend_webservice/public/index.php/user/productpromotion",
            data: { store_id: objlocalStorage.Store_ID, exp_day: days, discount: discount, promotion_information: info, price: Price, upload_pic: "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" }
        }

        WMT.jqXHR(ajaxcallobj, function (response) {
            if (response.success > 0) {
                $('#frmProductDuration')[0].reset();
                $.dynamicSuccess_popup('<p>Product detail published succesfully.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
            }
            else {
                $.dynamic_popup('<p>You can upload only 5 picture.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
            }
        });
        
    });

    /* Publish product gift point information */

    $(document).on('submit', '#frmGiftPoint', function () {
        var Price = $.trim($('#txtProductGiftPrice').val());
        var giftPoint = $.trim($('#txtProductGiftPoint').val());
        var info = $.trim($('#txtProductGiftInformation').val());      
        var ajaxcallobj = {
            HttpVerb: "POST",
            url: "http://weexcel.biz/zend_webservice/public/index.php/user/giftpoint",
            data: { store_id: objlocalStorage.Store_ID, gift_point: giftPoint, gift_info: info, gift_price: Price, gift_upload_pic: "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" }
        }

        WMT.jqXHR(ajaxcallobj, function (response) {
            if (response.success > 0) {
                $('#frmGiftPoint')[0].reset();
                $.dynamicSuccess_popup('<p>Product detail published succesfully.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
            }
            else {
                $.dynamic_popup('<p>You can upload only 5 picture.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
            }
        });


    });

    $("#helpPopup-outside-page").enhanceWithin().popup();

})(jQuery)