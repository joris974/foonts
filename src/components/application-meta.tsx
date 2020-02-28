import React from "react";
// import Helmet from "react-helmet";

import { fontsToUrl } from "../helpers/helper";
import { Font } from "../types/font";

type Props = {
  titleFont: Font;
  contentFont: Font;
};

export default function ApplicationMeta(props: Props) {
  const { titleFont, contentFont } = props;
  const hostname = window.location.hostname;
  const baseWebsiteUrl = `https://${hostname}/`;

  const fontUrl =
    titleFont && contentFont ? fontsToUrl(titleFont, contentFont) : "";
  const canonicalUrl = `${baseWebsiteUrl}${fontUrl}`;

  const title =
    titleFont && contentFont
      ? `${titleFont.family} with ${contentFont.family}`
      : null;

  return (
    <div className="application">
      {/* <Helmet
        title={title}
        titleTemplate="Foonts - %s"
        defaultTitle="Find perfect matchings fonts in seconds!"
        titleAttributes={{itemprop: "name", lang: "en"}}
        base={{target: "_blank", href: baseWebsiteUrl}}
        meta={[
          {property: "og:url", content: canonicalUrl}
        ]}
        link={[
          {rel: "canonical", href: canonicalUrl},
        ]}
      /> */}
    </div>
  );
}
