// src/lib/navigation-compact.ts
interface CompactNavItem {
    href: string;
    icon: string;
    tooltip: string;
    section: 'primary' | 'secondary' | 'tertiary';
    ariaLabel: string;
    badge?: string | number;
  }
  
  export const compactNavigation: CompactNavItem[] = [
    // Primary workspace
    { 
      href: '/dashboard', 
      icon: 'chart-line', 
      tooltip: 'Dashboard',
      ariaLabel: 'Go to Dashboard',
      section: 'primary'
    },
    { 
      href: '/projects', 
      icon: 'folder', 
      tooltip: 'Projects',
      ariaLabel: 'Go to Projects',
      section: 'primary',
      badge: '12'
    },
    { 
      href: '/tasks', 
      icon: 'check-square', 
      tooltip: 'Tasks',
      ariaLabel: 'Go to Tasks - 8 pending',
      section: 'primary',
      badge: 8
    },
    { 
      href: '/kanban', 
      icon: 'columns', 
      tooltip: 'Kanban Board',
      ariaLabel: 'Go to Kanban Board',
      section: 'primary'
    },
    { 
      href: '/reports', 
      icon: 'bar-chart', 
      tooltip: 'Reports',
      ariaLabel: 'Go to Reports',
      section: 'primary'
    },
  
    // Secondary collaboration
    { 
      href: '/team', 
      icon: 'users', 
      tooltip: 'Team Members',
      ariaLabel: 'Go to Team - 24 members',
      section: 'secondary',
      badge: '24'
    },
    { 
      href: '/messages', 
      icon: 'message-circle', 
      tooltip: 'Messages',
      ariaLabel: 'Go to Messages - 3 unread',
      section: 'secondary',
      badge: 3
    },
    { 
      href: '/notifications', 
      icon: 'bell', 
      tooltip: 'Notifications',
      ariaLabel: 'Go to Notifications - 15 new',
      section: 'secondary',
      badge: '15'
    },
  
    // Tertiary administration
    { 
      href: '/settings', 
      icon: 'settings', 
      tooltip: 'Settings',
      ariaLabel: 'Go to Settings',
      section: 'tertiary'
    },
    { 
      href: '/integrations', 
      icon: 'plug', 
      tooltip: 'Integrations',
      ariaLabel: 'Go to Integrations - 5 connected',
      section: 'tertiary',
      badge: '5'
    },
    { 
      href: '/help', 
      icon: 'help-circle', 
      tooltip: 'Help & Support',
      ariaLabel: 'Go to Help & Support',
      section: 'tertiary'
    }
  ];
  