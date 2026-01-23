import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // 기본 언어(ko)는 prefix 생략
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
