/**
 * @file next-intl 서버 사이드 요청 설정
 *
 * 서버 컴포넌트에서 번역을 사용하기 위한 설정을 정의합니다.
 * 요청된 locale에 따라 해당 언어의 메시지 파일을 로드합니다.
 */

import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
