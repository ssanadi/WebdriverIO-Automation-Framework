import { $, $$ } from '@support/commands/helpers';
import { safeClick } from '@support/commands/safe-interaction';
import EventsPage from './events.page.js';

class DestinationPage {

    constructor() {
        this.EventsTab = new EventsPage();
    }

    get sourcesTab() {
        return $('[data-node-key="Sources"]');
    }

    get transformationTab() {
        return $('[data-node-key="Transformation"]');
    }

    get configurationTab() {
        return $('[data-node-key="Configuration"]');
    }

    get eventsTab() {
        return $('[data-node-key="Events"]');
    }

    get settingsTab() {
        return $('[data-node-key="Settings"]');
    }

    // Destination header/info
    get destinationName() {
        return $('[class="sc-hHvloA ikYVzl"]');
    }

    async waitForDestinationPageLoad() {
        await this.destinationName.waitForDisplayed({ timeout: 30000 });
    }

    // Navigate to Events tab
    async navigateToEventsTab() {
        await this.waitForDestinationPageLoad();
        await safeClick(this.eventsTab);
    }

    async getDestinationName() {
        await this.waitForDestinationPageLoad();
        return this.destinationName.getText();
    }
}

export default new DestinationPage(); 