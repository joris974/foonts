import React from "react";
import _ from "lodash";
import { Font } from "./fonts-page/font-list-item";

const DefaultContent = [
  ` Edit Me!`,
  `If I had a world of my own, everything would be nonsense.
    Nothing would be what it is, because everything would be what it isn't.
    And contrary wise, what is, it wouldn't be. And what it wouldn't be, it would. You see?
    `,
  `Sed scelerisque tristique nunc ac congue.
    Vivamus dolor risus, fringilla a nisl at, pellentesque mattis nisi.
    `,
  `Aliquam facilisis blandit elit nec tempor.
    Aenean commodo tortor ac justo ultrices, quis finibus diam tempus.
    Donec efficitur diam tellus, vitae varius diam euismod eu.
    Phasellus viverra tellus lacus.
    Nam quis ultrices libero.
    Ut pharetra, sem et tincidunt porttitor, felis urna tristique lacus, nec tincidunt nibh est et sapien.
    Vestibulum tempor nisi at congue sodales.
    `
];

interface Props {
  fontStyleProps: any;
  font: Font;
}

interface State {
  content: string[];
}

class EditableContent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { content: DefaultContent };
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

    const contentPs = content.map((line, i) => <p key={i}>{line}</p>);

    return (
      <div
        style={style}
        contentEditable="true"
        className="p editable editable-content"
        onChange={this.handleChange.bind(this)}
      >
        {contentPs}
      </div>
    );
  }
}

export default EditableContent;
