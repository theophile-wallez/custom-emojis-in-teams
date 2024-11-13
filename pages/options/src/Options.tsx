import { withErrorBoundary, withSuspense } from '@extension/shared';
import '@src/Options.css';

const Options = () => {
  return <p>Options</p>;
};

export default withErrorBoundary(withSuspense(Options, <div> Loading ... </div>), <div> Error Occur </div>);
