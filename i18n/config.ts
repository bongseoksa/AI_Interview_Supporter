/**
 * @file next-intl 국제화 설정
 *
 * 지원 언어, 기본 언어, 언어 이름 등 국제화 관련 설정을 정의합니다.
 */

export const locales = ['ko', 'en', 'ja', 'zh'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ko';

export const localeNames: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  zh: '简体中文',
};

/**
 * locale을 Web Speech API 언어 코드로 변환
 */
export const localeToSpeechLang: Record<Locale, string> = {
  ko: 'ko-KR',
  en: 'en-US',
  ja: 'ja-JP',
  zh: 'zh-CN',
};
