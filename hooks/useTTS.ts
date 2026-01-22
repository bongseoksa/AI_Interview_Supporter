/**
 * @file 음성 합성(TTS) 기능을 제공하는 커스텀 훅
 *
 * Web Speech API의 SpeechSynthesis를 사용하여 텍스트를 음성으로 변환합니다.
 * 자동 언어 감지, 음성 선택, 재생 제어 등의 기능을 포함합니다.
 */
"use client";

import { useState, useCallback, useEffect } from "react";

interface UseTTSOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

interface UseTTSReturn {
  isSpeaking: boolean;
  isSupported: boolean;
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  setSelectedVoice: (voice: SpeechSynthesisVoice | null) => void;
  speak: (text: string) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
}

/**
 * Web Speech API를 사용하여 텍스트를 음성으로 변환하는 커스텀 훅
 * 사용자가 음성을 선택하거나 자동으로 언어를 감지하여 적절한 음성을 사용합니다.
 *
 * @param {UseTTSOptions} options - TTS 옵션
 * @param {string} [options.lang="ko-KR"] - 기본 언어 코드 (자동 감지 시 사용되지 않음)
 * @param {number} [options.rate=1] - 음성 속도 (0.1 ~ 10)
 * @param {number} [options.pitch=1] - 음성 피치 (0 ~ 2)
 * @param {number} [options.volume=1] - 음성 볼륨 (0 ~ 1)
 * @returns {UseTTSReturn} TTS 상태 및 제어 함수
 *
 * @example
 * const { speak, stop, voices, selectedVoice, setSelectedVoice } = useTTS();
 *
 * // 자동 언어 감지로 재생
 * speak("안녕하세요");
 *
 * // 특정 음성 선택
 * setSelectedVoice(voices[0]);
 * speak("Hello");
 */
export function useTTS(options: UseTTSOptions = {}): UseTTSReturn {
  const { rate = 1, pitch = 1, volume = 1 } = options;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true);

      // 음성 목록 로드 확인
      const checkVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        if (availableVoices.length > 0) {
          setVoices(availableVoices);
          setVoicesLoaded(true);
          console.log("🎤 음성 목록 로드됨:", availableVoices.length, "개");
          // 한국어 음성 확인
          const koreanVoices = availableVoices.filter((v) =>
            v.lang.startsWith("ko")
          );
          console.log(
            "🇰🇷 한국어 음성 목록:",
            koreanVoices.map((v) => `${v.name} (${v.lang})`)
          );
        }
      };

      // 즉시 확인
      checkVoices();

      // voiceschanged 이벤트 리스너 추가
      window.speechSynthesis.addEventListener("voiceschanged", checkVoices);

      return () => {
        window.speechSynthesis.removeEventListener("voiceschanged", checkVoices);
      };
    }
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!isSupported || !text.trim()) return;

      const performSpeak = () => {
        window.speechSynthesis.cancel();

        // 텍스트에서 한글 감지 (한글 유니코드 범위: AC00-D7A3)
        const hasKorean = /[가-힣]/.test(text);

        // 현재 사용 가능한 음성 목록 다시 가져오기 (최신 상태 보장)
        const currentVoices = window.speechSynthesis.getVoices();

        console.log("🔊 TTS 실행 - 문구:", text);
        console.log("📊 사용 가능한 음성 개수:", currentVoices.length);

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.volume = volume;

        // 사용자가 음성을 선택한 경우 해당 음성 사용
        if (selectedVoice) {
          utterance.voice = selectedVoice;
          utterance.lang = selectedVoice.lang;
          console.log(
            "✅ 사용자 선택 음성:",
            selectedVoice.name,
            "(",
            selectedVoice.lang,
            ")"
          );
        } else {
          // 자동 선택 모드
          if (hasKorean) {
            // 한국어가 포함된 경우 한국어 음성 찾기
            // Google 한국어를 최우선으로, 없으면 다른 ko-KR 음성 선택
            const koreanVoice =
              currentVoices.find(
                (voice) =>
                  voice.lang === "ko-KR" &&
                  voice.name.toLowerCase().includes("google")
              ) ||
              currentVoices.find((voice) => voice.lang === "ko-KR") ||
              currentVoices.find((voice) => voice.lang.startsWith("ko"));

            if (koreanVoice) {
              utterance.voice = koreanVoice;
              utterance.lang = koreanVoice.lang;
              console.log(
                "✅ 자동 선택 한국어 음성:",
                koreanVoice.name,
                "(",
                koreanVoice.lang,
                ")"
              );
            } else {
              utterance.lang = "ko-KR";
              console.warn("⚠️ 한국어 음성을 찾을 수 없어 기본 설정 사용");
            }
          } else {
            // 한국어가 없으면 영어 음성 사용
            const englishVoice =
              currentVoices.find(
                (voice) =>
                  voice.lang === "en-US" &&
                  voice.name.toLowerCase().includes("google")
              ) ||
              currentVoices.find((voice) => voice.lang === "en-US") ||
              currentVoices.find((voice) => voice.lang.startsWith("en"));

            if (englishVoice) {
              utterance.voice = englishVoice;
              utterance.lang = englishVoice.lang;
              console.log(
                "✅ 자동 선택 영어 음성:",
                englishVoice.name,
                "(",
                englishVoice.lang,
                ")"
              );
            } else {
              utterance.lang = "en-US";
            }
          }
        }

        utterance.onstart = () => {
          setIsSpeaking(true);
          console.log("▶️ TTS 재생 시작");
        };
        utterance.onend = () => {
          setIsSpeaking(false);
          console.log("⏹️ TTS 재생 종료");
        };
        utterance.onerror = (error) => {
          setIsSpeaking(false);
          console.error("❌ TTS 에러:", error);
        };

        window.speechSynthesis.speak(utterance);
      };

      // 음성이 로드되지 않았다면 짧은 시간 대기 후 재시도
      if (!voicesLoaded) {
        console.log("음성 로딩 대기 중...");
        setTimeout(() => {
          performSpeak();
        }, 100);
      } else {
        performSpeak();
      }
    },
    [isSupported, rate, pitch, volume, voicesLoaded, selectedVoice]
  );

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  const pause = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.pause();
    }
  }, [isSupported]);

  const resume = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.resume();
    }
  }, [isSupported]);

  return {
    isSpeaking,
    isSupported,
    voices,
    selectedVoice,
    setSelectedVoice,
    speak,
    stop,
    pause,
    resume,
  };
}
