import React from 'react';
import PropTypes from 'prop-types';

const TableauView = (props) => {
  const {
    className,
  } = props;

  return (
    <div className={className}>
      Tableau View
    </div>
  );
}

TableauView.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),

};

export default TableauView;
