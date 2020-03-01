import React from "react";
import sortBy from "lodash/sortBy";
import take from "lodash/take";
import SortListFilter from "./sort-list-filter";
import Checkbox from "../../common/checkbox";
import { labelForCategory } from "../../../helpers/helper";
import { Category } from "../../../helpers/helper";
import { Font } from "../../../types/font";
import FontsListItem from "./fonts-list-item";
import { Grid, Button, Container } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
    <Grid item xs={12} key={font.id}>
      <FontsListItem font={font} />
    </Grid>
  ));

  const btnSeeMore =
    numMaxVisible > filteredFontList.length ? null : (
      <Grid container spacing={10}>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Button
            color="primary"
            endIcon={<ExpandMoreIcon />}
            onClick={handleClickSeeMore}
          >
            See more
          </Button>
        </Grid>
      </Grid>
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
      <Grid container spacing={4}>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <SortListFilter
            sortedBy={sortedBy}
            handleChangeSortBy={handleChangeSortBy}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <ul className="list-inline">
            {toCheckboxLi(Category.Serif)}
            {toCheckboxLi(Category.SansSerif)}
            {toCheckboxLi(Category.Display)}
            {toCheckboxLi(Category.Handwriting)}
            {toCheckboxLi(Category.Monospace)}
          </ul>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        {fontsNode}
      </Grid>
      {btnSeeMore}
    </Container>
  );
}

export default FontsPage;

function isChecked(fontCategories: Category[], category: Category) {
  return fontCategories.includes(category);
}
