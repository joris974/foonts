import React from "react";
import _ from "lodash";

type Props = {
  sortedBy: string;
  handleChangeSortBy: (sortedBy: string) => void;
};
type State = {
  showDropdown: boolean;
};

class SortListFilter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { showDropdown: false };
  }

  handleToggleDropdown() {
    this.setState({ showDropdown: !this.state.showDropdown });
  }

  handleChangeSortBy(sortBy: string) {
    this.props.handleChangeSortBy(sortBy);
    this.setState({ showDropdown: false });
  }

  render() {
    const { sortedBy } = this.props;
    const { showDropdown } = this.state;

    return (
      <div>
        <div className="sort-filter">
          <div className="sort-filter-title">
            Sort by&nbsp;
            <span
              className="sort-filter-label"
              onClick={this.handleToggleDropdown.bind(this)}
            >
              {_.capitalize(sortedBy)} <i className="fa fa-chevron-down"></i>
            </span>
          </div>
        </div>
        <div className={`sort-filter-options ${showDropdown ? "active" : ""}`}>
          <ul className="list-unstyled">
            <li onClick={this.handleChangeSortBy.bind(this, "popular")}>
              Popular
            </li>
            <li onClick={this.handleChangeSortBy.bind(this, "alphabetical")}>
              Alphabetical
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default SortListFilter;
