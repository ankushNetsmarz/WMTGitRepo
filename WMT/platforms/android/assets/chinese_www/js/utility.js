var objlocalStorage = {}; /* Global Local storage array object */
var RememberMe = false;
$.mobile.defaultPageTransition = 'slide'; /* Set default transition for all pages */
//$.mobile.page.prototype.options.domCache = true;
var imageDataObject = '';
$('.clsback').on('click', function () {
    $('label.error').hide();
    window.history.back();
    $('img.clsImage').attr('src', 'css/images/camra.jpg'); localStorage.removeItem("imageData");
    $('img.clrImages').attr('src', 'css/images/camra.jpg'); localStorage.removeItem("imageData");

});

$("#dvImageUpload").enhanceWithin().popup();
$('#dvAgreement').enhanceWithin().popup();
$('#helpPopup-outside-page').enhanceWithin().popup();
$(document).on('click', '#callContactManager', function () {
    window.open($(this).prev('a').attr('href'));
});