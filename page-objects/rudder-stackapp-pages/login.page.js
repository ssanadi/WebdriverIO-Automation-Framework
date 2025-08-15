import Page from './page.js';
import { $ } from '@support/commands/helpers';
import { safeClick } from '@support/commands/safe-interaction';

class LoginPage extends Page {
    get inputEmail() {
        return $('input[data-testid="Email"]');
    }

    get inputPassword() {
        return $('input[data-testid="Password"]');
    }

    get btnLogin() {
        return $('//div[contains(@class, "authTemplate_formContainer")]//button/span[contains(text(),"Log in")]');
    }

    async open() {
        return super.open('login');
    }

    async login(email, password) {
        await this.inputEmail.waitForDisplayed({ timeout: 30000 });
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await safeClick(this.btnLogin);
    }
}

export default new LoginPage(); 