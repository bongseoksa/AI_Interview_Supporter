"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BrowserWarningModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BrowserWarningModal({
  open,
  onOpenChange,
}: BrowserWarningModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>브라우저 지원 안내</DialogTitle>
          <DialogDescription className="space-y-4">
            <p>
              Firefox 브라우저는 Web Speech API를 제대로 지원하지 않습니다.
            </p>
            <p className="font-semibold">
              다음 브라우저 중 하나를 사용해주세요:
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
