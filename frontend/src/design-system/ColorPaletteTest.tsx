import brandLogo from '../assets/images/brand.svg';

export default function ColorPaletteTest() {
  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* ======================================================
          HEADER
      ====================================================== */}
      <header className="sticky top-0 z-50 border-b border-border-light bg-bg-primary">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
          <img src={brandLogo} alt="ImpactHire" className="h-10 w-auto" />

          <nav className="flex items-center gap-8">
            <a
              href="#colors"
              className="text-nav-item font-medium text-text-secondary transition-colors hover:text-brand-secondary"
            >
              Colors
            </a>

            <a
              href="#typography"
              className="text-nav-item font-medium text-text-secondary transition-colors hover:text-brand-secondary"
            >
              Typography
            </a>

            <a
              href="#components"
              className="text-nav-item font-medium text-text-secondary transition-colors hover:text-brand-secondary"
            >
              Components
            </a>

            <button className="rounded-lg bg-button-primary-bg px-4 py-2 font-semibold text-button-primary-text transition-colors hover:bg-button-primary-hover">
              ImpactHire
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-10 p-8">
        {/* ======================================================
            HERO
        ====================================================== */}

        <section className="rounded-2xl bg-bg-primary p-10 shadow-sm border border-border-light">
          <p className="text-label-large font-medium text-brand-secondary">
            IMPACTHIRE DESIGN SYSTEM
          </p>

          <h1 className="mt-3 text-display-large leading-display-large font-bold text-text-primary">
            Design Tokens Documentation
          </h1>

          <p className="mt-4 max-w-3xl text-body-large leading-body-large text-text-secondary">
            Sistema visual construido sobre Design Tokens semánticos. Los
            componentes consumen tokens de color y tipografía para mantener
            consistencia, escalabilidad y accesibilidad en toda la plataforma.
          </p>
        </section>

        {/* ======================================================
            60 / 30 / 10
        ====================================================== */}

        <section className="rounded-2xl border border-border-light bg-bg-primary p-8">
          <h2 className="text-h2 leading-h2 font-semibold text-text-primary">
            Regla Visual 60 / 30 / 10
          </h2>

          <p className="mt-3 text-body-medium leading-body-medium text-text-secondary">
            ImpactHire utiliza una distribución visual basada en la regla 60 /
            30 / 10 para mantener jerarquía, claridad y foco en las acciones
            principales.
          </p>

          <div className="mt-8 overflow-hidden rounded-xl">
            <div className="flex h-16">
              <div className="flex w-[60%] items-center justify-center bg-bg-secondary text-body-small font-medium text-text-primary">
                60% Background
              </div>

              <div className="flex w-[30%] items-center justify-center bg-brand-primary text-body-small font-medium text-text-inverse">
                30% Brand Primary
              </div>

              <div className="flex w-[10%] items-center justify-center bg-brand-secondary text-body-small font-medium text-text-inverse">
                10% Action Color
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            BRAND COLORS
        ====================================================== */}

        <section
          id="colors"
          className="rounded-2xl border border-border-light bg-bg-primary p-8"
        >
          <h2 className="text-h2 leading-h2 font-semibold text-text-primary">
            Brand Colors
          </h2>

          <p className="mt-3 text-body-medium leading-body-medium text-text-secondary">
            Los colores de marca definen la identidad visual y la jerarquía de
            información dentro de la plataforma.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* PRIMARY */}
            <article className="overflow-hidden rounded-xl border border-border-light">
              <div className="h-32 bg-brand-primary" />

              <div className="p-5">
                <h3 className="text-h4 leading-h4 font-semibold text-text-primary">
                  Brand Primary
                </h3>

                <p className="mt-2 text-body-small text-text-secondary">
                  Confianza, datos, profesionalismo y estructura.
                </p>

                <p className="mt-4 text-label-small font-medium text-text-tertiary">
                  --color-brand-primary
                </p>
              </div>
            </article>

            {/* SECONDARY */}
            <article className="overflow-hidden rounded-xl border border-border-light">
              <div className="h-32 bg-brand-secondary" />

              <div className="p-5">
                <h3 className="text-h4 leading-h4 font-semibold text-text-primary">
                  Brand Secondary
                </h3>

                <p className="mt-2 text-body-small text-text-secondary">
                  Acciones, interacción y llamadas a la acción.
                </p>

                <p className="mt-4 text-label-small font-medium text-text-tertiary">
                  --color-brand-secondary
                </p>
              </div>
            </article>

            {/* TERTIARY */}
            <article className="overflow-hidden rounded-xl border border-border-light">
              <div className="h-32 bg-brand-tertiary" />

              <div className="p-5">
                <h3 className="text-h4 leading-h4 font-semibold text-text-primary">
                  Brand Tertiary
                </h3>

                <p className="mt-2 text-body-small text-text-secondary">
                  Matching, ESG, diversidad e impacto social.
                </p>

                <p className="mt-4 text-label-small font-medium text-text-tertiary">
                  --color-brand-tertiary
                </p>
              </div>
            </article>
          </div>
        </section>
        {/* ======================================================
            BACKGROUNDS
        ====================================================== */}

        <section className="rounded-2xl border border-border-light bg-bg-primary p-8">
          <h2 className="text-h2 leading-h2 font-semibold text-text-primary">
            Background Tokens
          </h2>

          <p className="mt-3 text-body-medium leading-body-medium text-text-secondary">
            Los fondos establecen profundidad visual y ayudan a construir
            jerarquía entre páginas, secciones y componentes.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="overflow-hidden rounded-xl border border-border-light">
              <div className="h-24 bg-bg-primary" />
              <div className="p-4">
                <p className="font-medium text-text-primary">
                  Background Primary
                </p>
                <p className="text-body-small text-text-tertiary">
                  --color-bg-primary
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-border-light">
              <div className="h-24 bg-bg-secondary" />
              <div className="p-4">
                <p className="font-medium text-text-primary">
                  Background Secondary
                </p>
                <p className="text-body-small text-text-tertiary">
                  --color-bg-secondary
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-border-light">
              <div className="h-24 bg-bg-tertiary" />
              <div className="p-4">
                <p className="font-medium text-text-primary">
                  Background Tertiary
                </p>
                <p className="text-body-small text-text-tertiary">
                  --color-bg-tertiary
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-border-light">
              <div className="h-24 bg-bg-dark" />
              <div className="p-4">
                <p className="font-medium text-text-primary">Background Dark</p>
                <p className="text-body-small text-text-tertiary">
                  --color-bg-dark
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            TEXT COLORS
        ====================================================== */}

        <section className="rounded-2xl border border-border-light bg-bg-primary p-8">
          <h2 className="text-h2 leading-h2 font-semibold text-text-primary">
            Text Tokens
          </h2>

          <p className="mt-3 text-body-medium leading-body-medium text-text-secondary">
            Los tokens semánticos de texto garantizan consistencia en toda la
            experiencia.
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <p className="text-body-small text-text-tertiary mb-2">
                Text Primary
              </p>

              <p className="text-h3 leading-h3 font-semibold text-text-primary">
                The future of inclusive hiring starts here.
              </p>
            </div>

            <div>
              <p className="text-body-small text-text-tertiary mb-2">
                Text Secondary
              </p>

              <p className="text-body-large leading-body-large text-text-secondary">
                Secondary text is used for descriptions, supporting content,
                labels and contextual information.
              </p>
            </div>

            <div>
              <p className="text-body-small text-text-tertiary mb-2">
                Text Tertiary
              </p>

              <p className="text-body-medium leading-body-medium text-text-tertiary">
                Metadata, placeholders and low-emphasis information.
              </p>
            </div>

            <div className="rounded-xl bg-bg-dark p-6">
              <p className="text-body-small mb-2 text-text-inverse/70">
                Text Inverse
              </p>

              <p className="text-h4 font-semibold text-text-inverse">
                Used on dark surfaces and dark brand areas.
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================
            BORDER TOKENS
        ====================================================== */}

        <section className="rounded-2xl border border-border-light bg-bg-primary p-8">
          <h2 className="text-h2 leading-h2 font-semibold text-text-primary">
            Border Tokens
          </h2>

          <p className="mt-3 text-body-medium text-text-secondary">
            Utilizados para separación visual, agrupación de contenido y estados
            de componentes.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-border-light p-6">
              <h3 className="font-semibold text-text-primary">Border Light</h3>

              <p className="mt-2 text-body-small text-text-secondary">
                Cards, divisores suaves y layouts.
              </p>
            </div>

            <div className="rounded-xl border-2 border-border-medium p-6">
              <h3 className="font-semibold text-text-primary">Border Medium</h3>

              <p className="mt-2 text-body-small text-text-secondary">
                Inputs, tablas y componentes interactivos.
              </p>
            </div>

            <div className="rounded-xl border-4 border-border-strong p-6">
              <h3 className="font-semibold text-text-primary">Border Strong</h3>

              <p className="mt-2 text-body-small text-text-secondary">
                Estados destacados o alto contraste.
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================
            TYPOGRAPHY
        ====================================================== */}

        <section
          id="typography"
          className="rounded-2xl border border-border-light bg-bg-primary p-8"
        >
          <h2 className="text-h2 leading-h2 font-semibold text-text-primary">
            Typography Scale
          </h2>

          <p className="mt-3 text-body-medium text-text-secondary">
            Familia tipográfica: Inter.
          </p>

          <div className="mt-10 space-y-10">
            {/* DISPLAY */}

            <div>
              <h3 className="mb-6 text-h4 font-semibold text-brand-secondary">
                Display
              </h3>

              <div className="space-y-6">
                <div>
                  <p className="text-display-large leading-display-large font-bold text-text-primary">
                    Display Large
                  </p>
                </div>

                <div>
                  <p className="text-display-medium leading-display-medium font-bold text-text-primary">
                    Display Medium
                  </p>
                </div>

                <div>
                  <p className="text-display-small leading-display-small font-semibold text-text-primary">
                    Display Small
                  </p>
                </div>
              </div>
            </div>

            {/* HEADINGS */}

            <div>
              <h3 className="mb-6 text-h4 font-semibold text-brand-secondary">
                Headings
              </h3>

              <div className="space-y-5">
                <h1 className="text-h1 leading-h1 font-bold text-text-primary">
                  Heading 1
                </h1>

                <h2 className="text-h2 leading-h2 font-semibold text-text-primary">
                  Heading 2
                </h2>

                <h3 className="text-h3 leading-h3 font-semibold text-text-primary">
                  Heading 3
                </h3>

                <h4 className="text-h4 leading-h4 font-semibold text-text-primary">
                  Heading 4
                </h4>
              </div>
            </div>
            {/* BODY */}

            <div>
              <h3 className="mb-6 text-h4 font-semibold text-brand-secondary">
                Body
              </h3>

              <div className="space-y-5">
                <p className="text-body-large leading-body-large text-text-primary">
                  Body Large — Used for primary content and longer reading
                  experiences.
                </p>

                <p className="text-body-medium leading-body-medium text-text-primary">
                  Body Medium — Default size for application content.
                </p>

                <p className="text-body-small leading-body-small text-text-primary">
                  Body Small — Metadata, helper text and compact layouts.
                </p>
              </div>
            </div>

            {/* LABELS */}

            <div>
              <h3 className="mb-6 text-h4 font-semibold text-brand-secondary">
                Labels
              </h3>

              <div className="space-y-5">
                <p className="text-label-large leading-label-large font-medium text-text-primary">
                  Label Large
                </p>

                <p className="text-label-small leading-label-small font-medium text-text-primary">
                  Label Small
                </p>
              </div>
            </div>

            {/* BUTTON TYPOGRAPHY */}

            <div>
              <h3 className="mb-6 text-h4 font-semibold text-brand-secondary">
                Button Typography
              </h3>

              <div className="flex flex-wrap gap-4">
                <button className="rounded-lg bg-button-primary-bg px-6 py-3 text-button-large leading-button-large font-semibold text-button-primary-text">
                  Large
                </button>

                <button className="rounded-lg bg-button-primary-bg px-5 py-2.5 text-button-medium leading-button-medium font-semibold text-button-primary-text">
                  Medium
                </button>

                <button className="rounded-lg bg-button-primary-bg px-4 py-2 text-button-small leading-button-small font-semibold text-button-primary-text">
                  Small
                </button>
              </div>
            </div>

            {/* METRICS */}

            <div>
              <h3 className="mb-6 text-h4 font-semibold text-brand-secondary">
                Metrics
              </h3>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-border-light p-6">
                  <p className="text-metric-label leading-metric-label font-medium text-text-secondary">
                    Total Candidates
                  </p>

                  <p className="mt-2 text-metric-large leading-metric-large font-bold text-brand-primary">
                    2,584
                  </p>
                </div>

                <div className="rounded-xl border border-border-light p-6">
                  <p className="text-metric-label leading-metric-label font-medium text-text-secondary">
                    Average Match
                  </p>

                  <p className="mt-2 text-metric-medium leading-metric-medium font-bold text-brand-tertiary">
                    92%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            BUTTONS
        ====================================================== */}

        <section
          id="components"
          className="rounded-2xl border border-border-light bg-bg-primary p-8"
        >
          <h2 className="text-h2 leading-h2 font-semibold text-text-primary">
            Buttons
          </h2>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-lg bg-button-primary-bg px-5 py-3 font-semibold text-button-primary-text transition-colors hover:bg-button-primary-hover">
              Primary
            </button>

            <button className="rounded-lg border border-button-secondary-border px-5 py-3 font-semibold text-button-secondary-text transition-colors hover:text-button-secondary-hover">
              Secondary
            </button>

            <button className="rounded-lg bg-button-tertiary-bg px-5 py-3 font-semibold text-button-tertiary-text transition-colors hover:bg-button-tertiary-hover">
              Tertiary
            </button>
          </div>
        </section>

        {/* ======================================================
            NAVIGATION
        ====================================================== */}

        <section className="rounded-2xl border border-border-light bg-bg-primary p-8">
          <h2 className="text-h2 leading-h2 font-semibold text-text-primary">
            Navigation
          </h2>

          <div className="mt-8 flex gap-8">
            <span className="text-nav-item font-medium text-nav-sidebar-default">
              Default
            </span>

            <span className="text-nav-item font-medium text-nav-sidebar-hover">
              Hover
            </span>

            <span className="text-nav-item font-medium text-nav-sidebar-active">
              Active
            </span>
          </div>
        </section>

        {/* ======================================================
            INPUTS
        ====================================================== */}

        <section className="rounded-2xl border border-border-light bg-bg-primary p-8">
          <h2 className="text-h2 leading-h2 font-semibold text-text-primary">
            Inputs
          </h2>

          <div className="mt-8 max-w-xl space-y-5">
            <div>
              <label className="mb-2 block text-label-large font-medium text-input-label">
                Candidate Search
              </label>

              <input
                placeholder="Search candidates..."
                className="
                  w-full
                  rounded-lg
                  border
                  border-input-border
                  bg-input-bg
                  p-3
                  text-input-text
                  placeholder:text-input-placeholder
                  outline-none
                  focus:border-input-focus
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-label-large font-medium text-input-label">
                Error State
              </label>

              <input
                placeholder="Required field"
                className="
                  w-full
                  rounded-lg
                  border
                  border-input-error
                  bg-input-bg
                  p-3
                  text-input-text
                  outline-none
                "
              />
            </div>
          </div>
        </section>

        {/* ======================================================
            STATUS & BADGES
        ====================================================== */}

        <section className="rounded-2xl border border-border-light bg-bg-primary p-8">
          <h2 className="text-h2 leading-h2 font-semibold text-text-primary">
            Status & Badges
          </h2>

          <div className="mt-8 flex flex-wrap gap-4">
            <span className="rounded-full bg-badge-success-bg px-4 py-2 text-badge font-semibold text-badge-success-text">
              Success
            </span>

            <span className="rounded-full bg-badge-warning-bg px-4 py-2 text-badge font-semibold text-badge-warning-text">
              Warning
            </span>

            <span className="rounded-full bg-badge-error-bg px-4 py-2 text-badge font-semibold text-badge-error-text">
              Error
            </span>

            <span className="rounded-full bg-badge-esg-bg px-4 py-2 text-badge font-semibold text-badge-esg-text">
              ESG
            </span>

            <span className="rounded-full bg-badge-diversity-bg px-4 py-2 text-badge font-semibold text-badge-diversity-text">
              Diversity
            </span>
          </div>
        </section>

        {/* ======================================================
            CHART COLORS
        ====================================================== */}

        <section className="rounded-2xl border border-border-light bg-bg-primary p-8">
          <h2 className="text-h2 leading-h2 font-semibold text-text-primary">
            Chart Palette
          </h2>

          <div className="mt-8 grid grid-cols-5 gap-4">
            <div className="h-24 rounded-xl bg-chart-1" />
            <div className="h-24 rounded-xl bg-chart-2" />
            <div className="h-24 rounded-xl bg-chart-3" />
            <div className="h-24 rounded-xl bg-chart-4" />
            <div className="h-24 rounded-xl bg-chart-5" />
          </div>
        </section>

        {/* ======================================================
            REAL EXAMPLE
        ====================================================== */}

        <section className="rounded-2xl border border-border-light bg-bg-primary p-8">
          <h2 className="text-h2 leading-h2 font-semibold text-text-primary">
            Candidate Match Example
          </h2>

          <div className="mt-8 rounded-2xl border border-border-medium p-8">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-h3 leading-h3 font-semibold text-text-primary">
                  Maria Rodriguez
                </h3>

                <p className="mt-1 text-body-medium text-text-secondary">
                  Frontend Developer
                </p>
              </div>

              <span className="rounded-full bg-badge-diversity-bg px-4 py-2 text-badge font-semibold text-badge-diversity-text">
                Diversity Badge
              </span>
            </div>

            <div className="mt-8">
              <p className="text-label-large font-medium text-text-secondary">
                Matching Score
              </p>

              <div className="mt-3 h-4 overflow-hidden rounded-full bg-bg-tertiary">
                <div className="h-full w-[92%] bg-brand-tertiary" />
              </div>

              <p className="mt-3 text-body-large font-semibold text-brand-tertiary">
                92% Match
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-bg-secondary p-5">
                <p className="text-metric-label font-medium text-text-secondary">
                  Skills
                </p>

                <p className="mt-2 text-metric-medium font-bold text-brand-primary">
                  95%
                </p>
              </div>

              <div className="rounded-xl bg-bg-secondary p-5">
                <p className="text-metric-label font-medium text-text-secondary">
                  Experience
                </p>

                <p className="mt-2 text-metric-medium font-bold text-brand-primary">
                  89%
                </p>
              </div>

              <div className="rounded-xl bg-bg-secondary p-5">
                <p className="text-metric-label font-medium text-text-secondary">
                  Diversity
                </p>

                <p className="mt-2 text-metric-medium font-bold text-brand-tertiary">
                  98%
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
