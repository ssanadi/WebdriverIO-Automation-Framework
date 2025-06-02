import Client from '@support/client/client';
import CommandWrappers from './command.wrappers';

/**
 * Performs a click operation on an element with various options.
 * Includes checks for element visibility and handles different click types.
 *
 * @param {WebdriverIO.Element} element - The element to click.
 * @param {object} [options] - Optional parameters for the click operation.
 * @param {boolean} [options.doubleClick] - Perform a double click.
 * @param {boolean} [options.radio] - Click a radio button only if it is not already selected.
 * @param {object} [options.checkbox] - Handle checkbox clicks.
 * @param {boolean} [options.checkbox.check] - Ensure the checkbox is checked.
 * @param {boolean} [options.checkbox.uncheck] - Ensure the checkbox is unchecked.
 * @param {boolean} [options.force] - Use JavaScript to force the click, bypassing standard interactability checks (useful for overlapped elements).
 * @param {number} [options.clickCount] - Perform the click multiple times.
 * @param {object} [options.coordinates] - Click at specific x, y coordinates relative to the element.
 * @param {number} [options.coordinates.x] - The x-coordinate relative to the element.
 * @param {number} [options.coordinates.y] - The y-coordinate relative to the element.
 */
export const safeClick = async (element, options = {}) => {
    const elementDescription = `element with selector "${element.selector}"`; // For logging/errors
    const wrappedElement = new CommandWrappers(element, element.selector); // Wrap the element

    // 1. Check if the element is displayed using the wrapped method
    try {
        const isDisplayed = await wrappedElement.isDisplayed();
        if (!isDisplayed) {
            console.warn(`SafeClick Warning: ${elementDescription} is not displayed.`);
            // Optionally throw an error here if you want to fail when not displayed
            return;
        }
    } catch (error) {
        console.error(`SafeClick Error: Failed to check display state for ${elementDescription}: ${error.message}`);
        throw error; // Re-throw the error if display check fails unexpectedly
    }

    // 2. Perform click based on options using wrapped methods where applicable
    try {
        if (options.doubleClick) {
            console.log(`SafeClick: Performing double click on ${elementDescription}`);
            await wrappedElement.doubleClick();
        } else if (options.clickCount > 0) {
            console.log(`SafeClick: Performing ${options.clickCount} clicks on ${elementDescription}`);
            // Note: WebdriverIO's click() can handle multiple clicks, but looping here for clarity based on 'clickCount' option
            for (let i = 0; i < options.clickCount; i++) {
                await wrappedElement.click();
            }
        } else if (options.coordinates && (options.coordinates.x !== undefined || options.coordinates.y !== undefined)) {
            console.log(`SafeClick: Clicking ${elementDescription} at coordinates (${options.coordinates.x}, ${options.coordinates.y})`);
            await wrappedElement.click({ x: options.coordinates.x, y: options.coordinates.y });
        } else if (options.radio) {
            const isSelected = await wrappedElement.isSelected();
            if (!isSelected) {
                console.log(`SafeClick: Clicking unselected radio button ${elementDescription}`);
                await wrappedElement.click();
            } else {
                console.log(`SafeClick: Radio button ${elementDescription} is already selected. Skipping click.`);
            }
        } else if (options.checkbox) {
            const isSelected = await wrappedElement.isSelected();
            if (options.checkbox.check && !isSelected) {
                console.log(`SafeClick: Checking checkbox ${elementDescription}`);
                await wrappedElement.click();
            } else if (options.checkbox.uncheck && isSelected) {
                console.log(`SafeClick: Unchecking checkbox ${elementDescription}`);
                await wrappedElement.click();
            } else if (options.checkbox.check || options.checkbox.uncheck) {
                 console.log(`SafeClick: Checkbox ${elementDescription} is already in the desired state. Skipping click.`);
            } else { // If checkbox option is provided but not check/uncheck, default to toggle
                 console.log(`SafeClick: Toggling checkbox ${elementDescription}`);
                 await wrappedElement.click();
            }
        } else if (options.force) {
             console.log(`SafeClick: Performing forced JavaScript click on ${elementDescription}`);
             // Use browser.execute to perform a JavaScript click, bypassing normal checks
             // This bypasses the wrapped click method intentionally for force clicks
             await Client.browser.execute((el) => {
                el.click();
            }, element);
        } else { // Default click
            console.log(`SafeClick: Performing standard click on ${elementDescription}`);
            await wrappedElement.click();
        }
    } catch (error) {
        console.error(`SafeClick Error: Failed to perform click operation on ${elementDescription}: ${error.message}`);
        throw error; // Re-throw the error after logging
    }
}; 