import { FileCode2, Folder } from "lucide-react";
import { MOCK_FILES } from "../build-data";
import { PageShell } from "../PageShell";

export function BuildFiles() {
  return (
    <PageShell title="Files · Aurora Storefront">
      <ul className="px-2 py-2">
        {MOCK_FILES.map((f) => (
          <li
            key={f.name + f.depth}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12.5px] text-foreground"
            style={{ paddingLeft: `${8 + f.depth * 16}px` }}
          >
            {f.folder ? (
              <Folder className="h-3.5 w-3.5 text-spectral-1" strokeWidth={2} />
            ) : (
              <FileCode2 className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.8} />
            )}
            {f.name}
          </li>
        ))}
      </ul>
    </PageShell>
  );
}

export default BuildFiles;
