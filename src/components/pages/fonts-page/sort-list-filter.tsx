import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { capitalize } from "../../../helpers/helper";

type Props = {
  sortedBy: string;
  handleChangeSortBy: (sortedBy: string) => void;
};

function SortListFilter(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { sortedBy, handleChangeSortBy } = props;

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePick = (sortedBy: string) => {
    handleChangeSortBy(sortedBy);
    handleClose();
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Sort by&nbsp;{capitalize(sortedBy)}
        <KeyboardArrowDownIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handlePick("popular")}>Popular</MenuItem>
        <MenuItem onClick={() => handlePick("alphabetical")}>
          Alphabetical
        </MenuItem>
      </Menu>
    </div>
  );
}

export default SortListFilter;
