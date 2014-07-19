
var paramType = "";
var IndustriesIds = "";
(function ($) {

    /* Get My Store Data*/
    $('#dvStore').on('pageshow', function () {
        objlocalStorage = JSON.parse(localStorage.getItem("LocalStorageObj"));
        if (objlocalStorage != null) {
            myStore.getStoredata();
        }
    });

    myStore.getStoredata = function () {
        var ajaxcallobj = { HttpVerb: "GET", url: "editstoreinfo", data: { store_id: objlocalStorage.Store_ID } }

        WMT.jqXHR(ajaxcallobj, function (response) { binddata(response); });

        var binddata = function (obj) {
            resetControl();
            var industries = obj[0].industries.split(',');

            console.log(industries);
            $('#storename').html(obj[0].StoreName);
            $('#storeaddresss').html(obj[0].Address);
            if (obj[0].Address2 != '' && obj[0].Address2 != undefined) {
                $('#dvAddressOption').show();
                $('#storeaddresss2').html(obj[0].Address2);
            }
            $('#storephone').html(obj[0].PhoneNumber);
            $('#storeownername').html(obj[0].OwnerName);
            $('#emailaddress').html(obj[0].EmailAddress);
            $('#sltIndustryEdit1').val(industries[0]).selectmenu('refresh', true);
            $('#sltIndustryEdit2').val(industries[1]).selectmenu('refresh', true);
            $('#sltIndustryEdit3').val(industries[2]).selectmenu('refresh', true);
            IndustriesIds = obj[0].industryIDs;
        }
    }

    var resetControl = function () {
        $('#dvMystoreInfo').find('div.dynamicInputs').remove(); $('.btnStoreChanges').css({ 'display': 'none' });
        $('.modify-btn').attr('value', '编辑').button("refresh").removeAttr('customattr');
    }

    /* Update Store Changes */
    $(document).on('submit', '#frmSaveStoreChanges', function () {        
        var currentControl = $(this).find('input[type=text]').val();       
        var type = $('#sltType').val();
        var ajaxcallobj = {
            url: "updatefield",
            data: { store_id: objlocalStorage.Store_ID, ParamType: paramType, value: currentControl, type: type }
        }


        WMT.jqXHR(ajaxcallobj, function (response) {
            if (response.success > 0) {
                resetControl();
                myStore.getStoredata();
                $.dynamicSuccess_popup('<p>信息已成功更新</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
            }
        });
    });

    /* Update Store industries */
    $(document).on('submit', '#frmUpdateIndustryChanges', function () {
        var Industrylevel1 = $('#sltIndustryEdit1').val();
        var Industrylevel2 = $('#sltIndustryEdit2').val();
        var Industrylevel3 = $('#sltIndustryEdit3').val();             
        var type = $('#sltType').val();
        var ajaxcallobj = {
            url: "updateindustries",
            data: { store_id: objlocalStorage.Store_ID, ParamType: paramType, Industrylevel1: Industrylevel1, Industrylevel2: Industrylevel2, Industrylevel3: Industrylevel3, IndustriesIds: IndustriesIds, type: type }
        }


        WMT.jqXHR(ajaxcallobj, function (response) {
            if (response.success > 0) {
                resetControl();
                myStore.getStoredata();
                $.dynamicSuccess_popup('<p>信息更新成功地</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
            }
        });
    });


    /* Modify button event */

    $('.modify-btn').on('click', function () {
        $('#dvMystoreInfo').find('div.dynamicInputs').remove();

        var $this = $(this).parents('.modyfy-button').prev('div');
        $('.modify-btn').attr('value', '编辑').button("refresh");


        if ($(this).attr('customattr') == "取消") {

            $('.btnStoreChanges').removeClass('clsStoreShow').addClass('clsStorHide');
            $(this).attr('value', '编辑').button("refresh");
            $(this).removeAttr('customattr');
            $this.find('div.dynamicInputs').remove();

        } else {          
            $('.modify-btn').removeAttr('customattr');
            if ($this.attr('id') == "storephone") {
                $('<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset dynamicInputs firstClass" ><input type="text" name="txtEditStore" class="secondClass" currentControl="' + $this.attr('id') + '" value="' + $this.html() + '" maxlength="15" /></div>').insertAfter($this);
            }
            else {
                $('<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset dynamicInputs firstClass" ><input type="text" name="txtEditStore" class="secondClass" currentControl="' + $this.attr('id') + '" value="' + $this.html() + '" /></div>').insertAfter($this);
            }
            $('.btnStoreChanges').removeClass('clsStorHide').addClass('clsStoreShow');
            $(this).attr('value', '取消').button("refresh");
            $(this).attr('customattr', '取消');
        }
        paramType = $this.attr('id');
    });
})(jQuery);
