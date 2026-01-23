/**
 * @file next-intl TypeScript 타입 정의
 *
 * 번역 키 자동완성을 위한 타입 정의입니다.
 * ko.json을 기준으로 IntlMessages 인터페이스를 생성합니다.
 */

import ko from '@/messages/ko.json';

type Messages = typeof ko;

declare global {
  interface IntlMessages extends Messages {}
}
