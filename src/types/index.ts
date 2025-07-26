export interface Question {
  id: string;
  text: string;
  options: Option[];
}

export interface Option {
  id: string;
  text: string;
  type: 'D' | 'i' | 'S' | 'C';
}

export interface TestResult {
  id: string;
  title: string;
  description: string;
  characteristics?: string[];
  collaborationTips?: string[];
}

export interface TestState {
  currentQuestion: number;
  answers: Record<string, string>; // questionId -> 선택된 순위 정보 (예: "1a,2b,3c,4d")
  scores: { D: number; i: number; S: number; C: number };
}

export type TestAction = 
  | { type: 'SELECT_RANKING'; questionId: string; ranking: string[] } // 순위 배열 (예: ["1a", "2b", "3c", "4d"])
  | { type: 'RESET_TEST' };

// 카카오 SDK 타입 정의
declare global {
  interface Window {
    Kakao?: {
      Link: {
        sendDefault: (options: {
          objectType: string;
          content: {
            title: string;
            description: string;
            imageUrl: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          };
          buttons: Array<{
            title: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          }>;
        }) => void;
      };
    };
  }
} 