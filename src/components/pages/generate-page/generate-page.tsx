import React from "react";
import { Font } from "../../../types/font";
import Spinner from "../../common/spinner";
import Fonts from "../../common/fonts";
import Sidebar from "./sidebar";
import EditableTitle from "./editable-title";
import EditableContent from "./editable-content";
import { FontProperties } from "../../../types/font-style";
import { UpdateFontProperties } from "../../../helpers/helper";
import { Container, Grid } from "@material-ui/core";

type Props = {
  titleFont: Font;
  titleFontPropertiesProps: FontProperties;
  contentFont: Font;
  contentFontPropertiesProps: FontProperties;
  isTitleLocked: boolean;
  isContentLocked: boolean;
  updateTitleFontProperties: (update: UpdateFontProperties) => void;
  updateContentFontProperties: (update: UpdateFontProperties) => void;
  handleSwap: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  handleClickGenerate: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
  handleChangeLockTitle: () => void;
  handleChangeLockContent: () => void;
};

function GeneratePage(props: Props) {
  const {
    titleFont,
    titleFontPropertiesProps,
    contentFont,
    contentFontPropertiesProps,
    isTitleLocked,
    isContentLocked,
    updateTitleFontProperties,
    updateContentFontProperties,
    handleSwap,
    handleClickGenerate,
    handleChangeLockTitle,
    handleChangeLockContent
  } = props;

  if (!titleFont || !contentFont) {
    return <Spinner />;
  }

  const fontFacesNode = [titleFont, contentFont].map((font: Font) => (
    <Fonts key={font.family} fontName={font.family} fontUrl={font.url} />
  ));

  return (
    <Container>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Sidebar
            titleFont={titleFont}
            titleFontPropertiesProps={titleFontPropertiesProps}
            onChangeTitleFontProperty={updateTitleFontProperties}
            contentFont={contentFont}
            contentFontPropertiesProps={contentFontPropertiesProps}
            onChangeContentFontProperty={updateContentFontProperties}
            isTitleLocked={isTitleLocked}
            isContentLocked={isContentLocked}
            onChangeLockTitle={handleChangeLockTitle}
            onChangeLockContent={handleChangeLockContent}
            onClickSwap={handleSwap}
            onClickGenerate={handleClickGenerate}
          />
        </Grid>
        <Grid item xs={6}>
          <EditableTitle
            font={titleFont}
            fontStyleProps={titleFontPropertiesProps}
          />
          <EditableContent
            font={contentFont}
            fontStyleProps={contentFontPropertiesProps}
          />
        </Grid>
      </Grid>
      {fontFacesNode}
    </Container>
  );
}

export default GeneratePage;
