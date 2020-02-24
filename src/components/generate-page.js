import { withRouter } from "react-router-dom";
import React from "react";
import _ from "lodash";

import { sendFontPairingToApi } from "./../helpers/api.js";

import Sidebar from "./sidebar.js";
import Spinner from "./spinner.js";
import Fonts from "./fonts.js";
import EditableTitle from "./editable-title.js";
import EditableContent from "./editable-content.js";
import ApplicationMeta from "./application-meta.js";
import {
  fontsFromUrlParams,
  updateFontStyle,
  fontsToUrl,
  allCategories,
  randomFont
} from "./../helpers/helper.js";

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

class GeneratePage extends React.Component {
  constructor(props) {
    super(props);

    let fromParams;
    if (!_.isEmpty(props.params.fonts)) {
      fromParams = fontsFromUrlParams(this.props.params.fonts, props.fontList);
    }
    const titleFont = fromParams ? fromParams.titleFont : null;
    const contentFont = fromParams ? fromParams.contentFont : null;

    this.state = {
      titleFont,
      contentFont,
      isTitleLocked: false,
      isContentLocked: false,
      titleFontStyleProps: defaultTitleStyleProps,
      contentFontStyleProps: defaultContentStyleProps
    };

    this.handleKeyPressF = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    if (_.isEmpty(this.props.params.fonts)) {
      if (this.props.fontList.length > 0) {
        const [randTitleFont, randContentFont] = _.sampleSize(
          this.props.fontList,
          2
        );
        const url = fontsToUrl(randTitleFont, randContentFont);
        this.props.history.push(url);
        this.setState({
          titleFont: randTitleFont,
          contentFont: randContentFont
        });
      }
    } else {
      const { titleFont, contentFont } = fontsFromUrlParams(
        this.props.params.fonts,
        this.props.fontList
      );
      sendFontPairingToApi(titleFont, contentFont);
    }
    window.addEventListener("keydown", this.handleKeyPressF);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPressF);
  }

  componentWillReceiveProps(nextProps) {
    if (_.isEmpty(nextProps.params.fonts)) {
      if (this.props.fontList.length > 0) {
        const [randTitleFont, randContentFont] = _.sampleSize(
          this.props.fontList,
          2
        );
        const url = fontsToUrl(randTitleFont, randContentFont);
        this.props.history.push(url);
      }
    } else {
      const { titleFont, contentFont } = fontsFromUrlParams(
        nextProps.params.fonts,
        this.props.fontList
      );
      sendFontPairingToApi(titleFont, contentFont);
      this.setState({ titleFont, contentFont });
    }
  }

  handleKeyPress(event) {
    if (_.includes(event.target.className.split(" "), "editable")) {
      return;
    }
    if (event.target instanceof HTMLButtonElement) {
      return;
    }

    if (event.keyCode == 32) {
      this.generate();
    }
  }

  handleSwap() {
    const {
      titleFont,
      contentFont,
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
        titleFont: contentFont,
        contentFont: titleFont,
        isTitleLocked: isContentLocked,
        isContentLocked: isTitleLocked,
        titleFontStyleProps: newTitleFontStyleProps,
        contentFontStyleProps: newContentFontStyleProps
      },
      () => {
        const { titleFont, contentFont } = this.state;
        sendFontPairingToApi(titleFont, contentFont);
      }
    );
  }

  handleClickGenerate(e) {
    const { isTitleLocked, isContentLocked } = this.state;
    if (isTitleLocked && isContentLocked) {
      return;
    }

    e.preventDefault();
    this.generate();
  }

  updateTitleStyle(changeType, changeValue) {
    const { titleFontStyleProps } = this.state;
    const newTitleFontStyleProps = updateFontStyle(
      titleFontStyleProps,
      changeType,
      changeValue
    );
    this.setState({ titleFontStyleProps: newTitleFontStyleProps });
  }

  updateContentStyle(changeType, changeValue) {
    const { contentFontStyleProps } = this.state;
    const newContentFontStyleProps = updateFontStyle(
      contentFontStyleProps,
      changeType,
      changeValue
    );
    this.setState({ contentFontStyleProps: newContentFontStyleProps });
  }

  generate() {
    const { fontList } = this.props;
    if (fontList.length > 0) {
      const {
        titleFont,
        contentFont,
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

      const url = fontsToUrl(newTitleFont, newContentFont);
      this.props.history.push(url);

      this.setState(
        { titleFont: newTitleFont, contentFont: newContentFont },
        () => {
          const { titleFont, contentFont } = this.state;
          sendFontPairingToApi(titleFont, contentFont);
        }
      );
    }
  }

  render() {
    const {
      titleFont,
      titleFontStyleProps,
      contentFont,
      contentFontStyleProps,
      isTitleLocked,
      isContentLocked
    } = this.state;

    const fontFacesNode = _.chain([titleFont, contentFont])
      .filter(x => !_.isNull(x))
      .map(font => (
        <Fonts key={font.family} fontName={font.family} fontUrl={font.url} />
      ))
      .value();

    if (!titleFont || !contentFont) {
      return <Spinner />;
    }

    return (
      <div>
        <ApplicationMeta titleFont={titleFont} contentFont={contentFont} />

        {fontFacesNode}

        <div className="container">
          <div className="row margin-top-lg">
            <div className="col-xs-12 col-sm-offset-0 col-sm-4">
              <Sidebar
                titleFont={titleFont}
                titleFontStyleProps={titleFontStyleProps}
                onChangeTitleStyle={this.updateTitleStyle.bind(this)}
                contentFont={contentFont}
                contentFontStyleProps={contentFontStyleProps}
                onChangeContentStyle={this.updateContentStyle.bind(this)}
                isTitleLocked={isTitleLocked}
                isContentLocked={isContentLocked}
                onChangeLockTitle={() => {
                  this.setState({ isTitleLocked: !this.state.isTitleLocked });
                }}
                onChangeLockContent={() => {
                  this.setState({
                    isContentLocked: !this.state.isContentLocked
                  });
                }}
                onClickSwap={this.handleSwap.bind(this)}
                onClickGenerate={this.handleClickGenerate.bind(this)}
              />
            </div>
            <div className="col-xs-12 col-sm-8">
              <EditableTitle
                font={titleFont}
                fontStyleProps={titleFontStyleProps}
              />
              <EditableContent
                font={contentFont}
                fontStyleProps={contentFontStyleProps}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(GeneratePage);