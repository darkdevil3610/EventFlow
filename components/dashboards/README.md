# Role-Based Dashboards

Dashboard components for different user roles in EventFlow.

## Components

### AdminDashboard
Administrative dashboard for managing users, events, and system status.

**Features:**
- User Management widget (total users, active sessions, registrations)
- Event Statistics widget (total, upcoming, completed events)
- System Status widget (server, database, backup status)
- Recent Activity feed

**Usage:**
```jsx
import { AdminDashboard } from '@/components/dashboards';

<AdminDashboard userId="admin-123" role="admin" />
```

### ParticipantDashboard
Participant-focused dashboard for viewing events and schedules.

**Features:**
- My Events widget
- My Schedule widget
- Notifications widget
- Quick Actions

**Usage:**
```jsx
import { ParticipantDashboard } from '@/components/dashboards';

<ParticipantDashboard userId="user-456" role="participant" />
```

### DashboardWidget (Shared)
Reusable widget container used by both dashboards.

**Props:**
- `title` (string): Widget heading
- `children` (ReactNode): Widget content

**Usage:**
```jsx
import { DashboardWidget } from '@/components/dashboards';

<DashboardWidget title="My Widget">
  <p>Content goes here</p>
</DashboardWidget>
```

## File Structure
```
components/dashboards/
├── AdminDashboard.jsx          # Admin dashboard component
├── AdminDashboard.css          # Admin dashboard styles
├── ParticipantDashboard.jsx    # Participant dashboard component
├── ParticipantDashboard.css    # Participant dashboard styles
├── types.js                    # Prop type definitions
├── index.js                    # Central exports
├── README.md                   # This file
└── shared/
    ├── DashboardWidget.jsx     # Reusable widget component
    └── DashboardWidget.css     # Widget styles
```

## Development Notes

- All data is currently placeholder
- Ready for backend integration
- Responsive grid layout (auto-fit, min 300px)
- Mobile-first design