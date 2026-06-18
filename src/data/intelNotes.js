export const intelNotes = [
  {
    id: "chatgphish-recommendation-poisoning",
    title: "ChatGPhish and AI Recommendation Poisoning",
    date: "June 15, 2026",
    category: "AI Security",
    readingTime: "3 min read",
    summary: "How threat actors poison web indices to trick LLMs and coding assistants into recommending malicious dependencies.",
    content: `AI Recommendation Poisoning represents a silent, highly effective supply-chain attack vector. As developers increasingly rely on LLM coding assistants (like Copilot, Cursor, or Gemini) and AI-driven search engines for package recommendations, the incentive for threat actors to manipulate these models rises.

Rather than trying to hack the model weights directly, attackers exploit the training pipelines and real-time search capabilities of these tools. By publishing blog posts, GitHub issues, stack traces, and forums filled with repeated praise and references to a typosquatted, malicious dependency, attackers "poison" the context space. 

When a developer subsequently queries an assistant (e.g., "What is the best library for parsing custom configurations in React?"), the LLM integrates these poisoned results and confidently recommends the malicious package. Because developers trust the AI's recommendations, they bypass standard scrutiny and copy-paste the package install commands, leading to silent network compromise.`
  },
  {
    id: "deepfake-identity-risks",
    title: "Deepfake Risks for Remote Identity Verification",
    date: "June 8, 2026",
    category: "Identity Security",
    readingTime: "4 min read",
    summary: "Analyzing the capability of real-time deepfake injection tools to bypass automated KYC and document liveness checks.",
    content: `Remote identity verification systems (KYC) that rely on selfie uploads and "liveness checks" (e.g., blinking, nodding, or saying a phrase) are facing a severe threat from real-time generative video models. 

Threat actors are now utilizing virtual camera drivers and local deepfake software (such as DeepFaceLive) to hijack webcam streams. During a live onboarding verification process, the software swaps the attacker's facial movements onto a high-resolution image of a stolen identity document holder in real time. 

Current automated liveness algorithms often fail to detect these injected streams because the video stream contains natural blinks and movement. To mitigate this risk, enterprise identity systems must move away from remote video checks as a primary anchor of trust, shifting toward hardware-bound cryptographic keys (e.g., FIDO2/WebAuthn) and federated government digital identities.`
  },
  {
    id: "oauth-abuse-enterprise-saas",
    title: "OAuth Consent Phishing & Enterprise SaaS Abuse",
    date: "June 1, 2026",
    category: "Cloud Security",
    readingTime: "3 min read",
    summary: "Why attackers are shifting from credential harvesting to malicious OAuth applications to maintain persistent SaaS access.",
    content: `Multi-factor authentication (MFA) has successfully made traditional password-based attacks harder. In response, modern threat actors have shifted their focus to Session Hijacking and OAuth Consent Phishing. 

Instead of hosting a fake login form to steal a password, attackers build a malicious multi-tenant SaaS application (e.g., hosted on Azure or Google Cloud) and register it with scopes like "Mail.Read", "Files.ReadWrite", or "Offline_Access". They then phish the target employee with a link prompting them to grant permissions to the application. 

Once the victim clicks "Accept", the app receives an authorization code which it exchanges for OAuth access and refresh tokens. The attacker now has persistent, programmatic access to the user's corporate data. Because no credentials were changed, password resets and traditional MFA prompts will not lock the attacker out. Defensive teams must actively monitor consent logs and restrict OAuth application installation rights to admins.`
  },
  {
    id: "ai-agents-machine-identities",
    title: "Agentic AI Runtimes & The Machine Identity Problem",
    date: "May 25, 2026",
    category: "Threat Intelligence",
    readingTime: "4 min read",
    summary: "The security implications of deploying autonomous AI agents with static API keys in enterprise environments.",
    content: `The rapid adoption of Agentic AI systems that can autonomously plan, write code, search the web, and execute actions has created a massive influx of machine identities. These agents act on behalf of human users, but they operate as services running in containers or serverless runtimes.

To perform actions (e.g., querying databases, updating CRM records, or committing code), these agents are provisioned with powerful API tokens and service account secrets. Too often, developers hardcode these credentials into environment files, pass them in plaintext across RAG prompts, or log them in system execution histories.

Threat intelligence teams have observed threat actors actively scanning developer repositories and prompt histories specifically targeting LangChain and AutoGPT configuration files. Because these machine-to-machine APIs rarely support MFA, compromised API keys grant attackers immediate access to core enterprise assets. Securing this space requires establishing Zero-Trust machine identity lifecycle management, with short-lived tokens and strict IP fencing.`
  }
];
