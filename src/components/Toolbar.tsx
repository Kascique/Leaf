import React from 'react';

type ToolbarButtonProps = {
    active: Boolean,
    disabled: Boolean,
    children: String,
}

type ToolbarProps = {
    children: JSX.Element[] | JSX.Element,
}

export const ToolbarButton = ({ active, disabled, children }: ToolbarButtonProps) => {
    return <button className="btn">{children}</button>;
}

export default function Toolbar({ children }: ToolbarProps) {
    return <div>{children}</div>;
}