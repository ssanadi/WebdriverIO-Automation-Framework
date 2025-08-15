import { navigateTo } from '@support/commands/helpers';
import environmentManager from '@config/environment.manager.js';

/**
 * Base page for RudderStack app pages
 */
export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    async open (path='') {
        const { baseUrl } = await environmentManager.getRudderStackConfig();
        return navigateTo(`${baseUrl}/${path}`);
    }
}
