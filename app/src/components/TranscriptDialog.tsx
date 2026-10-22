import { useEffect, useState } from "react";
import { transcript } from "../content";
import { downloadTranscriptPdf } from "../exportTranscript";
import { VideoPlayer } from "./VideoPlayer";
import { Icon } from "./Icon";

type TranscriptDialogProps = {
  onClose: () => void;
  currentTime: number;
  duration: number;
  playing: boolean;
  muted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onSeek: (time: number) => void;
};

export function TranscriptDialog({
  onClose,
  currentTime,
  duration,
  playing,
  muted,
  onTogglePlay,
  onToggleMute,
  onSeek,
}: TranscriptDialogProps) {
  const [activeMessage, setActiveMessage] = useState("ai-3");

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#122343] p-3 sm:p-8">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="transcript-title"
        className="my-auto flex w-full max-w-[1183px] flex-col overflow-hidden rounded bg-white"
      >
        <header className="relative flex items-center justify-between p-6">
          <img src="/assets/transcript-header.png" alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40" />
          <h2 id="transcript-title" className="relative text-[16px] font-medium text-[#0f2e4e]">
            View & Download Transcript
          </h2>
          <button type="button" aria-label="Close transcript" onClick={onClose} className="relative rounded p-1 hover:bg-white/70 active:bg-white">
            <Icon src="/assets/icon-close.svg" width={16} height={16} />
          </button>
        </header>
        <div className="flex max-h-[70vh] flex-col gap-6 overflow-y-auto px-4 py-2 sm:px-9 sm:py-6">
          {transcript.map((message) =>
            message.role === "ai" ? (
              <div key={message.id} className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-1 px-2.5">
                  {message.waveform ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4c7ff0] bg-white px-2.5 py-2">
                      <button type="button" aria-label="Pause interviewer audio" aria-pressed={activeMessage === message.id} onClick={() => setActiveMessage(message.id)}>
                        <Icon src="/assets/icon-play-round.svg" width={25} height={25} />
                      </button>
                      <Icon src="/assets/icon-waveform.svg" width={20} height={20} />
                      <Icon src="/assets/icon-waveform.svg" width={20} height={20} />
                      <Icon src="/assets/icon-waveform.svg" width={20} height={20} />
                      <Icon src="/assets/icon-waveform-dim.svg" width={20} height={20} />
                      <span className="inline-flex -scale-y-100 rotate-180">
                        <Icon src="/assets/icon-waveform-dim.svg" width={20} height={20} />
                      </span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      aria-label="Play interviewer message"
                      aria-pressed={activeMessage === message.id}
                      onClick={() => setActiveMessage(message.id)}
                      className="rounded-full p-1 hover:bg-[#edf2fe] active:bg-[#dbe6fd]"
                    >
                      <Icon src="/assets/icon-waveform.svg" width={20} height={20} />
                    </button>
                  )}
                  <img src="/assets/avatar-interviewer.png" width={36} height={36} alt="" className="size-9 rounded-full bg-[#d2f5eb] object-cover" />
                </div>
                <div className="flex w-full flex-col items-end">
                  <img src="/assets/tail-right.svg" width={24} height={13} alt="" className="mr-4" />
                  <p className="w-full rounded-2xl bg-[#4c7ff0] px-6 py-4 text-[16px] leading-7 text-[#fcfcfc]">{message.text}</p>
                </div>
              </div>
            ) : (
              <div key={message.id} className="flex flex-col items-start gap-3">
                <div className="flex items-center gap-1 px-2.5">
                  <img src="/assets/avatar-sarah.png" width={36} height={36} alt="" className="size-9 rounded-full bg-[#d2f5eb] object-cover" />
                  <p className="w-[102px] text-[14px] font-medium leading-6 text-[rgba(0,0,0,0.88)]">{message.name}</p>
                  <p className="text-[12px] leading-6 text-[rgba(0,0,0,0.88)]">{message.time}</p>
                  <button
                    type="button"
                    aria-label={`Play ${message.name} at ${message.time}`}
                    aria-pressed={activeMessage === message.id}
                    onClick={() => setActiveMessage(message.id)}
                    className="rounded-full p-1 hover:bg-[#edf2fe] active:bg-[#dbe6fd]"
                  >
                    <Icon src="/assets/icon-waveform.svg" width={20} height={20} />
                  </button>
                </div>
                <div>
                  <img src="/assets/tail-left.svg" width={24} height={13} alt="" className="ml-4" />
                  <p className="rounded-2xl bg-[#eff0f6] px-6 py-4 text-[14px] leading-[23px] text-[#262338]">{message.text}</p>
                </div>
              </div>
            ),
          )}
          <VideoPlayer
            variant="transcript"
            currentTime={currentTime}
            duration={duration}
            playing={playing}
            muted={muted}
            captions={false}
            onTogglePlay={onTogglePlay}
            onToggleMute={onToggleMute}
            onSeek={onSeek}
          />
        </div>
        <footer className="flex items-center justify-between border-t border-[#e3e9f0] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 items-center rounded-lg bg-[#edf2fe] px-4 text-[13px] font-medium leading-[26px] text-[#4c7ff0] hover:bg-[#dbe6fd] active:bg-[#c9d9fb]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={downloadTranscriptPdf}
            className="inline-flex h-10 items-center rounded-lg bg-[#4c7ff0] px-4 text-[13px] font-medium leading-[21px] text-white hover:bg-[#3b6fe0] active:bg-[#2f62d6]"
          >
            Export to PDF
          </button>
        </footer>
      </div>
    </div>
  );
}
