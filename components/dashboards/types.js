/**
 * Dashboard component prop types
 * @typedef {Object} DashboardProps
 * @property {string} userId - User identifier
 * @property {'admin'|'participant'} role - User role
 */

/**
 * Widget component prop types
 * @typedef {Object} WidgetProps
 * @property {string} title - Widget title
 * @property {React.ReactNode} children - Widget content
 */

export const DashboardRoles = {
  ADMIN: 'admin',
  PARTICIPANT: 'participant'
};