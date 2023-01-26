// Function to get + decode API key (just like the saveKey function in reverse)
const getKey = () => {
  return new Promise((resolve, reject) => {
      chrome.storage.local.get(['openai-key'], (result) => {
        if (result['openai-key']) {
          const decodedKey = atob(result['openai-key']);
          resolve(decodedKey);
        }
      });
    });
};

const generate = async (prompt) => {
  // Get your API key from storage
const key = await getKey();
const url = 'https://api.openai.com/v1/completions';

// Call completions endpoint
const completionResponse = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${key}`,
  },
  body: JSON.stringify({
    model: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 1250,
    temperature: 0.7,
  }),
});

// Select the top choice and send back
const completion = await completionResponse.json();
return completion.choices.pop();
};

var productInformationArr;

const generateCompletionAction = async (info) => {
try {
  // Send mesage with generating text (this will be like a loading indicator)
  //sendMessage('generating...');

  //const { selectionText } = info;
  const basePromptPrefix = 
  `
  Based on a URL, determine the following fields. For some fields a list of options will be presented. Select only one word from each list of options. Provide the result in a comma seperated list that does not include the field name, like this: "tops, sweaters, casual"

  Brand:
  Description:
  Categories: Tops, bottoms, dresses, coats and jackets, jumpsuits and rompers, suits, footwear, accessories, sleepwear, underwear, swimwear, costume.
  Subcategories: T-shirts, hoodies, sweatshirts, sweaters, cardigans, shirts, polo shirts, blouses, crop tops, tank tops and camis, corsets, bodysuits, other
  Occasions: Casual, festival, gifting, going out, outdoors, party, relaxation, school, ski, special occasion, summer, holiday, winter, work, work out. 
  Colors: Black, grey, white, brown, tan, cream, yellow, red, burgundy, orange, pink, purple, blue, navy, green, khaki, multi, silver, gold
  Material: cashmere, corduroy, cotton, denim, embellished, faux fur, leather, fleece, jersey, knitted, lace, linen, silk, suede, tweed, velvet, wool, rayon
  
  Here's the URL: `;
  //Add this to call GPT-3
  const baseCompletion = await generate(`${basePromptPrefix}${info}`);

  //console.log(baseCompletion.text)
  //baseCompletion.text.replace(/\s+/g, '');
  productInformationArr = baseCompletion.text.split(',');
  console.log(productInformationArr);
  
    var productBrand = productInformationArr[0];
    //var productName = document.getElementsByClassName('pdp__name font-size--20')[0].innerText;
    var productDescription = productInformationArr[1];
    var productCategory = productInformationArr[2];
    var productSubCategory = productInformationArr[3];
    //var productPrice = document.getElementsByClassName('price--reduced')[0].innerText;
    var productOccasion = productInformationArr[4];
    var productColor = productInformationArr[5];
    var productMaterial = productInformationArr[6];
    var productAge = 'Modern'
    var productStyle = 'Casual'
    var productSource = 'Preloved'

    var storArray = {
        src_productBrand: productBrand.replace(/\s+/g, ''),
        //src_productName: productName,
        src_productDescription: productDescription.trim(),
        src_productCategory: productCategory,
        src_productSubCategory: productSubCategory,
        //src_productPrice: productPrice,
        src_productOccasion: productOccasion,
        src_productMaterial: productMaterial,
        src_productColor: productColor,
        src_productAge: productAge,
        src_productStyle: productStyle,
        src_productSource: productSource
    };
    
    chrome.storage.local.set({
            'newStorage': storArray
    });

} catch (error) {
  console.log(error);
  //sendMessage(error.toString())
}
};

var storedLegal1 = chrome.storage.local.get('url', function (items) {
    var productInformation = generateCompletionAction(items.url);
    // var productInformationArr = productInformation.split(",");
    // console.log(productInformationArr)
});

console.log('source script ran');