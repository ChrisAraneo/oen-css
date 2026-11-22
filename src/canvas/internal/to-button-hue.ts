import {
  add,
  divide,
  eq,
  max,
  min,
  multiply,
  subtract,
  toFinite,
} from 'lodash-es';
import { pipe } from 'remeda';
import { match } from 'ts-pattern';
import {
  OEN_BUTTON_ACHROMATIC_HUE,
  OEN_BUTTON_HUE_SECTOR,
  OEN_BUTTON_HUE_TURN,
} from '../consts.ts';
import type { ButtonRgb } from '../types/button-rgb.ts';

const NO_SPAN = 0;

const GREEN_SECTOR = 2;

const BLUE_SECTOR = 4;

const toLargest = ({ red, green, blue }: ButtonRgb): number =>
  toFinite(max([red, green, blue]));

const toSmallest = ({ red, green, blue }: ButtonRgb): number =>
  toFinite(min([red, green, blue]));

const toRedSector = ({ green, blue }: ButtonRgb, span: number): number =>
  divide(subtract(green, blue), span);

const toGreenSector = ({ blue, red }: ButtonRgb, span: number): number =>
  add(divide(subtract(blue, red), span), GREEN_SECTOR);

const toBlueSector = ({ red, green }: ButtonRgb, span: number): number =>
  add(divide(subtract(red, green), span), BLUE_SECTOR);

const toSector = (rgb: ButtonRgb, span: number): number =>
  match(toLargest(rgb))
    .when(
      (largest) => eq(largest, rgb.red),
      () => toRedSector(rgb, span),
    )
    .when(
      (largest) => eq(largest, rgb.green),
      () => toGreenSector(rgb, span),
    )
    .otherwise(() => toBlueSector(rgb, span));

export const toButtonHue = (rgb: ButtonRgb): number =>
  match(subtract(toLargest(rgb), toSmallest(rgb)))
    .with(NO_SPAN, () => OEN_BUTTON_ACHROMATIC_HUE)
    .otherwise((span) =>
      pipe(
        multiply(toSector(rgb, span), OEN_BUTTON_HUE_SECTOR),
        (degrees) => add(degrees, OEN_BUTTON_HUE_TURN) % OEN_BUTTON_HUE_TURN,
      ),
    );
