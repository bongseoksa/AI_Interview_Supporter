"use client";

import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

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
  if (!isSupported) {
    return (
      <div className="text-center text-destructive">
        이 브라우저는 음성 합성을 지원하지 않습니다.
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
          텍스트 음성 재생
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
          재생 중지
        </Button>
      )}
    </div>
  );
}
