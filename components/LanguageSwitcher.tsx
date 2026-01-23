/**
 * @file 언어 전환 드롭다운 컴포넌트
 *
 * 사용자가 지원되는 언어 중 하나를 선택하여 UI 언어를 변경할 수 있습니다.
 * next-intl의 locale routing과 연동되어 URL도 함께 변경됩니다.
 */
'use client';

import { useParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { locales, localeNames, defaultLocale, type Locale } from '@/i18n/config';
import { useRouter, usePathname } from '@/i18n/routing';

export function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  // params.locale이 없으면 기본 언어(ko)
  const currentLocale = (params.locale as Locale) || defaultLocale;

  const handleLocaleChange = (newLocale: string) => {
    // next-intl의 useRouter는 자동으로 locale을 처리
    router.replace(pathname, { locale: newLocale as Locale });
  };

  return (
    <Select value={currentLocale} onValueChange={handleLocaleChange}>
      <SelectTrigger className="w-[140px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {localeNames[locale]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
