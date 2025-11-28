"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";

interface AsyncActionOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  successMessage?: string;
  successDescription?: string;
  errorMessage?: string;
  errorDescription?: string;
  showToast?: boolean;
}

interface AsyncActionResult<T> {
  execute: () => Promise<T | undefined>;
  isLoading: boolean;
  error: Error | null;
  data: T | null;
  reset: () => void;
}

export function useAsyncAction<T>(
  asyncFn: () => Promise<T>,
  options: AsyncActionOptions<T> = {}
): AsyncActionResult<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const {
    onSuccess,
    onError,
    successMessage,
    successDescription,
    errorMessage = "오류 발생",
    errorDescription,
    showToast = true,
  } = options;

  const execute = useCallback(async (): Promise<T | undefined> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await asyncFn();
      setData(result);

      if (showToast && successMessage) {
        toast.success(successMessage, { description: successDescription });
      }

      onSuccess?.(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);

      if (showToast) {
        toast.error(errorMessage, {
          description: errorDescription || error.message,
        });
      }

      onError?.(error);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }, [asyncFn, onSuccess, onError, successMessage, successDescription, errorMessage, errorDescription, showToast]);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setData(null);
  }, []);

  return { execute, isLoading, error, data, reset };
}

export function useAsyncActionWithParams<P, T>(
  asyncFn: (params: P) => Promise<T>,
  options: AsyncActionOptions<T> = {}
): Omit<AsyncActionResult<T>, "execute"> & { execute: (params: P) => Promise<T | undefined> } {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const {
    onSuccess,
    onError,
    successMessage,
    successDescription,
    errorMessage = "오류 발생",
    errorDescription,
    showToast = true,
  } = options;

  const execute = useCallback(
    async (params: P): Promise<T | undefined> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await asyncFn(params);
        setData(result);

        if (showToast && successMessage) {
          toast.success(successMessage, { description: successDescription });
        }

        onSuccess?.(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        setError(error);

        if (showToast) {
          toast.error(errorMessage, {
            description: errorDescription || error.message,
          });
        }

        onError?.(error);
        return undefined;
      } finally {
        setIsLoading(false);
      }
    },
    [asyncFn, onSuccess, onError, successMessage, successDescription, errorMessage, errorDescription, showToast]
  );

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setData(null);
  }, []);

  return { execute, isLoading, error, data, reset };
}

