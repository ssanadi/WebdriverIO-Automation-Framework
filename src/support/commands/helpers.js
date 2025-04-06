import Client from '@support/client/client';
import ElementWrappers from './element.wappers';

/**
 * Call the findElement command in order to fetch a single element on the page
 * https://webdriver.io/docs/api/element/$
 * @param {string} selector  - selector to get specific element
 * @returns {ElementWrappers} - Wrapped element
 */
export const $ = (selector) => {
    const elementWrapper =new ElementWrappers(selector);
    return elementWrapper.element;
};

/**
 * Call the findElements command in order to fetch a multiple element on the page
 * https://webdriver.io/docs/api/element/$$
 * @param {string} selector  - selector to get multiple element
 * @returns {Promise<Array<ElementWrappers>>} - Array of Wrapped element
 */
export const $$ = async (selector) => {
    const elementWrapper =new ElementWrappers(selector);
    const elements = elementWrapper.elements;
    const elementList = [];
    for (const element of elements) {
        elementList.push(element); 
    }
    return elementList;
};

/**
 * Expects a condition and waits until that condition is fulfilled with a truthy valu
 * https://webdriver.io/docs/api/element/waitUntil
 * @param {*} condition - condition to be fulfilled
 * @param {WebdriverIO.WaitUnitOptions} options - named parameters
 * @returns 
 */
export const waitUnit = async (condition, options) => {
    return Client.browser.waitUnit(condition, {...options});
};

/**
 * Switch window to latest open tab
 * https://webdriver.io/docs/api/browser/switchWindow
 */
export const switchToLatestTab = async () => {
    const windowHandles = await Client.browser.getWindowHandles();
    await Client.browser.switchWindow(windowHandles[windowHandles.length - 1]);
}

/**
 * Switch window to latest open tab
 * https://webdriver.io/docs/api/browser/switchWindow
 * @param {string} url  - the URL to navigate to
 * @param {WebdriverIO.UrlOptions} options - navigation options
 */
export const navigateTo = async (url, options) => {
    return await Client.browser.url(url, {...options});
}

