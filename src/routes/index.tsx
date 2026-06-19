import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import logo from "@/assets/loopii-logo.png";
import heroImg from "@/assets/dashboard-preview.jpg";
import heroBg from "@/assets/hero-bg.png";
import painBg from "@/assets/pain-bg.png";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { Users, ShoppingBag, Boxes, TrendingDown, Gauge } from "lucide-react";
import labelsImg from "@/assets/financial-system.jpg";

import evaluationImg from "@/assets/evaluation-system.jpg";
import loopiiSystemImg from "@/assets/loopii-system.jpeg";

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

/* -------------------------------- Reveal -------------------------------- */

function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------- Buttons -------------------------------- */

function PrimaryButton({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--royal)] text-white px-7 py-4 text-sm font-semibold tracking-wide transition-all duration-300 hover:bg-[color:var(--ink)] hover:-translate-y-0.5 shadow-[0_8px_24px_-12px_rgba(30,78,220,0.45)] ${className}`}
    >
      {children}
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
    </button>
  );
}

function GhostButton({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const cls =
    "inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border)] bg-white px-7 py-4 text-sm font-semibold text-foreground transition-all duration-300 hover:border-[color:var(--ink)] hover:-translate-y-0.5";
  if (href) return <a href={href} className={cls}>{children}</a>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}

/* --------------------------- Lead capture popup --------------------------- */

function LeadPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    volume: "",
    evaluation: "",
  });

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

  const fieldCls =
    "w-full rounded-xl border border-[color:var(--border)] bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--royal)] transition";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white border border-[color:var(--border)] rounded-2xl shadow-2xl overflow-hidden p-8 animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition"
          aria-label="Fechar"
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
            <input required id="name" type="text" placeholder="Seu nome" className={fieldCls}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">Telefone</label>
            <input required id="phone" type="tel" placeholder="(00) 00000-0000" className={fieldCls}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
          </div>
          <div className="space-y-2">
            <label htmlFor="volume" className="text-sm font-medium">Peças que entram por mês</label>
            <input required id="volume" type="text" placeholder="Ex: 500 peças" className={fieldCls}
              value={formData.volume}
              onChange={(e) => setFormData({ ...formData, volume: e.target.value })} />
          </div>
          <div className="space-y-2">
            <label htmlFor="eval" className="text-sm font-medium">Como fazem as avaliações hoje?</label>
            <textarea required id="eval" placeholder="Ex: No olho, planilha, caderninho..."
              className={`${fieldCls} min-h-[80px] resize-none`}
              value={formData.evaluation}
              onChange={(e) => setFormData({ ...formData, evaluation: e.target.value })} />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--royal)] text-white px-7 py-4 text-sm font-semibold tracking-wide hover:bg-[color:var(--ink)] transition mt-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            Chamar no WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------------------------------- Nav ---------------------------------- */

function Nav({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/85 border-b border-[color:var(--border)]">
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
          className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[color:var(--ink)] text-white px-5 py-2 text-sm font-medium hover:bg-[color:var(--royal)] transition"
        >
          Agendar demo
        </button>
      </div>
    </header>
  );
}

/* --------------------------------- Hero ---------------------------------- */

function Hero({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-white"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center 25%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-white/80 pointer-events-none md:hidden" />
      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-16 lg:pt-24 lg:pb-20">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-16 items-center">
          {/* Coluna Esquerda */}
          <div className="max-w-xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-white px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--royal)]" />
                Plataforma operacional para brechós
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold tracking-tight leading-[1.08] text-[color:var(--ink)]">
                O sistema que <br />
                <AnimatedText text="protege o lucro" textClassName="text-gradient-brand" underlineClassName="text-[color:var(--cyan-loop)]" /> <br />
                do seu brechó <br />
                na compra das peças.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-lg text-muted-foreground text-pretty leading-relaxed">
                Pare de depender do "feeling" da equipe para avaliar produtos. A Loopii profissionaliza a operação do seu brechó com avaliação padronizada, controle de estoque, etiquetas automáticas e tecnologia focada no ponto mais importante da operação: a compra.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <PrimaryButton onClick={onCTAClick}>{CTA_PRIMARY}</PrimaryButton>
                <GhostButton href="#solucao">Ver como funciona</GhostButton>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--cyan-loop)]" />
                  Sistema em operação real
                </div>
                <span className="opacity-30 hidden sm:inline">•</span>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--royal)]" />
                  Feito para brechós
                </div>
              </div>
            </Reveal>
          </div>

          {/* Coluna Direita */}
          <div className="relative flex justify-center lg:justify-end">
            <Reveal delay={200}>
              <div className="relative w-full max-w-none mockup-float">
                <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-[color:var(--cyan-loop)] opacity-[0.06] blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-[color:var(--royal)] opacity-[0.05] blur-3xl pointer-events-none" />
                <div className="mockup-frame">
                  <div className="mockup-chrome">
                    <span /><span /><span />
                    <div className="ml-3 flex-1 h-5 rounded-md bg-white/70 border border-[color:var(--border)]" />
                  </div>
                  <div className="mockup-screen">
                    <img
                      src={heroImg}
                      alt="Dashboard Administrativo da Loopii mostrando métricas e acompanhamento operacional"
                      width={1536}
                      height={1280}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Pain --------------------------------- */

function Pain() {
  const items: { text: string; Icon: typeof Users; anim: string }[] = [
    { text: "cada funcionária avalia de um jeito", Icon: Users, anim: "icon-sway" },
    { text: "a compra das peças acontece no improviso", Icon: ShoppingBag, anim: "icon-shake" },
    { text: "o estoque fica desorganizado", Icon: Boxes, anim: "animate-[spin_10s_linear_infinite]" },
    { text: "a margem diminui sem perceber", Icon: TrendingDown, anim: "icon-drop" },
    { text: "falta controle real da operação", Icon: Gauge, anim: "icon-tick" },
  ];
  return (
    <section
      id="problema"
      className="relative bg-white text-[color:var(--ink)]"
      style={{
        backgroundImage: `url(${painBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-white/85 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-36">
        <div className="max-w-3xl">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--royal)]">A dor real</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight text-balance leading-[1.1] text-[color:var(--ink)]">
              Seu brechó cresce… mas a desorganização cresce junto?
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 text-lg text-muted-foreground">
              Muitos brechós ainda perdem dinheiro porque:
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid md:grid-cols-2 lg:grid-cols-5 gap-5">
          {items.map(({ text, Icon, anim }, i) => (
            <Reveal as="li" key={i} delay={i * 80}>
              <div className="group h-full rounded-2xl bg-white border border-[color:var(--border)] shadow-sm p-7 flex flex-col gap-5 transition-colors duration-300 hover:border-[color:var(--royal)]/40 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-mono">0{i + 1}</span>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--royal)]/10 text-[color:var(--royal)] border border-[color:var(--royal)]/20">
                    <Icon className={`h-5 w-5 ${anim}`} strokeWidth={1.75} />
                  </span>
                </div>
                <p className="text-base text-[color:var(--ink)] text-pretty leading-relaxed">{text}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <div className="mt-20 grid md:grid-cols-5 gap-10 items-center">
          <Reveal className="md:col-span-3">
            <p className="text-2xl md:text-3xl font-medium tracking-tight text-balance leading-snug text-[color:var(--ink)]">
              E o problema é simples: <span className="text-[color:var(--royal)]">o lucro do brechó começa na compra.</span>
            </p>
          </Reveal>
          <Reveal className="md:col-span-2" delay={120}>
            <p className="text-muted-foreground text-pretty text-lg">
              Quando a entrada das peças não tem critério, padrão e controle, a operação perde qualidade e você perde lucro.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Solution ------------------------------- */

function FeatureDashboard({ active }: { active: number }) {
  const royal = "var(--royal)";
  const cyan = "var(--cyan-loop)";
  const ink = "var(--ink)";

  const Frame = ({ children, label }: { children: React.ReactNode; label: string }) => (
    <svg viewBox="0 0 400 300" className="w-full h-auto block" role="img" aria-label={label}>
      <rect x="0" y="0" width="400" height="300" fill="#fafafa" />
      <rect x="0" y="0" width="400" height="34" fill="#f1f1f1" />
      <circle cx="14" cy="17" r="4" fill="#e2e2e2" />
      <circle cx="28" cy="17" r="4" fill="#e2e2e2" />
      <circle cx="42" cy="17" r="4" fill="#e2e2e2" />
      <rect x="16" y="48" width="80" height="220" rx="6" fill="#ffffff" stroke="#eee" />
      <rect x="26" y="62" width="60" height="6" rx="3" fill={royal} opacity="0.9" />
      <rect x="26" y="78" width="46" height="4" rx="2" fill="#e5e7eb" />
      <rect x="26" y="90" width="52" height="4" rx="2" fill="#e5e7eb" />
      <rect x="26" y="102" width="40" height="4" rx="2" fill="#e5e7eb" />
      {children}
    </svg>
  );

  const scenes: React.ReactNode[] = [
    <Frame key={0} label="Avaliações padronizadas">
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={110 + i * 95} y="60" width="80" height="200" rx="8" fill="#fff" stroke="#eee" />
          <rect x={120 + i * 95} y="74" width="60" height="46" rx="4" fill={cyan} opacity="0.18" />
          {[0, 1, 2, 3, 4].map((s) => (
            <polygon
              key={s}
              points="0,-5 1.47,-1.55 5,-1.55 2.27,0.59 3.24,4 0,2 -3.24,4 -2.27,0.59 -5,-1.55 -1.47,-1.55"
              transform={`translate(${128 + i * 95 + s * 11}, 142)`}
              fill={royal}
              style={{ animation: `dash-pop 1.6s ${s * 0.1 + i * 0.25}s ease-out infinite`, transformBox: "fill-box", transformOrigin: "center" }}
            />
          ))}
          <rect x={120 + i * 95} y="170" width="60" height="6" rx="3" fill="#e5e7eb" />
          <rect x={120 + i * 95} y="184" width="40" height="6" rx="3" fill="#e5e7eb" />
        </g>
      ))}
    </Frame>,

    <Frame key={1} label="Preços consistentes">
      <rect x="110" y="60" width="270" height="200" rx="10" fill="#fff" stroke="#eee" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="124" y={78 + i * 42} width="100" height="28" rx="6" fill="#f3f4f6" />
          <rect x="240" y={78 + i * 42} width="120" height="28" rx="6" fill={royal} opacity="0.08" />
          <text x="250" y={97 + i * 42} fontFamily="ui-monospace,monospace" fontSize="14" fill={ink}
                style={{ animation: `dash-price 2s ${i * 0.2}s ease-in-out infinite` }}>
            R$ {(49 + i * 10).toFixed(2)}
          </text>
          <circle cx="350" cy={92 + i * 42} r="5" fill={cyan}
                  style={{ animation: `dash-pop 2s ${i * 0.2}s ease-out infinite` }} />
        </g>
      ))}
    </Frame>,

    <Frame key={2} label="Estoque organizado">
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        return (
          <g key={i} style={{ animation: `dash-stack 2.4s ${i * 0.18}s ease-out infinite` }}>
            <rect x={130 + col * 78} y={90 + row * 80} width="68" height="68" rx="6" fill={royal} opacity="0.12" stroke={royal} strokeOpacity="0.4" />
            <rect x={130 + col * 78} y={90 + row * 80} width="68" height="14" fill={royal} opacity="0.25" />
          </g>
        );
      })}
    </Frame>,

    <Frame key={3} label="Etiquetas automáticas">
      <rect x="140" y="70" width="220" height="60" rx="8" fill={ink} />
      <rect x="156" y="86" width="188" height="28" rx="4" fill="#2a2a2a" />
      <circle cx="340" cy="100" r="4" fill={cyan} style={{ animation: `dash-blink 1s infinite` }} />
      {[0, 1, 2].map((i) => (
        <g key={i} style={{ animation: `dash-slide 2.4s ${i * 0.4}s ease-in-out infinite` }}>
          <rect x="170" y={140 + i * 40} width="160" height="32" rx="4" fill="#fff" stroke={royal} strokeOpacity="0.4" />
          <rect x="180" y={150 + i * 40} width="60" height="6" rx="3" fill={ink} />
          <rect x="180" y={160 + i * 40} width="90" height="4" rx="2" fill="#bbb" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((b) => (
            <rect key={b} x={290 + b * 4} y={148 + i * 40} width="2" height="18" fill={ink} />
          ))}
        </g>
      ))}
    </Frame>,

    <Frame key={4} label="Compras e vendas">
      <line x1="120" y1="240" x2="380" y2="240" stroke="#e5e7eb" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x={132 + i * 40} y="240" width="14" height="0" fill={royal}
                style={{ animation: `dash-bar1 2.2s ${i * 0.12}s ease-out infinite`, transformOrigin: `${139 + i * 40}px 240px` }} />
          <rect x={150 + i * 40} y="240" width="14" height="0" fill={cyan}
                style={{ animation: `dash-bar2 2.2s ${i * 0.12 + 0.1}s ease-out infinite`, transformOrigin: `${157 + i * 40}px 240px` }} />
        </g>
      ))}
      <rect x="120" y="60" width="60" height="6" rx="3" fill={royal} opacity="0.8" />
      <rect x="120" y="74" width="100" height="4" rx="2" fill="#e5e7eb" />
    </Frame>,

    <Frame key={5} label="Equipe alinhada">
      {[0, 1, 2, 3].map((i) => (
        <g key={i} style={{ animation: `dash-pop 2s ${i * 0.2}s ease-out infinite` }}>
          <circle cx={150 + i * 60} cy="140" r="22" fill={royal} opacity="0.15" stroke={royal} strokeOpacity="0.6" />
          <circle cx={150 + i * 60} cy="132" r="8" fill={royal} opacity="0.8" />
          <path d={`M ${134 + i * 60} 156 Q ${150 + i * 60} 142 ${166 + i * 60} 156`} fill={royal} opacity="0.8" />
          <rect x={132 + i * 60} y="180" width="36" height="6" rx="3" fill="#e5e7eb" />
        </g>
      ))}
    </Frame>,

    <Frame key={6} label="Precificação segura">
      <path d="M 245 80 L 305 105 L 305 165 Q 305 215 245 240 Q 185 215 185 165 L 185 105 Z"
            fill={royal} opacity="0.12" stroke={royal} strokeWidth="2" />
      <path d="M 215 160 L 240 185 L 285 135" fill="none" stroke={royal} strokeWidth="5"
            strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="120" strokeDashoffset="120"
            style={{ animation: `dash-draw 2s ease-out infinite` }} />
    </Frame>,

    <Frame key={7} label="Pix ou crédito">
      <g style={{ transformOrigin: "185px 135px", animation: `dash-swap 3s ease-in-out infinite` }}>
        <rect x="130" y="100" width="110" height="70" rx="10" fill={royal} />
        <text x="232" y="142" fontFamily="ui-sans-serif" fontSize="16" fontWeight="700" fill="#fff" textAnchor="end">PIX</text>
      </g>
      <g style={{ transformOrigin: "315px 165px", animation: `dash-swap2 3s ease-in-out infinite` }}>
        <rect x="260" y="130" width="110" height="70" rx="10" fill={ink} />
        <rect x="272" y="148" width="86" height="10" rx="2" fill={cyan} opacity="0.7" />
        <text x="358" y="192" fontFamily="ui-sans-serif" fontSize="11" fontWeight="700" fill="#fff" textAnchor="end">CRÉDITO</text>
      </g>
    </Frame>,
  ];

  return (
    <div className="relative w-full">
      {scenes.map((s, i) => (
        <div
          key={i}
          className={`transition-opacity duration-500 ${i === active ? "opacity-100 relative" : "opacity-0 absolute inset-0 pointer-events-none"}`}
        >
          {s}
        </div>
      ))}
    </div>
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

  const [active, setActive] = useState(0);

  return (
    <section id="solucao" className="relative bg-white">
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-36">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--royal)]">A solução</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight text-balance leading-[1.1]">
                Transforme seu brechó em uma operação profissional.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-7 text-lg text-muted-foreground text-pretty leading-relaxed">
                A Loopii foi criada para brechós e operações second hand que querem crescer com mais controle, organização e margem.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-12 mockup-frame">
                <div className="mockup-chrome"><span /><span /><span /></div>
                <div className="mockup-screen bg-white">
                  <FeatureDashboard active={active} />
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground text-center lg:text-left">
                Passe o mouse sobre cada item para ver a função em ação.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-8">Com a Loopii você</p>
            </Reveal>
            <ul>
              {features.map((f, i) => (
                <Reveal as="li" key={i} delay={i * 50}>
                  <div
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    tabIndex={0}
                    className={`flex items-start gap-6 py-6 border-b border-[color:var(--border)] group transition-colors duration-300 hover:bg-[color:var(--surface)]/60 -mx-4 px-4 rounded-lg cursor-pointer outline-none ${active === i ? "bg-[color:var(--surface)]/60" : ""}`}
                  >
                    <span className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[color:var(--royal)] text-white text-xs font-bold transition-transform ${active === i ? "scale-110" : ""}`}>
                      ✓
                    </span>
                    <p className="text-lg md:text-xl text-foreground font-medium tracking-tight leading-snug">{f}</p>
                    <span className="ml-auto text-xs text-muted-foreground font-mono pt-2 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Differential ----------------------------- */

function Differential() {
  return (
    <section id="diferencial" className="bg-[color:var(--surface)] border-y border-[color:var(--border)]">
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-36">
        <div className="max-w-4xl">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--royal)]">Diferencial</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight text-balance leading-[1.1]">
              Pare de comprar no achismo.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-6 items-stretch">
          <div className="flex flex-col gap-6">
            <Reveal>
              <div className="rounded-2xl bg-white border border-[color:var(--border)] p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.15)]">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Outros sistemas</p>
                <p className="mt-5 text-2xl md:text-3xl font-medium tracking-tight text-pretty leading-snug">
                  A maior parte dos sistemas ajuda você a vender.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="rounded-2xl bg-[color:var(--ink)] text-white p-10 relative overflow-hidden transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-x-0 top-0 h-1 gradient-brand" />
                <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--cyan-loop)]">Loopii</p>
                <p className="mt-5 text-2xl md:text-3xl font-medium tracking-tight text-pretty leading-snug">
                  A Loopii ajuda você a proteger sua margem ANTES da venda acontecer.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <div className="h-full rounded-2xl overflow-hidden border border-[color:var(--border)] bg-white shadow-[0_20px_50px_-25px_rgba(0,0,0,0.15)]">
              <img
                src={loopiiSystemImg}
                alt="Tela do sistema Loopii"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <p className="mt-14 max-w-3xl text-lg text-muted-foreground text-pretty leading-relaxed">
            Nosso diferencial está justamente onde o brechó mais ganha — ou perde — dinheiro:{" "}
            <span className="text-foreground font-medium">a compra das peças.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------- StrongBenefit ----------------------------- */

function StrongBenefit() {
  const items = [
    "sobra mais margem",
    "o estoque gira melhor",
    "a equipe trabalha com mais padrão",
    "fica mais fácil crescer",
    "e seu brechó ganha estrutura para escalar",
  ];
  return (
    <section className="relative bg-white">
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-36">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="mockup-frame">
                <div className="mockup-chrome"><span /><span /><span /></div>
                <div className="mockup-screen">
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
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--royal)]">Resultado</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight text-balance leading-[1.1]">
                Mais padrão. Mais controle. <span className="text-gradient-brand">Mais lucro.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-7 text-lg text-muted-foreground leading-relaxed">
                Quando sua operação depende menos do improviso:
              </p>
            </Reveal>
            <ul className="mt-8 space-y-4">
              {items.map((t, i) => (
                <Reveal as="li" key={i} delay={200 + i * 70}>
                  <div className="flex items-start gap-4 text-lg md:text-xl text-foreground">
                    <span className="mt-3 h-1 w-6 shrink-0 bg-[color:var(--royal)] rounded-full" />
                    <span className="text-pretty">{t}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}

/* -------------------------------- Objection ------------------------------ */

function Objection() {
  return (
    <section className="bg-[color:var(--ink)] text-white">
      <div className="mx-auto max-w-4xl px-6 py-28 md:py-32 text-center">
        <Reveal>
          <p className="text-2xl md:text-4xl font-medium tracking-tight italic text-white/70 text-balance leading-snug">
            "Mas meu brechó ainda não é grande."
          </p>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-10 text-xl md:text-3xl font-semibold tracking-tight text-balance leading-snug text-gradient-brand">
            É exatamente por isso que você precisa organizar a operação agora.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <p className="mt-7 text-white/70 text-lg text-pretty leading-relaxed">
            Brechós que crescem de forma saudável constroem processo antes da bagunça virar prejuízo.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- Final CTA ------------------------------ */

function FinalCTA({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <section id="cta" className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-36">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden border border-[color:var(--border)] p-12 md:p-20 bg-[color:var(--surface)]">
            <div className="absolute inset-x-0 top-0 h-1 gradient-brand" />
            <div className="relative max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance leading-[1.1]">
                Seu brechó está preparado para crescer com padrão?
              </h2>
              <p className="mt-7 text-lg text-muted-foreground text-pretty leading-relaxed">
                Profissionalize sua operação com um sistema pensado para quem quer escalar no mercado second hand.
              </p>
              <div className="mt-10">
                <PrimaryButton onClick={onCTAClick}>{CTA_SECONDARY}</PrimaryButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------- FAQ --------------------------------- */

const FAQS: { q: string; a: string }[] = [
  { q: "A Loopii serve para qualquer tipo de brechó?", a: "Sim. A Loopii foi desenvolvida para brechós e operações second hand de diferentes segmentos e tamanhos que desejam profissionalizar a gestão e ter mais controle da operação." },
  { q: "Qual é o principal diferencial da Loopii?", a: "A Loopii foi criada com foco na etapa mais importante do brechó: a compra das peças. O sistema ajuda a padronizar avaliações, proteger a margem e reduzir decisões no achismo." },
  { q: "A avaliação das peças depende da experiência da funcionária?", a: "Não. A Loopii utiliza avaliação baseada em sistema, trazendo mais segurança, padrão e consistência na precificação das peças." },
  { q: "A Loopii ajuda na organização do estoque?", a: "Sim. O sistema auxilia na entrada das peças, organização do estoque, controle operacional e impressão de etiquetas automáticas." },
  { q: "O sistema imprime etiquetas?", a: "Sim. A Loopii conta com impressão de etiquetas para facilitar identificação, organização e controle dos produtos." },
  { q: "Posso pagar fornecedores em Pix ou crédito na loja?", a: "Sim. A Loopii permite escolher entre pagamento em Pix ou voucher/crédito para compras dentro da própria loja, ajudando na gestão financeira e margem da operação." },
  { q: "A Loopii é difícil de usar?", a: "Não. O sistema foi pensado para facilitar a rotina do brechó, tornando processos mais simples, organizados e padronizados." },
  { q: "Meu brechó ainda é pequeno. Vale a pena usar a Loopii?", a: "Sim. Quanto antes a operação for organizada, mais fácil será crescer com controle, padrão e lucratividade." },
  { q: "A Loopii ajuda no crescimento do brechó?", a: "Sim. Ao profissionalizar compras, avaliações, estoque e organização, a Loopii ajuda o brechó a crescer com mais eficiência e segurança operacional." },
  { q: "Como posso conhecer a Loopii na prática?", a: "Você pode agendar uma demonstração e entender como a Loopii funciona na rotina real de um brechó." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-t border-[color:var(--border)] bg-white">
      <div className="mx-auto max-w-4xl px-6 py-28 md:py-36">
        <div className="text-center mb-16 md:mb-20">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--royal)]">FAQ</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight text-balance leading-[1.05]">
              Perguntas frequentes
            </h2>
          </Reveal>
        </div>

        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 30}>
                <div
                  data-open={isOpen}
                  className="faq-item rounded-2xl border border-[color:var(--border)] bg-white transition-all duration-500 hover:border-[color:var(--ink)]/30"
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 px-6 md:px-8 py-6 text-left"
                  >
                    <span className="text-base md:text-lg font-medium text-pretty tracking-tight">
                      {f.q}
                    </span>
                    <span
                      className={`relative h-9 w-9 shrink-0 rounded-full border border-[color:var(--border)] flex items-center justify-center transition-all duration-500 ${
                        isOpen ? "bg-[color:var(--ink)] border-[color:var(--ink)]" : "bg-white"
                      }`}
                      aria-hidden
                    >
                      <span
                        className={`absolute h-px w-3.5 transition-colors duration-300 ${
                          isOpen ? "bg-white" : "bg-[color:var(--ink)]"
                        }`}
                      />
                      <span
                        className={`absolute h-3.5 w-px transition-all duration-500 ${
                          isOpen ? "bg-white rotate-90 scale-0" : "bg-[color:var(--ink)]"
                        }`}
                      />
                    </span>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows,opacity] duration-500 ease-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 md:px-8 pb-7 pr-14 text-muted-foreground text-pretty leading-relaxed">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Footer -------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-white">
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

/* --------------------------------- Page ---------------------------------- */

function LoopiiLanding() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  return (
    <div className="min-h-screen bg-white text-foreground">
      <Nav onCTAClick={togglePopup} />
      <main>
        <Hero onCTAClick={togglePopup} />
        <Pain />
        <Solution />
        <Differential />
        <StrongBenefit />
        <Objection />
        <FinalCTA onCTAClick={togglePopup} />
        <FAQ />
      </main>
      <Footer />
      <LeadPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
}
