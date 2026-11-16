import { computeBuildArtifacts } from '../compute-build-artifacts.ts';
import { readBuildInputs } from './read-build-inputs.ts';
import { writeBuildArtifacts } from './write-build-artifacts.ts';
import { writeBuildReport } from './write-build-report.ts';

export const runBuild = (now: () => number): Promise<boolean> =>
  readBuildInputs(now)
    .then(computeBuildArtifacts)
    .then(writeBuildArtifacts)
    .then((artifacts) => writeBuildReport(artifacts, now));
