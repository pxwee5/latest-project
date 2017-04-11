
$.fn.activate_graphs = function(callback) {
  var $graphData = $(this).find('.c-graph__data');

  $.each($graphData, function(k, element) {
    var bar = element.querySelector('.c-graph__bar');
    var amount = bar.getAttribute('data-amount');
    var innerBar = amount;

    if(amount > 50) {
      amount = 50;
    }

    if (amount > 37.5) {
      bar.classList.add('c-graph__bar--dark-l');
    } else if (amount > 25) {
      bar.classList.add('c-graph__bar--dark-m');
    } else if (amount > 12.5) {
      bar.classList.add('c-graph__bar--dark-s');
    }

    bar.innerHTML = innerBar;
    bar.style.height = (amount * 2) + '%';
  })
}
