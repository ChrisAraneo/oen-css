import { match, P } from 'ts-pattern';
import { OEN_CUSTOM_PROPERTY_PREFIX } from '../../namespace/consts.ts';
import { OEN_BUTTON_GLASS_SATURATION_BOOST } from '../consts.ts';
import type { ButtonGlassLayer } from '../types/button-glass-layer.ts';

const { number } = P;

const OPAQUE_STOP = '0%';

const CLEAR_STOP = 'transparent';

const BUTTON_HUE = `var(${OEN_CUSTOM_PROPERTY_PREFIX}button-h)`;

const BUTTON_SATURATION = `calc(var(${OEN_CUSTOM_PROPERTY_PREFIX}button-s) + ${OEN_BUTTON_GLASS_SATURATION_BOOST})`;

const BUTTON_LIGHTNESS = `var(${OEN_CUSTOM_PROPERTY_PREFIX}button-background-l)`;

const formatLightness = (offset: number): string =>
  match(offset)
    .with(number.gte(0), (lighter) => `calc(${BUTTON_LIGHTNESS} + ${lighter}%)`)
    .otherwise((darker) => `calc(${BUTTON_LIGHTNESS} - ${-darker}%)`);

export const formatGlassLayer = ({
  offset,
  size,
  position,
  falloff,
}: ButtonGlassLayer): string =>
  `radial-gradient(${size} at ${position}, hsl(${BUTTON_HUE}, ${BUTTON_SATURATION}, ${formatLightness(offset)}) ${OPAQUE_STOP}, ${CLEAR_STOP} ${falloff})`;
