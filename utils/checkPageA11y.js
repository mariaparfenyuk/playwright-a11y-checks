const { chromium } = require('playwright');
const { source } = require('axe-core');

async function runA11yCheck(url) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.addScriptTag({ content: source });

    const results = await page.evaluate(async () => {
      return await window.axe.run('body', {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa']
        },
        resultTypes: ['violations']
      });
    });

    const violations = results.violations || [];

    if (violations.length === 0) {
      console.log(`No accessibility violations on ${url}`);
      return process.exit(0);
    }

    console.error(`❌ ${violations.length} accessibility violation(s) found on ${url}:\n`);

    for (const v of violations) {
      console.error(`• [${v.id}] ${v.help} (${v.impact})`);
      console.error(`  ⤷ ${v.nodes[0]?.html || '<no HTML snippet>'}\n`);
    }

    process.exit(2);
  } catch (error) {
    console.error(`Error during accessibility check: ${error.message}`);
    process.exit(3);
  } finally {
    await browser.close();
  }
}

const [, , url] = process.argv;

if (!url) {
  console.error('Usage: node a11y-check.js <url>');
  process.exit(1);
}

runA11yCheck(url);
