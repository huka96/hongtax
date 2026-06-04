import { useEffect, useMemo, useState } from 'react';
import './App.css';
import logoDarkBg from './assets/logo-dark-bg.png';
import logoLightBg from './assets/logo-light-bg.png';

const LANGUAGES = [
  { code: 'ko', label: '한' },
  { code: 'zh', label: '中' },
  { code: 'en', label: 'EN' },
];

const copy = {
  ko: {
    nav: ['서비스', '진행절차', '고객유형', 'FAQ', '상담신청'],
    badge: 'HONG Tax & Advisory',
    heroTitle: '미국 세무, 한국어로 정확하게.',
    heroText:
      '개인 세금보고부터 FBAR, FATCA, IRS/FTB Notice, 소규모 비즈니스 세무까지 — 복잡한 미국 세무를 명확하고 체계적으로 안내합니다.',
    primaryCta: '상담 신청하기',
    secondaryCta: '서비스 보기',
    licenseNote: 'CPA license 발급 전에는 서비스 범위와 문구가 조정될 수 있습니다.',
    servicesLabel: 'Services',
    servicesTitle: '온라인 기반 미국 세무 서비스',
    servicesText:
      '처음부터 모든 업무를 무리하게 확장하기보다, 핵심 세무 영역을 중심으로 시스템화된 접수·검토·진행 프로세스를 구축합니다.',
    services: [
      ['Individual Tax Return', 'Form 1040, Federal & State return, extension filing, resident / nonresident tax review.'],
      ['FBAR & FATCA', '한국 및 해외 금융계좌, Form 8938, FinCEN 114 대상 여부 검토와 신고 지원.'],
      ['IRS / FTB Notice', 'IRS 또는 California FTB letter 분석, 답변 방향 정리, penalty 및 balance notice 대응.'],
      ['ITIN & Tax Compliance', 'ITIN 신청, Form 8843, prior-year filing, amended return 등 compliance 정리.'],
      ['Small Business Tax', 'Schedule C, LLC, S-Corp, Partnership, bookkeeping cleanup 및 business return 준비.'],
      ['Tax Planning', 'RSU, ESPP, capital gain, CA residency, 이민/거주 상태 변화에 따른 tax planning.'],
    ],
    processLabel: 'How it works',
    processTitle: '처음 문의부터 신고 완료까지',
    process: [
      ['01', '상담 신청', '간단한 상황과 필요한 서비스를 제출합니다.'],
      ['02', '자료 업로드', '보안 포털을 통해 세금자료를 업로드합니다.'],
      ['03', '검토 및 견적', '업무 범위, 리스크, 예상 fee를 정리합니다.'],
      ['04', '작성 및 리뷰', '신고서 작성 후 주요 포인트를 설명합니다.'],
      ['05', '전자서명 및 제출', '승인 후 e-file 또는 필요한 방식으로 제출합니다.'],
    ],
    clientsLabel: 'Who we help',
    clientsTitle: '이런 고객에게 특히 적합합니다',
    clients: [
      ['Bay Area Professionals', 'W-2, RSU, ESPP, stock compensation이 있는 직장인'],
      ['Immigrant Families', 'F-1, H-1B, green card, residency 이슈가 있는 가정'],
      ['Foreign Asset Holders', '한국 계좌, 증권, 보험, 증여·상속 이슈가 있는 미국 납세자'],
      ['Small Business Owners', 'California에서 사업을 운영하는 개인사업자와 소규모 법인'],
    ],
    faqLabel: 'FAQ',
    faqTitle: '자주 묻는 질문',
    faqs: [
      ['FBAR 신고 대상인지 어떻게 알 수 있나요?', '해외 금융계좌 합산 최고잔액이 기준을 넘는지, 계좌 유형과 소유/서명권 여부를 함께 봐야 합니다.'],
      ['한국 계좌가 있으면 무조건 FATCA 신고해야 하나요?', '아닙니다. Form 8938은 filing status와 거주지에 따라 기준금액이 다르므로 별도 검토가 필요합니다.'],
      ['IRS 또는 FTB notice를 받았는데 도와줄 수 있나요?', '가능합니다. Notice 원문, 과거 신고서, payment history를 확인한 뒤 대응 방향을 정리합니다.'],
      ['법인세 신고도 가능한가요?', '초기에는 경험과 자료 상태가 명확한 S-Corp, Partnership, LLC 중심으로 선별적으로 진행하는 방향이 안전합니다.'],
    ],
    contactLabel: 'Contact',
    contactTitle: '상담을 시작해보세요',
    contactText:
      '상황을 간단히 남겨주시면 필요한 서비스, 예상 자료, 다음 단계를 정리해 드립니다.',
    formName: '이름',
    formEmail: '이메일',
    formService: '필요한 서비스',
    formMessage: '상황 설명',
    formButton: '이메일로 문의하기',
    footerText: 'Bilingual U.S. tax and advisory support for Korean-speaking individuals and small businesses.',
  },
  zh: {
    nav: ['服务', '流程', '客户类型', 'FAQ', '咨询'],
    badge: 'HONG Tax & Advisory',
    heroTitle: '清晰可靠的美国税务服务。',
    heroText:
      '从个人报税、FBAR、FATCA、IRS/FTB 通知到小型企业税务，我们用系统化流程帮助您理解并完成美国税务事项。',
    primaryCta: '预约咨询',
    secondaryCta: '查看服务',
    licenseNote: 'CPA license 正式签发前，服务范围和网站表述可能会调整。',
    servicesLabel: 'Services',
    servicesTitle: '线上化美国税务服务',
    servicesText:
      '以核心税务服务为起点，建立清晰的咨询、资料上传、审核、报价和申报流程。',
    services: [
      ['Individual Tax Return', 'Form 1040, Federal & State return, extension filing, resident / nonresident review.'],
      ['FBAR & FATCA', '海外金融账户、Form 8938、FinCEN 114 是否需要申报的判断和准备。'],
      ['IRS / FTB Notice', '分析 IRS 或 California FTB 通知，并整理回复和解决方案。'],
      ['ITIN & Tax Compliance', 'ITIN 申请、Form 8843、往年补报、修正申报等合规事项。'],
      ['Small Business Tax', 'Schedule C, LLC, S-Corp, Partnership, bookkeeping cleanup 与企业税务准备。'],
      ['Tax Planning', 'RSU、ESPP、capital gain、CA residency 与身份变化相关税务规划。'],
    ],
    processLabel: 'How it works',
    processTitle: '从咨询到提交的流程',
    process: [
      ['01', '提交咨询', '说明您的情况和需要的服务。'],
      ['02', '上传资料', '通过安全资料入口上传税务文件。'],
      ['03', '审核报价', '确认工作范围、风险点与预计费用。'],
      ['04', '准备与复核', '完成税表准备并说明重点事项。'],
      ['05', '签字与提交', '确认后电子签名并提交。'],
    ],
    clientsLabel: 'Who we help',
    clientsTitle: '适合以下客户',
    clients: [
      ['Bay Area Professionals', '有 W-2、RSU、ESPP、股票收入的员工'],
      ['Immigrant Families', '涉及 F-1、H-1B、绿卡、税务居民身份的家庭'],
      ['Foreign Asset Holders', '拥有海外账户、证券、保险、赠与或继承事项的纳税人'],
      ['Small Business Owners', '在 California 经营业务的个人或小型企业'],
    ],
    faqLabel: 'FAQ',
    faqTitle: '常见问题',
    faqs: [
      ['我是否需要申报 FBAR？', '需要根据海外金融账户最高余额、账户类型以及是否拥有签字权来判断。'],
      ['有海外账户就一定要报 FATCA 吗？', '不一定。Form 8938 的门槛因身份和居住地不同而不同。'],
      ['收到 IRS 或 FTB 通知可以协助吗？', '可以。我们会先审核通知、历史税表和付款记录，再整理回复方案。'],
      ['可以处理公司税吗？', '初期以资料清晰、风险可控的 S-Corp、Partnership、LLC 等业务为主。'],
    ],
    contactLabel: 'Contact',
    contactTitle: '开始咨询',
    contactText: '留下您的基本情况，我们会整理所需资料和下一步。',
    formName: '姓名',
    formEmail: '邮箱',
    formService: '需要的服务',
    formMessage: '情况说明',
    formButton: '通过邮件咨询',
    footerText: '面向韩语客户、个人和小型企业的美国税务与咨询服务。',
  },
  en: {
    nav: ['Services', 'Process', 'Clients', 'FAQ', 'Contact'],
    badge: 'HONG Tax & Advisory',
    heroTitle: 'U.S. tax guidance, made clear.',
    heroText:
      'From individual tax returns to FBAR, FATCA, IRS/FTB notices, and small business tax support — a structured, bilingual approach to U.S. tax compliance.',
    primaryCta: 'Request Consultation',
    secondaryCta: 'View Services',
    licenseNote: 'Service scope and wording may be adjusted before CPA license issuance.',
    servicesLabel: 'Services',
    servicesTitle: 'Online-first U.S. tax services',
    servicesText:
      'A focused service model built around intake, secure document collection, review, quote, preparation, and filing.',
    services: [
      ['Individual Tax Return', 'Form 1040, Federal & State return, extension filing, resident / nonresident tax review.'],
      ['FBAR & FATCA', 'Foreign account reporting review and filing support for FinCEN 114 and Form 8938.'],
      ['IRS / FTB Notice', 'Notice review, response planning, penalty review, and balance-due issue support.'],
      ['ITIN & Tax Compliance', 'ITIN applications, Form 8843, prior-year filings, and amended return cleanup.'],
      ['Small Business Tax', 'Schedule C, LLC, S-Corp, Partnership, bookkeeping cleanup, and business return preparation.'],
      ['Tax Planning', 'RSU, ESPP, capital gains, California residency, and tax planning around life changes.'],
    ],
    processLabel: 'How it works',
    processTitle: 'From first request to final filing',
    process: [
      ['01', 'Request', 'Submit your situation and the service you need.'],
      ['02', 'Upload', 'Upload tax documents through a secure portal.'],
      ['03', 'Review & Quote', 'We define scope, risk areas, and expected fee.'],
      ['04', 'Prepare & Review', 'Your return is prepared and key points are explained.'],
      ['05', 'E-sign & File', 'After approval, we e-file or submit as required.'],
    ],
    clientsLabel: 'Who we help',
    clientsTitle: 'Designed for these clients',
    clients: [
      ['Bay Area Professionals', 'Employees with W-2, RSU, ESPP, and stock compensation'],
      ['Immigrant Families', 'Families navigating F-1, H-1B, green card, and residency issues'],
      ['Foreign Asset Holders', 'U.S. taxpayers with Korean accounts, securities, insurance, gifts, or inheritance'],
      ['Small Business Owners', 'California sole proprietors and small business owners'],
    ],
    faqLabel: 'FAQ',
    faqTitle: 'Frequently asked questions',
    faqs: [
      ['How do I know if I need FBAR?', 'We review maximum foreign account balances, account types, ownership, and signature authority.'],
      ['Does every foreign account require FATCA filing?', 'No. Form 8938 thresholds vary by filing status and residence, so a separate review is needed.'],
      ['Can you help with IRS or FTB notices?', 'Yes. We review the notice, prior returns, and payment history before preparing a response strategy.'],
      ['Do you prepare business returns?', 'Initially, business returns are accepted selectively based on records, scope, and risk profile.'],
    ],
    contactLabel: 'Contact',
    contactTitle: 'Start with a consultation',
    contactText:
      'Share a brief summary of your situation and we will outline the service scope, document list, and next steps.',
    formName: 'Name',
    formEmail: 'Email',
    formService: 'Service needed',
    formMessage: 'Tell us about your situation',
    formButton: 'Send Email Inquiry',
    footerText: 'Bilingual U.S. tax and advisory support for Korean-speaking individuals and small businesses.',
  },
};

function getInitialTheme() {
  const saved = window.localStorage.getItem('hong-theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function App() {
  const [language, setLanguage] = useState(() => window.localStorage.getItem('hong-language') || 'ko');
  const [theme, setTheme] = useState(getInitialTheme);
  const t = copy[language];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('hong-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh' : language;
    window.localStorage.setItem('hong-language', language);
  }, [language]);

  const logo = theme === 'dark' ? logoDarkBg : logoLightBg;
  const mailto = useMemo(() => {
    const subject = encodeURIComponent('Consultation Request - HONG Tax & Advisory');
    return `mailto:london@hongtax.com?subject=${subject}`;
  }, []);

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="HONG Tax & Advisory home">
          <img src={logo} alt="HONG Tax & Advisory" />
        </a>

        <nav className="nav" aria-label="Main navigation">
          <a href="#services">{t.nav[0]}</a>
          <a href="#process">{t.nav[1]}</a>
          <a href="#clients">{t.nav[2]}</a>
          <a href="#faq">{t.nav[3]}</a>
          <a href="#contact">{t.nav[4]}</a>
        </nav>

        <div className="toolbar" aria-label="Website controls">
          <div className="language-switcher" aria-label="Language selector">
            {LANGUAGES.map((item) => (
              <button
                key={item.code}
                className={language === item.code ? 'active' : ''}
                onClick={() => setLanguage(item.code)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            type="button"
            aria-label="Toggle dark and light mode"
          >
            {theme === 'dark' ? '☀︎' : '☾'}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section section-pad">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{t.badge}</p>
              <h1>{t.heroTitle}</h1>
              <p className="hero-text">{t.heroText}</p>
              <div className="hero-actions">
                <a className="button primary" href="#contact">{t.primaryCta}</a>
                <a className="button ghost" href="#services">{t.secondaryCta}</a>
              </div>
              <p className="license-note">{t.licenseNote}</p>
            </div>
            <div className="hero-logo-card" aria-hidden="true">
              <img src={logo} alt="" />
            </div>
          </div>
        </section>

        <section className="intro-strip">
          <div className="mark-row" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </section>

        <section id="services" className="section-pad">
          <div className="container">
            <SectionHeading label={t.servicesLabel} title={t.servicesTitle} text={t.servicesText} />
            <div className="service-grid">
              {t.services.map(([title, description]) => (
                <article className="service-card" key={title}>
                  <div className="service-symbol">{title.slice(0, 2)}</div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="section-pad process-section">
          <div className="container">
            <SectionHeading label={t.processLabel} title={t.processTitle} />
            <div className="process-grid">
              {t.process.map(([number, title, text]) => (
                <article className="process-card" key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="clients" className="section-pad clients-section">
          <div className="container two-column">
            <div>
              <p className="eyebrow">{t.clientsLabel}</p>
              <h2>{t.clientsTitle}</h2>
            </div>
            <div className="client-list">
              {t.clients.map(([title, text]) => (
                <article className="client-item" key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section-pad">
          <div className="container faq-wrap">
            <SectionHeading label={t.faqLabel} title={t.faqTitle} />
            <div className="faq-list">
              {t.faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}</summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-pad contact-section">
          <div className="container contact-grid">
            <div>
              <p className="eyebrow">{t.contactLabel}</p>
              <h2>{t.contactTitle}</h2>
              <p>{t.contactText}</p>
              <div className="contact-lines">
                <a href="mailto:london@hongtax.com">london@hongtax.com</a>
                <a href="tel:+16315769725">+1 (631) 576 - 9725</a>
              </div>
            </div>
            <form className="contact-form" action={mailto} method="post" encType="text/plain">
              <input name="name" placeholder={t.formName} />
              <input name="email" type="email" placeholder={t.formEmail} />
              <input name="service" placeholder={t.formService} />
              <textarea name="message" placeholder={t.formMessage} />
              <button className="button primary" type="submit">{t.formButton}</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <img src={theme === 'dark' ? logoDarkBg : logoLightBg} alt="HONG Tax & Advisory" />
          <p>{t.footerText}</p>
          <div>
            <a href="mailto:london@hongtax.com">london@hongtax.com</a>
            <span>© {new Date().getFullYear()} HONG Tax & Advisory</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({ label, title, text }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}
