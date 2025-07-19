# Accessibility Testing Framework (Playwright + axe-core)

This framework provides a minimal yet powerful setup for automated accessibility testing using Playwright and axe-core. It allows developers and testers to validate key accessibility principles based on the WCAG 2.1 AA standard.

We use axe-core to programmatically evaluate accessibility violations on real pages rendered with Playwright. The tests are designed to cover the most impactful rules with minimal test code.

Each test file targets a specific area of accessibility, as defined in the WCAG 2.1 guidelines:

## headings.spec.js
Verifies correct heading structure and order.
Related WCAG rule: 2.4.6 Headings and Labels

## landmarks.spec.js
Ensures the presence and correctness of landmark roles (banner, main, navigation).
Related WCAG rule: 1.3.1 Info and Relationships

## color-contrast.spec.js
Validates sufficient color contrast between text and background.
Related WCAG rule: 1.4.3 Contrast (Minimum)

## form-labels.spec.js
Checks for proper labeling of form inputs.
Related WCAG rule: 1.3.1 Info and Relationships

## keyboard-focus.spec.js
Verifies that all functionality is accessible by keyboard and that there are no keyboard traps.
Related WCAG rules:
2.1.1 Keyboard
2.1.2 No Keyboard Trap

## Test Runner
All tests are written using Mocha and can be executed with the following command:

```npm run test:a11y```

This will run all accessibility test files located under tests/a11y/.
