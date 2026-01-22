import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSS 클래스를 조건부로 결합하고 병합하는 유틸리티 함수
 * clsx와 tailwind-merge를 조합하여 중복 클래스를 제거하고 올바른 우선순위를 유지합니다.
 *
 * @param {...ClassValue[]} inputs - 결합할 클래스 값들
 * @returns {string} 병합된 클래스 문자열
 *
 * @example
 * cn("px-2 py-1", "px-4") // "py-1 px-4"
 * cn("text-red-500", isActive && "text-blue-500") // "text-blue-500" (if isActive is true)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
