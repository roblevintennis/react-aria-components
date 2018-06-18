import PropTypes from 'prop-types';
import React from 'react';

export default class TabList extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handlers = {
      ArrowLeft: this.previous.bind(this),
      ArrowRight: this.next.bind(this),
    };
    this.tabRefs = new Array(React.Children.count(props.children)).fill(0).map(_ => React.createRef());
  }

  wrapIndex(index) {
    const count = React.Children.count(this.props.children);
    return (index + count) % count;
  }

  handleKeyPress(event) {
    const handler = this.handlers[event.key] || (() => {});
    handler();
  }

  previous() {
    const newIndex = this.wrapIndex(this.props.activeIndex - 1);
    this.props.onActivateTab(newIndex);
  }

  next() {
    const newIndex = this.wrapIndex(this.props.activeIndex + 1);
    this.props.onActivateTab(newIndex);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeIndex !== this.props.activeIndex) {
      this.tabRefs[this.props.activeIndex].current.focus();
    }
  }

  render() {
    const { accessibleId, activeIndex, children, className, onActivateTab } = this.props;

    return (
      <ul className={className} onKeyUp={this.handleKeyPress} role="tablist">
        {React.Children.map(children, (child, index) => {
          const active = index === activeIndex;
          const tabRef = this.tabRefs[index];

          return React.cloneElement(child, {
            accessibleId: active ? accessibleId : undefined,
            active,
            tabRef,
            onActivate: () => this.props.onActivateTab(index),
          });
        })}
      </ul>
    );
  }
}

TabList.propTypes = {
  accessibleId: PropTypes.string,
  activeIndex: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string,
  onActivateTab: PropTypes.func,
};

TabList.defaultProps = {
  accessibleId: undefined,
  activeIndex: 0,
  children: null,
  className: undefined,
  onActivateTab: () => {},
};
