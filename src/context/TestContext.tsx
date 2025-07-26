import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { TestState, TestAction } from '../types';
import { questions } from '../data/testData';

interface TestContextType {
  state: TestState;
  dispatch: React.Dispatch<TestAction>;
}

const initialState: TestState = {
  currentQuestion: 0,
  answers: {},
  scores: { D: 0, i: 0, S: 0, C: 0 }
};

const testReducer = (state: TestState, action: TestAction): TestState => {
  switch (action.type) {
    case 'SELECT_RANKING':
      // 순위에 따른 점수 계산 (1순위: 4점, 2순위: 3점, 3순위: 2점, 4순위: 1점)
      const newScores = { ...state.scores };
      
      // 현재 질문의 옵션들을 찾아서 순위에 따라 점수 계산
      const currentQuestionOptions = questions[state.currentQuestion].options;
      const optionMap = new Map(currentQuestionOptions.map((option: any) => [option.id, option.type]));
      
      action.ranking.forEach((optionId, index) => {
        const discType = optionMap.get(optionId);
        if (discType) {
          const score = 4 - index; // 1순위: 4점, 2순위: 3점, 3순위: 2점, 4순위: 1점
          newScores[discType as keyof typeof newScores] += score;
        }
      });

      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionId]: action.ranking.join(',')
        },
        scores: newScores,
        currentQuestion: state.currentQuestion + 1
      };

    case 'RESET_TEST':
      return initialState;

    default:
      return state;
  }
};

const TestContext = createContext<TestContextType | undefined>(undefined);

export const useTest = () => {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
};

interface TestProviderProps {
  children: ReactNode;
}

export const TestProvider: React.FC<TestProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(testReducer, initialState);

  return (
    <TestContext.Provider value={{ state, dispatch }}>
      {children}
    </TestContext.Provider>
  );
}; 