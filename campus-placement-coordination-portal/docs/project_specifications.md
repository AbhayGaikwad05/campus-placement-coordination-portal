PROJECT NAME: Campus Placement Coordination Portal

PROJECT TYPE: Complete React.js Frontend Web Application

PRIMARY OBJECTIVE:
Build the entire frontend of the Campus Placement Coordination Portal, a modern, elegant, practical, and fully interactive campus placement and recruitment management platform for a college.

IMPORTANT SCOPE RESTRICTION:
This project is FRONTEND ONLY.

Use React.js to build every page, module, dashboard, form, table, workflow, and user interaction.

Do not implement a backend, server, database, or API integration at this stage.

Do not create Express.js routes, Node.js backend services, MongoDB collections, or backend authentication.

Use realistic mock data, JavaScript-based frontend logic, and localStorage where appropriate to make the application functional and demonstrate the complete user experience.

The architecture should remain organized and maintainable so that a backend can be integrated in the future, but backend development is outside the scope of this task.

Do not stop after generating a dashboard, wireframe, or landing page. Build the complete multi-page frontend.

==================================================
1. PRODUCT OVERVIEW
==================================================

Final product name:
Campus Placement Coordination Portal

The application connects three main user groups:

1. Students.
2. The college CRPC / Placement Coordination Office.
3. Recruiting companies.

The system supports the complete campus recruitment lifecycle:

Student registration
→ Student profile and portfolio creation
→ Academic record and document verification
→ Company registration and verification
→ Job-role and placement-drive creation
→ Eligibility evaluation
→ Student applications
→ Mock tests and official MCQ assessments
→ Shortlisting
→ Interview scheduling
→ Interview evaluations
→ Offers and acceptance
→ Placement records
→ Institutional reports and analytics.

The interface must support multiple departments, academic years, batches, and placement seasons within one college.

The application must look and behave like a credible institutional software product, not a basic student assignment or an AI-generated dashboard template.

==================================================
2. FRONTEND TECHNOLOGY
==================================================

Use:

- React.js.
- JavaScript and JSX.
- Vite.
- React Router.
- Custom CSS or CSS Modules.
- Lucide React icons.
- Recharts or another suitable lightweight charting library.
- localStorage for suitable demo persistence.
- Reusable React components and hooks.

Use the existing project structure if a project already exists. Inspect the files before making changes.

If starting from scratch, initialize a Vite React project.

Use ESLint and the existing project linting setup where applicable.

Do not require API keys to run the application.

Do not make the application dependent on paid services.

Do not use Angular.

Do not implement server-side functionality.

Do not connect to a real database.

Do not use Firebase, Supabase, or another hosted backend as a substitute for the requested frontend-only implementation.

Do not send real emails, SMS messages, or notifications through external services.

For demonstration, use frontend services that read and update consistent sample data. Components should not access localStorage directly in every file; centralize that behavior in reusable mock-data services and hooks.

All forms, filters, navigation elements, buttons, modals, and workflows should work using frontend state.

==================================================
3. BRANDING AND VISUAL DESIGN
==================================================

The name displayed throughout the product must be:

Campus Placement Coordination Portal

Use the full name in the login page, navigation branding, browser title, and relevant application headers.

Create a distinctive, original visual identity for the product.

DESIGN DIRECTION:

"Calm institutional precision with a career-focused, editorial design language."

The application should feel:

- Professional.
- Dependable.
- Premium but not flashy.
- Elegant and uncluttered.
- Practical for daily use.
- Designed for students, placement officers, and recruiters.
- Visually consistent across all portals.

Avoid:
- Generic AI-generated SaaS dashboards.
- Excessive gradients and glassmorphism.
- Neon colors and excessive animations.
- Rows of repetitive KPI cards on every page.
- Oversized headings that waste space.
- Unnecessary floating elements.
- Excessively rounded cards everywhere.
- Generic admin templates.
- Fake charts or meaningless statistics.
- Copying existing placement software interfaces.

SUGGESTED COLOR PALETTE:

Warm off-white: #F7F6F2
Deep ink/navy: #182B32
Muted teal: #387A70
Soft sage: #E5EEE8
Restrained amber: #D5A44D
White: #FFFFFF
Secondary text: #697780
Borders: #E1E5E2
Error: #B94C45

These colors are starting points. Define them using centralized CSS variables.

TYPOGRAPHY:
Use a readable modern sans-serif with a clear hierarchy.

Make page titles, section headings, table headers, body text, captions, and metadata visually distinct.

Use tabular numerals where appropriate for percentages, CGPA, compensation, dates, and dashboard statistics.

LAYOUT:
- Desktop-first design.
- Responsive desktop, tablet, and mobile layouts.
- Persistent role-specific sidebar navigation.
- Compact top navigation.
- Breadcrumbs.
- Global search where useful.
- Notification center.
- User profile menu.
- Consistent content spacing.
- Accessible forms.
- Clear empty, loading, and error states.
- Confirmation dialogs for important actions.
- Responsive tables.
- Keyboard navigation and visible focus indicators.

Make each module visually appropriate for its work.

For example:
- Student portfolio: profile header, completion indicator, tabs, and activity timeline.
- Placement management: data-dense tables and useful filters.
- Recruitment drives: guided multi-step forms.
- Assessments: distraction-free testing interface.
- Interview evaluation: focused candidate information and structured scoring form.
- Analytics: charts connected to actual demo records.

The interface must be visually polished without sacrificing usability.

==================================================
4. PRODUCT REFERENCES
==================================================

Where publicly accessible, use the following products as sources of general workflow inspiration:

Superset:
https://joinsuperset.com/

LineupX:
https://www.lineupx.com/placement-management

HYRD:
https://www.hyrd.co.in/

DoLittle Placement Management:
https://dlt.dolittletech.in/placement-management

POD Career Connector:
https://pod.io/career-connector

Look for general ideas involving:
- Placement-drive management.
- Student eligibility.
- Application pipelines.
- Student portfolios.
- Recruiter workflows.
- Interview scheduling.
- Offer management.
- Placement analytics.

Do not blindly reproduce another application's interface.

Do not copy its branding, exact layouts, text, or visual identity.

Create a distinct design adapted to the needs of this particular college placement system.

==================================================
5. USER ROLES AND DEMO ACCESS
==================================================

Create six user roles with independent navigation and role-specific interfaces.

ROLE 1: STUDENT

Students maintain their portfolios, discover placement opportunities, apply for drives, take assessments, attend interviews, and track offers.

ROLE 2: CRPC SUPER ADMIN

The Super Admin manages institutional configuration, roles, permissions, departments, academic batches, and high-level administration.

ROLE 3: CRPC PLACEMENT OFFICER

Placement Officers manage companies, drives, eligibility, applications, assessments, interviews, offers, and placement reports.

ROLE 4: DEPARTMENT COORDINATOR

Department Coordinators view assigned students, verify relevant academic information, assist with document reviews, and monitor departmental placement progress.

ROLE 5: COMPANY RECRUITER / COMPANY ADMINISTRATOR

Company users manage their organization profile, authorized recruiters, recruitment drives, applicants, shortlisting, interview stages, and offers.

ROLE 6: COMPANY INTERVIEWER

Interviewers access their assigned interviews, view authorized candidate information, complete evaluation forms, and submit recommendations.

Create a demo sign-in page with sample accounts for every role.

Provide an obvious development-only account selector or role switcher so the evaluator can explore all portals without repeatedly registering accounts.

Clearly label the experience as a frontend demonstration.

Role-based routes and visibility must be implemented in React. These are demo permissions, not real backend security.

Use shared components where appropriate, but do not show the same dashboard to every role.

==================================================
6. SHARED APPLICATION COMPONENTS
==================================================

Create reusable components for:

- Application shell.
- Sidebar.
- Top navigation.
- Breadcrumbs.
- Page headers.
- Buttons.
- Text inputs.
- Select fields.
- Checkboxes and radio buttons.
- Date and time inputs.
- Form validation.
- Tables.
- Search and filter panels.
- Pagination.
- Status badges.
- Progress indicators.
- Cards.
- Tabs.
- Dropdown menus.
- Confirmation dialogs.
- Modals.
- Drawers.
- Toast notifications.
- Empty states.
- Loading skeletons.
- Chart containers.
- File-selection controls.
- Timeline components.
- Activity lists.
- Profile avatars.
- Error messages.
- Responsive navigation.

Use consistent styles and interaction patterns across the application.

==================================================
7. MODULE A — LOGIN AND ACCOUNT MANAGEMENT
==================================================

Implement:
- Login page.
- Student registration page.
- Forgot-password demonstration.
- Account settings.
- Profile menu.
- Logout.
- Demo account selection.
- Unauthorized-access page.
- Not-found page.

Student registration fields:
- Full name.
- Institutional email.
- Student ID.
- Department.
- Degree/program.
- Academic batch.
- Password and confirmation.
- Required acknowledgement checkbox.

Company registration fields:
- Company name.
- Website.
- Industry.
- Description.
- Recruiter name.
- Contact email.
- Registration status.

CRPC should be able to review company registrations in the frontend demo.

Provide realistic validation, error states, success messages, and navigation after successful demo actions.

Do not implement real authentication or password security. This is a frontend demonstration only.

==================================================
8. MODULE B — STUDENT DASHBOARD
==================================================

Create a personalized student dashboard.

Include:
- Welcome message.
- Student name.
- Department and academic batch.
- Profile-completion percentage.
- Placement status.
- Recommended eligible placement drives.
- Upcoming assessments.
- Upcoming interviews.
- Applications by stage.
- Pending document verification.
- Mock-test performance.
- Recent announcements.
- Recent notifications.
- Offers and deadlines.

Each dashboard section should navigate to its relevant detail page.

Do not overcrowd the dashboard with unnecessary cards.

Prioritize outstanding actions, upcoming deadlines, and useful career information.

==================================================
9. MODULE C — STUDENT PROFILE AND PORTFOLIO
==================================================

Create a complete student portfolio editor.

Profile sections must include:

1. Personal information.
2. Academic information.
3. Semester-wise results.
4. School records, including 10th and 12th results where applicable.
5. CGPA and percentage.
6. Current and historical backlogs when relevant.
7. Technical skills.
8. Projects.
9. Internships and work experience.
10. Certifications.
11. Awards and achievements.
12. Extracurricular activities.
13. Leadership and volunteering.
14. Coding-platform links.
15. Resume versions.
16. Documents.
17. Placement preferences.
18. Recruiter visibility settings.

Implement:
- Edit and save profile details.
- Add, edit, and remove projects.
- Add certifications.
- Add internships.
- Add achievements.
- Update academic records.
- Track profile completeness.
- Preview the recruiter-facing profile.
- Display document verification status.
- Maintain sample profile-edit history.
- Select a resume version for an application.
- Save drafts where appropriate.

DOCUMENTS:

Support demo file selection for resumes, certificates, marksheets, and other relevant documents.

Validate file types and file sizes in the browser.

Show selected-file information and demo verification states.

Do not pretend that documents have been uploaded to a real server.

APPLICATION SNAPSHOTS:

When a student applies to a drive, save a snapshot of the current profile and selected resume in the frontend demo data.

Subsequent profile edits must not alter previously submitted application snapshots.

==================================================
10. MODULE D — CODING PROFILES
==================================================

Allow students to add profiles from:

- LeetCode.
- Codeforces.
- GitHub.
- Other configurable platforms.

Fields:
- Platform.
- Username.
- Profile URL.
- Visibility preference.
- Verification or synchronization status, where relevant.

Implement URL validation and external links.

Any sample metrics must be clearly labelled as demo data.

Do not scrape external websites or claim live synchronization.

The UI should be ready for future integrations, but all functionality must work without external API keys.

==================================================
11. MODULE E — COMPANY DIRECTORY AND VERIFICATION
==================================================

CRPC should have a company-management section.

Company-list columns:
- Company name.
- Industry.
- Website.
- Registration date.
- Verification status.
- Active drives.
- Primary recruiter.
- Last activity.
- Actions.

Provide:
- Search.
- Industry filters.
- Verification-status filters.
- Active/inactive filters.
- Company details.
- Recruiter contacts.
- Company verification history.
- Associated recruitment drives.
- Recruitment outcomes.
- Authorized company notes.
- Approve registration.
- Reject with reason.
- Request additional information.
- Suspend or reactivate a company.

Company status options:
- Pending Verification.
- Verified.
- Rejected.
- Suspended.

All actions must update the mock data and UI.

==================================================
12. MODULE F — JOB ROLES AND PLACEMENT DRIVES
==================================================

Companies and authorized CRPC users should manage job roles and recruitment drives.

Job details:
- Job title.
- Description.
- Required skills.
- Employment type.
- Work location.
- Work mode.
- Compensation/CTC or stipend.
- Eligible departments.
- Eligible degree programs.
- Eligible graduating batches.
- Academic requirements.
- Backlog criteria where applicable.
- Application deadline.
- Number of positions when known.
- Recruitment stages.
- Assessment configuration.
- Documents required.
- Relevant instructions.

Create a multi-step drive creation wizard:

Step 1: Job and company details.
Step 2: Eligibility criteria.
Step 3: Recruitment stages.
Step 4: Dates and application deadline.
Step 5: Review and submit for approval.

Drive statuses:
- Draft.
- Pending Approval.
- Published.
- Paused.
- Closed.
- Cancelled.

Students should be able to:
- Browse drives.
- Search and filter opportunities.
- View drive details.
- Check eligibility.
- Bookmark opportunities.
- Apply.
- View application deadlines.
- See the selection process.
- Track application progress.

Use understandable status indicators and clear primary actions.

==================================================
13. MODULE G — ELIGIBILITY EVALUATION
==================================================

Create a configurable frontend eligibility-rule builder.

Possible criteria:
- Department.
- Degree/program.
- Graduation year.
- CGPA.
- 10th/12th percentage when required.
- Backlogs.
- Required documents.
- Explicitly configured qualifications.

CRPC users should be able to:
- Create criteria.
- Edit criteria.
- Preview candidate eligibility.
- View reasons a student passed or failed each rule.
- Identify unverified academic data.
- Review exception requests.
- Approve or reject permitted exceptions.
- View the configuration version used in a previous evaluation.

For every evaluation, show:
- Overall result.
- Individual rule results.
- Source of the data.
- Verification status.
- Evaluation date.
- Configuration version.
- Exception status.

Implement the evaluation logic in JavaScript using demo records.

Eligibility states:
- Eligible.
- Ineligible.
- Pending Verification.
- Exception Under Review.

PLACEMENT POLICY:

Failing an assessment for one company's recruitment drive must normally prevent progression only in that particular drive.

Do not globally block a student from all other recruitment drives.

If an institutional placement restriction is configured in the demo, show its scope, reason, authorization, and review status.

Do not hard-code blanket restrictions.

==================================================
14. MODULE H — APPLICATION TRACKING
==================================================

Create a complete application-management workflow.

Student application list should include:
- Company.
- Job role.
- Drive.
- Applied date.
- Submitted resume version.
- Eligibility status.
- Current recruitment stage.
- Latest outcome.
- Next event.
- Actions.

Application details should show:
- Application status.
- Eligibility results.
- Submitted-profile snapshot.
- Resume snapshot.
- Recruitment-stage timeline.
- Assessment history.
- Interview history.
- Notifications.
- Offer details when applicable.

Possible application statuses:
- Applied.
- Eligibility Confirmed.
- Under Review.
- Assessment Scheduled.
- Assessment Completed.
- Shortlisted.
- Interview Scheduled.
- Interview Completed.
- Offered.
- Offer Accepted.
- Offer Declined.
- Rejected.
- Waitlisted.
- Withdrawn.
- Closed.

Implement only valid transitions based on each drive's configured stages.

CRPC and company users should have:
- Applicant tables.
- Search and filters.
- Candidate detail pages.
- Bulk shortlisting with confirmation.
- Bulk rejection with confirmation.
- Stage-wise counts.
- Exportable demonstration data.
- Decision reasons when required.

Prevent duplicate applications to the same drive.

Company recruiters must only access candidates relevant to their authorized recruitment activity and permitted profile information.

==================================================
15. MODULE I — MOCK TESTS AND OFFICIAL ASSESSMENTS
==================================================

Implement two separate assessment experiences.

A. PRACTICE TESTS

Topics:
- Quantitative aptitude.
- Logical reasoning.
- Verbal ability.
- Technical MCQs.
- General aptitude.

Features:
- Browse practice tests.
- Start a test.
- Navigate questions.
- Select answers.
- Mark questions for review.
- Show attempted and unattempted questions.
- Display a timer.
- Submit with confirmation.
- Calculate results.
- Show correct answers and explanations.
- Display historical scores.
- Show topic-wise performance.

B. OFFICIAL RECRUITMENT ASSESSMENTS

Authorized CRPC/company users can configure:
- Assessment title.
- Linked placement drive.
- Instructions.
- Duration.
- Questions.
- Marks.
- Negative marking where configured.
- Qualification threshold.
- Attempt limits.
- Assessment schedule.

Implement:
- Question-bank management.
- Candidate assignment.
- Assessment instructions.
- Assessment start screen.
- Actual question-taking interface.
- Navigation between questions.
- Timer.
- Demo answer saving.
- Submission confirmation.
- Result calculation.
- Qualification determination.
- Application-stage update.

Initially support MCQ and aptitude testing.

Coding assessments are a future feature.

Do not display coding execution as implemented.

Do not reveal the correct answers of an active official assessment.

Practice tests and official assessments must have visibly different labels and workflows.

==================================================
16. MODULE J — INTERVIEW MANAGEMENT
==================================================

Implement an interview scheduling and evaluation system.

CRPC/company users should be able to:
- Schedule interviews.
- Select candidates.
- Select recruitment rounds.
- Assign date and time.
- Select interview mode.
- Enter venue or meeting details.
- Assign interviewers.
- Reschedule or cancel.
- Record attendance.
- Track completed evaluations.

Students should see:
- Interview schedule.
- Date and time.
- Location or meeting details.
- Round information.
- Instructions.
- Status.
- Notifications.

Create a dedicated interviewer workspace.

Interviewer capabilities:
- View assigned interviews only.
- View authorized candidate information.
- Access the relevant submitted resume.
- Complete an evaluation form.
- Rate technical knowledge.
- Rate problem-solving.
- Rate communication.
- Rate role fit where configured.
- Add feedback.
- Recommend Strongly Recommend, Recommend, Hold, or Reject.

Statuses should include:
- Scheduled.
- Rescheduled.
- Completed.
- Cancelled.
- No-show.

Actions must update the shared mock data.

==================================================
17. MODULE K — OFFERS AND PLACEMENT RECORDS
==================================================

Build an offer-management interface.

Authorized company users can:
- Record an offer for the correct candidate and application.
- Enter job role and compensation.
- Add offer and joining dates.
- Attach demo offer-letter metadata.
- Issue or withdraw offers according to the workflow.

Students can:
- View offers.
- Review permitted offer details.
- Accept or decline.
- See deadlines.
- Track offer history.

CRPC can:
- Review offers.
- Track acceptance and rejection.
- Record confirmed placement outcomes.
- Review discrepancies.
- Maintain student placement histories.

Offer statuses:
- Draft.
- Issued.
- Accepted.
- Declined.
- Expired.
- Withdrawn.

Keep the offer state separate from the placement outcome.

Use separate metrics for:
- Offers issued.
- Offers accepted.
- Offers declined.
- Confirmed unique students placed.
- Students still seeking placement.

A student with multiple offers must not be counted as multiple unique placed students.

==================================================
18. MODULE L — CRPC ADMINISTRATION
==================================================

Create different experiences for CRPC Super Admins, Placement Officers, and Department Coordinators.

SUPER ADMIN:

- Institution settings.
- Department and batch management.
- User and role management.
- Placement policy settings.
- Permission configuration.
- Company verification oversight.
- Audit-log interface.
- Reports.
- General settings.

PLACEMENT OFFICER:

- Placement dashboard.
- Student directory.
- Document verification.
- Company management.
- Recruitment drives.
- Eligibility management.
- Applications.
- Assessments and question bank.
- Interview coordination.
- Offer management.
- Placement records.
- Announcements.
- Reports.

DEPARTMENT COORDINATOR:

- Department dashboard.
- Assigned student records.
- Academic-document verification.
- Eligibility overview.
- Department placement reports.
- Relevant notifications.

Use separate sidebar menus and permission-aware pages.

Department Coordinators must not automatically receive Super Admin permissions.

==================================================
19. MODULE M — CRPC DASHBOARD AND ANALYTICS
==================================================

Create a well-designed institutional placement dashboard.

Filters:
- Academic year.
- Placement season.
- Department.
- Batch.
- Date range where applicable.

Key metrics:
- Registered students.
- Students eligible for placements.
- Students participating in active drives.
- Confirmed unique students placed.
- Students still seeking placement.
- Active companies.
- Active drives.
- Applications.
- Interviews.
- Offers issued.
- Offers accepted.
- Pending verification tasks.

Charts:
- Placement trend.
- Department-wise outcomes.
- Application-stage conversion.
- Company recruitment activity.
- Offer acceptance trends.
- Compensation distribution where data is available.
- Assessment performance.

Operational lists:
- Pending company approvals.
- Upcoming placement drives.
- Pending document verification.
- Interviews requiring coordination.
- Applications awaiting decisions.
- Recent offers.
- Eligible students who have not applied.
- Recent administrative activities.

Charts should be interactive and drill down into the corresponding records.

Calculate dashboard statistics from the underlying sample data.

Do not hard-code different totals on different pages.

Clearly distinguish demonstration data from real institutional data.

==================================================
20. MODULE N — COMPANY RECRUITER PORTAL
==================================================

Create a company-specific workspace.

Dashboard:
- Active recruitment drives.
- Applications received.
- Candidates awaiting review.
- Shortlisted candidates.
- Upcoming interviews.
- Assessment progress.
- Offers issued.
- Accepted and declined offers.

Navigation:
- Overview.
- Company Profile.
- Recruiter Team.
- Recruitment Drives.
- Create Drive.
- Applications.
- Candidates.
- Shortlists.
- Assessments.
- Interviews.
- Offers.
- Reports.
- Notifications.
- Settings.

Candidate table:
- Student name.
- Student reference/ID.
- Department and batch.
- Authorized academic indicators.
- Relevant skills.
- Eligibility status.
- Application stage.
- Assessment result when released.
- Interview schedule.
- Actions.

Allow candidate filtering and shortlisting.

Recruiters must not be able to:
- Browse unrelated students without permission.
- View other companies' records.
- Change institutional placement policies.
- Alter official academic records.
- Modify assessment scores through unauthorized actions.
- Read CRPC-only notes.

==================================================
21. MODULE O — NOTIFICATIONS AND ANNOUNCEMENTS
==================================================

Build a shared notification center.

Categories:
- New placement drive.
- Application submitted.
- Eligibility updated.
- Assessment scheduled.
- Assessment result.
- Shortlisting result.
- Interview scheduled.
- Interview rescheduled or cancelled.
- Offer issued.
- Offer deadline.
- Document verification result.
- General announcements.

Implement:
- Unread count.
- Mark as read.
- Mark all as read.
- Filter notifications.
- Open notification details.
- Navigate to associated records.
- Persistent demo state.

Authorized CRPC users should be able to create, publish, and archive announcements targeted at relevant departments, batches, or user groups.

Do not send real emails or SMS.

==================================================
22. MODULE P — REPORTS, AUDIT LOG AND SETTINGS
==================================================

REPORTS:

- Placement summary by academic year.
- Department-wise outcomes.
- Company-wise recruitment.
- Application pipeline.
- Assessment performance.
- Interview outcomes.
- Offer acceptance.
- Compensation summaries where permitted.
- Student placement history.
- Pending verification.

Support filtering and CSV export of demo records.

AUDIT LOG:

Display:
- Timestamp.
- Actor.
- Action.
- Target record.
- Relevant status change.
- Reason where applicable.

Example entries:
- Company verified.
- Drive published.
- Eligibility exception approved.
- Assessment submitted.
- Interview rescheduled.
- Offer issued.
- Offer accepted.
- Placement outcome recorded.

Clearly indicate that the audit log is frontend demonstration data. Do not describe it as tamper-proof.

SETTINGS:

- Institution name and branding.
- Departments.
- Academic years and batches.
- Placement rules.
- Document-verification requirements.
- Student profile visibility.
- Assessment defaults.
- Notification preferences.

==================================================
23. DEMONSTRATION DATA
==================================================

Create realistic, consistent, fictional sample data.

Suggested initial volume:
- 20–30 students.
- 6–8 fictional companies.
- 8–12 recruitment drives.
- 30–50 applications.
- Several practice tests and official assessments.
- Sample MCQ questions.
- 10–15 interview records.
- Multiple offers.
- Multiple document-verification states.
- Notifications and activity records.

Use MIT Academy of Engineering as a configurable demo institution name, without fabricating endorsement or an official logo.

Example departments:
- Computer Science and Engineering.
- Information Technology.
- Electronics and Telecommunication Engineering.
- Mechanical Engineering.
- Other configurable departments.

Use realistic:
- Academic batches.
- CGPA values.
- Percentages.
- Compensation in INR/LPA where relevant.
- Application stages.
- Interview schedules.
- Offers and outcomes.

Include varied cases:
- Eligible candidates.
- Ineligible candidates.
- Candidates awaiting verification.
- Students without applications.
- Students in assessment.
- Candidates awaiting interviews.
- Students with multiple offers.
- Accepted and declined offers.
- Companies awaiting verification.
- Drives awaiting approval.

Keep related records consistent.

Use a centralized mock data layer. Persist relevant changes using localStorage.

Provide a clearly labelled Reset Demo Data action to restore the original sample state.

==================================================
24. FUNCTIONALITY REQUIREMENTS
==================================================

All important buttons and controls must work.

Examples:

- Navigation opens the correct page.
- Search filters records.
- Table sorting works.
- Tabs change content.
- Forms validate and save.
- Dialogs open and close.
- Confirmation dialogs precede important actions.
- Toast messages provide feedback.
- Company approval changes the company status.
- Published drives appear in student opportunities.
- Eligibility criteria change the demo evaluation results.
- Applying creates an application.
- Duplicate applications are prevented.
- Starting an assessment opens the question interface.
- Submitting an assessment calculates a result.
- Qualification results update the application stage.
- Scheduling an interview updates the interview list.
- Submitting an evaluation updates the evaluation status.
- Issuing an offer creates an offer record.
- Accepting an offer updates relevant dashboards.
- Notifications open relevant records.
- CSV export downloads the correct demo records.
- Changes persist across page refreshes where appropriate.
- Resetting demo data restores the initial data.

Use shared state and derived calculations.

Avoid duplicated or inconsistent state.

Handle empty states, validation failures, and invalid status transitions.

Never show a successful action when the underlying frontend operation failed.

==================================================
25. ROUTE AND PAGE INVENTORY
==================================================

Implement dedicated routes for all major modules.

PUBLIC AND AUTHENTICATION:
- Sign in.
- Student registration.
- Forgot password.
- Unauthorized access.
- Not found.

STUDENT:
- Dashboard.
- Portfolio.
- Academic Records.
- Skills and Projects.
- Internships and Certifications.
- Achievements.
- Documents.
- Resume Versions.
- Coding Profiles.
- Profile Visibility.
- Opportunities.
- Opportunity Detail.
- My Applications.
- Application Detail.
- Practice Tests.
- Take Test.
- Test Results.
- Interview Schedule.
- Offers.
- Notifications.
- Settings.

CRPC SUPER ADMIN:
- Administrative Overview.
- Institution Settings.
- Departments and Batches.
- Users and Roles.
- Companies and Verification.
- Student Directory.
- Placement Drives.
- Eligibility Policies.
- Question Bank.
- Assessments.
- Applications.
- Interview Coordination.
- Offers and Placements.
- Reports and Analytics.
- Audit Log.
- Notifications.

CRPC PLACEMENT OFFICER:
- Placement Dashboard.
- Companies.
- Student Records.
- Document Verification.
- Placement Drives.
- Eligibility.
- Applications.
- Assessments.
- Interviews.
- Offers.
- Placement Analytics.
- Announcements.

DEPARTMENT COORDINATOR:
- Department Dashboard.
- Assigned Students.
- Document Verification.
- Eligibility Overview.
- Placement Reports.
- Notifications.

COMPANY:
- Dashboard.
- Company Profile.
- Recruiter Team.
- Drives.
- Create/Edit Drive.
- Applications.
- Candidate Details.
- Shortlists.
- Assessments.
- Interviews.
- Offers.
- Reports.
- Notifications.
- Settings.

INTERVIEWER:
- Assigned Interviews.
- Interview Schedule.
- Candidate Details.
- Submit Evaluation.
- Evaluation History.
- Settings.

Share components where useful, but do not make unrelated routes display identical pages.

==================================================
26. RESPONSIVE AND ACCESSIBLE DESIGN
==================================================

Support:
- Desktop.
- Tablet.
- Mobile layouts for essential workflows.
- Keyboard navigation.
- Semantic HTML.
- Accessible labels.
- Appropriate form error messages.
- Visible focus states.
- Good color contrast.
- Status indicators using both color and text.
- Responsive tables.
- Accessible dialogs.
- Logical navigation order.

Do not sacrifice practical usability to achieve a particular screenshot style.

==================================================
27. IMPLEMENTATION ORDER
==================================================

Build the actual application in the available project workspace.

STEP 1:
Inspect the existing project files and structure.

STEP 2:
Create the design system, typography, colors, layouts, navigation and shared components.

STEP 3:
Create the mock data, typed-by-convention JavaScript object structures, mock services, persistence and shared business logic.

STEP 4:
Implement demo sign-in and navigation for all six roles.

STEP 5:
Implement the student dashboard, profile, portfolio, documents and opportunity discovery.

STEP 6:
Implement company management, placement-drive creation, eligibility, and applications.

STEP 7:
Implement practice tests, official MCQ assessments, interviews, evaluations and offers.

STEP 8:
Implement CRPC administration, dashboards, analytics, notifications and reports.

STEP 9:
Test the connected end-to-end recruitment workflow and fix interaction or data inconsistencies.

STEP 10:
Test navigation, forms, filters, status transitions, responsive layouts and persistence.

Do not discard existing working code.

If the entire application cannot be completed in a single generation pass, continue in incremental implementation passes using the existing codebase. Keep a checklist of complete and incomplete pages and features.

Do not silently omit modules.

==================================================
28. FINAL ACCEPTANCE CRITERIA
==================================================

The frontend is complete only when:

1. It runs locally as a React.js application.
2. The product name is consistently "Campus Placement Coordination Portal".
3. All six user roles have working, role-specific experiences.
4. All major modules have implemented pages.
5. Navigation and routes work correctly.
6. Important forms and buttons have functional actions.
7. The student portfolio can be edited.
8. Profile-completion indicators update.
9. Document-verification states are visible.
10. Company registration and verification workflows work.
11. Placement drives can be created and managed.
12. Eligibility evaluation displays understandable reasons.
13. Students can apply to drives.
14. Applications are linked to consistent student and drive records.
15. Assessments allow users to answer questions and submit attempts.
16. Assessment outcomes update application stages.
17. Interviews can be scheduled and evaluated.
18. Offers can be recorded and accepted or declined.
19. Unique placement statistics are calculated correctly.
20. CRPC and company dashboards reflect shared demo data.
21. Search, filters, tables, dialogs and notifications work.
22. Demo changes persist appropriately through page refreshes.
23. The application is responsive and accessible.
24. The code is modular and maintainable.
25. The frontend does not depend on a backend or secret API key.
26. The application does not falsely claim that real external integrations are working.

==================================================
29. FINAL DELIVERABLE
==================================================

Provide the complete working frontend project containing:

- React.js source code.
- Vite configuration.
- Package and dependency configuration.
- CSS design system.
- Role-specific layouts.
- All required page components.
- Shared reusable UI components.
- Mock data and mock services.
- Browser-based demo persistence.
- Working forms, filters, navigation, modals, and workflows.
- Responsive layouts.
- README with installation and startup instructions.
- Demo login instructions for every role.
- A checklist showing implemented features and any genuine limitations.

Do not merely return code snippets in the final response.

Implement the actual files in the available workspace, run the available checks, fix the errors you can verify, and provide the finished project.

The final application must be visually distinctive, practical, elegant, consistent and convincing enough to demonstrate to a college placement office.

Remember: FRONTEND ONLY. React.js only. No backend implementation. No MongoDB. No Express.js.

Begin by inspecting the existing project and implementing the application.