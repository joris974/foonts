import React from 'react'
import _ from 'lodash'


class SidebarItem extends React.Component {
  render() {
    const {font, onChangeLock, isLocked} = this.props
    if (_.isNull(font)) {
      return null
    }

    const iconClassName =
      isLocked ?
        "icon-lock-locked fa-lock" :
        "icon-lock-unlocked fa-unlock-alt"

    return (
      <div className="row">
        <div className="col-xs-11 pull-right">
          <div className="row section-row">
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
        </div>
      </div>
    )
  }
}

class Sidebar extends React.Component {
  render() {
    const {titleFont, contentFont, onChangeLockTitle, onChangeLockContent, isTitleLocked, isContentLocked, onClickSwap} = this.props
    return (
      <div>
        <SidebarItem
          font={titleFont}
          isLocked={isTitleLocked}
          onChangeLock={onChangeLockTitle}
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
        />
      </div>
    )
  }
}

export default Sidebar