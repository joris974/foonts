import React, { useEffect, useRef, useState } from "react";
import {
  allCategories,
  randomFont,
  updateFontProperties,
  UpdateFontProperties,
} from "../../../helpers/helper";
import { Font } from "../../../types/font";
import GeneratePage from "./generate-page";
import { FontProperties } from "../../../types/font-style";

const defaultTitleStyleProps: FontProperties = {
  fontSize: 36,
  fontWeight: "normal",
  fontStyle: "normal",
  fontCategories: allCategories(),
};

const defaultContentStyleProps: FontProperties = {
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  fontCategories: allCategories(),
};

type Props = {
  titleFont: Font;
  contentFont: Font;
  fontList: Font[];
  updateFonts: (titleFont: Font, contentFont: Font) => void;
};

function GeneratePageContainer({
  titleFont,
  contentFont,
  fontList,
  updateFonts,
}: Props) {
  const [isTitleLocked, setIsTitleLocked] = useState(false);
  const [isContentLocked, setIsContentLocked] = useState(false);
  const [titleFontPropertiesProps, setTitleFontPropertiesProps] = useState(
    defaultTitleStyleProps,
  );
  const [contentFontPropertiesProps, setContentFontPropertiesProps] = useState(
    defaultContentStyleProps,
  );

  const generate = () => {
    if (fontList.length > 0) {
      const randTitleFont = randomFont(
        fontList,
        titleFontPropertiesProps.fontCategories,
      );
      const randContentFont = randomFont(
        fontList,
        contentFontPropertiesProps.fontCategories,
      );

      updateFonts(
        isTitleLocked ? titleFont : randTitleFont,
        isContentLocked ? contentFont : randContentFont,
      );
    }
  };

  const generateRef = useRef(generate);
  generateRef.current = generate;

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.closest(".editable")) {
        return;
      }
      if (target instanceof HTMLButtonElement) {
        return;
      }

      if (event.key === " ") {
        generateRef.current();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleSwap = () => {
    const newTitleFontPropertiesProps = {
      fontSize: titleFontPropertiesProps.fontSize,
      fontWeight: contentFontPropertiesProps.fontWeight,
      fontStyle: contentFontPropertiesProps.fontStyle,
      fontCategories: contentFontPropertiesProps.fontCategories,
    };

    const newContentFontPropertiesProps = {
      fontSize: contentFontPropertiesProps.fontSize,
      fontWeight: titleFontPropertiesProps.fontWeight,
      fontStyle: titleFontPropertiesProps.fontStyle,
      fontCategories: titleFontPropertiesProps.fontCategories,
    };

    setIsTitleLocked(isContentLocked);
    setIsContentLocked(isTitleLocked);
    setTitleFontPropertiesProps(newTitleFontPropertiesProps);
    setContentFontPropertiesProps(newContentFontPropertiesProps);
    updateFonts(contentFont, titleFont);
  };

  const handleClickGenerate = (_event: React.MouseEvent<HTMLElement>) => {
    generate();
  };

  const updateTitleFontProperties = (update: UpdateFontProperties) => {
    setTitleFontPropertiesProps((current) =>
      updateFontProperties(current, update),
    );
  };

  const updateContentFontProperties = (update: UpdateFontProperties) => {
    setContentFontPropertiesProps((current) =>
      updateFontProperties(current, update),
    );
  };

  const handleChangeLockTitle = () => setIsTitleLocked((current) => !current);
  const handleChangeLockContent = () =>
    setIsContentLocked((current) => !current);

  return (
    <GeneratePage
      titleFont={titleFont}
      titleFontPropertiesProps={titleFontPropertiesProps}
      contentFont={contentFont}
      contentFontPropertiesProps={contentFontPropertiesProps}
      isTitleLocked={isTitleLocked}
      isContentLocked={isContentLocked}
      updateTitleFontProperties={updateTitleFontProperties}
      updateContentFontProperties={updateContentFontProperties}
      handleSwap={handleSwap}
      handleClickGenerate={handleClickGenerate}
      handleChangeLockTitle={handleChangeLockTitle}
      handleChangeLockContent={handleChangeLockContent}
    />
  );
}

export default GeneratePageContainer;
