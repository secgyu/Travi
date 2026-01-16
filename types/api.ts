export type ApiResponse<T = unknown> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string; code?: string };

export type PaginatedResponse<T> = {
  success: true;
  data: T[];
  total: number;
  limit: number;
  offset: number;
};

export const API_ERROR_CODES = {
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INTERNAL_ERROR: "INTERNAL_ERROR",
  RATE_LIMITED: "RATE_LIMITED",
} as const;

export type ApiErrorCode = (typeof API_ERROR_CODES)[keyof typeof API_ERROR_CODES];

export function createApiError(error: string, code?: ApiErrorCode): ApiResponse<never> {
  return { success: false, error, code };
}

export function createApiSuccess<T>(data: T, message?: string): ApiResponse<T> {
  return { success: true, data, message };
}
