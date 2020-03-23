import React from "react";
import sortBy from "lodash/sortBy";
import take from "lodash/take";
import SortListFilter from "./sort-list-filter";
import Checkbox from "../../common/checkbox";
import { labelForCategory } from "../../../helpers/helper";
import { Category } from "../../../helpers/helper";
import { Font } from "../../../types/font";
import FontsListItem from "./fonts-list-item";
import { Grid, Button, Container, Paper } from "@material-ui/core";
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
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <Button
          color="primary"
          endIcon={<ExpandMoreIcon />}
          onClick={handleClickSeeMore}
        >
          See more
        </Button>
      </Grid>
    );

  const toCheckboxLi = (category: Category) => {
    return (
      <Grid item xs={6} md={4} lg={2}>
        <Checkbox
          isChecked={isChecked(fontCategories, category)}
          handleChangeCheckbox={() => handleChangeCheckbox(category)}
          label={labelForCategory(category)}
        />
      </Grid>
    );
  };

  return (
    <Container>
      <Paper style={{ margin: "16px 0", padding: "16px" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <SortListFilter
              sortedBy={sortedBy}
              handleChangeSortBy={handleChangeSortBy}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "left" }}>
            <Grid container spacing={1}>
              {toCheckboxLi(Category.Serif)}
              {toCheckboxLi(Category.SansSerif)}
              {toCheckboxLi(Category.Display)}
              {toCheckboxLi(Category.Handwriting)}
              {toCheckboxLi(Category.Monospace)}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={4}>
        {fontsNode}
        {btnSeeMore}
      </Grid>
    </Container>
  );
}

export default FontsPage;

function isChecked(fontCategories: Category[], category: Category) {
  return fontCategories.includes(category);
}
