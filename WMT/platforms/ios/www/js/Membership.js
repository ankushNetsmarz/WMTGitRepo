$(document).ready(function () {
    var fung = function () {
        alert('new')
    };
    $('#txtMembershipManagement1').click(function () {


        var ajaxcallobj = {
            url: 'getallmemberdiscount',
            data: {
                page_id: 0,
                store_id: 157
            },
            dataType: 'json'
        }

        WMT.jqXHR(ajaxcallobj, function (response) {
            if (response != undefined && response != null) {

                var memberhtml = ' <div class="member-manage"> <div class="wapper-wrap">'
                memberhtml += '<div id="txtmemberid" member_id=' + response[1].result[0].memberID + ' class="mamber-image avtar" >'
                memberhtml += ' <img src="css/images/member-1.jpg" alt=""> </div>'
                memberhtml += '<div class="member-right">'
                memberhtml += '<p onclick="$.mobile.navigate("#dvMemberDetail");">Name: ' + response[1].result[0].memberFullName + '</p>'
                memberhtml += ' <div class="memb-total">'
                memberhtml += ' <div class="total">Total: <span class="total_point">' + response[1].result[0].wmtTotalPoint + '</span></div>'
                memberhtml += ' <div class="total">Current: <span>' + response[1].result[0].wmtAvailablePoints + '</span ></div></div></div></div></div>'
                $('.Application_members').html(memberhtml);
                console.log(response[1].result[0].aliasName);
                $.mobile.navigate('#dvMemberShipListing');
            }
        });


    });



    $(document).on("click", "#txtmemberid", function () {


        var ajaxcallobj = {
            url: 'getsinglememberdiscount',
            data: {
                member_id: 123,
                store_id: 157
            }
        }

        WMT.jqXHR(ajaxcallobj, function (response) {

            if (response != undefined && response != null) {

                var memberhtml = ' <div class="remember_div"> <div class="WMT-points-member">'

                memberhtml += '<div class="wmt-left avtar">   <img src="css/images/member-5.jpg" alt=""> </div>'
                memberhtml += '<div class="wmt-right"><div class="wmt-hdeading-memb"><h2>Name: Love WMT</h2></div>'
                memberhtml += '<div class="wmt-hdeading-memb">   <p>Total Point: </p>  <span>2666</span> </div>'
                memberhtml += '<div class="wmt-hdeading-memb">  <p>Membership Grade: </p>  <span>56</span> </div>'
                memberhtml += '<div class="wmt-hdeading-memb"> <p>Gift Received: </p> <span>6</span>'
                memberhtml += '</div> </div>  </div><div class="clr"></div></div>'
                memberhtml +='<div class="points-main-member">  <ul class="member-detail">'
                memberhtml +='<li> <div class="date-memb">Date</div><div class="date-memb">Shop</div>'
                memberhtml += '<div class="date-memb">Cost</div>  <div class="date-memb">Discount</div> </li>   '
                memberhtml +=  '<li><div class="date-txt">2013.07.12</div> <div class="date">ShopName</div>'
                memberhtml += ' <div class="date">210</div> <div class="date">85%</div></li></ul> </div>'
                $('.application_membersdetail').html(memberhtml);
                console.log(response[0].gradeID);
                $.mobile.navigate("#dvMemberDetail");
            }
        });


    })

});
