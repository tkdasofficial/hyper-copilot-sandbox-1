import { Link } from "@tanstack/react-router";
import { ArrowLeft, MessageSquare, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCopilotStore } from "./useCopilotStore";
import { deleteChat } from "@/lib/copilot-store";
import { deleteChatFromDrive } from "@/lib/copilot-sync";

function when(at: number) {
  return new Date(at).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function CopilotHistoryPanel({ onClose }: { onClose: () => void }) {
  const { chats } = useCopilotStore();
  const recent = [...chats].sort((a, b) => b.updatedAt - a.updatedAt);

  const handleDelete = (id: string) => {
    deleteChat(id);
    void deleteChatFromDrive(id).catch(() => {});
  };

  return (
    <section
      aria-label="Chat history"
      className="absolute inset-0 z-30 flex flex-col bg-background"
    >
      <div className="mx-auto flex w-full max-w-2xl shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Back to conversation"
            title="Back to conversation"
            onClick={onClose}
            className="h-8 w-8 shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="truncate text-[15px] font-bold">History</h1>
        </div>
        <Button asChild size="sm" className="shrink-0" onClick={onClose}>
          <Link to="/copilot">
            <Plus className="h-4 w-4" />
            New chat
          </Link>
        </Button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-12 sm:px-6">
        <div className="mx-auto w-full max-w-2xl">
          {recent.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">No chats yet.</p>
          ) : (
            <div className="space-y-1.5 pt-4">
              {recent.map((chat) => (
                <div
                  key={chat.id}
                  className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2"
                >
                  <MessageSquare
                    className="h-4 w-4 shrink-0 text-muted-foreground"
                    strokeWidth={1.9}
                  />
                  <Link
                    to="/copilot/$chatId"
                    params={{ chatId: chat.id }}
                    onClick={onClose}
                    className="min-w-0 flex-1"
                  >
                    <span className="block truncate text-[13px] font-semibold">{chat.title}</span>
                    <span className="block text-[11px] text-muted-foreground">
                      {chat.messages.length} messages · {when(chat.updatedAt)}
                    </span>
                  </Link>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={`Delete ${chat.title}`}
                    title={`Delete ${chat.title}`}
                    onClick={() => handleDelete(chat.id)}
                    className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
