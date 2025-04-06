import WebClient from './web-client';

export class Client {

    /**
     * Bridge Automation Client (App/Web/Mobile)
     */
    #client;

    constructor() {
        this.#client = WebClient;
    }

    /**
     * Client Browser Object
     * @returns {globalThis.WebdriverIO.Browser} browser object
     */
    get browser() {
        return this.#client.browser;
    }

    /**
     * Is the test running on Web
     */
    get isWeb() {
        return this.#client.isWeb;
    }
}

export default new Client();