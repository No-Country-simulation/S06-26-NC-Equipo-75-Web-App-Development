import brandLogo from '../assets/images/brand.svg';

export default function ColorPaletteTest() {
  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* NAVBAR */}
      <header className="bg-bg-primary border-b border-border-light shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <img src={brandLogo} alt="ImpactHire" className="h-10 w-auto" />

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <a
              href="#"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Dashboard
            </a>

            <a
              href="#"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Candidates
            </a>

            <a
              href="#"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Jobs
            </a>

            <button className="rounded-lg bg-button-primary px-4 py-2 text-button-primary-text hover:bg-button-primary-hover transition-colors">
              Publish Job
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8 space-y-8">
        {/* INTRO */}
        <section className="bg-bg-primary border border-border-light rounded-xl p-8 shadow-sm">
          <h1 className="text-4xl font-bold text-text-primary">
            ImpactHire Design System
          </h1>

          <p className="mt-4 text-text-secondary">
            Visual documentation for colors, semantic tokens, component states
            and usage guidelines.
          </p>
        </section>

        {/* BRAND PHILOSOPHY */}
        <section className="bg-bg-primary border border-border-light rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">
            Brand Colors
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="h-24 rounded-lg bg-brand-primary" />

              <h3 className="mt-3 font-semibold text-text-primary">Navy</h3>

              <p className="text-text-secondary">Company · Data · Trust</p>

              <p className="text-sm text-text-tertiary mt-2">
                Used for navigation, dashboards, headings and strategic
                information.
              </p>
            </div>

            <div>
              <div className="h-24 rounded-lg bg-brand-secondary" />

              <h3 className="mt-3 font-semibold text-text-primary">Teal</h3>

              <p className="text-text-secondary">Inclusion · Talent · Action</p>

              <p className="text-sm text-text-tertiary mt-2">
                Used for calls-to-action, focus states and primary actions.
              </p>
            </div>

            <div>
              <div className="h-24 rounded-lg bg-brand-tertiary" />

              <h3 className="mt-3 font-semibold text-text-primary">
                Connection
              </h3>

              <p className="text-text-secondary">
                Matching · Diversity · Impact
              </p>

              <p className="text-sm text-text-tertiary mt-2">
                Reserved for diversity indicators, ESG metrics and matching.
              </p>
            </div>
          </div>
        </section>

        {/* VISUAL BALANCE */}
        <section className="bg-bg-primary border border-border-light rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Visual Balance Rule
          </h2>

          <p className="text-text-secondary mb-6">
            ImpactHire follows the 60 / 30 / 10 rule.
          </p>

          <div className="h-12 flex rounded-lg overflow-hidden">
            <div className="w-[60%] bg-bg-secondary flex items-center justify-center text-xs text-text-primary">
              60% White + Gray
            </div>

            <div className="w-[30%] bg-brand-primary flex items-center justify-center text-xs text-text-inverse">
              30% Navy
            </div>

            <div className="w-[10%] bg-brand-secondary flex items-center justify-center text-xs text-text-inverse">
              10% Teal
            </div>
          </div>
        </section>

        {/* BUTTONS */}
        <section className="bg-bg-primary border border-border-light rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">
            Buttons
          </h2>

          <div className="flex flex-wrap gap-4">
            <button className="px-5 py-3 rounded-lg bg-button-primary text-button-primary-text hover:bg-button-primary-hover">
              Primary Action
            </button>

            <button className="px-5 py-3 rounded-lg border border-button-secondary-border bg-button-secondary text-button-secondary-text">
              Secondary Action
            </button>

            <button className="px-5 py-3 rounded-lg text-button-tertiary-text hover:bg-button-tertiary-hover">
              Tertiary Action
            </button>
          </div>
        </section>

        {/* INPUTS */}
        <section className="bg-bg-primary border border-border-light rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">
            Form Controls
          </h2>

          <input
            placeholder="Search candidates..."
            className="
              w-full
              max-w-xl
              rounded-lg
              border
              border-input-border
              bg-input-bg
              p-3
              focus:border-input-focus
              outline-none
            "
          />
        </section>

        {/* BADGES */}
        <section className="bg-bg-primary border border-border-light rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">
            Status & Badges
          </h2>

          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 rounded-full bg-badge-success-bg text-badge-success-text">
              Success
            </span>

            <span className="px-3 py-1 rounded-full bg-badge-warning-bg text-badge-warning-text">
              Warning
            </span>

            <span className="px-3 py-1 rounded-full bg-badge-error-bg text-badge-error-text">
              Error
            </span>

            <span className="px-3 py-1 rounded-full bg-badge-esg-bg text-badge-esg-text">
              ESG
            </span>

            <span className="px-3 py-1 rounded-full bg-badge-diversity-bg text-badge-diversity-text">
              Diversity
            </span>
          </div>
        </section>

        {/* REAL BUSINESS EXAMPLE */}
        <section className="bg-bg-primary border border-border-light rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">
            Candidate Match Example
          </h2>

          <div className="border border-border-medium rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-text-primary">
                  Maria Rodriguez
                </h3>

                <p className="text-text-secondary">Frontend Developer</p>
              </div>

              <span className="bg-badge-diversity-bg text-badge-diversity-text px-3 py-1 rounded-full">
                Diversity Badge
              </span>
            </div>

            <div className="mt-6">
              <p className="text-text-secondary mb-2">Matching Score</p>

              <div className="h-4 rounded-full bg-bg-tertiary overflow-hidden">
                <div className="h-full w-[92%] bg-brand-tertiary" />
              </div>

              <p className="mt-2 text-brand-tertiary font-semibold">
                92% Match
              </p>
            </div>
          </div>
        </section>

        {/* CHART COLORS */}
        <section className="bg-bg-primary border border-border-light rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">
            Chart Palette
          </h2>

          <div className="flex gap-4">
            <div className="h-20 w-20 rounded bg-chart-1" />
            <div className="h-20 w-20 rounded bg-chart-2" />
            <div className="h-20 w-20 rounded bg-chart-3" />
            <div className="h-20 w-20 rounded bg-chart-4" />
            <div className="h-20 w-20 rounded bg-chart-5" />
          </div>
        </section>
      </main>
    </div>
  );
}
