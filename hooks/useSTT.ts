/**
 * @file 음성 인식(STT) 기능을 제공하는 커스텀 훅
 *
 * Web Speech API의 SpeechRecognition을 사용하여 사용자의 음성을 실시간으로 텍스트로 변환합니다.
 * 브라우저 호환성 확인, 인식 상태 관리, 에러 처리 등의 기능을 포함합니다.
 */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseSTTOptions {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
}

interface UseSTTReturn {
  transcript: string;
  isListening: boolean;
  isSupported: boolean;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

/**
 * Web Speech API를 사용하여 음성을 텍스트로 변환하는 커스텀 훅
 * 실시간 음성 인식을 지원하며, final 결과와 interim 결과를 구분하여 처리합니다.
 *
 * @param {UseSTTOptions} options - 음성 인식 옵션
 * @param {string} [options.lang="ko-KR"] - 인식할 언어 코드
 * @param {boolean} [options.continuous=true] - 지속적인 인식 활성화 여부
 * @param {boolean} [options.interimResults=true] - 중간 결과 표시 여부
 * @returns {UseSTTReturn} 음성 인식 상태 및 제어 함수
 * @returns {string} returns.transcript - 인식된 텍스트
 * @returns {boolean} returns.isListening - 현재 인식 중인지 여부
 * @returns {boolean} returns.isSupported - 브라우저 지원 여부
 * @returns {string | null} returns.error - 에러 메시지
 * @returns {Function} returns.startListening - 음성 인식 시작 함수
 * @returns {Function} returns.stopListening - 음성 인식 종료 함수
 * @returns {Function} returns.resetTranscript - 인식된 텍스트 초기화 함수
 *
 * @example
 * const { transcript, isListening, startListening, stopListening } = useSTT({
 *   lang: "ko-KR"
 * });
 */
export function useSTT(options: UseSTTOptions = {}): UseSTTReturn {
  const {
    lang = "ko-KR",
    continuous = true,
    interimResults = true,
  } = options;

  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const finalTranscriptRef = useRef("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = lang;
      recognitionRef.current.continuous = continuous;
      recognitionRef.current.interimResults = interimResults;

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = "";

        // event.resultIndex부터 순회하여 새로운 결과만 처리
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            // final 결과는 ref에 저장 (누적)
            finalTranscriptRef.current += transcriptPart + " ";
          } else {
            // interim 결과는 현재 말하고 있는 부분만 표시
            interimTranscript += transcriptPart;
          }
        }

        // final 결과 + 현재 interim 결과를 합쳐서 표시
        setTranscript(finalTranscriptRef.current + interimTranscript);
      };

      recognitionRef.current.onerror = (
        event: SpeechRecognitionErrorEvent
      ) => {
        setError(event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [lang, continuous, interimResults]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;

    try {
      setError(null);
      recognitionRef.current.start();
      setIsListening(true);
    } catch (err) {
      setError("음성 인식을 시작할 수 없습니다.");
    }
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;

    try {
      recognitionRef.current.stop();
      setIsListening(false);
    } catch (err) {
      setError("음성 인식을 중지할 수 없습니다.");
    }
  }, []);

  const resetTranscript = useCallback(() => {
    finalTranscriptRef.current = "";
    setTranscript("");
  }, []);

  return {
    transcript,
    isListening,
    isSupported,
    error,
    startListening,
    stopListening,
    resetTranscript,
  };
}
