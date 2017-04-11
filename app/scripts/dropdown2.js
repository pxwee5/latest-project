// Dependencies: Bootstrap dropdown and jQuery
(function(){

  var createButton = function(select) {
    var button = document.createElement('button');
    if (select.options[0].disabled === true) {
      button.innerText = select.options[0].innerText;
    }
    button.setAttribute('data-toggle', 'dropdown');
    button.setAttribute('aria-haspopup', 'true');
    button.setAttribute('aria-expanded', 'false');
    return button;
  }
  var createDropdown = function(select) {
    var dropdownUl = document.createElement('ul');
    var dropdownLi = document.createElement('li');
    var span = document.createElement('span');

    if (select.multiple) {

      $(dropdownUl).addClass('dropdown-menu o-dropdown__menu j-menu--multi');
      if (select.options.length > 0) {
        var multiSelectAllHTML =
          '<li class="j-opt j-opt--all">'+
            '<span><input type="checkbox"><label></label>Select all</span>'+
            '<span class="j-opt--close">✕</span>'+
          '</li>';
        var multiSelectAllArray = $.parseHTML(multiSelectAllHTML);
        $.each(multiSelectAllArray, function(k, el) {
          dropdownUl.appendChild(el);
        })

        for (var i = 0; i < select.options.length; i++) {
          if (i === 0 && select.options[i].disabled) {
            continue;
          }
          var multiSelectHTML = '<li data-value="'+ select.options[i].value +'"><span><input type="checkbox"><label></label>' + select.options[i].innerText + '</span></li>'
          var multiSelectArray = $.parseHTML(multiSelectHTML);
          $.each(multiSelectArray, function(k, el) {
            dropdownUl.appendChild(el);
          })
        }
      }
    } else {
      $(dropdownUl).addClass('dropdown-menu o-dropdown__menu');
      if (select.options.length > 0) {
        for (var i = 0; i < select.options.length; i++) {
          if (i === 0 && select.options[i].disabled) {
            continue;
          }
          var appendSpan = span.cloneNode();
          var appendLi = dropdownLi.cloneNode();
          appendSpan.innerText = select.options[i].innerText;
          appendLi.appendChild(appendSpan);
          appendLi.setAttribute('data-value', select.options[i].value);
          dropdownUl.appendChild(appendLi);
        }
      }
    }
    return dropdownUl;
  }

  $.fn.dropdown2 = function () {
    $(this).each(function() {
      var $select = $(this).find('select');
      if ($select.length > 0) {
        $(this).addClass($select.attr('class'));
        $select.hide();
        $select[0].selectedIndex = -1;
        this.appendChild(createButton($select[0]));
        this.appendChild(createDropdown($select[0]));
      }
    });
    handleClick();
  }

  var selectOptions = function (li) {
    var $select = $(li).parents().filter('.o-dropdown').find('select');
    var $selectedLi = $(li).parent().find('li.selected:not(.j-opt)');

    $select[0].selectedIndex = -1;
    $.map($selectedLi, function(el, k){
      var dataValue = el.getAttribute('data-value');
      var $matchingOptions = $(li).parents().filter('.o-dropdown').find('select option[value='+ dataValue +']');
      $matchingOptions[0].selected = true;
    });
    $select.change();
  }

  var handleClick = function () {
    $('.o-dropdown li').on('click touch', function(e) {
      e.preventDefault();
      var $menu = $(this).parent();
      var multiSelect = $menu.hasClass('j-menu--multi');
      var $button = $(this).parents('.o-dropdown').find('button');
      var $label = $(this).parents('.o-dropdown').find('label');


      if (multiSelect) {
        e.stopPropagation();
        //Select all
        if ($(this).hasClass('j-opt--all') && $(this).hasClass('selected')) {
          $(this).siblings().removeClass('selected');
        } else if ($(this).hasClass('j-opt--all')){
          $(this).siblings().addClass('selected');
        }

        // Individual Multi Selects
        if ($(this).hasClass('selected')) {
          $(this).removeClass('selected')
          $(this).siblings('.j-opt--all').removeClass('selected');
        } else {
          $(this).addClass('selected');
        }

        // Writes to button
        var $selected = $menu.find('li.selected:not(.j-opt)');
        var btnStringArray = [];
        var btnString = '';

        $.each($selected, function(k, v) {
          if (k > 2) {
            btnStringArray.push('...');
            return false;
          }
          btnStringArray.push(v.innerText.replace(/\s/g, ''));
        });

        if (btnStringArray.length > 0) {
          btnString = btnStringArray.join(', ');
        } else {
          btnString = $label.text();
        }
        $button.text(btnString);
        selectOptions(this);

      } else {
        $menu.find('li').removeClass('selected');
        $(this).addClass('selected');
        var btnString = $(this).text();
        $button.text(btnString);
        selectOptions(this);
      }

    });

    $('.o-dropdown .j-opt--close').on('click', function(e) {
      e.stopPropagation();
      $(this).parents().filter('.o-dropdown').find('button').dropdown('toggle');
    });
  }

})();
