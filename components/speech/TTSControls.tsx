/**
 * @file 음성 합성(TTS) 제어를 위한 버튼 컴포넌트
 *
 * 텍스트를 음성으로 재생하거나 중지하는 버튼을 제공하며,
 * 브라우저의 Web Speech API 지원 여부에 따라 적절한 UI를 표시합니다.
 */
"use client";

import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { useTranslations } from 'next-intl';

interface TTSControlsProps {
  isSpeaking: boolean;
  isSupported: boolean;
  onSpeak: () => void;
  onStop: () => void;
  disabled?: boolean;
}

export function TTSControls({
  isSpeaking,
  isSupported,
  onSpeak,
  onStop,
  disabled = false,
}: TTSControlsProps) {
  const t = useTranslations('speech.tts');

  if (!isSupported) {
    return (
      <div className="text-center text-destructive">
        {t('notSupported')}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-4">
      {!isSpeaking ? (
        <Button
          onClick={onSpeak}
          disabled={disabled}
          size="lg"
          variant="secondary"
          className="gap-2"
        >
          <Volume2 className="w-5 h-5" />
          {t('speakButton')}
        </Button>
      ) : (
        <Button
          onClick={onStop}
          disabled={disabled}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          <VolumeX className="w-5 h-5" />
          {t('stopButton')}
        </Button>
      )}
    </div>
  );
}
