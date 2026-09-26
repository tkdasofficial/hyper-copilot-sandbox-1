import { useEffect, useRef, useState } from "react";
import { Check, Loader2, Plus, Send, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { COMPOSER_ACTIONS, MOCK_CHAT, MODES, type ChatMessage } from "../build-data";

function ActivityCard({ msg }: { msg: Extract<ChatMessage, { kind: "activity" }> }) {
  return (
    <div className="rounded-xl border border-border bg-surface px-3 py-2.5">
      <p className="pb-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/70">
        Building project
      </p>
      <ul className="space-y-1.5">
        {msg.steps.map((s) => (
          <li key={s.label} className="flex items-center gap-2 text-[12px]">
            {s.state === "done" ? (
              <span className="grid h-4 w-4 place-items-center rounded-full bg-foreground text-background">
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
              </span>
            ) : s.state === "active" ? (
              <Loader2 className="h-4 w-4 animate-spin text-spectral-1" />
            ) : (
              <span className="h-4 w-4 rounded-full border border-border-strong" />
            )}
            <span
              className={cn(s.state === "pending" ? "text-muted-foreground/60" : "text-foreground")}
            >
              {s.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BuildChat({ compact = false }: { compact?: boolean }) {
  const [messages] = useState<ChatMessage[]>(MOCK_CHAT);
  const [draft, setDraft] = useState("");
  const [mode, setMode] = useState<(typeof MODES)[number]>("Flash");
  const [actionsOpen, setActionsOpen] = useState(false);
  const [modeOpen, setModeOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  const autogrow = () => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "0px";
    ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
  };

  const send = () => {
    if (!draft.trim()) return;
    setDraft("");
    if (taRef.current) taRef.current.style.height = "";
    toast("Demo mode", { description: "The AI builder will be connected in a later stage." });
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div
        ref={scrollRef}
        className={cn(
          "flex-1 min-h-0 space-y-3 overflow-y-auto",
          compact ? "px-3 py-2" : "px-4 py-2",
        )}
      >
        {messages.map((m) =>
          m.kind === "user" ? (
            <div key={m.id} className="flex justify-end">
              <p className="max-w-[85%] rounded-2xl rounded-br-md bg-foreground px-3.5 py-2 text-[13px] leading-relaxed text-background">
                {m.text}
              </p>
            </div>
          ) : m.kind === "ai" ? (
            <p key={m.id} className="max-w-[92%] text-[13px] leading-relaxed text-foreground">
              {m.text}
            </p>
          ) : (
            <ActivityCard key={m.id} msg={m} />
          ),
        )}
      </div>

      <div className={cn("shrink-0", compact ? "p-2" : "px-3 pb-1 pt-1")}>
        <div className="rounded-2xl border border-border bg-surface focus-within:border-border-strong">
          <textarea
            ref={taRef}
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              autogrow();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={1}
            placeholder="Describe what to build…"
            className="max-h-[120px] w-full resize-none bg-transparent px-3.5 pt-3 text-[13px] leading-relaxed outline-none placeholder:text-muted-foreground"
          />
          <div className="flex items-center gap-1.5 px-2 pb-2">
            <div className="relative">
              <button
                type="button"
                aria-label="Add attachment"
                onClick={() => {
                  setActionsOpen((v) => !v);
                  setModeOpen(false);
                }}
                className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                <Plus className="h-4 w-4" strokeWidth={2} />
              </button>
              {actionsOpen && (
                <div className="absolute bottom-10 left-0 z-20 w-40 rounded-xl border border-border bg-background p-1 shadow-xl">
                  {COMPOSER_ACTIONS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => {
                        setActionsOpen(false);
                        toast(a, {
                          description: "Available once the builder backend is connected.",
                        });
                      }}
                      className="w-full rounded-lg px-3 py-2 text-left text-[12px] font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                    >
                      {a}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setModeOpen((v) => !v);
                  setActionsOpen(false);
                }}
                className="flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                {mode}
                <ChevronDown className="h-3 w-3" strokeWidth={2.2} />
              </button>
              {modeOpen && (
                <div className="absolute bottom-10 left-0 z-20 w-32 rounded-xl border border-border bg-background p-1 shadow-xl">
                  {MODES.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setMode(m);
                        setModeOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[12px] font-medium transition-colors hover:bg-surface",
                        m === mode ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {m}
                      {m === mode && <Check className="h-3.5 w-3.5" strokeWidth={2.5} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              aria-label="Send"
              onClick={send}
              disabled={!draft.trim()}
              className="ml-auto grid h-8 w-8 place-items-center rounded-full bg-foreground text-background transition-opacity hover:opacity-90 disabled:opacity-30"
            >
              <Send className="h-3.5 w-3.5" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuildChat;
