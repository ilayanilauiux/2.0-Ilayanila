import { candidate, tabs, type TabId } from "../content";
import { Icon } from "./Icon";

const facts = [
  { label: "Candidate ID", value: candidate.id, icon: "/assets/icon-candidate.svg", link: true },
  { label: "Vendor", value: candidate.vendor, icon: "/assets/icon-vendor.svg", link: false },
  { label: "Worker Type", value: candidate.workerType, icon: "/assets/icon-worker.svg", link: false },
  { label: "Job", value: candidate.job, icon: "/assets/icon-job.svg", link: true },
  { label: "Interview ID", value: candidate.interviewId, icon: "/assets/icon-interview.svg", link: false },
  { label: "Interview Created On", value: candidate.createdOn, icon: "/assets/icon-created.svg", link: false },
  { label: "Last Updated On", value: candidate.updatedOn, icon: "/assets/icon-updated.svg", link: false },
];

type CandidateHeaderProps = {
  tab: TabId;
  onTab: (tab: TabId) => void;
};

export function CandidateHeader({ tab, onTab }: CandidateHeaderProps) {
  return (
    <section className="relative pt-6">
      <img
        src="/assets/header-wash.png"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="relative flex items-center justify-between gap-3 px-4 sm:px-8">
        <button
          type="button"
          className="inline-flex items-center gap-2 text-[13px] font-medium leading-[21px] text-[#4c7ff0] hover:underline active:text-[#2f62d6]"
        >
          <Icon src="/assets/icon-back.svg" width={21} height={21} />
          Back to Job Details
        </button>
        <button
          type="button"
          aria-label="More actions"
          className="flex size-10 items-center justify-center rounded-lg border border-[#4c7ff0] bg-white hover:bg-[#edf2fe] active:bg-[#dbe6fd]"
        >
          <Icon src="/assets/icon-more.svg" width={23} height={23} />
        </button>
      </div>
      <div className="relative mt-2 flex flex-col gap-4 px-4 pb-2 sm:flex-row sm:items-center sm:px-8">
        <div className="flex size-[72px] shrink-0 items-center justify-center rounded-full border border-[#e0e7ff] bg-[#eef2ff] sm:size-[100px]">
          <span className="text-[20px] font-semibold text-[#1e293b] sm:text-[23px] sm:leading-[29px]">{candidate.initials}</span>
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-[23px] font-semibold leading-[29px] text-[#1e293b]">{candidate.name}</h1>
            <span className="inline-flex h-[21px] items-center rounded-lg bg-[#f8e8dd] px-2 text-[12px] leading-[18px] text-[#ac4300]">
              {candidate.status}
            </span>
          </div>
          <dl className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-3">
            {facts.map((fact, index) => (
              <div key={fact.label} className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <Icon src={fact.icon} width={24} height={24} />
                  <div>
                    <dt className="text-[12px] leading-[18px] text-[#5b6874]">{fact.label}</dt>
                    <dd
                      className={`text-[12px] font-medium leading-[18px] ${fact.link ? "text-[#4c7ff0]" : "text-[#1d252d]"}`}
                    >
                      {fact.link ? (
                        <a href={`#${fact.label.toLowerCase().replaceAll(" ", "-")}`} className="hover:underline">
                          {fact.value}
                        </a>
                      ) : (
                        fact.value
                      )}
                    </dd>
                  </div>
                </div>
                {index < facts.length - 1 ? (
                  <span className="hidden h-6 w-px bg-[#e3e9f0] md:block" aria-hidden="true" />
                ) : null}
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="relative border-t border-[#cfd8e1] bg-white/90">
        <div role="tablist" aria-label="Candidate" className="flex h-14 items-center gap-4 overflow-x-auto px-4 sm:gap-6 sm:px-8">
          {tabs.map((item) => {
            const selected = tab === item.id;
            const muted = item.id === "offer";
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={selected}
                aria-controls="candidate-panel"
                onClick={() => onTab(item.id)}
                className={`inline-flex h-full shrink-0 items-center gap-2 border-b-[3px] text-[13px] font-medium leading-[21px] hover:text-[#4c7ff0] active:text-[#2f62d6] ${selected ? "border-[#4c7ff0] text-[#6366f1]" : "border-transparent"} ${!selected && muted ? "text-[#64748b]" : ""} ${!selected && !muted ? "text-[#001a43]" : ""}`}
              >
                <Icon src={item.icon} width={24} height={24} />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
