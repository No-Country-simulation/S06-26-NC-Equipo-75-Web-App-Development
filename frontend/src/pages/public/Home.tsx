import { Link } from 'react-router-dom';
import brandLogo from '../../assets/images/brand.svg';

const Home = () => {
  return (
    <main className="min-h-screen bg-bg-secondary text-text-primary">
      <header className="bg-bg-primary border-b border-border-light">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <img src={brandLogo} alt="ImpactHire" className="h-10 w-auto" />

          <nav className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-text-secondary hover:text-brand-secondary transition-colors"
            >
              Iniciar sesión
            </Link>

            <Link
              to="/register"
              className="px-5 py-2.5 rounded-lg bg-button-primary-bg text-button-primary-text font-semibold hover:bg-button-primary-hover transition-colors"
            >
              Crear cuenta
            </Link>
          </nav>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex px-3 py-1 rounded-full bg-badge-esg-bg text-badge-esg-text text-sm font-semibold">
            Plataforma B2B de matching inclusivo
          </span>

          <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight text-text-primary">
            Convertí tus metas ESG en contrataciones diversas y medibles
          </h1>

          <p className="mt-6 text-lg text-text-secondary max-w-xl">
            ImpactHire ayuda a empresas a encontrar talento de grupos
            sub-representados, reducir sesgos en selección y medir el impacto
            real de sus procesos de diversidad.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/register"
              className="px-6 py-3 rounded-lg bg-button-primary-bg text-button-primary-text font-semibold text-center hover:bg-button-primary-hover transition-colors"
            >
              Registrar empresa
            </Link>

            <Link
              to="/login"
              className="px-6 py-3 rounded-lg border border-button-secondary-border text-button-secondary-text font-semibold text-center hover:bg-button-secondary-hover hover:text-white transition-colors"
            >
              Ya tengo cuenta
            </Link>
          </div>
        </div>

        <div className="bg-bg-primary border border-border-light rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-text-secondary">Resumen ESG</p>
              <h2 className="text-2xl font-bold">Dashboard inclusivo</h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-badge-success-bg text-badge-success-text text-sm font-semibold">
              Meta activa
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-border-light rounded-lg p-4">
              <p className="text-sm text-text-secondary">Talentos analizados</p>
              <p className="mt-2 text-3xl font-bold">184</p>
            </div>

            <div className="border border-border-light rounded-lg p-4">
              <p className="text-sm text-text-secondary">Diversidad shortlist</p>
              <p className="mt-2 text-3xl font-bold">42%</p>
            </div>

            <div className="border border-border-light rounded-lg p-4">
              <p className="text-sm text-text-secondary">Regiones activas</p>
              <p className="mt-2 text-3xl font-bold">5</p>
            </div>

            <div className="border border-border-light rounded-lg p-4">
              <p className="text-sm text-text-secondary">Filtro anti-sesgo</p>
              <p className="mt-2 text-lg font-bold text-brand-secondary">
                Activado
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg-primary border-y border-border-light">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <h2 className="text-3xl font-bold text-center">
            Una plataforma para contratar con datos, inclusión e impacto
          </h2>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <article className="border border-border-light rounded-lg p-6">
              <h3 className="text-xl font-bold">Matching inteligente</h3>
              <p className="mt-3 text-text-secondary">
                Shortlists con score de compatibilidad entre vacante, skills,
                nivel y región.
              </p>
            </article>

            <article className="border border-border-light rounded-lg p-6">
              <h3 className="text-xl font-bold">Filtro anti-sesgo</h3>
              <p className="mt-3 text-text-secondary">
                Ayuda a reducir sesgos inconscientes durante la selección de
                candidatos.
              </p>
            </article>

            <article className="border border-border-light rounded-lg p-6">
              <h3 className="text-xl font-bold">Insights geográficos</h3>
              <p className="mt-3 text-text-secondary">
                Visualización de concentración de talento y conectividad por
                región.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center">
          Servicios para fortalecer la estrategia de diversidad
        </h2>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            'Formaciones',
            'Empleabilidad',
            'Experiencias',
            'Mentorías',
            'Salud del equipo',
          ].map((service) => (
            <div
              key={service}
              className="bg-bg-primary border border-border-light rounded-lg p-5 text-center"
            >
              <p className="font-semibold">{service}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bg-dark text-text-inverse">
        <div className="max-w-7xl mx-auto px-6 py-14 text-center">
          <h2 className="text-3xl font-bold">
            Empezá a medir diversidad con impacto real
          </h2>

          <p className="mt-4 text-white/75 max-w-2xl mx-auto">
            Registrá tu empresa y comenzá a publicar vacantes con matching
            inclusivo, métricas ESG y datos regionales.
          </p>

          {/* <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/register"
              className="px-6 py-3 rounded-lg bg-button-primary-bg text-button-primary-text font-semibold hover:bg-button-primary-hover transition-colors"
            >
              Crear cuenta
            </Link>

            <Link
              to="/login"
              className="px-6 py-3 rounded-lg border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Iniciar sesión
            </Link>
          </div> */}
        </div>
      </section>
    </main>
  );
};

export default Home;