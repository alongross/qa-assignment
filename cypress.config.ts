import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implement Node event listeners if needed
    },
    supportFile: 'cypress/support/e2e.ts', // Ensure this points to a TypeScript file
    specPattern: 'cypress/e2e/**/*.cy.ts' // Look for TypeScript test files
  },
});