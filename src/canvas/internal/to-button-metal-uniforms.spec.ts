import { describe, expect, it } from 'vitest';
import {
  OEN_BUTTON_METAL_REPETITION,
  OEN_BUTTON_METAL_SHAPE,
} from '../consts.ts';
import { toButtonMetalUniforms } from './to-button-metal-uniforms.ts';

describe('toButtonMetalUniforms', () => {
  it('should return the configured repetition when the uniforms are built', () => {
    expect(toButtonMetalUniforms().u_repetition).toBe(
      OEN_BUTTON_METAL_REPETITION,
    );
  });

  it('should return the shape that fills the canvas when the uniforms are built', () => {
    expect(toButtonMetalUniforms().u_shape).toBe(OEN_BUTTON_METAL_SHAPE);
  });

  it('should not return an image when the uniforms are built', () => {
    expect(toButtonMetalUniforms().u_isImage).toBe(false);
  });

  it('should return four channels for each color when the uniforms are built', () => {
    expect(toButtonMetalUniforms()).toMatchObject({
      u_colorBack: expect.any(Array),
      u_colorTint: expect.any(Array),
    });
  });

  it('should return every sizing uniform the vertex shader reads when the uniforms are built', () => {
    expect(toButtonMetalUniforms()).toMatchObject({
      u_fit: expect.any(Number),
      u_scale: expect.any(Number),
      u_rotation: expect.any(Number),
      u_offsetX: expect.any(Number),
      u_offsetY: expect.any(Number),
      u_originX: expect.any(Number),
      u_originY: expect.any(Number),
      u_worldWidth: expect.any(Number),
      u_worldHeight: expect.any(Number),
    });
  });
});
