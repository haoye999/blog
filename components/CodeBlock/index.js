import React from 'react';
import Highlight from 'react-highlight.js';

export default class CodeBlock extends React.PureComponent {
  static defaultProps = {
    language: null,
  }

  render() {
    const { language, value } = this.props;

    return (
      <Highlight language={language}>
        {value}
      </Highlight>
    );
  }
}