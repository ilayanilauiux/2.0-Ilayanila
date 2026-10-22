import { phases, type PhaseId } from "../content";
import { Icon } from "./Icon";

type QuestionAnalysisProps = {
  open: PhaseId[];
  onToggle: (id: PhaseId) => void;
};

export function QuestionAnalysis({ open, onToggle }: QuestionAnalysisProps) {
  return (
    <div className="flex flex-col gap-4">
      {phases.map((phase) => {
        const expanded = open.includes(phase.id);
        return (
          <section key={phase.id} className="overflow-hidden rounded-lg border border-[#e3e9f0] bg-white">
            <h3>
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => onToggle(phase.id)}
                className="flex w-full items-center gap-4 px-6 py-4 text-left hover:bg-[#f8fafc] active:bg-[#edf2fe]"
              >
                <span className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-[#edf2fe]">
                  <Icon src={phase.icon} width={18} height={18} />
                </span>
                <span className="flex-1 text-[16px] font-semibold leading-[23px] text-[#002975]">{phase.title}</span>
                <span className={expanded ? "-scale-y-100" : ""}>
                  <Icon src="/assets/icon-chevron.svg" width={24} height={24} />
                </span>
              </button>
            </h3>
            {expanded && phase.questions.length > 0 ? (
              <div className="flex flex-col gap-4 border-t border-[#e3e9f0] px-4 py-4 sm:px-6">
                {phase.questions.map((question) => (
                  <article key={question.score + question.prompt} className="flex gap-4 rounded-lg border border-[#e2e8f0] bg-white px-4 py-5">
                    <div className="relative size-[51px] shrink-0">
                      <img src={question.track} width={51} height={51} alt="" className="absolute top-0 left-0" />
                      <img
                        src={question.arc}
                        width={question.arcWidth}
                        height={question.arcHeight}
                        alt=""
                        className={`absolute ${question.arcClass}`}
                      />
                      <span
                        className="absolute inset-0 flex items-center justify-center text-[16px] leading-6"
                        style={{ color: question.scoreColor }}
                      >
                        {question.score}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className={`text-[14px] leading-6 text-[rgba(0,0,0,0.88)] ${question.promptWeight}`}>{question.prompt}</p>
                      {question.answer ? <p className="mt-2 text-[14px] leading-6 text-[#475569]">{question.answer}</p> : null}
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
