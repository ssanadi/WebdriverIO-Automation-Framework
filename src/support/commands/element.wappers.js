import Client from '@support/client/client';

class ElementWrappers {

    /**
     * Constructor
     * @param {string} selector 
     */
    constructor(selector) {
        this.selector = selector;
        this._element = null;
        this._elements = null;
    }

    /**
     * Get the single element on page
     * @returns {Promise<WebdriverIO.Element>} element
     */
    get element() {
        if (!this._element) {
            this._element = Client.browser.$(this.selector);
        }
        return this._element;
    } 

    /**
     * Get the multiple elements on page
     * @returns {Promise<WebdriverIO.ElementArray>} element array
     */
    get elements() {
        if (!this._elements) {
            this._elements = Client.browser.$$(this.selector);
        }
        return this._elements;
    }
}
export default ElementWrappers;