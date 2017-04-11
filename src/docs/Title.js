import React from 'react';
import PropTypes from 'prop-types';

let titles = [];

function getTitle() {
  return titles[titles.length - 1];
}

function updateTitle() {
  document.title = getTitle();
}

export function flushTitle() {
  const title = getTitle();
  titles = [];
  return title;
}

class Title extends React.Component {
  static propTypes = {
    render: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ]).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      index: titles.push('') - 1
    };
  }

  componentWillUnmount() {
    titles.pop();
  }

  componentDidMount() {
    updateTitle();
  }

  componentDidUpdate() {
    updateTitle();
  }

  render() {
    const { render } = this.props;
    titles[this.state.index] = typeof render === 'function'
      ? render(titles[this.state.index - 1] || '')
      : render;
    return this.props.children || null;
  }
}

export default Title;
