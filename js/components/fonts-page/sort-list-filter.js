import React from 'react'
import _ from 'lodash'

class SortListFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {showDropdown: false}
  }

  handleClickChange() {
    this.setState({showDropdown: !this.state.showDropdown})
  }

  handleChangeSortBy(sortBy) {
    this.props.handleChangeSortBy(sortBy)
    this.setState({showDropdown: false})
  }

  render() {
    const {sortedBy} = this.props
    const {showDropdown} = this.state

    return (
      <div>
        <div className="sort-filter">
          <div className="sort-filter-title">
            Sort by <span className="sort-filter-label" onClick={this.handleClickChange.bind(this)}>{_.capitalize(sortedBy)} <i className="fa fa-chevron-down"></i></span>
          </div>
        </div>
        <div className={`sort-filter-options ${showDropdown ? 'active' : ''}`}>
          <ul className="list-unstyled">
            <li onClick={this.handleChangeSortBy.bind(this, "popular")}>Popular</li>
            <li onClick={this.handleChangeSortBy.bind(this, "alphabetical")}>Alphabetical</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default SortListFilter
