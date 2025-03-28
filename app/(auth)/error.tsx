"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        toast.error(error.message)
        reset()
    }, []);

    return (
        <></>
    );
}
