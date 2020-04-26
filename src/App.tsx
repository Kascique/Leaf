import React from "react";

import HeadersPanel, { THeadersData } from "./components/HeadersPanel";
import "./app.css";

type TAppProps = {
  json: object;
  headers?: THeadersData;
};

export default function App({ json, headers }: TAppProps) {
  return (
    <div className="wrapper">
      <div className="settings"></div>
      <div className="content">
        <HeadersPanel data={headers} />
      </div>
    </div>
  );
}
