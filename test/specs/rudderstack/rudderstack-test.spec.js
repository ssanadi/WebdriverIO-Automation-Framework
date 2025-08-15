import { expect } from '@wdio/globals';
import LoginPage from '../../../page-objects/rudder-stackapp-pages/login.page.js';
import AddMFAPage from '../../../page-objects/rudder-stackapp-pages/add-mfa.page.js';
import ConnectionsPage from '../../../page-objects/rudder-stackapp-pages/connections.page.js';
import DestinationPage from '../../../page-objects/rudder-stackapp-pages/destination/destination.page.js';
import environmentManager from '../../../config/environment.manager.js';
import RudderStackAPI from '../../../src/api-utils/rudderstack.api.js';

describe('RudderStack SDET Assessment Test', () => {
	before(async () => {
		// Login to RudderStack
        const auth = await environmentManager.getAuthConfig();
        await LoginPage.open();
        await LoginPage.login(auth.username, auth.password);
		await AddMFAPage.clickAddMFALater();
	  });

    it('Verify event delivered to destination', async function () {
        // Navigate to connections page and extract data plane URL
        await ConnectionsPage.open();
        const dataPlaneUrl = await ConnectionsPage.getDataPlanUrl();

        // Get write key for HTTP source
        const writeKey = await ConnectionsPage.getWriteKeyForSource('http-dev');

		// Navigate to webhook destination
		await ConnectionsPage.clickDestinationConnection('http-hook');
        
		// Wait for destination page to load and navigate to Events tab
		await DestinationPage.navigateToEventsTab();
				
		// Get initial event counts
		const initialCounts = await DestinationPage.EventsTab.getEventCounts();				

        // Send track event via API using the extracted data plane URL and write key
        const rudderStackAPI = new RudderStackAPI(dataPlaneUrl, writeKey);
		const apiResponse = await rudderStackAPI.sendTrackEvent();
		expect(apiResponse.status).toBe(200);

        // Wait for the new event to be delivered (optional - for verification)
		const newDeliveredCount = await DestinationPage.EventsTab.waitForDeliveredEventsIncrease(initialCounts.delivered);

        // Get final event counts
        const finalCounts = await DestinationPage.EventsTab.getEventCounts();
        console.log(`Final event counts - Delivered: ${finalCounts.delivered}, Failed: ${finalCounts.failed}`);
        
        // Assertions
        expect(finalCounts.delivered).toBeGreaterThan(initialCounts.delivered);
        expect(finalCounts.failed).toBe(0); // Should have no failed events
    });
});