import React from "react";
import DownloadModal from "./download-modal";
import Checkbox from "../../common/checkbox";
import { sendFontPairingLikeToApi } from "../../../helpers/api";
import {
  allCategories,
  labelForCategory,
  UpdateFontProperties
} from "../../../helpers/helper";
import { Font } from "../../../types/font";
import { FontProperties } from "../../../types/font-style";

type Props = {
  font: Font;
  onChangeLock: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  isLocked: boolean;
  fontStyleProps: FontProperties;
  onChangeFontProperty: (update: UpdateFontProperties) => void;
};

type State = {
  showConfig: boolean;
};

class SidebarItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { showConfig: false };

    this.toggleConfigMenu = this.toggleConfigMenu.bind(this);
  }

  toggleConfigMenu() {
    this.setState({ showConfig: !this.state.showConfig });
  }

  render() {
    const {
      font,
      onChangeLock,
      isLocked,
      fontStyleProps,
      onChangeFontProperty
    } = this.props;
    const { showConfig } = this.state;

    const { fontStyle, fontWeight, fontCategories } = fontStyleProps;

    if (font === null || font === undefined) {
      return null;
    }

    const iconLockClassName = isLocked
      ? "icon-lock-locked fa-lock"
      : "icon-lock-unlocked fa-unlock-alt";

    const isItalic = fontStyle === "italic";
    const isBolded = fontWeight === "bold";

    const allCategoriesNodes = allCategories().map(category => {
      return (
        <div key={category} className="col-xs-6">
          <Checkbox
            isChecked={fontCategories.includes(category)}
            label={labelForCategory(category)}
            handleChangeCheckbox={() =>
              onChangeFontProperty({ type: "category", value: category })
            }
          />
        </div>
      );
    });

    const configNode = !showConfig ? null : (
      <div className="row sidebar-item-config section-actions">
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-6">
              <h4>Style</h4>
            </div>
            <div className="col-xs-2 col-xs-offset-2">
              <h4>Size</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-3">
              <Checkbox
                isChecked={isItalic}
                handleChangeCheckbox={() =>
                  onChangeFontProperty({ type: "fontStyle", value: "italic" })
                }
                label={<i className="fa fa-italic"></i>}
              />
            </div>
            <div className="col-xs-3">
              <Checkbox
                isChecked={isBolded}
                handleChangeCheckbox={() =>
                  onChangeFontProperty({ type: "fontWeight", value: "bold" })
                }
                label={<i className="fa fa-bold"></i>}
              />
            </div>
            <div className="col-xs-2 col-xs-offset-2">
              <i
                onClick={() =>
                  onChangeFontProperty({
                    type: "fontSize",
                    action: "increment"
                  })
                }
                className="fa fa-plus-circle icon-action icon-font-size"
              ></i>
            </div>
            <div className="col-xs-2">
              <i
                onClick={() =>
                  onChangeFontProperty({
                    type: "fontSize",
                    action: "decrement"
                  })
                }
                className="fa fa-minus-circle icon-action icon-font-size"
              ></i>
            </div>
          </div>
          <div className="row margin-top-md">
            <div className="col-xs-12">
              <h4>Categories</h4>
            </div>
          </div>
          <div className="row">{allCategoriesNodes}</div>
        </div>
      </div>
    );

    return (
      <div className="row">
        <div className="col-xs-11 pull-right">
          <div className="row section-command">
            <div className="col-xs-9">
              <h3>{font.family}</h3>
            </div>
            <div className="col-xs-3 text-right">
              <i
                onClick={this.toggleConfigMenu}
                className={`h3 icon-action fa fa-gear icon-gear ${
                  showConfig ? "active" : ""
                }`}
              ></i>
              <i
                className={`h3 icon-action fa ${iconLockClassName}`}
                onClick={onChangeLock}
              ></i>
            </div>
          </div>

          {configNode}
        </div>
      </div>
    );
  }
}

function hasLiked(titleFont: Font, contentFont: Font) {
  const existingInStorage = localStorage.getItem("font-pairing-liked");
  const fontPairing = `${titleFont.id}-${contentFont.id}`;
  const likedPairings = existingInStorage ? existingInStorage.split(",") : [];
  return likedPairings.includes(fontPairing);
}

type SidebarProps = {
  titleFont: Font;
  contentFont: Font;
  onClickSwap: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onClickGenerate: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  titleFontPropertiesProps: FontProperties;
  onChangeTitleFontProperty: (update: UpdateFontProperties) => void;
  onChangeLockTitle: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  isTitleLocked: boolean;

  contentFontPropertiesProps: FontProperties;
  onChangeContentFontProperty: (update: UpdateFontProperties) => void;
  onChangeLockContent: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
  isContentLocked: boolean;
};

type SidebarState = {
  showDownloadModal: boolean;
  isLiked: boolean;
};

class Sidebar extends React.Component<SidebarProps, SidebarState> {
  constructor(props: SidebarProps) {
    super(props);
    this.state = { showDownloadModal: false, isLiked: false };
    this.handleClickLike = this.handleClickLike.bind(this);
  }

  componentWillReceiveProps(nextProps: SidebarProps) {
    if (
      nextProps.titleFont !== this.props.titleFont ||
      nextProps.contentFont !== this.props.contentFont
    ) {
      this.setState({ isLiked: false });
    }
  }

  componentDidMount() {
    const { titleFont, contentFont } = this.props;
    this.setState({ isLiked: hasLiked(titleFont, contentFont) });
  }

  handleClickLike() {
    const { titleFont, contentFont } = this.props;

    const existingInStorage = localStorage.getItem("font-pairing-liked");
    const likedPairings = existingInStorage ? existingInStorage.split(",") : [];
    const fontPairing = `${titleFont.id}-${contentFont.id}`;

    if (!likedPairings.includes(fontPairing)) {
      sendFontPairingLikeToApi(titleFont, contentFont);
      const newInStorage = likedPairings.concat(fontPairing);
      localStorage.setItem("font-pairing-liked", JSON.stringify(newInStorage));
    }

    this.setState({ isLiked: true });
  }

  render() {
    const {
      onClickSwap,
      onClickGenerate,
      titleFont,
      titleFontPropertiesProps,
      onChangeTitleFontProperty,
      onChangeLockTitle,
      isTitleLocked,
      contentFontPropertiesProps,
      onChangeContentFontProperty,
      onChangeLockContent,
      isContentLocked,
      contentFont
    } = this.props;

    const { showDownloadModal, isLiked } = this.state;

    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="row hidden-xs">
            <div className="col-xs-12">
              <SidebarItem
                font={titleFont}
                isLocked={isTitleLocked}
                onChangeLock={onChangeLockTitle}
                fontStyleProps={titleFontPropertiesProps}
                onChangeFontProperty={onChangeTitleFontProperty}
              />
              <div className="row section-divider">
                <div className="col-xs-1 text-center">
                  <i
                    className="fa fa-exchange fa-rotate-90 icon-action icon-swap"
                    onClick={onClickSwap}
                  ></i>
                </div>
              </div>
              <SidebarItem
                font={contentFont}
                isLocked={isContentLocked}
                onChangeLock={onChangeLockContent}
                fontStyleProps={contentFontPropertiesProps}
                onChangeFontProperty={onChangeContentFontProperty}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-lg-8 col-lg-offset-2">
              <div className="row">
                <div className="col-xs-4 col-sm-12 margin-top-lg">
                  <button
                    className="btn btn-block btn-generate"
                    onClick={onClickGenerate}
                  >
                    <i className="fa fa-refresh"></i>
                    <span className="hidden-xs">&nbsp;Generate</span>
                  </button>
                </div>

                <div className="col-xs-4 col-sm-12 margin-top-lg">
                  <button
                    className={`btn btn-block btn-default btn-like ${
                      isLiked ? "liked" : ""
                    }`}
                    onClick={this.handleClickLike}
                  >
                    <i className={`fa fa-heart`}></i>
                    <span className="hidden-xs">
                      &nbsp;{isLiked ? "You liked this" : "Like"}
                    </span>
                  </button>
                </div>

                <div className="col-xs-4 col-sm-12 margin-top-lg">
                  <button
                    className="btn btn-block btn-default btn-custom"
                    onClick={() => {
                      this.setState({ showDownloadModal: true });
                    }}
                  >
                    <i className="fa fa-download"></i>
                    <span className="hidden-xs">&nbsp;Download</span>
                  </button>
                </div>

                <div className="col-sm-12 margin-top-sm hidden-xs">
                  <p className="text-muted">
                    Tip: Press space bar to generate a new combination.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DownloadModal
            show={showDownloadModal}
            onHide={() => {
              this.setState({ showDownloadModal: false });
            }}
            titleFont={titleFont}
            contentFont={contentFont}
          />
        </div>
      </div>
    );
  }
}

export default Sidebar;