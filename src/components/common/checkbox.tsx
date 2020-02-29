import React, { ReactNode } from "react";

type Props = {
  isChecked: boolean;
  label: string | ReactNode;
  handleChangeCheckbox: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
};

export default function Checkbox(props: Props) {
  const { isChecked, label, handleChangeCheckbox } = props;
  const icon = isChecked ? (
    <span className="custom-checkbox-icon fa fa-2x fa-check-square"></span>
  ) : (
    <span className="custom-checkbox-icon fa fa-2x fa-square"></span>
  );

  return (
    <div
      className={`custom-checkbox ${isChecked ? "checked" : ""}`}
      onClick={handleChangeCheckbox}
    >
      {icon}
      <span className="custom-checkbox-label">{label}</span>
    </div>
  );
}
