import apiHelper from '../support/api/api-helper.js';
import { rudderStackEndpoints } from '../support/utils/index.js';
import { faker } from '@faker-js/faker';

class RudderStackAPI {
    constructor(dataPlaneUrl, writeKey) {
        this.dataPlaneUrl = dataPlaneUrl;
        this.writeKey = writeKey;
    }

    /**
     * Send a track event to RudderStack with faker-generated data
     * @param {Object} [eventData] - Optional custom event data
     * @returns {Promise<Object>} API response
     */
    async sendTrackEvent(eventData = {}) {
        const payload = {
            userId: eventData.userId || faker.string.uuid(),
            event: eventData.event || faker.helpers.arrayElement([
                'user_login',
                'page_view', 
                'button_click',
                'form_submit',
                'purchase_completed',
                'search_query',
                'video_play',
                'download_started'
            ]),
            properties: {
                framework: 'WebdriverIO',
                timestamp: new Date().toISOString(),
                test_run: faker.string.uuid()
            }
        };

        const response = await apiHelper.post(
            rudderStackEndpoints.TRACK,
            payload,
            {
                baseURL: this.dataPlaneUrl,
                writeKey: this.writeKey
            }
        );

        return {
            ...response,
            success: true
        };
    }
}

export default RudderStackAPI;