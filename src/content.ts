import renderApp from './App';

const documentBody = document.body;
const fisrtNode = documentBody.childNodes[0] as HTMLElement;
const isJsonPage = fisrtNode && fisrtNode.tagName === 'PRE';
let data = {};

if (isJsonPage) {
  try {
    data = JSON.parse(fisrtNode.innerText);
    chrome.runtime.sendMessage({ type: "getHeaders" });
  } catch (err) {
    chrome.runtime.sendMessage({ type: "deleteTabEntry" });
  }
} else {
  chrome.runtime.sendMessage({ type: "deleteTabEntry" });
}

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if('headers' === message.type) {
    renderApp({json: data, headers: message.data});
    sendResponse(true);
  }
});
