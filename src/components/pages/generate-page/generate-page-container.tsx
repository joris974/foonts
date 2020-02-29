import React from "react";
import {
  allCategories,
  randomFont,
  updateFontProperties
} from "../../../helpers/helper";
import { Font } from "../../../types/font";
import GeneratePage from "./generate-page";
import { FontProperties } from "../../../types/font-style";

const defaultTitleStyleProps: FontProperties = {
  fontSize: 36,
  fontWeight: "normal",
  fontStyle: "normal",
  fontCategories: allCategories()
};

const defaultContentStyleProps: FontProperties = {
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
  titleFontPropertiesProps: FontProperties;
  contentFontPropertiesProps: FontProperties;
};

class GeneratePageContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isTitleLocked: false,
      isContentLocked: false,
      titleFontPropertiesProps: defaultTitleStyleProps,
      contentFontPropertiesProps: defaultContentStyleProps
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
      titleFontPropertiesProps,
      contentFontPropertiesProps
    } = this.state;

    const newTitleFontPropertiesProps = {
      fontSize: titleFontPropertiesProps.fontSize,
      fontWeight: contentFontPropertiesProps.fontWeight,
      fontStyle: contentFontPropertiesProps.fontStyle,
      fontCategories: contentFontPropertiesProps.fontCategories
    };

    const newContentFontPropertiesProps = {
      fontSize: contentFontPropertiesProps.fontSize,
      fontWeight: titleFontPropertiesProps.fontWeight,
      fontStyle: titleFontPropertiesProps.fontStyle,
      fontCategories: titleFontPropertiesProps.fontCategories
    };

    this.setState(
      {
        isTitleLocked: isContentLocked,
        isContentLocked: isTitleLocked,
        titleFontPropertiesProps: newTitleFontPropertiesProps,
        contentFontPropertiesProps: newContentFontPropertiesProps
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
    const { titleFontPropertiesProps } = this.state;
    const newTitleFontPropertiesProps = updateFontProperties(
      titleFontPropertiesProps,
      changeType,
      changeValue
    );
    this.setState({ titleFontPropertiesProps: newTitleFontPropertiesProps });
  }

  updateContentStyle(changeType: any, changeValue: any) {
    const { contentFontPropertiesProps } = this.state;
    const newContentFontPropertiesProps = updateFontProperties(
      contentFontPropertiesProps,
      changeType,
      changeValue
    );
    this.setState({
      contentFontPropertiesProps: newContentFontPropertiesProps
    });
  }

  generate() {
    const { fontList, updateFonts, titleFont, contentFont } = this.props;

    if (fontList.length > 0) {
      const {
        isTitleLocked,
        isContentLocked,
        titleFontPropertiesProps,
        contentFontPropertiesProps
      } = this.state;

      const randTitleFont = randomFont(
        fontList,
        titleFontPropertiesProps.fontCategories
      );
      const randContentFont = randomFont(
        fontList,
        contentFontPropertiesProps.fontCategories
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
      contentFontPropertiesProps,
      titleFontPropertiesProps,
      isTitleLocked,
      isContentLocked
    } = this.state;

    return (
      <GeneratePage
        titleFont={titleFont}
        titleFontPropertiesProps={titleFontPropertiesProps}
        contentFont={contentFont}
        contentFontPropertiesProps={contentFontPropertiesProps}
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
