# 두핸즈 업무 성향 진단 시스템

두핸즈(주)에서 사용하는 업무 성향 진단 시스템입니다. DiSC 모델을 기반으로 구성원들의 업무 스타일을 파악하여 더 나은 협업 환경을 조성하는 데 도움을 줍니다.

## 기술 스택

- React 19
- TypeScript
- Tailwind CSS
- React Router DOM

## 주요 기능

- 12개의 상황별 질문으로 구성된 DiSC 진단
- 실시간 진행률 표시
- 4가지 업무 성향 유형 결과 제공
- 반응형 디자인
- 상태 관리 (Context API)

## URL 구조

- `localhost:3000` - 홈 화면 (진단 시작)
- `localhost:3000/test` - 진단 질문 화면
- `localhost:3000/result/[id]` - 결과 화면

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 빌드
npm run build
```

## 업무 성향 유형

1. **주도형 (D - Dominance)** - 결과 지향적, 추진력 있는 리더십
2. **사교형 (i - Influence)** - 낙관적, 소통 능력이 뛰어남
3. **안정형 (S - Steadiness)** - 협력적, 안정감을 중시
4. **신중형 (C - Conscientiousness)** - 체계적, 정확성을 중시

## 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── HomePage.tsx    # 홈 화면
│   ├── TestPage.tsx    # 진단 화면
│   └── ResultPage.tsx  # 결과 화면
├── context/            # Context API
│   └── TestContext.tsx # 진단 상태 관리
├── data/               # 데이터
│   └── testData.ts     # 질문 및 결과 데이터
├── types/              # TypeScript 타입 정의
│   └── index.ts        # 인터페이스 정의
└── App.tsx             # 메인 앱 컴포넌트
```

## 브랜드 정보

- **회사명**: 두핸즈(주)
- **서비스명**: 품고 (http://poomgo.com/)
- **주요 서비스**: 풀필먼트, 물류 솔루션
- **브랜드 컬러**: 파란색 계열 (#1a365d, #3182ce)

## 참고 자료

- [잔디 블로그 - 업무타입 테스트](https://blog.jandi.com/ko/2022/07/29/work-type-test/)
- DiSC 모델 기반 업무 성향 분석
