var MenuControls = function () {
  this.menu = document.querySelector('.c-menu');
  this.menuBtns = document.querySelector('.c-menu__btns ul');
  this.menuNav = document.querySelector('.c-menu__nav');
  this.menuSearch = document.querySelector('.c-search');
  // this.contentOverlay = document.querySelector('.o-body-content__overlay ');
  this.contentOverlay = document.querySelector('.o-body-content__overlay');
  this.menuSearch = document.querySelector('.c-search');
  var self = this;

  // Search
  $(this.menuSearch).on('click', function (e) {
    e.stopPropagation();
  });

  // 3 Tiers Navigation
  $(this.menuNav).on('click', function (e) {
    e.stopPropagation();

    var tierTwo = document.querySelectorAll('.c-menu__nav-tier2');

    [].forEach.call(tierTwo, function(item) {
      item.classList.remove('active');
      item.parentNode.querySelector('a').classList.remove('active');
    });

    if (e.target.hasAttribute('toggle-target')) {
      e.preventDefault();
      var toggleTarget = e.target.getAttribute('toggle-target');
      var toggleEl = document.getElementById(toggleTarget);
      if (toggleEl) {
        self.toggleActive(e.target);
        self.toggleActive(toggleEl);
      }
    }
  });
  // Menu Buttons Click Listener
  $(this.menuBtns).on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    var currentActive = $('.c-menu__btns .active');
    if (currentActive.length > 0 && e.target.className == currentActive[0].className) {
      self.toggleOffBtns();

    } else {
      self.toggleOffBtns();
      if (e.target.hasAttribute('toggle-target')) {
        var toggleTarget = e.target.getAttribute('toggle-target');
        var toggleEl = document.getElementById(toggleTarget)
        if (toggleEl) {
          self.toggleOn(e.target);
          self.toggleOn(toggleEl);
          self.toggleOn(self.contentOverlay);
        }
      }
    }
  });
  // Overlay Click
  // $(this.contentOverlay).on('click', function(e){
  //   e.preventDefault();
  //   self.toggleOffBtns();
  // });
  $(document).on('click', function() {
    self.toggleOffBtns();
  })
};

//Prototypes
MenuControls.prototype.handleOverlay = function(target) {
  var self = this;
}
MenuControls.prototype.toggleActive = function(el) {
  if (el.classList.contains('active')) {
    el.classList.remove('active');
  } else {
    el.classList.add('active');
  }
}
MenuControls.prototype.toggleOn = function(el) {
  if (!el.classList.contains('active')) {
    el.classList.add('active');
  }
}
MenuControls.prototype.toggleOff = function(el) {
  if (el.classList.contains('active')) {
    el.classList.remove('active');
  }
}
MenuControls.prototype.toggleOffBtns = function() {
  var self = this;
  var activeBtns = this.menuBtns.querySelectorAll('.active');
  // console.log(activeBtns);
  if (activeBtns.length > 0) {
    for (var i=0; i<activeBtns.length; i++) {
      this.toggleOff(activeBtns[i]);
    }
  }
  this.toggleOff(this.contentOverlay);
  this.toggleOff(this.menu);
  this.toggleOff(this.menuNav);
  this.toggleOff(this.menuSearch);
}
