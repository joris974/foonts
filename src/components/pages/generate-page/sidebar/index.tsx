import React from "react";
import DownloadModal from "./download-modal";
import { sendFontPairingLikeToApi } from "../../../../helpers/api";
import { UpdateFontProperties } from "../../../../helpers/helper";
import { Font } from "../../../../types/font";
import { FontProperties } from "../../../../types/font-style";
import { Button, Grid, Typography } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LoopIcon from "@material-ui/icons/Loop";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import SidebarItem from "./sidebar-item";

function hasLiked(titleFont: Font, contentFont: Font) {
  const existingInStorage = localStorage.getItem("font-pairing-liked");
  const fontPairing = `${titleFont.id}-${contentFont.id}`;
  const likedPairings = existingInStorage ? existingInStorage.split(",") : [];
  return likedPairings.includes(fontPairing);
}

type Props = {
  titleFont: Font;
  contentFont: Font;
  onClickSwap: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onClickGenerate: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  titleFontPropertiesProps: FontProperties;
  onChangeTitleFontProperty: (update: UpdateFontProperties) => void;
  onChangeLockTitle: () => void;
  isTitleLocked: boolean;

  contentFontPropertiesProps: FontProperties;
  onChangeContentFontProperty: (update: UpdateFontProperties) => void;
  onChangeLockContent: () => void;
  isContentLocked: boolean;
};

type State = {
  showDownloadModal: boolean;
  isLiked: boolean;
};

class Sidebar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { showDownloadModal: false, isLiked: false };
    this.handleClickLike = this.handleClickLike.bind(this);
    this.handleToggleDownloadModal = this.handleToggleDownloadModal.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
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

  handleToggleDownloadModal() {
    this.setState(previousState => ({
      showDownloadModal: !previousState.showDownloadModal
    }));
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
      <Grid container>
        <Grid item xs={12} style={{ margin: "16px 0 8px 0" }}>
          <SidebarItem
            font={titleFont}
            isLocked={isTitleLocked}
            onChangeLock={onChangeLockTitle}
            fontStyleProps={titleFontPropertiesProps}
            onChangeFontProperty={onChangeTitleFontProperty}
          />
        </Grid>
        <Grid item xs={12} style={{ margin: "8px 0" }}>
          <SidebarItem
            font={contentFont}
            isLocked={isContentLocked}
            onChangeLock={onChangeLockContent}
            fontStyleProps={contentFontPropertiesProps}
            onChangeFontProperty={onChangeContentFontProperty}
          />
        </Grid>
        <Grid item xs={12} style={{ margin: "8px 0" }}>
          <Button
            variant="outlined"
            onClick={onClickGenerate}
            startIcon={<LoopIcon />}
          >
            Generate
          </Button>
        </Grid>
        <Grid item xs={12} style={{ margin: "8px 0" }}>
          <Button
            variant="outlined"
            onClick={onClickSwap}
            startIcon={<SwapVertIcon />}
          >
            Swap
          </Button>
        </Grid>
        <Grid item xs={12} style={{ margin: "8px 0" }}>
          <Button
            variant={isLiked ? "contained" : "outlined"}
            color="secondary"
            onClick={this.handleClickLike}
            startIcon={<FavoriteIcon />}
          >
            {isLiked ? "You liked this" : "Like"}
          </Button>
        </Grid>
        <Grid item xs={12} style={{ margin: "8px 0" }}>
          <Button
            variant="outlined"
            onClick={this.handleToggleDownloadModal}
            startIcon={<GetAppIcon />}
          >
            Download
          </Button>
        </Grid>

        <Grid item xs={12} style={{ margin: "8px 0" }}>
          <Typography variant="body2">
            Tip: Press space bar to generate a new combination.
          </Typography>
        </Grid>

        <DownloadModal
          show={showDownloadModal}
          onHide={this.handleToggleDownloadModal}
          titleFont={titleFont}
          contentFont={contentFont}
        />
      </Grid>
    );
  }
}

export default Sidebar;
