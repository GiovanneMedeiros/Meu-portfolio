const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu a');
const typedText = document.querySelector('#typed-text');
const backToTopButton = document.querySelector('.back-to-top');
const revealElements = document.querySelectorAll('.reveal');
const year = document.querySelector('#year');
const backgroundBlurs = document.querySelectorAll('.bg-blur');
const projectsGrid = document.querySelector('#projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

const roles = [
  'Front-End Developer',
  'JavaScript Developer',
  'Future Full Stack Developer',
];

let roleIndex = 0;
let letterIndex = 0;
let deleting = false;

const projects = [
  {
    title: 'Conversor de Arquivos',
    description: 'Aplicacao para converter formatos com interface limpa e feedback em tempo real.',
    tech: 'HTML • CSS • JavaScript',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
    alt: 'Tela de projeto de conversor de arquivos',
    liveUrl: '#',
    githubUrl: '#',
    category: 'frontend',
  },
  {
    title: 'Sistema de Login com Node.js',
    description: 'Autenticacao de usuarios com rotas protegidas e fluxo seguro de sessao.',
    tech: 'Node.js • Express • MongoDB',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=900&q=80',
    alt: 'Interface de sistema de login com Node.js',
    liveUrl: '#',
    githubUrl: '#',
    category: 'backend',
  },
  {
    title: 'API REST',
    description: 'API escalavel com endpoints documentados, validacao e arquitetura modular.',
    tech: 'Node.js • Express • JavaScript',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80',
    alt: 'Codigo representando uma API REST',
    liveUrl: '#',
    githubUrl: '#',
    category: 'api',
  },
  {
    title: 'Elisandra Miellis | Imoveis de Alto Padrao',
    description: 'Landing page premium para corretora de imoveis de medio e alto padrao, com hero de impacto, secoes estrategicas e foco em conversao de clientes.',
    tech: 'HTML • CSS • JavaScript',
    image: 'https://wallpapers.com/images/featured-full/casa-moderna-vvnk7t1eu7sj0q4w.jpg',
    alt: 'Projeto Elisandra Miellis com fachada moderna de alto padrao',
    liveUrl: 'https://giovannemedeiros.github.io/Elisandra-Miellis/',
    githubUrl: 'https://github.com/giovannemedeiros/Elisandra-Miellis',
    category: 'frontend',
  },
  {
    title: 'MotorHub | Loja de Carros Premium',
    description: 'Plataforma web para vitrine de carros premium com busca de veiculos, cards com detalhes de modelos, pagina dedicada de compra e CTA direto para WhatsApp.',
    tech: 'HTML • CSS • JavaScript',
    image: 'assets/projects/motorhub-home-thumb.png',
    fallbackImage: 'https://giovannemedeiros.github.io/loja-de-carros-MotorHub-/Mercedes%20Benz%20AMG%20G63.jpg',
    alt: 'Projeto MotorHub com vitrine de carros de luxo',
    liveUrl: 'https://giovannemedeiros.github.io/loja-de-carros-MotorHub-/',
    githubUrl: 'https://github.com/giovannemedeiros/loja-de-carros-MotorHub-',
    category: 'frontend',
  },
];

// Efeito de digitação com loop contínuo entre os títulos.
function typeEffect() {
  const currentRole = roles[roleIndex];

  if (!deleting) {
    typedText.textContent = currentRole.slice(0, letterIndex + 1);
    letterIndex += 1;

    if (letterIndex === currentRole.length) {
      deleting = true;
      setTimeout(typeEffect, 1300);
      return;
    }
  } else {
    typedText.textContent = currentRole.slice(0, letterIndex - 1);
    letterIndex -= 1;

    if (letterIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, deleting ? 45 : 85);
}

function toggleHeaderState() {
  header.classList.toggle('scrolled', window.scrollY > 40);
  backToTopButton.classList.toggle('show', window.scrollY > 280);
}

function toggleMenu() {
  const isOpen = menu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
}

function closeMenu() {
  menu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

function createProjectCard(project) {
  const fallback = project.fallbackImage
    ? ` onerror="this.onerror=null;this.src='${project.fallbackImage}'"`
    : '';
  const imageClass = project.imageFit === 'contain'
    ? 'project-image project-image--contain'
    : 'project-image';

  return `
    <article class="project-card">
      <img class="${imageClass}" src="${project.image}" alt="${project.alt}"${fallback} />
      <div class="project-content">
        <span class="project-badge">${project.category}</span>
        <h4>${project.title}</h4>
        <p>${project.description}</p>
        <p class="project-tech">${project.tech}</p>
        <div class="project-actions">
          <a class="btn btn-small btn-primary" href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">Ver Projeto</a>
          <a class="btn btn-small btn-ghost" href="${project.githubUrl}" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </article>
  `;
}

function setupProjectCardEffects() {
  const projectCards = document.querySelectorAll('.project-card');

    imageFit: 'contain',
  projectCards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 8;
      const rotateX = ((y / rect.height) - 0.5) * -8;

      card.style.transform = `translateY(-10px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

function renderProjects(filter = 'todos') {
  if (!projectsGrid) {
    return;
  }

  const filteredProjects =
    filter === 'todos' ? projects : projects.filter((project) => project.category === filter);

  projectsGrid.innerHTML = filteredProjects.map(createProjectCard).join('');
  setupProjectCardEffects();
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

// Pequeno escalonamento para dar sensação de movimento mais sofisticado.
revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 90, 420)}ms`;
  revealObserver.observe(element);
});

// Movimento sutil no fundo para enriquecer a percepção de profundidade.
function animateBackground() {
  const y = window.scrollY;
  backgroundBlurs.forEach((blur, index) => {
    const speed = index === 0 ? 0.07 : 0.05;
    blur.style.transform = `translate3d(0, ${y * speed}px, 0)`;
  });
}

menuToggle.addEventListener('click', toggleMenu);
menuLinks.forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('scroll', toggleHeaderState);
window.addEventListener('scroll', animateBackground);

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedFilter = button.dataset.filter || 'todos';

    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    renderProjects(selectedFilter);
  });
});

toggleHeaderState();
animateBackground();
renderProjects();
typeEffect();

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

if (year) {
  year.textContent = new Date().getFullYear();
}
