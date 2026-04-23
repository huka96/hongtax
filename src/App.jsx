export default function HongTaxWebsite() {
  const services = [
    {
      icon: '📝',
      title: 'Tax Preparation & Planning',
      description:
        'Individual and business tax returns, planning, and compliance support to minimize tax exposure and improve clarity.',
    },
    {
      icon: '🧮',
      title: 'Accounting & Bookkeeping',
      description:
        'Accurate bookkeeping and reporting to keep your business organized, compliant, and decision-ready.',
    },
    {
      icon: '◔',
      title: 'Business Advisory',
      description:
        'Strategic guidance on operations, cash flow, entity structure, and financial processes for growth.',
    },
    {
      icon: '👥',
      title: 'Payroll & Sales Tax Services',
      description:
        'Payroll processing and sales tax compliance support you can rely on throughout the year.',
    },
  ];

  const strengths = [
    {
      icon: '🛡',
      title: 'Trusted & Reliable',
    },
    {
      icon: '💬',
      title: 'Clear Communication',
    },
    {
      icon: '↗',
      title: 'Proactive Approach',
    },
  ];

  return (
    <div className="page-root">
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f3ef; color: #1c2f57; }
        a { text-decoration: none; color: inherit; }
        button, input, textarea { font: inherit; }

        .page-root { background: #f5f3ef; color: #1c2f57; }
        .container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 28px; }

        .topbar {
          position: sticky; top: 0; z-index: 40;
          background: rgba(245, 243, 239, 0.95);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(28, 47, 87, 0.08);
        }
        .topbar-inner {
          min-height: 88px; display: flex; align-items: center; justify-content: space-between; gap: 20px;
        }
        .brand-wrap { display: flex; flex-direction: column; gap: 4px; }
        .brand-mark { font-family: Georgia, 'Times New Roman', serif; font-weight: 700; font-size: 42px; line-height: 0.9; letter-spacing: -0.04em; }
        .brand-sub { font-size: 18px; color: #d29a5f; }
        .nav { display: flex; align-items: center; gap: 34px; font-size: 16px; }
        .nav a { opacity: 0.9; }
        .nav a:hover { opacity: 1; }
        .btn {
          display: inline-flex; align-items: center; justify-content: center;
          border-radius: 12px; padding: 14px 24px; font-weight: 600; transition: 0.2s ease;
        }
        .btn-primary { background: #d29a5f; color: white; box-shadow: 0 8px 24px rgba(210, 154, 95, 0.25); }
        .btn-primary:hover { transform: translateY(-1px); opacity: 0.95; }
        .btn-dark { background: #1c2f57; color: white; box-shadow: 0 8px 24px rgba(28, 47, 87, 0.18); }
        .btn-dark:hover { transform: translateY(-1px); opacity: 0.96; }
        .btn-light { border: 1px solid rgba(28, 47, 87, 0.28); color: #1c2f57; background: transparent; }
        .btn-light:hover { background: rgba(28, 47, 87, 0.04); }

        .hero { padding: 58px 0 72px; }
        .hero-grid {
          display: grid; grid-template-columns: 1fr 1.02fr; gap: 44px; align-items: center;
        }
        .eyebrow {
          color: #d29a5f; font-size: 15px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 18px;
        }
        .hero h1 {
          margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 72px; line-height: 0.95; letter-spacing: -0.04em; color: #1c2f57;
        }
        .hero p {
          margin: 24px 0 0; max-width: 560px; font-size: 21px; line-height: 1.7; color: rgba(28, 47, 87, 0.82);
        }
        .hero-actions { margin-top: 34px; display: flex; gap: 16px; flex-wrap: wrap; }

        .hero-card {
          background: #162a4f; color: white; border-radius: 18px; min-height: 560px;
          box-shadow: 0 24px 60px rgba(14, 25, 45, 0.18); display: flex; align-items: center; justify-content: center; padding: 36px;
        }
        .logo-panel { text-align: center; }
        .logo-icons { display: flex; align-items: center; justify-content: center; gap: 14px; margin-bottom: 22px; }
        .logo-shape-1, .logo-shape-2, .logo-shape-3, .logo-shape-4 { background: white; opacity: 0.98; }
        .logo-shape-1 { width: 20px; height: 38px; }
        .logo-shape-2 { width: 38px; height: 38px; border-radius: 50%; }
        .logo-shape-3 { width: 18px; height: 42px; transform: rotate(-34deg); }
        .logo-shape-4 { width: 38px; height: 38px; border-radius: 0 999px 999px 0; }
        .logo-name { font-family: Georgia, 'Times New Roman', serif; font-weight: 700; letter-spacing: -0.05em; font-size: 108px; line-height: 0.9; }
        .logo-tag { font-size: 36px; color: #d29a5f; margin-top: 12px; }

        .section-soft { background: #eeece9; padding: 84px 0; }
        .section-title-wrap { text-align: center; max-width: 760px; margin: 0 auto 42px; }
        .section-label { color: #d29a5f; text-transform: uppercase; font-weight: 700; letter-spacing: 0.08em; font-size: 15px; }
        .section-title {
          margin: 14px 0 0; font-family: Georgia, 'Times New Roman', serif; font-size: 56px; line-height: 1.02; letter-spacing: -0.03em;
        }
        .section-divider { width: 42px; height: 3px; border-radius: 999px; background: #d29a5f; margin: 18px auto 0; }

        .service-grid {
          display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 22px;
        }
        .service-card {
          background: #f8f6f3; border-radius: 18px; padding: 28px 24px; box-shadow: 0 8px 20px rgba(28, 47, 87, 0.06); border: 1px solid rgba(28, 47, 87, 0.05);
          display: flex; flex-direction: column; min-height: 288px;
        }
        .service-icon {
          width: 62px; height: 62px; border-radius: 16px; display: flex; align-items: center; justify-content: center; background: rgba(28, 47, 87, 0.04); font-size: 31px; margin-bottom: 22px;
        }
        .service-card h3 { margin: 0 0 12px; font-size: 30px; line-height: 1.05; letter-spacing: -0.03em; }
        .service-card p { margin: 0; color: rgba(28, 47, 87, 0.78); line-height: 1.75; font-size: 17px; }
        .service-link { margin-top: auto; padding-top: 18px; color: #d29a5f; font-weight: 600; }

        .about-band {
          background: #162a4f; color: white; padding: 78px 0;
        }
        .about-grid { display: grid; grid-template-columns: 1fr 1.08fr; gap: 44px; align-items: center; }
        .about-copy .section-label { color: #d8a56d; }
        .about-copy .section-title { color: white; font-size: 58px; }
        .about-copy .section-divider { margin-left: 0; }
        .about-text {
          color: rgba(255,255,255,0.86); font-size: 19px; line-height: 1.8; max-width: 520px; margin: 24px 0 0;
        }
        .strength-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; margin-top: 34px; }
        .strength-item { display: flex; flex-direction: column; gap: 8px; }
        .strength-icon { font-size: 34px; color: #d29a5f; }
        .strength-title { font-size: 18px; line-height: 1.4; }
        .about-image {
          border-radius: 18px; min-height: 420px; overflow: hidden; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.18);
          background:
            linear-gradient(rgba(19,33,63,0.28), rgba(19,33,63,0.12)),
            url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80') center/cover no-repeat;
        }

        .contact-section { background: #f5f3ef; padding: 82px 0 72px; }
        .contact-grid { display: grid; grid-template-columns: 0.92fr 1.08fr; gap: 40px; align-items: start; }
        .contact-text { margin-top: 24px; color: rgba(28, 47, 87, 0.82); font-size: 21px; line-height: 1.6; max-width: 430px; }
        .contact-lines { display: grid; gap: 14px; margin-top: 26px; font-size: 20px; color: rgba(28, 47, 87, 0.92); }
        .contact-card {
          background: #fbfaf8; border-radius: 18px; padding: 34px; box-shadow: 0 14px 36px rgba(28, 47, 87, 0.08); border: 1px solid rgba(28, 47, 87, 0.06);
        }
        .contact-card h3 {
          margin: 0 0 22px; font-family: Georgia, 'Times New Roman', serif; font-size: 42px; line-height: 1.05; letter-spacing: -0.03em;
        }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .full-row { grid-column: 1 / -1; }
        .field {
          width: 100%; border: 1px solid rgba(28, 47, 87, 0.14); background: white; color: #1c2f57; border-radius: 10px;
          padding: 15px 16px; outline: none; font-size: 16px;
        }
        .field:focus { border-color: #d29a5f; box-shadow: 0 0 0 3px rgba(210, 154, 95, 0.12); }
        textarea.field { min-height: 126px; resize: vertical; }

        .footer {
          background: #162a4f; color: white; padding: 28px 0 22px;
        }
        .footer-top {
          display: grid; grid-template-columns: 1.2fr 1fr 1fr auto; gap: 24px; align-items: center;
        }
        .footer-brand .brand-mark { font-size: 54px; color: white; }
        .footer-brand .brand-sub { color: #d29a5f; }
        .footer-col { color: rgba(255,255,255,0.88); line-height: 1.7; }
        .socials { display: flex; gap: 12px; justify-content: flex-end; }
        .social {
          width: 42px; height: 42px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.28);
          display: flex; align-items: center; justify-content: center; font-size: 18px;
        }
        .footer-divider { height: 1px; background: rgba(255,255,255,0.12); margin: 20px 0 16px; }
        .footer-bottom { display: flex; justify-content: space-between; gap: 18px; color: rgba(255,255,255,0.72); font-size: 14px; }
        .footer-links { display: flex; gap: 26px; }

        @media (max-width: 1100px) {
          .hero h1 { font-size: 60px; }
          .section-title, .about-copy .section-title, .contact-card h3 { font-size: 46px; }
          .service-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .footer-top { grid-template-columns: 1fr 1fr; }
          .socials { justify-content: flex-start; }
        }

        @media (max-width: 900px) {
          .nav { display: none; }
          .topbar-inner { flex-wrap: wrap; padding: 12px 0; }
          .hero-grid, .about-grid, .contact-grid { grid-template-columns: 1fr; }
          .hero-card { min-height: 420px; }
          .logo-name { font-size: 86px; }
          .hero h1 { font-size: 54px; }
        }

        @media (max-width: 640px) {
          .container { padding: 0 18px; }
          .hero { padding: 34px 0 56px; }
          .hero h1 { font-size: 42px; }
          .hero p, .contact-text, .about-text { font-size: 18px; }
          .section-soft, .contact-section, .about-band { padding: 64px 0; }
          .section-title, .about-copy .section-title, .contact-card h3 { font-size: 38px; }
          .service-grid, .strength-grid, .form-grid, .footer-top, .footer-bottom { grid-template-columns: 1fr; display: grid; }
          .footer-bottom { gap: 8px; }
          .footer-links { gap: 14px; flex-wrap: wrap; }
          .logo-name { font-size: 72px; }
          .logo-tag { font-size: 30px; }
        }
      `}</style>

      <header className="topbar">
        <div className="container topbar-inner">
          <div className="brand-wrap">
            <div className="brand-mark">HONG</div>
            <div className="brand-sub">Tax & Advisory</div>
          </div>

          <nav className="nav">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#clients">Clients</a>
            <a href="#resources">Resources</a>
            <a href="#contact">Contact</a>
          </nav>

          <a href="#contact" className="btn btn-primary">Book a Consultation</a>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">Tax. Accounting. Advisory.</div>
            <h1>
              Trusted guidance.<br />
              Strategic insight.
            </h1>
            <p>
              We provide tax, accounting, and advisory services to help individuals
              and businesses grow with confidence.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-dark">Book a Consultation</a>
              <a href="#services" className="btn btn-light">Our Services</a>
            </div>
          </div>

          <div className="hero-card" aria-label="Hong Tax & Advisory logo panel">
            <div className="logo-panel">
              <div className="logo-icons">
                <div className="logo-shape-1" />
                <div className="logo-shape-2" />
                <div className="logo-shape-3" />
                <div className="logo-shape-4" />
              </div>
              <div className="logo-name">HONG</div>
              <div className="logo-tag">Tax & Advisory</div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section-soft">
        <div className="container">
          <div className="section-title-wrap">
            <div className="section-label">Services</div>
            <div className="section-title">Solutions tailored to your needs</div>
            <div className="section-divider" />
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <div className="service-card" key={service.title}>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-link">Learn more →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about-band">
        <div className="container about-grid">
          <div className="about-copy">
            <div className="section-label">About</div>
            <div className="section-title">
              More than numbers.<br />
              A partner in your success.
            </div>
            <div className="section-divider" />
            <p className="about-text">
              At Hong Tax & Advisory, we combine technical expertise with personalized
              service. Our goal is to simplify complex matters so you can focus on
              what you do best.
            </p>

            <div className="strength-grid">
              {strengths.map((item) => (
                <div className="strength-item" key={item.title}>
                  <div className="strength-icon">{item.icon}</div>
                  <div className="strength-title">{item.title}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-image" />
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container contact-grid">
          <div>
            <div className="section-label">Contact</div>
            <div className="section-title">
              Let’s build your<br />
              financial success together.
            </div>
            <div className="section-divider" style={{ marginLeft: 0 }} />
            <div className="contact-text">
              Reach out to schedule a consultation and tell us how we can support
              your tax and accounting needs.
            </div>
            <div className="contact-lines">
              <div>✉ hello@hongtax.com</div>
              <div>☎ +1 (234) 456-7890</div>
            </div>
          </div>

          <div className="contact-card">
            <h3>Request a Consultation</h3>
            <div className="form-grid">
              <input className="field" placeholder="Full Name" />
              <input className="field" placeholder="Email Address" />
              <input className="field full-row" placeholder="Business / Company" />
              <textarea className="field full-row" placeholder="How can we help you?" />
              <button className="btn btn-primary full-row" type="button">Send Message</button>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand brand-wrap">
              <div className="brand-mark">HONG</div>
              <div className="brand-sub">Tax & Advisory</div>
            </div>
            <div className="footer-col">
              123 Business Ave, Suite 100<br />
              Los Angeles, CA 90001<br />
              United States
            </div>
            <div className="footer-col">
              hello@hongtax.com<br />
              +1 (234) 456-7890
            </div>
            <div className="socials">
              <div className="social">in</div>
              <div className="social">✉</div>
              <div className="social">◎</div>
            </div>
          </div>
          <div className="footer-divider" />
          <div className="footer-bottom">
            <div>© 2026 Hong Tax & Advisory. All rights reserved.</div>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
