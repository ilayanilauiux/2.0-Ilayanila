import { sections, type SectionId } from "../content";
import { Icon } from "./Icon";

type SectionNavProps = {
  active: SectionId;
  onSelect: (id: SectionId) => void;
};

export function SectionNav({ active, onSelect }: SectionNavProps) {
  return (
    <nav aria-label="Interview sections" className="flex gap-2 overflow-x-auto lg:w-[211px] lg:shrink-0 lg:flex-col">
      {sections.map((section) => {
        const selected = active === section.id;
        return (
          <button
            key={section.id}
            type="button"
            aria-current={selected ? "true" : undefined}
            onClick={() => onSelect(section.id)}
            className={`inline-flex h-[38px] shrink-0 items-center gap-2 rounded-lg px-3 text-[13px] font-medium leading-6 hover:bg-[#f8fafc] active:bg-[#e2e8f0] lg:w-full ${selected ? "bg-[#edf2fe] text-[#4c7ff0] hover:bg-[#dbe6fd]" : "bg-white text-[#5b6874]"}`}
          >
            <Icon src={section.icon} width={section.id === "ai" ? 16 : 18} height={section.id === "ai" ? 16 : 18} />
            <span className="whitespace-nowrap">{section.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
