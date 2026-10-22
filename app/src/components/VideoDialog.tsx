import { useEffect } from "react";
import { theaterPrompt } from "../content";
import { VideoPlayer } from "./VideoPlayer";
import { Icon } from "./Icon";

type VideoDialogProps = {
  onClose: () => void;
  onDownload: () => void;
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
  onToggleSettings: () => void;
};

export function VideoDialog(props: VideoDialogProps) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") props.onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [props.onClose]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
      <div role="dialog" aria-modal="true" aria-labelledby="video-title" className="mx-auto flex w-full max-w-[1383px] flex-col gap-4 px-4 py-6 sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 id="video-title" className="text-[18px] font-semibold leading-10 text-[#23262f]">
              Interview with Sarah Williams
            </h2>
            <p className="text-[14px] leading-[23px] text-[#64748b]">11 May 2026 09:00 PM - 09:12 PM</p>
          </div>
          <button
            type="button"
            onClick={props.onDownload}
            className="inline-flex h-[45px] items-center justify-center gap-2.5 rounded-lg bg-[#4c7ff0] px-3 text-[13px] font-medium leading-[21px] whitespace-pre text-white hover:bg-[#3b6fe0] active:bg-[#2f62d6]"
          >
            <Icon src="/assets/icon-waveform-white.svg" width={20} height={20} />
            Download  Transcript
          </button>
        </div>
        <div className="relative">
          <VideoPlayer
            variant="theater"
            poster="/assets/interview-still-wide.png"
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
            onFullscreen={props.onClose}
            onToggleSettings={props.onToggleSettings}
          />
          <button
            type="button"
            aria-label="Close video"
            onClick={props.onClose}
            className="absolute top-4 right-4 flex size-11 items-center justify-center hover:opacity-80 active:opacity-60"
          >
            <img src="/assets/icon-close-circle.svg" width={44} height={44} alt="" className="absolute" />
            <Icon src="/assets/icon-close-light.svg" width={16} height={16} className="relative" />
          </button>
          <div className="pointer-events-none absolute top-16 right-4 hidden w-[min(399px,34%)] flex-col items-end gap-2 md:flex">
            <div className="pointer-events-auto flex items-center gap-1 px-2.5">
              <Icon src="/assets/icon-waveform-white.svg" width={20} height={20} />
              <img src="/assets/avatar-interviewer.png" width={36} height={36} alt="" className="size-9 rounded-full object-cover" />
            </div>
            <p className="rounded-2xl bg-white/10 px-6 py-4 text-[16px] leading-7 text-[#fcfcfc]">{theaterPrompt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
