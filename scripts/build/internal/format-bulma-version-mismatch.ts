import { P, match } from 'ts-pattern';

const { nullish } = P;

export const formatBulmaVersionMismatch = (
  declared: string | undefined,
  installed: string,
): string | undefined =>
  match(declared)
    .with(nullish, () => undefined)
    .with(installed, () => undefined)
    .otherwise(
      (mismatch) =>
        `Bulma version mismatch: package.json declares oen.bulmaVersion "${mismatch}" but ` +
        `node_modules/bulma is "${installed}". Run \`npm install\`, or update oen.bulmaVersion ` +
        `if the upgrade is intentional.`,
    );
