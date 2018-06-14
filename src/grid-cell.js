import PropTypes from 'prop-types';
import React from 'react';

import eventHandlersFactory from './utils/event-handlers-factory.js';
import styles from './grid-cell.css';

export default function GridCell(props) {
  return (
    <div
      className={props.className}
      role={props.role}
      {...eventHandlersFactory('Cell', ['Click'])}
    >
      {props.children}
    </div>
  );
};

GridCell.defaultProps = {
  className: styles.container,
  role: 'gridcell'
};

GridCell.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  role: PropTypes.oneOf(['columnheader', 'gridcell']),
};