export default {
    auth: {
        username: process.env.RUDDERSTACK_USERNAME,
        password: process.env.RUDDERSTACK_PASSWORD,
    },
    
    rudderstack: {
        baseUrl: 'https://app.rudderstack.com',
        dataPlaneUrl: process.env.RUDDERSTACK_DATA_PLANE_URL_PROD,
        writeKey: process.env.RUDDERSTACK_WRITE_KEY_PROD,
        timeout: parseInt(process.env.API_TIMEOUT) || 30000
    },
    
    webhook: {
        baseUrl: process.env.WEBHOOK_BASE_URL || 'https://prod-webhook.company.com'
    }
};
