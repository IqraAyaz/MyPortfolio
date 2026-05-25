const defaultData = {
  personal: {
    name: "Iqra Ayyaz",
    firstName: "Iqra",https://github.com/IqraAyaz/MyPortfolio/edit/main/src/data/portfolioData.js
    lastName: "Ayyaz",
    tagline: "Crafting beautiful, functional web experiences.",
    bio: "I am a passionate frontend developer with experience in building responsive and user-friendly websites using modern technologies. I craft performant, accessible, and visually stunning web experiences from concept to deployment.",
    email: "simply.iqra3105@gmail.com",
    phone: "+92 335 2226063",
    location: "Lahore, Pakistan",
    whatsapp: "+923352226063",
    profilePhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
    cvUrl: "#",
    roles: ["Frontend Developer", "React Specialist", "UI/UX Enthusiast"],
  },
  social: {
    github: "https://github.com/IqraAyaz",
    linkedin: "linkedin.com/in/iqra-ayyaz",
    // twitter: "https://twitter.com",
    whatsapp: "https://wa.me/923352226063",
  },
  sectionVisibility: {
    about: true,
    skills: true,
    projects: true,
    testimonials: false,
    certificates: true,
    blog: true,
    contact: true,
  },
  stats: [
    { label: "Years Experience", value: "3+" },
    { label: "Projects Completed", value: "7+" },
    { label: "Skills", value: "25+" },
    { label: "Technologies", value: "10+" },
  ],
  education: [
    {
      id: 1,
      degree: "B.Sc. Computer Science",
      institution: "Gift University Gujranwala",
      year: "2024 – 2028",
      description: "Focused on software engineering, algorithms, and human-computer interaction.",
    },
    // {
    //   id: 2,
    //   degree: "Frontend Specialization",
    //   institution: "Meta / Coursera",
    //   year: "2023",
    //   description: "Advanced React patterns, performance optimization, and modern CSS.",
    // },
  ],
  skills: [
    { id: 1,  name: "HTML",        percentage: 97, category: "Frontend" },
    { id: 2,  name: "CSS",         percentage: 93, category: "Frontend" },
    { id: 3,  name: "JavaScript",  percentage: 90, category: "Frontend" },
    { id: 4,  name: "React",       percentage: 88, category: "Frontend" },
    // { id: 5,  name: "Tailwind CSS",percentage: 85, category: "Frontend" },
    { id: 6,  name: "Bootstrap",   percentage: 88, category: "Frontend" },
    // { id: 7,  name: "WordPress",   percentage: 80, category: "Frontend" },
    { id: 8,  name: "Shopify",     percentage: 75, category: "Frontend" },
    // { id: 9,  name: "Node.js",     percentage: 72, category: "Backend" },
    { id: 10, name: "MySQL",       percentage: 78, category: "Backend" },
    { id: 11, name: "PostgreSQL",  percentage: 70, category: "Backend" },
    { id: 12, name: "Git",         percentage: 88, category: "Tools" },
    // { id: 13, name: "Figma",       percentage: 78, category: "Tools" },
    { id: 14, name: "VS Code",     percentage: 95, category: "Tools" },
  ],
  projects: [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A fully-featured e-commerce platform with cart, checkout, and payment integration. Built with React and Node.js backend.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
      tags: ["React", "Node.js", "MongoDB"],
      category: "React",
      liveUrl: "#",
      githubUrl: "#",
      techStack: ["React", "Redux", "Node.js", "Express", "MongoDB", "Stripe"],
    },
    {
      id: 2,
      title: "Portfolio Dashboard",
      description: "An analytics dashboard for tracking portfolio performance with real-time charts and data visualization.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
      tags: ["React", "D3.js"],
      category: "React",
      liveUrl: "#",
      githubUrl: "#",
      techStack: ["React", "D3.js", "Tailwind", "Vite"],
    },
    {
      id: 3,
      title: "Jewelry E-Commerce Store",
      description: "A custom Shopify theme with optimized conversion flows, mobile-first design, and custom section blocks.",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80",
      tags: ["Shopify", "Liquid"],
      category: "Shopify",
      liveUrl: "https://maisondor-store.myshopify.com/",
      githubUrl: "#",
      techStack: ["Shopify", "Liquid", "CSS", "JavaScript"],
    },
    {
      id: 4,
      title: "Blog CMS",
      description: "A custom WordPress theme with full CMS capabilities, SEO optimization, and speed-tuned performance.",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80",
      tags: ["WordPress", "PHP"],
      category: "WordPress",
      liveUrl: "#",
      githubUrl: "#",
      techStack: ["WordPress", "PHP", "MySQL", "CSS"],
    },
    {
      id: 5,
      title: "Task Manager App",
      description: "Minimalist task management app with drag-and-drop, priority sorting, and PostgreSQL persistence.",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80",
      tags: ["JavaScript", "PostgreSQL"],
      category: "JavaScript",
      liveUrl: "#",
      githubUrl: "#",
      techStack: ["Vanilla JS", "Node.js", "PostgreSQL"],
    },
    {
      id: 6,
      title: "Weather App",
      description: "Beautiful weather application with hourly forecasts, geolocation, and animated weather states.",
      image: "https://images.unsplash.com/photo-1504608524841-42584120d693?w=600&q=80",
      tags: ["React", "API"],
      category: "React",
      liveUrl: "#",
      githubUrl: "#",
      techStack: ["React", "OpenWeather API", "Bootstrap"],
    },
  ],
  certificates: [
    {
      id: 1,
      title: "Harvard HSIL Hackathon 2026 Certificate of Participation",
      issuer: "Harvard T.H. Chan School of Public Health",
      date: "Apr 2026",
      // credentialId: "UC-abc123",
      credentialUrl: "#",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
      category: "Frontend",
    },
    {
      id: 2,
      title: "Meta Frontend Developer",
      issuer: "Meta / Coursera",
      date: "Aug 2023",
      credentialId: "META-xyz456",
      credentialUrl: "#",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80",
      category: "Frontend",
    },
    {
      id: 3,
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "Jun 2023",
      credentialId: "AWS-def789",
      credentialUrl: "#",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
      category: "Cloud",
    },
  ],
  testimonials: [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Product Manager @ TechCorp",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
      quote: "Iqra delivered an absolutely stunning redesign of our platform. The attention to detail, the animations, the performance — everything exceeded our expectations. Truly a 10/10 developer.",
      stars: 5,
    },
    {
      id: 2,
      name: "Marcus Williams",
      role: "CEO @ StartupXYZ",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
      quote: "Working with Iqra was a game-changer. She brought our vision to life with pixel-perfect precision and delivered ahead of schedule. Our conversion rate increased by 40% after the redesign.",
      stars: 5,
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Design Lead @ Agency",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
      quote: "The best frontend developer I have collaborated with. Iqra has a rare combination of strong technical skills and genuine design sensibility. Every handoff was seamless.",
      stars: 5,
    },
    {
      id: 4,
      name: "Jordan Lee",
      role: "Founder @ DigitalStudio",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
      quote: "Iqra rebuilt our entire frontend in React and the results were incredible. Faster load times, cleaner code, and a beautiful UI. Would hire again without hesitation.",
      stars: 5,
    },
  ],
  blog: [
    {
      id: 1,
      title: "Building Performant React Apps in 2024",
      date: "Dec 15, 2024",
      readTime: "8 min read",
      excerpt: "Deep-dive into code splitting, lazy loading, and modern React patterns that keep your apps blazing fast even at scale.",
      content: "## Introduction\n\nPerformance is not an afterthought — it is a core feature. In 2024, users expect sub-second load times and buttery smooth interactions. React gives us powerful primitives to achieve this, but only if we use them right.\n\n## Code Splitting\n\nThe first and most impactful technique is code splitting with React.lazy and Suspense. Instead of shipping your entire app in one bundle, split it by route or feature.\n\nThis alone can reduce your initial bundle size by 40 to 60 percent.\n\n## Memoization Patterns\n\nUse useMemo and useCallback surgically — not everywhere. Profile first with React DevTools to identify actual bottlenecks. Over-memoization adds complexity without benefit.\n\n## Virtual Lists\n\nRendering 10,000 rows? Use react-window or react-virtual. Only render what is visible — the rest is pure DOM waste.\n\n## Image Optimization\n\nLazy load images with the native loading attribute. Use next-gen formats like WebP and AVIF. Serve correctly sized images with srcset.\n\n## Conclusion\n\nPerformant React comes from understanding the rendering model, measuring before optimizing, and applying the right tool to the right problem. Start with code splitting, measure, then go deeper.",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
      url: "#",
      tags: ["React", "Performance", "JavaScript"],
    },
    {
      id: 2,
      title: "The Art of CSS Grid Layouts",
      date: "Nov 28, 2024",
      readTime: "6 min read",
      excerpt: "Mastering CSS Grid to create complex, responsive layouts that look stunning on every screen size without a single media query hack.",
      content: "## Why CSS Grid?\n\nCSS Grid is the most powerful layout system available in CSS. It works in two dimensions — rows AND columns simultaneously — unlike Flexbox which is one-dimensional.\n\n## The Core Concepts\n\nA grid container establishes a grid formatting context for its contents. The grid-template-columns property defines column tracks, and gap controls spacing between them.\n\nUsing repeat with auto-fill and minmax creates a fully responsive grid with zero media queries.\n\n## Named Grid Areas\n\nOne of Grid's killer features is named template areas. You can visually describe your layout in CSS, then assign elements to named regions. It makes complex page structures readable and maintainable.\n\n## Subgrid\n\nSubgrid, now supported in all modern browsers, lets child elements participate in the parent grid tracks. This solves the classic card alignment problem elegantly — all card content lines up across columns without JavaScript.\n\n## Auto-placement Algorithm\n\nGrid's auto-placement algorithm fills gaps intelligently. Combined with grid-auto-flow dense, you can create masonry-like layouts that fill available space automatically.\n\n## Conclusion\n\nCSS Grid, combined with modern tooling, makes layouts that used to require JavaScript frameworks trivially achievable in pure CSS. Master it and your layout code becomes dramatically simpler.",
      thumbnail: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80",
      url: "#",
      tags: ["CSS", "Layout", "Design"],
    },
    {
      id: 3,
      title: "Framer Motion: Beyond the Basics",
      date: "Nov 10, 2024",
      readTime: "10 min read",
      excerpt: "Advanced animation patterns in Framer Motion — orchestrating complex sequences, shared layout animations, and scroll-driven effects.",
      content: "## Why Framer Motion?\n\nFramer Motion is the gold standard for React animations. It is declarative, performant, and handles the hard stuff — interruptions, layout animations, gestures — automatically.\n\n## Orchestration with Variants\n\nVariants let you coordinate animations across an entire component tree. You define named animation states on a parent, and children automatically inherit and stagger their transitions. A parent set to show triggers each child item to animate in sequence with zero extra code.\n\n## Shared Layout Animations\n\nThe layoutId prop creates magical morphing transitions between elements in different positions or even different components. Move an element from a list into a modal — Framer Motion handles the FLIP animation automatically, calculating the position delta and animating smoothly between them.\n\n## Scroll-Driven Effects\n\nuseScroll combined with useTransform enables parallax effects, scroll progress bars, and sticky animations tied directly to scroll position. The motion values update efficiently without causing React re-renders.\n\n## Gesture Animations\n\nFramer Motion's gesture props — whileHover, whileTap, whileDrag — make interactive animations trivial. Combine them with spring physics for natural-feeling micro-interactions.\n\n## Exit Animations\n\nAnimatePresence enables exit animations for components being unmounted — something React cannot do natively. Wrap any conditional render and add an exit prop to get smooth out-transitions.\n\n## Conclusion\n\nThe key to great Framer Motion work is restraint. Use animation to guide attention and communicate state changes — not for pure decoration. When used thoughtfully, motion transforms a good UI into a memorable experience.",
      thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
      url: "#",
      tags: ["Animation", "React", "Framer Motion"],
    },
  ],
  heroImages: [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80",
    "https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?w=1600&q=80",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&q=80",
  ],
};

export const getPortfolioData = () => {
  try {
    const saved = localStorage.getItem("portfolioData");
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...defaultData,
        ...parsed,
        personal: { ...defaultData.personal, ...parsed.personal },
        social: { ...defaultData.social, ...parsed.social },
        sectionVisibility: { ...defaultData.sectionVisibility, ...parsed.sectionVisibility },
      };
    }
  } catch (e) {}
  return defaultData;
};

export const savePortfolioData = (data) => {
  try {
    localStorage.setItem("portfolioData", JSON.stringify(data));
  } catch (e) {
    console.warn("localStorage quota exceeded — clear base64 images from storage.");
  }
};

export const resetPortfolioData = () => {
  localStorage.removeItem("portfolioData");
  return defaultData;
};

export default defaultData;
