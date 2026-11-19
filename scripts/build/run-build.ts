import { computeBuildArtifacts } from './compute-build-artifacts.ts';
import { readBuildInputs } from './internal/read-build-inputs.ts';
import { writeBuildArtifacts } from './internal/write-build-artifacts.ts';
import { writeBuildReport } from './internal/write-build-report.ts';

export const runBuild = (now: () => number): Promise<boolean> =>
  readBuildInputs(now)
    .then(computeBuildArtifacts)
    .then(writeBuildArtifacts)
    .then((artifacts) => writeBuildReport(artifacts, now));
