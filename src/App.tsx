import React from 'react';
import JsonViewer from './components/JsonViewer';
import HeadersPanel, { THeadersData } from './components/Headers';
import './app.css';

// const AUTO_EXPAND_MAX_SIZE = 100 * 1024;
// const AUTO_EXPAND_MAX_LEVE = 7;

type TAppProps = {
  json: any;
  headers?: THeadersData;
};

export default function App({ json, headers }: TAppProps) {
  return (
    <div className="wrapper">
      <div className="settings" />
      <div className="content">
        <HeadersPanel data={headers} />
        <JsonViewer json={json} />
      </div>
    </div>
  );
}
