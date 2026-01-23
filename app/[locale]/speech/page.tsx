/**
 * @file 음성 인식(STT) 및 음성 합성(TTS) 데모 페이지
 *
 * Web Speech API를 사용하여 음성 인식과 음성 합성 기능을 테스트할 수 있는 페이지입니다.
 * - 실시간 음성 인식: 사용자의 음성을 텍스트로 변환
 * - 음성 합성: 인식된 텍스트를 음성으로 재생
 * - 음성 선택: 사용자가 선호하는 음성을 선택하거나 자동 언어 감지 사용
 * - 브라우저 호환성 경고: Firefox 사용자에게 지원되는 브라우저 안내
 */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
import { useTranslations } from 'next-intl';
import { localeToSpeechLang, defaultLocale, type Locale } from "@/i18n/config";

export default function SpeechPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || defaultLocale;
  const t = useTranslations('speech');

  const [showWarning, setShowWarning] = useState(false);

  // locale에 따라 음성 인식 언어 설정
  const speechLang = localeToSpeechLang[locale] || 'ko-KR';

  const {
    transcript,
    isListening,
    isSupported: sttSupported,
    error: sttError,
    startListening,
    stopListening,
    resetTranscript,
  } = useSTT({
    lang: speechLang,
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
    lang: speechLang,
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

  // 기본 언어(ko)는 prefix 없이, 다른 언어는 prefix 포함
  const homeLink = locale === defaultLocale ? '/' : `/${locale}`;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Link href={homeLink}>
              <Button variant="ghost" className="gap-2 -ml-4">
                <ArrowLeft className="w-4 h-4" />
                {t('page.backToMain')}
              </Button>
            </Link>
            <h1 className="text-4xl font-bold">{t('page.title')}</h1>
            <p className="text-muted-foreground">
              {t('page.description')}
            </p>
          </div>
        </div>

        {/* Error Display */}
        {sttError && (
          <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg">
            <p className="font-semibold">{t('page.errorOccurred')}</p>
            <p>{sttError}</p>
          </div>
        )}

        {/* Transcript Display */}
        <TranscriptDisplay transcript={transcript} isListening={isListening} />

        {/* STT Controls */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center">{t('page.sttSectionTitle')}</h2>
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
            {t('page.ttsSectionTitle')}
          </h2>

          {/* Voice Selector */}
          <div className="flex flex-col items-center gap-2">
            <label className="text-sm text-muted-foreground">
              {t('page.voiceLabel')} {selectedVoice ? t('page.voiceSelected', { name: selectedVoice.name }) : t('page.voiceAuto')}
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
              {t('page.needTranscript')}
            </p>
          )}
        </div>

        {/* Info */}
        <div className="bg-muted/50 rounded-lg p-6 space-y-2">
          <h3 className="font-semibold">{t('page.usageGuide.title')}</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>{t('page.usageGuide.item1')}</li>
            <li>{t('page.usageGuide.item2')}</li>
            <li>{t('page.usageGuide.item3')}</li>
            <li>{t('page.usageGuide.item4')}</li>
            <li>{t('page.usageGuide.item5')}</li>
          </ul>
        </div>
      </div>

      {/* Browser Warning Modal */}
      <BrowserWarningModal open={showWarning} onOpenChange={setShowWarning} />
    </div>
  );
}
