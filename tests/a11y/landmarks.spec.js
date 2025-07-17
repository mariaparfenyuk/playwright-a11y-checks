const { chromium } = require('playwright');
const { source } = require('axe-core');
const { assertNoA11yViolations } = require('../../utils/assertNoA11yViolations');

describe('A11y: Landmark regions', () => {
  let browser, page;

  before(async () => {
    browser = await chromium.launch();
    page = await (await browser.newContext()).newPage();
    await page.goto('https://www.amazon.com/', { waitUntil: 'domcontentloaded' });
    await page.addScriptTag({ content: source });
  });

  after(async () => await browser.close());

  it('should use landmark roles correctly', async () => {
    const results = await page.evaluate(async () => {
      return await window.axe.run('body', {
        runOnly: ['region']
      });
    });

    assertNoA11yViolations(results, 'Landmarks');
  });
});
