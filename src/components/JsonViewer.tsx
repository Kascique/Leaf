/**
 * This component is responsible for parsing SON content
 * and rendering it as a tree.
 */

import React from 'react';

export default function JsonViewer(json: any) {
  return (
    <div>
      <h2>JsonViewer</h2>
      <pre>{json.toString()}</pre>
    </div>
  );
}
