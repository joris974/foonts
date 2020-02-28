import React from "react";
import sortBy from "lodash/sortBy";
import take from "lodash/take";
import SortListFilter from "./sort-list-filter";
import Checkbox from "../../checkbox";
import { labelForCategory } from "../../../helpers/helper";
import { Category } from "../../../helpers/helper";
import { Font } from "../../../types/font";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import FontsListItem from "./fonts-list-item";

type Props = {
  fontList: Font[];
  numMaxVisible: number;
  filteredFontList: Font[];
  fontCategories: Category[];
  sortedBy: string;
  handleClickSeeMore: () => void;
  handleChangeCheckbox: (category: Category) => void;
  handleChangeSortBy: (sortBy: string) => void;
};

function FontsPage(props: Props) {
  const {
    numMaxVisible,
    filteredFontList,
    fontCategories,
    sortedBy,
    handleClickSeeMore,
    handleChangeCheckbox,
    handleChangeSortBy
  } = props;

  const sortedList = sortBy(filteredFontList, (font: Font) => {
    if (sortedBy === "alphabetical") {
      return font.family;
    } else if (sortedBy === "popular") {
      return -font.num_liked;
    }
  });
  const limitedResults = take(sortedList, numMaxVisible);

  const fontsNode = limitedResults.map(font => (
    <FontsListItem key={font.id} font={font} />
  ));

  const btnSeeMore =
    numMaxVisible > filteredFontList.length ? null : (
      <div className="row see-more-wrapper">
        <div className="col-xs-12 text-center">
          <Button variant="link" onClick={handleClickSeeMore}>
            See more <i className="fa fa-chevron-down"></i>
          </Button>
        </div>
      </div>
    );

  const toCheckboxLi = (category: Category) => {
    return (
      <li className="li-fixed-width">
        <Checkbox
          isChecked={isChecked(fontCategories, category)}
          handleChangeCheckbox={() => handleChangeCheckbox(category)}
          label={labelForCategory(category)}
        />
      </li>
    );
  };

  return (
    <Container>
      <div className="row">
        <div className="col-xs-12 col-lg-4 margin-top-lg">
          <SortListFilter
            sortedBy={sortedBy}
            handleChangeSortBy={handleChangeSortBy}
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
    </Container>
  );
}

export default FontsPage;

function isChecked(fontCategories: Category[], category: Category) {
  return fontCategories.includes(category);
}
