/**
 * QA Environment Configuration
 * Contains only environment-specific settings for RudderStack automation
 */
export default {
    auth: {
        username: process.env.RUDDERSTACK_USERNAME,
        password: process.env.RUDDERSTACK_PASSWORD
    },
    
    rudderstack: {
        baseUrl: 'https://app.rudderstack.com',
        dataPlaneUrl: 'https://cronackpobkjyq.dataplane.rudderstack.com',
        writeKey: process.env.RUDDERSTACK_WRITE_KEY,
        timeout: 120000
    },
    
    webhook: {
        baseUrl: 'https://rudderstack.requestcatcher.com',
        timeout: 60000
    }
};
