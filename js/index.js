$(document).ready(function() {

  // var testButton = $("#testButton");
  var akInsta = "6260037362.405ffa6.49a98bf1e11645068590c39a645f14fe";
  var instaCountLimit = "count=6";
  var getMediaRequestInsta = "https://api.instagram.com/v1/users/self/media/recent/?"+instaCountLimit+"&access_token="+akInsta;

  var paddingHeight = 16;

  var navTopBar = $(".nav-top-bar");
  var headerTopBar = $(".header-top-bar");
  var homePageContainer = $(".home-page-container");
  var paintingServiceBox = $("#painting");
  var furnitureRefurbishingBox = $("#furnitureRefurbishing");
  var stainingBox = $("#staining");
  var servicesBox = $(".services-box");
  var serviceOverlay = $(".service-overlay");
  var closeOverlay = $("#close-overlay");
  var pageContainers = $(".page-container");
  var instaPhotoFrame = $(".insta-photo-frame");
  var instaPhotoContainer = $("#insta-photo-container");

  //CSS/init setup
  loadInstaPhotos(instaPhotoContainer,getMediaRequestInsta);

  homePageContainer.css({ 'height': $(window).height() - navTopBar.height() - headerTopBar.height() - (2*paddingHeight)});
  pageContainers.css({'height':$(window).height() - navTopBar.height()});
  // instaPhotoFrame.css({'height':instaPhotoFrame})

  $(window).on('resize', function() {
       homePageContainer.css({ 'height': $(window).height() - navTopBar.height() - headerTopBar.height() - (2*paddingHeight)});
       pageContainers.css({'height':$(window).height() - navTopBar.height()});
  });

  //onclicks
  servicesBox.on("click touchend", function(evt) {
    var id = $(this)[0].id;
    console.log(id);
    if (id == "painting") {
      serviceOverlay.toggleClass("viewing");
    } else if (id == "furnitureRefurbishing") {
      serviceOverlay.toggleClass("viewing");
    } else if (id == "staining") {
      serviceOverlay.toggleClass("viewing");
    } else {
      console.log("Clicked not a service")
    }
  });

  closeOverlay.on("click touchend", function(evt) {
    serviceOverlay.toggleClass("viewing");
  });

  // testButton.on("click touchend", function(evt) {
  //   serviceOverlay.toggleClass("viewing");
  // });

  // new Promise(function(resolve, reject) {
  //
  // });


  // <div class="cell medium-2">
  //   <div class="i">
  //   <img src="/docs/fur.jpeg">
  //   </div>
  // </div>
});

//calls api to retrieve the photos
function loadInstaPhotos(id,getMediaRequestInsta) {
  $.get(getMediaRequestInsta, function(result, status){
    if (status != null && status == "success") {
      if (result != null) {
        var data = result.data;
        var dataLength = data.length;
        if (dataLength == 6) {
          setPhotoHTML(data,dataLength, id);
        }
        // console.log(data, dataLength);
      }
    } else {
      console.log("fail getting instagram images");
    }
  });
}

//creates the html template and adds it to the div
function setPhotoHTML(data,dataLength,id) {
  var html =
            '<div class="cell medium-2">' +
              '<img height="H" width="W" src="X">' +
            '</div>';
  for (var i = 0; i < dataLength; i++) {
    var tempHTML = html;
    var lowRes = data[i].images.low_resolution;
    tempHTML = tempHTML.replace('X',lowRes.url).replace("H", lowRes.height).replace("W", lowRes.width);
    id.append(tempHTML);
    console.log("\n" + tempHTML);
  }

}
