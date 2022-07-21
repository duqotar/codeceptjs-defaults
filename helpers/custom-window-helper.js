/// <reference path="../steps.d.ts" />

const { WebDriver, SeleniumWebdriver } = require("codeceptjs");

const Helper = codecept_helper;

// Works with `WebDriver` to get at some of the missing properties we need
class CustomWindowHelper extends Helper {
  async getWindowHandle() {
    return await this.helpers.WebDriver.browser.getWindowHandle();
  }
  async switchToWindow(handle) {
    await this.helpers.WebDriver.browser.switchToWindow(handle);
  }
}

module.exports = CustomWindowHelper;
