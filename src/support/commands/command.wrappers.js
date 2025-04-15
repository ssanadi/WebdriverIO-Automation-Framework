import ElementWrappers from "./element.wappers";
import * as WebdriverIO from '@wdio/globals'
import logger from '@wdio/logger';
import { Client } from "../client/client";

const log = logger('CommandWrappers');
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
        log.info(`Clicked on element with selector: ${this.selector}`);
    }

    /**
     * Double click on an element
     * https://webdriver.io/docs/api/element/doubleClick
     */
    async doubleClick() {
        const element = await this.element;
        await element.doubleClick();
        log.info(`Double clicked on element with selector: ${this.selector}`);
    }

    /**
     * Returns true if the element isClickable
     * https://webdriver.io/docs/api/element/isClickable/
     * @returns {Promise<boolean>} if element is clickable - true; else - false
     */
    async isClickable() {
        const element = await this.element;
        return element.isClickable();
    }

    /**
     * Wait for element to be clickable
     * https://webdriver.io/docs/api/element/waitForClickable/
     * @param {WebdriverIO.WaitForOptions} options
     * @returns {Promise<boolean>} if element is clickable - true; else - false
     */
    async waitForClickable(options) {
       const element = await this.element;
       return element.waitForClickable({...options});
    }

    /**
     * Get attribute value of the element from a DOM based on attribute name
     * https://webdriver.io/docs/api/element/getAttribute/
     * @param {string} attributeName -  requested attribute
     * @returns {Promise<string>} - attribute text
     */
    async getAttribute(attributeName) {
        const element = await this.element;
        return element.getAttribute(attributeName);
    }

    /**
     * Get CSS property of the element
     * https://webdriver.io/docs/api/element/getCSSProperty/
     * @param {string} cssProperty - requested css Property
     * @returns {Promise<string>} - attribute text
     */
    async getCssProperty(cssProperty) {
        const element = await this.element;
        return element.getCSSProperty(cssProperty);
    }

    /**
     * Get HTML of the element from DOM
     * https://webdriver.io/docs/api/element/getHTML
     * @param {boolean} [includeSelectorTag=false]
     * @returns {Promise<string>} - text content
     */
    async getHtml(includeSelectorTag = false) {
        const element = await this.element;
        return element.getHTML(includeSelectorTag);
    }

    // function to normalize a string by replacing no-break spaces with regular spaces
    normalizedString(text) {
        return text.replace(/\u00A0/g, ' ');
    }

    /**
     * Get text content of the element.
     * https://webdriver.io/docs/api/element/getText
     * @returns {Promise<string>}
     */
    async getText() {
        const element = await this.element;
        let text = await element.getText();

        //adding condition as sometimes 'text' is initialized as undefined
        if (typeof text === 'string') {
            text = this.normalizedString(text);
        }

        return text
    }
  
    /**
     * Get value of the element, Get the value of a <textarea>, <select> or text <input> found by given selector
     * https://webdriver.io/docs/api/element/getValue
     * @returns {Promise<string>} -  requested element(s) value
     */
    async getValue() {
      const element = await this.element;
      const value = element.getValue();
      log.info(`getValue value found = ${value} for selector - ${this.selector}`);
      return value;
    }

    /**
     * Checks if element is displayed.
     * https://webdriver.io/docs/api/element/isDisplayed
     * @returns {Promise<boolean>} Return true if the selected DOM-element is displayed 
     */
    async isDisplayed() {
      const element = await this.element;
      return element.isDisplayed();
    }

    /**
     * Checks if element is displayed in viewport.
     * https://webdriver.io/docs/api/element/isDisplayedInViewport
     * @returns {Promise<boolean>} Return true if the selected DOM-element found by given selector is partially displayed and within the viewport
     */
    async isDisplayedInViewport() {
      const element = await this.element;
      return element.isDisplayedInViewport();
    }

    /**
     * Checks if element is enabled.
     * https://webdriver.io/docs/api/element/isEnabled
     * @returns {Promise<boolean>} Return true or false if the selected DOM-element is enabled.
     */
    async isEnabled() {
      const element = await this.element;
      return element.isEnabled();
    }

    /**
     * Checks if element exists.
     * https://webdriver.io/docs/api/element/isExisting
     * @returns {Promise<boolean>} Returns true if element present in the DOM
     */
    async isExisting() {
      const element = await this.element;
      return element.isExisting();
    }

    /**
     * Checks if element is selected.- Will return true or false whether or not an <option> or <input> element of type checkbox or radio is currently selected
     * https://webdriver.io/docs/api/element/isSelected
     * @returns {Promise<boolean>}
     */
    async isSelected() {
      const element = await this.element;
      return element.isSelected();
    }

    /**
     * Move to the center of the element.
     * https://webdriver.io/docs/api/element/moveTo
     * @param {WebdriverIO.MoveToOptions} options - moveTo command options
     */
    async moveTo(options) {
      const element = await this.element;
      return element.moveTo({...options});
    }
  
    /**
     * Scroll element into viewport for Desktop/Mobile Web AND Mobile Native Apps.
     * https://webdriver.io/docs/api/element/scrollIntoView
     * @param {boolean|ScrollIntoViewOptions} [scrollIntoViewOptions]
     */
    async scrollIntoView(scrollIntoViewOptions = true) {
      const element = await this.element;
      return element.scrollIntoView({...scrollIntoViewOptions});
    }

    /**
     * Set the value of an input element.
     * https://webdriver.io/docs/api/element/setValue
     * @param {string} value - value to be set
     * @returns {Promise<void>}
     */
    async setValue(value) {
      const element = await this.element;
      await element.setValue(value);
      log.info(`Set value as - ${this.selector.includes('password') ? '*****' : value} in element - '${this.selector}'`);
    }

    /**
     * Add a value to the input element (appends rather than replacing).
     * https://webdriver.io/docs/api/element/addValue
     * @param {string} value - value to be set
     * @returns {Promise<void>}
     */
    async addValue(value) {
      const element = await this.element;
      await element.addValue(value);
      log.info(`Add value as - ${this.selector.includes('password') ? '*****' : value} in element - '${this.selector}'`);
    }

    /**
     * Clear the value of an input element.
     * https://webdriver.io/docs/api/element/clearValue
     * @returns {Promise<void>}
     */
    async clearValue() {
      const element = await this.element;
      await element.clearValue();
      log.info(`Cleared value in element '${this.selector}'`);
    }

    /**
     * Wait until the element is enabled.
     * https://webdriver.io/docs/api/element/waitForEnabled
     * @param {WebdriverIO.WaitForOptions} options - waitForEnabled options (optional)
     * @returns {Promise<boolean>}  true if element is (dis/en)abled
     */
    async waitForEnabled(options) {
      const element = await this.element;
      return element.waitForEnabled({...options});
    }

    /**
     * Wait until the element exists.
     * https://webdriver.io/docs/api/element/waitForExist
     * @param {WebdriverIO.WaitForOptions} options
     * @returns {Promise<boolean>} true if element exists (or doesn't if flag is set)
     */
    async waitForExist(options) {
      const element = await this.element;
      return element.waitForExist({...options});
    }

    /**
     * Wait until the element is displayed.
     * https://webdriver.io/docs/api/element/waitForDisplayed
     * @param {WebdriverIO.WaitForOptions} options
     * @returns {Promise<boolean>} true if element displayed on UI
     */
    async waitForDisplayed(options) {
      const element = await this.element;
      return element.waitForDisplayed({...options});
    }

    /**
     * Execute a function in the browser context using this element.
     * https://webdriver.io/docs/api/element/execute
     * @param {object} script - Function to execute.
     * @param {...any} args - Additional arguments to pass.
     * @returns {Promise<any>}
     */
    async execute(script, ...args) {
        await Client.browser.execute(script, ...args);
        log.info(`Script executed successfully`);
    }
}

export default CommandWrappers;