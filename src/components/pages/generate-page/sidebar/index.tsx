import React, { useEffect, useState } from "react";
import DownloadModal from "./download-modal";
import { sendFontPairingLikeToApi } from "../../../../helpers/api";
import { UpdateFontProperties } from "../../../../helpers/helper";
import { Font } from "../../../../types/font";
import { FontProperties } from "../../../../types/font-style";
import { Button, Grid, Typography } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoopIcon from "@mui/icons-material/Loop";
import SwapVertIcon from "@mui/icons-material/SwapVert";
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

function Sidebar({
  titleFont,
  contentFont,
  onClickSwap,
  onClickGenerate,
  titleFontPropertiesProps,
  onChangeTitleFontProperty,
  onChangeLockTitle,
  isTitleLocked,
  contentFontPropertiesProps,
  onChangeContentFontProperty,
  onChangeLockContent,
  isContentLocked,
}: Props) {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [isLiked, setIsLiked] = useState(() =>
    hasLiked(titleFont, contentFont),
  );

  useEffect(() => {
    setIsLiked(hasLiked(titleFont, contentFont));
  }, [titleFont, contentFont]);

  const handleClickLike = () => {
    const existingInStorage = localStorage.getItem("font-pairing-liked");
    const likedPairings = existingInStorage ? existingInStorage.split(",") : [];
    const fontPairing = `${titleFont.id}-${contentFont.id}`;

    if (!likedPairings.includes(fontPairing)) {
      sendFontPairingLikeToApi(titleFont, contentFont);
      const newInStorage = likedPairings.concat(fontPairing);
      localStorage.setItem("font-pairing-liked", JSON.stringify(newInStorage));
    }

    setIsLiked(true);
  };

  const handleToggleDownloadModal = () =>
    setShowDownloadModal((current) => !current);

  return (
    <Grid container>
      <Grid size={12} style={{ margin: "16px 0 8px 0" }}>
        <SidebarItem
          font={titleFont}
          isLocked={isTitleLocked}
          onChangeLock={onChangeLockTitle}
          fontStyleProps={titleFontPropertiesProps}
          onChangeFontProperty={onChangeTitleFontProperty}
        />
      </Grid>
      <Grid size={12} style={{ margin: "8px 0" }}>
        <SidebarItem
          font={contentFont}
          isLocked={isContentLocked}
          onChangeLock={onChangeLockContent}
          fontStyleProps={contentFontPropertiesProps}
          onChangeFontProperty={onChangeContentFontProperty}
        />
      </Grid>
      <Grid size={12} style={{ margin: "8px 0" }}>
        <Button
          variant="outlined"
          onClick={onClickGenerate}
          startIcon={<LoopIcon />}
        >
          Generate
        </Button>
      </Grid>
      <Grid size={12} style={{ margin: "8px 0" }}>
        <Button
          variant="outlined"
          onClick={onClickSwap}
          startIcon={<SwapVertIcon />}
        >
          Swap
        </Button>
      </Grid>
      <Grid size={12} style={{ margin: "8px 0" }}>
        <Button
          variant={isLiked ? "contained" : "outlined"}
          color="secondary"
          onClick={handleClickLike}
          startIcon={<FavoriteIcon />}
        >
          {isLiked ? "You liked this" : "Like"}
        </Button>
      </Grid>
      <Grid size={12} style={{ margin: "8px 0" }}>
        <Button
          variant="outlined"
          onClick={handleToggleDownloadModal}
          startIcon={<GetAppIcon />}
        >
          Download
        </Button>
      </Grid>

      <Grid size={12} style={{ margin: "8px 0" }}>
        <Typography variant="body2">
          Tip: Press space bar to generate a new combination.
        </Typography>
      </Grid>

      <DownloadModal
        show={showDownloadModal}
        onHide={handleToggleDownloadModal}
        titleFont={titleFont}
        contentFont={contentFont}
      />
    </Grid>
  );
}

export default Sidebar;
