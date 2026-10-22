import { useEffect, useState } from "react";
import { AssessmentPanel } from "./components/AssessmentPanel";
import { CandidateHeader } from "./components/CandidateHeader";
import { KeySkills } from "./components/KeySkills";
import { QuestionAnalysis } from "./components/QuestionAnalysis";
import { SectionNav } from "./components/SectionNav";
import { SideMenu } from "./components/SideMenu";
import { TopBar } from "./components/TopBar";
import { TranscriptDialog } from "./components/TranscriptDialog";
import { VideoDialog } from "./components/VideoDialog";
import {
  DURATION,
  INITIAL_TIME,
  sections,
  tabs,
  type PhaseId,
  type PrimaryNavId,
  type SectionId,
  type TabId,
} from "./content";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [nav, setNav] = useState<PrimaryNavId>("jobs");
  const [tab, setTab] = useState<TabId>("interview");
  const [section, setSection] = useState<SectionId>("ai");
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(INITIAL_TIME);
  const [muted, setMuted] = useState(false);
  const [captions, setCaptions] = useState(false);
  const [theaterCaptions, setTheaterCaptions] = useState(true);
  const [settingsPressed, setSettingsPressed] = useState(false);
  const [phases, setPhases] = useState<PhaseId[]>(["validate"]);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setTime((current) => {
        if (current >= DURATION) return DURATION;
        return current + 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [playing]);

  useEffect(() => {
    if (time >= DURATION) setPlaying(false);
  }, [time]);

  const seek = (next: number) => setTime(Math.min(DURATION, Math.max(0, next)));
  const togglePhase = (id: PhaseId) => {
    setPhases((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const sectionLabel = sections.find((item) => item.id === section)?.label ?? "";
  const tabLabel = tabs.find((item) => item.id === tab)?.label ?? "";

  return (
    <div className="min-h-screen bg-white text-[#1e293b]">
      <div className="lg:flex">
        <SideMenu open={menuOpen} active={nav} onSelect={setNav} onClose={() => setMenuOpen(false)} />
        <div className="min-w-0 flex-1">
          <TopBar menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((open) => !open)} />
          <CandidateHeader tab={tab} onTab={setTab} />
          <div id="candidate-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="px-4 py-6 sm:px-8">
            {tab === "interview" ? (
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                <SectionNav active={section} onSelect={setSection} />
                <div className="min-w-0 flex-1 lg:max-w-[1135px]">
                  {section === "ai" ? (
                    <div className="flex flex-col gap-6">
                      <section aria-labelledby="ai-heading" className="flex flex-col gap-6">
                        <h2 id="ai-heading" className="text-[16px] font-semibold leading-6 text-[#002766]">
                          AI Interview Assessment
                        </h2>
                        <AssessmentPanel
                          currentTime={time}
                          duration={DURATION}
                          playing={playing}
                          muted={muted}
                          captions={captions}
                          settingsPressed={settingsPressed}
                          onTogglePlay={() => setPlaying((value) => !value)}
                          onToggleMute={() => setMuted((value) => !value)}
                          onToggleCaptions={() => setCaptions((value) => !value)}
                          onSeek={seek}
                          onFullscreen={() => setVideoOpen(true)}
                          onToggleSettings={() => setSettingsPressed((value) => !value)}
                          onOpenTranscript={() => setTranscriptOpen(true)}
                        />
                      </section>
                      <section aria-labelledby="skills-heading" className="flex flex-col gap-6">
                        <h2 id="skills-heading" className="text-[16px] font-semibold leading-6 text-[#002766]">
                          Key Skills
                        </h2>
                        <KeySkills />
                      </section>
                      <section aria-labelledby="questions-heading" className="flex flex-col gap-6">
                        <h2 id="questions-heading" className="text-[16px] font-semibold leading-6 text-[#002766]">
                          Detailed Question Analysis
                        </h2>
                        <QuestionAnalysis open={phases} onToggle={togglePhase} />
                      </section>
                    </div>
                  ) : (
                    <h2 className="text-[16px] font-semibold leading-6 text-[#002766]">{sectionLabel}</h2>
                  )}
                </div>
              </div>
            ) : (
              <h2 className="text-[16px] font-semibold leading-6 text-[#002766]">{tabLabel}</h2>
            )}
          </div>
        </div>
      </div>
      {transcriptOpen ? (
        <TranscriptDialog
          onClose={() => setTranscriptOpen(false)}
          currentTime={time}
          duration={DURATION}
          playing={playing}
          muted={muted}
          onTogglePlay={() => setPlaying((value) => !value)}
          onToggleMute={() => setMuted((value) => !value)}
          onSeek={seek}
        />
      ) : null}
      {videoOpen ? (
        <VideoDialog
          onClose={() => setVideoOpen(false)}
          onDownload={() => setTranscriptOpen(true)}
          currentTime={time}
          duration={DURATION}
          playing={playing}
          muted={muted}
          captions={theaterCaptions}
          settingsPressed={settingsPressed}
          onTogglePlay={() => setPlaying((value) => !value)}
          onToggleMute={() => setMuted((value) => !value)}
          onToggleCaptions={() => setTheaterCaptions((value) => !value)}
          onSeek={seek}
          onToggleSettings={() => setSettingsPressed((value) => !value)}
        />
      ) : null}
    </div>
  );
}
