import {
  UserAccount,
  StudentProfile,
  Company,
  PlacementDrive,
  Application,
  Assessment,
  AssessmentAttempt,
  Interview,
  Offer,
  NotificationItem,
  AnnouncementItem,
  AuditLogItem,
  InstitutionSettings
} from '../types';

export const DEMO_USERS: UserAccount[] = [
  {
    id: 'user_student_1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@mitaoe.ac.in',
    role: 'STUDENT',
    department: 'Computer Science and Engineering',
    studentId: 'std_01',
    phone: '+91 98230 44120'
  },
  {
    id: 'user_student_2',
    name: 'Neha Patel',
    email: 'neha.patel@mitaoe.ac.in',
    role: 'STUDENT',
    department: 'Information Technology',
    studentId: 'std_02',
    phone: '+91 98221 55901'
  },
  {
    id: 'user_admin_1',
    name: 'Dr. Vikram Sethi',
    email: 'dean.crpc@mitaoe.ac.in',
    role: 'CRPC_SUPER_ADMIN',
    designation: 'Dean, Corporate Relations & Placement Cell',
    phone: '+91 94220 11880'
  },
  {
    id: 'user_officer_1',
    name: 'Prof. Ananya Iyer',
    email: 'ananya.iyer@mitaoe.ac.in',
    role: 'CRPC_OFFICER',
    designation: 'Lead Placement Officer (Tech & Core)',
    phone: '+91 98224 88310'
  },
  {
    id: 'user_coordinator_1',
    name: 'Prof. Rajesh Kulkarni',
    email: 'rajesh.kulkarni@mitaoe.ac.in',
    role: 'DEPT_COORDINATOR',
    department: 'Computer Science and Engineering',
    designation: 'Associate Professor & CSE Placement Coordinator',
    phone: '+91 98232 99014'
  },
  {
    id: 'user_recruiter_1',
    name: 'Devika Sen',
    email: 'devika.sen@google.com',
    role: 'COMPANY_RECRUITER',
    companyId: 'comp_01',
    companyName: 'Google India',
    designation: 'Staff University Talent Lead - APAC',
    phone: '+91 98110 33490'
  },
  {
    id: 'user_interviewer_1',
    name: 'Siddharth Rao',
    email: 'siddharth.rao@google.com',
    role: 'COMPANY_INTERVIEWER',
    companyId: 'comp_01',
    companyName: 'Google India',
    designation: 'Staff Software Engineer & Technical Bar Raiser',
    phone: '+91 98199 44321'
  }
];

export const INITIAL_INSTITUTION_SETTINGS: InstitutionSettings = {
  institutionName: 'MIT Academy of Engineering',
  institutionCode: 'MITAOE-PUNE',
  placementPolicy: {
    singleOfferPolicy: true,
    superDreamThresholdCtc: 18.0,
    dreamThresholdCtc: 9.0,
    allowMultipleInternships: true,
    maxDrivesAStudentCanApplyTo: 15
  },
  currentAcademicYear: '2025-2026',
  currentPlacementSeason: 'Phase 1 (Campus Drives 2026 Batch)',
  departments: [
    { code: 'CSE', name: 'Computer Science and Engineering', coordinatorName: 'Prof. Rajesh Kulkarni', totalStudents: 180 },
    { code: 'IT', name: 'Information Technology', coordinatorName: 'Prof. Sunita Patil', totalStudents: 120 },
    { code: 'ENTC', name: 'Electronics and Telecommunication Engineering', coordinatorName: 'Prof. Anand Joshi', totalStudents: 120 },
    { code: 'MECH', name: 'Mechanical Engineering', coordinatorName: 'Prof. Milind Shinde', totalStudents: 90 },
    { code: 'CHEM', name: 'Chemical Engineering', coordinatorName: 'Prof. Swati More', totalStudents: 60 }
  ],
  batches: [2026, 2025, 2024]
};

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'comp_01',
    name: 'Google India',
    website: 'https://careers.google.com',
    industry: 'Technology & Cloud Computing',
    description: 'Global leader in search, cloud infrastructure, AI/ML systems, and internet services.',
    headquarters: 'Bengaluru & Hyderabad, India',
    registrationDate: '2025-06-10',
    verificationStatus: 'VERIFIED',
    primaryContactName: 'Devika Sen',
    primaryContactEmail: 'devika.sen@google.com',
    primaryContactPhone: '+91 98110 33490',
    tier: 'TIER_1',
    activeDriveCount: 2,
    totalHires: 6,
    notes: 'Premium partner for Super-Dream drives. High bar on DSA and system design.'
  },
  {
    id: 'comp_02',
    name: 'Microsoft IDC',
    website: 'https://careers.microsoft.com',
    industry: 'Software & Cloud Services',
    description: 'Microsoft India Development Center is one of Microsoft’s largest R&D hubs outside Redmond.',
    headquarters: 'Hyderabad, Telangana',
    registrationDate: '2025-06-15',
    verificationStatus: 'VERIFIED',
    primaryContactName: 'Kunal Verma',
    primaryContactEmail: 'kunal.verma@microsoft.com',
    primaryContactPhone: '+91 98200 44556',
    tier: 'TIER_1',
    activeDriveCount: 1,
    totalHires: 4,
    notes: 'Campus drive approved for Azure Systems and Office365 engineering roles.'
  },
  {
    id: 'comp_03',
    name: 'Tata Consultancy Services',
    website: 'https://www.tcs.com/careers',
    industry: 'IT Services & Consulting',
    description: 'Largest IT solutions provider in India conducting campus drives for Ninja, Digital, and Innovator bands.',
    headquarters: 'Mumbai, Maharashtra',
    registrationDate: '2025-05-20',
    verificationStatus: 'VERIFIED',
    primaryContactName: 'Sunil Deshpande',
    primaryContactEmail: 'sunil.d@tcs.com',
    primaryContactPhone: '+91 98330 11223',
    tier: 'TIER_3',
    activeDriveCount: 1,
    totalHires: 18,
    notes: 'Mass recruiter with differential packages up to 9.5 LPA for TCS Innovator.'
  },
  {
    id: 'comp_04',
    name: 'Bajaj Auto Ltd',
    website: 'https://www.bajajauto.com',
    industry: 'Automotive & Core Engineering',
    description: 'Pioneering automotive manufacturer hiring Graduate Engineer Trainees in EV & Embedded Systems.',
    headquarters: 'Pune, Maharashtra',
    registrationDate: '2025-07-02',
    verificationStatus: 'VERIFIED',
    primaryContactName: 'Gaurav Kulkarni',
    primaryContactEmail: 'gkulkarni@bajajauto.co.in',
    primaryContactPhone: '+91 98220 99887',
    tier: 'TIER_2',
    activeDriveCount: 1,
    totalHires: 8,
    notes: 'Preferred core hiring partner for ENTC and Mechanical branches.'
  },
  {
    id: 'comp_05',
    name: 'ZS Associates',
    website: 'https://www.zs.com',
    industry: 'Management & Decision Analytics Consulting',
    description: 'Management consulting and technology firm focused on transforming healthcare and data analytics.',
    headquarters: 'Pune & Gurugram, India',
    registrationDate: '2025-07-12',
    verificationStatus: 'VERIFIED',
    primaryContactName: 'Pallavi Chawla',
    primaryContactEmail: 'pallavi.chawla@zs.com',
    primaryContactPhone: '+91 98100 77665',
    tier: 'TIER_2',
    activeDriveCount: 1,
    totalHires: 5,
    notes: 'Hiring Decision Analytics Associates and Software Engineers.'
  },
  {
    id: 'comp_06',
    name: 'Rakuten India',
    website: 'https://rakuten.today',
    industry: 'E-commerce & Fintech',
    description: 'Global innovation center driving Rakuten ecosystem across fintech, commerce, and sports tech.',
    headquarters: 'Bengaluru, Karnataka',
    registrationDate: '2025-07-28',
    verificationStatus: 'VERIFIED',
    primaryContactName: 'Aditya Mathur',
    primaryContactEmail: 'aditya.mathur@rakuten.com',
    primaryContactPhone: '+91 98450 12345',
    tier: 'TIER_2',
    activeDriveCount: 1,
    totalHires: 3,
    notes: 'Full stack and backend engineering roles.'
  },
  {
    id: 'comp_07',
    name: 'HyperVerge AI',
    website: 'https://hyperverge.co',
    industry: 'Artificial Intelligence & Vision Systems',
    description: 'Deep-tech AI company providing identity verification and computer vision models.',
    headquarters: 'Bengaluru, Karnataka',
    registrationDate: '2025-09-01',
    verificationStatus: 'PENDING',
    primaryContactName: 'Tanvi Nair',
    primaryContactEmail: 'tanvi.nair@hyperverge.co',
    primaryContactPhone: '+91 98990 66554',
    tier: 'TIER_1',
    activeDriveCount: 0,
    totalHires: 0,
    notes: 'Registration submitted. Requires CRPC verification of PAN, GSTIN, and campus contract.'
  }
];

export const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 'std_01',
    studentId: 'MIT2022CS042',
    userId: 'user_student_1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@mitaoe.ac.in',
    personalEmail: 'aarav.sharma.dev@gmail.com',
    phone: '+91 98230 44120',
    alternatePhone: '+91 98230 44129',
    gender: 'MALE',
    dateOfBirth: '2004-05-14',
    bloodGroup: 'B+',
    category: 'General (Open)',
    nationality: 'Indian',
    currentAddress: 'Room 214, MITAOE Boys Hostel, Alandi Road',
    permanentAddress: 'Flat 402, Royal Palms, Baner Road',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '412105',
    department: 'Computer Science and Engineering',
    degree: 'B.Tech',
    graduationBatch: 2026,
    cgpa: 8.85,
    tenthPercentage: 92.4,
    tenthBoard: 'CBSE',
    twelfthPercentage: 89.2,
    twelfthBoard: 'Maharashtra State Board',
    activeBacklogs: 0,
    historicalBacklogs: 0,
    isDocumentVerified: true,
    placementStatus: 'SEEKING',
    semesters: [
      { semester: 1, sgpa: 8.6, creditsEarned: 22, marksheetDocName: 'Sem1_Marksheet.pdf', verificationStatus: 'VERIFIED' },
      { semester: 2, sgpa: 8.9, creditsEarned: 22, marksheetDocName: 'Sem2_Marksheet.pdf', verificationStatus: 'VERIFIED' },
      { semester: 3, sgpa: 8.7, creditsEarned: 24, marksheetDocName: 'Sem3_Marksheet.pdf', verificationStatus: 'VERIFIED' },
      { semester: 4, sgpa: 9.1, creditsEarned: 24, marksheetDocName: 'Sem4_Marksheet.pdf', verificationStatus: 'VERIFIED' },
      { semester: 5, sgpa: 8.9, creditsEarned: 22, marksheetDocName: 'Sem5_Marksheet.pdf', verificationStatus: 'VERIFIED' },
      { semester: 6, sgpa: 8.9, creditsEarned: 22, marksheetDocName: 'Sem6_Marksheet.pdf', verificationStatus: 'VERIFIED' }
    ],
    skills: ['TypeScript', 'React.js', 'Node.js', 'Python', 'Data Structures & Algorithms', 'PostgreSQL', 'Docker', 'System Design'],
    projects: [
      {
        id: 'proj_01',
        title: 'Distributed Log Aggregation Pipeline',
        technologies: ['Go', 'Kafka', 'Redis', 'Docker'],
        description: 'Engineered a high-throughput event streamer processing 15,000 logs/sec with fault-tolerant persistent checkpoints.',
        repoUrl: 'https://github.com/aaravsharma/distributed-logger',
        startDate: '2024-08-01',
        endDate: '2024-11-15'
      },
      {
        id: 'proj_02',
        title: 'Campus Transit Realtime Tracker',
        technologies: ['React.js', 'Leaflet', 'WebSocket', 'Node.js'],
        description: 'Built progressive web app for campus shuttle GPS visualization utilized by 2,000+ daily commuter students.',
        repoUrl: 'https://github.com/aaravsharma/campus-transit',
        startDate: '2024-01-10',
        endDate: '2024-04-20'
      }
    ],
    internships: [
      {
        id: 'intern_01',
        company: 'Persistent Systems',
        role: 'Software Engineering Intern',
        location: 'Pune (Hinjawadi)',
        duration: 'June 2024 - July 2024 (2 months)',
        description: 'Optimized internal GraphQL API latency by 34% by refactoring N+1 relational query patterns.'
      }
    ],
    certifications: [
      {
        id: 'cert_01',
        name: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        issueDate: '2024-03-12',
        credentialId: 'AWS-CCP-987410'
      }
    ],
    achievements: [
      {
        id: 'ach_01',
        title: 'Winner - Smart India Hackathon (Internal Round)',
        organization: 'Ministry of Education & MITAOE',
        year: 2024,
        description: 'Built decentralized digital credential verification protocol for university transcripts.'
      }
    ],
    codingProfiles: [
      {
        platform: 'LeetCode',
        username: 'aarav_sharma',
        profileUrl: 'https://leetcode.com/aarav_sharma',
        solvedCount: 520,
        rating: '1892 (Knight)',
        isVerifiedDemo: true
      },
      {
        platform: 'GitHub',
        username: 'aaravsharma',
        profileUrl: 'https://github.com/aaravsharma',
        solvedCount: 84,
        isVerifiedDemo: true
      },
      {
        platform: 'Codeforces',
        username: 'aarav_codes',
        profileUrl: 'https://codeforces.com/profile/aarav_codes',
        rating: '1480 (Specialist)',
        isVerifiedDemo: true
      }
    ],
    resumes: [
      {
        id: 'res_01',
        title: 'Aarav_Sharma_SDE_Resume_v2.pdf',
        fileName: 'Aarav_Sharma_SDE_Resume_v2.pdf',
        uploadedAt: '2025-08-10',
        isDefault: true,
        targetRole: 'Full Stack / Backend Engineer'
      },
      {
        id: 'res_02',
        title: 'Aarav_Sharma_Systems_Resume.pdf',
        fileName: 'Aarav_Sharma_Systems_Resume.pdf',
        uploadedAt: '2025-07-15',
        isDefault: false,
        targetRole: 'Systems & Cloud Infrastructure'
      }
    ],
    documents: [
      {
        id: 'doc_01',
        name: 'Class 10th Marksheet (Verified)',
        type: 'MARKSHEET',
        fileName: 'Aarav_10th_CBSE_Certificate.pdf',
        fileSizeKb: 640,
        uploadedAt: '2025-06-12',
        verificationStatus: 'VERIFIED',
        verifiedBy: 'Prof. Rajesh Kulkarni',
        verifiedAt: '2025-06-15'
      },
      {
        id: 'doc_02',
        name: 'Class 12th Marksheet (Verified)',
        type: 'MARKSHEET',
        fileName: 'Aarav_12th_HSC_Certificate.pdf',
        fileSizeKb: 580,
        uploadedAt: '2025-06-12',
        verificationStatus: 'VERIFIED',
        verifiedBy: 'Prof. Rajesh Kulkarni',
        verifiedAt: '2025-06-15'
      },
      {
        id: 'doc_03',
        name: 'Degree Transcript up to Semester 6',
        type: 'MARKSHEET',
        fileName: 'Aarav_Sem1_to_Sem6_Consolidated.pdf',
        fileSizeKb: 1420,
        uploadedAt: '2025-07-01',
        verificationStatus: 'VERIFIED',
        verifiedBy: 'Prof. Rajesh Kulkarni',
        verifiedAt: '2025-07-03'
      }
    ],
    preferences: {
      preferredRoles: ['Software Development Engineer', 'Full Stack Developer', 'Cloud Engineer'],
      preferredLocations: ['Pune', 'Bengaluru', 'Hyderabad'],
      expectedCtcMin: 12.0
    },
    visibilitySettings: {
      visibleToAllRecruiters: true,
      showPhoneToRecruiters: true,
      showAcademicPercentages: true
    },
    bookmarkedDriveIds: ['drive_01', 'drive_02', 'drive_06']
  },
  {
    id: 'std_02',
    studentId: 'MIT2022IT018',
    userId: 'user_student_2',
    name: 'Neha Patel',
    email: 'neha.patel@mitaoe.ac.in',
    personalEmail: 'neha.patel22@gmail.com',
    phone: '+91 98221 55901',
    alternatePhone: '+91 98221 55908',
    gender: 'FEMALE',
    dateOfBirth: '2004-08-22',
    bloodGroup: 'O+',
    category: 'General (Open)',
    nationality: 'Indian',
    currentAddress: 'Flat 101, Silver Crest, Viman Nagar',
    permanentAddress: 'B-12, Krishna Tower, Anand Nagar',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411014',
    department: 'Information Technology',
    degree: 'B.Tech',
    graduationBatch: 2026,
    cgpa: 9.20,
    tenthPercentage: 94.6,
    tenthBoard: 'ICSE',
    twelfthPercentage: 92.0,
    twelfthBoard: 'CBSE',
    activeBacklogs: 0,
    historicalBacklogs: 0,
    isDocumentVerified: true,
    placementStatus: 'PLACED',
    semesters: [
      { semester: 1, sgpa: 9.0, creditsEarned: 22, marksheetDocName: 'Sem1_IT.pdf', verificationStatus: 'VERIFIED' },
      { semester: 2, sgpa: 9.2, creditsEarned: 22, marksheetDocName: 'Sem2_IT.pdf', verificationStatus: 'VERIFIED' },
      { semester: 3, sgpa: 9.1, creditsEarned: 24, marksheetDocName: 'Sem3_IT.pdf', verificationStatus: 'VERIFIED' },
      { semester: 4, sgpa: 9.3, creditsEarned: 24, marksheetDocName: 'Sem4_IT.pdf', verificationStatus: 'VERIFIED' },
      { semester: 5, sgpa: 9.2, creditsEarned: 22, marksheetDocName: 'Sem5_IT.pdf', verificationStatus: 'VERIFIED' },
      { semester: 6, sgpa: 9.4, creditsEarned: 22, marksheetDocName: 'Sem6_IT.pdf', verificationStatus: 'VERIFIED' }
    ],
    skills: ['Java', 'Spring Boot', 'Microservices', 'Kubernetes', 'Algorithms', 'AWS', 'React.js'],
    projects: [
      {
        id: 'proj_03',
        title: 'Microservices E-Commerce Core',
        technologies: ['Java 21', 'Spring Cloud', 'Kafka', 'PostgreSQL'],
        description: 'Implemented saga pattern for distributed transactions across payments, inventory, and order fulfillment services.',
        repoUrl: 'https://github.com/nehapatel/ecommerce-microservices',
        startDate: '2024-02-01',
        endDate: '2024-06-01'
      }
    ],
    internships: [
      {
        id: 'intern_02',
        company: 'Microsoft IDC',
        role: 'Explore Intern (Engineering)',
        location: 'Hyderabad',
        duration: 'May 2024 - July 2024 (2 months)',
        description: 'Engineered automated telemetry monitoring script for Azure Synapse query execution pipelines.'
      }
    ],
    certifications: [
      {
        id: 'cert_02',
        name: 'Oracle Certified Professional: Java SE 17 Developer',
        issuer: 'Oracle Corporation',
        issueDate: '2024-04-18',
        credentialId: 'OCP-JAVA-88129'
      }
    ],
    achievements: [
      {
        id: 'ach_02',
        title: 'Department Rank 1 - Academic Excellence Award',
        organization: 'MIT Academy of Engineering',
        year: 2024,
        description: 'Consistently achieved highest SGPA across all 6 semesters in the IT department.'
      }
    ],
    codingProfiles: [
      {
        platform: 'LeetCode',
        username: 'neha_patel',
        profileUrl: 'https://leetcode.com/neha_patel',
        solvedCount: 610,
        rating: '1945 (Knight)',
        isVerifiedDemo: true
      },
      {
        platform: 'GitHub',
        username: 'nehapatel',
        profileUrl: 'https://github.com/nehapatel',
        solvedCount: 110,
        isVerifiedDemo: true
      }
    ],
    resumes: [
      {
        id: 'res_03',
        title: 'Neha_Patel_SDE_2026.pdf',
        fileName: 'Neha_Patel_SDE_2026.pdf',
        uploadedAt: '2025-07-20',
        isDefault: true,
        targetRole: 'Software Engineer - Backend & Cloud'
      }
    ],
    documents: [
      {
        id: 'doc_04',
        name: 'Class 10th ICSE Marksheet',
        type: 'MARKSHEET',
        fileName: 'Neha_10th.pdf',
        fileSizeKb: 720,
        uploadedAt: '2025-06-10',
        verificationStatus: 'VERIFIED',
        verifiedBy: 'Prof. Sunita Patil',
        verifiedAt: '2025-06-12'
      },
      {
        id: 'doc_05',
        name: 'Class 12th CBSE Marksheet',
        type: 'MARKSHEET',
        fileName: 'Neha_12th.pdf',
        fileSizeKb: 680,
        uploadedAt: '2025-06-10',
        verificationStatus: 'VERIFIED',
        verifiedBy: 'Prof. Sunita Patil',
        verifiedAt: '2025-06-12'
      }
    ],
    preferences: {
      preferredRoles: ['Backend Engineer', 'Systems Engineer'],
      preferredLocations: ['Hyderabad', 'Bengaluru', 'Pune'],
      expectedCtcMin: 18.0
    },
    visibilitySettings: {
      visibleToAllRecruiters: true,
      showPhoneToRecruiters: true,
      showAcademicPercentages: true
    },
    bookmarkedDriveIds: ['drive_02']
  },
  {
    id: 'std_03',
    studentId: 'MIT2022ET009',
    userId: 'user_student_3',
    name: 'Rohan Deshmukh',
    email: 'rohan.deshmukh@mitaoe.ac.in',
    phone: '+91 98223 11099',
    gender: 'MALE',
    dateOfBirth: '2004-02-19',
    department: 'Electronics and Telecommunication Engineering',
    degree: 'B.Tech',
    graduationBatch: 2026,
    cgpa: 7.90,
    tenthPercentage: 86.5,
    tenthBoard: 'State Board',
    twelfthPercentage: 83.2,
    twelfthBoard: 'State Board',
    activeBacklogs: 0,
    historicalBacklogs: 1,
    isDocumentVerified: true,
    placementStatus: 'SEEKING',
    semesters: [
      { semester: 1, sgpa: 7.4, creditsEarned: 22, marksheetDocName: 'Sem1_ET.pdf', verificationStatus: 'VERIFIED' },
      { semester: 2, sgpa: 7.8, creditsEarned: 22, marksheetDocName: 'Sem2_ET.pdf', verificationStatus: 'VERIFIED' },
      { semester: 3, sgpa: 7.9, creditsEarned: 24, marksheetDocName: 'Sem3_ET.pdf', verificationStatus: 'VERIFIED' },
      { semester: 4, sgpa: 8.1, creditsEarned: 24, marksheetDocName: 'Sem4_ET.pdf', verificationStatus: 'VERIFIED' },
      { semester: 5, sgpa: 8.0, creditsEarned: 22, marksheetDocName: 'Sem5_ET.pdf', verificationStatus: 'VERIFIED' },
      { semester: 6, sgpa: 8.2, creditsEarned: 22, marksheetDocName: 'Sem6_ET.pdf', verificationStatus: 'VERIFIED' }
    ],
    skills: ['Embedded C', 'C++', 'ARM Cortex-M', 'RTOS', 'CAN Bus', 'MATLAB', 'Python', 'IoT'],
    projects: [
      {
        id: 'proj_04',
        title: 'Battery Management System Telemetry Node',
        technologies: ['STM32', 'FreeRTOS', 'CAN', 'KiCad'],
        description: 'Engineered hardware telemetry firmware monitoring 16-cell Li-ion pack voltage and cell balancing.',
        repoUrl: 'https://github.com/rohand/bms-can-node',
        startDate: '2024-03-01',
        endDate: '2024-07-01'
      }
    ],
    internships: [
      {
        id: 'intern_03',
        company: 'KPIT Technologies',
        role: 'Embedded Software Intern',
        location: 'Pune',
        duration: 'June 2024 - July 2024',
        description: 'Implemented AUTOSAR CAN stack diagnostics module on Infineon TriCore simulator.'
      }
    ],
    certifications: [],
    achievements: [],
    codingProfiles: [
      {
        platform: 'GitHub',
        username: 'rohandeshmukh',
        profileUrl: 'https://github.com/rohandeshmukh',
        solvedCount: 35,
        isVerifiedDemo: true
      }
    ],
    resumes: [
      {
        id: 'res_04',
        title: 'Rohan_Deshmukh_Embedded_Resume.pdf',
        fileName: 'Rohan_Deshmukh_Embedded_Resume.pdf',
        uploadedAt: '2025-08-01',
        isDefault: true,
        targetRole: 'Embedded Systems Engineer'
      }
    ],
    documents: [
      {
        id: 'doc_06',
        name: 'Class 10th State Board Marksheet',
        type: 'MARKSHEET',
        fileName: 'Rohan_10th.pdf',
        fileSizeKb: 512,
        uploadedAt: '2025-06-15',
        verificationStatus: 'VERIFIED',
        verifiedBy: 'Prof. Anand Joshi',
        verifiedAt: '2025-06-18'
      }
    ],
    preferences: {
      preferredRoles: ['Embedded Systems Engineer', 'Automotive Firmware Developer', 'IoT Solutions Engineer'],
      preferredLocations: ['Pune', 'Bengaluru'],
      expectedCtcMin: 7.5
    },
    visibilitySettings: {
      visibleToAllRecruiters: true,
      showPhoneToRecruiters: true,
      showAcademicPercentages: true
    },
    bookmarkedDriveIds: ['drive_04']
  },
  {
    id: 'std_04',
    studentId: 'MIT2022ME025',
    userId: 'user_student_4',
    name: 'Siddhesh Shinde',
    email: 'siddhesh.shinde@mitaoe.ac.in',
    phone: '+91 98227 66543',
    gender: 'MALE',
    dateOfBirth: '2004-11-04',
    department: 'Mechanical Engineering',
    degree: 'B.Tech',
    graduationBatch: 2026,
    cgpa: 7.45,
    tenthPercentage: 81.0,
    tenthBoard: 'State Board',
    twelfthPercentage: 78.5,
    twelfthBoard: 'State Board',
    activeBacklogs: 0,
    historicalBacklogs: 0,
    isDocumentVerified: true,
    placementStatus: 'SEEKING',
    semesters: [
      { semester: 1, sgpa: 7.2, creditsEarned: 22, verificationStatus: 'VERIFIED' },
      { semester: 2, sgpa: 7.5, creditsEarned: 22, verificationStatus: 'VERIFIED' },
      { semester: 3, sgpa: 7.3, creditsEarned: 24, verificationStatus: 'VERIFIED' },
      { semester: 4, sgpa: 7.6, creditsEarned: 24, verificationStatus: 'VERIFIED' },
      { semester: 5, sgpa: 7.4, creditsEarned: 22, verificationStatus: 'VERIFIED' },
      { semester: 6, sgpa: 7.7, creditsEarned: 22, verificationStatus: 'VERIFIED' }
    ],
    skills: ['SolidWorks', 'ANSYS Mechanical', 'GD&T', 'AutoCAD', 'Python for FEA', 'Manufacturing Operations'],
    projects: [
      {
        id: 'proj_05',
        title: 'Formula Student Chassis Structural Optimization',
        technologies: ['SolidWorks', 'ANSYS FEA', 'Chromoly Steel'],
        description: 'Reduced chassis weight by 14% while retaining torsional rigidity meeting FSAE 2024 compliance rules.',
        startDate: '2023-09-01',
        endDate: '2024-03-01'
      }
    ],
    internships: [],
    certifications: [
      {
        id: 'cert_03',
        name: 'Certified SolidWorks Associate (CSWA)',
        issuer: 'Dassault Systèmes',
        issueDate: '2024-01-10',
        credentialId: 'C-L89K4PZ'
      }
    ],
    achievements: [],
    codingProfiles: [],
    resumes: [
      {
        id: 'res_05',
        title: 'Siddhesh_Shinde_Design_Resume.pdf',
        fileName: 'Siddhesh_Shinde_Design_Resume.pdf',
        uploadedAt: '2025-07-25',
        isDefault: true,
        targetRole: 'Graduate Engineer Trainee - Design & R&D'
      }
    ],
    documents: [],
    preferences: {
      preferredRoles: ['GET Mechanical', 'Design Engineer', 'Quality & Manufacturing Engineer'],
      preferredLocations: ['Pune', 'Chakan', 'Chennai'],
      expectedCtcMin: 6.5
    },
    visibilitySettings: {
      visibleToAllRecruiters: true,
      showPhoneToRecruiters: true,
      showAcademicPercentages: true
    },
    bookmarkedDriveIds: ['drive_04']
  },
  {
    id: 'std_05',
    studentId: 'MIT2022CS102',
    userId: 'user_student_5',
    name: 'Priya Kadam',
    email: 'priya.kadam@mitaoe.ac.in',
    phone: '+91 98229 33211',
    gender: 'FEMALE',
    dateOfBirth: '2004-03-30',
    department: 'Computer Science and Engineering',
    degree: 'B.Tech',
    graduationBatch: 2026,
    cgpa: 6.80,
    tenthPercentage: 76.0,
    tenthBoard: 'State Board',
    twelfthPercentage: 72.0,
    twelfthBoard: 'State Board',
    activeBacklogs: 1, // Has 1 active backlog! Good test case for eligibility failure
    historicalBacklogs: 2,
    isDocumentVerified: false, // Pending verification test case
    placementStatus: 'SEEKING',
    semesters: [
      { semester: 1, sgpa: 6.4, creditsEarned: 22, verificationStatus: 'PENDING' },
      { semester: 2, sgpa: 6.8, creditsEarned: 22, verificationStatus: 'PENDING' },
      { semester: 3, sgpa: 6.7, creditsEarned: 24, verificationStatus: 'PENDING' },
      { semester: 4, sgpa: 6.9, creditsEarned: 24, verificationStatus: 'PENDING' },
      { semester: 5, sgpa: 6.5, creditsEarned: 22, verificationStatus: 'PENDING' },
      { semester: 6, sgpa: 7.1, creditsEarned: 18, verificationStatus: 'ACTION_REQUIRED' }
    ],
    skills: ['JavaScript', 'HTML/CSS', 'MySQL', 'Java Fundamentals'],
    projects: [],
    internships: [],
    certifications: [],
    achievements: [],
    codingProfiles: [],
    resumes: [
      {
        id: 'res_06',
        title: 'Priya_Kadam_Resume.pdf',
        fileName: 'Priya_Kadam_Resume.pdf',
        uploadedAt: '2025-08-05',
        isDefault: true
      }
    ],
    documents: [
      {
        id: 'doc_07',
        name: 'Sem 6 Marksheet (Grade card unclear)',
        type: 'MARKSHEET',
        fileName: 'Sem6_Scanned.pdf',
        fileSizeKb: 410,
        uploadedAt: '2025-08-05',
        verificationStatus: 'ACTION_REQUIRED',
        verificationComment: 'Marksheet scan is blurry; please re-upload clear college copy with visible COE stamp.'
      }
    ],
    preferences: {
      preferredRoles: ['Software Tester', 'Associate Software Engineer'],
      preferredLocations: ['Pune'],
      expectedCtcMin: 4.5
    },
    visibilitySettings: {
      visibleToAllRecruiters: true,
      showPhoneToRecruiters: false,
      showAcademicPercentages: true
    },
    bookmarkedDriveIds: ['drive_03']
  },
  {
    id: 'std_06',
    studentId: 'MIT2022IT044',
    userId: 'user_student_6',
    name: 'Tanmay Joshi',
    email: 'tanmay.joshi@mitaoe.ac.in',
    phone: '+91 98226 77412',
    gender: 'MALE',
    dateOfBirth: '2004-09-12',
    department: 'Information Technology',
    degree: 'B.Tech',
    graduationBatch: 2026,
    cgpa: 8.42,
    tenthPercentage: 88.0,
    tenthBoard: 'CBSE',
    twelfthPercentage: 85.0,
    twelfthBoard: 'CBSE',
    activeBacklogs: 0,
    historicalBacklogs: 0,
    isDocumentVerified: true,
    placementStatus: 'SEEKING',
    semesters: [
      { semester: 1, sgpa: 8.2, creditsEarned: 22, verificationStatus: 'VERIFIED' },
      { semester: 2, sgpa: 8.4, creditsEarned: 22, verificationStatus: 'VERIFIED' },
      { semester: 3, sgpa: 8.5, creditsEarned: 24, verificationStatus: 'VERIFIED' },
      { semester: 4, sgpa: 8.3, creditsEarned: 24, verificationStatus: 'VERIFIED' },
      { semester: 5, sgpa: 8.6, creditsEarned: 22, verificationStatus: 'VERIFIED' },
      { semester: 6, sgpa: 8.5, creditsEarned: 22, verificationStatus: 'VERIFIED' }
    ],
    skills: ['Python', 'Data Analytics', 'Pandas', 'SQL', 'Tableau', 'Scikit-Learn', 'Statistics'],
    projects: [
      {
        id: 'proj_06',
        title: 'Hospital Readmission Predictive Classifier',
        technologies: ['Python', 'XGBoost', 'SHAP', 'Streamlit'],
        description: 'Trained model on 70,000 anonymized clinical encounters reaching 0.82 AUC with model explainability.',
        repoUrl: 'https://github.com/tanmayj/readmission-ml',
        startDate: '2024-04-01',
        endDate: '2024-07-01'
      }
    ],
    internships: [],
    certifications: [],
    achievements: [],
    codingProfiles: [
      {
        platform: 'LeetCode',
        username: 'tanmay_j',
        profileUrl: 'https://leetcode.com/tanmay_j',
        solvedCount: 280,
        rating: '1620',
        isVerifiedDemo: true
      }
    ],
    resumes: [
      {
        id: 'res_07',
        title: 'Tanmay_Joshi_Analytics_Resume.pdf',
        fileName: 'Tanmay_Joshi_Analytics_Resume.pdf',
        uploadedAt: '2025-07-28',
        isDefault: true,
        targetRole: 'Data Analyst / Associate Consultant'
      }
    ],
    documents: [],
    preferences: {
      preferredRoles: ['Data Analyst', 'Decision Analytics Associate', 'Business Intelligence Analyst'],
      preferredLocations: ['Pune', 'Gurugram', 'Bengaluru'],
      expectedCtcMin: 8.5
    },
    visibilitySettings: {
      visibleToAllRecruiters: true,
      showPhoneToRecruiters: true,
      showAcademicPercentages: true
    },
    bookmarkedDriveIds: ['drive_05']
  }
];

export const INITIAL_DRIVES: PlacementDrive[] = [
  {
    id: 'drive_01',
    companyId: 'comp_01',
    companyName: 'Google India',
    jobTitle: 'Software Engineer - University Graduate (2026)',
    description: 'Join Google’s world-class engineering team building scalable systems, cloud infrastructure, AI-first consumer applications, and high-performance developer tools.',
    jobRoleCategory: 'Software Development',
    employmentType: 'FULL_TIME',
    workLocation: 'Bengaluru / Hyderabad',
    workMode: 'HYBRID',
    ctcLpa: 32.0,
    positionsCount: 8,
    requiredSkills: ['Data Structures', 'Algorithms', 'C++ / Java / Python / Go', 'System Design Basics', 'Problem Solving'],
    eligibility: {
      minCgpa: 8.0,
      minTenthPercentage: 75.0,
      minTwelfthPercentage: 75.0,
      maxActiveBacklogs: 0,
      maxHistoricalBacklogs: 0,
      allowedDepartments: ['Computer Science and Engineering', 'Information Technology', 'Electronics and Telecommunication Engineering'],
      allowedDegrees: ['B.Tech'],
      allowedBatches: [2026],
      requireVerifiedDocuments: true
    },
    stages: [
      { id: 'stg_01', order: 1, name: 'Online Technical Assessment (MCQ & Logic)', type: 'ONLINE_TEST', description: '90-min test on DSA, OS, and Quantitative Aptitude' },
      { id: 'stg_02', order: 2, name: 'Technical Interview Round 1 (Data Structures)', type: 'TECHNICAL_INTERVIEW', description: '45-min live whiteboard coding and algorithmic problem solving' },
      { id: 'stg_03', order: 3, name: 'Technical Interview Round 2 (Systems & Projects)', type: 'TECHNICAL_INTERVIEW', description: '45-min system architecture and core CS concepts' },
      { id: 'stg_04', order: 4, name: 'Googliness & Leadership Fit', type: 'HR_INTERVIEW', description: '30-min behavioral alignment with Google leadership principles' }
    ],
    applicationDeadline: '2026-11-15T23:59:59',
    driveDate: '2026-11-20',
    status: 'PUBLISHED',
    createdAt: '2026-10-15',
    linkedAssessmentId: 'assess_official_01'
  },
  {
    id: 'drive_02',
    companyId: 'comp_02',
    companyName: 'Microsoft IDC',
    jobTitle: 'Software Development Engineer - Azure & Developer Division',
    description: 'Microsoft India Development Center seeks passionate engineers to solve massive distributed cloud scale challenges on Azure, Teams, and Copilot platforms.',
    jobRoleCategory: 'Software Development',
    employmentType: 'FULL_TIME',
    workLocation: 'Hyderabad',
    workMode: 'HYBRID',
    ctcLpa: 28.5,
    positionsCount: 6,
    requiredSkills: ['C# / Java / C++', 'Object Oriented Design', 'Distributed Systems', 'Data Structures', 'Git'],
    eligibility: {
      minCgpa: 7.8,
      minTenthPercentage: 70.0,
      minTwelfthPercentage: 70.0,
      maxActiveBacklogs: 0,
      allowedDepartments: ['Computer Science and Engineering', 'Information Technology'],
      allowedDegrees: ['B.Tech'],
      allowedBatches: [2026],
      requireVerifiedDocuments: true
    },
    stages: [
      { id: 'stg_05', order: 1, name: 'Online Cognitive & Technical Assessment', type: 'ONLINE_TEST' },
      { id: 'stg_06', order: 2, name: 'Technical Interview Round 1', type: 'TECHNICAL_INTERVIEW' },
      { id: 'stg_07', order: 3, name: 'Final Technical & Director Round', type: 'TECHNICAL_INTERVIEW' }
    ],
    applicationDeadline: '2026-11-18T23:59:59',
    driveDate: '2026-11-24',
    status: 'PUBLISHED',
    createdAt: '2026-10-18',
    linkedAssessmentId: 'assess_official_02'
  },
  {
    id: 'drive_03',
    companyId: 'comp_03',
    companyName: 'Tata Consultancy Services',
    jobTitle: 'TCS Digital & Innovator Graduate Engineers',
    description: 'Specialized high-impact digital transformation roles building enterprise cloud migrations, cybersecurity architectures, and modern full-stack web solutions.',
    jobRoleCategory: 'Software Development',
    employmentType: 'FULL_TIME',
    workLocation: 'Pune / Mumbai / Across India',
    workMode: 'IN_OFFICE',
    ctcLpa: 9.2,
    positionsCount: 40,
    requiredSkills: ['Java / Python', 'DBMS', 'Web Development', 'Computer Networks', 'Aptitude'],
    eligibility: {
      minCgpa: 6.5,
      minTenthPercentage: 60.0,
      minTwelfthPercentage: 60.0,
      maxActiveBacklogs: 0,
      maxHistoricalBacklogs: 1,
      allowedDepartments: ['Computer Science and Engineering', 'Information Technology', 'Electronics and Telecommunication Engineering', 'Mechanical Engineering'],
      allowedDegrees: ['B.Tech'],
      allowedBatches: [2026],
      requireVerifiedDocuments: false
    },
    stages: [
      { id: 'stg_08', order: 1, name: 'TCS National Qualifier Aptitude & Advanced Test', type: 'ONLINE_TEST' },
      { id: 'stg_09', order: 2, name: 'Technical & Managerial Discussion', type: 'TECHNICAL_INTERVIEW' },
      { id: 'stg_10', order: 3, name: 'HR Interview', type: 'HR_INTERVIEW' }
    ],
    applicationDeadline: '2026-11-30T23:59:59',
    driveDate: '2026-12-05',
    status: 'PUBLISHED',
    createdAt: '2026-10-01'
  },
  {
    id: 'drive_04',
    companyId: 'comp_04',
    companyName: 'Bajaj Auto Ltd',
    jobTitle: 'Graduate Engineer Trainee (GET) - EV Powertrain & Embedded R&D',
    description: 'Work at Bajaj R&D Center on next-generation electric 2-wheelers and 3-wheelers (Chetak EV), battery management systems, and motor control electronics.',
    jobRoleCategory: 'Core Engineering',
    employmentType: 'FULL_TIME',
    workLocation: 'Pune (Akurdi & Chakan)',
    workMode: 'IN_OFFICE',
    ctcLpa: 11.5,
    positionsCount: 12,
    requiredSkills: ['Embedded C', 'Microcontrollers', 'CAN Bus', 'Electric Vehicle Fundamentals', 'MATLAB/Simulink'],
    eligibility: {
      minCgpa: 7.2,
      minTenthPercentage: 70.0,
      minTwelfthPercentage: 70.0,
      maxActiveBacklogs: 0,
      allowedDepartments: ['Electronics and Telecommunication Engineering', 'Mechanical Engineering'],
      allowedDegrees: ['B.Tech'],
      allowedBatches: [2026],
      requireVerifiedDocuments: true
    },
    stages: [
      { id: 'stg_11', order: 1, name: 'Aptitude & Core Domain Technical Test', type: 'ONLINE_TEST' },
      { id: 'stg_12', order: 2, name: 'Technical Interview (Domain & Final Year Project)', type: 'TECHNICAL_INTERVIEW' },
      { id: 'stg_13', order: 3, name: 'Management HR Interview', type: 'HR_INTERVIEW' }
    ],
    applicationDeadline: '2026-11-22T23:59:59',
    driveDate: '2026-11-28',
    status: 'PUBLISHED',
    createdAt: '2026-10-12'
  },
  {
    id: 'drive_05',
    companyId: 'comp_05',
    companyName: 'ZS Associates',
    jobTitle: 'Decision Analytics Associate (DAA)',
    description: 'Apply advanced statistical modeling, SQL data engineering, and business insights to solve commercial strategy challenges for global healthcare leaders.',
    jobRoleCategory: 'Data Analytics',
    employmentType: 'FULL_TIME',
    workLocation: 'Pune',
    workMode: 'HYBRID',
    ctcLpa: 13.8,
    positionsCount: 10,
    requiredSkills: ['SQL', 'Python / R', 'Business Problem Solving', 'Quantitative Reasoning', 'Data Visualization'],
    eligibility: {
      minCgpa: 7.5,
      minTenthPercentage: 75.0,
      minTwelfthPercentage: 75.0,
      maxActiveBacklogs: 0,
      allowedDepartments: ['Computer Science and Engineering', 'Information Technology', 'Electronics and Telecommunication Engineering', 'Mechanical Engineering'],
      allowedDegrees: ['B.Tech'],
      allowedBatches: [2026],
      requireVerifiedDocuments: true
    },
    stages: [
      { id: 'stg_14', order: 1, name: 'Aptitude & Case Study Assessment', type: 'ONLINE_TEST' },
      { id: 'stg_15', order: 2, name: 'Live Case Interview Round', type: 'TECHNICAL_INTERVIEW' },
      { id: 'stg_16', order: 3, name: 'Behavioral & Leadership Discussion', type: 'HR_INTERVIEW' }
    ],
    applicationDeadline: '2026-11-25T23:59:59',
    driveDate: '2026-12-01',
    status: 'PUBLISHED',
    createdAt: '2026-10-14'
  },
  {
    id: 'drive_06',
    companyId: 'comp_06',
    companyName: 'Rakuten India',
    jobTitle: 'Associate Software Engineer - Cloud Platforms',
    description: 'Develop resilient distributed microservices, event-driven data streaming pipelines, and global fintech tools.',
    jobRoleCategory: 'Software Development',
    employmentType: 'FULL_TIME',
    workLocation: 'Bengaluru',
    workMode: 'HYBRID',
    ctcLpa: 16.0,
    positionsCount: 5,
    requiredSkills: ['Java / Kotlin / Golang', 'Spring Boot', 'REST APIs', 'Cloud Computing', 'MySQL'],
    eligibility: {
      minCgpa: 7.5,
      minTenthPercentage: 70.0,
      minTwelfthPercentage: 70.0,
      maxActiveBacklogs: 0,
      allowedDepartments: ['Computer Science and Engineering', 'Information Technology'],
      allowedDegrees: ['B.Tech'],
      allowedBatches: [2026],
      requireVerifiedDocuments: true
    },
    stages: [
      { id: 'stg_17', order: 1, name: 'Online Coding Test (DSA & CS Fundamentals)', type: 'ONLINE_TEST' },
      { id: 'stg_18', order: 2, name: 'Technical Round 1', type: 'TECHNICAL_INTERVIEW' },
      { id: 'stg_19', order: 3, name: 'Executive Discussion', type: 'HR_INTERVIEW' }
    ],
    applicationDeadline: '2026-12-01T23:59:59',
    driveDate: '2026-12-08',
    status: 'PUBLISHED',
    createdAt: '2026-10-20'
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app_01',
    driveId: 'drive_01',
    driveTitle: 'Software Engineer - University Graduate (2026)',
    companyId: 'comp_01',
    companyName: 'Google India',
    studentId: 'std_01',
    studentName: 'Aarav Sharma',
    studentDepartment: 'Computer Science and Engineering',
    studentBatch: 2026,
    studentCgpa: 8.85,
    appliedAt: '2026-10-16T10:30:00',
    currentStage: 'INTERVIEW_SCHEDULED',
    currentStageName: 'Technical Interview Round 1 (Data Structures)',
    resumeVersionId: 'res_01',
    resumeFileName: 'Aarav_Sharma_SDE_Resume_v2.pdf',
    snapshot: {
      appliedAt: '2026-10-16T10:30:00',
      studentId: 'std_01',
      studentName: 'Aarav Sharma',
      department: 'Computer Science and Engineering',
      cgpa: 8.85,
      resumeId: 'res_01',
      resumeTitle: 'Aarav_Sharma_SDE_Resume_v2.pdf',
      skillsSnapshot: ['TypeScript', 'React.js', 'Node.js', 'Python', 'Data Structures & Algorithms', 'PostgreSQL'],
      projectsSummary: 'Distributed Log Aggregation Pipeline (Go, Kafka), Campus Transit Tracker'
    },
    eligibilitySnapshot: {
      isEligible: true,
      overallScore: 100,
      reasons: []
    },
    assessmentScore: {
      score: 84,
      maxScore: 100,
      percentage: 84,
      isQualified: true
    },
    stageHistory: [
      { stage: 'APPLIED', changedAt: '2026-10-16T10:30:00', changedBy: 'Aarav Sharma (Student)', note: 'Application submitted successfully with verified resume.' },
      { stage: 'ELIGIBILITY_CONFIRMED', changedAt: '2026-10-17T09:00:00', changedBy: 'System Rule Engine', note: 'All institutional criteria met (CGPA 8.85 >= 8.0, 0 Backlogs, Verified).' },
      { stage: 'ASSESSMENT_COMPLETED', changedAt: '2026-10-20T16:45:00', changedBy: 'Assessment Evaluator', note: 'Scored 84/100 (Threshold: 60%). Qualified for technical rounds.' },
      { stage: 'SHORTLISTED', changedAt: '2026-10-21T11:00:00', changedBy: 'Devika Sen (Google Recruiter)', note: 'Selected for Technical Interview Round 1.' },
      { stage: 'INTERVIEW_SCHEDULED', changedAt: '2026-10-22T14:30:00', changedBy: 'Prof. Ananya Iyer (CRPC)', note: 'Interview confirmed with Siddharth Rao for Oct 28 at 10:00 AM.' }
    ]
  },
  {
    id: 'app_02',
    driveId: 'drive_02',
    driveTitle: 'Software Development Engineer - Azure & Developer Division',
    companyId: 'comp_02',
    companyName: 'Microsoft IDC',
    studentId: 'std_02',
    studentName: 'Neha Patel',
    studentDepartment: 'Information Technology',
    studentBatch: 2026,
    studentCgpa: 9.20,
    appliedAt: '2026-10-19T11:15:00',
    currentStage: 'OFFER_ACCEPTED',
    currentStageName: 'Placement Confirmed (Offer Accepted)',
    resumeVersionId: 'res_03',
    resumeFileName: 'Neha_Patel_SDE_2026.pdf',
    snapshot: {
      appliedAt: '2026-10-19T11:15:00',
      studentId: 'std_02',
      studentName: 'Neha Patel',
      department: 'Information Technology',
      cgpa: 9.20,
      resumeId: 'res_03',
      resumeTitle: 'Neha_Patel_SDE_2026.pdf',
      skillsSnapshot: ['Java', 'Spring Boot', 'Microservices', 'Kubernetes', 'Algorithms', 'AWS'],
      projectsSummary: 'Microservices E-Commerce Core, Microsoft Explore Internship telemetry script'
    },
    eligibilitySnapshot: {
      isEligible: true,
      overallScore: 100,
      reasons: []
    },
    assessmentScore: {
      score: 92,
      maxScore: 100,
      percentage: 92,
      isQualified: true
    },
    stageHistory: [
      { stage: 'APPLIED', changedAt: '2026-10-19T11:15:00', changedBy: 'Neha Patel (Student)' },
      { stage: 'ELIGIBILITY_CONFIRMED', changedAt: '2026-10-19T11:16:00', changedBy: 'System Rule Engine' },
      { stage: 'SHORTLISTED', changedAt: '2026-10-21T10:00:00', changedBy: 'Kunal Verma (Microsoft Recruiter)' },
      { stage: 'INTERVIEW_COMPLETED', changedAt: '2026-10-23T16:00:00', changedBy: 'Microsoft Interview Panel' },
      { stage: 'OFFERED', changedAt: '2026-10-24T18:00:00', changedBy: 'Kunal Verma (Microsoft Recruiter)', note: 'Offer letter issued: 28.5 LPA CTC.' },
      { stage: 'OFFER_ACCEPTED', changedAt: '2026-10-25T12:00:00', changedBy: 'Neha Patel (Student)', note: 'Accepted Super Dream offer under college placement policy.' }
    ]
  },
  {
    id: 'app_03',
    driveId: 'drive_04',
    driveTitle: 'Graduate Engineer Trainee (GET) - EV Powertrain & Embedded R&D',
    companyId: 'comp_04',
    companyName: 'Bajaj Auto Ltd',
    studentId: 'std_03',
    studentName: 'Rohan Deshmukh',
    studentDepartment: 'Electronics and Telecommunication Engineering',
    studentBatch: 2026,
    studentCgpa: 7.90,
    appliedAt: '2026-10-14T09:30:00',
    currentStage: 'SHORTLISTED',
    currentStageName: 'Shortlisted for Technical Round',
    resumeVersionId: 'res_04',
    resumeFileName: 'Rohan_Deshmukh_Embedded_Resume.pdf',
    snapshot: {
      appliedAt: '2026-10-14T09:30:00',
      studentId: 'std_03',
      studentName: 'Rohan Deshmukh',
      department: 'Electronics and Telecommunication Engineering',
      cgpa: 7.90,
      resumeId: 'res_04',
      resumeTitle: 'Rohan_Deshmukh_Embedded_Resume.pdf',
      skillsSnapshot: ['Embedded C', 'C++', 'ARM Cortex-M', 'RTOS', 'CAN Bus'],
      projectsSummary: 'BMS Telemetry Node (STM32, FreeRTOS), KPIT Internship'
    },
    eligibilitySnapshot: {
      isEligible: true,
      overallScore: 100,
      reasons: []
    },
    stageHistory: [
      { stage: 'APPLIED', changedAt: '2026-10-14T09:30:00', changedBy: 'Rohan Deshmukh' },
      { stage: 'ELIGIBILITY_CONFIRMED', changedAt: '2026-10-14T10:00:00', changedBy: 'System Rule Engine' },
      { stage: 'SHORTLISTED', changedAt: '2026-10-18T15:00:00', changedBy: 'Gaurav Kulkarni (Bajaj Auto Recruiter)' }
    ]
  },
  {
    id: 'app_04',
    driveId: 'drive_05',
    driveTitle: 'Decision Analytics Associate (DAA)',
    companyId: 'comp_05',
    companyName: 'ZS Associates',
    studentId: 'std_06',
    studentName: 'Tanmay Joshi',
    studentDepartment: 'Information Technology',
    studentBatch: 2026,
    studentCgpa: 8.42,
    appliedAt: '2026-10-17T14:20:00',
    currentStage: 'ASSESSMENT_SCHEDULED',
    currentStageName: 'Online Aptitude & Case Study Assessment',
    resumeVersionId: 'res_07',
    resumeFileName: 'Tanmay_Joshi_Analytics_Resume.pdf',
    snapshot: {
      appliedAt: '2026-10-17T14:20:00',
      studentId: 'std_06',
      studentName: 'Tanmay Joshi',
      department: 'Information Technology',
      cgpa: 8.42,
      resumeId: 'res_07',
      resumeTitle: 'Tanmay_Joshi_Analytics_Resume.pdf',
      skillsSnapshot: ['Python', 'SQL', 'Data Analytics', 'Tableau'],
      projectsSummary: 'Hospital Readmission Predictive Classifier'
    },
    eligibilitySnapshot: {
      isEligible: true,
      overallScore: 100,
      reasons: []
    },
    stageHistory: [
      { stage: 'APPLIED', changedAt: '2026-10-17T14:20:00', changedBy: 'Tanmay Joshi' },
      { stage: 'ELIGIBILITY_CONFIRMED', changedAt: '2026-10-17T14:21:00', changedBy: 'System Rule Engine' },
      { stage: 'ASSESSMENT_SCHEDULED', changedAt: '2026-10-21T09:00:00', changedBy: 'Prof. Ananya Iyer (CRPC)' }
    ]
  }
];

export const INITIAL_ASSESSMENTS: Assessment[] = [
  {
    id: 'assess_practice_01',
    title: 'Quantitative Aptitude & Speed Math Masterclass',
    isOfficial: false,
    topic: 'Quantitative Aptitude',
    durationMinutes: 20,
    passThresholdPercentage: 60,
    status: 'ACTIVE',
    instructions: [
      'This practice drill contains 5 high-yield quantitative questions.',
      'Timer starts immediately upon clicking Begin Test.',
      'Mark questions for review to revisit before submission.',
      'Full explanations and step-by-step solutions are shown after submitting.'
    ],
    questions: [
      {
        id: 'q_p1',
        questionText: 'A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 650 m long?',
        options: [
          { key: 'A', text: '65 seconds' },
          { key: 'B', text: '89 seconds' },
          { key: 'C', text: '100 seconds' },
          { key: 'D', text: '75 seconds' }
        ],
        correctOption: 'B',
        marks: 4,
        negativeMarks: 1,
        topic: 'Speed, Time and Distance',
        explanation: 'Speed of the train = Distance / Time = 240 / 24 = 10 m/s. Total distance to pass platform = length of train + platform = 240 + 650 = 890 m. Time required = 890 / 10 = 89 seconds.'
      },
      {
        id: 'q_p2',
        questionText: 'A vendor bought toffees at 6 for a rupee. How many for a rupee must he sell to gain 20% profit?',
        options: [
          { key: 'A', text: '3' },
          { key: 'B', text: '4' },
          { key: 'C', text: '5' },
          { key: 'D', text: '6' }
        ],
        correctOption: 'C',
        marks: 4,
        negativeMarks: 1,
        topic: 'Profit and Loss',
        explanation: 'Cost price of 6 toffees = Re 1. CP of 1 toffee = Re 1/6. For 20% profit, Selling Price of 1 toffee = (1/6) * 1.20 = 1/5. Hence, for Re 1 he must sell 5 toffees.'
      },
      {
        id: 'q_p3',
        questionText: 'Two pipes A and B can fill a tank in 20 and 30 minutes respectively. If both pipes are opened together, the time taken to fill the tank is:',
        options: [
          { key: 'A', text: '10 minutes' },
          { key: 'B', text: '12 minutes' },
          { key: 'C', text: '15 minutes' },
          { key: 'D', text: '25 minutes' }
        ],
        correctOption: 'B',
        marks: 4,
        negativeMarks: 1,
        topic: 'Pipes & Cisterns',
        explanation: 'Part filled in 1 minute = 1/20 + 1/30 = (3 + 2)/60 = 5/60 = 1/12. Therefore total time required = 12 minutes.'
      },
      {
        id: 'q_p4',
        questionText: 'In how many different ways can the letters of the word "LEADING" be arranged in such a way that the vowels always come together?',
        options: [
          { key: 'A', text: '360' },
          { key: 'B', text: '480' },
          { key: 'C', text: '720' },
          { key: 'D', text: '5040' }
        ],
        correctOption: 'C',
        marks: 4,
        negativeMarks: 1,
        topic: 'Permutations and Combinations',
        explanation: 'Vowels are E, A, I (3 vowels). Consonants are L, D, N, G (4 consonants). Treat (E,A,I) as 1 unit. Total units = 4 + 1 = 5 units arranged in 5! = 120 ways. 3 vowels can arrange themselves in 3! = 6 ways. Total arrangements = 120 * 6 = 720 ways.'
      },
      {
        id: 'q_p5',
        questionText: 'The average of 5 consecutive numbers is 27. What is the product of the smallest and greatest numbers?',
        options: [
          { key: 'A', text: '725' },
          { key: 'B', text: '700' },
          { key: 'C', text: '720' },
          { key: 'D', text: '675' }
        ],
        correctOption: 'A',
        marks: 4,
        negativeMarks: 1,
        topic: 'Averages',
        explanation: 'Let numbers be n, n+1, n+2, n+3, n+4. The middle number is n+2 = 27. Thus the numbers are 25, 26, 27, 28, 29. Product of smallest (25) and largest (29) = 25 * 29 = 725.'
      }
    ]
  },
  {
    id: 'assess_practice_02',
    title: 'Computer Science Core & Data Structures Drill',
    isOfficial: false,
    topic: 'Technical MCQs',
    durationMinutes: 15,
    passThresholdPercentage: 60,
    status: 'ACTIVE',
    instructions: [
      'Covers operating systems, computer networks, and algorithmic time complexity.',
      'Practice test mode: solutions revealed immediately on submission.'
    ],
    questions: [
      {
        id: 'q_p6',
        questionText: 'Which of the following sorting algorithms has the best worst-case time complexity?',
        options: [
          { key: 'A', text: 'Quick Sort - O(N^2)' },
          { key: 'B', text: 'Merge Sort - O(N log N)' },
          { key: 'C', text: 'Bubble Sort - O(N^2)' },
          { key: 'D', text: 'Selection Sort - O(N^2)' }
        ],
        correctOption: 'B',
        marks: 4,
        negativeMarks: 1,
        topic: 'Data Structures & Algorithms',
        explanation: 'Merge sort maintains O(N log N) in all worst, average, and best cases because it unconditionally divides the array into two halves.'
      },
      {
        id: 'q_p7',
        questionText: 'What is the primary condition that causes a deadlock in an operating system?',
        options: [
          { key: 'A', text: 'Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait' },
          { key: 'B', text: 'Context Switching and Preemption' },
          { key: 'C', text: 'Virtual Memory Thrashing' },
          { key: 'D', text: 'Cache Misses' }
        ],
        correctOption: 'A',
        marks: 4,
        negativeMarks: 1,
        topic: 'Operating Systems',
        explanation: 'Coffman conditions: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait are all required simultaneously for deadlock.'
      }
    ]
  },
  {
    id: 'assess_official_01',
    title: 'Google Campus Official Assessment 2026',
    isOfficial: true,
    linkedDriveId: 'drive_01',
    companyName: 'Google India',
    topic: 'Computer Science & Algorithmic Problem Solving',
    durationMinutes: 30,
    passThresholdPercentage: 65,
    status: 'ACTIVE',
    instructions: [
      'Official proctored MCQ screening for Google India SWE campus recruitment.',
      'Each correct answer yields +4 marks; each wrong answer incurs -1 mark penalty.',
      'Answer submissions are final and automatically evaluate your qualification status.'
    ],
    questions: [
      {
        id: 'q_off_1',
        questionText: 'What is the space complexity of Depth First Search (DFS) on a balanced binary tree with N nodes?',
        options: [
          { key: 'A', text: 'O(1)' },
          { key: 'B', text: 'O(log N)' },
          { key: 'C', text: 'O(N)' },
          { key: 'D', text: 'O(N log N)' }
        ],
        correctOption: 'B',
        marks: 4,
        negativeMarks: 1,
        topic: 'Trees and Recursion',
        explanation: 'On a balanced binary tree, the maximum recursion call stack depth equals the tree height, which is O(log N).'
      },
      {
        id: 'q_off_2',
        questionText: 'In TCP protocol, what is the sequence of packets during the initial connection establishment?',
        options: [
          { key: 'A', text: 'ACK -> SYN -> SYN-ACK' },
          { key: 'B', text: 'SYN -> SYN-ACK -> ACK' },
          { key: 'C', text: 'FIN -> ACK -> FIN-ACK' },
          { key: 'D', text: 'RST -> SYN -> ACK' }
        ],
        correctOption: 'B',
        marks: 4,
        negativeMarks: 1,
        topic: 'Computer Networks',
        explanation: 'TCP 3-way handshake begins with client sending SYN, server replying with SYN-ACK, and client confirming with ACK.'
      },
      {
        id: 'q_off_3',
        questionText: 'Which property of database transactions ensures that concurrent transactions do not interfere with one another?',
        options: [
          { key: 'A', text: 'Atomicity' },
          { key: 'B', text: 'Consistency' },
          { key: 'C', text: 'Isolation' },
          { key: 'D', text: 'Durability' }
        ],
        correctOption: 'C',
        marks: 4,
        negativeMarks: 1,
        topic: 'DBMS',
        explanation: 'Isolation ensures that each transaction is unaware of other concurrent transactions executing in the database.'
      }
    ]
  }
];

export const INITIAL_INTERVIEWS: Interview[] = [
  {
    id: 'int_01',
    applicationId: 'app_01',
    driveId: 'drive_01',
    companyId: 'comp_01',
    companyName: 'Google India',
    studentId: 'std_01',
    studentName: 'Aarav Sharma',
    studentDepartment: 'Computer Science and Engineering',
    roundType: 'TECHNICAL',
    roundTitle: 'Round 1: Data Structures & Algorithms Live Coding',
    scheduledTime: '2026-10-28T10:00:00',
    durationMinutes: 45,
    mode: 'VIRTUAL',
    meetingUrlOrVenue: 'https://meet.google.com/xyz-mitaoe-placement',
    interviewerId: 'user_interviewer_1',
    interviewerName: 'Siddharth Rao',
    interviewerEmail: 'siddharth.rao@google.com',
    status: 'SCHEDULED'
  },
  {
    id: 'int_02',
    applicationId: 'app_02',
    driveId: 'drive_02',
    companyId: 'comp_02',
    companyName: 'Microsoft IDC',
    studentId: 'std_02',
    studentName: 'Neha Patel',
    studentDepartment: 'Information Technology',
    roundType: 'TECHNICAL',
    roundTitle: 'Round 2: System Architecture & Concurrency',
    scheduledTime: '2026-10-23T14:00:00',
    durationMinutes: 60,
    mode: 'VIRTUAL',
    meetingUrlOrVenue: 'https://teams.microsoft.com/l/meetup-join/msft-idc',
    interviewerId: 'user_ms_interviewer',
    interviewerName: 'Anil Kumar (Principal SDE)',
    interviewerEmail: 'anil.k@microsoft.com',
    status: 'COMPLETED',
    evaluation: {
      completedAt: '2026-10-23T15:30:00',
      technicalRating: 5,
      problemSolvingRating: 5,
      communicationRating: 4,
      roleFitRating: 5,
      overallRating: 4.8,
      detailedFeedback: 'Outstanding command over Java concurrency primitives, distributed locking with Redis, and Kafka partition rebalancing. Answered edge case scenarios flawlessly.',
      recommendation: 'STRONGLY_RECOMMEND',
      attendance: 'PRESENT'
    }
  }
];

export const INITIAL_OFFERS: Offer[] = [
  {
    id: 'off_01',
    applicationId: 'app_02',
    studentId: 'std_02',
    studentName: 'Neha Patel',
    studentDepartment: 'Information Technology',
    companyId: 'comp_02',
    companyName: 'Microsoft IDC',
    driveId: 'drive_02',
    jobRole: 'Software Development Engineer - Azure',
    ctcLpa: 28.5,
    baseSalaryLpa: 17.0,
    variableBonusLpa: 3.5,
    joiningBonusLpa: 3.0,
    workLocation: 'Hyderabad, Telangana',
    issuedDate: '2026-10-24',
    acceptanceDeadline: '2026-11-02',
    expectedJoiningDate: '2026-07-15',
    status: 'ACCEPTED',
    decisionDate: '2026-10-25',
    decisionReason: 'Accepted dream career role with Azure cloud team.',
    offerLetterFileName: 'Microsoft_IDC_Offer_Letter_Neha_Patel.pdf'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_01',
    userId: 'user_student_1',
    title: 'Interview Confirmed: Google India Round 1',
    message: 'Your Technical Interview Round 1 with Siddharth Rao is scheduled for Oct 28 at 10:00 AM.',
    category: 'INTERVIEW',
    linkUrl: '/student/interviews',
    createdAt: '2026-10-22T14:35:00',
    read: false
  },
  {
    id: 'notif_02',
    targetRole: 'ALL',
    title: 'Campus Placement Season 2025-26 Phase 1 Commences',
    message: 'CRPC has opened campus registration for the 2026 graduating batch across all engineering departments.',
    category: 'GENERAL',
    linkUrl: '/student/opportunities',
    createdAt: '2026-10-15T09:00:00',
    read: true
  },
  {
    id: 'notif_03',
    userId: 'user_student_1',
    title: 'Eligibility Confirmed for Google India SWE',
    message: 'Your profile passed all academic and verification rules. You are eligible to appear for the official screening.',
    category: 'APPLICATION',
    linkUrl: '/student/applications',
    createdAt: '2026-10-17T09:05:00',
    read: true
  }
];

export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann_01',
    title: 'Pre-Placement Talk (PPT) & Briefing: Google India & Microsoft IDC',
    content: 'All shortlisted and eligible B.Tech students from CSE, IT, and ENTC are required to attend the mandatory pre-placement briefing in the Dhyaneshwar Auditorium on Wednesday at 4:30 PM.',
    priority: 'HIGH',
    targetDepartments: ['Computer Science and Engineering', 'Information Technology', 'Electronics and Telecommunication Engineering'],
    targetBatches: [2026],
    publishedBy: 'Prof. Ananya Iyer (Lead Placement Officer)',
    publishedAt: '2026-10-20T10:00:00',
    isArchived: false
  },
  {
    id: 'ann_02',
    title: 'Institutional Placement Policy: One-Offer Rule & Super-Dream Exceptions',
    content: 'Students securing an initial offer up to 9.0 LPA remain eligible to contest for Dream (9-18 LPA) and Super Dream (>18 LPA) drives. Once a Super Dream offer is accepted, the candidate is marked Placed and withdrawn from subsequent drives.',
    priority: 'NORMAL',
    targetDepartments: ['ALL'],
    targetBatches: [2026, 2025],
    publishedBy: 'Dr. Vikram Sethi (Dean CRPC)',
    publishedAt: '2026-10-10T14:00:00',
    isArchived: false
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log_01',
    timestamp: '2026-10-25T12:00:00',
    actorName: 'Neha Patel',
    actorRole: 'STUDENT',
    action: 'Offer Accepted',
    targetType: 'OFFER',
    targetName: 'Microsoft IDC (28.5 LPA)',
    details: 'Student accepted Super Dream offer. Unique placed status registered.'
  },
  {
    id: 'log_02',
    timestamp: '2026-10-24T18:00:00',
    actorName: 'Kunal Verma',
    actorRole: 'COMPANY_RECRUITER',
    action: 'Offer Issued',
    targetType: 'OFFER',
    targetName: 'Neha Patel (MIT2022IT018)',
    details: 'Formal offer letter issued for SDE role with CTC 28.5 LPA.'
  },
  {
    id: 'log_03',
    timestamp: '2026-10-22T14:30:00',
    actorName: 'Prof. Ananya Iyer',
    actorRole: 'CRPC_OFFICER',
    action: 'Interview Scheduled',
    targetType: 'INTERVIEW',
    targetName: 'Aarav Sharma - Google Round 1',
    details: 'Assigned interviewer Siddharth Rao for Oct 28 at 10:00 AM IST via Google Meet.'
  },
  {
    id: 'log_04',
    timestamp: '2026-10-15T11:00:00',
    actorName: 'Dr. Vikram Sethi',
    actorRole: 'CRPC_SUPER_ADMIN',
    action: 'Drive Published',
    targetType: 'DRIVE',
    targetName: 'Google India SWE (2026 Batch)',
    details: 'Placement drive published for campus-wide eligible candidates.'
  }
];
