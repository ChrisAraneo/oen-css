import { map, parseInt } from 'lodash-es';

const HEX_CHANNEL = /[0-9a-f]{2}/gi;
const HEX_RADIX = 16;
const NO_CHANNELS: readonly string[] = Object.freeze([]);

export const toRgbChannels = (hex: string): readonly number[] =>
  map(hex.match(HEX_CHANNEL) ?? NO_CHANNELS, (channel) =>
    parseInt(channel, HEX_RADIX),
  );
