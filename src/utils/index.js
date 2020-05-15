import url from 'url';

class Utils {
  /**
   * Return a constructed trusted ticket url
   * @param {string} trustedURL The tableau view's url
   * @param {string} ticket The generated ticket from tableau server
   * @return {string} constructedURL The new tableau view url
   */
  static constructTrustedTicketURL(trustedURL, ticket) {
    const parsedURL = url.parse(_url, true);
    const {protocol, host, pathname} = parsedURL;

    return `${protocol}//${host}/trusted/${ticket}${pathname}`;
  };
}

export default Utils;
