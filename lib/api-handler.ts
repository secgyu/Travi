import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createApiError, createApiSuccess, API_ERROR_CODES, type ApiErrorCode } from "@/types/api";

type ApiHandler<T = unknown> = (
  request: NextRequest,
  context: { params?: Promise<Record<string, string>>; session?: Awaited<ReturnType<typeof getServerSession>> }
) => Promise<T>;

interface HandlerOptions {
  requireAuth?: boolean;
}

export function withHandler<T>(handler: ApiHandler<T>, options: HandlerOptions = {}) {
  return async (request: NextRequest, context?: { params?: Promise<Record<string, string>> }) => {
    try {
      let session = null;
      if (options.requireAuth) {
        session = await getServerSession(authOptions);
        if (!session?.user?.id) {
          return NextResponse.json(
            createApiError("로그인이 필요합니다", API_ERROR_CODES.UNAUTHORIZED),
            { status: 401 }
          );
        }
      }

      const result = await handler(request, { params: context?.params, session });

      if (result instanceof NextResponse) {
        return result;
      }

      return NextResponse.json(createApiSuccess(result));
    } catch (error) {
      console.error("[API Error]", error);

      if (error instanceof ApiError) {
        return NextResponse.json(
          createApiError(error.message, error.code),
          { status: error.status }
        );
      }

      return NextResponse.json(
        createApiError("서버 오류가 발생했습니다", API_ERROR_CODES.INTERNAL_ERROR),
        { status: 500 }
      );
    }
  };
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number = 500,
    public code?: ApiErrorCode
  ) {
    super(message);
    this.name = "ApiError";
  }

  static badRequest(message: string) {
    return new ApiError(message, 400, API_ERROR_CODES.VALIDATION_ERROR);
  }

  static unauthorized(message = "로그인이 필요합니다") {
    return new ApiError(message, 401, API_ERROR_CODES.UNAUTHORIZED);
  }

  static forbidden(message = "권한이 없습니다") {
    return new ApiError(message, 403, API_ERROR_CODES.FORBIDDEN);
  }

  static notFound(message = "리소스를 찾을 수 없습니다") {
    return new ApiError(message, 404, API_ERROR_CODES.NOT_FOUND);
  }

  static internal(message = "서버 오류가 발생했습니다") {
    return new ApiError(message, 500, API_ERROR_CODES.INTERNAL_ERROR);
  }
}

export const respond = {
  success: <T>(data: T, status = 200) =>
    NextResponse.json(createApiSuccess(data), { status }),

  error: (message: string, status = 400, code?: string) =>
    NextResponse.json(createApiError(message, code as never), { status }),

  created: <T>(data: T) =>
    NextResponse.json(createApiSuccess(data, "생성되었습니다"), { status: 201 }),

  noContent: () => new NextResponse(null, { status: 204 }),

  paginated: <T>(data: T[], total: number, limit: number, offset: number) =>
    NextResponse.json({ success: true, data, total, limit, offset }),
};
