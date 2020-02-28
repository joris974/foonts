import React from "react";
import capitalize from "lodash/capitalize";
import Dropdown from "react-bootstrap/Dropdown";

type Props = {
  sortedBy: string;
  handleChangeSortBy: (sortedBy: string) => void;
};

function SortListFilter(props: Props) {
  const { sortedBy, handleChangeSortBy } = props;

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-sort-by" variant="link">
        Sort by&nbsp;{capitalize(sortedBy)}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleChangeSortBy("popular")}>
          Popular
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleChangeSortBy("alphabetical")}>
          Alphabetical
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortListFilter;
