var objlocalStorage = {}; /* Global Local storage array object */

$.mobile.defaultPageTransition = 'slide'; /* Set default transition for all pages */
//$.mobile.page.prototype.options.domCache = true;

$('.clsback').on('click', function () {
    $('label.error').hide();      
    window.history.back();

});

$("#helpPopup-outside-page").enhanceWithin().popup();
