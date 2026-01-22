import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">AI Interview Supporter</h1>
          <p className="text-xl text-gray-600">AI 기반 면접 지원 시스템</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Link href="/speech">
            <Button size="lg" className="gap-2">
              <Mic className="w-5 h-5" />
              STT/TTS PoC 테스트
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground">
            음성 인식 및 음성 합성 기능을 테스트해보세요
          </p>
        </div>
      </div>
    </main>
  );
}
