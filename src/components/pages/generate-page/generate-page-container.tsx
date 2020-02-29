import React from "react";
import {
  allCategories,
  randomFont,
  updateFontStyle
} from "../../../helpers/helper";
import { Font } from "../../../types/font";
import GeneratePage from "./generate-page";

const defaultTitleStyleProps = {
  fontSize: 36,
  fontWeight: "normal",
  fontStyle: "normal",
  fontCategories: allCategories()
};

const defaultContentStyleProps = {
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  fontCategories: allCategories()
};

type Props = {
  titleFont: Font;
  contentFont: Font;
  fontList: Font[];
  updateFonts: (titleFont: Font, contentFont: Font) => void;
};

type State = {
  isTitleLocked: boolean;
  isContentLocked: boolean;
  titleFontStyleProps: any;
  contentFontStyleProps: any;
};

class GeneratePageContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isTitleLocked: false,
      isContentLocked: false,
      titleFontStyleProps: defaultTitleStyleProps,
      contentFontStyleProps: defaultContentStyleProps
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateTitleStyle = this.updateTitleStyle.bind(this);
    this.updateContentStyle = this.updateContentStyle.bind(this);
    this.handleSwap = this.handleSwap.bind(this);
    this.handleClickGenerate = this.handleClickGenerate.bind(this);
    this.handleChangeLockTitle = this.handleChangeLockTitle.bind(this);
    this.handleChangeLockContent = this.handleChangeLockContent.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(event: any) {
    if (event.target.className.split(" ").includes("editable")) {
      return;
    }
    if (event.target instanceof HTMLButtonElement) {
      return;
    }

    if (event.keyCode === 32) {
      this.generate();
    }
  }

  handleSwap() {
    const { titleFont, contentFont, updateFonts } = this.props;

    const {
      isTitleLocked,
      isContentLocked,
      titleFontStyleProps,
      contentFontStyleProps
    } = this.state;

    const newTitleFontStyleProps = {
      fontSize: titleFontStyleProps.fontSize,
      fontWeight: contentFontStyleProps.fontWeight,
      fontStyle: contentFontStyleProps.fontStyle,
      fontCategories: contentFontStyleProps.fontCategories
    };

    const newContentFontStyleProps = {
      fontSize: contentFontStyleProps.fontSize,
      fontWeight: titleFontStyleProps.fontWeight,
      fontStyle: titleFontStyleProps.fontStyle,
      fontCategories: titleFontStyleProps.fontCategories
    };

    this.setState(
      {
        isTitleLocked: isContentLocked,
        isContentLocked: isTitleLocked,
        titleFontStyleProps: newTitleFontStyleProps,
        contentFontStyleProps: newContentFontStyleProps
      },
      () => {
        updateFonts(contentFont, titleFont);
      }
    );
  }

  handleClickGenerate(e: any) {
    this.generate();
  }

  updateTitleStyle(changeType: any, changeValue: any) {
    const { titleFontStyleProps } = this.state;
    const newTitleFontStyleProps = updateFontStyle(
      titleFontStyleProps,
      changeType,
      changeValue
    );
    this.setState({ titleFontStyleProps: newTitleFontStyleProps });
  }

  updateContentStyle(changeType: any, changeValue: any) {
    const { contentFontStyleProps } = this.state;
    const newContentFontStyleProps = updateFontStyle(
      contentFontStyleProps,
      changeType,
      changeValue
    );
    this.setState({ contentFontStyleProps: newContentFontStyleProps });
  }

  generate() {
    const { fontList, updateFonts } = this.props;

    if (fontList.length > 0) {
      const { titleFont, contentFont } = this.props;
      const {
        isTitleLocked,
        isContentLocked,
        titleFontStyleProps,
        contentFontStyleProps
      } = this.state;

      const randTitleFont = randomFont(
        fontList,
        titleFontStyleProps.fontCategories
      );
      const randContentFont = randomFont(
        fontList,
        contentFontStyleProps.fontCategories
      );

      const newTitleFont = isTitleLocked ? titleFont : randTitleFont;
      const newContentFont = isContentLocked ? contentFont : randContentFont;

      updateFonts(newTitleFont, newContentFont);
    }
  }

  handleChangeLockTitle() {
    this.setState(previousState => ({
      isTitleLocked: !previousState.isTitleLocked
    }));
  }

  handleChangeLockContent() {
    this.setState(previousState => ({
      isContentLocked: !previousState.isContentLocked
    }));
  }

  render() {
    const { titleFont, contentFont } = this.props;
    const {
      contentFontStyleProps,
      titleFontStyleProps,
      isTitleLocked,
      isContentLocked
    } = this.state;

    return (
      <GeneratePage
        titleFont={titleFont}
        titleFontStyleProps={titleFontStyleProps}
        contentFont={contentFont}
        contentFontStyleProps={contentFontStyleProps}
        isTitleLocked={isTitleLocked}
        isContentLocked={isContentLocked}
        updateTitleStyle={this.updateTitleStyle}
        updateContentStyle={this.updateContentStyle}
        handleSwap={this.handleSwap}
        handleClickGenerate={this.handleClickGenerate}
        handleChangeLockTitle={this.handleChangeLockTitle}
        handleChangeLockContent={this.handleChangeLockContent}
      />
    );
  }
}

export default GeneratePageContainer;
