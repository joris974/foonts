import React from 'react'
import _ from 'lodash'
import DownloadModal from './download-modal.js'

class SidebarItem extends React.Component {
  render() {
    const {font, onChangeLock, isLocked, fontStyleProps, onToggleStyle} = this.props
    if (_.isNull(font)) {
      return null
    }

    const iconClassName =
      isLocked ?
        "icon-lock-locked fa-lock" :
        "icon-lock-unlocked fa-unlock-alt"

    const isItalic = fontStyleProps.fontStyle === "italic"
    const isBolded = fontStyleProps.fontWeight === "bold"

    return (
      <div className="row">
        <div className="col-xs-11 pull-right">
          <div className="row">
            <div className="col-xs-9">
              <h3>
                {font.family}
              </h3>
            </div>
            <div className="col-xs-3 text-center">
              <i
                className={`h3 icon-action fa ${iconClassName}`}
                onClick={onChangeLock}
              >
              </i>
            </div>
          </div>
          <div className="row section-command">
            <div className="col-xs-12">
              <ul className="list-inline section-actions pull-right">
                <li>
                  <i
                    className={`fa fa-italic icon-action icon-command icon-italic ${isItalic ? "active" : ""}`}
                    onClick={() => onToggleStyle("italic")}
                  ></i>
                </li>
                <li>
                  <i
                    className={`fa fa-bold icon-action icon-command icon-bold ${isBolded ? "active" : ""}`}
                    onClick={() => onToggleStyle("bold")}
                  ></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {showDownloadModal: false}
  }
  render() {
    const {onClickSwap, onClickGenerate} = this.props
    const {titleFont, titleFontStyleProps, onToggleTitleStyle, onChangeLockTitle, isTitleLocked} = this.props
    const {contentFont, contentFontStyleProps, onToggleContentStyle, onChangeLockContent, isContentLocked} = this.props

    const {showDownloadModal} = this.state

    return (
      <div className="row">
        <div className="col-xs-12">

          <div className="row hidden-xs">
            <div className="col-xs-12">
              <SidebarItem
                font={titleFont}
                isLocked={isTitleLocked}
                onChangeLock={onChangeLockTitle}
                fontStyleProps={titleFontStyleProps}
                onToggleStyle={onToggleTitleStyle}
              />
              <div className="row section-divider">
                <div className="col-xs-1 text-center">
                  <i
                    className="fa fa-exchange fa-rotate-90 icon-action icon-swap"
                    onClick={onClickSwap}
                  >
                  </i>
                </div>
              </div>
              <SidebarItem
                font={contentFont}
                isLocked={isContentLocked}
                onChangeLock={onChangeLockContent}
                fontStyleProps={contentFontStyleProps}
                onToggleStyle={onToggleContentStyle}
              />
            </div>
          </div>

          <div className="row margin-top-lg">
            <div className="col-xs-6 col-sm-5 col-sm-offset-1">
              <button
                className="btn btn-generate"
                onClick={onClickGenerate}
              >
                <i className="fa fa-refresh"></i> Generate
              </button>
            </div>
            <div className="col-xs-6 col-sm-5">
              <button
                className="btn btn-default"
                onClick={() => {this.setState({showDownloadModal: true})}}
              >
                <i className="fa fa-download"></i> Download
              </button>
            </div>
          </div>

          <div className="row margin-top-sm hidden-xs">
            <div className="col-sm-12 col-sm-offset-1">
              <p className="text-muted">
                Tip: Press space bar to generate a new combination.
              </p>
            </div>
          </div>

          <DownloadModal
            show={this.state.showDownloadModal}
            onHide={() => {this.setState({showDownloadModal: false})}}
            titleFont={titleFont}
            contentFont={contentFont}
          />
        </div>
      </div>
    )
  }
}

export default Sidebar