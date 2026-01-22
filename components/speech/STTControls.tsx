/**
 * @file 음성 인식(STT) 제어를 위한 버튼 컴포넌트
 *
 * 음성 인식 시작, 종료, 초기화 버튼을 제공하며,
 * 브라우저의 Web Speech API 지원 여부에 따라 적절한 UI를 표시합니다.
 */
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
