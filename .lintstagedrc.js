// See https://nextjs.org/docs/basic-features/eslint#lint-staged for details

const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`;

module.exports = {
  '*.{js,jsx,ts,tsx}': [
    buildEslintCommand,
    'prettier --write --ignore-unknown',
  ],
  '*.{json,md}': ['prettier --write --ignore-unknown'], // Run Prettier on JSON and Markdown files
};
