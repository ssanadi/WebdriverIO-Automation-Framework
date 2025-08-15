export default {
    auth: {
        username: process.env.RUDDERSTACK_USERNAME,
        password: process.env.RUDDERSTACK_PASSWORD
    },
    
    rudderstack: {
        baseUrl: process.env.RUDDERSTACK_BASE_URL || 'https://app.rudderstack.com',
        dataPlaneUrl: process.env.RUDDERSTACK_DATA_PLANE_URL,
        writeKey: process.env.RUDDERSTACK_WRITE_KEY,
        timeout: parseInt(process.env.API_TIMEOUT) || 30000
    },
    
    webhook: {
        baseUrl: process.env.WEBHOOK_BASE_URL,
        timeout: parseInt(process.env.WEBHOOK_TIMEOUT) || 15000
    }
};
