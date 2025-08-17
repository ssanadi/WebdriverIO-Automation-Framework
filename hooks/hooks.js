import { After } from '@wdio/cucumber-framework';
import fs from 'fs';
import allure from '@wdio/allure-reporter';

After(async function (scenario) {
    if (scenario.result?.status === 'FAILED' || scenario.result?.status === 'failed') {
        try {
            if (browser.sessionId) {
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                if (!fs.existsSync('./screenshots')) {
                    fs.mkdirSync('./screenshots');
                }
                const screenshot = await browser.takeScreenshot();
                
                const screenshotPath = `./screenshots/failed-${scenario.pickle.name}-${timestamp}.png`;
                fs.writeFileSync(screenshotPath, screenshot, 'base64');
                
                allure.addAttachment(
                    `Failed Scenario: ${scenario.pickle.name}`,
                    Buffer.from(screenshot, 'base64'),
                    'image/png'
                );
            }
        } catch (err) {
            console.warn('Failed to take screenshot after scenario failure:', err.message);
        }
    }
});