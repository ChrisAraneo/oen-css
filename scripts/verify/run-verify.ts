import { readVerifyInputs } from './internal/read-verify-inputs.ts';
import { validateEveryArtifact } from './internal/validate-every-artifact.ts';
import { writeVerifyReport } from './internal/write-verify-report.ts';

export const runVerify = (): Promise<boolean> =>
  readVerifyInputs().then(validateEveryArtifact).then(writeVerifyReport);
