export type ResourceType = "pdf" | "video" | "link" | "graphic"

export interface Resource {
  id: string
  title: string
  type: ResourceType
  url: string
  thumbnail: string
  summary: string
  tags: string[]
  dateAdded: string
  author?: string
  year?: number // Publication year
  localPath?: string // For locally uploaded PDFs (temporary, local only)
  ratingSum?: number // Sum of all user ratings
  ratingCount?: number // Number of ratings
  userRating?: number // Current user's rating (1-4)
}

export const resources: Resource[] = [
  {
    id: "1770261005383-vdd1lm1n2",
    title: "AI literacy for users – A comprehensive review and future research",
    type: "pdf",
    url: "https://drive.google.com/file/d/1NGgll3JQWj8Sxte_eMl2dVFu8OyEDWxB/view?usp=sharing",
    thumbnail: "https://invite.illinois.edu/pdf-thumbnail.jpg",
    summary: "The rapid advancement of artificial intelligence (AI) has brought transformative changes to various aspects of human life, leading to an exponential increase in the number of AI users. The broad access and usage of AI enable immense benefits but also give rise to significant challenges. One way for AI users to address these challenges is to develop AI literacy, referring to human proficiency in different subject areas of AI that enable purposeful, efficient, and ethical usage of AI technologies. This study aims to comprehensively understand and structure the research on AI literacy for AI users through a systematic, scoping literature review. Therefore, we synthesize the literature, provide a conceptual framework, and develop a research agenda. Our review paper holistically assesses the fragmented AI literacy research landscape (68 papers) while critically examining its specificity to different user groups and its distinction from other technology literacies, exposing that research efforts are partly not well integrated. We organize our findings in an overarching conceptual framework structured along the learning methods leading to, the components constituting, and the effects stemming from AI literacy. Our research agenda – oriented along the developed conceptual framework – sheds light on the most promising research opportunities to prepare AI users for an AI-powered future of work and society.",
    tags: ["Ai Literacy", "Ai Principles", "User Research"],
    dateAdded: "2026-02-05",
    author: "Pinski and Benlian",
    year: 2024,
  },
  {
    id: "1770255395555-ucoysd3n1",
    title: "Human-Centered Design Taxonomy Case Study",
    type: "pdf",
    url: "https://drive.google.com/file/d/1pVW3BAJnahworo2kvt93_48iYcgyBEJg/view?usp=sharing",
    thumbnail: "https://invite.illinois.edu/pdf-thumbnail.jpg",
    summary: "The Human-Centered Design approach we'll be using.",
    tags: ["Examples", "Prototyping", "User Research"],
    dateAdded: "2026-02-05",
    author: "Lawrence et al",
    year: 2024,
  },
  {
    id: "1770169869598-4ob0rq04e",
    title: "Figma Animation Tutorials",
    type: "video",
    url: "https://www.youtube.com/playlist?list=PLBblYKb7F1vr1EOc_ber1cuYpjmefGZZx",
    thumbnail: "https://i.ytimg.com/vi/m89q-wXm3mI/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCc34XPQiUiU-WeNb2GR7yjscY2vw&days_since_epoch=20488",
    summary: "Find descriptions of animations to use when vibe coding among these tutorials.\n\nIn this playlist, you'll find all the prototyping, micro-interactions and animation I have done using Figma",
    tags: ["Prototyping", "Figma", "Tutorial", "Examples", "Vibe Coding"],
    dateAdded: "2026-02-04",
    author: "YouTube",
    year: 2026,
  },
  {
    id: "1770142286776-675gzd3sk",
    title: "The Prompt Report: A Systematic Survey of Prompt Engineering Techniques",
    type: "pdf",
    url: "https://drive.google.com/file/d/1WCm_R5A5X1xo8lG7hKAcoNrWx3AmwGIh/view?usp=sharing",
    thumbnail: "https://invite.illinois.edu/pdf-thumbnail.jpg",
    summary: "Generative Artificial Intelligence (GenAI) systems are increasingly being deployed across diverse industries and research domains. Developers and end-users interact with these systems through the use of prompting and prompt engineering. Although prompt engineering is a widely adopted and extensively researched area, it suffers from conflicting terminology and a fragmented ontological understanding of what constitutes an effective prompt due to its relatively recent emergence. We establish a structured understanding of prompt engineering by assembling a taxonomy of prompting techniques and analyzing their applications. We present a detailed vocabulary of 33 vocabulary terms, a taxonomy of 58 LLM prompting techniques, and 40 techniques for other modalities. Additionally, we provide best practices and guidelines for prompt engineering, including advice for prompting engineering ChatGPT and other state-of-the-art (SOTA) LLMs. We further present a meta-analysis of the entire literature on natural language prefix-prompting. As a culmination of these efforts, this paper presents the most comprehensive survey on prompt engineering to date.",
    tags: ["Prompting Techniques", "LLM", "Multimodal Ai"],
    dateAdded: "2026-02-03",
    author: "Several Universities",
    year: 2025,
    ratingSum: 3,
    ratingCount: 1,
    userRating: 3,
  },
  {
    id: "1770142134882-i93knyox0",
    title: "Vibe Coding Fundamentals in 19 Minutes With Emergent AI",
    type: "video",
    url: "https://youtu.be/sdH7YPAmHes",
    thumbnail: "https://img.youtube.com/vi/sdH7YPAmHes/maxresdefault.jpg",
    summary: "In this video, I build a fully functional SaaS-style web app from scratch using vibe coding—no traditional coding required. I walk through creating a production-ready tool with real integrations like LLMs for text, Nano Banana Pro for image generation, and Stripe for payments, all wrapped in a polished, modern UI. You'll see how Emergent's agentic vibe coding system plans, builds, tests, and debugs the app through simple prompts, plus best practices for writing effective prompts, iterating on features, and fixing issues efficiently. This serves both as a full build demo and a practical vibe coding tutorial you can apply to your own projects.",
    tags: ["Vibe Coding", "Tutorial", "Prompting Techniques"],
    dateAdded: "2026-02-03",
    author: "Futurepedia",
    year: 2025,
  },
  {
    id: "1770142087124-su7qw9jzf",
    title: "Every AI Coding Platform Has a Prompting Guide, You Only Need One",
    type: "link",
    url: "https://buildtolaunch.substack.com/p/complete-guide-to-prompting-ai-coding-tools",
    thumbnail: "https://substackcdn.com/image/fetch/$s_!DBpi!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F74c34ce3-9a52-4a30-915a-cad8342088d7_1536x1024.png",
    summary: "Most prompt engineering advice is overcomplicated. The platforms emphasize their unique features, but when you strip away the marketing, they're all telling you the same thing in different words.\n\nThat means you don't need to learn nine different prompting systems. You need to master one and adapt as you go.",
    tags: ["Vibe Coding", "Tutorial", "Methodology"],
    dateAdded: "2026-02-03",
    author: "Jenny Ouyang",
    year: 2026,
  },
  {
    id: "1770141965765-ax87zqein",
    title: "Thematic Analysis with ChatGPT - full analysis from Codes to Themes",
    type: "video",
    url: "https://youtu.be/woJ2ztlkWPk",
    thumbnail: "https://img.youtube.com/vi/woJ2ztlkWPk/maxresdefault.jpg",
    summary: "I explain how to analyse Qualitative data with ChatGPT, and how to make sure that the analysis is credible, valid, ethical, and academic. We ensure that by keeping audit trail and breaking the analysis down into stages (Initial, Open coding - Focused, Axial coding - Theme development). You can also do Braun and Clarke's 6 step approach this way, and you can use any AI (large language model) like Claude or Gemini to do this data analysis",
    tags: ["User Research", "Tutorial", "Chatgpt", "LLM", "Data Analysis", "Qualitative Methods", "Xai"],
    dateAdded: "2026-02-03",
    author: "Dr Kriukow",
    year: 2025,
  },
  {
    id: "1770141888181-rv81e4qc0",
    title: "Data Plus Theory Equals Codebook: Leveraging LLMs for Human-AI Code- book Development",
    type: "pdf",
    url: "https://drive.google.com/file/d/1BLBwoZHEsSyigJlFdj9Y6-MH5RTBPH8X/view?usp=sharing",
    thumbnail: "https://invite.illinois.edu/pdf-thumbnail.jpg",
    summary: "Recent research has explored the use of Large Language Models (LLMs) to develop qualitative codebooks, mainly for inductive work with large datasets, where manual review is impractical. Although these efforts show promise, they often neglect the theoretical grounding essential to many types of qualitative analysis. This paper investigates the potential of GPT-4o to support theory-informed codebook development across two educational contexts. In the first study, we employ a three-step approach—drawing on Winne & Hadwin's and Zimmerman's Self-Regulated Learning (SRL) theories, think-aloud data, and human refinement—to evaluate GPT-4o's ability to generate high-quality, theory-aligned codebooks. Results indicate that GPT-4o can effectively leverage its knowledge base to identify SRL constructs reflected in student problem-solving behavior. In the second study, we extend this approach to a STEM game-based learning context guided by Hidi & Renninger's four-phase model of Interest Development. We compare four prompting strategies: No theories provided, theories named, full references given, and full-text theory papers supplied. Human evaluations show that naming the theory without including full references produced the most practical and usable codebook, while supplying full papers to the prompt enhanced theoretical alignment but reduced applicability. These findings suggest that GPT-4o can be a valuable partner in theory-driven qualitative research when grounded in well-established frameworks, but that attention to prompt design is required. Our results show that widely available foundation models—trained on large-scale open web and licensed datasets—can effectively distill established educational theories to support qualitative research and codebook development. The code for our codebook development process and all the employed prompts and codebooks produced by GPT are available for replication purposes at: https://osf.io/g3z4x",
    tags: ["User Research", "LLM", "Data Analysis", "Qualitative Methods", "Examples"],
    dateAdded: "2026-02-03",
    author: "Zambrano et al.",
    year: 2026,
  },
  {
    id: "1770141793381-fuwxxf9e3",
    title: "Exploring Differences Between Hybrid GPT-Human and Human-Created Qualitative Codebooks in an Educational Game",
    type: "pdf",
    url: "https://drive.google.com/file/d/18xMWDwbkafH6rgD39vgTi1LMNATnyK5o/view?usp=sharing",
    thumbnail: "https://invite.illinois.edu/pdf-thumbnail.jpg",
    summary: "This study explores the ability of GPT-4 working together with humans to generate a codebook to analyze scientific observations from middle school learners in the What-if Hypothetical Implementations in Minecraft (WHIMC) project. It compares this Hybrid codebook to one fully developed by Humans using a variety of techniques to evaluate how the codes developed by each approach relate to one another and to external measures of student interest. Results show that the Hybrid GPT-Human codes consist of broader categories that align more consistently with the external interest metrics, whereas the Human codes offer finer-grained insights into specific student behaviors. However, the complementary insights offered by each suggest that combining both approaches could improve our understanding of student engagement and inform more effective strategies in educational game design and intervention.",
    tags: ["User Research", "LLM", "Data Analysis", "Qualitative Methods"],
    dateAdded: "2026-02-03",
    author: "Liu et al",
    year: 2025,
  },
  {
    id: "1770141711433-6dyc88txf",
    title: "Accelerating Research with Synthetic Users",
    type: "video",
    url: "https://youtu.be/sW42UxpEs00",
    thumbnail: "https://img.youtube.com/vi/sW42UxpEs00/maxresdefault.jpg",
    summary: "In this talk, you'll explore the fast-emerging world of synthetic users—realistic, AI-powered personas you can create, interview, and learn from instantly. While they don't replace human-based research, they are a new essential augmentation to your research practice. Whether you're exploring ideas, testing early concepts, or building alignment across teams, synthetic users offer a scalable, low-risk way to accelerate your work. You'll leave this session with practical techniques you can apply immediately—even while you're watching. Synthetic users are a new, and often, controversial tool in AI-driven research. But if you're not exploring this space, you're missing a critical advantage in today's evolving research landscape.",
    tags: ["User Research", "Tutorial", "Personas", "Synthetic Data"],
    dateAdded: "2026-02-03",
    author: "UX Researchers' Guild",
    year: 2025,
  },
  {
    id: "1770141678457-oa54g3tec",
    title: "The New Playbook for Innovation: Stingray Model - Net Group",
    type: "link",
    url: "https://netgroup.com/blog/stingray-model/",
    thumbnail: "https://netgroup.com/wp-content/uploads/2025/01/Stingray-Model-Cover.png",
    summary: "Explore how the Stingray Model leverages AI innovation to streamline processes, enhance ROI, and turn ambitious ideas into reality for any team.",
    tags: ["Methodology", "User Research", "Synthetic Data"],
    dateAdded: "2026-02-03",
    author: "Net Group",
  },
  {
    id: "1770141652410-t9pf71dia",
    title: "But what is a neural network? | Deep learning chapter 1",
    type: "video",
    url: "https://youtu.be/aircAruvnKk?list=PLWV_-b7p7_7BqN6XQXSVDkXzDBiCyCJqa",
    thumbnail: "https://img.youtube.com/vi/aircAruvnKk/maxresdefault.jpg",
    summary: "What are the neurons, why are there layers, and what is the math underlying it?",
    tags: ["Ai Principles"],
    dateAdded: "2026-02-03",
    author: "3Blue1Brown",
    year: 2017,
  },
  {
    id: "1770141522998-ev3iex64f",
    title: "Transformers, the tech behind LLMs | Deep Learning Chapter 5",
    type: "video",
    url: "https://www.youtube.com/watch?v=wjZofJX0v4M",
    thumbnail: "https://img.youtube.com/vi/wjZofJX0v4M/maxresdefault.jpg",
    summary: "Breaking down how Large Language Models work, visualizing how data flows through.",
    tags: ["LLM", "Ai Principles"],
    dateAdded: "2026-02-03",
    author: "3Blue1Brown",
    year: 2024,
  },
  {
    id: "1770141463636-zod4r4l0f",
    title: "Assigning AI: Seven Ways of Using AI in Class",
    type: "link",
    url: "https://www.oneusefulthing.org/p/assigning-ai-seven-ways-of-using",
    thumbnail: "https://substackcdn.com/image/fetch/$s_!EIf_!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5ff002bc-7dfd-4c76-8acb-b0d4eef750e8_1376x864.png",
    summary: "In the paper, we actually discuss seven different ways to use AI in classrooms: AI-tutor, for increasing knowledge, AI-coach for increasing metacognition, AI-mentor to provide balanced, ongoing feedback, AI-teammate to increase collaborative intelligence, AI-tool for extending student performance, AI-simulator to help with practice, and AI-student to check for understanding. You can see them in the table, but I want to focus on two of these in this post. One that is easy to incorporate into school or work, but also a preview of the most risky, and potentially transformative, approach.",
    tags: ["Prompting Methods", "LLM", "Evaluation"],
    dateAdded: "2026-02-03",
    author: "Ethan Mollick",
  },
  {
    id: "1770141391181-i2k6kcagg",
    title: "Making Omnichannel Continuous Discovery with AI - Interview with Jeff Erickson, Viable | AI 4 UX",
    type: "video",
    url: "https://youtu.be/71wiuoFRd-Y",
    thumbnail: "https://img.youtube.com/vi/71wiuoFRd-Y/maxresdefault.jpg",
    summary: "In this installment of AI for UX, we sit down with Jeff Erickson, Co-Founder and Chief Product Officer of Viable. We discuss the combination of analyzing many customer data sources with innovative data collection techniques including automating the interview process to gather rich, qualitative data more efficiently at scale.",
    tags: ["User Research", "Data / Quantitative", "Qualitative Methods", "Examples"],
    dateAdded: "2026-02-03",
    author: "Brilliant Experience",
    year: 2024,
  },
  {
    id: "1770141314412-nm24bs0nk",
    title: "Make UX Research Faster with AI: AI for UX with Max Fergus, UserCue",
    type: "video",
    url: "https://www.youtube.com/watch?v=BL0qKDvg8XI",
    thumbnail: "https://img.youtube.com/vi/BL0qKDvg8XI/maxresdefault.jpg",
    summary: "In this installment of AI 4 UX, we sit down with Max Fergus, the CEO of UserCue. He talks with us all about future of UX research and how UserCue offers dynamic AI moderated interviews and analysis at scale.",
    tags: ["User Research", "Qualitative Methods", "Interviews", "Examples"],
    dateAdded: "2026-02-03",
    author: "Brilliant Experience",
    year: 2024,
  },
  {
    id: "1770141236033-epxs9zyes",
    title: "7 AI Skills You Need NOW for 2026",
    type: "video",
    url: "https://youtu.be/kHD3M_9uMs4",
    thumbnail: "https://img.youtube.com/vi/kHD3M_9uMs4/maxresdefault.jpg",
    summary: "Learn the 7 essential ai skills you need to master in 2026 to stay ahead in your work and business. This comprehensive AI tutorial covers how to reduce AI hallucinations and leverage the LLM Council method for better results, focusing on next generation skills like ai automation and ai workflows to futureproof yourself. Mastering these techniques and adopting adaptive thinking will help you leverage AI more effectively for content creation, business automation, and creative work.",
    tags: ["Tutorial", "Ai Literacy"],
    dateAdded: "2026-02-03",
    author: "Futurepedia",
    year: 2026,
  },
  {
    id: "1770141205170-rexx8koqj",
    title: "How to Use NotebookLM Better than 99% of People",
    type: "video",
    url: "https://youtu.be/OdCmZvPdr4s",
    thumbnail: "https://img.youtube.com/vi/OdCmZvPdr4s/maxresdefault.jpg",
    summary: "In this video, I'm giving you the complete NotebookLM masterclass—everything you need to go from beginner to expert. NotebookLM is hands down the most underrated AI tool out there, and most people have no idea what it's actually capable of. I'll walk you through the entire interface, show you how to build research notebooks with cited sources that eliminate hallucinations, demonstrate every Studio Panel feature (podcasts, infographics, slide decks, and more), reveal how to connect it all to Gemini for custom AI assistants, and share creative use cases that go way beyond just research and learning. Whether you're using it for work, personal projects, or just trying to learn something new, this guide will show you how to unlock the full power of NotebookLM.",
    tags: ["Tutorial", "Research", "RAG", "Information Stream"],
    dateAdded: "2026-02-03",
    author: "Futurepedia",
    year: 2026,
  },
  {
    id: "1770141153067-o7ksn8ccb",
    title: "Google AI Studio: From Prompt to Prototype",
    type: "video",
    url: "https://www.youtube.com/playlist?list=PLIivdWyY5sqIagw3_50GeVHIwcUoOwTa7",
    thumbnail: "https://img.youtube.com/vi/placeholder/maxresdefault.jpg",
    summary: "You'll get a crash course on AI Studio's awesome features, master the art of crafting prompts that actually work, and explore the mind-blowing world of multimodal AI. Think image and video analysis, real-time streaming, and more right at your fingertips! You'll learn how to build a real, working AI-powered app from scratch and get set up with API keys so you can deploy your own creations to the world.",
    tags: ["Prototyping", "Gemini", "Tutorial", "Vibe Coding"],
    dateAdded: "2026-02-03",
    author: "Google Cloud Tech",
    year: 2025,
  },
  {
    id: "1770141088749-8g63h9h66",
    title: "Cognimates Copilot - AI Assistant for Kids' Scratch Programming",
    type: "link",
    url: "https://cognimates-copilot.replit.app/#demo",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
    summary: "No description provided.",
    tags: ["Examples", "Block Code", "Learning Environment"],
    dateAdded: "2026-02-03",
    author: "Cognimates",
    year: 2025,
  },
  {
    id: "1770141041037-vleztz459",
    title: "The Hybrid Builder | LinkedIn",
    type: "link",
    url: "https://www.linkedin.com/newsletters/the-hybrid-builder-7343716216856858624/",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
    summary: "BuidToLearn and LearnToBuild —co-created with AI - a newsletter / blog mostly about things Claude can do",
    tags: ["Tutorial", "Claude", "Skills", "Vibe Coding"],
    dateAdded: "2026-02-03",
    author: "Vishal Sachdev",
    year: 2026,
  },
  {
    id: "1770140996624-r3mnxk9t9",
    title: "Midjourney Video: My FULL Course (15 Lessons)",
    type: "video",
    url: "https://www.youtube.com/watch?v=Dkj7Jqejfz0&list=PLWV26Jk6VfmSt2cmvDDZzv96BN1okWP6Y",
    thumbnail: "https://img.youtube.com/vi/Dkj7Jqejfz0/maxresdefault.jpg",
    summary: "How to create video with Midjourney",
    tags: ["Midjourney", "Tutorial", "Multimodal Ai"],
    dateAdded: "2026-02-03",
    author: "Future Tech Pilot",
    year: 2025,
  },
  {
    id: "1770140965509-pa9q7al9w",
    title: "The ULTIMATE Beginners Guide to Midjourney in 2025",
    type: "video",
    url: "https://youtu.be/vUj4VNXXC1c",
    thumbnail: "https://img.youtube.com/vi/vUj4VNXXC1c/maxresdefault.jpg",
    summary: "A guide to creating images with Midjourney",
    tags: ["Midjourney", "Tutorial", "Multimodal Ai"],
    dateAdded: "2026-02-03",
    author: "Future Tech Pilot",
    year: 2025,
  },
  {
    id: "1770106402761-hir6gff5j",
    title: "Four Principles of Explainable Artificial Intelligence",
    type: "pdf",
    url: "https://drive.google.com/file/d/1HT12NnDKsF4pKK1PLCnoWHM-BnNJarvM/view?usp=sharing",
    thumbnail: "https://invite.illinois.edu/pdf-thumbnail.jpg",
    summary: "We introduce four principles for explainable artificial intelligence (AI) that comprise fundamental properties for explainable AI systems. We propose that explainable AI systems deliver accompanying evidence or reasons for outcomes and processes; provide explanations that are understandable to individual users; provide explanations that correctly reflect the system's process for generating the output; and that a system only operates under conditions for which it was designed and when it reaches sufficient confidence in its output. We have termed these four principles as explanation, meaningful, explanation accuracy, and knowledge limits, respectively. Through significant stakeholder engagement, these four principles were developed to encompass the multidisciplinary nature of explainable AI, including the fields of computer science, engineering, and psychology. Because one-sizefits-all explanations do not exist, different users will require different types of explanations. We present five categories of explanation and summarize theories of explainable AI. We give an overview of the algorithms in the field that cover the major classes of explainable algorithms. As a baseline comparison, we assess how well explanations provided by people follow our four principles. This assessment provides insights to the challenges of designing explainable AI systems.",
    tags: ["Xai", "Methodology", "Ai Literacy", "Ai Principles"],
    dateAdded: "2026-02-03",
    author: "NIST",
    year: 2021,
  },
]

// Base popular tags are now dynamically generated from actual resource tags

export interface TagWithCount {
  tag: string
  count: number
}

// Get popular tags - generated from actual tags used in the library, sorted by frequency
// Only returns tags with more than 3 items
export const getPopularTags = (resourceList: Resource[] = resources, limit: number = 20): TagWithCount[] => {
  // Count tag frequency in resources
  const tagCounts: Record<string, number> = {}
  resourceList.forEach(resource => {
    resource.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })
  
  // Filter tags with more than 3 items, sort by frequency and return top tags
  return Object.entries(tagCounts)
    .filter(([_, count]) => count > 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag, count]) => ({ tag, count }))
}
