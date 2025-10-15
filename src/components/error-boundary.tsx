import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
    this.setState({
      error,
      errorInfo,
    })
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })

    window.location.reload()
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-background">
          <Card className="w-full md:w-2/3 shadow-lg border-border/40">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-4">
                <AlertTriangle className="h-12 w-12 text-destructive" />
              </div>
              <CardTitle className="text-2xl font-bold text-center">
                Something went wrong
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-destructive/10 p-4 rounded-md text-sm overflow-auto max-h-64">
                <p className="font-medium text-destructive mb-2">
                  Error:
                </p>
                <p className="font-mono">
                  {this.state.error?.toString()}
                </p>

                {this.state.errorInfo && (
                  <>
                    <p className="font-medium text-destructive mt-4 mb-2">
                      Component Stack:
                    </p>
                    <p className="font-mono whitespace-pre-wrap">
                      {
                        this.state.errorInfo
                          .componentStack
                      }
                    </p>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button
                onClick={this.handleReset}
                className="w-full"
                variant="default"
              >
                Try Again
              </Button>
              <Button
                onClick={() => (window.location.href = '/')}
                className="w-full"
                variant="outline"
              >
                Go to Home Page
              </Button>
            </CardFooter>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
