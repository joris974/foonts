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

const likedPairingsStorageKey = "font-pairing-liked";

function readLikedPairings(): string[] {
  const existingInStorage = localStorage.getItem(likedPairingsStorageKey);
  if (!existingInStorage) {
    return [];
  }

  try {
    const parsedValue: unknown = JSON.parse(existingInStorage);
    if (Array.isArray(parsedValue)) {
      return parsedValue.filter(
        (value): value is string => typeof value === "string",
      );
    }
  } catch {
    return existingInStorage.split(",").filter(Boolean);
  }

  return [];
}

function hasLiked(titleFont: Font, contentFont: Font) {
  const fontPairing = `${titleFont.id}-${contentFont.id}`;
  return readLikedPairings().includes(fontPairing);
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
    const likedPairings = readLikedPairings();
    const fontPairing = `${titleFont.id}-${contentFont.id}`;

    if (!likedPairings.includes(fontPairing)) {
      sendFontPairingLikeToApi(titleFont, contentFont);
      const newInStorage = likedPairings.concat(fontPairing);
      localStorage.setItem(
        likedPairingsStorageKey,
        JSON.stringify(newInStorage),
      );
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
