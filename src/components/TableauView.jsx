import React, {Component} from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';
import URL from 'url';

import Utils from '../utils';

class TableauView extends Component {
  
  constructor(props) {
    super(props);

    // Define the global to use through out the class
    this.viz = null;
    this.workbook = null;
    this.sheet = null;
  }
  
  componentDidMount() {
    // Calling the function after the page has loaded
    this.initViz();
  }

  componentDidUpdate(prevProps) {
    const hasUrlChanged = prevProps.url !== this.props.url;
    const hasFiltersChanged = !shallowequal(prevProps.filters, this.props.filters, Utils.compareArrays);

    if (hasUrlChanged) {
      this.initViz(this.props.url);
    }

    // Call the tableau filter api once the filters has changed
    if (!hasUrlChanged && hasFiltersChanged) {
      this.onApplyFilters(prevProps.filters);
    }
  }

  /**
   * Asynchronously applies a simple categorical filter (non-date) on the worksheet.
   * Did not applying filters which already has been filtered.
   * @param  {Object} prevFilters
   * @return {void}
   */
  onApplyFilters(prevFilters) {
    const {filters} = this.props;
    const promises = [];

    for (const key in filters) {
      if (
        !prevFilters.hasOwnProperty(key) ||
        !Utils.compareArrays(prevFilters[key], filters[key])
      ) {
        promises.push(
          this.sheet.applyFilterAsync(key, filters[key], Tableau.FilterUpdateType.REPLACE)
        );
      }
    }

    Promise.all(promises).then(() => {});
  }

  /**
   * Get the tableau viz url. If ticket given then generate trusted ticket tableau viz url 
   * @param {string} url The new URl 
   * @return {string} URL The tableau viz url
   */
  getTableauVizURL(url) {
    const {ticket, queryParams} = this.props;
    if (!url) {
      throw new Error('Error: Please give the valid url');
    }
    const parsed = URL.parse(url, true);

    if (ticket) {
      return `${Utils.constructTrustedTicketURL(url, ticket)}${queryParams}`;
    }

    const {protocol, host, pathname} = parsed;
    return `${protocol}//${host}${pathname}${queryParams}`;
  }

  /**
   * Initialize the tableau js viz api to display the visualization.
   * @param {void}
   * @return {void}
   */
  initViz(newURL) {
    const {url, filters, options: propOptions} = this.props;

    const tableauVizUrl = this.getTableauVizURL(newURL || url);
    const options = {
      ...filters,
      ...propOptions,
      onFirstInteractive: () => {
        if (this.viz) {
          this.workbook = viz.getWorkbook();
          this.sheet = this.workbook.getActiveSheet();

          // Check child sheets exist or not.
          if (typeof this.sheet.getWorksheets !== 'undefined') {
            const childSheets = this.sheet.getWorksheets();

            if (childSheets && childSheets.length) {
              this.sheet = childSheets[0];
            }
          }
        }
      }
    };

    // If a viz object exists, delete it
    if (this.viz) {
      this.viz.dispose();
      this.viz = null;
    }

    // Create a new viz object and embed it in the container child div.
    this.viz = new tableauSoftware.Viz(this.tableauVizEl, tableauVizUrl, options);
  };

  render() {
    const {className} = this.props;
    return (
      <div className={`Tableau-view-container ${className}`}>
        <div ref={el => this.tableauVizEl = el} />
      </div>
    );
  }
}

TableauView.defaultProps = {
  filters: {},
  options: {},
  queryParams: '?:toolbar=yes&:embed=yes&:refresh=yes&:comments=no',
};

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
};

export default TableauView;
