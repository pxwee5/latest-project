$.fn.activate_progressbars = function(callback) {
  var $progressBars = $(this).find('.c-progress__bar');
  $.each($progressBars, function(k, element) {
    $(element).css('width', element.getAttribute('data-percentage') + '%');
  })
}
