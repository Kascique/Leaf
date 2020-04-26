/**
 * This template represents the 'JSON' panel. The panel is
 * responsible for rendering an expandable tree that allows simple
 * inspection of JSON structure.
 */

import React from "react";

// import TreeView from 'devtools/client/shared/components/tree/TreeView';

const JsonToolbar = () => {
  //
};

// const { REPS, MODE } = require("devtools/client/shared/components/reps/reps");
//   const { Rep } = REPS;

type JsonPanelProps = {
  data: string | number | boolean | any[] | object;
  dataSize: number;
  expandedNodes: Set<string>;
  searchFilter: string;
  actions: object;
};

export default function JsonPanel({
  data,
  dataSize,
  expandedNodes,
  searchFilter,
  actions,
}: JsonPanelProps) {
  // Attach event Listeners
  return <h3>JsonPanel</h3>;
}
