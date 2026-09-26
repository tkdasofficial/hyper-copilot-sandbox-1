import { useEffect, useRef, useState, type ReactNode, type TouchEvent } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { CopilotHistoryPanel } from "./CopilotHistoryPanel";
import { cn } from "@/lib/utils";

type Tab = "new" | "chat";

export function CopilotShell({
  active: _active,
  chatId: _chatId,
  children,
  fullHeight = false,
}: {
  active: Tab;
  chatId?: string;
  children: ReactNode;
  fullHeight?: boolean;
}) {
  const isFull = fullHeight || _active === "chat";
  const [historyOpen, setHistoryOpen] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => setHistoryOpen(false), [pathname]);

  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStart.current = null;
    if (event.touches.length !== 1) return;
    const target = event.target;
    if (
      target instanceof Element &&
      target.closest(
        "textarea, input, select, [role='slider'], [contenteditable='true'], audio, video",
      )
    )
      return;
    touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  };

  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || event.changedTouches.length !== 1) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (dx > 70 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      setHistoryOpen((current) => !current);
    } else if (dx < -70 && Math.abs(dx) > Math.abs(dy) * 1.4 && historyOpen) {
      setHistoryOpen(false);
    }
  };

  return (
    <div
      className={cn(
        "w-full max-w-full bg-background",
        isFull
          ? "h-screen max-h-screen overflow-hidden flex flex-col"
          : "min-h-screen overflow-x-hidden",
      )}
    >
      <Sidebar />
      <div
        className={cn(
          "lg:pl-[248px]",
          isFull ? "flex flex-col h-screen max-h-screen overflow-hidden flex-1 min-h-0" : "",
        )}
      >
        <div className="shrink-0 z-30">
          <TopBar onCopilotHistory={() => setHistoryOpen((current) => !current)} />
        </div>
        <main
          className={cn(
            "flex-1 min-h-0 touch-pan-y",
            isFull ? "flex flex-col overflow-hidden relative" : "overflow-x-hidden",
          )}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {children}
          {historyOpen && <CopilotHistoryPanel onClose={() => setHistoryOpen(false)} />}
        </main>
      </div>
    </div>
  );
}
