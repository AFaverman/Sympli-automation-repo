/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */

// Mailchimp code

setTimeout(function() {
    if ($('.ProductForm__AddToCart.Button').is(':disabled')) {
      var variant = $('.ColorSwatch__Radio:checked').val();
      var psoName = "PSO " + variant;
      var psoElement = $('input[name="'+psoName+'"]')[0];
      if (psoElement) {
        $(psoElement).parent().show().find('p').html("We’re sorry, this product is permanently sold out. <span class='perm-sellout-redirect'><a href='/apps/store-locator'>Visit a retailer near you</a></span> to see if they have this item in stock.");
        $(psoElement).parents('.Product__Info').find('.ProductForm.pso').addClass('hide-bis-button');
      }
    }
    // Mailchimp signup
    $(".Newsletter.Form, .Footer__Newsletter.Form, .NewsletterPopup__Form").submit(function(e){
      e.preventDefault();
      submitSubscribeForm($(this));
    });
  });
  
  // Submit the email signnup form with an ajax/jsonp request.
  function submitSubscribeForm($form) {
    $.ajax({
      type: "GET",
      url: $form.attr("action"),
      data: $form.serialize(),
      cache: false,
      dataType: "jsonp",
      jsonp: "c", // trigger MailChimp to return a JSONP response
      contentType: "application/json; charset=utf-8",
  
      error: function(error){
        // According to jquery docs, this is never called for cross-domain JSONP requests
  //       console.log(error);
      },
  
      success: function(data){
  //     	console.log(data);
        var resultMessage = data.msg || "Sorry. Unable to subscribe. Please try again later."
  
        if (data.result != "success") {
          if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
            resultMessage = "<br /><p>You’ve already subscribed to our email list. As a loyal subscriber we would love to offer you Free Shipping on your next order. Please <span class='perm-sellout-redirect'><a href='/pages/contact-us'>contact us</a></span> to find out how.</p>"
          }
             $form.find('.result-message').html(resultMessage);
        } else {
          resultMessage = "Thank you!";
          $form.find('.result-message').html(resultMessage);
        }
      }
    });
  }
  
  // Geolocate code
  setTimeout(function() {
    determineLocation();
  });
  
  function determineLocation() {
    var countryCookie = getCookie('country_origin');
    
    if (countryCookie) {
      console.log("CC: ", countryCookie);
      checkCookie(countryCookie);
    } else {
      //getCountry();
    }  
  }
  
  function removeElementsByCookie() {
    var countryCookie = getCookie('country_origin');
  
    if (countryCookie == null) {
      return;
    }
    if (countryCookie != 'CA') {
      removeAllElements();
    } else {
       isCanada();
    }
  }
  
  function checkCookie(countryCookie) {
    if (countryCookie != 'CA') {
      removeAllElements();
    } else {
       isCanada();
    }
  }
  
  function getCountry() {
    geoip2.country(function(response) {
      console.log(response);
      var countryCode = response.country.iso_code;
      setCookie('country_origin', countryCode, 1);
      console.log(countryCode);
      if (countryCode != 'CA') {
        removeAllElements();
        showCountryPopUp();
      } else {
       isCanada();
      }
    });
  }
  
  function isCanada() {
    document.body.classList.remove("non-canada");
  }
  
  function showCountryPopUp() {
    const bodyBlackout = document.querySelector('.body-blackout');
    const popupModal = document.querySelector('.geolocate-popup-wrapper');
    const body = document.querySelector('body');
  
    popupModal.classList.add('is--visible');
    bodyBlackout.classList.add('is-blacked-out');
    window.onbeforeunload = function(){ 	window.scrollTo(0,0); }    
    body.classList.add('no-scroll');
  
    bodyBlackout.addEventListener('click', function() {
      popupModal.classList.remove('is--visible');
      bodyBlackout.classList.remove('is-blacked-out');
      body.classList.remove('no-scroll');
    });
  }
  
  function removeAllElements() {
  //   redirectToHome();
  //   var cartElement = document.getElementsByClassName('Header__Icon');
  //   var qtyElement = document.getElementsByClassName('ProductForm__QuantitySelector');
  //   var qtyLabelElement = document.getElementsByClassName('QuantityLabel');
  //   var sizeSwitchElement = document.getElementsByClassName('SizeSwatchList');
  //   var priceElement = document.getElementsByClassName('ProductMeta__PriceList');
  //   var addToCartButton = document.getElementsByClassName('ProductForm__AddToCart');
  //   var paypalButton = document.getElementsByClassName('shopify-payment-button');
  //   var footerLinks = document.querySelectorAll(".Footer__Block .Linklist__Item .Link.Link--primary");
  //   var announcementBar = document.getElementsByClassName('AnnouncementBar');
  //   var canadaForm = document.getElementsByClassName('canada-form');
  
  
  //   var alsoBoughtPriceElements = document.getElementsByClassName('cbb-also-bought-product-price-container');
  //   var recentlyViewedPriceElements = document.getElementsByClassName('ProductItem__Price');
  // //   var newsletterElement = document.getElementsByClassName('NewsletterPopup');
    
  //   var pdpSizeFilterElement = document.getElementsByClassName('bc-sf-filter-option-block-size');
  
  //   removeElementsByHref(cartElement, ['/cart']);
  //   removeElements(qtyElement);
  //   removeElements(qtyLabelElement);
  //   removeSizeSwitchElement(sizeSwitchElement);
  //   removeElements(priceElement);
  //   hideElements(addToCartButton);
  //   removeElements(paypalButton);
  //   removeElements(alsoBoughtPriceElements);
  //   removeElements(recentlyViewedPriceElements);
  //   removeElements(pdpSizeFilterElement);
  //   removeElements(announcementBar);
  //   removeElements(canadaForm);
  // //   removeElements(newsletterElement);
  //   removeElementsByHref(footerLinks, ['/pages/returns-exchanges']);
  //   removeElementsByHref(footerLinks, ['/pages/shipping-delivery']);
  //   removeElementsByHref(footerLinks, ['/pages/faqs']);
  //   removeElementsByHref(footerLinks, ['/pages/terms-conditions']);
  
  //   document.body.classList.add("non-canada");
  //   updateNewsletterTitle();
  }
  
  function setCookie(name,value,days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }
  
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }
  
  function removeElements(elements) {
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }  
  }
  
  function removeSizeSwitchElement(elements) {
    while (elements.length > 0) {
       elements[0].parentElement.remove();
    } 
  }
  
  function hideElements(elements) {
    var i;
    var elems = elements.length;
  
    for (i = 0; i < elems; i++) {
      if (elements[i].classList.contains('ProductForm__AddToCart')) {
        elements[i].classList.add('hide');
      }
    }
  }
  
  function removeElementsByHref(elements, href) {
    var i;
    var elems = elements.length;
    for (i = 0; i < elems; i++) {
      if (href.includes(elements[i].getAttribute('href'))) {
          elements[i].parentNode.removeChild(elements[i]);
      }
    }
  }
  
  function redirectToHome() {
    var url = window.location.href;
    var redirectPages = ['pages/returns-exchanges', 'pages/shipping-delivery', 'pages/faqs', 'pages/terms-conditions'];
    var i;
    for (i = 0; i < redirectPages.length; i++) {
      if (url.indexOf(redirectPages[i]) !== -1) {
        window.location.href = "/";
        return;
      }
    }
  }
  
  function updateNewsletterTitle() {
    $('.newsletter-section .SectionHeader__Heading.Heading.u-h1').text("Join our Mailing List");
    $('.Footer__Block--newsletter .Footer__Title.Heading.u-h6').text("Join our Mailing List");
  }
  
  // Detect all AJAX calls and remove certain elements for non-Canadian visitors
  var open = window.XMLHttpRequest.prototype.open,
      send = window.XMLHttpRequest.prototype.send,
      onReadyStateChange;
  
  function openReplacement(method, url, async, user, password) {
      var syncMode = async !== false ? 'async' : 'sync';
  //     console.warn(
  //         'Preparing ' +
  //         syncMode +
  //         ' HTTP request : ' +
  //         method +
  //         ' ' +
  //         url
  //     );
      return open.apply(this, arguments);
  }
  
  function sendReplacement(data) {
  //     console.warn('Sending HTTP request data : ', data);
  
      if(this.onreadystatechange) {
          this._onreadystatechange = this.onreadystatechange;
      }
      this.onreadystatechange = onReadyStateChangeReplacement;
      removeElementsByCookie();
      return send.apply(this, arguments);
  }
  
  function onReadyStateChangeReplacement() {
  //     console.warn('HTTP request ready state changed : ' + this.readyState);
      if(this._onreadystatechange) {
          return this._onreadystatechange.apply(this, arguments);
      }
  }
  
  window.XMLHttpRequest.prototype.open = openReplacement;
  window.XMLHttpRequest.prototype.send = sendReplacement;