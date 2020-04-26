const requestFilter: any = {
  urls: ["<all_urls>"],
  types: ["main_frame"],
};

const tabHeaders = new Map();
type tabDataType = string | boolean | number | any[] | object;

const deleteTabEntry = (tabId: number) => {
  tabHeaders.delete(tabId);
};

const saveTabEntry = (tabId: number, data: tabDataType) => {
  tabHeaders.set(tabId, data);
};

const getTabEntry = (tabId: number) => {
  return tabHeaders.get(tabId);
};

// Record request headers
chrome.webRequest.onSendHeaders.addListener(
  (details) => {
    console.log("Request Sent with headers", details);
    saveTabEntry(details.tabId, { requestHeaders: details.requestHeaders });
  },
  requestFilter,
  ["requestHeaders"]
);

// Record response headers
chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    console.log("Request successful with headers", details);
    let headers = {
      ...getTabEntry(details.tabId),
      responseHeaders: details.responseHeaders,
    };
    saveTabEntry(details.tabId, headers);
  },
  requestFilter,
  ["responseHeaders"]
);

// On error or request ignored delete tab's data
const errorCallback = (details: any) => {
  deleteTabEntry(details.tabId);
};

// @ts-ignore
chrome.webRequest.onActionIgnored.addListener(errorCallback);
chrome.webRequest.onErrorOccurred.addListener(errorCallback, requestFilter);

chrome.runtime.onMessage.addListener((message, sender) => {
  const { id } = sender.tab;

  switch (message.type) {
    case "getHeaders":
      chrome.tabs.sendMessage(
        id,
        { type: "headers", data: getTabEntry(id) },
        (success) => {
          if (success) {
            deleteTabEntry(id);
          }
        }
      );
      break;
    case "deleteTabEntry":
      deleteTabEntry(id);
      break;
  }
});
