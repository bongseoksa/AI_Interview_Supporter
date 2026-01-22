"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VoiceSelectorProps {
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  onVoiceChange: (voice: SpeechSynthesisVoice | null) => void;
  disabled?: boolean;
}

/**
 * TTS에 사용할 음성을 선택하는 드롭다운 컴포넌트
 * 언어별로 그룹화하여 표시하며, 자동 선택 옵션을 제공합니다.
 *
 * @param {VoiceSelectorProps} props - 컴포넌트 props
 * @param {SpeechSynthesisVoice[]} props.voices - 사용 가능한 음성 목록
 * @param {SpeechSynthesisVoice | null} props.selectedVoice - 현재 선택된 음성
 * @param {Function} props.onVoiceChange - 음성 변경 시 호출되는 콜백 함수
 * @param {boolean} [props.disabled=false] - 비활성화 상태
 */
export function VoiceSelector({
  voices,
  selectedVoice,
  onVoiceChange,
  disabled = false,
}: VoiceSelectorProps) {
  // 언어별로 음성 그룹화
  const koreanVoices = voices.filter((v) => v.lang.startsWith("ko"));
  const englishVoices = voices.filter((v) => v.lang.startsWith("en"));
  const otherVoices = voices.filter(
    (v) => !v.lang.startsWith("ko") && !v.lang.startsWith("en")
  );

  const handleValueChange = (value: string) => {
    if (value === "auto") {
      onVoiceChange(null);
    } else {
      const voice = voices.find((v) => v.name === value);
      onVoiceChange(voice || null);
    }
  };

  return (
    <div className="w-full max-w-md">
      <Select
        value={selectedVoice?.name || "auto"}
        onValueChange={handleValueChange}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder="음성 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="auto">자동 선택</SelectItem>

          {koreanVoices.length > 0 && (
            <SelectGroup>
              <SelectLabel>한국어</SelectLabel>
              {koreanVoices.map((voice) => (
                <SelectItem key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </SelectItem>
              ))}
            </SelectGroup>
          )}

          {englishVoices.length > 0 && (
            <SelectGroup>
              <SelectLabel>영어</SelectLabel>
              {englishVoices.map((voice) => (
                <SelectItem key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </SelectItem>
              ))}
            </SelectGroup>
          )}

          {otherVoices.length > 0 && (
            <SelectGroup>
              <SelectLabel>기타 언어</SelectLabel>
              {otherVoices.map((voice) => (
                <SelectItem key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </SelectItem>
              ))}
            </SelectGroup>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
