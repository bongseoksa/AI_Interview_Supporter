/**
 * @file 음성 인식 결과를 화면에 표시하는 컴포넌트
 *
 * 음성 인식(STT)으로 변환된 텍스트를 실시간으로 표시하며,
 * 음성 인식 진행 상태(대기 중, 인식 중)를 시각적으로 나타냅니다.
 */
"use client";

import { useTranslations } from 'next-intl';

interface TranscriptDisplayProps {
  transcript: string;
  isListening: boolean;
}

export function TranscriptDisplay({
  transcript,
  isListening,
}: TranscriptDisplayProps) {
  const t = useTranslations('speech.transcript');

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-card border border-border rounded-lg p-8 min-h-[300px] flex items-center justify-center">
        {transcript ? (
          <div className="text-center space-y-4">
            <p className="text-2xl text-foreground whitespace-pre-wrap">
              {transcript}
            </p>
            {isListening && (
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">
                  {t('listening')}
                </span>
              </div>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground text-lg">
            {isListening ? t('pleaseSpeak') : t('pressStart')}
          </p>
        )}
      </div>
    </div>
  );
}
