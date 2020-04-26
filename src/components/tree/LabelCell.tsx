import React from "react";

type LabelCellProps = {
  id: number;
  member: object;
};

export default function LabelCell({ id, member }: LabelCellProps) {
  // const level = member.level || 0;
  const iconClassList = ["treeIcon"];

  return <h4>Hii</h4>;
}
