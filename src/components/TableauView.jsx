import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

import TableauAPI from '../vendors';
import Utils from '../utils';

const TableauView = (props) => {
  const tableauVizEl = useRef(null);
  const {
    className,
    url,
    ticket,
    queryParams,
    options,
    filters,
    parameters,
  } = props;

  return (
    <div className={`Tableau-view-container ${className}`}>
      Tableau View
      Welcome to New Library
      <div ref={inputEl} />
    </div>
  );
}

TableauView.propTypes = {
  url: PropTypes.string.isRequired,
  ticket: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  queryParams: PropTypes.string,
  options: PropTypes.object,
  filters: PropTypes.object,
  parameters: PropTypes.object,
};

export default TableauView;
