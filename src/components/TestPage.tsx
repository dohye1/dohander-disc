import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import { questions, getResultByScore } from '../data/testData';

const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useTest();
  
  const currentQuestion = questions[state.currentQuestion];
  const progress = ((state.currentQuestion + 1) / questions.length) * 100;

  // 순위 선택 상태 관리
  const [selectedRankings, setSelectedRankings] = useState<string[]>([]);
  const [isRankingComplete, setIsRankingComplete] = useState(false);

  const handleOptionSelect = (optionId: string) => {
    if (selectedRankings.includes(optionId)) {
      // 이미 선택된 옵션이면 제거
      setSelectedRankings(selectedRankings.filter(id => id !== optionId));
      setIsRankingComplete(false);
    } else if (selectedRankings.length < 4) {
      // 새로운 옵션 선택
      const newRankings = [...selectedRankings, optionId];
      setSelectedRankings(newRankings);
      
      // 4개 모두 선택되면 완료
      if (newRankings.length === 4) {
        setIsRankingComplete(true);
      }
    }
  };

  const handleNextQuestion = () => {
    if (isRankingComplete) {
      dispatch({
        type: 'SELECT_RANKING',
        questionId: currentQuestion.id,
        ranking: selectedRankings
      });

      // 마지막 질문이면 결과 페이지로 이동
      if (state.currentQuestion + 1 >= questions.length) {
        const result = getResultByScore(state.scores);
        navigate(`/result/${result.id}`);
      }

      // 상태 초기화
      setSelectedRankings([]);
      setIsRankingComplete(false);
    }
  };

  const getRankingNumber = (optionId: string) => {
    const index = selectedRankings.indexOf(optionId);
    return index >= 0 ? index + 1 : null;
  };

  const getRankingColor = (optionId: string) => {
    const ranking = getRankingNumber(optionId);
    if (!ranking) return 'bg-gray-100 border-gray-200';
    
    switch (ranking) {
      case 1: return 'bg-blue-100 border-blue-500';
      case 2: return 'bg-green-100 border-green-500';
      case 3: return 'bg-yellow-100 border-yellow-500';
      case 4: return 'bg-red-100 border-red-500';
      default: return 'bg-gray-100 border-gray-200';
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">진단 완료!</h2>
          <p className="text-gray-600">결과를 확인해주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-3xl mx-auto">
        {/* 진행률 바 */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              {state.currentQuestion + 1} / {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
            <div 
              className="bg-gradient-to-r from-blue-600 to-blue-800 h-2 sm:h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* 질문 카드 */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 text-center leading-relaxed">
            {currentQuestion.text}
          </h2>

          {/* 순위 선택 안내 */}
          <div className="mb-6 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
            <h3 className="font-semibold text-blue-800 mb-2">순위 선택 방법</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
              <div className="flex items-center">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">1</span>
                <span className="text-blue-700">가장 잘 맞음 (4점)</span>
              </div>
              <div className="flex items-center">
                <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">2</span>
                <span className="text-green-700">잘 맞음 (3점)</span>
              </div>
              <div className="flex items-center">
                <span className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">3</span>
                <span className="text-yellow-700">보통 (2점)</span>
              </div>
              <div className="flex items-center">
                <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">4</span>
                <span className="text-red-700">덜 맞음 (1점)</span>
              </div>
            </div>
          </div>

          {/* 답변 옵션들 */}
          <div className="space-y-3 sm:space-y-4">
            {currentQuestion.options.map((option) => {
              const ranking = getRankingNumber(option.id);
              const isSelected = selectedRankings.includes(option.id);
              
              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`w-full p-4 sm:p-5 text-left border-2 rounded-xl transition-all duration-200 group relative ${
                    isSelected 
                      ? getRankingColor(option.id)
                      : 'border-gray-200 hover:border-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-start">
                    {/* 순위 표시 */}
                    {ranking && (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 sm:mr-4 flex-shrink-0 ${
                        ranking === 1 ? 'bg-blue-500' :
                        ranking === 2 ? 'bg-green-500' :
                        ranking === 3 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}>
                        {ranking}
                      </div>
                    )}
                    
                    {/* 기본 라디오 버튼 (선택되지 않은 경우) */}
                    {!isSelected && (
                      <div className="w-8 h-8 border-2 border-gray-300 rounded-full mr-3 sm:mr-4 flex-shrink-0 group-hover:border-blue-600 transition-colors duration-200"></div>
                    )}
                    
                    <span className="text-base sm:text-lg text-gray-700 group-hover:text-gray-900 leading-relaxed">
                      {option.text}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 다음 버튼 */}
          {isRankingComplete && (
            <div className="mt-6 sm:mt-8 text-center">
              <button
                onClick={handleNextQuestion}
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3 sm:py-4 px-8 sm:px-12 rounded-xl text-base sm:text-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                {state.currentQuestion + 1 >= questions.length ? '결과 보기' : '다음 질문'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPage; 