@custom-variant dark (&:is(.dark *));

:root {
  --font-size: 16px;
  --background: #F8F9FC;
  --foreground: #0F1117;
  --card: #FFFFFF;
  --card-foreground: #0F1117;
  --popover: #FFFFFF;
  --popover-foreground: #0F1117;
  --primary: #4F46E5;
  --primary-foreground: #FFFFFF;
  --secondary: #EEF2FF;
  --secondary-foreground: #3730A3;
  --muted: #F1F3F9;
  --muted-foreground: #6B7280;
  --accent: #10B981;
  --accent-foreground: #FFFFFF;
  --destructive: #EF4444;
  --destructive-foreground: #FFFFFF;
  --border: rgba(15, 17, 23, 0.08);
  --input: transparent;
  --input-background: #F1F3F9;
  --switch-background: #D1D5DB;
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --ring: #4F46E5;
  --chart-1: #4F46E5;
  --chart-2: #10B981;
  --chart-3: #F59E0B;
  --chart-4: #EF4444;
  --chart-5: #8B5CF6;
  --radius: 0.75rem;
  --sidebar: #FFFFFF;
  --sidebar-foreground: #0F1117;
  --sidebar-primary: #4F46E5;
  --sidebar-primary-foreground: #FFFFFF;
  --sidebar-accent: #EEF2FF;
  --sidebar-accent-foreground: #3730A3;
  --sidebar-border: rgba(15, 17, 23, 0.08);
  --sidebar-ring: #4F46E5;
}

.dark {
  --background: #0C0E16;
  --foreground: #F1F3F9;
  --card: #13151F;
  --card-foreground: #F1F3F9;
  --popover: #13151F;
  --popover-foreground: #F1F3F9;
  --primary: #6366F1;
  --primary-foreground: #FFFFFF;
  --secondary: #1E2035;
  --secondary-foreground: #A5B4FC;
  --muted: #1A1C28;
  --muted-foreground: #9CA3AF;
  --accent: #059669;
  --accent-foreground: #FFFFFF;
  --destructive: #DC2626;
  --destructive-foreground: #FFFFFF;
  --border: rgba(255, 255, 255, 0.08);
  --input: rgba(255, 255, 255, 0.05);
  --input-background: #1A1C28;
  --switch-background: #374151;
  --ring: #6366F1;
  --chart-1: #6366F1;
  --chart-2: #34D399;
  --chart-3: #FBBF24;
  --chart-4: #F87171;
  --chart-5: #A78BFA;
  --sidebar: #13151F;
  --sidebar-foreground: #F1F3F9;
  --sidebar-primary: #6366F1;
  --sidebar-primary-foreground: #FFFFFF;
  --sidebar-accent: #1E2035;
  --sidebar-accent-foreground: #A5B4FC;
  --sidebar-border: rgba(255, 255, 255, 0.06);
  --sidebar-ring: #6366F1;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-input-background: var(--input-background);
  --color-switch-background: var(--switch-background);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  }
  html { font-size: var(--font-size); }
  h1 { font-size: var(--text-2xl); font-weight: 700; line-height: 1.3; }
  h2 { font-size: var(--text-xl); font-weight: 600; line-height: 1.4; }
  h3 { font-size: var(--text-lg); font-weight: 600; line-height: 1.5; }
  h4 { font-size: var(--text-base); font-weight: var(--font-weight-medium); line-height: 1.5; }
  label { font-size: var(--text-sm); font-weight: var(--font-weight-medium); line-height: 1.5; }
  button { font-size: var(--text-sm); font-weight: var(--font-weight-medium); line-height: 1.5; }
  input { font-size: var(--text-sm); font-weight: var(--font-weight-normal); line-height: 1.5; }

  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: transparent; border-radius: 9999px; }
  *:hover::-webkit-scrollbar-thumb { background: var(--border); }
}
