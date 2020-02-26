import React from "react";
import _ from "lodash";
import { Font } from "./fonts-page/font-list-item";

const DefaultTitle = "Find best matching fonts in seconds!!";

interface Props {
  fontStyleProps: any;
  font: Font;
}

interface State {
  content: string;
}

class EditableTitle extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { content: DefaultTitle };
  }

  handleChange(event: any) {
    this.setState({ content: event.target.value });
  }

  render() {
    const { fontStyleProps, font } = this.props;
    const { fontSize, fontWeight, fontStyle } = fontStyleProps;

    const content = this.state.content;
    const style = {
      fontSize: `${fontSize}px`,
      fontWeight,
      fontStyle,
      fontFamily: !_.isNull(font) ? font.family : ""
    };
    return (
      <h1
        style={style}
        contentEditable="true"
        className="editable editable-title"
        onChange={this.handleChange.bind(this)}
      >
        {content}
      </h1>
    );
  }
}

export default EditableTitle;
