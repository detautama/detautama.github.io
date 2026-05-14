const TAG_EMOJI_MAP: Record<string, string> = {
  // AI & Machine Learning
  "AI": "🤖",
  "AI Development": "🤖",
  "Copilot": "🤖",

  // Programming Languages & Runtimes
  "JavaScript": "🟨",
  "TypeScript": "🔷",
  "Node.js": "🟢",
  "npm": "📦",
  "clsx": "🧩",

  // Frameworks & Libraries
  "React": "⚛️",
  "React Native": "📱",
  "XState": "🔄",
  "TanStack Query": "🔁",
  "Expo": "📱",
  "Contentful": "📄",
  "Zod": "✅",
  "Turf.js": "🗺️",

  // Frontend & Web
  "CSS": "🎨",
  "HTML": "🌐",
  "Flexbox": "📏",
  "Layout": "📐",
  "Animation": "🎬",
  "Web APIs": "🌐",
  "Chrome Extension": "🔌",
  "UI": "🎨",
  "UX": "🎯",
  "Accessibility": "♿",
  "Drag and Drop": "🖱️",
  "SEO": "🔍",

  // Data & Systems
  "Database": "🗄️",
  "Data Modeling": "🗃️",
  "System Design": "🏗️",
  "Architecture": "🏗️",
  "Design Patterns": "🔧",
  "Data Structures": "📊",
  "Array Methods": "📋",
  "Data Validation": "✅",
  "GIS": "🗺️",
  "Geospatial": "📍",
  "State Management": "📦",

  // Dev Tools & Practices
  "VS Code": "💻",
  "Git": "🔀",
  "Jira": "📋",
  "DevTools": "🔧",
  "Automation": "🤖",
  "Version Control": "📜",
  "Package Management": "📦",
  "Compiler": "⚙️",
  "Type System": "🔷",
  "Utility Types": "🔧",
  "Internationalization": "🌍",

  // Code Quality & Architecture
  "Best Practices": "✨",
  "Clean Code": "🧹",
  "Code Quality": "💎",
  "Problem Solving": "🧩",
  "Debugging": "🐛",
  "Performance": "⚡",
  "Offline First": "📡",

  // Testing
  "Testing": "🧪",
  "TDD": "🧪",
  "E2E Testing": "🔬",
  "Cypress": "🔍",
  "Maestro": "🎵",
  "QA": "✔️",

  // Security
  "Security": "🔒",
  "Cybersecurity": "🛡️",
  "Compliance": "✅",
  "Regulation": "📜",

  // Software Development
  "Software Development": "💻",
  "Programming": "👨‍💻",
  "Programming Fundamentals": "📖",
  "Documentation": "📝",
  "Project Management": "📊",
  "Skill": "⭐",

  // Productivity & Work
  "Productivity": "⚡",
  "Time Management": "⏰",
  "Work-Life Balance": "⚖️",
  "Workflow": "🔄",
  "Customization": "🎨",
  "Themes": "🎨",
  "minimalism": "⬜",
  "maintenance": "🔧",
  "work-life": "⚖️",

  // Career & Learning
  "Career": "🚀",
  "Learning": "📚",
  "Education": "🎓",
  "Marketing": "📣",
  "Business Tools": "💼",

  // Personal Development & Mindset
  "Personal Development": "🌱",
  "Mindset": "🧠",
  "Critical Thinking": "💡",
  "Decision Making": "🎯",
  "Psychology": "🧠",
  "Cognitive Science": "🔬",
  "Reflection": "🪞",

  // Mental Health & Wellness
  "Mental Health": "💚",
  "Wellness": "🌿",
  "Self-Care": "💆",
  "Mindfulness": "🧘",

  // Philosophy & Spirituality
  "Philosophy": "💭",
  "Stoicism": "🏛️",
  "Spirituality": "✨",

  // Life & Relationships
  "Life": "🌿",
  "Parenting": "👨‍👩‍👧",
  "Communication": "💬",
  "Workplace": "🏢",
  "Teamwork": "🤝",
  "Community": "👥",

  // Achievements / Events
  "Tech": "💻",
  "Speaking": "🎤",
  "Google I/O": "🔍",

  // Bahasa Indonesia / Berita
  "Opini": "💬",
  "Produktivitas": "⚡",
  "Gianyar": "🌴",
  "Kebijakan Publik": "🏛️",
  "berita-desa": "📰",
  "lingkungan": "🌿",
  "bank-sampah": "♻️",
  "celuk": "📍",
  "sukawati": "📍",
};

export function getTagEmoji(tag: string): string {
  return TAG_EMOJI_MAP[tag] ?? "🏷️";
}
