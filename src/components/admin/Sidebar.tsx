import React from "react";

interface SidebarProps {
  activeTab: "dashboard" | "blog" | "posts" | "settings";
  setActiveTab: (tab: "dashboard" | "blog" | "posts" | "settings") => void;
}

const icons = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" />
        <rect x="3" y="14" width="7" height="7" rx="2" />
      </svg>
    ),
  },
  {
    key: "blog",
    label: "Blog",
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
  {
    key: "posts",
    label: "Posts",
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h4" />
      </svg>
    ),
  },
  {
    key: "settings",
    label: "Settings",
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside
      className="fixed left-8 top-10 h-[380px] z-50 flex flex-col items-center justify-center gap-6 bg-white/40 dark:bg-gray-900/40 border border-white/30 dark:border-gray-700/40 backdrop-blur-xl rounded-3xl shadow-2xl w-24"
      style={{
        borderTopLeftRadius: 36,
        borderBottomLeftRadius: 36,
        borderRight: "1.5px solid rgba(200,200,200,0.18)",
      }}
    >
      <div className="flex flex-col gap-8 w-full items-center">
        {icons.map(({ key, label, icon }) => (
          <button
            key={key}
            className={`group relative flex flex-col items-center w-12 h-12 justify-center rounded-2xl transition-all duration-200 ${activeTab === key ? "bg-blue-500/90 text-white shadow-lg" : "hover:bg-blue-100/70 dark:hover:bg-gray-700/70 text-gray-700 dark:text-gray-300"}`}
            onClick={() => setActiveTab(key as any)}
            style={{
              boxShadow:
                activeTab === key
                  ? "0 4px 24px 0 rgba(0, 68, 255, 0.10)"
                  : undefined,
            }}
            aria-label={label}
          >
            <span className="w-7 h-7 flex items-center justify-center">
              {icon}
            </span>
            <span className="absolute left-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-gray-900/95 text-white px-3 py-1 rounded shadow-xl transition-all duration-200 pointer-events-none whitespace-nowrap text-sm font-medium">
              {label}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
