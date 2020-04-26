/**
 * This template is responsible for rendering basic layout
 * of the 'Headers' panel. It displays HTTP headers groups such as
 * received or response headers.
 */

import React from 'react';

export type HeaderItem = {
    name: string,
    value: string
}

type HeaderListProps = {
    headers: HeaderItem[]
}

export const HeaderList = ({ headers }: HeaderListProps) => {
    // Alphabatically sort headers
    headers.sort((a, b) => a.name > b.name ? 1 : -1);

    const headerRows = headers.map((header) => (
        <tr className="header" key={header.name}>
            <td className="header__name">{header.name}</td>
            <td className="header__value">{header.value}</td>
        </tr>
    ));

    return (
        <table>
            <tbody>{headerRows}</tbody>
        </table>
    )
}

type HeadersProps = {
    data: {
        requestHeaders: HeaderItem[],
        responseHeaders: HeaderItem[]
    }
}

export default function HeadersPanel({ data } : HeadersProps) {
    return (
        <div className="headers-container">
            <div className="headers">
                <h2>Request Headers</h2>
                <HeaderList headers={data.requestHeaders} />
            </div>
            <div className="headers">
                <h2>Response Headers</h2>
                <HeaderList headers={data.responseHeaders} />
            </div>
        </div>
    )
}
