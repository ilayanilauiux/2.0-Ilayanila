export const DURATION = 10 * 60 + 30;
export const INITIAL_TIME = 5 * 60 + 20;

export const candidate = {
  name: "Sarah Williams",
  initials: "JW",
  status: "Pending",
  id: "123",
  vendor: "ABC Company",
  workerType: "PRN",
  job: "Java Developer..",
  interviewId: "SIM-INT-123",
  createdOn: "11/02/2025 11:12:54 PM",
  updatedOn: "11/02/2025 11:12:54 PM",
};

export const tabs = [
  { id: "profile", label: "Profile", icon: "/assets/icon-tab.svg" },
  { id: "submission", label: "Submission", icon: "/assets/icon-tab.svg" },
  { id: "interview", label: "Interview", icon: "/assets/icon-hourglass.svg" },
  { id: "offer", label: "Offer", icon: "/assets/icon-offer.svg" },
  { id: "credential", label: "Credential", icon: "/assets/icon-tab.svg" },
  { id: "workflow", label: "Workflow", icon: "/assets/icon-workflow.svg" },
  { id: "history", label: "History", icon: "/assets/icon-history.svg" },
] as const;

export type TabId = (typeof tabs)[number]["id"];

export const sections = [
  { id: "basic", label: "Basic Details", icon: "/assets/icon-basic.svg" },
  { id: "schedule", label: "Scheduled Date & Time", icon: "/assets/icon-schedule.svg" },
  { id: "additional", label: "Additional Details", icon: "/assets/icon-additional.svg" },
  { id: "ai", label: "AI Interview Assessment", icon: "/assets/icon-ai.svg" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const primaryNav = [
  { id: "building", label: "Organization", icon: "/assets/icon-building.svg", size: 26 },
  { id: "create", label: "Create", icon: "/assets/icon-plus.svg", size: 24 },
  { id: "dashboard", label: "Dashboard", icon: "/assets/icon-grid.svg", size: 20 },
  { id: "jobs", label: "Jobs", icon: "/assets/icon-suitcase.svg", size: 20 },
  { id: "people", label: "People", icon: "/assets/icon-users.svg", size: 20 },
  { id: "tasks", label: "Tasks", icon: "/assets/icon-clipboard.svg", size: 20 },
  { id: "schedule", label: "Schedule", icon: "/assets/icon-clock.svg", size: 20 },
  { id: "invoices", label: "Invoices", icon: "/assets/icon-invoice.svg", size: 20 },
  { id: "reports", label: "Reports", icon: "/assets/icon-chart.svg", size: 20 },
] as const;

export type PrimaryNavId = (typeof primaryNav)[number]["id"];

export const caption =
  "In this technical track, we will explore your experience with React production architectures, Python API integrations,";

export const theaterPrompt =
  "Hello John. Thank you for joining the SimplifyVMS automated assessment today. In this technical track, we will explore your experience with React production architectures, Python API integrations, and DevOps automation pipelines. Let's start with frontend state management. When building complex data dashboards in React, how do you prevent unnecessary re-renders when high-frequency data updates are pushed to the UI?";

export const skillTooltip =
  "deas were presented with logical flow and clear organization. The candidate's thoughts connected well from one point to the next. Their responses demonstrated structured thinking.";

export const categorySkills = [
  { label: "Skills", value: "55%", width: "55%", color: "#3b82f6", icon: "/assets/icon-lightbulb.svg" },
  { label: "Industry", value: "21%", width: "21%", color: "#eab308", icon: "/assets/icon-fan.svg" },
  { label: "Education", value: "80%", width: "80%", color: "#22c55e", icon: "/assets/icon-student.svg" },
  { label: "Certification", value: "10%", width: "10%", color: "#ef4444", icon: "/assets/icon-certificate.svg" },
  { label: "Overall Experience", value: "70%", width: "70%", color: "#22c55e", icon: "/assets/icon-book.svg" },
] as const;

export const technicalSkills = [
  { label: "React", score: "4.1", badge: "bg-[#ccf5dd] text-[#00411d]" },
  { label: "Python", score: "3.7", badge: "bg-[#dbeafe] text-[#1e3a8a]" },
  { label: "MongoDB", score: "3.5", badge: "bg-[#dbeafe] text-[#1e3a8a]" },
  { label: "Flutter", score: "2.5", badge: "bg-[#f8e8dd] text-[#ac4300]" },
  { label: "DevOps", score: "4.0", badge: "bg-[#ccf5dd] text-[#00411d]" },
] as const;

export const phases = [
  {
    id: "validate",
    title: "Validate Phase - Technical Assessment",
    icon: "/assets/icon-head.svg",
    questions: [
      {
        score: "2.8",
        scoreColor: "#0044c5",
        track: "/assets/score-track-a.svg",
        arc: "/assets/score-arc-a.svg",
        arcWidth: 33,
        arcHeight: 51,
        arcClass: "left-[36.2%] top-0",
        prompt:
          "I'd love to hear about your experience fine-tuning large language models — can you walk me through a project where you did that and what you learned from the outcome?",
        promptWeight: "font-semibold",
        answer:
          "Candidate described fine-tuning Llama2 for resume/CV parsing in the HR domain and reported a ~15% accuracy improvement, including handling unstructured formats. Positive result and domain relevance, but explanation lacked technical details (dataset size, training procedure, hyperparameters, evaluation methodology) and evidence beyond the aggregate improvement.",
      },
      {
        score: "4.5",
        scoreColor: "#16a34a",
        track: "/assets/score-track-b.svg",
        arc: "/assets/score-arc-b.svg",
        arcWidth: 33,
        arcHeight: 51,
        arcClass: "left-[36.2%] top-0",
        prompt:
          "Tell me about a project where you used Python for data analysis. What libraries did you use, and what were the key insights?",
        promptWeight: "font-medium",
        answer: "",
      },
      {
        score: "2.5",
        scoreColor: "#ea580c",
        track: "/assets/score-track-c.svg",
        arc: "/assets/score-arc-c.svg",
        arcWidth: 18,
        arcHeight: 12,
        arcClass: "left-1/2 top-0",
        prompt:
          "Describe a project where you applied React skills. Which tools or libraries did you use, and what were the main outcomes?",
        promptWeight: "font-medium",
        answer: "",
      },
    ],
  },
  {
    id: "inform",
    title: "Inform Phase",
    icon: "/assets/icon-voice.svg",
    questions: [],
  },
  {
    id: "next",
    title: "Next Step Phase",
    icon: "/assets/icon-joystick.svg",
    questions: [],
  },
] as const;

export type PhaseId = (typeof phases)[number]["id"];

export const transcript = [
  {
    id: "ai-1",
    role: "ai" as const,
    text: "Hello John. Thank you for joining the SimplifyVMS automated assessment today. In this technical track, we will explore your experience with React production architectures, Python API integrations, and DevOps automation pipelines. Let's start with frontend state management. When building complex data dashboards in React, how do you prevent unnecessary re-renders when high-frequency data updates are pushed to the UI?",
  },
  {
    id: "sarah-1",
    role: "candidate" as const,
    name: "Sarah Williams",
    time: "0.40",
    text: "When managing high-frequency data streams in React—like an active vendor management dashboard—preventing re-render bottlenecks is critical. I isolate the state updates by using localized state boundaries so that a single data changing event doesn't force the entire page layout to redraw. I make extensive use of the useMemo and useCallback hooks to cache heavy calculation paths and functions. For massive list views, I implement DOM virtualization frameworks to ensure the browser only paints the visible row elements on the screen at any given millisecond.",
  },
  {
    id: "ai-2",
    role: "ai" as const,
    text: "Excellent. Now let's bridge that frontend experience with the backend layer. A lot of enterprise services rely on Python for data processing. If your React application needs to securely upload a massive vendor payroll spreadsheet to a Python API backend built with FastAPI, how would you design that interaction to handle large payloads efficiently without timing out the browser?",
  },
  {
    id: "sarah-2",
    role: "candidate" as const,
    name: "Sarah Williams",
    time: "02:08",
    text: "To handle large file payloads without blocking the main browser thread or hitting server timeout limits, I wouldn't send the entire file in one single, massive API request. Instead, on the React side, I would implement a file-chunking script to slice the file into smaller binary fragments (e.g., 5MB chunks). React will send these sequentially to the Python API. On the Python side, using a framework like FastAPI or Django, I would set up a streaming endpoint that receives these chunks, validates them on the fly, and appends them dynamically to a storage buffer. Once the final chunk arrives, a background worker process takes over the heavy ledger compilation, instantly freeing up the React UI.",
  },
  {
    id: "ai-3",
    role: "ai" as const,
    waveform: true,
    text: "That brings us directly into infrastructure. Let's discuss DevOps. When a developer on your team pushes a change to the React code or the Python API scripts, what automated mechanisms should run in the CI/CD pipeline to ensure code safety, verify visual compliance, and securely deploy the build into a sandbox testing environment?",
  },
];

export function formatClock(totalSeconds: number) {
  const safe = Math.max(0, Math.round(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
