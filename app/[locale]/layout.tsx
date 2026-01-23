/**
 * @file 다국어 지원 루트 레이아웃
 *
 * next-intl을 사용하여 locale에 따라 동적으로 언어를 설정하고,
 * 우측 상단에 언어 전환 UI를 제공합니다.
 */
import type { Metadata } from "next";
import "../globals.css";
import QueryProvider from "@/providers/query-provider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { locales } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="relative min-h-screen">
            {/* 우측 상단 언어 전환 UI */}
            <div className="absolute top-4 right-4 z-50">
              <LanguageSwitcher />
            </div>

            <QueryProvider>{children}</QueryProvider>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
