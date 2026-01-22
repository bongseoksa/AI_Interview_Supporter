/**
 * 현재 브라우저가 Firefox인지 확인합니다.
 *
 * @returns {boolean} Firefox 브라우저인 경우 true, 아니면 false
 */
export function isFirefox(): boolean {
  if (typeof window === "undefined") return false;

  const userAgent = window.navigator.userAgent.toLowerCase();
  const isFirefoxBrowser = userAgent.includes("firefox");

  return isFirefoxBrowser;
}

/**
 * Web Speech API (음성 인식 및 음성 합성) 지원 여부를 확인합니다.
 *
 * @returns {Object} Web Speech API 지원 정보
 * @returns {boolean} returns.speechRecognition - 음성 인식(STT) 지원 여부
 * @returns {boolean} returns.speechSynthesis - 음성 합성(TTS) 지원 여부
 */
export function checkWebSpeechAPISupport(): {
  speechRecognition: boolean;
  speechSynthesis: boolean;
} {
  if (typeof window === "undefined") {
    return {
      speechRecognition: false,
      speechSynthesis: false,
    };
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  return {
    speechRecognition: !!SpeechRecognition,
    speechSynthesis: "speechSynthesis" in window,
  };
}
