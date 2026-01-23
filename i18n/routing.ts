/**
 * @file next-intl 라우팅 설정
 *
 * next-intl의 navigation primitives를 생성하여
 * locale-aware한 Link, useRouter, usePathname 등을 제공합니다.
 */
import { createNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from './config';

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});
