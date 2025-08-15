import Page from './page.js';
import { $ } from '@support/commands/helpers';
import { safeClick } from '@support/commands/safe-interaction';

class AddMFAPage extends Page {
    get inputEmail() {
        return $('input[data-testid="Email"]');
    }

    get linkAddMFALater() {
        return $('//a[@href="/addmfalater"]');
    }

    get btnEnable2FA() {
        return $('//button/span[contains(text(),"Enable 2FA")]');
    }

    async open() {
        return super.open('addmfa');
    }

    async clickAddMFALater() {
        await this.linkAddMFALater.waitForDisplayed({ timeout: 30000 });
        await safeClick(this.linkAddMFALater);
    }
}

export default new AddMFAPage(); 