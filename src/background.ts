const requestFilter: any = {
  urls: ["<all_urls>"],
  types: ["main_frame"],
};
const jsonContentType = /^application\/([a-z]+\+)?json($|;)/;
const headersDB = new Map();
type tabDataType = string | boolean | number | any[] | object;

const deleteTabEntry = (tabId: number) => {
  headersDB.delete(tabId);
};

const saveTabEntry = (tabId: number, data: tabDataType) => {
  headersDB.set(tabId, data);
};

const getTabEntry = (tabId: number) => {
  return headersDB.get(tabId);
};

// Record request headers
chrome.webRequest.onSendHeaders.addListener(
  (details: chrome.webRequest.WebRequestHeadersDetails) => {
    saveTabEntry(details.tabId, { requestHeaders: details.requestHeaders });
  },
  requestFilter,
  ["requestHeaders"]
);

// Record response headers
chrome.webRequest.onHeadersReceived.addListener(
  (details: chrome.webRequest.WebResponseHeadersDetails) => {
    for (let header of details.responseHeaders) {
      if (
        header.name.toLowerCase() === "content-type" &&
        header.value &&
        jsonContentType.test(header.value)
      ) {
        let headers = {
          ...getTabEntry(details.tabId),
          responseHeaders: details.responseHeaders,
        };
        saveTabEntry(details.tabId, headers);
        break;
      } else {
        deleteTabEntry(details.tabId);
        break;
      }
    }
  },
  requestFilter,
  ["responseHeaders"]
);

// On error or request to get headers ignored, delete tab's data
const errorCallback = (details: chrome.webRequest.WebResponseErrorDetails) => {
  deleteTabEntry(details.tabId);
};

// @ts-ignore
chrome.webRequest.onActionIgnored.addListener(errorCallback);
chrome.webRequest.onErrorOccurred.addListener(errorCallback, requestFilter);

chrome.runtime.onMessage.addListener(
  (
    message: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    const { id, url } = sender.tab;
    const shouldRenderUi = () => {
      if (url.startsWith("file://") && url.endsWith(".json")) {
        sendResponse({ render: true });
      } else if (getTabEntry(id)) {
        sendResponse({ render: true, headers: getTabEntry(id) });
      } else {
        sendResponse({ render: false });
      }
    };

    switch (message.type) {
      case "get-data":
        shouldRenderUi();
        deleteTabEntry(id);
        break;
      case "delete-tab-entry":
        deleteTabEntry(id);
        break;
    }
  }
);
