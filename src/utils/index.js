import url from 'url';

class Utils {
  /**
   * Return a constructed trusted ticket url
   * @param {string} trustedURL The tableau view's url
   * @param {string} ticket The generated ticket from tableau server
   * @return {string} constructedURL The new tableau view url
   */
  static constructTrustedTicketURL(trustedURL, ticket) {
    const parsedURL = url.parse(trustedURL, true);
    const {protocol, host, pathname} = parsedURL;

    return `${protocol}//${host}/trusted/${ticket}${pathname}`;
  };
  
  /**
   * Compare two arrays
   * @param {Array<number>} firstArray
   * @param {Array<number>} secondArray
   * @return {boolean} true OR false
   */
  static compareArrays(firstArray, secondArray) {

    if (Array.isArray(firstArray) && Array.isArray(secondArray)) {
      return firstArray.sort().toString() === secondArray.sort().toString();
    }

    return false;
  };
}

export default Utils;
