# MIT Academy of Engineering (MITAOE)
## Corporate Relations & Placement Cell (CRPC) Portal
### System User Specification & User Flow Architecture

---

## 1. Executive Summary & System Overview

The **MITAOE CRPC Portal** is an institutional campus recruitment and talent governance platform engineered specifically for **MIT Academy of Engineering, Pune**. The system enforces institutional placement policies (including single-offer rules, Dream/Super-Dream CTC tiers, and academic marksheet verification) across six distinct personas:

1. **Student (Enrolled Candidate)**
2. **CRPC Super Admin (Dean / Director of CRPC)**
3. **CRPC Placement Officer (Operational Lead)**
4. **Department Placement Coordinator (Academic Faculty)**
5. **Company Recruiter (Corporate Talent Partner)**
6. **Company Technical Interviewer (Evaluator / Bar-Raiser)**

---

## 2. User Personas & Permission Matrix

| Feature / Module | Student | Dept Coordinator | Placement Officer | CRPC Super Admin | Company Recruiter | Company Interviewer |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Personal Profile & Photo Management** | Read / Write (Self) | Read (Dept) | Read (All) | Read (All) | Read (Shortlisted) | Read (Assigned) |
| **Academic Marksheets & SGPA** | Read / Upload | Verify / Approve | Read / Audit | Read / Audit | Read (Snapshot) | Read (Snapshot) |
| **Placement Drives Directory** | Read / Apply | Read | Create / Publish | Read / Govern | Read / Manage (Own) | - |
| **Eligibility Automated Checker** | View Status | Monitor Criteria | Configure | Override / Policy | Configure Minimums | - |
| **Application Pipeline & Shortlisting** | View Own | Monitor Dept | Manage All | Oversee Analytics | Review & Move Stages | - |
| **Online Assessments / Practice** | Take Tests | View Scores | Create Official | View Analytics | Review Drive Scores | - |
| **Technical Interview Evaluations** | View Schedule | View Schedules | Schedule Rounds | Audit Reports | View Evaluations | Conduct & Score Rubric |
| **Offer Letter Issuance & Tracking** | Accept / Decline | View Dept Stats | Approve Offers | Institutional Policy | Issue Job Offers | - |
| **System Settings & Audit Logs** | - | - | Operational Logs | System Configuration | - | - |

---

## 3. High-Level Macro System Flowchart

The following diagram illustrates the complete, interconnected recruitment season lifecycle from company registration to offer acceptance and placement record closure:

```mermaid
flowchart TD
    classDef student fill:#EEF2FF,stroke:#4F46E5,stroke-width:2px,color:#1E1B4B;
    classDef officer fill:#EFF6FF,stroke:#2563EB,stroke-width:2px,color:#172554;
    classDef coord fill:#ECFDF5,stroke:#059669,stroke-width:2px,color:#064E3B;
    classDef company fill:#FFFBEB,stroke:#D97706,stroke-width:2px,color:#78350F;
    classDef admin fill:#FAF5FF,stroke:#7C3AED,stroke-width:2px,color:#4C1D95;

    subgraph Enrollment ["1. Student Onboarding & Academic Verification"]
        S1([Student Enrolls / Signs In]):::student --> S2[Complete Personal Details & Upload Photo]:::student
        S2 --> S3[Enter Sem SGPA & Upload Marksheet PDFs]:::student
        S3 --> C1{Dept Coordinator Reviews Documents}:::coord
        C1 -- Incomplete / Discrepancy --> C2[Flag Action Required]:::coord --> S3
        C1 -- Verified Authentic --> C3[Mark Academic Clearance: VERIFIED]:::coord
    end

    subgraph Corporate ["2. Company Onboarding & Drive Scheduling"]
        CR1([Company Registers / Signs In]):::company --> CR2[Submit Company Profile & Tier Details]:::company
        CR2 --> PO1{Placement Officer Verifies Company}:::officer
        PO1 -- Reject / Hold --> PO2[Suspension / Rejection with Reason]:::officer
        PO1 -- Approved --> PO3[Approve Company Profile]:::officer
        CR3[Recruiter Creates Placement Drive]:::company --> PO4{Officer Audits Drive & CTC Terms}:::officer
        PO4 --> PO5[Publish Drive to Eligible Batches]:::officer
    end

    subgraph Selection ["3. Automated Eligibility & Application Funnel"]
        PO5 --> APP1[Automated Eligibility Engine Checks CGPA, Backlogs & Policy]
        C3 --> APP1
        APP1 -- Ineligible --> APP2[Display Criteria Breakdown & Restrictions]:::student
        APP1 -- Eligible --> APP3[Student Submits Application with Resume Snapshot]:::student
        APP3 --> PO6[Applications Pipeline Aggregation]:::officer
        PO6 --> CR4[Recruiter Screens Candidates & Shortlists]:::company
    end

    subgraph AssessmentRounds ["4. Assessments & Technical Interviews"]
        CR4 --> T1{Is Online Assessment Required?}
        T1 -- Yes --> T2[Candidate Takes Proctoring Assessment]:::student
        T2 --> T3[Automated Scoring & Cut-off Filtering]
        T3 --> CR5[Shortlist for Technical Interviews]:::company
        T1 -- No --> CR5
        CR5 --> I1[Placement Officer / Recruiter Schedules Interview Round]:::officer
        I1 --> INT1[Company Interviewer Conducts Live Evaluation]:::company
        INT1 --> INT2[Submit Structured Technical Rubric & Recommendation]:::company
    end

    subgraph OfferPlacement ["5. Offer Issuance & Policy Enforcement"]
        INT2 --> CR6{Recruiter Final Hiring Decision}:::company
        CR6 -- Selected --> OFF1[Issue Campus Offer Letter with CTC]:::company
        OFF1 --> PO7[CRPC Officer Verifies Offer Details]:::officer
        PO7 --> S4{Student Decision on Offer}:::student
        S4 -- Decline --> S5[Application Closed / Offer Declined]:::student
        S4 -- Accept --> S6[Status Updated to PLACED]:::student
        S6 --> POL1{Check Institutional Policy: Single Offer vs Super-Dream}:::admin
        POL1 -- Regular Offer CTC < Tier Threshold --> POL2[Lock Further Standard Drive Applications]:::admin
        POL1 -- Eligible for Super-Dream --> POL3[Permit Applications Only to Super-Dream Drives]:::admin
        S6 --> ADM1[Institutional Placement KPI Analytics & Audit Log Updated]:::admin
    end
```

---

## 4. Role-Specific Micro User Flows

### 4.1. Student User Flow (Career & Placement Space)

```mermaid
sequenceDiagram
    autonumber
    actor Student
    participant System as Portal Auth / Guard
    participant Portfolio as Student Portfolio
    participant Engine as Eligibility Engine
    participant Drive as Drives Directory
    participant Recruiter as Company Recruiter
    participant Offer as Offer Module

    Student->>System: Sign in (Email & Password / Role Switch)
    System->>Student: Redirect to /student/dashboard
    Student->>Portfolio: Navigate to /student/portfolio
    Student->>Portfolio: Add Personal Details (Photo, DOB, Gender, Addresses, Emergency Contact)
    Student->>Portfolio: Input SGPA and Upload Semester Marksheets
    Note over Portfolio: Faculty verifies marksheets
    Student->>Drive: Browse Placement Drives (/student/opportunities)
    Drive->>Engine: Evaluate Candidate against Drive Rules
    Engine-->>Drive: Eligibility Breakdown (CGPA >= 8.0, 0 Backlogs, CSE/IT, Verified)
    Student->>Drive: Click "Apply Now" (Select specific Tailored Resume)
    Drive-->>Student: Application Submitted with immutable credential snapshot
    Recruiter->>Student: Shortlist & Interview Scheduled Notification
    Student->>Student: Attend Interview & Technical Rounds
    Recruiter->>Offer: Issue Offer (e.g., 24 LPA)
    Offer-->>Student: Official Offer Letter Received Notification
    Student->>Offer: Accept Offer
    Offer-->>System: Mark student status as PLACED; enforce Single-Offer Policy
```

---

### 4.2. CRPC Super Admin User Flow (Executive Governance)

```mermaid
flowchart TD
    A([Super Admin Logs In]):::admin --> B[Executive Overview /admin/overview]:::admin
    B --> C{Select Strategic Management Task}
    
    C -->|Placement Policy| D[Policy Editor /admin/policy]:::admin
    D --> D1[Set Single-Offer Enforcement Mode]
    D --> D2[Configure Super-Dream CTC Threshold >= 18 LPA]
    D --> D3[Configure Dream CTC Threshold >= 9 LPA]
    D --> D4[Save Institutional Policy Settings]

    C -->|Department Targets| E[Departments & Batches /admin/departments]:::admin
    E --> E1[Allocate Placement Targets by Dept: CSE, IT, ENTC, MECH, CHEM]
    E --> E2[Assign Department Faculty Coordinators]

    C -->|Access Control| F[User & Role Directory /admin/users]:::admin
    F --> F1[Manage Institutional Roles & Permissions]
    F --> F2[Audit Active Accounts & System Sessions]

    C -->|Institutional Analytics| G[Reports & Analytics /admin/reports]:::admin
    G --> G1[Export NAAC / NIRF Campus Placement Data to CSV]
    G --> G2[Analyze CTC Distribution, Median Package & Placement Ratio]

    C -->|Compliance & Security| H[Audit Logs /admin/audit-log]:::admin
    H --> H1[Inspect Timestamped Immutable System Trail of All Actions]

    classDef admin fill:#FAF5FF,stroke:#7C3AED,stroke-width:2px,color:#4C1D95;
```

---

### 4.3. CRPC Placement Officer User Flow (Operations Hub)

```mermaid
flowchart TD
    A([Placement Officer Logs In]):::officer --> B[Placement Hub Dashboard /officer/dashboard]:::officer
    B --> C{Operational Task}

    C -->|Corporate Partnerships| D[Companies Directory /officer/companies]:::officer
    D --> D1{Audit Company Registration}
    D1 -- Valid PAN/GST/Profile --> D2[Approve Company: VERIFIED]
    D1 -- Suspicious / Non-compliant --> D3[Suspend / Reject with Reason]

    C -->|Recruitment Drives| E[Drive Management /officer/drives]:::officer
    E --> E1[Create New Placement Drive / Schedule Deadlines]
    E --> E2[Configure Eligibility Criteria: CGPA, Allowed Batches, Allowed Branches]
    E --> E3[Transition Status: DRAFT -> PUBLISHED -> REGISTRATION_CLOSED -> COMPLETED]

    C -->|Student Document Audit| F[Document Verification /officer/verification]:::officer
    F --> F1[Cross-verify marksheets with College ERP records]
    F --> F2[Approve / Reject Student Documents with Feedback]

    C -->|Applicant Pipeline| G[Applications Pipeline /officer/applications]:::officer
    G --> G1[Filter Applicants by Drive, CGPA, Branch]
    G --> G2[Batch Move Candidates across Hiring Stages]
    G --> G3[Export Master Student Attendance Rosters to CSV]

    C -->|Interviews & Offers| H[Interview & Offer Coordination]:::officer
    H --> H1[Schedule Interview Slots & Interviewers]
    H --> H2[Audit Issued Offers against Institutional Quotas]

    classDef officer fill:#EFF6FF,stroke:#2563EB,stroke-width:2px,color:#172554;
```

---

### 4.4. Department Placement Coordinator User Flow (Academic Desk)

```mermaid
flowchart TD
    A([Dept Coordinator Logs In]):::coord --> B[Dept Dashboard /coordinator/dashboard]:::coord
    B --> C{Faculty Coordinator Action}

    C -->|Assigned Students| D[Dept Student Directory /coordinator/students]:::coord
    D --> D1[Filter Students of Assigned Branch e.g. CSE]
    D --> D2[Inspect Individual Academic Standing, Active Backlogs, CGPA]

    C -->|Academic Verification| E[Academic Verification /coordinator/verification]:::coord
    E --> E1[View Pending Marksheets for Semester 1 to 6]
    E --> E2[Compare Uploaded Transcript with Department Ledger]
    E2 --> E3{Marksheet Authentic?}
    E3 -- Yes --> E4[Mark Document as VERIFIED with Faculty Signature]
    E3 -- No --> E5[Mark Document as ACTION_REQUIRED with Re-upload Notes]

    C -->|Eligibility Monitoring| F[Eligibility Monitor /coordinator/eligibility]:::coord
    F --> F1[Simulate Eligibility for Upcoming Campus Drives]
    F --> F2[Identify At-Risk Students Failing Cut-offs]

    C -->|Department Analytics| G[Department Reports /coordinator/reports]:::coord
    G --> G1[Track Branch Placement Percentage vs Institution Target]
    G --> G2[Export Branch Placement Statistics for Department Review]

    classDef coord fill:#ECFDF5,stroke:#059669,stroke-width:2px,color:#064E3B;
```

---

### 4.5. Company Recruiter User Flow (Corporate Partner)

```mermaid
flowchart TD
    A([Company Recruiter Logs In]):::company --> B[Recruiter Dashboard /company/dashboard]:::company
    B --> C{Talent Acquisition Activity}

    C -->|Company Profile| D[Company Profile Page /company/profile]:::company
    D --> D1[Update Organization Info, Work Culture, Tier & Office Locations]

    C -->|Post Campus Drives| E[Active Drives /company/drives]:::company
    E --> E1[Create Drive Proposal with Job Description, Roles, CTC & Bonds]
    E --> E2[Set Minimum Cut-offs: Minimum CGPA, 10th/12th %, Permitted Branches]

    C -->|Candidate Pipeline| F[Applicant Pipeline /company/applications]:::company
    F --> F1[Review Verified Student Applications & Tailored Resumes]
    F --> F2[Filter by LeetCode/GitHub Coding Scores & Projects]
    F --> F3[Advance Candidates: APPLIED -> SHORTLISTED -> INTERVIEW_SCHEDULED]

    C -->|Interview Coordination| G[Interview Stages /company/interviews]:::company
    G --> G1[Assign Candidates to Technical Evaluators / Bar-Raisers]
    G --> G2[Review Technical Evaluation Feedback & Recommendation Scores]

    C -->|Offers| H[Issue & Track Offers /company/offers]:::company
    H --> H1[Generate Formal Campus Job Offer with Fixed CTC & Bonus]
    H --> H2[Monitor Acceptance / Decline Status in Real Time]

    classDef company fill:#FFFBEB,stroke:#D97706,stroke-width:2px,color:#78350F;
```

---

### 4.6. Company Technical Interviewer User Flow (Bar-Raiser Workspace)

```mermaid
flowchart TD
    A([Technical Interviewer Logs In]):::company --> B[Assigned Interviews /interviewer/workspace]:::company
    B --> C[View Today's Assigned Candidate Interview Schedule]
    C --> D[Select Candidate: Access Snapshot Resume, Projects, Coding Handles]
    D --> E[Launch Live Evaluation Session]
    E --> F[Conduct Technical Interview: System Design, DSA, Problem Solving]
    F --> G[Fill Standardized Institutional Evaluation Form]
    G --> G1[Score Technical Problem Solving: 1 to 5 Stars]
    G --> G2[Score System Design & Architecture: 1 to 5 Stars]
    G --> G3[Score Communication & Cultural Alignment: 1 to 5 Stars]
    G --> G4[Select Overall Recommendation: STRONG_HIRE / HIRE / LEAN_HIRE / NO_HIRE / STRONG_NO_HIRE]
    G --> G5[Enter Written Justification & Candidate Strengths/Weaknesses]
    G --> H[Submit Evaluation Record to Hiring Pipeline]
    H --> I[Application Automatically Moves to INTERVIEW_COMPLETED]

    classDef company fill:#FFFBEB,stroke:#D97706,stroke-width:2px,color:#78350F;
```

---

## 5. Candidate Application State Machine

Every campus recruitment application transitions through an immutable state machine, recorded in the system audit log with timestamps and actor credentials:

```mermaid
stateDiagram-v2
    [*] --> APPLIED: Student Applies with Resume Snapshot
    APPLIED --> ELIGIBILITY_CONFIRMED: Automated Engine Validates Rules
    ELIGIBILITY_CONFIRMED --> UNDER_REVIEW: Placement Officer / Recruiter Screens
    UNDER_REVIEW --> ASSESSMENT_SCHEDULED: Assessment Invited
    ASSESSMENT_SCHEDULED --> ASSESSMENT_COMPLETED: Student Takes Proctoring Test
    ASSESSMENT_COMPLETED --> SHORTLISTED: Score >= Cut-off
    ASSESSMENT_COMPLETED --> REJECTED: Score < Cut-off
    UNDER_REVIEW --> SHORTLISTED: Direct Shortlisting
    UNDER_REVIEW --> REJECTED: Resume Filtered Out
    SHORTLISTED --> INTERVIEW_SCHEDULED: Round 1 / Technical Booked
    INTERVIEW_SCHEDULED --> INTERVIEW_COMPLETED: Interviewer Submits Rubric
    INTERVIEW_COMPLETED --> OFFERED: Recruiter Extends Offer
    INTERVIEW_COMPLETED --> WAITLISTED: Decision Deferred
    INTERVIEW_COMPLETED --> REJECTED: Candidate Not Recommended
    WAITLISTED --> OFFERED: Waitlist Cleared
    OFFERED --> OFFER_ACCEPTED: Student Accepts Offer
    OFFERED --> OFFER_DECLINED: Student Declines Offer
    APPLIED --> WITHDRAWN: Student Withdraws Application
    OFFER_ACCEPTED --> [*]: Placement Status = PLACED (Policy Locked)
    OFFER_DECLINED --> [*]
    REJECTED --> [*]
    WITHDRAWN --> [*]
```

---

## 6. Summary of Key Architectural Guardrails

1. **Strict Institutional Persona Isolation**:
   - Each role is routed directly to their authorized portal prefix (`/student/*`, `/admin/*`, `/officer/*`, `/coordinator/*`, `/company/*`, `/interviewer/*`).
   - Unauthorized path access triggers automated route redirection to the persona's respective workspace console.
2. **Snapshot Integrity**:
   - When a student applies to a drive, the application creates an immutable copy of their CGPA, resume version, skills, and projects at that exact moment. Subsequent student edits do not alter previous job applications.
3. **Institutional Policy Enforcement**:
   - Single-offer policy and Super-Dream/Dream package thresholds prevent unauthorized multiple offers while encouraging high-tier talent mobility.
4. **Comprehensive Audit Trail**:
   - All state transitions, role switches, document approvals, and evaluations are logged in `cpcp_audit_logs` with timestamps, actor IDs, and target details.
