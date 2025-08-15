import { $, $$ } from '@support/commands/helpers';
import { safeClick } from '@support/commands/safe-interaction';


class EventsPage {
    get deliveredEventsCount() {
        return $('//span[contains(text(),"Delivered")]//following-sibling::div[@class="sc-hHvloA jFcMOz"]');
    }

    get failedEventsCount() {
        return $('//span[contains(text(),"Failed")]//following-sibling::div[@class="sc-hHvloA jFcMOz"]');
    }

    get failedRatesCount() {
        return $('//span[contains(text(),"Failed")]//following-sibling::div[@class="sc-hHvloA jFcMOz"]');
    }

    get refreshButton() {
        return $('//button/span[contains(text(),"Refresh")]');
    }

    get eventGraph() {
        return $('[data-testid="graph"]');
    }

    async waitForEventGraphToLoad() {
        await this.eventGraph.waitForDisplayed({ timeout: 30000 });
    }

    async clickRefreshButton() {
        await safeClick(this.refreshButton);
    }

    async getDeliveredEventsCount() {
        const count = await this.deliveredEventsCount.getText();
        return parseInt(count) || 0;
    }

    async getFailedEventsCount() {
        await this.waitForEventGraphToLoad();
        const count = await this.failedEventsCount.getText();
        return parseInt(count) || 0;
    }

    async getEventCounts() {
        const delivered = await this.getDeliveredEventsCount();
        const failed = await this.getFailedEventsCount();
        
        return {
            delivered,
            failed
        };
    }

    async waitForDeliveredEventsIncrease(initialCount, timeout = 100000) {
        const startTime = Date.now();
        
        while (Date.now() - startTime < timeout) {
            await this.clickRefreshButton();
            const currentCount = await this.getDeliveredEventsCount();
            if (currentCount > initialCount) {
                return currentCount;
            }
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
        }
        return initialCount;
    }
}

export default EventsPage;
