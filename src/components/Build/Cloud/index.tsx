import { PageShell } from "../PageShell";

export function BuildCloud({ provider }: { provider: "Supabase" | "Firebase" }) {
  const rows =
    provider === "Supabase"
      ? [
          ["Database", "Connected · 4 tables"],
          ["Auth", "Email + Google enabled"],
          ["Storage", "2 buckets · 38 MB"],
        ]
      : [
          ["Firestore", "Connected · 3 collections"],
          ["Auth", "Anonymous + Google"],
          ["Hosting", "Not deployed yet"],
        ];
  return (
    <PageShell title={`${provider} · Demo connection`}>
      <ul className="space-y-2 px-4 py-3">
        {rows.map(([k, v]) => (
          <li
            key={k}
            className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2.5"
          >
            <span className="text-[12.5px] font-medium">{k}</span>
            <span className="text-[11px] text-muted-foreground">{v}</span>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}

export default BuildCloud;
