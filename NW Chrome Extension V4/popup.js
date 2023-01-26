const checkForKey = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(['openai-key'], (result) => {
            resolve(result['openai-key']);
        });
    });
};

const encode = (input) => {
    return btoa(input);
  };

const saveKey = () => {
    const input = document.getElementById('key_input');

    if(input) {
        const { value } = input
        //Encode string
        const encodedValue = encode(value);
        //Save to google storage
        chrome.storage.local.set({ 'openai-key': encodedValue }, () => {
            document.getElementById('key_needed').style.display = 'block';
            //document.getElementById('key_entered').style.display = 'block';
        });
        document.getElementById("save_key_button").innerHTML = "Added!";
    }
};

// const changeKey = () => {
//     document.getElementById('key_needed').style.display = 'block';
//     document.getElementById('key_entered').style.display = 'none';
// };

document.getElementById('save_key_button').addEventListener('click', saveKey);
// document
//     .getElementById('change_key_button')
//     .addEventListener('click', changeKey);

checkForKey().then((response) => {
    if (response) {
      document.getElementById('key_needed').style.display = 'none';
      //document.getElementById('key_entered').style.display = 'block';
    }
});

async function doSource(){
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['source.js'],
    })

    chrome.storage.local.set({
        'url': tab.url
    });

    var buttonText = document.getElementById("btnSource");
    if (buttonText.innerHTML == "Copy") buttonText.innerHTML = "Copied!";
    else buttonText.innerHTML = "Copy";
};

async function doTarget(){
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['target.js'],
    })
    var buttonText = document.getElementById("btnTarget");
    if (buttonText.innerHTML == "Paste") { 
        buttonText.innerHTML = "Pasted!"
    }
    else {
        buttonText.innerHTML = "Pasted";
    }
};
    
document.getElementById("btnSource").onclick = doSource;
document.getElementById("btnTarget").onclick = doTarget;