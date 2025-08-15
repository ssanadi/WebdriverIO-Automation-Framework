import Page from './page.js';
import { $, $$ } from '@support/commands/helpers';
import { safeClick } from '@support/commands/safe-interaction';

class ConnectionsPage extends Page {
    get dataPlan() {
        return $('//span[contains(@class,"sc-jrkPvW ebfakN")]');
    }

    get tooltipCloseButton() {
        return $('.react-joyride__tooltip [type=button]')
    }

    get sourceConnectionNames() {
        return $$('//div[@id="sources-list"]//following::div[contains(@id, "source")]//span[contains(@class, "sc-ipMuEU fWjDDO")]');
    }

    get destinationConnectionNames() {
        return $$('//div[@id="destinations-list"]//following::div[contains(@id, "destination")]//span[contains(@class, "sc-ipMuEU fWjDDO")]');
    }

    get sourceWriteKeys() {
        return $$('//div[@id="sources-list"]//following::div[contains(@id, "source")]//button[contains(@class, "sc-iJfeOL LxdoZ")]//preceding-sibling::span[contains(@class, "sc-kDnyiN kWZpvc")]');
    }

    async open() {
        super.open();
        if (await this.tooltipCloseButton.isDisplayed()) {
            await safeClick(this.tooltipCloseButton);
        }
        return;
    }

    async getDataPlanUrl() {
        await this.dataPlan.waitForDisplayed({ timeout: 30000 });
        return this.dataPlan.getText();
    }

    async getWriteKeyForSource(connectionName) {
        const sourceNames = await this.sourceConnectionNames;
        const writeKeys = await this.sourceWriteKeys;
        
        for (let i = 0; i < sourceNames.length; i++) {
            const name = await sourceNames[i].getText();
            if (name === connectionName && writeKeys[i]) {
                return writeKeys[i].getText();
            }
        }
        
        const availableNames = await this.getAllSourceConnectionNames();
        throw new Error(`Write key not found for source "${connectionName}". Available sources: ${availableNames.join(', ')}`);
    }

    async clickSourceConnection(connectionName) {
        const sourceNames = await this.sourceConnectionNames;
        for (let i = 0; i < sourceNames.length; i++) {
            const name = await sourceNames[i].getText();
            if (name === connectionName) {
                await safeClick(sourceNames[i]);
                return;
            }
        }
        throw new Error(`Source connection "${connectionName}" not found`);
    }

    // Click on a specific destination connection by name
    async clickDestinationConnection(connectionName) {
        const destNames = await this.destinationConnectionNames;
        for (let i = 0; i < destNames.length; i++) {
            const name = await destNames[i].getText();
            if (name === connectionName) {
                await safeClick(destNames[i]);
                return;
            }
        }
        throw new Error(`Destination connection "${connectionName}" not found`);
    }

    // Get all source connection names
    async getAllSourceConnectionNames() {
        const sourceNames = await this.sourceConnectionNames;
        const names = [];
        for (const nameElement of sourceNames) {
            names.push(await nameElement.getText());
        }
        return names;
    }

    // Get all destination connection names
    async getAllDestinationConnectionNames() {
        const destNames = await this.destinationConnectionNames;
        const names = [];
        for (const nameElement of destNames) {
            names.push(await nameElement.getText());
        }
        return names;
    }

    // Check if a source connection exists by name
    async hasSourceConnection(connectionName) {
        const sourceNames = await this.sourceConnectionNames;
        for (const nameElement of sourceNames) {
            const name = await nameElement.getText();
            if (name === connectionName) {
                return true;
            }
        }
        return false;
    }

    // Check if a destination connection exists by name
    async hasDestinationConnection(connectionName) {
        const destNames = await this.destinationConnectionNames;
        for (const nameElement of destNames) {
            const name = await nameElement.getText();
            if (name === connectionName) {
                return true;
            }
        }
        return false;
    }
}

export default new ConnectionsPage(); 