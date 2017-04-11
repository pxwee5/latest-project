// (function() {
  function runAjax(url) {
    return new Promise(function(resolve, reject) {
      resolve($.ajax({
        url: url
      }));
    })
  }

  var renderTemplate = function(template, productJSON) {
    Mustache.parse(template);
    var renderedProducts = '';

    productJSON.forEach(function(product){
      product.guid = guid();
      var rendered = Mustache.render(template, product);
      renderedProducts += rendered;
    })

    return new Promise(function(resolve, reject) {
      resolve(renderedProducts);
    });
  }

  var generateProducts = function(productJSONPromise) {
    return new Promise(function(resolve, reject) {

      productJSONPromise.then(function(productJSON) {
        var gridTarget = document.querySelector('.c-product__grid-target');
        var listTarget = document.querySelector('.c-product__list-target');
        var gridTemplatePromise = runAjax('scripts/templates/product-grid.html');
        var listTemplatePromise = runAjax('scripts/templates/product-list.html');

        gridTemplatePromise.then(function(template) {
          renderTemplate(template, productJSON.products)
          .then(function(renderedProducts){
            $(gridTarget).append(renderedProducts);

            listTemplatePromise.then(function(template) {
              renderTemplate(template, productJSON.products)
              .then(function(renderedProducts) {
                $(listTarget).append(renderedProducts);
                resolve();
              })
            })
          })
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    // var productTemplate = document.querySelector('.c-product__template .c-product');
    var gridTarget = document.querySelector('.c-product__grid-target');
    var listTarget = document.querySelector('.c-product__list-target');

    if (gridTarget && listTarget) {

      var productJSONPromise = runAjax('/data/products.json');

      generateProducts(productJSONPromise)
      .then(function(){
        //By now the DOM is completely ready.

        // Just wait 250ms before activating graphs to show animation
        // setTimeout(function(){
        //   $('.c-graph').activate_graphs();
        // }, 250)

        // Or use the in view library to activate the graph when scrolled into view
        $('.match-height').matchHeight();

        inView('.c-graph')
        .on('enter', function(el) {
          // console.dir(el);
          $(el).activate_graphs();
        });

        //To simulate 1px scroll to activate inview.
        $(window).scrollTop($(window).scrollTop()+1);
      });

    }
  });


// })();
