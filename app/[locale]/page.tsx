/**
 * @file 다국어 지원 홈 페이지
 *
 * 프로젝트의 메인 페이지로, 사용자의 locale에 맞는 언어로 표시됩니다.
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  // 기본 언어(ko)는 prefix 없이, 다른 언어는 prefix 포함
  const speechLink = locale === 'ko' ? '/speech' : `/${locale}/speech`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl text-gray-600">{t('description')}</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Link href={speechLink}>
            <Button size="lg" className="gap-2">
              <Mic className="w-5 h-5" />
              {t('sttTestButton')}
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground">
            {t('sttTestDescription')}
          </p>
        </div>
      </div>
    </main>
  );
}
