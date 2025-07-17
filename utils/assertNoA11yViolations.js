function assertNoA11yViolations(results, label = 'A11y') {
  const violations = results.violations || [];

  if (violations.length > 0) {
    const summary = violations
      .map(v => `[${v.id}] ${v.help} (${v.impact})`)
      .join('\n');

    throw new Error(`[${label}] ${violations.length} violation(s) found:\n${summary}`);
  }
}

module.exports = { assertNoA11yViolations };
