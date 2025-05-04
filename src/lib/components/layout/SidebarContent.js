import {
    Home,
    Calendar,
    Users,
    Folder,
    Settings,
    LogOut,
    AudioWaveform,
    Sprout,
    Bot
  } from 'lucide-svelte';
  
  /**
   * Primary navigation for core app features
   */
  export const sidebarMainNav = [
    {
      label: 'Dashboard',
      icon: Home,
      href: '/app/',
      exact: true
    },
    {
      label: 'Appointments',
      icon: Calendar,
      href: '/app/booking'
    },
    {
      label: 'Clients',
      icon: Users,
      href: '/app/user'
    },
    {
      label: 'Services',
      icon: Folder,
      href: '/app/demo'
    }
  ];
  
  /**
   * Settings or configuration-related links
   */
  export const sidebarSettingsNav = [
    {
      label: 'Settings',
      icon: Settings,
      href: '/sample'
    },
    {
      label: 'Login',
      icon: Bot,
      href: '/demo',
    }
  ];
  
  /**
   * Utility actions (not navigation links)
   */
  export const sidebarUtilityNav = [
    {
      label: 'Toggle Theme',
      icon: AudioWaveform, // or Moon based on dark mode state
      action: 'toggle-theme',
      href: '/shadcn'
    },
    {
      label: 'Logout',
      icon: Sprout,
      href: '/logout',
    }
  ];
  