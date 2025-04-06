import { navigateTo } from '@support/commands/helpers'


/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        return navigateTo(`https://the-internet.herokuapp.com/${path}`);
    }
}
