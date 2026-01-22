# AI Interview Supporter

AI 기반 면접 지원 시스템

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Server State**: TanStack Query (React Query)
- **Form Management**: React Hook Form
- **Validation**: Zod

## 시작하기

### 필수 요구사항

- Node.js 18.17 이상
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 빌드

```bash
npm run build
npm start
```

## 프로젝트 구조

```
.
├── app/                  # Next.js App Router 페이지
├── components/           # React 컴포넌트
│   └── ui/              # shadcn/ui 컴포넌트
├── hooks/               # Custom React Hooks
├── lib/                 # 유틸리티 함수
├── providers/           # Context Providers
├── schemas/             # Zod 스키마
├── services/            # API 서비스
├── store/               # Zustand 스토어
├── types/               # TypeScript 타입 정의
├── utils/               # 유틸리티 함수
└── constants/           # 상수 정의
```

## 주요 기능 (예정)

- AI 기반 면접 질문 생성
- 실시간 면접 연습
- 답변 분석 및 피드백
- 면접 준비 자료 관리
