import { checkEveryArtifact } from './check-every-artifact.ts';
import { readVerifyInputs } from './internal/read-verify-inputs.ts';
import { writeVerifyReport } from './internal/write-verify-report.ts';

export const runVerifyCommand = (): Promise<void> =>
  readVerifyInputs().then(checkEveryArtifact).then(writeVerifyReport);
