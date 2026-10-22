import { primaryNav, type PrimaryNavId } from "../content";
import { Icon } from "./Icon";

type SideMenuProps = {
  open: boolean;
  active: PrimaryNavId;
  onSelect: (id: PrimaryNavId) => void;
  onClose: () => void;
};

export function SideMenu({ open, active, onSelect, onClose }: SideMenuProps) {
  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-[#001a43]/40 lg:hidden"
          onClick={onClose}
        />
      ) : null}
      <nav
        aria-label="Primary"
        className={`${open ? "fixed inset-y-0 left-0 z-50 flex" : "hidden"} h-screen w-[70px] shrink-0 flex-col items-center bg-[#002766] px-5 pt-5 lg:sticky lg:top-0 lg:z-auto lg:flex`}
      >
        <div className="flex w-full flex-col items-center gap-4">
          <button
            type="button"
            aria-label="Organization"
            aria-pressed={active === "building"}
            onClick={() => onSelect("building")}
            className="flex h-[41px] w-10 items-center rounded py-2"
          >
            <span
              className={`flex size-10 items-center justify-center rounded ${active === "building" ? "bg-white/20" : "bg-[rgba(232,231,255,0.1)]"}`}
            >
              <Icon src="/assets/icon-building.svg" width={26} height={26} />
            </span>
          </button>
          <button
            type="button"
            aria-label="Create"
            aria-pressed={active === "create"}
            onClick={() => onSelect("create")}
            className={`flex size-10 items-center justify-center rounded-lg ${active === "create" ? "bg-[#4c7ff0]" : "bg-white/10"} hover:bg-[#4c7ff0] active:bg-[#3b6ad4]`}
          >
            <Icon src="/assets/icon-plus.svg" width={24} height={24} />
          </button>
          <div className="flex w-full flex-col items-center gap-1">
            {primaryNav.slice(2).map((item) => {
              const selected = active === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.label}
                  aria-current={selected ? "page" : undefined}
                  onClick={() => onSelect(item.id)}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg hover:bg-white/10 active:bg-white/20 ${selected ? "bg-[#4c7ff0] hover:bg-[#3b6fe0]" : "bg-transparent"}`}
                >
                  <Icon src={item.icon} width={item.size} height={item.size} />
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-auto flex w-full flex-col items-center gap-4 py-4">
          <Icon src="/assets/icon-divider.svg" width={70} height={1} />
          <button type="button" aria-label="Sarah Williams account" className="rounded-full hover:ring-2 hover:ring-white/70 active:ring-[#4c7ff0]">
            <img
              src="/assets/avatar-user.png"
              width={40}
              height={40}
              alt="Sarah Williams"
              className="size-10 rounded-full object-cover"
            />
          </button>
        </div>
      </nav>
    </>
  );
}
