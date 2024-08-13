import chalk from 'chalk';
import fs from 'fs';

try {
  const translationsJson = fs.readFileSync(`src/translations/en.json`, 'utf8');
  const translations = JSON.parse(translationsJson);

  const enumValues = Object.entries(translations).map(([key]) => {
    return `${key} = "${key}"`;
  });

  const enumContent = `export enum TErrorKeys {\n ${enumValues.join(',\n ')}\n}`;

  fs.writeFile(`src/types/errorKeys.ts`, enumContent, (err) => {
    if (err) {
      console.log(chalk.red('Failed to generate enum file'));
      return;
    }
    console.log(
      chalk.green(
        `Translations Enum file Tkeys.ts created in src/translations`,
      ),
    );
  });
} catch (error) {
  console.log(chalk.red(`Failed to generate enum file`));
}
