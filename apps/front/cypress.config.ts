import { defineConfig } from 'cypress';
import { cypressEsbuildPreprocessor } from 'cypress-esbuild-preprocessor';
import { resolve } from 'path';
import { config } from 'dotenv';

const withCodeCoverage = require('@cypress/code-coverage/task');
config({ path: resolve(__dirname, '.env.test') });

export default defineConfig({
  projectId: 'e6u291',
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false,
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      if (Boolean(config.env.coverage)) {
        config = withCodeCoverage(on, config);
      }
      on(
        'file:preprocessor',
        cypressEsbuildPreprocessor({
          esbuildOptions: {
            tsconfig: resolve(__dirname, 'cypress', 'tsconfig.json'),
            define: Object.entries(process.env).reduce(
              (defineMap, [key, value]) => {
                if (!key.startsWith('NEXT_PUBLIC')) return defineMap;

                defineMap[`process.env.${key}`] = JSON.stringify(value);

                return defineMap;
              },
              { global: 'window' } as Record<string, string>,
            ),
          },
        }),
      );
      return config;
    },
  },
});
