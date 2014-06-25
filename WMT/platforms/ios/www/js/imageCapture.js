
var imageByte;
function capturePhotoCamera() {
    // navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 ,
    // destinationType: navigator.camera.DestinationType.DATA_URL});
    
    navigator.camera.getPicture(onSuccess, onFail, {
                                quality: 50,
                                destinationType: Camera.DestinationType.DATA_URL
                                });
    
}

function onPhotoDataSuccess(imageData) {
    alert(1);
    //var smallImage = document.getElementById('imageHolder');
    // smallImage.style.display = 'block';
    // smallImage.src = "data:image/jpeg;base64," + imageData;
    alert(imageData);
    imageByte = imageData;
}

function onFail() {
    alert('Failed because: ' + message);
}

function capturePhotoLibrary() {
    
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
                                quality: 50,
                                destinationType: navigator.camera.DestinationType.DATA_URL,
                                sourceType: navigator.camera.PictureSource.PHOTOLIBRARY
                                });
}



function onSuccess(imageData) {
    $('img.clsImage').attr('src',"data:image/jpeg;base64," + imageData);
//    var image = document.getElementByClass('clsImage');
//    image.src = "data:image/jpeg;base64," + imageData;
   window.localStorage.setItem("imageData", imageData);
//    alert( window.localStorage.getItem("imageData"));
    
//    $("#imageHolder1").attr('src',"http://www.hdnewpictures.com/wp-content/uploads/2014/06/Funny-1.jpg");
//},5000);
//
//
}

function onFail(message) {
    alert('Failed because: ' + message);
}

