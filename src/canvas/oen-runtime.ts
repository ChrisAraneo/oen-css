import { match } from 'ts-pattern';
import { startButtonCanvasRuntime } from './start-button-canvas-runtime.ts';

const startOnReadyState = () =>
  match(document.readyState)
    .with('loading', () =>
      document.addEventListener('DOMContentLoaded', () =>
        startButtonCanvasRuntime(window),
      ),
    )
    .otherwise(() => startButtonCanvasRuntime(window));

match(typeof document)
  .with('undefined', () => undefined)
  .otherwise(() => startOnReadyState());
