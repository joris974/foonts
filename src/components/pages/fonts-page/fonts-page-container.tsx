import React from "react";
import { allCategories } from "../../../helpers/helper";
import { Category } from "../../../helpers/helper";
import { Font } from "../../../types/font";
import FontsPage from "./fonts-page";

type Props = {
  fontList: Font[];
};

type State = {
  numMaxVisible: number;
  filteredFontList: Font[];
  fontCategories: Category[];
  sortedBy: string;
};

class FontsPageContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      numMaxVisible: 12,
      filteredFontList: props.fontList,
      fontCategories: allCategories(),
      sortedBy: "popular"
    };

    this.handleClickSeeMore = this.handleClickSeeMore.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.handleChangeSortBy = this.handleChangeSortBy.bind(this);
  }

  handleClickSeeMore() {
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
    return (
      <FontsPage
        {...this.props}
        {...this.state}
        handleChangeCheckbox={this.handleChangeCheckbox}
        handleClickSeeMore={this.handleClickSeeMore}
        handleChangeSortBy={this.handleChangeSortBy}
      />
    );
  }
}

export default FontsPageContainer;

function filterFontList(fontList: Font[], fontCategories: Category[]) {
  return fontList.filter((font: Font) =>
    fontCategories.includes(font.category)
  );
}
