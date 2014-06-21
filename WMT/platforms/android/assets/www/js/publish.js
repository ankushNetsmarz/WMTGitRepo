
(function ($) {


    /* Store Information Form Submit Function */

    /* Membership Discount Form Submit Function */


    /* Apply active class on selected menu */
    $(document).on("click", '.clsPublisNav', function () {
        $('.publishPusinessinfo li').removeClass('current');
        var nav = '#' + $(this).attr('navigateTo');
        $(this).parent('li').addClass('current');
        $.mobile.navigate(nav);
    });

})(jQuery)