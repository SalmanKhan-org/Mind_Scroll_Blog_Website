import React from "react";

import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    handleGoHome = () => {
        window.location.href = "/";
    };

    handleRefresh = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                    <div className="max-w-md w-full space-y-6 text-center">
                        <Alert variant="destructive" className="border-2">
                            <AlertCircle className="h-5 w-5" />
                            <AlertTitle className="text-xl font-bold">Something went wrong</AlertTitle>
                            <AlertDescription>
                                An unexpected error has occurred. Please try one of the options below.
                            </AlertDescription>
                        </Alert>

                        <div className="flex justify-center gap-4">
                            <Button onClick={this.handleGoHome} variant="default">
                                Go to Home
                            </Button>
                            <Button onClick={this.handleRefresh} variant="outline">
                                Refresh Page
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
