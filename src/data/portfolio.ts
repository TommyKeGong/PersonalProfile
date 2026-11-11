export interface ExperienceItem {
  company: string
  role: string
  location: string
  period: string
  summary: string
  highlights: string[]
  technologies: string[]
}

export interface ProjectItem {
  title: string
  label: string
  description: string
  details: string
  technologies: string[]
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
    period: 'May 2026 — Present',
    summary: 'Building backend systems and computational tooling for qualification evaluation and complex assignment workflows.',
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
    period: 'July 2024 — August 2024',
    summary: 'Worked on computer-vision and local LLM deployment experiments for healthcare-oriented applications.',
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
    period: 'September 2023 — October 2023',
    summary: 'Built automated data workflows for competitor pricing analysis and downstream analytics.',
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
    title: 'E-CARGO Knowledge Agent',
    label: 'AI / RAG project',
    description: 'A source-grounded knowledge system for retrieving relevant evidence from academic documents and producing traceable responses.',
    details: 'The implementation uses a FastAPI service, PostgreSQL with pgvector, PyMuPDF, Sentence Transformers, Docker, and pytest. The portfolio describes the verified technical direction without exposing private research data, credentials, or unfinished capabilities.',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Sentence Transformers', 'Docker', 'pytest'],
  },
  {
    title: 'E-CARGO Research & Optimization',
    label: 'Computational research',
    description: 'Research on computational modeling, role assignment, optimization, and scheduling through the E-CARGO perspective.',
    details: 'The work connects formal modeling with practical allocation problems: representing roles, constraints, and collaboration so that assignment and scheduling decisions can be explored systematically.',
    technologies: ['Computational modeling', 'Optimization', 'Role assignment', 'Scheduling'],
  },
]

export const research: ResearchItem[] = [
  {
    title: 'Canadian NPR Decreasing Policy Making: A Computational Simulation Method using E-CARGO',
    status: 'Published conference paper · SysCon 2025',
    description: 'A computational simulation study applying E-CARGO concepts to policy-making dynamics.',
    link: 'https://dblp.org/rec/conf/syscon/Gong0Y25',
    linkLabel: 'View bibliographic record',
  },
  {
    title: 'Why Imperfect Team Management is Tolerable: An E-CARGO’s Perspective',
    status: 'Published conference paper · CSCWD 2025',
    description: 'Research on team management and collaboration through an E-CARGO perspective.',
    link: 'https://dblp.org/rec/conf/cscwd/0001YGW25',
    linkLabel: 'View bibliographic record',
  },
  {
    title: 'Role assignment, optimization, and computational collaboration',
    status: 'Ongoing research',
    description: 'Current research interests include computational modeling, role assignment, optimization, and scheduling at Nipissing University.',
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
