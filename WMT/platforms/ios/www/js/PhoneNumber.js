/*********************************Save Phone Number**************************************/

$('#SavePhone').click(function () {
    if ($('#PhoneNumber').val() == '') {
        }
        else {
            memberselected = true;
            Phonenumber = $('#PhoneNumber').val();
            memberid=$('#Phonebtn').attr( 'memberid');
            var ajaxcallobj = {
                url: "addphonenumber",
                data: {
                    store_id: objlocalStorage.Store_ID,
                    member_id: memberid,
                    phonenumber: Phonenumber
                }
            }
            WMT.jqXHR(ajaxcallobj, function (response) {
                if (response != undefined && response != null) {
                    $('#PhoneNumber').val('');
                    $('#Membernumber').html(response.phonenumber);
                    $.mobile.navigate("#dvExchange");
                   

                }

            });

        }

 
});

/*******************************************************************************************************/

/******************************* Remove Alphabet. *******************************************************/

$('#PhoneNumber').bind('keyup', function () {
    $(this).val($(this).val().replace(/[a-z]/g, ''));
});

/*********************************************************************************************************/