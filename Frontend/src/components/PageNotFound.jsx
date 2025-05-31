import React from "react";
import { Button } from "@/components/ui/button";

const PageNotFound = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="text-muted-foreground">Oops! The page you're looking for doesn't exist.</p>
            <Button onClick={() => (window.location.href = "/")}>
                Go to Home
            </Button>
        </div>
    );
};

export default PageNotFound;