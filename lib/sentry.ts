import * as Sentry from "@sentry/nextjs";

// ============================================
// 데코레이터: @Track("category", "message")
// ============================================
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Track(category: string, message: string | ((...args: any[]) => string)) {
  return function (
    _target: unknown,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descriptor.value = function (...args: any[]) {
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
// 에러 캡처 헬퍼
// ============================================
export const captureError = (error: Error, context?: Record<string, unknown>) => {
  Sentry.withScope((scope) => {
    if (context) {
      Object.entries(context).forEach(([key, value]) => {
        scope.setExtra(key, value);
      });
    }
    Sentry.captureException(error);
  });
};

