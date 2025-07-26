import React from 'react';
import { useNavigate } from 'react-router-dom';
import dohandsLogo from '../assets/dohands.png';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/test');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-4 sm:p-8 text-center">
        {/* 로고 영역 */}
        <div className="mb-6 sm:mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
            <img 
              src={dohandsLogo} 
              alt="두핸즈 로고" 
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">두핸즈 업무 성향 진단</h1>
        </div>

        {/* 테스트 소개 */}
        <div className="mb-6 sm:mb-8 text-left">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">진단 안내</h2>
          <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>총 12개의 상황별 질문으로 구성되어 있습니다</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>각 질문에서 4개 항목을 순위별로 선택해주세요<br />(1순위: 가장 잘 맞음 ~ 4순위: 덜 맞음)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>소요시간은 약 5-7분입니다</span>
            </li>
          </ul>
        </div>

        {/* DiSC 유형 설명 */}
        <div className="mb-6 sm:mb-8 text-left">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">업무 성향 유형</h2>
          <div className="grid grid-cols-1 gap-3 sm:gap-4 text-sm">
            <div className="bg-red-50 p-3 sm:p-4 rounded-lg border-l-4 border-red-500">
              <h3 className="font-semibold text-red-700 mb-1 text-sm sm:text-base">D - 주도형 (Dominance)</h3>
              <p className="text-red-600 text-xs sm:text-sm">결과 지향적, 추진력 있는 리더십</p>
            </div>
            <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-semibold text-yellow-700 mb-1 text-sm sm:text-base">i - 사교형 (Influence)</h3>
              <p className="text-yellow-600 text-xs sm:text-sm">낙관적, 소통 능력이 뛰어남</p>
            </div>
            <div className="bg-green-50 p-3 sm:p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-semibold text-green-700 mb-1 text-sm sm:text-base">S - 안정형 (Steadiness)</h3>
              <p className="text-green-600 text-xs sm:text-sm">협력적, 안정감을 중시</p>
            </div>
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-700 mb-1 text-sm sm:text-base">C - 신중형 (Conscientiousness)</h3>
              <p className="text-blue-600 text-xs sm:text-sm">체계적, 정확성을 중시</p>
            </div>
          </div>
        </div>

        {/* 시작 버튼 */}
        <button
          onClick={handleStartTest}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-base sm:text-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          진단 시작하기
        </button>
      </div>
    </div>
  );
};

export default HomePage; 