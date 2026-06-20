# HR Management System

A complete HR Management System built with Vite, React 18, Tailwind CSS, and React Router, matching the provided design system (cream sidebar, white cards, Inter + JetBrains Mono, Material Symbols icons).

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Folder Structure

```
src/
  main.jsx                 # App entry point, wraps app in BrowserRouter + AppProvider
  App.jsx                  # Route definitions
  index.css                # Global styles, fonts, scrollbar, animations
  context/
    AppContext.jsx         # Global state: employees, leaves, toasts, current user
  data/
    mockData.js            # Mock employees, leaves, activities, stats
  components/
    Sidebar.jsx             Layout.jsx          Topbar.jsx
    StatCard.jsx             Avatar.jsx          Badge.jsx
    Dropdown.jsx             Modal.jsx           Toast.jsx
  modals/
    AddEmployeeModal.jsx
    NewContractModal.jsx
    NewLeaveRequestModal.jsx
  pages/
    Dashboard.jsx
    Employees.jsx
    LeaveManagement.jsx
    Placeholder.jsx         # Payroll / Contracts / Settings stand-ins
```

## Features

- **Dashboard**: stat cards, quick actions, recent activity, upcoming leaves carousel, headcount distribution, dark "next event" card.
- **Employees**: live search, status filter tabs, paginated table, 3-dot menu (View/Edit/Delete), floating Add button with modal form.
- **Leave Management**: tabs (My Leaves / Team Leaves / Pending Approvals), balance cards, clickable September calendar with leave highlights, leave-type checkboxes, pending request cards with Approve/Reject (removes from list + toast), Recently Approved table.
- **Global**: "New Request" button in the top bar opens a leave request modal from any page; toast notifications confirm every action.

## Design tokens

| Token       | Value     |
|-------------|-----------|
| Background  | `#F7F7F5` |
| Card        | `#FFFFFF` / border `#E5E5E5` / radius `12px` |
| Primary     | `#1A1A1A` |
| Secondary   | `#6B6B6B` |
| Success     | `#2EA043` |
| Warning     | `#D29922` |
| Danger      | `#F85149` |
| Fonts       | Inter (UI), JetBrains Mono (numbers) |
| Icons       | Material Symbols Outlined |
| Sidebar     | 240px fixed |
| Topbar      | 64px |

Avatars are generated on the fly via the DiceBear API (no large binary assets bundled).
