
/*********************************fetch Memeber List *************************************/

$('#txtMembershipManagement1').click(function () {
                                     GetMembersList(0,0);
                                     });

/********************************************************************************************/

/*********************************fetch Memeber Detail **************************************/

$(document).on("click", ".txtmemberid", function () {
               
               var memberid = $(this).attr('member_id');
               var ajaxcallobj = {
               url: 'getsinglememberdiscount',
               data: {
               member_id: memberid,
               store_id: objlocalStorage.Store_ID
               }
               }
               WMT.jqXHR(ajaxcallobj, function (response) {
                         
                         if (response != undefined && response != null) {
                         
                         var memberhtml = ' <div class="remember_div"> <div class="WMT-points-member">'
                         memberhtml += '<div class="wmt-left avtar">   <img src="' + response[0].memberPicturePath + '" alt=""> </div>'
                         memberhtml += '<div class="wmt-right"><div class="wmt-hdeading-memb"><h2>Name: ' + response[0].memberFullName + 'T</h2></div>'
                         memberhtml += '<div class="wmt-hdeading-memb">   <p>Total Point: </p>  <span>' + response[0].wmtTotalPoint + '</span> </div>'
                         memberhtml += '<div class="wmt-hdeading-memb">  <p>Membership Grade: </p>  <span>' + response[0].gradeName + '</span> </div>'
                         memberhtml += '<div class="wmt-hdeading-memb"> <p>Gift Received: </p> <span>' + response[0].wmtTotalPoint + '</span>'
                         memberhtml += '</div> </div>  </div><div class="clr"></div></div>'
                         memberhtml += '<div class="points-main-member">'
                         memberhtml += '<div  class="mbr_dtl">Date</div><div  class="mbr_dtl">Shop</div>'
                         memberhtml += '<div  class="mbr_dtl">Cost</div><div  class="mbr_dtl">Discount</div>'
                         memberhtml += '<div class="clr"></div>'
                         for (var i = 0; i < response.length; i++) {
                         if (response[i].shopDate != null) {
                         var dte = response[i].shopDate.split(' ')
                         dte = dte[0].replace('-', '.');
                         dte = dte.replace('-', '.');
                         }
                         var shopDate = response[i].shopDate == null ? '&nbsp ' : response[i].shopDate;
                         var storeID = response[i].storeID == null ? ' &nbsp' : response[i].storeID;
                         var originalCost = response[i].originalCost == null ? '&nbsp ' : response[i].originalCost;
                         var discountRatio = response[i].discountRatio == null ? ' &nbsp' : response[i].discountRatio;
                         memberhtml += '<div  class="mbr_dtl">' + shopDate + '</div><div  class="mbr_dtl">' + storeID + '</div>'
                         memberhtml += '<div  class="mbr_dtl">' + originalCost + '</div><div  class="mbr_dtl">' + discountRatio + '</div>'
                         memberhtml += '<div class="clr"></div>'
                         }
                         memberhtml += '</div>'
                         $('.application_membersdetail').html(memberhtml);
                         console.log(response[0].gradeID);
                         $.mobile.navigate("#dvMemberDetail");
                         }
                         else {
                         
                         $.dynamicSuccess_popup(' <p>Detail Not Found.</p> <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b clsok" data-theme="b" data-rel="back">OK</a>');
                         
                         }
                         });
               
               
               })

/*********************************************************************************************/

/********************************* Click for sort member *************************************/

$('#Sort_name').click(function ()
                      {
                      var pageid = $('.loadMember').val();
                      
                      GetMembersList(0, pageid);
                      
                      })
$('#Sort_TotalPoint').click(function () {
                            var pageid = $('.loadMember').val();
                            GetMembersList(1, pageid);
                            
                            
                            })

/*********************************************************************************************/

/********************************* fetch sorted Memeber List *************************************/

function GetMembersList(Sort, pageid) {
    
    var ajaxcallobj = {
    url: 'getallmemberdiscount',
    data: {
    page_id: pageid,
    store_id: objlocalStorage.Store_ID,
    sort: Sort
    },
    dataType: 'json'
    }
    
    WMT.jqXHR(ajaxcallobj, function (response) {
              var memberhtml = '';
              if ((response[1].result.length != 0))
              {
              if (response != undefined && response != null) {
              for (var i = 0; i < response[1].result.length; i++) {
              memberID = response[1].result[i].memberID == "" ? '0' : response[1].result[i].memberID;
              memberhtml += ' <div class="member-manage"> <div class="wapper-wrap">'
              memberhtml += '<div  member_id=' + memberID + ' class="mamber-image avtar txtmemberid" >'
              memberhtml += ' <img height="80px" width="90px" src="' + response[1].result[i].memberPicturePath + '" alt=""> </div>'
              memberhtml += '<div class="member-right">'
              memberhtml += '<p onclick="$.mobile.navigate("#dvMemberDetail");">Name: ' + response[1].result[i].memberFullName + '</p>'
              memberhtml += ' <div class="memb-total">'
              memberhtml += ' <div class="total">Total: <span class="total_point">' + response[1].result[i].wmtTotalPoint + '</span></div>'
              memberhtml += ' <div class="total">Current: <span>' + response[1].result[i].wmtAvailablePoints + '</span ></div></div></div></div></div>'
              }
              memberhtml += '<div class="loadMember" pageid="' + pageid + '"> More Member... </div>'
              $('.Application_members').html(memberhtml);
              
              $.mobile.navigate('#dvMemberShipListing');
              }
              
              
              }
              else {
              nomemberhtml = '<div class="loadMember" pageid="0" > No More Member... </div>'
              $('.Application_members').html(nomemberhtml);
              
              $.mobile.navigate('#dvMemberShipListing');
              }
              });
}

/************************************************************************************************/

/**********************************Change Selection class*****************************************/

$('.chge_cls').click(function(){
                     $('.member_info li').removeClass('current');
                     $(this).parent('li').addClass('current');
                     });

/************************************************************************************************/

$(document).on("click", ".loadMember", function () {
               var pageid = $(this).attr('pageid');
               var newpageid = parseInt(pageid) + 1;
               console.log(pageid + 'pageid');
               $(this).attr('pageid', newpageid);
               GetMembersList(0, pageid);
               
               });




$('#txtMemberAnalysisReport').click(function () {
                                    
                                    var ajaxcallobj = {
                                    url: "getreportsinfo",
                                    data: {
                                    store_id: objlocalStorage.Store_ID
                                    }
                                    }
                                    WMT.jqXHR(ajaxcallobj, function (response) {
                                              
                                              if (response.length > 0) {
                                              
                                              var url = response[0].employeeAnalysis;
                                             navigator.app.loadUrl(url);
                                              }
                                              
                                              });
                                    });

/**********************************Change Selection class*****************************************/

$('.change_active').click(function () {
                          $('.busin_inf li').removeClass('current');
                          $(this).parent('li').addClass('current');
                          });

/************************************************************************************************/
