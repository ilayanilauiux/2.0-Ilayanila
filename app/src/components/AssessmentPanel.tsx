import { VideoPlayer, type PlayerVariant } from "./VideoPlayer";
import { Icon } from "./Icon";

type AssessmentPanelProps = {
  currentTime: number;
  duration: number;
  playing: boolean;
  muted: boolean;
  captions: boolean;
  settingsPressed: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onToggleCaptions: () => void;
  onSeek: (time: number) => void;
  onFullscreen: () => void;
  onToggleSettings: () => void;
  onOpenTranscript: () => void;
};

function ScoreRing({
  ring,
  arc,
  icon,
  iconBg,
  label,
}: {
  ring: string;
  arc: string;
  icon: string;
  iconBg: string;
  label: string;
}) {
  return (
    <div className="relative h-[70px] w-[70px] shrink-0" aria-hidden="true">
      <img src={ring} width={70} height={70} alt="" className="absolute top-0 left-0" />
      <img src={arc} width={65} height={70} alt="" className="absolute top-0 left-[5px]" />
      <div className="absolute top-2 left-2 flex size-[54px] items-center justify-center rounded-full bg-white">
        <span className={`flex size-[30px] items-center justify-center rounded-full ${iconBg}`}>
          <Icon src={icon} width={16} height={16} alt={label} />
        </span>
      </div>
    </div>
  );
}

export function AssessmentPanel(props: AssessmentPanelProps) {
  const player: PlayerVariant = "compact";
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
      <div className="min-w-0 flex-1">
        <VideoPlayer
          variant={player}
          poster="/assets/interview-still.png"
          currentTime={props.currentTime}
          duration={props.duration}
          playing={props.playing}
          muted={props.muted}
          captions={props.captions}
          settingsPressed={props.settingsPressed}
          onTogglePlay={props.onTogglePlay}
          onToggleMute={props.onToggleMute}
          onToggleCaptions={props.onToggleCaptions}
          onSeek={props.onSeek}
          onFullscreen={props.onFullscreen}
          onToggleSettings={props.onToggleSettings}
        />
      </div>
      <aside className="flex w-full flex-col justify-between rounded-lg border border-[#e2e8f0] bg-white p-4 lg:w-[425px] lg:shrink-0">
        <div>
          <h3 className="text-[16px] font-semibold leading-10 text-[#23262f]">Assessment Overview</h3>
          <span className="mt-3 inline-flex h-[21px] items-center rounded-lg bg-[#ccf5dd] px-2 text-[12px] leading-[18px] text-[#00411d]">
            Completed
          </span>
          <div className="mt-6 flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="flex items-center gap-1 text-[15px] leading-[14px] text-[#4b5563]">
                  <img src="/assets/dot-blue.svg" width={10} height={10} alt="" />
                  Overall Score
                </p>
                <p className="mt-4 text-[26px] leading-8 font-bold text-[#0f172a]">74/100</p>
              </div>
              <ScoreRing
                ring="/assets/ring-score.svg"
                arc="/assets/ring-score-arc.svg"
                icon="/assets/icon-user-rect.svg"
                iconBg="bg-[#eef2ff]"
                label="Overall score"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="flex items-center gap-1 text-[15px] leading-[14px] text-[#4b5563]">
                  <img src="/assets/dot-purple.svg" width={10} height={10} alt="" />
                  Question Completion
                </p>
                <p className="mt-4 text-[26px] leading-8 font-bold text-[#0f172a]">11/12</p>
              </div>
              <ScoreRing
                ring="/assets/ring-questions.svg"
                arc="/assets/ring-questions-arc.svg"
                icon="/assets/icon-chat.svg"
                iconBg="bg-[#faf5ff]"
                label="Question completion"
              />
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={props.onOpenTranscript}
          className="mt-4 inline-flex h-[45px] w-full items-center justify-center gap-2.5 rounded-lg bg-[#4c7ff0] px-3 text-[13px] font-medium leading-[21px] text-white hover:bg-[#3b6fe0] active:bg-[#2f62d6]"
        >
          <Icon src="/assets/icon-waveform.svg" width={20} height={20} />
          <Icon src="/assets/icon-waveform.svg" width={20} height={20} />
          <span>View & Download Interview&nbsp;&nbsp;Transcript</span>
        </button>
      </aside>
    </div>
  );
}
