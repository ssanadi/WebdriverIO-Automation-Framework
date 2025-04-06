import Client from '@support/client/client';

class ElementWrappers {

    /**
     * Constructor
     * @param {string} selector 
     */
    constructor(selector) {
        this.selector = selector;
    }

    /**
     * Get the single element on page
     * @returns {Promise<WebdriverIO.Element>} element
     */
    get element() {
        return Client.browser.$(this.selector);
    } 

    /**
     * Get the multiple elements on page
     * @returns {Promise<WebdriverIO.ElementArray>} element array
     */
    get elements() {
        return Client.browser.$$(this.selector);
    }
}
export default ElementWrappers;