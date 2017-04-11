(function(){
  var $slideIn = $('.c-slide-in');
  var $contentOverlay = $('.o-body-content__overlay');

  var openSlideIn = function () {
    $slideIn.addClass('active');
    $contentOverlay.addClass('active');
  }

  var closeSlideIn = function () {
    $slideIn.removeClass('active');
    $contentOverlay.removeClass('active');
  }

  $('*[target-data="slide-in"]').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    openSlideIn();
  })

  $('.c-slide-in__close').on('click', function(e) {
    e.preventDefault();
    closeSlideIn();
  });

  $slideIn.on('click', function(e) {
    e.stopPropagation();
  })

  $(document).on('click', function() {
    closeSlideIn();
  })

})();
