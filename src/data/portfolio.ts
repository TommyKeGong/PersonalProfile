export interface ExperienceItem {
  company: string
  role: string
  location: string
  period: string
  summary: string
  achievement: string
  highlights: string[]
  technologies: string[]
}

export interface ProjectItem {
  title: string
  label: string
  description: string
  details: string
  technologies: string[]
  link?: string
  linkLabel?: string
}

export interface SelectedProjectItem {
  title: string
  label: string
  description: string
  details: string
  technologies: string[]
  link: string
  linkLabel: string
  note: string
}

export interface ResearchItem {
  title: string
  status: string
  description: string
  link?: string
  linkLabel?: string
}

export const experience: ExperienceItem[] = [
  {
    company: 'Nipissing University',
    role: 'Software Engineer Intern',
    location: 'North Bay, Ontario, Canada',
    period: 'May 2026 - Present',
    summary: 'Building backend systems and computational tooling for qualification evaluation and complex assignment workflows.',
    achievement: 'Spring Boot platform with AI-assisted evaluations and constraint-based optimization.',
    highlights: [
      'Developed a Java 17 and Spring Boot backend platform for qualification evaluation and complex assignment workflows.',
      'Integrated REST APIs, Google Gemini API, structured prompting, and JSON schema validation.',
      'Built constraint-based optimization functionality for multi-constraint assignment problems.',
      'Designed caching and batch processing to reduce redundant API calls and database operations.',
    ],
    technologies: ['Java 17', 'Spring Boot', 'MongoDB', 'Gemini API', 'Optimization'],
  },
  {
    company: 'Climind',
    role: 'AI Developer Intern',
    location: 'Hong Kong SAR, China',
    period: 'July 2024 - August 2024',
    summary: 'Worked on computer-vision and local LLM deployment experiments for healthcare-oriented applications.',
    achievement: 'Reduced the rPPG pipeline latency by approximately 30%.',
    highlights: [
      'Developed an rPPG pipeline using OpenCV, Dlib, and Scikit-learn, reaching approximately 92% heart-rate estimation accuracy.',
      'Reduced pipeline latency by approximately 30%.',
      'Deployed Phi-3-Mini with vLLM on AWS EC2 Linux infrastructure with inference latency below 150 ms.',
      'Collaborated with a three-person team on model benchmarking and optimization.',
    ],
    technologies: ['Python', 'OpenCV', 'Dlib', 'Scikit-learn', 'vLLM', 'AWS EC2'],
  },
  {
    company: 'iDriveCareer Consulting Ltd',
    role: 'Data Engineer Intern',
    location: 'Toronto, Ontario, Canada',
    period: 'September 2023 - October 2023',
    summary: 'Built automated data workflows for competitor pricing analysis and downstream analytics.',
    achievement: 'Processed more than 10,000 competitor-pricing records from five external sources.',
    highlights: [
      'Processed more than 10,000 records from five external sources through automated pipelines.',
      'Used Kafka to reduce manual data collection by approximately 95%.',
      'Implemented Azure Data Factory and SQL Server ingestion workflows, improving throughput by approximately 25%.',
      'Used Redis caching and delivered Power BI and Matplotlib analytics dashboards.',
    ],
    technologies: ['Kafka', 'Azure Data Factory', 'SQL Server', 'Redis', 'Power BI'],
  },
]

export const projects: ProjectItem[] = [
  {
    title: 'Knowledge Agent',
    label: 'AI / RAG project',
    description: 'An AI-powered research assistant that retrieves relevant information from academic documents and generates evidence-grounded answers with verifiable citations. Built using Retrieval-Augmented Generation (RAG), the system integrates semantic search, vector databases, and local large language models to support academic research. Its initial knowledge base focuses on E-CARGO, a framework for role-based collaboration and computational problem-solving.',
    details: 'The verified implementation surface includes PDF ingestion with PyMuPDF, text chunking, Sentence Transformers, PostgreSQL with pgvector, semantic retrieval, LLM integration, citation validation, and a FastAPI service. The portfolio describes the technical direction without exposing private research data, credentials, or unfinished capabilities.',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Sentence Transformers', 'Docker', 'pytest'],
  },
  {
    title: 'E-CARGO Research & Optimization',
    label: 'Computational optimization research',
    description: 'Research on computational modeling, role assignment, optimization, and scheduling, using E-CARGO as a framework for structured collaboration.',
    details: 'The public NPRProblem repository separates this work from the RAG project: it clusters agent suitability with K-Means, searches capacity vectors with a Genetic Algorithm, and applies GMRA assignment under role and population constraints. The repository reports approximately 30 minutes for the full pipeline, approximately 1.2 seconds for a single GMRA call, and Q compression below seven minutes; these are repository-reported experiment notes.',
    technologies: ['K-Means', 'Genetic Algorithm', 'GMRA', 'Optimization', 'Python'],
    link: 'https://github.com/Tommy-Gong/NPRProblem',
    linkLabel: 'View research code',
  },
]

export const selectedProjects: SelectedProjectItem[] = [
  {
    title: 'ML Therapy Prediction',
    label: 'Public ML pipeline',
    description: 'A modular Python codebase for therapy-scheme prediction with documented preprocessing, feature reduction, single- and multi-label classification, benchmarking, and feature importance analysis.',
    details: 'Contributed to a modular Python machine-learning workflow for therapy-scheme prediction, working on selected parts of preprocessing, feature reduction, classification, benchmarking, and feature-importance analysis. The project covers both single- and multi-label prediction and uses structured experiments to compare model behavior.',
    technologies: ['Python', 'pandas', 'Scikit-learn', 'LazyPredict', 'Matplotlib'],
    link: 'https://github.com/Tommy-Gong/ML-Therapy-Prediction',
    linkLabel: 'View repository',
    note: 'ML workflow contribution',
  },
  {
    title: 'Competitor Pricing Analysis',
    label: 'Data engineering / analytics',
    description: 'A public repository for competitor TV-pricing analysis. Its main code collects dynamic retail pages with Selenium, parses product fields with BeautifulSoup, and exports timestamped CSV data for notebook-based analysis.',
    details: 'Contributed to an end-to-end competitor-pricing analysis workflow spanning dynamic page collection, HTML parsing, data cleaning, and notebook-based analytics. During the related internship, I processed more than 10,000 records from five external sources and helped automate collection and ingestion workflows.',
    technologies: ['Python', 'Selenium', 'BeautifulSoup', 'pandas', 'Jupyter'],
    link: 'https://github.com/Tommy-Gong/iDC_Project_3',
    linkLabel: 'View repository',
    note: 'Data pipeline contribution',
  },
  {
    title: 'Spotstitch WebApp',
    label: 'Collaborative full-stack project',
    description: 'A public React application for inventory and marketplace workflows, with route-driven screens, Redux state, and socket context; the related backend repository exposes Express and Mongoose inventory endpoints.',
    details: 'As one of three team members, I owned the fitness-course feature across the Django REST backend, data models, and React/JSX frontend. I built administrator workflows for creating and deleting courses, including bounded recursive timetable generation. I also implemented subscription-aware browsing, enrollment with capacity checks, recursive course deletion, and keyword and date-time filtering. On the backend, I worked with Django models, admin CRUD, serializers, URL routing, and REST API behavior. On the frontend, I built course schedules, pagination, error handling, course details, responsive styling, and AJAX interactions that update data without a full-page reload. We tested the feature with the browsable API and Postman.',
    technologies: ['React', 'Express', 'MongoDB', 'Redux', 'Socket.IO'],
    link: 'https://github.com/Tommy-Gong/301local',
    linkLabel: 'View repository',
    note: 'Full-stack feature ownership',
  },
]

export const research: ResearchItem[] = [
  {
    title: 'Canadian NPR Decreasing Policy Making: A Computational Simulation Method using E-CARGO',
    status: 'Published conference paper - SysCon 2025',
    description: 'A computational simulation study applying a role-based collaboration framework to policy-making dynamics.',
    link: 'https://dblp.org/rec/conf/syscon/Gong0Y25',
    linkLabel: 'View bibliographic record',
  },
  {
    title: "Why Imperfect Team Management is Tolerable: An E-CARGO's Perspective",
    status: 'Published conference paper - CSCWD 2025',
    description: 'Research on team management and collaboration through computational modeling and the E-CARGO framework.',
    link: 'https://dblp.org/rec/conf/cscwd/0001YGW25',
    linkLabel: 'View bibliographic record',
  },
  {
    title: 'Role assignment, optimization, and computational collaboration',
    status: 'Ongoing research',
    description: 'Current research interests include artificial intelligence, intelligent systems, computational modeling, optimization, knowledge retrieval, and decision-making at Nipissing University.',
  },
]

export const skillGroups = [
  { name: 'Programming', skills: ['Java', 'Python', 'SQL', 'JavaScript', 'TypeScript'] },
  { name: 'Backend', skills: ['Spring Boot', 'Django', 'Node.js', 'RESTful APIs'] },
  { name: 'Frontend', skills: ['React'] },
  { name: 'Data & databases', skills: ['MongoDB', 'MongoDB Atlas', 'SQL Server', 'PostgreSQL', 'Kafka', 'Redis', 'ETL', 'Azure Data Factory'] },
  { name: 'Cloud & DevOps', skills: ['AWS', 'AWS EC2', 'Azure', 'Docker', 'Kubernetes', 'Git', 'Linux'] },
  { name: 'AI & analytics', skills: ['Google Gemini API', 'LLM integration', 'AI agents', 'MCP', 'Scikit-learn', 'PyTorch', 'TensorFlow', 'OpenCV', 'Dlib', 'Power BI', 'Matplotlib'] },
]
