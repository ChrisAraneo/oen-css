import { isEmpty } from 'lodash-es';
import { match } from 'ts-pattern';
import type { BuildArtifacts } from '../types/build-artifacts.ts';
import { writeEveryBuildArtifact } from './write-every-build-artifact.ts';

export const writeBuildArtifacts = (
  artifacts: BuildArtifacts,
): Promise<BuildArtifacts> =>
  match(isEmpty(artifacts.problems))
    .with(true, () => writeEveryBuildArtifact(artifacts))
    .otherwise(() => Promise.resolve(artifacts));
