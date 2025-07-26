import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { results } from '../data/testData';
import { useTest } from '../context/TestContext';
import dohandsLogo from '../assets/dohands.png';

const ResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useTest();
  const [copySuccess, setCopySuccess] = useState(false);

  const result = results.find(r => r.id === id);

  const handleGoHome = () => {
    dispatch({ type: 'RESET_TEST' });
    navigate('/');
  };

  const copyResultUrl = async () => {
    const resultUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(resultUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      // 폴백: 구식 브라우저 지원
      const textArea = document.createElement('textarea');
      textArea.value = resultUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  // 갈등 해결 방법 데이터 (4x4 매트릭스)
  const conflictResolutionTips = {
    D: {
      D: "같은 D 타입과 이슈가 있나요? 문제를 정면으로 다루어야 하는 조합! 직접적으로 표현해도 서로 상처 받지 않아요, 단! 누가 '옳다'라는 것을 굳이 끌어낼 필요 없어요.",
      i: "i 타입의 아이디어와 의견을 공유할 수 있는 기회를 주는 것은 어떨까요? 그리고 비판하는 것은 최대한 피해보세요! 공감의 표현도 더하구요.",
      S: "S 타입은 문제 해결 시간이 충분히 필요해요. 그러니 여유를 가지도록 해보세요. 그리고 소통할 때는 직설적인 표현은 피하는 것을 제안 드려요.",
      C: "C 타입과 협업 시 이슈가 생겼을 땐, 문제의 근본부터 찾고 논리적으로 접근하는 것이 빠르게 논쟁을 해결할 수 있어요. 단, 일반화하는 것은 주의하셔야 해요!"
    },
    i: {
      D: "D 타입과 함께 분쟁의 문제를 풀 수 있는 긍정적인 면을 들여다보세요. 단, 과도한 감정적인 대화는 피해야 해요.",
      i: "같은 i 타입이라면, 공감x100! 서로 생각을 나누세요. 하지만 공감으로 인한 긴 대화가 주제에 벗어나지 않도록 집중하셔야 해요!",
      S: "S 타입이 일어난 갈등이 부정적인 상황인 것만이 아니란 것을 알게 해주세요. 친근한 어조와 격려 섞인 대화를 시작한다면 쉽게 해결될 거예요.",
      C: "C 타입과 문제 해결점을 찾을 때 감정을 배제하고, 논리적으로 문제를 들여다 봐야해요."
    },
    S: {
      D: "D 타입과는 어렵더라도 문제를 숨기거나 피하려 하지 말고 충분히 논쟁하며 해결점을 찾는 것이 좋아요.",
      i: "i 타입에게 상황 해결에 있어 열정적임을 보여줘야 해요. 막연히 이 갈등을 끝내고 싶어서 진심 없는 동의는 더 깊은 골을 만들 수 있어요.",
      S: "같은 S 타입와 이슈를 논의할 때 평화로운 분위기를 위해 각자의 요구사항을 논하진 말아요. 배려를 위한 조건들이 논쟁에서 벗어날 수 있어요.",
      C: "C타입과 논리적으로 문제 해결점을 찾되, 개인적이거나 감정적인 표현은 피하는 것이 좋아요."
    },
    C: {
      D: "D 타입과는 디테일에 얽매이지 않고 직접적이고 직설적으로 대화하는 것이 문재 해결의 지름길이랍니다.",
      i: "i 타입과는 이야기를 충분히 해야 해요. 빠른 문제 해결하려고 충분한 시간을 갖지 않으면 오히려 해결되지 않아요.",
      S: "S 타입에게는 작은 농담이라도 개인적인 공격을 하면 안 돼요. 문제가 절대 해결될 수 없는 길로 빠질 수 있어요.",
      C: "같은 C 타입과 분석 뫼비우스에 빠지지 마세요. 분석의 늪에 빠지다 보면 결국 해결점을 찾지 못하고 시간만 쓸 수 있어요."
    }
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">결과를 찾을 수 없습니다</h2>
          <button
            onClick={handleGoHome}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 결과 카드 */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 mb-6">
          {/* 결과 헤더 */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 bg-white rounded-full flex items-center justify-center shadow-lg">
              <img 
                src={dohandsLogo}
                alt="두핸즈 로고" 
                className="w-20 h-20 sm:w-28 sm:h-28 object-contain"
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{result.title}</h1>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full"></div>
          </div>

          {/* 결과 설명 */}
          <div className="mb-6 sm:mb-8">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
              {result.description}
            </p>
          </div>

          {/* 주요 특징 */}
          {result.characteristics && (
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">주요 특징</h3>
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {result.characteristics.map((characteristic, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">{characteristic}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 협업 팁 */}
          {result.collaborationTips && (
            <div className="bg-blue-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 border-l-4 border-blue-600">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">💡 협업 시 팁</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 text-blue-800 font-semibold">
              저와 함께 일할땐 이렇게 해보세요!
              </p>
              <div className="space-y-3">
                {result.collaborationTips.map((tip, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-0.5">✓</span>
                    <span className="text-sm sm:text-base text-gray-700">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 갈등 해결 팁 */}
          <div className="bg-orange-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 border-l-4 border-orange-500">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">🚨 갈등 해결 방법</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 font-semibold">
              당신이 <span className="text-orange-600">{result.title}</span>일 때, 다른 타입과 갈등이 생겼다면 이렇게 해보세요!
            </p>
            <ul className="mt-4 space-y-3">
              {['D', 'i', 'S', 'C'].map((issueType) => (
                <li key={issueType} className="flex items-start">
                  <span className="text-orange-600 mr-2 mt-1">💡</span>
                  <span className="text-sm sm:text-base text-gray-700">
                    <span className="font-semibold text-orange-700">{issueType} 타입과 이슈가 있을 때</span><br />{conflictResolutionTips[result.id as 'D' | 'i' | 'S' | 'C'][issueType as 'D' | 'i' | 'S' | 'C']}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 홈으로 돌아가기 버튼 */}
        <div className="flex justify-center mb-4">
          <button
            onClick={handleGoHome}
            className="bg-gray-500 text-white font-semibold py-3 sm:py-4 px-8 sm:px-12 rounded-xl text-base sm:text-lg hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            홈으로 돌아가기
          </button>
        </div>

        {/* 결과 URL 복사하기 버튼 */}
        <div className="flex justify-center mb-6">
          <button
            onClick={copyResultUrl}
            className={`bg-gradient-to-r text-white font-semibold py-3 sm:py-4 px-8 sm:px-12 rounded-xl text-base sm:text-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center ${
              copySuccess
                ? 'from-green-500 to-green-600'
                : 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
            }`}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {copySuccess ? '복사 완료!' : '결과 URL 복사하기'}
          </button>
        </div>

        {/* 하단 정보 */}
        <div className="mt-6 sm:mt-8 text-center bg-white rounded-xl p-4 sm:p-6 shadow-sm">
          <p className="text-sm text-gray-600">
            이 결과는 참고용이며,<br />개인의 성장과 발전에 도움이 되길 바랍니다.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            참고: [잔디 블로그 - 업무타입 테스트](https://blog.jandi.com/ko/2022/07/29/work-type-test/)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultPage; 