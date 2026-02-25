import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_error: Error): State {
    // We can log the error if needed
    console.debug('Error boundary caught:', _error);
    return { hasError: true };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <Card className="error-card" noHover>
            <AlertTriangle size={48} className="error-icon" />
            <h2 className="error-title">Something went wrong</h2>
            <p className="error-description">
              The application encountered an unexpected error. Don't worry, your data is safe.
            </p>
            <Button onClick={() => window.location.reload()} className="error-reload-btn">
              <RefreshCw size={16} />
              Reload Application
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
