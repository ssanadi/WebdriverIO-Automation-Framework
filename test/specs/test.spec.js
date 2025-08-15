import { expect } from '@wdio/globals'
import LoginPage from '../../page-objects/herokuapp-pages/login.page.js'
import SecurePage from '../../page-objects/herokuapp-pages/secure.page.js'

describe.skip('My Login application', () => {
    it.skip('should login with valid credentials', async () => {
        await LoginPage.open()
        await LoginPage.login('tomsmith', 'SuperSecretPassword!')
        await expect(SecurePage.flashAlert).toBeExisting()
        await expect(SecurePage.flashAlert).toHaveText(
            expect.stringContaining('You logged into a secure area!'))
    })
})