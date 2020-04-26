import React from 'react';
import ReactDOM from 'react-dom';

import HeadersPanel, { HeaderItem } from './components/HeadersPanel';
// import localeMap from 'devtools/client/locales/en-US/jsonview.properties'
// import Options from './options'

import './app.css';

// function render(text, headers, theme) {
//   // Save button click event
//   window.addEventListener('contentMessage', e => {
//     console.log('contentMessage', e.detail)
//     switch (e.detail.type) {
//       case 'save':
//         const link = document.createElement('a')
//         link.href = e.detail.value || ''

//         // /a -> a.json
//         // /a.json -> a.json
//         // /a.txt -> a.txt.json
//         // / -> download
//         let filename = location.href.split('/').slice(-1)[0] || 'download'
//         if (!/\.json$/.test(filename)) {
//           filename += '.json'
//         }

//         link.download = filename
//         link.click()
//     }
//   })

//   window.JSONView = {
//     json: new Text(text),
//     Locale: {
//       $STR: key => localeMap[key],
//     },
//     headers,
//   }
//   console.log('JSONView', window.JSONView)

//   // Set <html> attributes
//   let os
//   if (navigator.platform.startsWith('Win')) {
//     os = 'win'
//   } else if (navigator.platform.startsWith('Mac')) {
//     os = 'mac'
//   } else {
//     os = 'linux'
//   }
//   document.documentElement.setAttribute('platform', os)
//   // TODO: Set dir to ltr or rtl by browser default locale
//   // document.documentElement.setAttribute('dir', 'ltr')
//   setTheme(theme)

//   document.body.innerHTML = '<div id="content"></div><div id="options"></div>'

//   // Inject CSS
//   require('devtools/client/jsonview/css/main.css')
//   require('./reset.css')

//   // Render JSONView component
//   require('devtools/client/jsonview/json-viewer')
// }

// Promise.all([
//   new Promise(r => chrome.runtime.sendMessage({ type: 'headers' }, r)),
//   new Promise(r => chrome.storage.sync.get('theme', r)),
// ]).then(([headers, { theme }]) => {
//   if (!headers) {
//     headers = {
//       request: [],
//       response: [],
//     }
//   }
//   if (!themes.includes(theme)) {
//     theme = themes[0]
//   }
//   render(text, headers, theme)
// })

type appProps = {
    json: object,
    headers: {
        requestHeaders: HeaderItem[],
        responseHeaders: HeaderItem[]
    }
} 

export function App({ json , headers }: appProps) {
    return (
        <div className="wrapper">
            <div className="settings"></div>
            <div className="content">
                <HeadersPanel data={headers} />
            </div>
        </div>
    );
}

export default function renderApp(data: appProps) {
    const documentBody = document.body as HTMLElement;

    // hide the raw json shown by default
    const rawJson = documentBody.childNodes[0] as HTMLElement; // simplify using pre tag
    rawJson.hidden = true;

    // create an empty container to mount the app
    const appContainer = document.createElement('div');
    appContainer.id = 'p-json-view';
    documentBody.append(appContainer);

    ReactDOM.render(<App {...data}/>, document.getElementById('p-json-view'));
}
