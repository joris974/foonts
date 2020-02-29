import React from "react";
import { Font } from "../types/font";
import { FontProperties } from "../types/font-style";

const DefaultTitle = "Find best matching fonts in seconds!!";

type Props = {
  fontStyleProps: FontProperties;
  font: Font;
};

type State = {
  content: string;
};

class EditableTitle extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { content: DefaultTitle };
    this.handleChange = this.handleChange.bind(this);
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
      fontFamily: font.family
    };
    return (
      <h1
        style={style}
        contentEditable="true"
        className="editable editable-title"
        onChange={this.handleChange}
      >
        {content}
      </h1>
    );
  }
}

export default EditableTitle;
