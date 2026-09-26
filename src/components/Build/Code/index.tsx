import { MOCK_CODE } from "../build-data";
import { PageShell } from "../PageShell";

export function BuildCode() {
  return (
    <PageShell title="Code · src/components/Hero.tsx">
      <pre className="px-4 py-3 font-mono text-[11.5px] leading-relaxed text-foreground/90">
        {MOCK_CODE.split("\n").map((line, i) => (
          <div key={i} className="flex gap-3">
            <span className="w-5 shrink-0 select-none text-right text-muted-foreground/50">
              {i + 1}
            </span>
            <span>{line}</span>
          </div>
        ))}
      </pre>
    </PageShell>
  );
}

export default BuildCode;
