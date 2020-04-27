import React from 'react';

type TToolbarButtonProps = {
  active: Boolean;
  disabled: Boolean;
  children: String;
};

type TToolbarProps = {
  children: JSX.Element[] | JSX.Element;
};

export const ToolbarButton = ({
  active,
  disabled,
  children,
}: TToolbarButtonProps) => {
  return <button className="btn">{children}</button>;
};

export default function Toolbar({children}: TToolbarProps) {
  return <div>{children}</div>;
}
