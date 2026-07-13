export const resume = {
  name: "Arnab Banerjee",
  title: "Backend & Platform Engineer",
  subtitle: "AWS · Kubernetes · DevOps",
  email: "arnab.social.n@gmail.com",
  phone: "",
  linkedin: "https://linkedin.com/in/arnabbanerjee23",
  github: "https://github.com/ArnabBanerjee",
  calendly: "https://calendly.com/arnabbanerjee/consult",
  cv: "https://1drv.ms/b/c/08344845d0496ac2/IQC_TjIdT5c8T5YeIfqAqHrCAW0lIqxp5lBx9l_7-h9N4U8?e=bPNdjQ",

  coreStack: [
    "TypeScript",
    "Python",
    "Rust",
    "Node.js (NestJS)",
    "AWS",
    "Kubernetes",
    "Terraform",
    "Kong",
    "Grafana",
  ],
  // metrics: [
  //   { value: "85%", label: "Latency Reduction", detail: "2s → 300ms" },
  //   { value: "66%", label: "Infra Cost Cut", detail: "EC2 → Lambda + Kong" },
  //   { value: "2.3×", label: "Request Capacity", detail: "monolith → microservices" },
  // ],
  metrics: [],
  summary:
    "Results-driven Backend & Platform Engineer with 8+ years building, securing, and scaling enterprise systems across Insurance, Healthcare, Property, and E-commerce. Deep expertise in cloud-native architecture (AWS), container orchestration (Kubernetes/ECS), CI/CD automation, and microservices engineering (Node.js / Python). Proven track record reducing latency by 85% (2s → 300ms), cutting infrastructure costs by 66%, and scaling platforms to 2.3× request capacity.",

  certifications: [
    "AWS Certified Solutions Architect – Associate",
    "Istio Certified Associate (ICA)",
  ],

  experience: [
    {
      title: "Specialist Programmer (Power Programmer) – L2",
      company: "Infosys",
      location: "Kolkata",
      period: "Dec 2023 – Present",
      bullets: [
        "Architected and delivered a mission-critical payment system across 15–20 microservices; reduced infrastructure cost by 66% migrating from EC2 to Lambda + Kong API Gateway.",
        "Drove end-to-end latency from 2s → 300ms (85% improvement) via serverless refactoring, Redis/ElastiCache caching, and API gateway optimisation.",
        "Designed DevSecOps pipelines (SAST, DAST, secrets scanning) integrated into GitHub Actions and AWS CodePipeline.",
        "Provisioned all infrastructure via Terraform (IaC); full observability via Grafana + CloudWatch (X-Ray, Insights, CQL).",
        "Enforced enterprise-grade security: OIDC/SAML auth, mTLS between services, encryption at rest and in transit.",
      ],
    },
    {
      title: "SDE3 – Platform Engineer",
      company: "Resident Boost Technologies (Zuma)",
      location: "Bengaluru",
      period: "Sep 2022 – Dec 2023",
      bullets: [
        "Built and owned in-house API Gateway on Kong — routing 7K+ requests/day across 9 internal services, replacing a commercial gateway.",
        "Led monolith → microservices migration on Kubernetes + AWS Lambda → 75% reduction in API response times; 2.3× monthly throughput.",
        "Built CI/CD from scratch: GitHub Actions → ECS Fargate / Amplify, Terraform IaC; zero-downtime deploys.",
        "Sole owner of logging/monitoring (Grafana), communication platform (Twilio + SendGrid), and end-to-end encryption.",
      ],
    },
    {
      title: "SDE2 – Backend & Platform Engineer",
      company: "GeoSpoc (An OLA Company)",
      location: "Pune",
      period: "May 2020 – Sep 2022",
      bullets: [
        "Built GeoCode platform (Geocoding, Reverse Geocoding, Drive-Time, Aerial Distance) on Python + AWS Lambda — 40K+ API calls/month at 99.95% uptime.",
        "Delivered full GIS web platform (PostgreSQL + AWS Aurora Serverless) in 3 months with zero critical defects.",
      ],
    },
    {
      title: "Web Developer",
      company: "Source Code Labs",
      location: "Kolkata",
      period: "Jul 2019 – Apr 2020",
      bullets: [
        "Built 360° virtual-tour platform (Vue.js + Three.js + Express.js) for real estate and automotive verticals with real-time analytics (D3 + Socket.io).",
      ],
    },
    {
      title: "Software Developer (+ Intern)",
      company: "Ayata (Data InfoCom Software Solutions)",
      location: "Kolkata",
      period: "Jan 2018 – Mar 2019",
      bullets: [
        "Joined as intern (Jan–Jul 2018), converted to full-time based on performance.",
        "Built insurance coverage verification, fraud detection, and claim-settlement APIs (Node.js, Python/Flask, PostgreSQL, SAML auth).",
      ],
    },
  ],

  skills: [
    {
      category: "Languages",
      items: ["TypeScript", "JavaScript", "Python", "Rust"],
    },
    {
      category: "Cloud & Infra",
      items: [
        "AWS Lambda",
        "ECS/Fargate",
        "EC2",
        "RDS",
        "S3",
        "VPC",
        "CloudFront",
        "CloudWatch",
        "IAM",
        "SNS/SQS",
        "WAF",
        "Control Tower",
        "Security Hub",
      ],
    },
    {
      category: "DevOps / CI-CD",
      items: [
        "Docker",
        "Kubernetes",
        "Terraform",
        "GitHub Actions",
        "ArgoCD",
        "Helm",
        "Kustomize",
        "AWS CodePipeline",
        "CodeBuild",
        "CodeDeploy",
        "AWS Amplify",
      ],
    },
    {
      category: "Observability",
      items: [
        "Grafana",
        "Datadog",
        "AWS CloudWatch",
        "X-Ray",
        "Insights",
        "CQL",
      ],
    },
    {
      category: "API & Networking",
      items: [
        "Kong Gateway",
        "AWS API Gateway",
        "Nginx",
        "Istio (ICA Certified)",
      ],
    },
    {
      category: "Backend",
      items: [
        "Node.js (NestJS)",
        "Express",
        "Python (FastAPI)",
        "Flask",
        "Serverless Framework",
      ],
    },
    {
      category: "Databases",
      items: [
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "DynamoDB",
        "MySQL",
        "Amazon RDS",
        "Aurora",
        "ElastiCache",
      ],
    },
    {
      category: "Auth & Security",
      items: [
        "OIDC",
        "SAML",
        "JWT",
        "Auth0",
        "AWS Cognito",
        "mTLS",
        "Encryption at rest & transit",
      ],
    },
  ],

  certificationsList: [
    {
      name: "AWS Certified Solutions Architect - Associate",
      issuer: "Amazon Web Services",
      period: "Dec 2024 - Dec 2027",
      primary: true,
    },
    {
      name: "Istio Certified Associate (ICA)",
      issuer: "KodeKloud",
      period: "Sep 2025",
      primary: false,
    },
    {
      name: "Gremlin Certified Chaos Engineering (GECEC)",
      issuer: "Gremlin",
      period: "",
      primary: false,
    },
    {
      name: "Kong Gateway Foundations & Operations",
      issuer: "Kong",
      period: "",
      primary: false,
    },
    {
      name: "Claude Code Certified",
      issuer: "Anthropic",
      period: "",
      primary: false,
    },
  ],

  education: [
    {
      degree: "MCA",
      institution: "Techno India – Hooghly (MAKAUT)",
      period: "2015 – 2018",
      grade: "82.1%",
    },
    {
      degree: "BCA",
      institution: "The Heritage Academy, Kolkata (WBUT)",
      period: "2011 – 2014",
      grade: "76.9%",
    },
  ],
};
