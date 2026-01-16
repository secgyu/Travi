import * as Sentry from "@sentry/nextjs";

// ============================================
// 데코레이터: @Track("category", "message")
// ============================================
export function Track(category: string, message: string | ((...args: unknown[]) => string)) {
  return function (
    _target: unknown,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: unknown[]) {
      const msg = typeof message === "function" ? message(...args) : message;

      Sentry.addBreadcrumb({
        category,
        message: msg,
        level: "info",
        data: args.length > 0 ? { args } : undefined,
      });

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

// ============================================
// 서비스 클래스: 데코레이터 적용 예시
// ============================================
export class TravelTracker {
  @Track("travel", (id: string) => `여행 계획 조회 (ID: ${id})`)
  static viewPlan(id: string) {
    return id;
  }

  @Track("travel", (dest: string) => `여행 계획 저장 (${dest})`)
  static savePlan(destination: string, planId?: string) {
    return { destination, planId };
  }

  @Track("travel", (dest: string) => `내 여행에 저장 (${dest})`)
  static saveToMyTrips(destination: string, planId: string) {
    return { destination, planId };
  }

  @Track("travel", (dest: string, dur: number) => `AI 여행 계획 생성 (${dest} ${dur}일)`)
  static generatePlan(destination: string, duration: number, budget: number) {
    return { destination, duration, budget };
  }
}

export class ChatTracker {
  @Track("chat", "AI 채팅 메시지 전송")
  static sendMessage(preview: string) {
    return preview.substring(0, 50);
  }
}

export class AuthTracker {
  @Track("auth", (email: string) => `로그인 시도 (${email})`)
  static login(email: string) {
    return email;
  }

  @Track("auth", "로그아웃")
  static logout() {
    return true;
  }
}

// ============================================
// 간단한 track 객체 (데코레이터 없이 쓸 때)
// ============================================
export const track = {
  travel: {
    viewPlan: (id: string) => TravelTracker.viewPlan(id),
    savePlan: (dest: string, planId?: string) => TravelTracker.savePlan(dest, planId),
    saveToMyTrips: (dest: string, planId: string) => TravelTracker.saveToMyTrips(dest, planId),
    generatePlan: (dest: string, dur: number, budget: number) => TravelTracker.generatePlan(dest, dur, budget),
  },
  chat: {
    sendMessage: (preview: string) => ChatTracker.sendMessage(preview),
  },
  auth: {
    login: (email: string) => AuthTracker.login(email),
    logout: () => AuthTracker.logout(),
  },
  custom: (category: string, message: string, data?: Record<string, unknown>) =>
    Sentry.addBreadcrumb({ category, message, level: "info", data }),
};

// ============================================
// 커스텀 태깅: 에러 분류 및 필터링
// ============================================
export const tag = {
  // 단일 태그 설정
  set: (key: string, value: string) => {
    Sentry.setTag(key, value);
  },

  // 여러 태그 한번에 설정
  setMany: (tags: Record<string, string>) => {
    Sentry.setTags(tags);
  },

  // 여행 관련 태그
  travel: {
    destination: (city: string) => Sentry.setTag("destination", city),
    duration: (days: number) => Sentry.setTag("duration", `${days}일`),
    budget: (range: "low" | "mid" | "high") => Sentry.setTag("budget_range", range),
  },

  // 기능별 태그
  feature: (name: "chat" | "travel-plan" | "auth" | "explore" | "my-page") => {
    Sentry.setTag("feature", name);
  },

  // 페이지 태그
  page: (name: string) => {
    Sentry.setTag("page", name);
  },

  // 에러 심각도 태그
  severity: (level: "low" | "medium" | "high" | "critical") => {
    Sentry.setTag("severity", level);
  },

  // 태그 초기화
  clear: () => {
    Sentry.setTags({
      destination: "",
      duration: "",
      budget_range: "",
      feature: "",
      page: "",
      severity: "",
    });
  },
};

// ============================================
// 에러 캡처 헬퍼 (태그 포함)
// ============================================
export const captureError = (
  error: Error,
  options?: {
    tags?: Record<string, string>;
    extra?: Record<string, unknown>;
    level?: "fatal" | "error" | "warning" | "info";
  }
) => {
  Sentry.withScope((scope) => {
    if (options?.tags) {
      Object.entries(options.tags).forEach(([key, value]) => {
        scope.setTag(key, value);
      });
    }
    if (options?.extra) {
      Object.entries(options.extra).forEach(([key, value]) => {
        scope.setExtra(key, value);
      });
    }
    if (options?.level) {
      scope.setLevel(options.level);
    }
    Sentry.captureException(error);
  });
};

// ============================================
// 태그가 포함된 에러 캡처 (편의 함수)
// ============================================
export const captureWithTags = {
  // 여행 관련 에러
  travel: (error: Error, destination: string, extra?: Record<string, unknown>) => {
    captureError(error, {
      tags: { feature: "travel-plan", destination },
      extra,
    });
  },

  // 채팅 관련 에러
  chat: (error: Error, extra?: Record<string, unknown>) => {
    captureError(error, {
      tags: { feature: "chat" },
      extra,
    });
  },

  // 인증 관련 에러
  auth: (error: Error, extra?: Record<string, unknown>) => {
    captureError(error, {
      tags: { feature: "auth" },
      extra,
      level: "error",
    });
  },

  // API 에러
  api: (error: Error, endpoint: string, extra?: Record<string, unknown>) => {
    captureError(error, {
      tags: { feature: "api", endpoint },
      extra,
    });
  },

  // 치명적 에러
  critical: (error: Error, feature: string, extra?: Record<string, unknown>) => {
    captureError(error, {
      tags: { feature, severity: "critical" },
      extra,
      level: "fatal",
    });
  },
};

