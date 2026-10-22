import { useState } from "react";
import { categorySkills, skillTooltip, technicalSkills } from "../content";
import { Icon } from "./Icon";

function Tooltip() {
  return (
    <div role="tooltip" className="absolute bottom-[calc(100%+8px)] left-0 z-20 w-[min(566px,80vw)] drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)]">
      <div className="flex justify-end pr-6">
        <img src="/assets/tooltip-arrow.svg" width={24} height={13} alt="" />
      </div>
      <div className="rounded bg-[#f8fafc] px-6 py-4">
        <p className="text-[14px] leading-6 text-[#475569]">{skillTooltip}</p>
      </div>
    </div>
  );
}

export function KeySkills() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-stretch">
      <div className="rounded-lg border border-[#e2e8f0] bg-white px-4 py-[17px] xl:w-[395px] xl:shrink-0">
        <ul className="flex flex-col gap-[5px]">
          {categorySkills.map((skill) => (
            <li
              key={skill.label}
              className="relative"
              onMouseEnter={() => setOpen(skill.label)}
              onMouseLeave={() => setOpen(null)}
              onFocus={() => setOpen(skill.label)}
              onBlur={() => setOpen(null)}
              tabIndex={0}
              aria-describedby={open === skill.label ? "skill-tooltip" : undefined}
            >
              {open === skill.label ? (
                <div id="skill-tooltip">
                  <Tooltip />
                </div>
              ) : null}
              <div className="flex items-center gap-2 py-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#f8fafc]">
                  <Icon src={skill.icon} width={16} height={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] leading-[21px] text-[#2f3943]">{skill.label}</p>
                  <div className="mt-0.5 flex items-center gap-2">
                    <div className="h-1 flex-1 rounded-full bg-[#f8fafc]">
                      <div className="h-1 rounded-full" style={{ width: skill.width, background: skill.color }} />
                    </div>
                    <span className="text-[12px] font-medium leading-[21px] text-[#0f172a]">{skill.value}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="min-w-0 flex-1 rounded-lg border border-[#e2e8f0] bg-white p-4">
        <h3 className="text-[14px] font-semibold leading-6 text-[rgba(0,0,0,0.88)]">Technical Skills</h3>
        <div className="mt-4 flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div
            className="relative h-[280px] w-full max-w-[340px]"
            onMouseEnter={() => setOpen("radar")}
            onMouseLeave={() => setOpen(null)}
            onFocus={() => setOpen("radar")}
            onBlur={() => setOpen(null)}
            tabIndex={0}
            aria-label="Technical skills chart"
          >
            {open === "radar" ? <Tooltip /> : null}
            <p className="absolute top-0 left-1/2 -translate-x-1/2 text-[12px] text-black">React</p>
            <p className="absolute top-[108px] right-0 text-[12px] text-black">Python</p>
            <p className="absolute right-8 bottom-0 text-[12px] text-black">MongoDB</p>
            <p className="absolute bottom-0 left-6 text-[12px] text-black">Flutter</p>
            <p className="absolute top-[108px] left-0 text-[12px] text-black">DevOps</p>
            <div className="absolute top-[18px] left-1/2 -translate-x-1/2">
              <div className="relative h-[238px] w-[243px]">
                <img src="/assets/radar-web.svg" width={218} height={237} alt="" className="absolute top-0 left-6" />
                <img
                  src="/assets/radar-fill.svg"
                  width={243}
                  height={238}
                  alt="Radar chart of React, Python, MongoDB, Flutter, and DevOps scores"
                  className="absolute top-0 left-0"
                />
              </div>
            </div>
          </div>
          <ul className="w-full max-w-[293px]">
            {technicalSkills.map((skill) => (
              <li
                key={skill.label}
                className="relative flex items-center justify-between px-6 py-4"
                onMouseEnter={() => setOpen(skill.label)}
                onMouseLeave={() => setOpen(null)}
                onFocus={() => setOpen(skill.label)}
                onBlur={() => setOpen(null)}
                tabIndex={0}
              >
                {open === skill.label ? <Tooltip /> : null}
                <span className="text-[14px] leading-6 text-[rgba(0,0,0,0.88)]">{skill.label}</span>
                <span className={`inline-flex h-[21px] items-center rounded-lg px-2 text-[12px] leading-[18px] ${skill.badge}`}>
                  {skill.score}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
