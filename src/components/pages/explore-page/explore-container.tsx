import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import FontPairingItem from "../../font-pairing-snippet";
import Spinner from "../../spinner";
import { Font } from "../../../types/font";

type Props = {
  fontList: Font[];
  fontPairings: any;
};

type State = {
  numMaxVisible: number;
};

class ExploreContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { numMaxVisible: 12 };
  }

  handleClickSeeMore() {
    this.setState({ numMaxVisible: this.state.numMaxVisible + 12 });
  }

  render() {
    const { fontList, fontPairings } = this.props;
    const { numMaxVisible } = this.state;

    const pairings = _.chain(fontPairings)
      .take(numMaxVisible)
      .map(pairing => {
        return (
          <FontPairingItem
            key={pairing.id}
            fontList={fontList}
            pairing={pairing}
          />
        );
      })
      .value();

    const btnSeeMore =
      numMaxVisible > fontPairings.length ? null : (
        <div className="row see-more-wrapper">
          <div className="col-xs-12 text-center">
            <button
              className="btn btn-default"
              onClick={this.handleClickSeeMore.bind(this)}
            >
              See more <i className="fa fa-chevron-down"></i>
            </button>
          </div>
        </div>
      );

    const pairingsNode =
      fontPairings.length > 0 ? (
        <div className="container font-pairing-wrapper">
          <div className="row">{pairings}</div>
          {btnSeeMore}
        </div>
      ) : (
        <Spinner />
      );

    return (
      <div>
        <div className="container-fluid explore-nav">
          <div className="row">
            <div className="col-xs-12 text-center">
              <ul className="explore-nav-menu list-inline">
                <li>
                  <Link to="/explore/recent">Recent</Link>
                </li>
                <li>
                  <Link to="/explore/popular">Popular</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {pairingsNode}
      </div>
    );
  }
}

export default ExploreContainer;
