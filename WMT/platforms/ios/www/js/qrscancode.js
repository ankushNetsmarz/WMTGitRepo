var memberselected = false;
var memberid = 0;
(function ($) {
 
 /*********************************** Scan Membership Card function. *************************************/
 QRScan.ScanMemberShipCard = function () {
 cordova.plugins.barcodeScanner.scan(
                                     function (result) {
                                     
                                     
                                     if(result.text.length>0)
                                     {
                                     GetPoints(result.text);
                                     }
                                     else
                                     
                                     {
                                         $.dynamicSuccess_popup(' <p>Scanning failed.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">OK</a>');
                                     
                                     }
                                     
                                     
                                     
                                     
                                     
                                     },
                                     function (error) {
                                         $.dynamicSuccess_popup(' <p>Scanning failed.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">OK</a>');
                                     }
                                     );
 }
 /* Load Local Picture function */
 QRScan.LoadPicture = function () {
 capturePhotoLibrary2();
 
 }
 
 /* Offline Scan function */
 QRScan.ScanOffline = function () {
 cordova.plugins.barcodeScanner.scan(
                                     function (result) {
                                     
                                     if(result.text.length>0)
                                     {
                                     GetPoints(result.text);
                                     }
                                     else
                                     
                                     {
                                         $.dynamicSuccess_popup(' <p>Scanning failed.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">OK</a>');
                                     
                                     }
                                     },
                                     function (error) {
                                         $.dynamicSuccess_popup(' <p>Scanning failed.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">OK</a>');
                                     }
                                     );
 }
 
 })(jQuery);


function GetDiscount() {
    var ajaxcallobj1 = {
    url: 'getmembershipdsicount',
    data: { store_id: objlocalStorage.Store_ID }
    }
    WMT.jqXHR(ajaxcallobj1, function (response) {
              if (response != undefined && response != null) {
              
              $('#dis_rte').html(' ' + response[0].Membership_discount);
              
              }
              });
}

/* Restricte to number */
$('#total_cost').bind('keyup', function () {
                      $(this).val($(this).val().replace(/[^0-9]/g, ''));
                      });
$('#total_cost').blur(function () {
                      var cost = $('#total_cost').val();
                      if ($('#chkMbr_dis').prop('checked')) {
                      
                      var discount = $('#dis_rte').html();
                      var netcost = cost - (cost * (discount / 100));
                      $('#net_cost').html('&nbsp  ' + Math.round(netcost));
                      }
                      else {
                      $('#net_cost').html('&nbsp  ' + Math.round(cost));
                      }
                      
                      
                      });
$('#chkMbr_dis').change(function () {
                        var cost = $('#total_cost').val();
                        if ($('#chkMbr_dis').prop('checked')) {
                        var discount = $('#dis_rte').html();
                        var netcost = cost - (cost * (discount / 100));
                        $('#net_cost').html('&nbsp  ' + Math.round(netcost));
                        }
                        else {
                        $('#net_cost').html('&nbsp  ' + Math.round(cost));
                        }
                        });
$('#enterduration').click(function (e) {
                          e.stopPropagation();
                          })
$('#sltDuration').click(function () {
                        $(this).datepicker("setDate", "10/12/2012");
                        });
$('.click_scan').click(function () {
                       GetScanData();
                       GetDiscount();
                       $.mobile.navigate('#dvQRCode')
                       });

function GetScanData() {
    
    /* fetch the Discount Rate. */
    var ajaxcalldiscount = {
    url: 'getmembershipdsicount',
    data: { store_id: objlocalStorage.Store_ID }
    }
    WMT.jqXHR(ajaxcalldiscount, function (response) {
              if (response != undefined && response != null) {
              
              $('#dis_rte').html(' ' + response[0].Membership_discount);
              
              }
              });
    
    /* Fetch the Good Exchange point. */
    var ajaxcallgoodobj = {
    url: 'inshopgift',
    data: { store_id: objlocalStorage.Store_ID }
    }
    WMT.jqXHR(ajaxcallgoodobj, function (response) {
              
              var pointhtml = '';
              if (response.length != 0) {
              if (response != undefined && response != null) {
              pointhtml += '<div class="div_mpnt"><div class="mpnt_lft"><div class="mgn_lft" id="txtGoodsExchange">Points -> Goods Exchange</div></div>'
              pointhtml += '<div  class="cus_clr"></div></div> '
              for (var i = 0 ; i < response.length; i++) {
              pointhtml += '<div class="div_pnt"><div class="pnt_lft"><div class="mgn_lft">' + response[i].giftPoint + ' Points for a ' + response[i].introduction + '</div>'
              pointhtml += '</div><div class="ptn_rgt"><div class="btn_exge Gift_Exchange" giftpoint=' + response[i].giftPoint + ' storeid=' + response[i].StoreID + ' ProductID=' + response[i].pID + ' > Exchange </div> </div> <div  class="cus_clr"></div> </div>'
              }
              
              }
              $('#point_div').html(pointhtml);
              }
              
              });
    
    /* fetch the Sale Discount. */
    var ajaxcallSaleobj = {
    url: 'lastminutesale',
    data: { store_id: objlocalStorage.Store_ID }
    }
    WMT.jqXHR(ajaxcallSaleobj, function (response) {
              
              var salehtml = "";
              if (response.length != 0) {
              if (response != undefined && response != null) {
              for (var i = 0 ; i < response.length; i++) {
              var item = response[i].Introduction.substring(0, 8) + '...'
              salehtml += '<div class="div_itmdis"><input  type="checkbox" style="margin-left:10px;"> </div><div class="Cus_dnt">Discount Item - ' + item + ' </div>'
              salehtml += ' <div class="cus_clr"></div>'
              }
              }
              $('#Discount_Item_1').html(salehtml);
              }
              });
    
    /* fetch the Product Discount.*/
    var ajaxcallproductobj = {
    url: 'productdiscountstore',
    data: { store_id: objlocalStorage.Store_ID }
    }
    WMT.jqXHR(ajaxcallproductobj, function (response) {
              var producthtml = "";
              if (response.length != 0) {
              if (response != undefined && response != null) {
              for (var i = 0 ; i < response.length; i++) {
              var item = response[i].Introduction.substring(0, 8) + '...'
              producthtml += ' <div class="div_itmdis"><input  type="checkbox" style="margin-left:10px;"> </div><div class="Cus_dnt">Discount Item - ' + item + ' </div>'
              producthtml += ' <div class="cus_clr"></div>'
              }
              }
              $('#Discount_Item_2').html(producthtml);
              }
              });
}

/*********************************Navigate to Gift Exchange Screen **************************************/

$(document).on('click', '.Gift_Exchange', function () {
               if (memberselected) {
               var point = $(this).attr('giftpoint');
               var StoreId = $(this).attr('storeid');
               var ProductID = $(this).attr('ProductID');
               var memberpoint = $('#wmt_pnt').html();
               if (parseInt(point) <= parseInt(memberpoint)) {
               $('#gift_point').html(point);
               var multiplier = $('#gift-multiplier').html();
               var gifttotal = point * multiplier;
               $('#gift_Total').html(memberpoint - gifttotal);
               $('#Exchange_point').attr({ 'storeid': StoreId, 'ProductID': ProductID, 'memberid': memberid });
               $.mobile.navigate('#dvExchange');
               }
               else {
               $.dynamic_popup('<p>you don\'t have enough point.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
               }
               
               }
               else {
               $.dynamic_popup('<p>Enter Membership Id.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">Ok</a>');
               
               }
               });

/*******************************************************************************************************/

/*********************************Click on Minus *******************************************************/

$('#minus').click(function () {
                  
                  var multiplier = $('#gift-multiplier').html();
                  if (multiplier != 1) {
                  $('#gift-multiplier').html(parseInt(multiplier) - 1)
                  var point = $('#gift_point').html();
                  var multiplier = $('#gift-multiplier').html();
                  var gifttotal = point * multiplier;
                  var memberpoint = $('#wmt_pnt').html();
                  $('#gift_Total').html(memberpoint - gifttotal);
                  }
                  
                  })


/*******************************************************************************************************/

/*********************************Click on plus ********************************************************/

$('#plus').click(function () {
                 
                 var multiplier = $('#gift-multiplier').html();
                 
                 $('#gift-multiplier').html(parseInt(multiplier) + 1)
                 var point = $('#gift_point').html();
                 var multiplier = $('#gift-multiplier').html();
                 var gifttotal = point * multiplier;
                 var memberpoint = $('#wmt_pnt').html();
                 $('#gift_Total').html(memberpoint - gifttotal);
                 
                 
                 })

/*******************************************************************************************************/

$('#submitmemberid').click(function () {
                           
                           
                           if ($('#member_id').val() == '') {
                           }
                           else {
                           memberselected = true;
                           memberid = $('#member_id').val();
                           var ajaxcallobj = {
                           url: "getmembershippoints",
                           data: {
                           store_id: objlocalStorage.Store_ID,
                           qr_code: memberid
                           }
                           }
                           WMT.jqXHR(ajaxcallobj, function (response) {
                                     if (response != undefined && response != null) {
                                     $('#abl_pnt').html(response[0].wmtAvailablePoints);
                                     $('#str_pnt').html(response[0].storePoints);
                                     $('#wmt_pnt').html(response[0].wmtTotalPoint);
                                     $('#member_id').val('')
                                     
                                     $.mobile.navigate("#dvQRCode");
                                     
                                     }
                                     
                                     });
                           
                           }
                           
                           });

function GetPoints(x) {
    var code = x
    var ajaxcallobj = {
    url: 'getmembershippoints',
    data: {
    qr_code: code,
    store_id: objlocalStorage.Store_ID
    }
    }
    
    WMT.jqXHR(ajaxcallobj, function (response) {
              if (response != undefined && response != null) {
              $('#abl_pnt').html(response[0].wmtAvailablePoints);
              $('#str_pnt').html(response[0].storePoints);
              $('#wmt_pnt').html(response[0].wmtTotalPoint);
              
              }
              else {
                  $.dynamicSuccess_popup(' <p>member not regestered...</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">OK</a>');
              }
              });
}

/********************************* Save Exchange Information ********************************************************/

$('#Exchange_point').click(function () {
                           var point = $(this).attr('giftpoint');
                           var StoreId = $(this).attr('storeid');
                           var ProductID = $(this).attr('ProductID');
                           var amount =  $('#gift_Total').html();
                           
                           var ajaxcallobj = {
                           url: "exchangepoint",
                           data: {
                           store_id: objlocalStorage.Store_ID,
                           member_id: memberid,
                           p_id:ProductID,
                           type:2,
                           amount: amount
                           }
                           }
                           WMT.jqXHR(ajaxcallobj, function (response) {
                                     if (response != undefined && response != null) {
                                     
                                     $('#wmt_pnt').html(response.wmtpoint);
                                     $.mobile.navigate("#dvQRCode");
                                     }
                                     
                                     });
                           
                           });

/*******************************************************************************************************/