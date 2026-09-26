import { GitCommitHorizontal } from "lucide-react";
import { PageShell } from "../PageShell";

export function BuildGit() {
  const commits = [
    { hash: "a3f9c21", msg: "Add testimonials section below pricing", time: "2 min ago" },
    { hash: "7be04d8", msg: "Scaffold landing page: hero, pricing, FAQ", time: "18 min ago" },
    { hash: "c11a2e0", msg: "Initial project setup", time: "1 hour ago" },
  ];
  return (
    <PageShell title="Git · main">
      <div className="px-4 py-3">
        <div className="mb-3 flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-[12px]">
          <span className="h-2 w-2 rounded-full bg-spectral-1" />3 uncommitted changes
        </div>
        <ul className="space-y-2">
          {commits.map((c) => (
            <li key={c.hash} className="flex items-start gap-2.5">
              <GitCommitHorizontal
                className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                strokeWidth={1.8}
              />
              <div className="min-w-0">
                <p className="truncate text-[12.5px] font-medium">{c.msg}</p>
                <p className="text-[10.5px] text-muted-foreground">
                  {c.hash} · {c.time}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}

export default BuildGit;
