import { cn } from "cn";

function ProfileTabs({
  activeTab,
  onTabChange,
  visi,
  misi,
  contentClassName = "min-h-44",
}) {
  return (
    <div className="rounded-2xl bg-secondary p-5 shadow-sm ring-1 ring-foreground/10 sm:p-6">
      <div className="flex items-center gap-6 border-b border-border">
        {[
          { key: "visi", label: "Visi" },
          { key: "misi", label: "Misi" },
        ].map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => onTabChange(tab.key)}
              className={cn(
                "flex cursor-pointer items-center gap-1.5 border-b-2 pb-3 text-sm font-semibold transition-colors",
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
              {isActive && (
                <span className="size-1.5 rounded-full bg-emerald-500" />
              )}
            </button>
          );
        })}
      </div>

      <div className={`mt-5 ${contentClassName}`}>
        {activeTab === "visi" ? (
          <div className="animate-in fade-in-0 slide-in-from-bottom-2 animation-duration-[300ms]">
            <p className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-7">
              {visi}
            </p>
          </div>
        ) : (
          <ol
            className="
            h-full space-y-3 overflow-y-auto [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30
            [&::-webkit-scrollbar-thumb:hover]:bg-muted-foreground/50 pr-2 animate-in fade-in-0 slide-in-from-bottom-2 animation-duration-[300ms]"
          >
            {misi.map((mission, index) => (
              <li
                key={mission}
                className="flex gap-3 text-sm leading-6 text-muted-foreground"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
                  {index + 1}
                </span>
                {mission}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

export default ProfileTabs;
