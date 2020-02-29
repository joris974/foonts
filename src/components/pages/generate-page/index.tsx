import { withRouter, RouteComponentProps } from "react-router-dom";
import React from "react";
import sampleSize from "lodash/sampleSize";
import { Font } from "../../../types/font";
import GeneratePageContainer from "./generate-page-container";
import { fontsToUrl, extractFromMatch } from "../../../helpers/helper";
import { sendFontPairingToApi } from "../../../helpers/api";
import Spinner from "../../common/spinner";
import { withFontList } from "../../withFontList";

type Params = {
  fonts: string;
};

type Props = RouteComponentProps<Params> & {
  fontList: Font[];
};

type State = {
  titleFont: Font | null | undefined;
  contentFont: Font | null | undefined;
};

class GeneratePageHandler extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const fontsParams = extractFromMatch(props.match, props.fontList);

    const [titleFont, contentFont] =
      fontsParams !== null && fontsParams !== undefined
        ? [fontsParams.titleFont, fontsParams.contentFont]
        : [null, null];

    this.state = {
      titleFont,
      contentFont
    };

    this.updateFonts = this.updateFonts.bind(this);
  }

  componentDidMount() {
    this.reloadOrSave(this.props);
  }

  reloadOrSave(props: Props) {
    const { history, match, fontList } = this.props;
    const fontsParams = extractFromMatch(match, fontList);

    if (fontsParams === null || fontsParams === undefined) {
      if (fontList.length > 0) {
        const [randTitleFont, randContentFont] = sampleSize(fontList, 2);
        const url = fontsToUrl(randTitleFont, randContentFont);
        history.push(url);
      }
    } else {
      const { titleFont, contentFont } = fontsParams;
      sendFontPairingToApi(titleFont, contentFont);
      this.setState({
        titleFont,
        contentFont
      });
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    this.reloadOrSave(nextProps);
  }

  updateFonts(newTitleFont: Font, newContentFont: Font) {
    const { history } = this.props;
    const url = fontsToUrl(newTitleFont, newContentFont);
    history.push(url);
    this.setState({
      titleFont: newTitleFont,
      contentFont: newContentFont
    });
  }

  render() {
    const { fontList } = this.props;
    const { titleFont, contentFont } = this.state;

    if (!titleFont || !contentFont) {
      return <Spinner />;
    }

    return (
      <GeneratePageContainer
        fontList={fontList}
        titleFont={titleFont}
        contentFont={contentFont}
        updateFonts={this.updateFonts}
      />
    );
  }
}

export default withRouter(withFontList(GeneratePageHandler));
