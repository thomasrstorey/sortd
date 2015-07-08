var nbtoggle = $(".navbar-toggle").click(function(){
  $(".mobile-navbar-list").toggleClass("down");
});

$(".share-link").click(function(){
  $(".share-modal-container").toggleClass("show");
});

$(".share-modal-container").click(function(){
  $(".share-modal-container").toggleClass("show");
});
