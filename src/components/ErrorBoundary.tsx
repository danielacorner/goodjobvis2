import { Component } from "react";

/** Sentry exposes a Sentry.ErrorBoundary component as well, if we want to send bounded errors to Sentry
 * https://docs.sentry.io/platforms/javascript/guides/react/#add-react-error-boundary
 */
export class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: any, info: any) {
    console.log({ error, info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          {
            <>
              Something went wrong --{" "}
              <button onClick={() => window.location.reload()}>
                click to retry
              </button>
            </>
          }
        </div>
      );
    }
    return (this.props as any).children;
  }
}

export default ErrorBoundary;
