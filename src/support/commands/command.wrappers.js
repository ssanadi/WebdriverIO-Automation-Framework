import ElementWrappers from "./element.wappers";
import * as WebdriverIO from '@wdio/globals'

class CommandWrappers {
    
    /**
     * constructor
     * @param {ElementWrappers} elementWrap - Wrapped element or native element
     * @param {string} selector - element selector
     */
    constructor(elementWrap, selector) {
        this.elWrap = elementWrap;
        this.selector = selector;
    }

    /**
     * check if passed element is wrapped
     * @returns {boolean} - if wrapped - true , else - false
     */
    get isWrap() {
        return this.elWrap.constructor.name === 'ElementWrappers';
    }

    /**
     * get native element
     * @returns {Promise<WebdriverIO.Element} - native element
     */
    get element() {
        if (this.isWrap) 
            return this.elWrap.element;
        return this.elWrap;
    }

    /**
     * Search for locator within the children of the current element
     * @param {string} locator 
     * @returns {WebdriverIO.Element} element
     */
    async $(locator) {
        const element = await this.element;
        return element.$(locator);
    }

    /**
     * Search for all matching elements within the children of the current element
     * @param {string} locator 
     * @returns {WebdriverIO.Element[]} elements
     */
    async $$(locator) {
        const element = await this.element;
        return element.$$(locator);
    }

    /**
     * Click on an element 
     * https://webdriver.io/docs/api/element/click
     * @param {WebdriverIO.ClickOptions} options 
     */
    async click(options) {
        const element = await this.element;
        await element.click({...options});
        /// add a logger to log a performed action
    }

    /**
     * Double click on an element
     * https://webdriver.io/docs/api/element/doubleClick
     */
    async doubleClick() {
        const element = await this.element;
        await element.doubleClick();
        /// add a logger to log a performed action
    }
}

export default CommandWrappers;