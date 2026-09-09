# IT Service Desk & Ticket Management System

An enterprise-grade, responsive **IT Service Desk & Ticket Management System** built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **JSON Server**. 

This system implements **Role-Based Access Control (RBAC)**, full CRUD operations across tickets, users, and categories, a multi-stage ticket lifecycle workflow, ticket assignment, resolution tracking, activity history timeline, search/filter/sort/pagination, analytics reports, and role-tailored dashboards for **Admin**, **Support Agent**, and **Employee**.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [Role Permissions Matrix](#role-permissions-matrix)
4. [Sample Login Credentials](#sample-login-credentials)
5. [Installation & Setup](#installation--setup)
6. [Starting the Application](#starting-the-application)
7. [API Endpoints Reference](#api-endpoints-reference)
8. [Ticket Lifecycle Workflow](#ticket-lifecycle-workflow)
9. [Project Structure](#project-structure)
10. [Deployment Guide](#deployment-guide)

---

## Project Overview

The IT Service Desk application streamlines issue management and IT support workflows within an organization:
- **Admin**: Full control over tickets, assignments, users, categories, and system reports.
- **Support Agent**: Handles assigned tickets, updates statuses, adds resolution notes, and communicates via comments.
- **Employee**: Submits new service requests, tracks status, comments, cancels open tickets, or reopens resolved tickets.

---

## Technologies Used

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS (Enterprise Modern UI)
- **Routing**: React Router DOM v7 (Protected & Role-based routes)
- **Backend / Mock API**: JSON Server (`db.json`)
- **HTTP Client**: Axios (with resilient offline localStorage fallback)
- **State Management**: React Context API (`AuthContext`, `ToastContext`)

---

## Role Permissions Matrix

| Feature / Action | Admin | Support Agent | Employee |
| :--- | :---: | :---: | :---: |
| **Dashboard** | Full 9 Metrics | 6 Agent Metrics | 5 Employee Metrics |
| **Create Ticket** | Yes | Yes | Yes |
| **View All Tickets** | Yes | No (Assigned Only) | No (Own Only) |
| **View Assigned Tickets** | Yes | Yes | No |
| **View Own Tickets** | Yes | Yes | Yes |
| **Edit Ticket** | Yes (Any) | Yes (Assigned) | Yes (Own Open Only) |
| **Delete Ticket** | Yes | No | No |
| **Assign / Reassign Ticket** | Yes | No | No |
| **Update Status** | Full Lifecycle | Assigned Lifecycle | Cancel (Open) / Reopen (Resolved) |
| **Update Priority** | Yes | Yes (Assigned) | No |
| **Add Comments** | Any Ticket | Assigned Tickets | Own Tickets |
| **Add Resolution & Notes** | Yes | Yes (Assigned) | No |
| **Manage Users** | Full CRUD | No Access | No Access |
| **Manage Categories** | Full CRUD | No Access | No Access |
| **View Reports** | Yes | No Access | No Access |

---

## Sample Login Credentials

| Role | Email Address | Password | Description |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@gmail.com` | `123456` | Full administrative system access |
| **Support Agent** | `agent@gmail.com` | `123456` | Handles assigned queues and resolutions |
| **Employee** | `employee@gmail.com` | `123456` | Submits support requests |
| **Employee** | `swathi@gmail.com` | `123456` | Development department employee |
| **Inactive User** | `inactive@gmail.com` | `123456` | Inactive status demo (login blocked) |

> *Tip: On the login screen (`http://localhost:5173/login`), you can click the **Quick Test Accounts** buttons (👑 Admin, 🎧 Agent, 👤 Employee) to automatically pre-fill credentials.*

---

## Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.x or higher recommended)
- `npm` (bundled with Node.js)

### Clone / Open Project Directory
```bash
cd "d:\API Pro\IT-Service-Desk"
```

### Install Dependencies
```bash
npm install
```

---

## Starting the Application

The application requires running the JSON Server mock backend and the Vite development server.

### 1. Start JSON Server (Port 3000)
Open a terminal and run:
```bash
npm run server
```
*JSON Server runs at `http://localhost:3000` watching `db.json`.*

### 2. Start React + Vite Application (Port 5173)
Open a second terminal and run:
```bash
npm run dev
```
*The web application will launch at `http://localhost:5173`.*

> **Offline / Resilient Fallback Mode**: If JSON Server is not running, the application seamlessly uses an internal fallback storage mechanism (`localStorage`) initialized from `db.json`, preventing app crashes or login failures.

---

## API Endpoints Reference

The backend runs on JSON Server with the following REST endpoints:

### Users
- `GET /users` - Retrieve all users
- `GET /users/:id` - Retrieve user by ID
- `POST /users` - Create a new user
- `PUT /users/:id` or `PATCH /users/:id` - Update user details / role / status
- `DELETE /users/:id` - Delete user

### Tickets
- `GET /tickets` - Retrieve all tickets
- `GET /tickets/:id` - Retrieve ticket details
- `POST /tickets` - Submit new ticket
- `PUT /tickets/:id` or `PATCH /tickets/:id` - Update ticket details / status / agent
- `DELETE /tickets/:id` - Delete ticket

### Comments
- `GET /comments` - Retrieve all comments
- `GET /comments?ticketId=:id` - Retrieve comments for a specific ticket
- `POST /comments` - Add a comment
- `DELETE /comments/:id` - Delete comment

### Categories
- `GET /categories` - Retrieve all categories
- `GET /categories/:id` - Retrieve category by ID
- `POST /categories` - Create new category
- `PUT /categories/:id` or `PATCH /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

### Activities
- `GET /activities` - Retrieve all activity history items
- `GET /activities?ticketId=:id` - Retrieve activity timeline for a ticket
- `POST /activities` - Log a new ticket action

---

## Ticket Lifecycle Workflow

### Normal Workflow
$$\text{Open} \longrightarrow \text{Assigned} \longrightarrow \text{In Progress} \longrightarrow \text{Pending} \longrightarrow \text{Resolved} \longrightarrow \text{Closed}$$

### Additional Workflows
- **Open $\longrightarrow$ Cancelled**: Employee or Admin cancels an open request.
- **Pending $\longrightarrow$ In Progress**: Agent resumes investigation when pending info is received.
- **Resolved $\longrightarrow$ Reopened**: Employee or Admin reopens a resolved issue if the problem persists.

---

## Project Structure

```
src/
├── components/
│   ├── Categories/
│   │   ├── CategoryFormModal.tsx
│   │   └── CategoryTable.tsx
│   ├── Comments/
│   │   └── CommentList.tsx
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   ├── Loading.tsx
│   │   ├── Modal.tsx
│   │   ├── Pagination.tsx
│   │   └── Toast.tsx
│   ├── Dashboard/
│   │   ├── DashboardCard.tsx
│   │   └── DashboardCards.tsx
│   ├── Navbar/
│   │   └── Navbar.tsx
│   ├── Sidebar/
│   │   └── Sidebar.tsx
│   ├── Tickets/
│   │   ├── ActivityTimeline.tsx
│   │   ├── AssignmentModal.tsx
│   │   ├── ResolutionModal.tsx
│   │   ├── TicketFormModal.tsx
│   │   ├── TicketPriorityBadge.tsx
│   │   ├── TicketStatusBadge.tsx
│   │   └── TicketTable.tsx
│   └── Users/
│       ├── UserFormModal.tsx
│       └── UserTable.tsx
├── context/
│   ├── AuthContext.tsx
│   └── ToastContext.tsx
├── hooks/
│   ├── useCategories.ts
│   ├── useTickets.ts
│   └── useUsers.ts
├── pages/
│   ├── Categories/
│   │   └── Categories.tsx
│   ├── Dashboard/
│   │   └── Dashboard.tsx
│   ├── Login/
│   │   └── Login.tsx
│   ├── Profile/
│   │   └── Profile.tsx
│   ├── Reports/
│   │   └── Reports.tsx
│   ├── Tickets/
│   │   ├── TicketDetails.tsx
│   │   └── Tickets.tsx
│   └── Users/
│       └── Users.tsx
├── routes/
│   ├── AppRoutes.tsx
│   ├── ProtectedRoute.tsx
│   └── RoleRoute.tsx
├── services/
│   ├── activityService.ts
│   ├── api.ts
│   ├── categoryService.ts
│   ├── commentService.ts
│   ├── mockData.ts
│   ├── ticketService.ts
│   └── userService.ts
├── types/
│   ├── activity.ts
│   ├── category.ts
│   ├── comment.ts
│   ├── ticket.ts
│   └── user.ts
└── utils/
    ├── formatDate.ts
    ├── priorityUtils.ts
    └── statusUtils.ts
```

---

## Deployment Guide

### Build for Production
To generate an optimized production build:
```bash
npm run build
```
The output will be created in the `dist/` directory.

### Deploying to Vercel
1. Install Vercel CLI: `npm i -g vercel` or connect repository via [Vercel Dashboard](https://vercel.com).
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.

### Deploying to Netlify
1. Connect repository on [Netlify](https://www.netlify.com).
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Add a `_redirects` file in `public/` containing `/*  /index.html  200` to support client-side routing.
