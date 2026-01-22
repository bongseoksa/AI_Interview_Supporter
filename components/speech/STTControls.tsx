"use client";

import { Button } from "@/components/ui/button";
import { Mic, MicOff, RotateCcw } from "lucide-react";

interface STTControlsProps {
  isListening: boolean;
  isSupported: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  disabled?: boolean;
}

export function STTControls({
  isListening,
  isSupported,
  onStart,
  onStop,
  onReset,
  disabled = false,
}: STTControlsProps) {
  if (!isSupported) {
    return (
      <div className="text-center text-destructive">
        이 브라우저는 음성 인식을 지원하지 않습니다.
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-4">
      {!isListening ? (
        <Button
          onClick={onStart}
          disabled={disabled}
          size="lg"
          className="gap-2"
        >
          <Mic className="w-5 h-5" />
          음성 인식 시작
        </Button>
      ) : (
        <Button
          onClick={onStop}
          disabled={disabled}
          variant="destructive"
          size="lg"
          className="gap-2"
        >
          <MicOff className="w-5 h-5" />
          음성 인식 종료
        </Button>
      )}

      <Button
        onClick={onReset}
        disabled={disabled || isListening}
        variant="outline"
        size="lg"
        className="gap-2"
      >
        <RotateCcw className="w-5 h-5" />
        초기화
      </Button>
    </div>
  );
}
