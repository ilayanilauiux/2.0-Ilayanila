import { caption, formatClock } from "../content";
import { Icon } from "./Icon";

export type PlayerVariant = "compact" | "theater" | "transcript";

type VideoPlayerProps = {
  variant: PlayerVariant;
  currentTime: number;
  duration: number;
  playing: boolean;
  muted: boolean;
  captions: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onToggleCaptions?: () => void;
  onSeek: (time: number) => void;
  onFullscreen?: () => void;
  settingsPressed?: boolean;
  onToggleSettings?: () => void;
  poster?: string;
};

function PauseGlyph({ color }: { color: string }) {
  return (
    <span className="flex items-center gap-[3px]" aria-hidden="true">
      <span className="block h-3 w-[3px] rounded-sm" style={{ background: color }} />
      <span className="block h-3 w-[3px] rounded-sm" style={{ background: color }} />
    </span>
  );
}

export function VideoPlayer({
  variant,
  currentTime,
  duration,
  playing,
  muted,
  captions,
  onTogglePlay,
  onToggleMute,
  onToggleCaptions,
  onSeek,
  onFullscreen,
  settingsPressed,
  onToggleSettings,
  poster = "/assets/interview-still.png",
}: VideoPlayerProps) {
  const progress = duration === 0 ? 0 : Math.min(100, (currentTime / duration) * 100);
  const dark = variant !== "transcript";
  const fill = variant === "transcript" ? "#4C7FF0" : "#FF0707";
  const track = variant === "transcript" ? "rgba(76,127,240,0.28)" : variant === "theater" ? "#edf2fe" : "#ffffff";
  const playIcon = variant === "transcript" ? "/assets/icon-play-light.svg" : variant === "theater" ? "/assets/icon-play-dark.svg" : "/assets/icon-play.svg";
  const volumeIcon = variant === "transcript" ? "/assets/icon-volume-light.svg" : variant === "theater" ? "/assets/icon-volume-dark.svg" : "/assets/icon-volume.svg";
  const ccIcon = variant === "theater" ? "/assets/icon-cc-dark.svg" : "/assets/icon-cc.svg";
  const settingsIcon = variant === "theater" ? "/assets/icon-settings-dark.svg" : "/assets/icon-player-settings.svg";
  const fullIcon = variant === "theater" ? "/assets/icon-fullscreen-dark.svg" : "/assets/icon-fullscreen.svg";

  const controls = (
    <div
      className={
        variant === "compact"
          ? "bg-black/20 px-6 py-4"
          : variant === "theater"
            ? "bg-[#1b1b1b] px-6 py-6"
            : "bg-[#eff0f6] px-6 py-4"
      }
    >
      <div className="flex flex-col gap-4">
        <div
          className="relative h-[13px] cursor-pointer"
          onClick={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const ratio = (event.clientX - rect.left) / rect.width;
            onSeek(Math.min(duration, Math.max(0, ratio * duration)));
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") onSeek(Math.min(duration, currentTime + 5));
            if (event.key === "ArrowLeft") onSeek(Math.max(0, currentTime - 5));
          }}
          role="slider"
          tabIndex={0}
          aria-label="Interview progress"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={Math.round(currentTime)}
          aria-valuetext={`${formatClock(currentTime)} of ${formatClock(duration)}`}
        >
          <span className="absolute top-[4.5px] right-0 left-0 h-1 rounded-full" style={{ background: track }} />
          <span className="absolute top-[4.5px] left-0 h-1 rounded-full" style={{ width: `${progress}%`, background: fill }} />
          <span
            className="absolute top-0 size-[13px] -translate-x-1/2 rounded-full"
            style={{ left: `${progress}%`, background: fill }}
          />
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex shrink-0 items-center gap-4 sm:gap-[26px]">
            <button
              type="button"
              aria-label={playing ? "Pause interview" : "Play interview"}
              aria-pressed={playing}
              onClick={onTogglePlay}
              className="flex size-6 items-center justify-center rounded hover:bg-white/15 active:bg-white/25"
            >
              {playing ? <PauseGlyph color={dark ? "#ffffff" : "#4C7FF0"} /> : <Icon src={playIcon} width={24} height={24} />}
            </button>
            <button
              type="button"
              aria-label={muted ? "Unmute" : "Mute"}
              aria-pressed={muted}
              onClick={onToggleMute}
              className={`relative flex size-6 items-center justify-center rounded hover:bg-white/15 active:bg-white/25 ${muted ? "opacity-50" : ""}`}
            >
              <Icon src={volumeIcon} width={24} height={24} />
            </button>
            <span
              className={`inline-flex h-6 shrink-0 items-center rounded-full px-2.5 text-[12px] whitespace-nowrap text-white ${variant === "transcript" ? "bg-[#4c7ff0]" : variant === "theater" ? "bg-[#1e293b]" : "bg-[rgba(40,40,40,0.6)]"}`}
            >
              {formatClock(currentTime)} / {formatClock(duration)}
            </span>
          </div>
          {variant === "transcript" ? null : (
            <div
              className={`flex h-6 shrink-0 items-center gap-3 rounded-full px-3 sm:gap-4 sm:px-4 ${variant === "theater" ? "bg-[#1e293b]" : "bg-[rgba(40,40,40,0.6)]"}`}
            >
              <button
                type="button"
                aria-label="Closed captions"
                aria-pressed={captions}
                onClick={onToggleCaptions}
                className={`rounded p-0.5 hover:bg-white/20 active:bg-white/30 ${captions ? "bg-white/20" : ""}`}
              >
                <Icon src={ccIcon} width={16} height={16} />
              </button>
              <button
                type="button"
                aria-label="Playback settings"
                aria-pressed={settingsPressed}
                onClick={onToggleSettings}
                className={`rounded p-0.5 hover:bg-white/20 active:bg-white/30 ${settingsPressed ? "bg-white/20" : ""}`}
              >
                <Icon src={settingsIcon} width={16} height={16} />
              </button>
              <button
                type="button"
                aria-label={variant === "theater" ? "Exit full screen" : "Full screen"}
                onClick={onFullscreen}
                className="rounded p-0.5 hover:bg-white/20 active:bg-white/30"
              >
                <Icon src={fullIcon} width={16} height={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (variant === "transcript") {
    return <div className="w-full rounded-2xl">{controls}</div>;
  }

  return (
    <div className={variant === "theater" ? "overflow-hidden rounded-2xl" : "relative overflow-hidden rounded-lg"}>
      <div className={`relative overflow-hidden bg-[#d5e2ea] ${variant === "theater" ? "aspect-[1383/683] rounded-t-2xl" : "aspect-[694/329]"}`}>
        <img
          src={poster}
          alt="Sarah Williams wearing a headset during her AI interview"
          className="absolute top-[0.08%] left-[-14.33%] h-[153.11%] w-[114.36%] max-w-none"
        />
        {captions ? (
          <p
            className={`absolute right-6 left-6 text-center font-medium text-[#fcfcfc] ${variant === "theater" ? "bottom-8 text-[18px] leading-8 sm:text-[32px] sm:leading-[48px]" : "bottom-24 text-[13px] leading-5 sm:text-base"}`}
            style={{ textShadow: "0px 1px 29px rgba(0,0,0,0.67)" }}
          >
            {caption}
          </p>
        ) : null}
        {variant === "compact" ? <div className="absolute right-4 bottom-4 left-4 rounded-2xl">{controls}</div> : null}
      </div>
      {variant === "theater" ? <div className="rounded-b-2xl">{controls}</div> : null}
    </div>
  );
}
