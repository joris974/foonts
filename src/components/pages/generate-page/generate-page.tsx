import React from "react";
import { Font } from "../../../types/font";
import Spinner from "../../spinner";
import Fonts from "../../fonts";
import Sidebar from "../../sidebar";
import EditableTitle from "../../editable-title";
import EditableContent from "../../editable-content";
import { FontProperties } from "../../../types/font-style";

type Props = {
  titleFont: Font;
  titleFontPropertiesProps: FontProperties;
  contentFont: Font;
  contentFontPropertiesProps: FontProperties;
  isTitleLocked: boolean;
  isContentLocked: boolean;
  updateTitleStyle: Function;
  updateContentStyle: Function;
  handleSwap: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  handleClickGenerate: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
  handleChangeLockTitle: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
  handleChangeLockContent: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
};

function GeneratePage(props: Props) {
  const {
    titleFont,
    titleFontPropertiesProps,
    contentFont,
    contentFontPropertiesProps,
    isTitleLocked,
    isContentLocked,
    updateTitleStyle,
    updateContentStyle,
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
    <div>
      {fontFacesNode}

      <div className="container">
        <div className="row margin-top-lg">
          <div className="col-xs-12 col-sm-offset-0 col-sm-4">
            <Sidebar
              titleFont={titleFont}
              titleFontPropertiesProps={titleFontPropertiesProps}
              onChangeTitleStyle={updateTitleStyle}
              contentFont={contentFont}
              contentFontPropertiesProps={contentFontPropertiesProps}
              onChangeContentStyle={updateContentStyle}
              isTitleLocked={isTitleLocked}
              isContentLocked={isContentLocked}
              onChangeLockTitle={handleChangeLockTitle}
              onChangeLockContent={handleChangeLockContent}
              onClickSwap={handleSwap}
              onClickGenerate={handleClickGenerate}
            />
          </div>
          <div className="col-xs-12 col-sm-8">
            <EditableTitle
              font={titleFont}
              fontStyleProps={titleFontPropertiesProps}
            />
            <EditableContent
              font={contentFont}
              fontStyleProps={contentFontPropertiesProps}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneratePage;
