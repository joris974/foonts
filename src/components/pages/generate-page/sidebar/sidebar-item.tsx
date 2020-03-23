import React from "react";
import Checkbox from "../../../common/checkbox";
import {
  allCategories,
  labelForCategory,
  UpdateFontProperties
} from "../../../../helpers/helper";
import { Font } from "../../../../types/font";
import { FontProperties } from "../../../../types/font-style";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Switch,
  IconButton,
  Grid
} from "@material-ui/core";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

type Props = {
  font: Font;
  onChangeLock: () => void;
  isLocked: boolean;
  fontStyleProps: FontProperties;
  onChangeFontProperty: (update: UpdateFontProperties) => void;
};

class SidebarItem extends React.Component<Props> {
  render() {
    const {
      font,
      onChangeLock,
      isLocked,
      fontStyleProps,
      onChangeFontProperty
    } = this.props;

    const { fontStyle, fontWeight, fontCategories } = fontStyleProps;

    if (font === null || font === undefined) {
      return null;
    }

    const isItalic = fontStyle === "italic";
    const isBolded = fontWeight === "bold";

    const allCategoriesNodes = allCategories().map(category => {
      return (
        <div key={category}>
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

    const lockIcon = isLocked ? <LockIcon /> : <LockOpenIcon />;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={event => {
              event.stopPropagation();
              onChangeLock();
            }}
            onFocus={event => {
              event.stopPropagation();
              onChangeLock();
            }}
            control={lockIcon}
            label={font.family}
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container>
            <Grid item xs={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isBolded}
                    onChange={() =>
                      onChangeFontProperty({
                        type: "fontWeight",
                        value: "bold"
                      })
                    }
                    value="checkedB"
                    color="primary"
                  />
                }
                label="Bold"
              />
            </Grid>
            <Grid item xs={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isItalic}
                    onChange={() =>
                      onChangeFontProperty({
                        type: "fontStyle",
                        value: "italic"
                      })
                    }
                    value="checkedB"
                    color="primary"
                  />
                }
                label="Italic"
              />
            </Grid>
            <Grid item xs={4}>
              <IconButton
                aria-label="increment"
                onClick={() =>
                  onChangeFontProperty({
                    type: "fontSize",
                    action: "increment"
                  })
                }
              >
                <AddIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() =>
                  onChangeFontProperty({
                    type: "fontSize",
                    action: "decrement"
                  })
                }
              >
                <RemoveIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <h4>Categories</h4>
              {allCategoriesNodes}
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default SidebarItem;
