import React from "react";

import _ from "lodash";
import FontListItem from "./font-list-item";
import SortListFilter from "./sort-list-filter.js";
import Checkbox from "../checkbox.js";
import { allCategories, labelForCategory } from "../../helpers/helper";
import { Category } from "../../helpers/helper";
import { Font } from "./font-list-item";

interface Props {
  fontList: Font[];
}

interface State {
  numMaxVisible: number;
  filteredFontList: Font[];
  fontCategories: Category[];
  sortedBy: string;
}

const filterFontList = function(fontList: Font[], fontCategories: Category[]) {
  return fontList.filter((font: Font) =>
    fontCategories.includes(font.category)
  );
};

const isChecked = function(fontCategories: Category[], category: Category) {
  return fontCategories.includes(category);
};

class FontsPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      numMaxVisible: 12,
      filteredFontList: props.fontList,
      fontCategories: allCategories(),
      sortedBy: "popular"
    };
  }

  onClickSeeMore() {
    this.setState({ numMaxVisible: this.state.numMaxVisible + 12 });
  }

  handleChangeCheckbox(category: Category) {
    const { fontCategories } = this.state;

    const newFontCategories = Object.values(fontCategories).includes(category)
      ? fontCategories.filter(c => c !== category)
      : [...fontCategories, category];

    const filteredFontList = filterFontList(
      this.props.fontList,
      newFontCategories
    );
    this.setState({ fontCategories: newFontCategories, filteredFontList });
  }

  handleChangeSortBy(sortBy: string) {
    const { sortedBy } = this.state;
    if (sortBy === sortedBy) {
      return;
    }
    this.setState({ sortedBy: sortBy });
  }

  render() {
    const {
      numMaxVisible,
      filteredFontList,
      fontCategories,
      sortedBy
    } = this.state;

    const sortedList = _.chain(filteredFontList)
      .sortBy((font: Font) => {
        if (sortedBy === "alphabetical") {
          return font.family;
        } else if (sortedBy === "popular") {
          return -font.num_liked;
        }
      })
      .take(numMaxVisible)
      .value();

    const fontsNode = _.map(sortedList, font => {
      return <FontListItem key={font.id} font={font} />;
    });

    const btnSeeMore =
      numMaxVisible > filteredFontList.length ? null : (
        <div className="row see-more-wrapper">
          <div className="col-xs-12 text-center">
            <button
              className="btn btn-default"
              onClick={this.onClickSeeMore.bind(this)}
            >
              See more <i className="fa fa-chevron-down"></i>
            </button>
          </div>
        </div>
      );

    const toCheckboxLi = (category: Category) => {
      return (
        <li className="li-fixed-width">
          <Checkbox
            isChecked={isChecked(fontCategories, category)}
            handleChangeCheckbox={this.handleChangeCheckbox.bind(
              this,
              category
            )}
            label={labelForCategory(category)}
          />
        </li>
      );
    };

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-lg-4 margin-top-lg">
              <SortListFilter
                sortedBy={sortedBy}
                handleChangeSortBy={this.handleChangeSortBy.bind(this)}
              />
            </div>
            <div className="col-xs-12 col-lg-8 margin-top-lg">
              <ul className="list-inline">
                {toCheckboxLi(Category.Serif)}
                {toCheckboxLi(Category.SansSerif)}
                {toCheckboxLi(Category.Display)}
                {toCheckboxLi(Category.Handwriting)}
                {toCheckboxLi(Category.Monospace)}
              </ul>
            </div>
          </div>

          {fontsNode}
          {btnSeeMore}
        </div>
      </div>
    );
  }
}

export default FontsPage;
