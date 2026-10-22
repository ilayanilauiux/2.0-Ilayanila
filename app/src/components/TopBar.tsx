import { Icon } from "./Icon";

const actions = [
  { label: "Settings", icon: "/assets/icon-settings.svg" },
  { label: "QR code scanner", icon: "/assets/icon-qr.svg" },
  { label: "Language", icon: "/assets/icon-globe.svg" },
  { label: "Support", icon: "/assets/icon-support.svg" },
];

type TopBarProps = {
  menuOpen: boolean;
  onToggleMenu: () => void;
};

export function TopBar({ menuOpen, onToggleMenu }: TopBarProps) {
  return (
    <header className="flex h-[62px] items-center justify-between border-b border-[#e3e9f0] bg-white px-4 sm:px-8">
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={onToggleMenu}
          className="rounded p-1 hover:bg-[#f1f5f9] active:bg-[#e2e8f0]"
        >
          <Icon src="/assets/icon-menu.svg" width={24} height={24} />
        </button>
        <img src="/assets/logo-simplify.png" width={75} height={30} alt="Simplify" className="h-[30px] w-[75px] object-contain" />
      </div>
      <div className="flex items-center gap-3 sm:gap-5">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            aria-label={action.label}
            className="rounded p-1 hover:bg-[#f1f5f9] active:bg-[#e2e8f0]"
          >
            <Icon src={action.icon} width={24} height={24} />
          </button>
        ))}
      </div>
    </header>
  );
}
