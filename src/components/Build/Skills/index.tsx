import { PageShell } from "../PageShell";

export function BuildSkills() {
  const skills = ["Copywriting", "SEO meta", "Image generation", "Form handling"];
  return (
    <PageShell title="AI Skills">
      <div className="flex flex-wrap gap-2 px-4 py-3">
        {skills.map((s) => (
          <span
            key={s}
            className="rounded-full border border-border bg-surface px-3 py-1.5 text-[11.5px] font-medium"
          >
            {s}
          </span>
        ))}
      </div>
    </PageShell>
  );
}

export default BuildSkills;
