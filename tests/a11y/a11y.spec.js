const { chromium } = require('playwright');
const { source } = require('axe-core');

describe('Accessibility smoke tests', function () {
  let browser, page;

  before(async function () {
    browser = await chromium.launch();
    const context = await browser.newContext();
    page = await context.newPage();
  });

  after(async function () {
    if (browser) {
      await browser.close();
    }
  });

  it('Page should have no critical a11y issues', async function () {
    const testUrl = 'https://www.amazon.com/';
    await page.goto(testUrl, { waitUntil: 'domcontentloaded' });

    await page.addScriptTag({ content: source });

    const results = await page.evaluate(async () => {
      return await window.axe.run('body', {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa'],
        },
        resultTypes: ['violations'],
      });
    });

    if (results.violations.length > 0) {
      const summary = results.violations
        .map(v => `Errors: [${v.id}] ${v.help} (${v.impact}) — ${v.nodes.length} node(s)`)
        .join('\n');

      throw new Error(`Accessibility violations found:\n${summary}`);
    }
  });
});
