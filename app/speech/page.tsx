"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSTT } from "@/hooks/useSTT";
import { useTTS } from "@/hooks/useTTS";
import { isFirefox } from "@/utils/browser";
import { BrowserWarningModal } from "@/components/speech/BrowserWarningModal";
import { TranscriptDisplay } from "@/components/speech/TranscriptDisplay";
import { STTControls } from "@/components/speech/STTControls";
import { TTSControls } from "@/components/speech/TTSControls";
import { VoiceSelector } from "@/components/speech/VoiceSelector";

export default function SpeechPage() {
  const [showWarning, setShowWarning] = useState(false);

  const {
    transcript,
    isListening,
    isSupported: sttSupported,
    error: sttError,
    startListening,
    stopListening,
    resetTranscript,
  } = useSTT({
    lang: "ko-KR",
  });

  const {
    isSpeaking,
    isSupported: ttsSupported,
    voices,
    selectedVoice,
    setSelectedVoice,
    speak,
    stop,
  } = useTTS({
    lang: "ko-KR",
  });

  useEffect(() => {
    if (isFirefox()) {
      setShowWarning(true);
    }
  }, []);

  const handleSpeak = () => {
    if (transcript) {
      speak(transcript);
    }
  };

  const isDisabled = showWarning || (!sttSupported && !ttsSupported);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Link href="/">
              <Button variant="ghost" className="gap-2 -ml-4">
                <ArrowLeft className="w-4 h-4" />
                메인으로
              </Button>
            </Link>
            <h1 className="text-4xl font-bold">STT/TTS PoC</h1>
            <p className="text-muted-foreground">
              Web Speech API를 활용한 음성 인식 및 음성 합성 테스트
            </p>
          </div>
        </div>

        {/* Error Display */}
        {sttError && (
          <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg">
            <p className="font-semibold">오류 발생:</p>
            <p>{sttError}</p>
          </div>
        )}

        {/* Transcript Display */}
        <TranscriptDisplay transcript={transcript} isListening={isListening} />

        {/* STT Controls */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center">음성 인식 (STT)</h2>
          <STTControls
            isListening={isListening}
            isSupported={sttSupported}
            onStart={startListening}
            onStop={stopListening}
            onReset={resetTranscript}
            disabled={isDisabled}
          />
        </div>

        {/* TTS Controls */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center">
            음성 합성 (TTS)
          </h2>

          {/* Voice Selector */}
          <div className="flex flex-col items-center gap-2">
            <label className="text-sm text-muted-foreground">
              음성 선택 {selectedVoice ? `(${selectedVoice.name})` : "(자동)"}
            </label>
            <VoiceSelector
              voices={voices}
              selectedVoice={selectedVoice}
              onVoiceChange={setSelectedVoice}
              disabled={isDisabled}
            />
          </div>

          <TTSControls
            isSpeaking={isSpeaking}
            isSupported={ttsSupported}
            onSpeak={handleSpeak}
            onStop={stop}
            disabled={isDisabled || !transcript}
          />
          {!transcript && (
            <p className="text-center text-sm text-muted-foreground">
              음성 인식으로 텍스트를 입력한 후 재생할 수 있습니다
            </p>
          )}
        </div>

        {/* Info */}
        <div className="bg-muted/50 rounded-lg p-6 space-y-2">
          <h3 className="font-semibold">사용 안내</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>
              &apos;음성 인식 시작&apos; 버튼을 클릭하여 음성 인식을 시작합니다
            </li>
            <li>인식된 텍스트는 실시간으로 화면에 표시됩니다</li>
            <li>
              &apos;음성 인식 종료&apos; 버튼을 클릭하여 음성 인식을 중지합니다
            </li>
            <li>
              &apos;텍스트 음성 재생&apos; 버튼을 클릭하여 인식된 텍스트를 음성으로
              들을 수 있습니다
            </li>
            <li>&apos;초기화&apos; 버튼으로 인식된 텍스트를 지울 수 있습니다</li>
          </ul>
        </div>
      </div>

      {/* Browser Warning Modal */}
      <BrowserWarningModal open={showWarning} onOpenChange={setShowWarning} />
    </div>
  );
}
