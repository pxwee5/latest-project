(function() {
  var filterCollapseHandler = function () {
    var $filterButton = $('#filterButton');
    var $filterGroup = $('#filterGroup');
    if (window.matchMedia('(min-width: 768px)').matches) {
      $filterButton.hide();
      $filterButton.removeClass('collapsed');
      $filterButton.attr('aria-expanded', 'false');
      $filterGroup.addClass('in');
      $filterGroup.css('height', 'auto');
    } else {
      $filterButton.show();
      $filterButton.addClass('collapsed');
      $filterGroup.removeClass('in')

    }
  }

  document.addEventListener('DOMContentLoaded', function(e) {
    //Pointer Events Polyfill
    window.pointerEventsPolyfill();
    var menuControls = new MenuControls();

    filterCollapseHandler();
    window.addEventListener('resize', filterCollapseHandler);
  });

  window.addEventListener('resize', function() {
    if (window.matchMedia('(max-width: 768px)').matches) {
      $('a.c-switcher__grid[data-toggle="tab"]').trigger('click');
    }
  })

  $(document).ready(function(){
    $('.owl-carousel').owlCarousel({
      items: 1,
      dots: true,
    });

    $('.match-height').matchHeight();
    $('.o-dropdown').dropdown2();

    //Adds "active" class to tab toggles
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      $(this).siblings().removeClass('active');
      $(this).addClass('active')
    })

    //Controls video in index page
    $('.c-video__overlay, .c-video__play').on('click', function(e){
      $(this).addClass('active');
      $('#story-video')[0].src += '&autoplay=1';
    });

    //Headroom JS
    var headerEl = document.querySelector('.c-header');
    if (headerEl) {
      var headroom = new Headroom(headerEl, {
        'tolerance': 5
      });
      headroom.init();
    }

    //Expandable More Less Button
    var targetInitialHeight;
    $('.j-expandable').on('click', function() {
      $(this).parent().find('.o-btn__collapsible[target-data]').trigger('click');
    });
    $('.o-btn__collapsible[target-data]').on('click', function(e) {
      e.preventDefault();
      var targetId = $(this).attr('target-data');
      var targetEl = document.querySelector(targetId);
      targetInitialHeight = (targetInitialHeight) ? targetInitialHeight : $(targetEl).css('height');

      if (this.classList.contains('active')) {
        TweenLite.to(targetEl, 0.5, {
          height: targetInitialHeight,
          ease: Power4.easeOut
        });
      } else {
        TweenLite.set(targetEl, {height:'auto'});
        TweenLite.from(targetEl, 0.5, {
          height: targetInitialHeight,
          ease: Power4.easeOut
        });
      }
      $(targetEl).toggleClass('active');
      $(this).toggleClass('active');
    });


    $('#loadMoreProducts').on('click', function(){
      var productJSONPromise = runAjax('/data/products.json');
      generateProducts(productJSONPromise)
      .then(function(){
        // Or use the in view library to activate the graph when scrolled into view
        inView('.c-graph')
        .on('enter', function(el) {
          $(el).activate_graphs();
        });
        $(window).scrollTop($(window).scrollTop()+1);
      });
    })

  }); //End document ready


  $(document).ajaxStart(function() {
    $('.c-spinner').addClass('active');
  });
  $(document).ajaxComplete(function() {
    $('.c-spinner').removeClass('active');
  })

  $(window).on('load', function() {
    $('.collapse').on('click', function() {
      if ($(this).parents().filter('.c-filter').length === 0) {
        $(this).parent().find('.o-btn__collapsible[data-toggle=collapse]').trigger('click');
      }
    })

    $('.c-graph.animated').activate_progressbars();
    inView('.c-graph:not(.animated)').on('enter', function(el) {
      $(el).activate_graphs();
    });

    $('.c-progress.animated').activate_progressbars();
    inView('.c-progress:not(.animated)').on('enter', function(el) {
      $(el).activate_progressbars();
    });

  })



})();
