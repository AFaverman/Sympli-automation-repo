// Override Settings
var bcSfSearchSettings = {
	search: {
		suggestionStyle: 'style2',
		suggestionStyle2MainContainerSelector: '#shopify-section-header',
		suggestionMobileStyle: 'style2',
	}
};

// Customize style of Suggestion box
BCSfFilter.prototype.customizeSuggestion = function (suggestionElement, searchElement, searchBoxId) {
};

BCSfFilter.prototype.beforeBuildSearchBox = function (id) {

	removeThemeSearchEvent();
	recallThemeOnPageShowEvent();

	var self = this;
	if (self.checkIsFullWidthSuggestionMobile(id)) {
		jQ(id).removeAttr('autofocus');
		if (jQ(id).is(':focus')) {
			jQ(id).blur();
		}
	}
};

function removeThemeSearchEvent() {
  try{
	// Remove all events
	if (jQ('[name="q"]').length > 0) {
		var cloneSearchBar = jQ('[name="q"]:first').clone();
		jQ(cloneSearchBar).removeClass('Form__Input').addClass('Search__Input Heading');
		jQ('[name="q"]:first').replaceWith(cloneSearchBar);
		if (jQ('#Search').length > 0) {
			if (jQ('#Search').hasClass('Modal--fullScreen')) {
				jQ('#Search').attr("style", "height: 0px !important");
			}
			jQ('#Search .Search__Results').attr("style", "display: none !important");
		}

		// Rebuild click search icon event
		if (jQ('[data-action="toggle-search"]').length > 0) {
			jQ('[data-action="toggle-search"]').on('click', function () {
				setTimeout(function () {
					jQ('[name="q"]:first').focus();
				}, 500);
			})
		}
	}
	// disable page transition
	if (window.theme && window.theme.showPageTransition) {
		window.theme.showPageTransition = false;
	}
  }catch(e){
  	console.log("There is error which shows "+e.message); //Handling error  
  }
}

function recallThemeOnPageShowEvent() {
  try{
	// disable page transition
	var pageTransition = document.querySelector('.PageTransition');
	if (pageTransition) {
		pageTransition.style.visibility = 'visible';
		pageTransition.style.opacity = '0';
	}
	// refresh cart
	document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
		bubbles: true
	}));
  }catch(e){
  	console.log("There is error which shows "+e.message); //Handling error  
  }
}

BCSfFilter.prototype.buildSuggestionProductList = function(searchTerm, itemData, ul, itemInfo, suggestionData) {
    var self = this;
    var result = '';
    // Buid Header
    result += this.buildSuggestionHeader(itemInfo['label'], 'product');
    // Build Did you mean
    var dym = this.buildSuggestionDidYouMean(searchTerm, suggestionData, ul);
    if (dym != '') {
        result += '<li class="' + this.class.searchSuggestionItem + ' bc-sf-search-suggestion-dym" aria-label="Did you mean">' + dym + '</li>';
    }
    // Build content
    if (Object.keys(itemData).length > 0) {
        // var count = 0;   
        var k;
        var itemDataLength = itemData.length; 
        for (k = 0; k < itemDataLength; k++) {
            // if (count < itemInfo['number']) {
            var product = itemData[k];
            // Get product attributes
            var productTitle = this.customizeSuggetionProductTitle(product['title'], searchTerm, itemData);
            productTitle = this.highlightSuggestionResult(productTitle, searchTerm);
            var productUrl = this.buildProductItemUrl(product, false);
            var productThumb = product['images_info'].length > 0 ? this.optimizeImage(product['images_info'][0]['src'], '200x') : bcSfFilterConfig.general.no_image_url;
            var productSku = product.skus !== null && product.skus.length > 0 ? product['skus'][0] : '';
            // Get custom class / attribute
            var searchSuggestionClass = this.class.searchSuggestion;
            var newTabAttr = this.getSettingValue('search.openProductNewTab') ? 'target="_blank"' : '';
            result += '<li class="' + this.class.searchSuggestionItem + ' ' + this.class.searchSuggestionItem + '-product" data-label="' + this.escape(product['id']) + '" data-value="' + this.escape(product['title']) + '" aria-label="' + this.escape(itemInfo['label']) + ': ' + this.escape(product['title']) + '">';
            result += '<a href="' + productUrl + '" ' + newTabAttr + '>';
            // Build Left column
            if (this.getSettingValue('search.showSuggestionProductImage')) {
                result += '<div class="' + searchSuggestionClass + '-left"><img src="' + productThumb + '" /></div>';
            }
            // Build Right column
            result += '<div class="' + searchSuggestionClass + '-right">';
            result += '<div class="' + searchSuggestionClass + '-product-title">' + productTitle + '</div>';
            if (this.getSettingValue('search.showSuggestionProductSku')) {
                result += '<div class="' + searchSuggestionClass + '-product-sku">SKU: ' + productSku + '</div>';
            }
            if (this.getSettingValue('search.showSuggestionProductVendor')) {
                result += '<div class="' + searchSuggestionClass + '-product-vendor">' + product['vendor'] + '</div>';
            }
            result += this.buildSuggestionProductPrice(product);
          	result += buildColorSwatches(product);
            result += '</div>'; // End Right column
            result += '</a>'; // End a
            result += '</li>'; // End li
            // count++;
            // } else break;
        }
    }
    return result;
};

// Build Color Swatches
function buildColorSwatches(data) {
  try{
    var productUrl = bcsffilter.buildProductItemUrl(data, false);

    var colorSwatchesHtml = '';
    colorSwatchesHtml += '<ul class="boost-pfs-filter-item-swatch">';
    for (var index = 0; index < data.options_with_values.length; index++) {
      var option = data['options_with_values'][index].name.toLowerCase();
      if (option == 'color' || option == 'colour') {
        var colorlist = '';
        var color = '';
        var totalVariants = 0;
        for (var k = 0; k < data.variants.length; k++) {
          var variant = data['variants'][k];
          color = variant['merged_options'][index];
         if (colorlist.indexOf(color) == -1) {
            if (totalVariants < 4) {
              var text = bcsffilter.slugify(color);
              var border = text == 'white' ? 'border: 1px solid #cbcbcb;' : '';
              var backgroundImage = bcsffilter.optimizeImage(variant.image, '24x');
              var backgroundImageURL = '';
              var dataImg = '';
              var dataColor = color.toLowerCase().split(':')[1];

              if (variant.image !== null) {
                dataImg = "data-img='" + bcsffilter.optimizeImage(variant.image, '300x') + " 300w'";
              } 
              var _file = color.toLowerCase().replace(/: /g, '-').replace(/:/g, '-').replace(/ /g, '-').replace(/color-/g, '');
              backgroundImage = bcSfFilterConfig.general.file_url.split('?')[0] + _file + '.png?v=' + bcSfFilterConfig.general.file_url.split('?')[1];
              backgroundImageURL = 'url(' + backgroundImage + ')';
              colorSwatchesHtml += '<li>';
              colorSwatchesHtml += '<div class="tooltip">' + dataColor + '</div>';
              colorSwatchesHtml += '<label style="background-color: ' + dataColor + '; background-image: '+ backgroundImageURL +';" ' + dataImg + '></label>';
              colorSwatchesHtml += '</li>';

            }
            var templist = colorlist + color + ' ';
            colorlist = templist;
            totalVariants++;
          }
        }
        if (totalVariants > 4) {
          colorSwatchesHtml += '<li class="boost-pfs-filter-item-swatch-more">';
          colorSwatchesHtml += '<div class="tooltip">More Colors</div>';
          colorSwatchesHtml += '<span style="display: inline-block">+' + (totalVariants - 4) + '</span>';        
          colorSwatchesHtml += '</li>';
          totalVariants = 0;
        }
      }
    }
    colorSwatchesHtml += '</ul>';


    return colorSwatchesHtml;
  }catch(e){
  	console.log("There is error which shows "+e.message); //Handling error  
  }  
}