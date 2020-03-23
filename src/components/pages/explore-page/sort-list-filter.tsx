import React from "react";
import capitalize from "lodash/capitalize";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

type Props = RouteComponentProps<{}> & {
  sortedBy: "recent" | "popular";
};

function SortListFilter(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { sortedBy, history } = props;

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePick = (newSortedBy: "recent" | "popular") => {
    history.push(`/explore/${newSortedBy}`);
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

export default withRouter(SortListFilter);
