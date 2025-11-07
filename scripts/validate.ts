import { glob } from 'glob';
import { validateDelegates } from './schema';

async function main() {
  console.log(
    `************************************ Validate Delegates! ************************************`
  );

  const paths = await glob(`${process.env.PWD}/data/**/*.json`, {
    ignore: '**/node_modules/**',
  });

  const total = paths.length;
  console.log(`Found ${total} delegate files`);

  let counter = 0;

  for (const path of paths) {
    const { default: delegates } = await import(path, {
      assert: { type: 'json' },
    });

    const fileName = path.split('/').pop() || path;
    console.log(
      `Validating ${fileName}. Progress: [${++counter}/${total}]`
    );

    const validationResult = validateDelegates(delegates);

    if (!validationResult.success) {
      console.error(
        `Validation failed for file "${fileName}" with errors:`
      );
      console.error(validationResult.error);
      throw new Error(`Delegate validation failed. File: ${fileName}`);
    }
  }
}

main().then(() => console.log('done'));
