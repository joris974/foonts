import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { capitalize } from "../../../helpers/helper";

type Props = {
  sortedBy: "recent" | "popular";
};

function SortListFilter(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const { sortedBy } = props;
  const navigate = useNavigate();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePick = (newSortedBy: "recent" | "popular") => {
    navigate(`/explore/${newSortedBy}`);
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
        <MenuItem onClick={() => handlePick("recent")}>Recent</MenuItem>
        <MenuItem onClick={() => handlePick("popular")}>Popular</MenuItem>
      </Menu>
    </div>
  );
}

export default SortListFilter;
