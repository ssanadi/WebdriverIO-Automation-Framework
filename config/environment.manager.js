import { config } from 'dotenv';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config();

class EnvironmentManager {
    constructor() {
        this.currentEnvironment = process.env.ENVIRONMENT || 'qa';
        this.config = null;
        this.initialized = false;
    }

    /**
     * Initialize the environment manager
     */
    async initialize() {
        if (!this.initialized) {
            this.config = await this.loadEnvironmentConfig();
            this.initialized = true;
        }
        return this.config;
    }

    /**
     * Load environment-specific configuration
     * @returns {Object} Environment configuration
     */
    async loadEnvironmentConfig() {
        try {
            const configPath = join(__dirname, 'environments', `${this.currentEnvironment}.config.js`);
            const fileUrl = pathToFileURL(configPath).href;
            const envConfig = await import(fileUrl);
            return {
                environment: this.currentEnvironment,
                ...envConfig.default
            };
        } catch (error) {
            console.error(`Failed to load environment config for: ${this.currentEnvironment}`);
            console.error(`Error: ${error.message}`);
            throw new Error(`Environment configuration not found for: ${this.currentEnvironment}`);
        }
    }

    /**
     * Get current environment name
     * @returns {string} Current environment
     */
    getCurrentEnvironment() {
        return this.currentEnvironment;
    }

    /**
     * Get full configuration
     * @returns {Object} Complete configuration
     */
    async getConfig() {
        if (!this.initialized) {
            await this.initialize();
        }
        return this.config;
    }

    /**
     * Get RudderStack configuration
     * @returns {Object} RudderStack-specific config
     */
    async getRudderStackConfig() {
        if (!this.initialized) {
            await this.initialize();
        }
        return this.config.rudderstack;
    }

    /**
     * Get webhook configuration
     * @returns {Object} Webhook-specific config
     */
    async getWebhookConfig() {
        if (!this.initialized) {
            await this.initialize();
        }
        return this.config.webhook;
    }

    /**
     * Get authentication configuration
     * @returns {Object} Auth-specific config with login credentials
     */
    async getAuthConfig() {
        if (!this.initialized) {
            await this.initialize();
        }
        return this.config.auth;
    }
}

export default new EnvironmentManager();
