(function(){

  let validateForm = function(formEl) {
    const inputEls = formEl.querySelectorAll('form.validate *[required]');
    const submitBtn = formEl.querySelector('form.validate button[type=submit]');
    const selectEls = formEl.querySelectorAll('form.validate select[required]');
    console.dir(selectEls);

    [...inputEls].forEach(el => {
      ['blur', 'keyup'].forEach(event => el.addEventListener(event, (e) => {
        //If Not Tab or Shift
        if (!(e.keyCode === 9 || e.keyCode === 16)) {
          checkValidity(el);
        }
      }));
    });
    if (selectEls.length > 0) {
      [...selectEls].forEach(el => {
        el.onchange = function(){
          console.dir('onchange');
          checkSelectValidity(el);
        }
      })
    }


    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      [...inputEls].forEach(el => {
        checkValidity(el);
      });
      [...selectEls].forEach(el => {
        checkSelectValidity(el);
      })
    });
  }

  let checkValidity = function(el) {
    el.classList.remove('valid');
    el.classList.remove('error');
    el.classList.remove('valueMissing');
    if (el.validity.valid) {
      el.classList.add('valid');
    } else if (el.validity.valueMissing) {
      el.classList.add('error', 'valueMissing');
    } else {
      el.classList.add('error');
    }
  }

  let checkSelectValidity = function(el) {
    const button = el.parentElement.querySelector('button');
    button.classList.remove('valid');
    button.classList.remove('error');
    button.classList.remove('valueMissing');
    if (el.selectedIndex === -1) {
      button.classList.add('error');
    } else {
      button.classList.add('valid');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const formValidation = document.querySelectorAll('form.validate');

    [...formValidation].forEach(el => {
      validateForm(el)
    });


  })
})();
