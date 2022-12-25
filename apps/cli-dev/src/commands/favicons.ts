import { Command } from 'commander';
import generate from 'favicons';
import { copyFile, mkdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { format, resolveConfig } from 'prettier';

const favicons = new Command('favicons');
favicons.description('Generate the favicons for the front-end application');
favicons.action(async () => {
  const root = join(__dirname, '../../../front');
  const publicDir = join(root, 'public');
  const input = join(publicDir, 'favicon.svg');
  const output = join(publicDir, 'favicons');

  const document = join(root, 'src/pages/_document.tsx');
  const identifier = ['{/* gen:favicon:start */}', '{/* gen:favicon:end */}'] as const;
  const packageJson = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));

  process.stdout.write('Generating files (takes some time)...\n');

  const { files, images, html } = await generate(input, {
    appName: 'Web starter',
    appShortName: 'Web Starter',
    developerName: 'WebStarter',
    developerURL: 'https://mywebsite.io',
    // background: fuchsia['100'],
    // theme_color: fuchsia['500'],
    path: '/favicons/',
    appDescription: packageJson.description,
    version: packageJson.version,
  });

  await mkdir(output, { recursive: true });

  // Write the resulting files
  await Promise.all(
    [...files, ...images].map(async ({ contents, name }) => {
      const outputFile = join(output, name);
      await writeFile(outputFile, contents);
      process.stdout.write(`Wrote ${outputFile.replace(root, '')}\n`);
    }),
  );

  await copyFile(join(output, 'favicon.ico'), join(publicDir, 'favicon.ico'));

  // Write document
  const code = await readFile(document, { encoding: 'utf-8' });
  const header = code.split(identifier[0])[0];
  const footer = code.split(identifier[1])[1];

  const parts = [
    header.trimEnd(),
    identifier[0],
    ...html.map((line) => line.replace('>', ' />')), // Patch JSX self-closing tags
    identifier[1],
    footer,
  ];

  const payload = format(parts.join('\n'), { filepath: document, ...(await resolveConfig(document)) });

  await writeFile(document, payload);
});

export default favicons;
