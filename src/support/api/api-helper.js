import axios from 'axios';
import environmentManager from '@config/environment.manager.js';

const invalidStatusCodes = new Set([408, 413, 429, 500, 502, 503, 504, 521, 522, 524]);

class ApiHelper {
    constructor() {
        this.retryCount = 3;
        this.client = null;
        this.config = null;
    }

    async initialize() {
        if (!this.config) {
            this.config = await environmentManager.getRudderStackConfig();
            this.client = axios.create({
                baseURL: this.config.dataPlaneUrl,
                timeout: this.config.timeout || 30000
            });
            
            // Add retry interceptor
            this.setupRetryInterceptor();
        }
    }

    setupRetryInterceptor() {
        this.client.interceptors.response.use(
            (response) => response,
            async (error) => {
                const config = error.config;
                
                if (!config || !config.retry) {
                    config.retry = 0;
                }

                if (config.retry >= this.retryCount) {
                    return Promise.reject(error);
                }

                const shouldRetry = 
                    error.code === 'ECONNABORTED' ||
                    error.code === 'ENOTFOUND' ||
                    (error.response && invalidStatusCodes.has(error.response.status));

                if (shouldRetry) {
                    config.retry += 1;
                    console.warn(`API call failed with error - ${error.code || error.response?.status}, Retrying API call. Attempt: ${config.retry}`);
                    
                    // Exponential backoff
                    const delay = Math.pow(2, config.retry) * 1000;
                    await new Promise(resolve => setTimeout(resolve, delay));
                    
                    return this.client.request(config);
                }

                return Promise.reject(error);
            }
        );
    }

    setHeaders(headers = {}) {
        const defaultHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(this.config.writeKey + ':').toString('base64')}`,
            'User-Agent': 'RudderStack-WebdriverIO'
        };

        return { ...defaultHeaders, ...headers };
    }

    async request(method, endpoint, payload = null, customHeaders = {}) {
        await this.initialize();

        const config = {
            method: method.toLowerCase(),
            url: endpoint,
            headers: this.setHeaders(customHeaders),
            retry: 0
        };

        if (payload && ['post', 'put', 'patch'].includes(method.toLowerCase())) {
            config.data = payload;
        }

        try {
            const response = await this.client.request(config);
            return {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                data: response.data
            };
        } catch (error) {
            console.error(`API request failed: ${error.message}`);
            throw error;
        }
    }

    async get(endpoint, headers = {}) {
        return await this.request('GET', endpoint, null, headers);
    }

    async post(endpoint, payload, headers = {}) {
        return await this.request('POST', endpoint, payload, headers);
    }

    async put(endpoint, payload, headers = {}) {
        return await this.request('PUT', endpoint, payload, headers);
    }

    async patch(endpoint, payload, headers = {}) {
        return await this.request('PATCH', endpoint, payload, headers);
    }

    async delete(endpoint, headers = {}) {
        return await this.request('DELETE', endpoint, null, headers);
    }
}

export default new ApiHelper();