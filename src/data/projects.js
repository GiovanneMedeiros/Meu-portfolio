import fileConverterWebImage from "../../assets/projects/file-converter-web.png";
import motorHubHomeImage from "../../assets/projects/motorhub-home-thumb.png";
import ararasAcaiImage from "../../assets/projects/araras acai.png";
import financeTrackImage from "../../assets/projects/finance track.png";
import smartlocationImage from "../../assets/projects/smartlocation.png";

export const projects = [
  {
    title: "File Converter Web",
    description:
      "Aplicacao web desenvolvida em React que permite converter arquivos diretamente pelo navegador utilizando uma API de conversao. O projeto demonstra integracao entre frontend e backend, consumo de APIs REST e interface responsiva.",
    technologies: ["React", "JavaScript", "HTML5", "CSS3", "REST API"],
    image: fileConverterWebImage,
    alt: "Interface web de conversao de arquivos",
    demoLink: "https://file-conversion-api.vercel.app",
    githubLink: "https://github.com/GiovanneMedeiros/file-conversion-api",
    category: "frontend",
  },
  {
    title: "File Conversion API",
    description:
      "API desenvolvida para realizar conversao de arquivos entre diferentes formatos. O projeto utiliza arquitetura modular, filas assincronas com Redis e processamento em background para lidar com tarefas de conversao de forma eficiente.",
    technologies: ["Node.js", "Express", "Redis", "JavaScript", "REST API"],
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80",
    alt: "Codigo de API de conversao de arquivos",
    demoLink: "",
    githubLink: "https://github.com/GiovanneMedeiros/file-conversion-api",
    category: "api",
  },
  {
    title: "Elisandra Miellis | Imoveis de Alto Padrao",
    description:
      "Landing page para corretora de imoveis de medio e alto padrao, com foco em conversao e navegacao clara.",
    technologies: ["HTML", "CSS", "JavaScript"],
    image:
      "https://wallpapers.com/images/featured-full/casa-moderna-vvnk7t1eu7sj0q4w.jpg",
    alt: "Landing page imobiliaria de alto padrao",
    demoLink: "https://giovannemedeiros.github.io/Elisandra-Miellis/",
    githubLink: "https://github.com/giovannemedeiros/Elisandra-Miellis",
    category: "frontend",
  },
  {
    title: "MotorHub | Loja de Carros Premium",
    description:
      "Plataforma para vitrine de carros premium com filtros de veiculos, pagina de detalhes e CTA para contato.",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: motorHubHomeImage,
    fallbackImage:
      "https://giovannemedeiros.github.io/loja-de-carros-MotorHub-/Mercedes%20Benz%20AMG%20G63.jpg",
    alt: "Projeto MotorHub com cards de carros",
    demoLink: "https://giovannemedeiros.github.io/loja-de-carros-MotorHub-/",
    githubLink: "https://github.com/giovannemedeiros/loja-de-carros-MotorHub-",
    category: "frontend",
  },
  {
    title: "Sistema de Login",
    description:
      "Projeto de autenticacao com estrutura de rotas protegidas e fluxo de login para aprendizado de back-end.",
    technologies: ["CSS", "HTML", "JavaScript"],
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=900&q=80",
    alt: "Projeto de login com Node.js",
    demoLink: "https://giovannemedeiros.github.io/Pagina-de-login-estilo-dark/",
    githubLink: "https://github.com/GiovanneMedeiros/Pagina-de-login-estilo-dark",
    category: "backend",
  },
  {
    title: "Smartlocation",
    description:
      "Aplicação web de geomarketing com mapa interativo e painel de análise regional para identificar oportunidades comerciais com base em fluxo de pessoas, concorrência, acessibilidade e custo estimado.",
    technologies: ["React", "JavaScript", "Leaflet", "Node.js", "Express", "Vite"],
    image: smartlocationImage,
    alt: "Aplicação Smartlocation com mapa interativo de geomarketing",
    demoLink: "",
    githubLink: "https://github.com/GiovanneMedeiros/smartlocation",
    category: ["frontend", "backend"],
    inDevelopment: true,
  },
  {
    title: "Sistema de Fidelidade Arara's Açaí",
    description:
      "Plataforma de fidelidade para gestão de clientes, pontos e recompensas, com autenticação e painel administrativo completo.",
    technologies: ["JavaScript (ES6+)", "React", "HTML5", "CSS3", "Supabase", "REST API", "PostgreSQL"],
    image: ararasAcaiImage,
    alt: "Painel do sistema de fidelidade Arara's Açaí",
    demoLink: "https://araras-acai.vercel.app/login",
    githubLink: "https://github.com/GiovanneMedeiros/Araras-acai",
    category: ["frontend", "backend"],
  },
  {
    title: "FinanceTrack",
    description:
      "Aplicação web de controle financeiro pessoal com dashboard interativo, autenticação segura e sistema de planos FREE e PREMIUM para gerenciar receitas, despesas e acompanhar a saúde financeira.",
    technologies: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Supabase", "PostgreSQL", "HTML", "CSS"],
    image: financeTrackImage,
    alt: "Dashboard do FinanceTrack com controle financeiro pessoal",
    demoLink: "https://finance-track-kappa.vercel.app/",
    githubLink: "https://github.com/GiovanneMedeiros/finance-track",
    category: ["frontend", "backend"],
    inDevelopment: true,
  },
];
