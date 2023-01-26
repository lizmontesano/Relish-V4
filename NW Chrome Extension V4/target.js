console.log('target script ran');

var storedLegal = chrome.storage.local.get('newStorage', function (items) {
  console.log(items);

  //Item price
  // document.getElementById('price__input').focus();
  // document.execCommand('forwardDelete');
  // document.execCommand('forwardDelete');
  // document.execCommand('forwardDelete');
  // document.execCommand('forwardDelete');
  // document.execCommand('insertText', false, items.newStorage.src_productPrice);

  //Brand
  //This isn't working bc it's not sure if its index 5 or 2 bc of the dom changes
  //Probably add some if statement based on another attribute of this div or its parent/child nodes attributes ???
  var brandAction = 1
  document.querySelector('[data-testid = "listingBrands"]').addEventListener('click', function() {
    if (brandAction == 1) {
      document.execCommand('insertText', false, items.newStorage.src_productBrand)
      brandAction = 2
    }
    else {
      brandAction = 1
    }
  });
    
  // Select the node that will be observed for mutations
  const targetNode = document.querySelectorAll(".styles__Section-sc-__sc-1ft0np2-2.nFGTS")[0];
  console.log(targetNode);

  // Options for the observer (which mutations to observe)
  const config = { attributes: false, childList: true, subtree: false };

  // Callback function to execute when mutations are observed
  const callback = (mutationList, observer) => {
    //Need to put this in an if statement to see if they their category selection triggered dress length OR subcategory (most) or type (costume) 
    //Focus and fill length the first time this function is called
    document.getElementById('listingCategories__subcategory__select-label').focus();
    document.execCommand('insertText', false, items.newStorage.src_productSubCategory);
    
    //Need to either figure out a better event listener or set up another mutation observer
    var occasionAction = 0;
    document.querySelector('[data-testid = "occasion-attribute"]').addEventListener('click', function(){ 
      if (occasionAction == 0) {
        document.getElementById('occasion-attribute__select').focus();
        document.execCommand('insertText', false, items.newStorage.src_productOccasion);
        occasionAction = 1;
      }
      else {
        occasionAction = 0;
      }
    });

    var materialAction = 0;
    document.getElementsByClassName('sc-eEOqmf gjLpEj css-2b097c-container')[3].addEventListener('click', function(){ 
      if (materialAction == 0) {
        document.getElementById('material-attribute__select').focus();
        document.execCommand('insertText', false, items.newStorage.src_productMaterial);
        materialAction = 1;
      }
      else {
        materialAction = 0;
      }
    });

  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);

  //Description
  document.getElementById('description').focus();
  document.execCommand('insertText', false, items.newStorage.src_productBrand);
  document.execCommand('insertParagraph', false);
  document.execCommand('insertParagraph', false);
  document.execCommand('insertText', false, items.newStorage.src_productDescription);
  document.execCommand('insertParagraph', false);
  document.execCommand('insertParagraph', false);
  document.execCommand('insertText', false, '#' + items.newStorage.src_productBrand);

  //Category
  document.getElementById('listingCategories__category__select').focus();
  document.execCommand('insertText', false, items.newStorage.src_productCategory);

  //Color
  var colorAction = 1
  document.querySelector('[data-testid = "listingSelect__listing__colour"]').addEventListener('click', function() {
    if (colorAction == 1) {
      document.execCommand('insertText', false, items.newStorage.src_productColor)
      colorAction = 2
    }
    else {
      colorAction = 1
    }
  });

  //Source
  var sourceAction = 1
  document.querySelector('[data-testid = "listingSelect__source"]').addEventListener('click', function() {
    if (sourceAction == 1) {
      document.execCommand('insertText', false, items.newStorage.src_productSource)
      sourceAction = 2
    }
    else {
      sourceAction = 1
    }
  });

  //Age
  var ageAction = 1
  document.querySelector('[data-testid = "listingSelect__age"]').addEventListener('click', function() {
    if (ageAction == 1) {
      console.log('filling age')
      document.execCommand('insertText', false, items.newStorage.src_productAge)
      ageAction = 2
    }
    else {
      ageAction = 1
    }
  });

  //Style (hard code glam)
  var styleAction = 1
  document.getElementsByClassName('sc-eEOqmf gjLpEj css-2b097c-container')[6].addEventListener('click', function() {
    if (styleAction == 1) {
      document.execCommand('insertText', false, items.newStorage.src_productStyle)
      styleAction = 2
    }
    else {
      styleAction = 1
    }
  });

  //Location (hard code USA)
  var countryAction = 1
  document.getElementsByClassName('sc-eEOqmf gjLpEj css-2b097c-container')[7].addEventListener('click', function() {
    if (countryAction == 1) {
      document.execCommand('insertText', false, 'United States')
      countryAction = 2
    }
    else {
      countryAction = 1
    }
  });

});