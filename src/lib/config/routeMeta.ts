// src/lib/config/routeMeta.ts

export const routeMeta = {
    '/app/services': {
      title: 'Nail Services',
      subtitle: 'Browse and manage nail offerings',
      actions: [
        { label: 'Add New', variant: 'primary', href: '/app/services/new' },
        { label: 'Export', variant: 'outline', action: 'export-services' }
      ]
    },
  
    '/app/services/[id]': {
      title: 'Service Details',
      subtitle: 'Edit or review service information',
      actions: [
        { label: 'Back', variant: 'outline', href: '/app/services' }
      ]
    },
  
    '/app/booking': {
      title: 'Bookings',
      subtitle: 'View and manage all customer appointments',
      actions: [
        { label: 'New Booking', variant: 'primary', href: '/app/booking/new' }
      ]
    },
  
    '/app/booking/[id]': {
      title: 'Booking Details',
      subtitle: 'Manage individual appointment',
      actions: [
        { label: 'Back', variant: 'outline', href: '/app/booking' }
      ]
    }
  };
  