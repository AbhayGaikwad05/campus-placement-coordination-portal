# Campus Placement Coordination Portal

Institutional Campus Recruitment & Talent Governance Platform for MIT Academy of Engineering (MITAOE) Corporate Relations & Placement Cell (CRPC).

## Overview

The **Campus Placement Coordination Portal** is an enterprise-grade frontend web application built with React, Vite, Bootstrap 5, and Tailwind CSS. It provides a modular, role-partitioned architecture structured around **three consolidated primary roles**:

1. **Student Portal** (`/student/*`): Profile management, academic SGPA tracking, marksheet audits, drive applications, practice assessments, interview schedules, and announcements.
2. **CRPC Portal** (`/crpc/*`): Centralized placement coordination and governance supporting three internal designations via an internal permission model:
   - **CRPC Super Admin** (Complete administrative oversight, system policies, directory & audit logs)
   - **CRPC Placement Officer** (Recruitment drive approvals, company verification, interview coordination)
   - **Department Coordinator** (Department-scoped student directory, eligibility verification, departmental statistics)
3. **Company Portal** (`/company/*`): Corporate recruitment hub supporting two internal designations:
   - **Company Recruiter** (Drive creation, applicant shortlisting, stage progression, company profile)
   - **Company Interviewer** (Candidate evaluation workspace, 5-point rubric grading, scorecard submission)

---

## Architecture & Modular Folder Structure

```
campus-placement-portal/
├── public/
│   ├── images/
│   ├── icons/
│   └── assets/
├── src/
│   ├── homepage/                     # Independent Public Website
│   │   ├── pages/ (Home, About, Contact)
│   │   ├── components/ (HomeNavbar, HomeFooter)
│   │   ├── styles/ (homepage.css)
│   │   └── index.js
│   ├── authentication/               # Consolidated 3-Role Authentication
│   │   ├── pages/ (Login, ForgotPassword, Unauthorized)
│   │   ├── context/ (AuthContext.jsx)
│   │   ├── services/ (authService.js)
│   │   └── styles/ (auth.css)
│   ├── student/                      # Role 1: Student Portal
│   │   ├── pages/ (Dashboard, Profile, Opportunities, OpportunityDetails, Applications, Interviews, Announcements, Notifications, Settings)
│   │   ├── navigation/ (StudentSidebar, StudentHeader, StudentNavigation)
│   │   ├── layouts/ (StudentLayout.jsx)
│   │   ├── services/ (studentService.js)
│   │   ├── data/ (index.js)
│   │   ├── styles/ (student.css)
│   │   └── index.js
│   ├── crpc/                         # Role 2: CRPC Placement Cell Portal
│   │   ├── pages/ (Dashboard, Students, StudentDetails, Companies, CompanyDetails, RecruitmentApprovals, AllDrives, Applications, Interviews, Announcements, Reports, Settings)
│   │   ├── navigation/ (CRPCSidebar, CRPCHeader, CRPCNavigation)
│   │   ├── layouts/ (CRPCLayout.jsx)
│   │   ├── services/ (crpcService.js)
│   │   ├── data/ (index.js)
│   │   ├── styles/ (crpc.css)
│   │   └── index.js
│   ├── company/                      # Role 3: Corporate Partner Portal
│   │   ├── pages/ (Dashboard, CompanyProfile, Verification, RecruitmentDrives, CreateDrive, DriveDetails, Applicants, Interviews, Announcements, Notifications, Settings)
│   │   ├── navigation/ (CompanySidebar, CompanyHeader, CompanyNavigation)
│   │   ├── layouts/ (CompanyLayout.jsx)
│   │   ├── services/ (companyService.js)
│   │   ├── data/ (index.js)
│   │   ├── styles/ (company.css)
│   │   └── index.js
│   ├── shared/                       # Cross-Role Shared Components
│   │   ├── components/ (Button, Modal, DataTable, StatusBadge, SearchBar, StatCard, EmptyState, Loader, Toast)
│   │   ├── hooks/ (useDebounce, useMediaQuery, useAuth, usePlacement)
│   │   ├── utils/ (business rules, formatters, calculators)
│   │   ├── layouts/
│   │   ├── navigation/
│   │   └── styles/ (shared.css)
│   ├── data/                         # Central Mock Data Layer
│   │   ├── students.js
│   │   ├── companies.js
│   │   ├── recruitmentDrives.js
│   │   ├── applications.js
│   │   ├── interviews.js
│   │   ├── announcements.js
│   │   └── notifications.js
│   ├── routes/                       # Navigation & Route Guards
│   │   ├── AppRoutes.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── RoleBasedRoute.jsx
│   ├── context/
│   │   └── AppContext.jsx            # Composite State Provider
│   ├── styles/                       # Enterprise Styling System
│   │   ├── variables.css             # Navy Prestige Theme Tokens
│   │   ├── bootstrap-overrides.css   # Bootstrap 5 Component Overrides
│   │   ├── responsive.css            # Mobile off-canvas & layout adaptations
│   │   └── global.css                # Master CSS bundle
│   ├── App.jsx                       # Main App Component
│   └── main.jsx                      # Vite Application Entrypoint
```

---

## 3 Main Login Roles & Test Personas

The login interface displays **exactly three primary role options**:

| Role Tab | Persona Name | Designation | Demo Email | Destination |
| :--- | :--- | :--- | :--- | :--- |
| **Student** | Aarav Sharma | Final Year B.Tech CSE | `student@mitaoe.ac.in` | `/student/dashboard` |
| **CRPC** | Dr. Rajesh Kulkarni | CRPC Super Admin | `admin@mitaoe.ac.in` | `/crpc/dashboard` |
| **CRPC** | Prof. Sunita Patil | Placement Officer | `officer@mitaoe.ac.in` | `/crpc/dashboard` |
| **CRPC** | Prof. Anand Joshi | Dept Coordinator (Comp) | `coordinator.comp@mitaoe.ac.in` | `/crpc/dashboard` |
| **Company** | Devika Sen | Company Recruiter | `devika.sen@google.com` | `/company/dashboard` |
| **Company** | Siddharth Rao | Company Interviewer | `siddharth.rao@google.com` | `/company/dashboard` |

*Password for all demo accounts: `password123` (or click any persona quick-switch pill for 1-click access).*

---

## Design System: Navy Prestige

The user interface uses the **Navy Prestige** color palette with Bootstrap 5 components:

- **Primary Navy**: `#17365D` (institutional deep navy)
- **Secondary Navy**: `#254E7A`
- **Accent Blue**: `#3478C5`
- **Soft Slate**: `#E7EDF5`
- **Background Light**: `#F5F7FA`
- **Institutional Gold**: `#E0B66D`
- **Success / Offered**: `#2E7D32`
- **Danger / Rejected**: `#B94C45`

### Collapsible Sidebar Navigation
Every role dashboard includes an independent, collapsible left sidebar:
- **Expanded**: ~248px width with category sections, icon badges, and active pill highlights.
- **Collapsed**: ~72px width with icons and hover tooltip labels.
- **Mobile**: Responsive off-canvas slide-out drawer with backdrop.

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Local URL: **http://localhost:5173/**

### 3. Build for Production
```bash
npm run build
```
Generates optimized, minified production assets in `dist/`.
