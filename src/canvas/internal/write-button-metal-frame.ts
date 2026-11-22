import type { ShaderMount } from '@paper-design/shaders';
import { runEffect } from '../../common/run-effect.ts';

export const writeButtonMetalFrame = (
  metal: ShaderMount,
  frame: number,
): ShaderMount => runEffect(metal, () => metal.setFrame(frame));
