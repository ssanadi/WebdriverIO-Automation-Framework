import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import LoginPage from '../../page-objects/rudder-stackapp-pages/login.page.js';
import AddMFAPage from '../../page-objects/rudder-stackapp-pages/add-mfa.page.js';
import ConnectionsPage from '../../page-objects/rudder-stackapp-pages/connections.page.js';
import DestinationPage from '../../page-objects/rudder-stackapp-pages/destination/destination.page.js';
import environmentManager from '../../config/environment.manager.js';
import RudderStackAPI from '../../src/api-utils/rudderstack.api.js';

let dataPlaneUrl, writeKey, initialCounts, apiResponse, finalCounts;

Given('I am logged into RudderStack', async () => {
    const auth = await environmentManager.getAuthConfig();
    await LoginPage.open();
    await LoginPage.login(auth.username, auth.password);
});

Given('I skip MFA setup', async () => {
    await AddMFAPage.clickAddMFALater();
});

When('I navigate to the connections page', async () => {
    await ConnectionsPage.open();
});

When('I extract the data plane URL', async () => {
    dataPlaneUrl = await ConnectionsPage.getDataPlanUrl();
});

When('I extract the write key for {string}', async (source) => {
    writeKey = await ConnectionsPage.getWriteKeyForSource(source);
});

When('I navigate to the {string} destination', async (destination) => {
    await ConnectionsPage.clickDestinationConnection(destination);
});

When('I go to the Events tab', async () => {
    await DestinationPage.navigateToEventsTab();
});

When('I get the initial event counts', async () => {
    initialCounts = await DestinationPage.EventsTab.getEventCounts();
});

When('I send a track event via API', async () => {
    const rudderStackAPI = new RudderStackAPI(dataPlaneUrl, writeKey);
    apiResponse = await rudderStackAPI.sendTrackEvent();
    console.log(`API Response: ${JSON.stringify(apiResponse)}`);
    expect(apiResponse.status).toBe(200);
});

Then('the delivered event count should increase', async () => {
    await DestinationPage.EventsTab.waitForDeliveredEventsIncrease(initialCounts.delivered);
    finalCounts = await DestinationPage.EventsTab.getEventCounts();
    expect(finalCounts.delivered).toBeGreaterThan(initialCounts.delivered);
});

Then('there should be no failed events', async () => {
    expect(finalCounts.failed).toBe(0);
});