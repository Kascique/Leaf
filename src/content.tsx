import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { THeadersData } from './components/Headers';

/**
 * This script runs on every page. It communicates with the background script
 * to help decide whether to treat the contents of the page as JSON.
 */

// eslint-disable-next-line no-undef
chrome.runtime.sendMessage(
  { type: 'get-data' },
  ({ render, headers }: { render: boolean; headers?: THeadersData }) => {
    if (!render) {
      return;
    }

    try {
      const rawContent = document.querySelector('pre').innerText;
      const jsonObj = JSON.parse(rawContent);

      document.documentElement.innerHTML = '<div id="pretty-json-view"></div>';
      ReactDOM.render(
        <App json={jsonObj} headers={headers} />,
        document.querySelector('#pretty-json-view')
      );
    } catch (err) {
      // eslint-disable-next-line no-undef
      chrome.runtime.sendMessage({ type: 'delete-tab-entry' });
    }
  }
);
