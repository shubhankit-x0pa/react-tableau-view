import React, {createRef, Component} from 'react';

import PropTypes from 'prop-types';
import URL from 'url';

import Utils from '../utils';

const TableauView = () => {
  
  
  const [tableauViz, setTableauViz] = useState(null);
  const {
    className,
    url,
    ticket,
    queryParams = '?:toolbar=yes&:embed=yes&:refresh=yes&:comments=no',
    options,
    filters,
    parameters,
  } = props;

  
  // /**
  //  * Get the tableau viz url. If ticket given then generate trusted ticket tableau viz url 
  //  * @param {void}
  //  * @return {string} URL The tableau viz url
  //  */
  // getTableauVizURL() {
  //   const {url, ticket, queryParams} = this.props;
  //   if (!url) {
  //     throw new Error('Error: Please give the valid url');
  //   }
  //   const parsed = URL.parse(url, true);

  //   if (ticket) {
  //     return `${Utils.constructTrustedTicketURL(url, ticket)}${queryParams}`;
  //   }

  //   const {protocol, host, pathname} = parsed;
  //   return `${protocol}//${host}${pathname}${queryParams}`;
  // }

  // /**
  //  * Initialize the tableau js viz api to display the visualization.
  //  * @param {void}
  //  * @return {void}
  //  */
  // initViz() {
  //   const {filters, parameters, options: propOptions} = this.props;
  //   const {viz} = this.state;

  //   const tableauVizUrl = this.getTableauVizURL();

  //   const options = {
  //     ...filters,
  //     ...parameters,
  //     ...propOptions,
  //     onFirstInteractive: () => {
  //       if (viz) {
  //         let sheet = viz.getWorkbook().getActiveSheet();

  //         // Check child sheets exist or not.
  //         if (typeof sheet.getWorksheets !== 'undefined') {
  //           const childSheets = sheet.getWorksheets();

  //           if (childSheets && childSheets.length) {
  //             sheet = childSheets[0];
  //           }
  //         }
  //       }
  //     }
  //   };

  //   // to clean the previous viz
  //   if (viz) {
  //     viz.dispose();
  //     this.setState({viz: null});
  //   }

  //   let updatedViz = new tableauSoftware.Viz(this.tableauVizEl, tableauVizUrl, options);
  //   this.setState({ viz: updatedViz });
  // };

    return (
      <div className={`Tableau-view-container ${className}`}>
        {/* <div ref={this.tableauVizEl} /> */}
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
