/**
 * @file Firefox 브라우저 사용자에게 Web Speech API 미지원 경고를 표시하는 모달 컴포넌트
 *
 * Firefox는 Web Speech API(음성 인식 및 음성 합성)를 제대로 지원하지 않으므로,
 * 사용자에게 Chrome, Edge, Opera 등 지원되는 브라우저로 전환할 것을 안내합니다.
 */
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from 'next-intl';

interface BrowserWarningModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BrowserWarningModal({
  open,
  onOpenChange,
}: BrowserWarningModalProps) {
  const t = useTranslations('speech.browserWarning');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription className="space-y-4">
            <p>
              {t('firefoxNotSupported')}
            </p>
            <p className="font-semibold">
              {t('useBrowsersBelow')}
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Google Chrome</li>
              <li>Microsoft Edge</li>
              <li>Opera</li>
            </ul>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
