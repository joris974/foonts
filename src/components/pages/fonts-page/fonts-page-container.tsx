import React, { useState } from "react";
import { allCategories } from "../../../helpers/helper";
import { Category } from "../../../helpers/helper";
import { Font } from "../../../types/font";
import FontsPage from "./fonts-page";

type Props = {
  fontList: Font[];
};

function FontsPageContainer({ fontList }: Props) {
  const [numMaxVisible, setNumMaxVisible] = useState(12);
  const [fontCategories, setFontCategories] =
    useState<Category[]>(allCategories());
  const [sortedBy, setSortedBy] = useState("popular");
  const [filteredFontList, setFilteredFontList] = useState(fontList);

  const handleClickSeeMore = () => setNumMaxVisible((current) => current + 12);

  const handleChangeCheckbox = (category: Category) => {
    const newFontCategories = fontCategories.includes(category)
      ? fontCategories.filter((c) => c !== category)
      : [...fontCategories, category];

    setFontCategories(newFontCategories);
    setFilteredFontList(filterFontList(fontList, newFontCategories));
  };

  const handleChangeSortBy = (sortBy: string) => {
    if (sortBy === sortedBy) {
      return;
    }
    setSortedBy(sortBy);
  };

  return (
    <FontsPage
      fontList={fontList}
      numMaxVisible={numMaxVisible}
      filteredFontList={filteredFontList}
      fontCategories={fontCategories}
      sortedBy={sortedBy}
      handleChangeCheckbox={handleChangeCheckbox}
      handleClickSeeMore={handleClickSeeMore}
      handleChangeSortBy={handleChangeSortBy}
    />
  );
}

export default FontsPageContainer;

function filterFontList(fontList: Font[], fontCategories: Category[]) {
  return fontList.filter((font: Font) =>
    fontCategories.includes(font.category),
  );
}
