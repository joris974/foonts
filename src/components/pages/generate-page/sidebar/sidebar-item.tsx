import React from "react";
import Checkbox from "../../../common/checkbox";
import {
  allCategories,
  labelForCategory,
  UpdateFontProperties
} from "../../../../helpers/helper";
import { Font } from "../../../../types/font";
import { FontProperties } from "../../../../types/font-style";

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

export default SidebarItem;
