import { useEffect, useMemo, useState } from 'react';
import './App.css';
import logoDark from './assets/logo-dark-transparent.png';
import logoLight from './assets/logo-light-transparent.png';
import symbolDark from './assets/logo-symbol-dark.png';
import symbolLight from './assets/logo-symbol-light.png';

const LANGUAGES = [
  { code: 'ko', label: '한' },
  { code: 'zh', label: '中' },
  { code: 'en', label: 'EN' },
];

const SERVICE_SLUGS = [
  'individual-tax-return',
  'fbar-fatca',
  'irs-ftb-notice',
  'itin-tax-compliance',
  'small-business-tax',
  'tax-planning',
];

const copy = {
  ko: {
    nav: ['서비스', '진행절차', '소개', 'FAQ', '상담신청'],
    badge: 'HONG Tax & Advisory',
    heroTitle: '미국 세무,\n명확하고 체계적으로.',
    heroText:
      '개인 세금보고부터 해외계좌 신고, IRS/FTB Notice, 소규모 비즈니스 세무까지 상황을 먼저 이해하고 필요한 절차를 차근차근 정리합니다.',
    primaryCta: '상담 신청하기',
    secondaryCta: '서비스 보기',
    licenseNote: '',
    servicesLabel: 'Services',
    servicesTitle: '필요한 세무 업무를 선별해 정확하게 진행합니다',
    servicesText:
      '복잡한 세무 이슈를 한 번에 설명하기보다, 자료 확인, 신고 의무 판단, 준비 범위 정리를 순서대로 진행합니다.',
    services: [
      ['개인소득세 신고 (Form 1040)', 'Federal 및 State 신고, extension, 거주자/비거주자 여부를 함께 검토합니다.'],
      ['해외금융계좌 신고 (FBAR/FATCA)', '한국 및 해외 금융계좌의 FinCEN 114, Form 8938 신고 대상 여부와 준비 자료를 정리합니다.'],
      ['IRS/FTB 통지서 대응', 'IRS 또는 California FTB 통지서를 검토하고 잔액, penalty, 답변 방향을 체계적으로 확인합니다.'],
      ['ITIN 및 세무 Compliance 정리', 'ITIN 신청, Form 8843, 과거 연도 신고, 수정 신고 등 누락된 compliance를 정리합니다.'],
      ['소규모 비즈니스 세무', 'Schedule C, LLC, S-Corp, Partnership 신고와 bookkeeping cleanup 범위를 검토합니다.'],
      ['세무 계획 및 Tax Planning', 'RSU, ESPP, capital gain, California residency, 신분 변화에 따른 세무 영향을 미리 점검합니다.'],
    ],
    serviceDetailLabels: {
      back: '서비스 목록으로 돌아가기',
      scope: '진행 범위',
      documents: '주요 확인 자료',
      steps: '진행 방식',
      cta: '이 서비스로 상담 신청하기',
      related: '다른 서비스 보기',
    },
    serviceDetails: [
      {
        intro: '개인 세금보고는 소득 유형, 거주 상태, 주(State) 신고 여부에 따라 준비 방식이 달라집니다. 신고서 작성 전에 자료와 상황을 먼저 정리합니다.',
        scope: ['Federal 및 State individual return 준비', 'W-2, 1099, RSU, ESPP, investment income 검토', 'resident / nonresident filing position 확인', 'extension 또는 prior-year filing 필요 여부 검토'],
        documents: ['W-2, 1099, K-1 등 소득자료', '주식거래 및 capital gain 자료', '전년도 tax return', '거주지 변경 및 신분 관련 정보'],
        steps: ['상황과 filing status 확인', '자료 목록 안내 및 검토', '신고서 작성 후 주요 항목 리뷰', '승인 후 e-file 또는 필요한 방식으로 제출'],
      },
      {
        intro: '해외 금융계좌 신고는 잔액 기준과 신고 양식이 다르기 때문에 FBAR와 FATCA를 분리해 판단해야 합니다.',
        scope: ['FinCEN 114 대상 여부 검토', 'Form 8938 filing threshold 확인', '한국 및 해외 금융계좌 자료 정리', '누락 신고 또는 prior-year issue 방향 검토'],
        documents: ['계좌별 연중 최고잔액', '은행, 증권, 보험 등 계좌 유형', '계좌 소유권 및 서명권 정보', '해외 금융자산 관련 세금자료'],
        steps: ['계좌 목록과 잔액 기준 정리', 'FBAR / FATCA 대상 여부 판단', '필요 양식 준비 및 리뷰', '제출 또는 추가 대응 방향 안내'],
      },
      {
        intro: 'IRS 또는 California FTB 통지서는 원문 내용, 과거 신고서, 납부 기록을 함께 봐야 정확한 대응 방향을 정할 수 있습니다.',
        scope: ['Notice 원문 분석', 'balance due, penalty, interest 검토', '과거 신고서와 payment history 비교', '답변서 또는 후속 조치 방향 정리'],
        documents: ['IRS 또는 FTB notice 원문', '관련 연도 tax return', '납부 내역 및 계정 transcript', '이전 correspondence 자료'],
        steps: ['통지서 유형과 기한 확인', '원인 및 금액 검토', '대응 옵션 정리', '필요 시 답변서 준비 및 후속 관리'],
      },
      {
        intro: 'ITIN과 compliance 정리는 누락된 신고 의무를 확인하고, 필요한 양식과 순서를 정하는 것에서 시작합니다.',
        scope: ['ITIN 신청 필요 여부 검토', 'Form 8843, prior-year filing, amended return 검토', '신분 및 거주 상태에 따른 신고 의무 확인', '누락된 compliance 항목 정리'],
        documents: ['여권 및 신분 관련 자료', '비자, 입출국, 거주 기간 정보', '과거 신고 여부 및 IRS correspondence', '소득자료와 학교/고용 관련 문서'],
        steps: ['현재 신분과 신고 이력 확인', '필요 양식과 제출 순서 정리', '자료 준비 및 신청/신고서 작성', '제출 후 진행 상황 확인'],
      },
      {
        intro: '소규모 비즈니스 세무는 entity type, 장부 상태, 소득·비용 분류에 따라 신고 범위가 달라집니다.',
        scope: ['Schedule C, LLC, S-Corp, Partnership 신고 범위 검토', 'bookkeeping cleanup 필요 여부 확인', '사업 소득과 비용 분류 검토', 'owner compensation 및 estimated tax 이슈 점검'],
        documents: ['P&L, balance sheet, general ledger', 'bank 및 credit card statements', 'payroll, 1099, contractor 자료', 'entity formation 및 prior return 자료'],
        steps: ['사업 구조와 장부 상태 확인', '정리 범위와 신고 범위 확정', 'business return 또는 Schedule C 준비', '리뷰 후 제출 및 다음 연도 관리 포인트 안내'],
      },
      {
        intro: '세무 계획은 신고 직전에 맞추기보다 소득 발생, 거주지 변화, 투자 매각 전에 미리 검토할수록 효과적입니다.',
        scope: ['RSU, ESPP, stock option 관련 세무 영향 검토', 'capital gain 및 estimated tax 계획', 'California residency 이슈 점검', '이민/거주 상태 변화에 따른 filing position 검토'],
        documents: ['equity compensation 자료', '투자 매각 예정 또는 거래 내역', '거주지 변경 일정과 체류 기록', '전년도 tax return 및 예상 소득 정보'],
        steps: ['계획이 필요한 이벤트 확인', '세무 영향과 선택지 정리', '예상 세액 및 timing 검토', '실행 전 확인사항과 신고 시 반영 포인트 정리'],
      },
    ],
    processLabel: 'How it works',
    processTitle: '문의부터 제출까지 한 흐름으로 관리합니다',
    process: [
      ['01', '상황 공유', '필요한 서비스와 현재 상황을 간단히 남깁니다.'],
      ['02', '자료 정리', '요청 자료를 안내받고 보안 절차에 따라 제출합니다.'],
      ['03', '범위 확인', '신고 의무, 예상 리스크, 업무 범위와 fee를 확인합니다.'],
      ['04', '작성 및 리뷰', '신고서 작성 후 핵심 내용과 확인 사항을 함께 검토합니다.'],
      ['05', '서명 및 제출', '최종 승인 후 e-file 또는 필요한 방식으로 제출합니다.'],
    ],
    aboutLabel: 'About',
    aboutTitle: '한 사람의 책임감으로 끝까지 보는 세무 파트너',
    aboutName: '홍영국 CPA',
    aboutRole: 'Principal CPA',
    aboutDetailBack: '메인으로 돌아가기',
    aboutCompanyTitle: 'HONG Tax & Advisory 소개',
    aboutProfileTitle: '홍영국 CPA 소개',
    aboutPreviewText:
      '홍영국 CPA가 직접 상담부터 신고 전 리뷰까지 관리하는 1인 세무 자문 practice입니다.',
    aboutText:
      'HONG Tax & Advisory는 홍영국 CPA가 직접 운영하는 1인 세무 자문 practice입니다. 복잡한 미국 세무를 단순히 신고서 작성으로 끝내기보다, 고객의 배경과 자료 흐름을 먼저 이해하고 필요한 판단을 차분하게 정리하는 방식을 지향합니다.',
    aboutCompanyText:
      'HONG Tax & Advisory는 한국어와 영어가 모두 필요한 개인과 소규모 비즈니스를 위해 만들어진 미국 세무 자문 practice입니다. 규모를 크게 보이게 하기보다, 담당 CPA가 직접 자료를 보고 판단하며 설명하는 방식에 집중합니다.',
    aboutProfileText:
      '홍영국 CPA는 뉴욕 스토니브룩 대학교에서 수학을 전공하고, 산호세 로컬 회계법인에서 3년 이상 개인 및 비즈니스 세무 경험을 쌓았습니다. 숫자와 서류 뒤에 있는 실제 상황을 이해하고, 고객이 다음 결정을 명확하게 할 수 있도록 돕는 것을 중요하게 생각합니다.',
    aboutHighlights: [
      ['미국공인회계사', 'U.S. Certified Public Accountant (CPA)로 개인, 해외계좌, notice, 소규모 비즈니스 세무를 체계적으로 검토합니다.'],
      ['Stony Brook University - SUNY', '뉴욕 스토니브룩 대학교 수학과를 졸업하며 복잡한 정보를 논리적으로 정리하는 훈련을 쌓았습니다.'],
      ['San Jose local CPA firm experience', '산호세 로컬 회계법인에서 3년 이상 다양한 개인·비즈니스 세무 업무를 경험했습니다.'],
      ['Bilingual advisory', '한국어와 영어로 자료 요청, 세무 이슈 설명, 신고 전 리뷰를 명확하게 안내합니다.'],
    ],
    faqLabel: 'FAQ',
    faqTitle: '자주 묻는 질문',
    faqs: [
      ['FBAR 신고 대상인지 어떻게 알 수 있나요?', '해외 금융계좌의 연중 최고잔액, 계좌 유형, 소유권 또는 서명권 여부를 함께 확인해야 합니다.'],
      ['한국 계좌가 있으면 무조건 FATCA 신고해야 하나요?', '아닙니다. Form 8938 기준은 filing status와 거주지에 따라 달라지므로 별도 판단이 필요합니다.'],
      ['IRS 또는 FTB Notice를 받았는데 도와줄 수 있나요?', '가능합니다. 통지서 원문, 과거 신고서, payment history를 확인한 뒤 대응 방향을 정리합니다.'],
      ['사업체 세금 신고도 가능한가요?', '자료 상태와 업무 범위가 명확한 Schedule C, LLC, S-Corp, Partnership을 중심으로 검토합니다.'],
    ],
    contactLabel: 'Contact',
    contactTitle: '상황을 남겨주시면 다음 단계를 정리해드립니다',
    contactText:
      '필요한 서비스가 명확하지 않아도 괜찮습니다. 현재 상황을 보내주시면 확인할 자료와 진행 방향을 안내드립니다.',
    formName: '이름',
    formEmail: '이메일',
    formService: '필요한 서비스',
    formMessage: '상황 설명',
    formButton: '이메일로 문의하기',
    footerText: '미국 세무와 compliance를 명확하게 정리하는 bilingual tax advisory service.',
  },
  zh: {
    nav: ['服务', '流程', '介绍', 'FAQ', '咨询'],
    badge: 'HONG Tax & Advisory',
    heroTitle: '美国税务，\n清晰有序地处理。',
    heroText:
      '从个人报税、海外账户申报、IRS/FTB 通知到小型企业税务，我们先理解您的情况，再整理所需步骤与资料。',
    primaryCta: '预约咨询',
    secondaryCta: '查看服务',
    licenseNote: '',
    servicesLabel: 'Services',
    servicesTitle: '按实际需求整理并推进税务事项',
    servicesText:
      '我们按资料确认、申报义务判断、服务范围整理的顺序推进，让复杂事项更容易理解和执行。',
    services: [
      ['Individual Tax Return', '处理 Form 1040、Federal 与 State 申报、extension，以及居民身份判断。'],
      ['FBAR & FATCA', '整理海外账户是否涉及 FinCEN 114、Form 8938 申报，以及所需资料。'],
      ['IRS / FTB Notice', '审核 IRS 或 California FTB 通知，并确认余额、罚金与回复方向。'],
      ['ITIN & Tax Compliance', '协助 ITIN、Form 8843、往年补报、修正申报等合规事项。'],
      ['Small Business Tax', '评估 Schedule C、LLC、S-Corp、Partnership 申报和账务整理范围。'],
      ['Tax Planning', '提前评估 RSU、ESPP、capital gain、California residency 和身份变化的税务影响。'],
    ],
    serviceDetailLabels: {
      back: '返回服务列表',
      scope: '服务范围',
      documents: '主要资料',
      steps: '处理流程',
      cta: '咨询这项服务',
      related: '查看其他服务',
    },
    serviceDetails: [
      {
        intro: '个人报税会因收入类型、税务居民身份和州税要求而不同。我们会先整理情况和资料，再确认申报方式。',
        scope: ['准备 Federal 与 State individual return', '审核 W-2、1099、RSU、ESPP 与投资收入', '确认 resident / nonresident filing position', '评估 extension 或往年补报需求'],
        documents: ['W-2、1099、K-1 等收入资料', '股票交易和 capital gain 资料', '上一年度 tax return', '居住地变化和身份相关信息'],
        steps: ['确认情况和 filing status', '提供资料清单并审核文件', '准备税表并复核重点项目', '确认后 e-file 或按适用方式提交'],
      },
      {
        intro: '海外账户申报需要区分 FBAR 与 FATCA，因为余额标准、申报表格和判断规则并不相同。',
        scope: ['判断 FinCEN 114 是否适用', '确认 Form 8938 filing threshold', '整理韩国及海外金融账户资料', '评估遗漏申报或往年问题的处理方向'],
        documents: ['每个账户的年度最高余额', '银行、证券、保险等账户类型', '账户所有权或签字权信息', '海外金融资产相关税务资料'],
        steps: ['整理账户清单和余额标准', '判断 FBAR / FATCA 是否适用', '准备并复核所需表格', '完成提交或说明后续处理方向'],
      },
      {
        intro: 'IRS 或 California FTB 通知需要结合通知原文、历史税表和付款记录，才能判断原因和处理方式。',
        scope: ['分析 Notice 原文', '审核 balance due、penalty、interest', '对比历史申报和 payment history', '整理回复或后续处理方向'],
        documents: ['IRS 或 FTB notice 原文', '相关年度 tax return', '付款记录和 account transcript', '过去往来 correspondence 资料'],
        steps: ['确认通知类型和截止日期', '审核原因和金额', '整理可选处理方式', '需要时准备回复并跟进后续进度'],
      },
      {
        intro: 'ITIN 与 compliance 整理从确认遗漏义务开始，再决定需要哪些表格以及提交顺序。',
        scope: ['评估是否需要 ITIN', '审核 Form 8843、往年补报、修正申报', '根据身份和居住情况确认申报义务', '整理遗漏的 compliance 项目'],
        documents: ['护照和身份相关资料', '签证、出入境、居住期间信息', '过去申报记录和 IRS correspondence', '收入资料及学校/雇佣相关文件'],
        steps: ['确认当前身份和申报历史', '整理所需表格和提交顺序', '准备申请或申报文件', '提交后确认进度和后续事项'],
      },
      {
        intro: '小型企业税务会根据 entity type、账务状态和收入费用分类决定申报范围。',
        scope: ['评估 Schedule C、LLC、S-Corp、Partnership 申报范围', '确认 bookkeeping cleanup 是否需要', '审核业务收入和费用分类', '检查 owner compensation 与 estimated tax 问题'],
        documents: ['P&L、balance sheet、general ledger', '银行和信用卡 statements', 'payroll、1099、contractor 资料', 'entity formation 和 prior return 资料'],
        steps: ['确认业务结构和账务状态', '确定整理范围和申报范围', '准备 business return 或 Schedule C', '复核后提交并说明下一年度管理重点'],
      },
      {
        intro: '税务规划越早开始越有价值，尤其是在股票收入、投资出售、搬家或身份变化之前。',
        scope: ['评估 RSU、ESPP、stock option 的税务影响', '规划 capital gain 和 estimated tax', '检查 California residency 风险', '评估身份变化对 filing position 的影响'],
        documents: ['equity compensation 资料', '计划出售或已交易的投资资料', '居住地变化时间表和停留记录', '上一年度 tax return 和预计收入信息'],
        steps: ['确认需要规划的事件', '整理税务影响和可选方案', '估算税额并评估 timing', '整理执行前确认事项和申报反映点'],
      },
    ],
    processLabel: 'How it works',
    processTitle: '从咨询到提交，按步骤管理',
    process: [
      ['01', '说明情况', '简单说明您的需求和当前税务状况。'],
      ['02', '整理资料', '按照资料清单，通过安全流程提交文件。'],
      ['03', '确认范围', '确认申报义务、风险点、服务范围和费用。'],
      ['04', '准备复核', '完成税表准备后，一起复核重点内容。'],
      ['05', '签字提交', '最终确认后，按适用方式完成提交。'],
    ],
    aboutLabel: 'About',
    aboutTitle: '由一位 CPA 亲自负责的税务服务',
    aboutName: 'Hong Youngkuk CPA',
    aboutRole: 'Principal CPA',
    aboutDetailBack: '返回主页',
    aboutCompanyTitle: '关于 HONG Tax & Advisory',
    aboutProfileTitle: '关于 London Hong, CPA',
    aboutPreviewText:
      '由 London Hong, CPA 亲自负责咨询、资料整理和申报前复核的一人税务咨询 practice。',
    aboutText:
      'HONG Tax & Advisory 是由 London Hong, CPA 亲自运营的一人税务咨询 practice。我们不仅准备税表，也重视理解客户背景、整理资料脉络，并清楚说明每一步税务判断。',
    aboutCompanyText:
      'HONG Tax & Advisory 面向需要韩语和英语沟通的个人与小型企业，提供美国税务申报与合规支持。我们更重视由负责 CPA 亲自审核资料、判断问题并清楚说明下一步。',
    aboutProfileText:
      'London Hong, CPA 毕业于 Stony Brook University - SUNY 数学系，并在 San Jose local CPA firm 累积 3 年以上个人与企业税务经验。他重视逻辑、细节和清楚沟通，帮助客户理解税务事项背后的实际影响。',
    aboutHighlights: [
      ['美国注册会计师', 'U.S. Certified Public Accountant (CPA)，处理个人、海外账户、notice 与小型企业税务事项。'],
      ['Stony Brook University - SUNY', '毕业于纽约州立大学石溪分校数学系，注重逻辑、结构和细节。'],
      ['San Jose 本地会计事务所经验', '在 San Jose local CPA firm 累积 3 年以上个人与企业税务经验。'],
      ['双语沟通', '可用韩语和英语说明资料要求、税务风险和申报前重点。'],
    ],
    faqLabel: 'FAQ',
    faqTitle: '常见问题',
    faqs: [
      ['我是否需要申报 FBAR？', '需要结合海外金融账户的年度最高余额、账户类型、所有权或签字权判断。'],
      ['有韩国账户就一定要报 FATCA 吗？', '不一定。Form 8938 门槛会因 filing status 和居住地不同而改变。'],
      ['收到 IRS 或 FTB 通知可以协助吗？', '可以。我们会先审核通知、历史税表和付款记录，再整理处理方向。'],
      ['可以处理企业税吗？', '会根据资料状态和业务范围，优先评估 Schedule C、LLC、S-Corp、Partnership。'],
    ],
    contactLabel: 'Contact',
    contactTitle: '留下情况后，我们会整理下一步',
    contactText: '即使不确定需要哪项服务，也可以先说明当前情况。我们会整理所需资料和处理方向。',
    formName: '姓名',
    formEmail: '邮箱',
    formService: '需要的服务',
    formMessage: '情况说明',
    formButton: '通过邮件咨询',
    footerText: '面向韩语客户、个人和小型企业的美国税务与咨询服务。',
  },
  en: {
    nav: ['Services', 'Process', 'About', 'FAQ', 'Contact'],
    badge: 'HONG Tax & Advisory',
    heroTitle: 'U.S. tax matters,\norganized with clarity.',
    heroText:
      'From individual returns and foreign account reporting to IRS/FTB notices and small business tax, we clarify the issue first and then map the next steps.',
    primaryCta: 'Request Consultation',
    secondaryCta: 'View Services',
    licenseNote: '',
    servicesLabel: 'Services',
    servicesTitle: 'Focused tax support for the matters that need attention',
    servicesText:
      'Each engagement is organized around document review, filing obligation analysis, scope confirmation, preparation, and filing.',
    services: [
      ['Individual Tax Return', 'Form 1040, Federal and State returns, extensions, and resident or nonresident tax review.'],
      ['FBAR & FATCA', 'Foreign account reporting review for FinCEN 114, Form 8938, and supporting document needs.'],
      ['IRS / FTB Notice', 'Notice review, balance and penalty analysis, response planning, and follow-up support.'],
      ['ITIN & Tax Compliance', 'ITIN applications, Form 8843, prior-year filings, amended returns, and compliance cleanup.'],
      ['Small Business Tax', 'Schedule C, LLC, S-Corp, Partnership filings, and bookkeeping cleanup scope review.'],
      ['Tax Planning', 'Planning around RSU, ESPP, capital gains, California residency, and immigration status changes.'],
    ],
    serviceDetailLabels: {
      back: 'Back to services',
      scope: 'Service scope',
      documents: 'Key documents',
      steps: 'How this works',
      cta: 'Request this service',
      related: 'Explore other services',
    },
    serviceDetails: [
      {
        intro: 'Individual tax returns vary by income type, residency status, and state filing requirements. We organize the facts first, then prepare the return around the correct filing position.',
        scope: ['Federal and State individual return preparation', 'Review of W-2, 1099, RSU, ESPP, and investment income', 'Resident or nonresident filing position review', 'Extension or prior-year filing needs'],
        documents: ['W-2, 1099, K-1, and income statements', 'Brokerage and capital gain records', 'Prior-year tax return', 'Residency, move, and immigration status information'],
        steps: ['Confirm your filing status and tax profile', 'Collect and review the document list', 'Prepare the return and review key items', 'Submit by e-file or the required method after approval'],
      },
      {
        intro: 'Foreign account reporting requires separate FBAR and FATCA analysis because the thresholds, forms, and reporting rules are different.',
        scope: ['FinCEN 114 filing requirement review', 'Form 8938 threshold analysis', 'Korean and foreign financial account organization', 'Prior-year or missed reporting issue review'],
        documents: ['Annual maximum balance for each account', 'Bank, brokerage, insurance, and other account types', 'Ownership and signature authority details', 'Tax documents related to foreign financial assets'],
        steps: ['Organize account list and balances', 'Determine FBAR and FATCA requirements', 'Prepare and review required forms', 'File or outline the next compliance steps'],
      },
      {
        intro: 'IRS and California FTB notices should be reviewed with the original letter, prior returns, and payment history to identify the real issue and deadline.',
        scope: ['Notice review and issue identification', 'Balance, penalty, and interest analysis', 'Comparison with prior returns and payment history', 'Response planning and follow-up support'],
        documents: ['Original IRS or FTB notice', 'Tax return for the related year', 'Payment records and account transcript', 'Prior correspondence, if available'],
        steps: ['Confirm notice type and deadline', 'Review cause and amount', 'Organize response options', 'Prepare response and follow up when needed'],
      },
      {
        intro: 'ITIN and compliance cleanup starts by identifying what is missing, which forms are required, and the order in which items should be filed.',
        scope: ['ITIN application need review', 'Form 8843, prior-year filing, and amended return review', 'Filing obligation review based on status and residency', 'Compliance cleanup planning'],
        documents: ['Passport and identity documents', 'Visa, travel, and residency period information', 'Prior filing history and IRS correspondence', 'Income records and school or employment documents'],
        steps: ['Review current status and filing history', 'Identify required forms and filing sequence', 'Prepare applications or returns', 'Track submission and follow-up items'],
      },
      {
        intro: 'Small business tax work depends on entity type, bookkeeping quality, and how income and expenses are classified.',
        scope: ['Schedule C, LLC, S-Corp, and Partnership return scope review', 'Bookkeeping cleanup assessment', 'Business income and expense classification review', 'Owner compensation and estimated tax issue review'],
        documents: ['P&L, balance sheet, and general ledger', 'Bank and credit card statements', 'Payroll, 1099, and contractor records', 'Entity formation and prior return documents'],
        steps: ['Review business structure and books', 'Confirm cleanup and filing scope', 'Prepare business return or Schedule C', 'Review before filing and identify next-year planning points'],
      },
      {
        intro: 'Tax planning works best before a major event, such as equity vesting, investment sales, a move, or immigration status changes.',
        scope: ['RSU, ESPP, and stock option tax impact review', 'Capital gain and estimated tax planning', 'California residency issue review', 'Filing position review around immigration or residency changes'],
        documents: ['Equity compensation records', 'Planned or completed investment sale records', 'Move timeline and day-count records', 'Prior-year return and projected income information'],
        steps: ['Identify the planning event', 'Outline tax impact and available options', 'Estimate tax and timing considerations', 'Summarize action items and reporting points'],
      },
    ],
    processLabel: 'How it works',
    processTitle: 'A clear workflow from inquiry to filing',
    process: [
      ['01', 'Share', 'Send a brief summary of your situation and goals.'],
      ['02', 'Organize', 'Receive a document list and submit files through a secure process.'],
      ['03', 'Confirm', 'Clarify filing obligations, risk areas, scope, and fee.'],
      ['04', 'Review', 'Review the prepared return and key tax positions together.'],
      ['05', 'File', 'After final approval, submit by e-file or the required method.'],
    ],
    aboutLabel: 'About',
    aboutTitle: 'A tax practice led directly by your CPA',
    aboutName: 'London Hong, CPA',
    aboutRole: 'Principal CPA',
    aboutDetailBack: 'Back to home',
    aboutCompanyTitle: 'About HONG Tax & Advisory',
    aboutProfileTitle: 'About London Hong, CPA',
    aboutPreviewText:
      'A solo tax advisory practice where London Hong, CPA works directly with clients from intake through pre-filing review.',
    aboutText:
      'HONG Tax & Advisory is a solo tax advisory practice led directly by London Hong, CPA. The work is intentionally personal: understand the facts, organize the documents, explain the tax position clearly, and keep the filing process grounded from start to finish.',
    aboutCompanyText:
      'HONG Tax & Advisory was built for individuals and small businesses who need clear U.S. tax support in Korean and English. The practice stays intentionally focused so the responsible CPA can review the facts directly, explain the tax position, and keep the process organized.',
    aboutProfileText:
      'London Hong, CPA studied Mathematics at Stony Brook University - SUNY and has more than three years of tax experience at a San Jose local CPA firm. His approach combines structure, detail, and plain-language communication so clients can understand what matters before they file.',
    aboutHighlights: [
      ['U.S. Certified Public Accountant', 'CPA support for individual returns, foreign account reporting, notices, and small business tax matters.'],
      ['Stony Brook University - SUNY', 'B.S. in Mathematics, with a foundation in structured thinking, precision, and problem solving.'],
      ['San Jose local CPA firm experience', 'More than three years of experience with individual and business tax work at a local CPA firm.'],
      ['Bilingual advisory', 'Clear communication in Korean and English for document requests, tax issues, and pre-filing review.'],
    ],
    faqLabel: 'FAQ',
    faqTitle: 'Frequently asked questions',
    faqs: [
      ['How do I know if I need FBAR?', 'We review annual maximum balances, account types, ownership, and signature authority.'],
      ['Does every Korean account require FATCA filing?', 'No. Form 8938 thresholds vary by filing status and residence, so the filing requirement must be reviewed.'],
      ['Can you help with IRS or FTB notices?', 'Yes. We review the notice, prior returns, and payment history before organizing a response plan.'],
      ['Do you prepare business returns?', 'Business returns are reviewed based on record quality, entity type, scope, and risk profile.'],
    ],
    contactLabel: 'Contact',
    contactTitle: 'Share your situation and we will outline the next steps',
    contactText:
      'You do not need to know exactly which service fits. Send a short summary and we will identify the documents to review and the likely path forward.',
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

function getServiceFromHash() {
  const slug = window.location.hash.replace('#service-', '');
  return SERVICE_SLUGS.includes(slug) ? slug : null;
}

function getAboutFromHash() {
  return window.location.hash === '#about';
}

export default function App() {
  const [language, setLanguage] = useState(() => window.localStorage.getItem('hong-language') || 'ko');
  const [theme, setTheme] = useState(getInitialTheme);
  const [selectedService, setSelectedService] = useState(getServiceFromHash);
  const [showAboutDetail, setShowAboutDetail] = useState(getAboutFromHash);
  const t = copy[language];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('hong-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh' : language;
    window.localStorage.setItem('hong-language', language);
  }, [language]);

  useEffect(() => {
    const syncPageFromHash = () => {
      setSelectedService(getServiceFromHash());
      setShowAboutDetail(getAboutFromHash());
    };
    window.addEventListener('hashchange', syncPageFromHash);
    return () => window.removeEventListener('hashchange', syncPageFromHash);
  }, []);

  useEffect(() => {
    if (selectedService || showAboutDetail) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const sectionId = window.location.hash.replace('#', '');
    if (sectionId && !sectionId.startsWith('service-')) {
      window.requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [selectedService, showAboutDetail]);

  const logo = theme === 'dark' ? logoDark : logoLight;
  const headerLogo = theme === 'dark' ? symbolDark : symbolLight;
  const footerLogo = logo;
  const selectedServiceIndex = SERVICE_SLUGS.indexOf(selectedService);
  const selectedServiceDetail = selectedServiceIndex >= 0
    ? {
        slug: selectedService,
        title: t.services[selectedServiceIndex][0],
        summary: t.services[selectedServiceIndex][1],
        ...t.serviceDetails[selectedServiceIndex],
      }
    : null;
  const showHome = () => {
    setSelectedService(null);
    setShowAboutDetail(false);
  };
  const showService = (slug) => {
    setSelectedService(slug);
    setShowAboutDetail(false);
  };
  const showAbout = () => {
    setSelectedService(null);
    setShowAboutDetail(true);
  };
  const mailto = useMemo(() => {
    const subject = encodeURIComponent('Consultation Request - HONG Tax & Advisory');
    return `mailto:london@hongtax.com?subject=${subject}`;
  }, []);

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="HONG Tax & Advisory home">
          <img src={headerLogo} alt="HONG Tax & Advisory" />
        </a>

        <nav className="nav" aria-label="Main navigation">
          <div className="nav-dropdown">
            <a className="nav-link" href="#services" onClick={showHome}>{t.nav[0]}</a>
            <div className="service-menu" aria-label="Service menu">
              {t.services.map(([title], index) => (
                <a
                  href={`#service-${SERVICE_SLUGS[index]}`}
                  key={title}
                  onClick={() => showService(SERVICE_SLUGS[index])}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>
          <a className="nav-link" href="#process" onClick={showHome}>{t.nav[1]}</a>
          <a className="nav-link" href="#about" onClick={showAbout}>{t.nav[2]}</a>
          <a className="nav-link" href="#faq" onClick={showHome}>{t.nav[3]}</a>
          <a className="nav-link" href="#contact" onClick={showHome}>{t.nav[4]}</a>
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
        {selectedServiceDetail ? (
          <ServiceDetailPage
            detail={selectedServiceDetail}
            labels={t.serviceDetailLabels}
            services={t.services}
            mailto={mailto}
            onBack={showHome}
            onSelectService={showService}
          />
        ) : showAboutDetail ? (
          <AboutDetailPage t={t} onBack={showHome} />
        ) : (
          <>
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

        <section id="services" className="section-pad services-section">
          <div className="container">
            <SectionHeading label={t.servicesLabel} title={t.servicesTitle} text={t.servicesText} />
            <div className="service-grid">
              {t.services.map(([title, description], index) => (
                <a
                  className="service-card"
                  href={`#service-${SERVICE_SLUGS[index]}`}
                  key={title}
                  onClick={() => showService(SERVICE_SLUGS[index])}
                >
                  <h3>{title}</h3>
                  <p>{description}</p>
                </a>
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

        <section id="about-preview" className="section-pad about-section">
          <div className="container about-preview">
            <div className="about-copy">
              <p className="eyebrow">{t.aboutLabel}</p>
              <h2>{t.aboutTitle}</h2>
              <a className="about-identity about-identity-link" href="#about" onClick={showAbout}>
                <h3>{t.aboutName}</h3>
                <span>{t.aboutRole}</span>
              </a>
              <p>{t.aboutPreviewText}</p>
            </div>
          </div>
        </section>

        <section id="faq" className="section-pad faq-section">
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
          </>
        )}
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src={footerLogo} alt="HONG Tax & Advisory" />
            <p>{t.footerText}</p>
          </div>
          <div className="footer-meta">
            <a href="mailto:london@hongtax.com">london@hongtax.com</a>
            <a href="tel:+16315769725">+1 (631) 576 - 9725</a>
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

function AboutDetailPage({ t, onBack }) {
  return (
    <section className="about-detail-page section-pad">
      <div className="container">
        <a className="back-link" href="#about-preview" onClick={onBack}>
          {t.aboutDetailBack}
        </a>

        <div className="about-detail-hero">
          <p className="eyebrow">{t.aboutLabel}</p>
          <h1>{t.aboutName}</h1>
          <p>{t.aboutRole}</p>
        </div>

        <div className="about-story">
          <article className="about-story-section">
            <h2>{t.aboutCompanyTitle}</h2>
            <p>{t.aboutCompanyText}</p>
          </article>
          <article className="about-story-section">
            <h2>{t.aboutProfileTitle}</h2>
            <p>{t.aboutProfileText}</p>
          </article>
        </div>

        <div className="about-list about-detail-list">
          {t.aboutHighlights.map(([title, text]) => (
            <article className="about-item" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceDetailPage({ detail, labels, services, mailto, onBack, onSelectService }) {
  return (
    <section className="service-detail-page section-pad">
      <div className="container">
        <a className="back-link" href="#services" onClick={onBack}>
          {labels.back}
        </a>

        <div className="service-detail-hero">
          <p className="eyebrow">{detail.title}</p>
          <h1>{detail.title}</h1>
          <p>{detail.intro}</p>
          <div className="hero-actions">
            <a className="button primary" href={mailto}>{labels.cta}</a>
            <a className="button ghost" href="#services" onClick={onBack}>{labels.back}</a>
          </div>
        </div>

        <div className="detail-panel-grid">
          <DetailPanel title={labels.scope} items={detail.scope} />
          <DetailPanel title={labels.documents} items={detail.documents} />
          <DetailPanel title={labels.steps} items={detail.steps} />
        </div>

        <div className="related-services">
          <h2>{labels.related}</h2>
          <div className="related-service-list">
            {services.map(([title], index) => (
              <a
                className={SERVICE_SLUGS[index] === detail.slug ? 'active' : ''}
                href={`#service-${SERVICE_SLUGS[index]}`}
                key={title}
                onClick={() => onSelectService(SERVICE_SLUGS[index])}
              >
                {title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailPanel({ title, items }) {
  return (
    <article className="detail-panel">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
