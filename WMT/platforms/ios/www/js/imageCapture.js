
var imageByte;
var imageDataObject='';
function capturePhotoCamera() {
    // navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 ,
    // destinationType: navigator.camera.DestinationType.DATA_URL});

    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    });

}

function onPhotoDataSuccess(imageData) {
     $.mobile.navigate('#dvScanMemberShip');
}

function onFail() {
    alert('Failed because: ' + message);
}

function capturePhotoLibrary() {

  
    navigator.camera.getPicture(onSuccess, onFail, {
                                quality: 50,
                                destinationType: Camera.DestinationType.DATA_URL,
                                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                                });
}


function capturePhotoLibrary1() {
    
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
                                quality: 50,
                                destinationType: Camera.DestinationType.DATA_URL,
                                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                                });
}



function onSuccess(imageData) {
    $('img.clsImage').attr('src', "data:image/jpeg;base64," + imageData);
    //    var image = document.getElementByClass('clsImage');
    //    image.src = "data:image/jpeg;base64," + imageData;
    try
    {
        imageDataObject=imageData;
           // window.localStorage.setItem("imageData", imageData);
    }
    catch(e)
    {
        alert(e);
    }

    //    alert( window.localStorage.getItem("imageData"));

    //    $("#imageHolder1").attr('src',"http://www.hdnewpictures.com/wp-content/uploads/2014/06/Funny-1.jpg");
    //},5000);
    //
    //
}

function onFail(message) {
    alert('Failed because: ' + message);
}

