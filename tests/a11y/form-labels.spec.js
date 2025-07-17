const { chromium } = require('playwright');
const { source } = require('axe-core');
const { assertNoA11yViolations } = require('../../utils/assertNoA11yViolations');

describe('A11y: Form labels', () => {
  let browser, page;

  before(async () => {
    browser = await chromium.launch();
    page = await (await browser.newContext()).newPage();
    await page.goto('https://www.amazon.com/', { waitUntil: 'domcontentloaded' });
    await page.addScriptTag({ content: source });
  });

  after(async () => await browser.close());

  it('should have labels for all form elements', async () => {
    const results = await page.evaluate(async () => {
      return await window.axe.run('body', {
        runOnly: ['label']
      });
    });

    assertNoA11yViolations(results, 'Labels');
  });
});
