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
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
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
    id: "beyond-credential-theft",
    featured: false,
    title: "Beyond Credential Theft: Infostealers, SaaS Compromise, and AI-Orchestrated Intrusion Campaigns",
    subtitle: "Research Series: Report #2",
    date: "April 2026",
    author: "Brianna Wandt",
    tags: ["Infostealers", "SaaS Compromise", "AI Intrusion", "Cloud Security", "Threat Intelligence"],
    pdfUrl: "/Beyond_Credential_Theft.pdf",
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
    summary: "Analyzing the technical mechanics of modern info-stealing malware (Lumma, EDDIESTEALER, StealC) and how threat actors use harvested sessions, OAuth tokens, and non-human identities (NHIs) to pivot from endpoint compromise to SaaS and cloud environments.",
    keyFindings: [
      "Token Harvesting: Modern infostealers target active session tokens, browser cookies, and service account configs rather than raw static passwords.",
      "MFA Bypass: Session replay and ConsentFix OAuth abuse allow threat actors to bypass Multi-Factor Authentication (MFA) check gates completely.",
      "LLMjacking: Compromised API credentials are rapidly exploited within minutes for unauthorized AI compute cycles and data mining.",
      "Supply-Chain Abuse: Actors target Model Context Protocol (MCP) integrations, CI/CD systems, and developer browser extensions to gain persistent access."
    ],
    tableOfContents: [
      "1. Executive Summary & Context",
      "2. Evolution & Technical Mechanisms of Modern Infostealers",
      "3. Delivery Techniques: ClickFix, Malvertising, & Social Engineering",
      "4. The AI-Enabled Cloud Intrusion Lifecycle",
      "5. Non-Human Identities & Identity Replay in Cloud Environments",
      "6. Weaponizing the AI Developer Toolchain (MCP Boundaries)",
      "7. Real-World Incident Case Studies (Snowflake, Vercel, Context.ai)",
      "8. Detection, Monitoring, & Hardening Strategies"
    ],
    sources: [
      "Vectra AI: Infostealers & Scale of Credential Theft (2025)",
      "Microsoft: Digital Defense Report (2025)",
      "Entro Labs: LLMjacking & Non-Human Identity Abuse (2025)",
      "Recorded Future: Behind the Curtain of Lumma (2025)"
    ]
  },
  {
    id: "agent-tesla-malware-analysis",
    featured: false,
    title: "Agent Tesla-Style Malware Loader Analysis",
    subtitle: "Malware Analysis Report",
    date: "April 2026",
    author: "Brianna Wandt",
    tags: ["Malware Analysis", "Agent Tesla", "Reverse Engineering", "YARA Signatures", "DFIR"],
    pdfUrl: "/Agent_Tesla_Malware_Loader_Analysis.pdf",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    summary: "A detailed malware triage and reverse engineering analysis of an obfuscated 64-bit .NET loader containing Agent Tesla-style information-stealing capabilities, Costura packing, and XVM runtime virtualization.",
    keyFindings: [
      "Costura Compression: The malware uses the Costura framework to compress and embed dependent assemblies inside resources.",
      "In-Memory Reflection: Runtime assembly loading is executed in memory via reflection (Assembly.Load), leaving no disk footprints.",
      "Defense Evasion: Advanced evasion features include XVM runtime virtualization, malformed IL code, and anti-debugging.",
      "Sandbox Detection: The sample implements sandbox awareness and self-terminates immediately when running in VM environments."
    ],
    tableOfContents: [
      "1. Executive Summary & Hash Details",
      "2. High-Level Technical Summary",
      "3. Malware Architecture & Costura Compression",
      "4. Malware Execution Flow & Stages",
      "5. Advanced Static Analysis (dnSpy & Cutter)",
      "6. Runtime Unpacking & Memory Analysis (OllyDumpEx)",
      "7. Indicators of Compromise (Network & Host)",
      "8. Rules & Signatures (YARA & MITRE Mapping)"
    ],
    sources: [
      "CrowdStrike: Agent Tesla Threat Actor Research",
      "Microsoft: Threat Intelligence Lures & Evasions",
      "SentinelOne: Obfuscated .NET Loader Analysis",
      "SANS Institute: Practical Malware Analysis & Triage Handbook"
    ]
  },
  {
    id: "ai-security-attack-mapping",
    featured: false,
    title: "AI Security ATT&CK Mapping",
    subtitle: "Research Series: Report #4",
    date: "Upcoming (Q4 2026)",
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
    date: "Upcoming (Q1 2027)",
    author: "Brianna Wandt",
    tags: ["GitHub Scans", "API Secrets", "SSRF", "Supply Chain"],
    summary: "Findings from a global repository scanning campaign targeting leaked OpenAI, HuggingFace, Anthropic, and AWS Bedrock keys, analyzing the downstream impacts on cloud infrastructure and lateral movement.",
    isTeaser: true
  }
];
