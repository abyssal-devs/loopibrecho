import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import logo from "@/assets/loopii-logo.png";
import heroImg from "@/assets/dashboard-preview.jpg";
import labelsImg from "@/assets/financial-system.jpg";
import rackImg from "@/assets/rack-organized.jpg";
import evaluationImg from "@/assets/evaluation-system.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Loopii — Sistema de gestão para brechós profissionais" },
      {
        name: "description",
        content:
          "A Loopii profissionaliza a operação do seu brechó com avaliação padronizada, controle de estoque e etiquetas automáticas. Proteja sua margem na compra das peças.",
      },
      { property: "og:title", content: "Loopii — Profissionalize seu brechó" },
      {
        property: "og:description",
        content:
          "O sistema que protege o lucro do seu brechó na compra das peças.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LoopiiLanding,
});

const CTA_PRIMARY = "QUERO PROFISSIONALIZAR MEU BRECHÓ";
const CTA_SECONDARY = "AGENDAR DEMONSTRAÇÃO";

function LeadPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    volume: "",
    evaluation: "",
  });

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá! Tenho interesse na Loopii.
    
*Nome:* ${formData.name}
*Telefone:* ${formData.phone}
*Peças/mês:* ${formData.volume}
*Como avalia hoje:* ${formData.evaluation}`;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5511999999999?text=${encoded}`, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div 
        ref={modalRef}
        className="relative w-full max-w-md bg-card border border-border rounded-3xl shadow-2xl overflow-hidden p-8 animate-in fade-in zoom-in duration-300"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold tracking-tight">Fale com um especialista</h3>
          <p className="text-muted-foreground mt-2">Preencha os dados abaixo para agendarmos sua demonstração.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Nome</label>
            <input
              required
              id="name"
              type="text"
              placeholder="Seu nome"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--royal)] transition"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">Telefone</label>
            <input
              required
              id="phone"
              type="tel"
              placeholder="(00) 00000-0000"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--royal)] transition"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="volume" className="text-sm font-medium">Peças que entram por mês</label>
            <input
              required
              id="volume"
              type="text"
              placeholder="Ex: 500 peças"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--royal)] transition"
              value={formData.volume}
              onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="eval" className="text-sm font-medium">Como fazem as avaliações hoje?</label>
            <textarea
              required
              id="eval"
              placeholder="Ex: No olho, planilha, caderninho..."
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--royal)] transition min-h-[80px] resize-none"
              value={formData.evaluation}
              onChange={(e) => setFormData({ ...formData, evaluation: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full gradient-brand text-white px-7 py-4 text-sm font-semibold tracking-wide shadow-lg shadow-[color:var(--royal)]/20 hover:opacity-95 transition mt-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            Chamar no WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}


function Nav({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <img src={logo} alt="Loopii" className="h-7 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#problema" className="hover:text-foreground transition">Problema</a>
          <a href="#solucao" className="hover:text-foreground transition">Solução</a>
          <a href="#diferencial" className="hover:text-foreground transition">Diferencial</a>
          <a href="#faq" className="hover:text-foreground transition">FAQ</a>
        </nav>
        <button
          onClick={onCTAClick}
          className="hidden sm:inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2 text-sm font-medium hover:opacity-90 transition"
        >
          Agendar demo
        </button>
      </div>
    </header>
  );
}

function Hero({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full gradient-brand" />
              Plataforma operacional para brechós
            </div>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-balance leading-[1.02]">
              O sistema que <span className="text-gradient-brand">protege o lucro</span> do seu brechó na compra das peças.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground text-pretty">
              Pare de depender do "feeling" da equipe para avaliar produtos. A Loopii profissionaliza a operação do seu brechó com avaliação padronizada, controle de estoque, etiquetas automáticas e tecnologia focada no ponto mais importante da operação: a compra.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onCTAClick}
                className="inline-flex items-center justify-center rounded-full gradient-brand text-white px-7 py-4 text-sm font-semibold tracking-wide shadow-lg shadow-[color:var(--royal)]/20 hover:opacity-95 transition"
              >
                {CTA_PRIMARY}
              </button>
              <a
                href="#solucao"
                className="inline-flex items-center justify-center rounded-full border border-border bg-card px-7 py-4 text-sm font-semibold text-foreground hover:bg-muted transition"
              >
                Ver como funciona
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden ring-1 ring-border shadow-2xl">
              <img
                src={heroImg}
                alt="Dashboard Administrativo da Loopii mostrando métricas de vendas e acompanhamento operacional"
                width={1536}
                height={1280}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-background/85 backdrop-blur px-4 py-3 border border-border shadow-sm">
                <div className="flex items-center gap-3 text-xs">
                  <span className="h-2 w-2 rounded-full bg-[color:var(--cyan-loop)] animate-pulse" />
                  <span className="font-medium text-foreground">Visão geral do sistema</span>
                  <span className="text-muted-foreground ml-auto">Gestão em tempo real</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function Pain() {
  const items = [
    "cada funcionária avalia de um jeito",
    "a compra das peças acontece no improviso",
    "o estoque fica desorganizado",
    "a margem diminui sem perceber",
    "falta controle real da operação",
  ];
  return (
    <section id="problema" className="bg-[color:var(--ink)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--cyan-loop)]">A dor real</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-balance">
            Seu brechó cresce… mas a desorganização cresce junto?
          </h2>
          <p className="mt-6 text-lg text-white/70">
            Muitos brechós ainda perdem dinheiro porque:
          </p>
        </div>

        <ul className="mt-12 grid md:grid-cols-2 lg:grid-cols-5 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
          {items.map((t, i) => (
            <li key={i} className="bg-[color:var(--ink)] p-6 flex flex-col gap-4">
              <span className="text-xs text-white/40 font-mono">0{i + 1}</span>
              <p className="text-base text-white/90 text-pretty">{t}</p>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid md:grid-cols-5 gap-8 items-center">
          <p className="md:col-span-3 text-2xl md:text-3xl font-medium tracking-tight text-balance">
            E o problema é simples: <span className="text-[color:var(--cyan-loop)]">o lucro do brechó começa na compra.</span>
          </p>
          <p className="md:col-span-2 text-white/60 text-pretty">
            Quando a entrada das peças não tem critério, padrão e controle, a operação perde qualidade e você perde lucro.
          </p>
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const features = [
    "Padroniza avaliações de peças",
    "Evita preços inconsistentes",
    "Organiza estoque e entrada de produtos",
    "Imprime etiquetas automaticamente",
    "Controla compras e vendas em um só lugar",
    "Reduz dependência da experiência individual da equipe",
    "Ganha mais segurança na precificação",
    "Escolhe entre pagamento em Pix ou crédito em compras na loja",
  ];

  return (
    <section id="solucao" className="relative">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
            <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--royal)]">A solução</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-balance">
              Transforme seu brechó em uma operação profissional.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground text-pretty">
              A Loopii foi criada para brechós e operações second hand que querem crescer com mais controle, organização e margem.
            </p>
            <div className="mt-10 rounded-2xl overflow-hidden border border-border">
              <img
                src={labelsImg}
                alt="Sistema financeiro da Loopii mostrando contas a pagar e comparativos mensais"
                width={1280}
                height={1024}
                loading="lazy"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-6">Com a Loopii você</p>
            <ul className="divide-y divide-border border-y border-border">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-6 py-5 group">
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full gradient-brand text-white text-xs font-bold">
                    ✓
                  </span>
                  <p className="text-lg md:text-xl text-foreground font-medium tracking-tight">{f}</p>
                  <span className="ml-auto text-xs text-muted-foreground font-mono pt-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Differential() {
  return (
    <section id="diferencial" className="bg-muted/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-4xl">
          <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--royal)]">Diferencial</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-balance">
            Pare de comprar no achismo.
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-card border border-border p-8">
            <p className="text-sm uppercase tracking-widest text-muted-foreground">Outros sistemas</p>
            <p className="mt-4 text-2xl font-medium tracking-tight text-pretty">
              A maior parte dos sistemas ajuda você a vender.
            </p>
          </div>
          <div className="rounded-2xl bg-[color:var(--ink)] text-white p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 gradient-brand" />
            <div className="relative">
              <p className="text-sm uppercase tracking-widest text-[color:var(--cyan-loop)]">Loopii</p>
              <p className="mt-4 text-2xl font-medium tracking-tight text-pretty">
                A Loopii ajuda você a proteger sua margem ANTES da venda acontecer.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-12 max-w-3xl text-lg text-muted-foreground text-pretty">
          Nosso diferencial está justamente onde o brechó mais ganha — ou perde — dinheiro:{" "}
          <span className="text-foreground font-medium">a compra das peças.</span>
        </p>
      </div>
    </section>
  );
}

function StrongBenefit() {
  const items = [
    "sobra mais margem",
    "o estoque gira melhor",
    "a equipe trabalha com mais padrão",
    "fica mais fácil crescer",
    "e seu brechó ganha estrutura para escalar",
  ];
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-border shadow-xl">
              <img
                src={evaluationImg}
                alt="Sistema de Avaliação da Loopii mostrando categorias de produtos"
                width={1280}
                height={1600}
                loading="lazy"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--royal)]">Resultado</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-balance">
              Mais padrão. Mais controle. <span className="text-gradient-brand">Mais lucro.</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Quando sua operação depende menos do improviso:
            </p>
            <ul className="mt-8 space-y-3">
              {items.map((t, i) => (
                <li key={i} className="flex items-start gap-4 text-lg md:text-xl text-foreground">
                  <span className="mt-3 h-1 w-6 shrink-0 gradient-brand rounded-full" />
                  <span className="text-pretty">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Objection() {
  return (
    <section className="bg-[color:var(--ink)] text-white">
      <div className="mx-auto max-w-4xl px-6 py-24 md:py-28 text-center">
        <p className="text-2xl md:text-4xl font-medium tracking-tight italic text-white/80 text-balance">
          "Mas meu brechó ainda não é grande."
        </p>
        <p className="mt-8 text-xl md:text-2xl font-semibold tracking-tight text-balance">
          É exatamente por isso que você precisa organizar a operação agora.
        </p>
        <p className="mt-6 text-white/70 text-lg text-pretty">
          Brechós que crescem de forma saudável constroem processo antes da bagunça virar prejuízo.
        </p>
      </div>
    </section>
  );
}

function FinalCTA({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <section id="cta" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="relative rounded-3xl overflow-hidden border border-border p-10 md:p-16 bg-card">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full gradient-brand opacity-20 blur-3xl" />
          <div className="relative max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance">
              Seu brechó está preparado para crescer com padrão?
            </h2>
            <p className="mt-6 text-lg text-muted-foreground text-pretty">
              Profissionalize sua operação com um sistema pensado para quem quer escalar no mercado second hand.
            </p>
            <button
              onClick={onCTAClick}
              className="mt-10 inline-flex items-center justify-center rounded-full gradient-brand text-white px-8 py-5 text-sm font-semibold tracking-wide shadow-lg shadow-[color:var(--royal)]/20 hover:opacity-95 transition"
            >
              {CTA_SECONDARY}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


const FAQS: { q: string; a: string }[] = [
  {
    q: "A Loopii serve para qualquer tipo de brechó?",
    a: "Sim. A Loopii foi desenvolvida para brechós e operações second hand de diferentes segmentos e tamanhos que desejam profissionalizar a gestão e ter mais controle da operação.",
  },
  {
    q: "Qual é o principal diferencial da Loopii?",
    a: "A Loopii foi criada com foco na etapa mais importante do brechó: a compra das peças. O sistema ajuda a padronizar avaliações, proteger a margem e reduzir decisões no achismo.",
  },
  {
    q: "A avaliação das peças depende da experiência da funcionária?",
    a: "Não. A Loopii utiliza avaliação baseada em sistema, trazendo mais segurança, padrão e consistência na precificação das peças.",
  },
  {
    q: "A Loopii ajuda na organização do estoque?",
    a: "Sim. O sistema auxilia na entrada das peças, organização do estoque, controle operacional e impressão de etiquetas automáticas.",
  },
  {
    q: "O sistema imprime etiquetas?",
    a: "Sim. A Loopii conta com impressão de etiquetas para facilitar identificação, organização e controle dos produtos.",
  },
  {
    q: "Posso pagar fornecedores em Pix ou crédito na loja?",
    a: "Sim. A Loopii permite escolher entre pagamento em Pix ou voucher/crédito para compras dentro da própria loja, ajudando na gestão financeira e margem da operação.",
  },
  {
    q: "A Loopii é difícil de usar?",
    a: "Não. O sistema foi pensado para facilitar a rotina do brechó, tornando processos mais simples, organizados e padronizados.",
  },
  {
    q: "Meu brechó ainda é pequeno. Vale a pena usar a Loopii?",
    a: "Sim. Quanto antes a operação for organizada, mais fácil será crescer com controle, padrão e lucratividade.",
  },
  {
    q: "A Loopii ajuda no crescimento do brechó?",
    a: "Sim. Ao profissionalizar compras, avaliações, estoque e organização, a Loopii ajuda o brechó a crescer com mais eficiência e segurança operacional.",
  },
  {
    q: "Como posso conhecer a Loopii na prática?",
    a: "Você pode agendar uma demonstração e entender como a Loopii funciona na rotina real de um brechó.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--royal)]">FAQ</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-balance">
              Perguntas frequentes
            </h2>
          </div>
          <div className="md:col-span-2 divide-y divide-border border-y border-border">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-base md:text-lg font-medium text-foreground text-pretty">
                      {f.q}
                    </span>
                    <span
                      className={`h-8 w-8 shrink-0 rounded-full border border-border flex items-center justify-center text-lg transition ${
                        isOpen ? "bg-foreground text-background rotate-45" : ""
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <p className="pb-6 pr-14 text-muted-foreground text-pretty">{f.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Loopii" className="h-6 w-auto" />
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Loopii. Gestão para brechós profissionais.
        </p>
      </div>
    </footer>
  );
}

function LoopiiLanding() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Pain />
        <Solution />
        <Differential />
        <StrongBenefit />
        <Objection />
        <FinalCTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
