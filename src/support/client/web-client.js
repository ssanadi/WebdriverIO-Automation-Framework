import { browser } from '@wdio/globals'

class WebClient {

    constructor() {}

    /**
     * Global WDIO browser object
     * @returns {browser} WDIO browser object
     */
    get browser() {
        return browser;
    }

    /**
     * Check if app client
     * @returns {boolean} false
     */
    get isApp() {
        return false;
    }

    /**
     * Check if web client
     * @returns {boolean} true
     */
    get isWeb() {
        return true;
    }

}
export default new WebClient();