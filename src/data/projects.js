import fileConverterWebImage from "../../assets/projects/file-converter-web.png";
import financeTrackImage from "../../assets/projects/FinanceTrack.png";
import motorHubHomeImage from "../../assets/projects/motorhub-home-thumb.png";
import loyaltyProgramArarasAcaiImage from "../../assets/projects/Programa de fidelidade Arara's açaí.png";
import smartlocationImage from "../../assets/projects/smartlocation.png";

export const projects = [
  {
    title: "FinanceTrack",
    description:
      "Dashboard financeiro desenvolvido com React e Tailwind CSS, com foco em experiencia do usuario, importacao de fatura, controle de saldo e interface moderna no estilo fintech.",
    technologies: ["React", "Vite", "Tailwind CSS", "Framer Motion", "LocalStorage"],
    image: financeTrackImage,
    alt: "Dashboard do FinanceTrack com visao financeira moderna",
    demoLink: "https://finance-track-kappa.vercel.app/",
    githubLink: "https://github.com/GiovanneMedeiros/finance-track/tree/main",
    category: "frontend",
  },
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
    title: "Sistema de Fidelidade Arara's Açaí",
    description:
      "Sistema de fidelidade com painel administrativo para gestao de clientes, pontos, recompensas e acompanhamento de resgates em uma interface focada em operacao e leitura rapida de metricas.",
    technologies: ["React", "JavaScript", "Vite", "CSS", "Dashboard UI"],
    image: loyaltyProgramArarasAcaiImage,
    alt: "Dashboard do Sistema de Fidelidade Arara's Açaí",
    demoLink: "https://araras-acai.vercel.app/login",
    githubLink: "https://github.com/GiovanneMedeiros/Araras-acai",
    category: ["frontend", "backend"],
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
];
