import React, { ReactNode } from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";

type Props = {
  isChecked: boolean;
  label: string | ReactNode;
  handleChangeCheckbox: (x: any) => void;
};

export default function MyCheckbox(props: Props) {
  const { isChecked, label, handleChangeCheckbox } = props;
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={isChecked}
          onChange={handleChangeCheckbox}
          color="primary"
        />
      }
      label={label}
    />
  );
}
