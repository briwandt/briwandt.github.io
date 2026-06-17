export const researchReports = [
  {
    id: "identity-at-the-center",
    featured: true,
    title: "Identity at the Center: How AI and Cloud Adoption Are Reshaping Enterprise Attack Surfaces",
    subtitle: "Research Series: Report #1",
    date: "June 2026",
    author: "Brianna Wandt",
    tags: ["Identity", "AI Security", "Cloud Security", "Threat Intelligence", "Research Series"],
    pdfUrl: "/Identity_at_the_Center.pdf",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", // placeholder or abstract graphic link
    summary: "An in-depth analysis of how the convergence of Identity Provider (IdP) infrastructures, cloud migrations, and Agentic AI workflows creates a highly complex, interconnected attack surface. We explore credential harvesting in LLM environments, OAuth token abuse vectors in enterprise integrations, and defensive strategies utilizing zero-trust machine identities.",
    keyFindings: [
      "IdP Pivoting: Attackers are shifting from endpoint compromise to identity provider (IdP) pivoting, exploiting misconfigured SSO and service account policies to gain wide-ranging cloud administration access.",
      "Agentic Identity Gaps: The rapid deployment of Agentic AI workflows introduces dynamic, machine-to-machine API integrations that lack standard OAuth scoping, bypassing traditional human identity boundaries.",
      "AI Pipeline Credential Harvesting: Credential harvesting has evolved to target conversational logs, RAG (Retrieval-Augmented Generation) data ingestion pipelines, and LLM prompt caches.",
      "Machine Identity Defense: Proactive monitoring of machine-to-machine token exchanges and automated rotated credential schemes represents the highest-leverage defensive control in hybrid cloud architectures."
    ],
    tableOfContents: [
      "1. Executive Summary & Core Thesis",
      "2. The Modern Enterprise Attack Surface: Decentralized & AI-Accelerated",
      "3. Identity as the New Perimeter: Bypassing the Endpoint",
      "4. AI Agents: The Rise of Autonomous Machine Identities",
      "5. Case Study: OAuth Session Hijacking in Enterprise SaaS Apps",
      "6. Threat Modeling Agentic RAG Pipelines",
      "7. Strategic Recommendations for Defense-in-Depth & Zero Trust"
    ],
    sources: [
      "CISA Joint Advisory: Detecting and Mitigating Cloud Identity Exploitation (AA24-102A)",
      "OWASP Foundation: Top 10 for Large Language Model Applications v1.1",
      "MITRE ATT&CK Matrix: Enterprise Identity & Cloud Domains",
      "NIST SP 800-207: Zero Trust Architecture Guidelines"
    ]
  },
  {
    id: "agentic-ai-fraud",
    featured: false,
    title: "Agentic AI Fraud in Financial Services",
    subtitle: "Research Series: Report #2",
    date: "Upcoming (Q3 2026)",
    author: "Brianna Wandt",
    tags: ["Agentic AI", "Financial Fraud", "API Security", "Threat Intelligence"],
    summary: "Analyzing the emerging threat landscape of autonomous AI agents interacting with banking APIs. This report outlines fraud mechanics, transaction authorization bypasses, and the requirement for real-time behavioural anomaly detection systems.",
    isTeaser: true
  },
  {
    id: "threat-hunting-llm-abuse",
    featured: false,
    title: "Threat Hunting for LLM Abuse",
    subtitle: "Research Series: Report #3",
    date: "Upcoming (Q4 2026)",
    author: "Brianna Wandt",
    tags: ["Threat Hunting", "LLM Abuse", "Log Analysis", "DFIR"],
    summary: "A practical guide for SOC analysts and threat hunters to identify malicious large language model activities, prompt injection attempts, and intellectual property exfiltration signatures within cloud tenant logs.",
    isTeaser: true
  },
  {
    id: "ai-security-attack-mapping",
    featured: false,
    title: "AI Security ATT&CK Mapping",
    subtitle: "Research Series: Report #4",
    date: "Upcoming (Q1 2027)",
    author: "Brianna Wandt",
    tags: ["MITRE ATT&CK", "Adversarial ML", "Threat Modeling"],
    summary: "Mapping modern AI-specific attack techniques (such as training data poisoning, model evasion, and prompt injection) directly to the MITRE ATT&CK and ATLAS frameworks to establish structured defensive controls.",
    isTeaser: true
  },
  {
    id: "github-exposure-ai-secrets",
    featured: false,
    title: "GitHub Exposure of AI Secrets",
    subtitle: "Research Series: Report #5",
    date: "Upcoming (Q2 2027)",
    author: "Brianna Wandt",
    tags: ["GitHub Scans", "API Secrets", "SSRF", "Supply Chain"],
    summary: "Findings from a global repository scanning campaign targeting leaked OpenAI, HuggingFace, Anthropic, and AWS Bedrock keys, analyzing the downstream impacts on cloud infrastructure and lateral movement.",
    isTeaser: true
  }
];
