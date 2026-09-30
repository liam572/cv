/* =========================================================
   English copy. Chinese is the source of truth in index.html;
   every element with data-i18n="key" is swapped with en[key].
   ========================================================= */
window.I18N = {
  meta: {
    zh: {
      title: 'Liam 林联敏 · Golang 资深后端工程师',
      description: '林联敏（Liam），Golang 资深后端工程师，9 年高并发分布式系统经验，曾就职于泛微、哔哩哔哩、心动网络（TapTap）、欢乐互娱，正在用 Go 构建 AI 基础设施。',
    },
    en: {
      title: 'Liam Lin · Senior Golang Engineer',
      description: 'Liam Lin (林联敏), senior Golang backend engineer with 9 years of experience in high-concurrency distributed systems at Weaver, Bilibili, XD (TapTap) and JoyMaker — now building AI infrastructure in Go.',
    },
  },

  en: {
    /* sidebar */
    'brand.sub': 'Lin Lianmin / 2026',
    'nav.home': 'Home', 'nav.home.e': '首页',
    'nav.about': 'About', 'nav.about.e': '关于',
    'nav.resume': 'Experience', 'nav.resume.e': '经历',
    'nav.works': 'Works', 'nav.works.e': '作品',
    'nav.stack': 'Stack', 'nav.stack.e': '技能',
    'nav.journal': 'Annual Review', 'nav.journal.e': '年度总结',
    'nav.contact': 'Contact', 'nav.contact.e': '联系',
    'side.status': 'Open to work',

    /* 01 home */
    'hero.eyebrow': 'GOPHER × DISTRIBUTED SYSTEMS / AI INFRA BUILDER',
    'hero.lede': '<b>9 years building backends in Go</b> — from enterprise software and video CDN to game communities with tens of millions of users, focused on <b>high-concurrency, high-availability</b> distributed systems.<br />Now reshaping my engineering workflow with Claude Code &amp; Codex, and building <b>backend infrastructure for the AI era</b> in Go.',
    'hero.cta1': 'View works',
    'hero.cta2': 'Read résumé',

    /* 02 about */
    'about.title': 'About<em>.</em>',
    'about.lead': 'Great backends are invisible — they stay <mark>quiet, stable and predictable</mark> under peak traffic, and keep <mark>evolving</mark> with the business.',
    'about.p1': 'I’m <b>Lin Lianmin</b> — call me Liam — a senior Golang backend engineer. Since 2017 I’ve worked at <b>Weaver, Bilibili, XD (TapTap) and JoyMaker</b>, taking on systems of every scale: enterprise OA, video CDN, a game community with tens of millions of monthly users, and a globally shared game server architecture.',
    'about.p2': 'I specialize in microservice architecture and foundational components: <b>unified gateways, authentication &amp; authorization, message push, multi-tier caching, monitoring &amp; alerting</b>. Beyond “it runs”, I care whether a system stays observable, degradable and scalable at peak — and whether a team can move fast under shared standards.',
    'about.p3': 'Over the past two years I’ve invested more and more in <b>AI engineering</b>: rebuilding my development workflow around Claude Code and Codex, and using Go to build infrastructure such as LLM gateways, agent runtimes and RAG pipelines — bringing AI into production the engineering way.',
    'stat1.v': '9<small>yrs+</small>',
    'stat1.l': 'Backend in Go<br />since 2017',
    'stat2.v': '10M<small>+ MAU</small>',
    'stat2.l': 'Platform scale<br />backend architecture',
    'pr1.t': 'Simplicity first',
    'pr1.d': 'Ten clear lines beat a hundred clever ones.',
    'pr2.t': 'Observable = reliable',
    'pr2.d': 'A service without monitoring isn’t really in production.',
    'pr3.t': 'AI leverage',
    'pr3.d': 'Let AI handle the repetition; people focus on judgment and design.',

    /* 03 experience */
    'resume.title': 'Experience<em>.</em>',
    'resume.work': 'Work history',
    'loc.sh': 'SHANGHAI',

    'job1.role': 'JoyMaker<span>Senior Golang Engineer</span>',
    'job1.co': '<em>GAME</em>Global game developer &amp; publisher',
    'job1.l1': 'Own the overall server-side architecture and core module iteration for the <b>game SDK backend, the flagship JoyMakers community and the Cangbaoge marketplace</b>.',
    'job1.l2': 'Led the <b>global shared-server</b> deployment, delivering high-concurrency, low-latency and stable services to players across regions.',
    'job1.l3': 'Built microservice foundations and monitoring &amp; alerting, owned architecture and protocol design, and <b>unified development standards across the backend team</b>.',
    'job1.l4': 'Partnered across departments and drove the build-out and reuse of shared code libraries.',

    'job2.role': 'XD Inc.<span>Senior Golang Engineer</span>',
    'job2.co': '<em>TAPTAP</em>China’s largest game community · 10M+ MAU · HKEX-listed',
    'job2.l1': 'Owned the <b>TapTap main site</b> backend — a unified gateway layer connects every microservice over RPC, keeping access stable under high concurrency.',
    'job2.l2': 'Designed and built core microservices from 0 to 1, including the <b>open platform, user center and notification center</b>.',
    'job2.l3': 'Owned core flows such as sign-up / login, OAuth authorization and notification push — the push service delivers <b>300M notifications per day</b>.',
    'job2.l4': 'Contributed to system architecture and protocol design, and strengthened service monitoring &amp; alerting.',

    'job3.role': 'Bilibili<span>Senior Golang Engineer</span>',
    'job3.co': '<em>BILIBILI</em>China’s leading video &amp; danmaku platform · 100M+ MAU · NASDAQ &amp; HKEX-listed',
    'job3.l1': 'Built the <b>video CDN service</b> with custom development on Nginx &amp; OpenResty.',
    'job3.l2': 'Designed a popularity-based <b>three-tier cache</b> and memory eviction policy to raise hit rates and reduce origin load.',
    'job3.l3': 'Deployed distributed clusters with <b>peer-to-peer origin fetching</b> and auto-scaling; built CDN node monitoring &amp; alerting.',

    'job4.role': 'Weaver Network<span>Senior Golang Engineer</span>',
    'job4.co': '<em>OA</em>China’s No.1 OA software vendor · Shanghai-listed',
    'job4.l1': 'Developed China’s most widely adopted <b>OA product</b>, owning module design and development across a wide range of enterprise workflows.',
    'job4.l2': 'Built a <b>one-click Linux deployment tool</b> that simplified on-premise delivery and operations.',

    /* 04 works */
    'works.title': 'Works<em>.</em>',
    'f.all': 'All', 'f.ai': 'AI Eng.', 'f.dist': 'Distributed', 'f.tool': 'Tooling',

    'w1.tag': 'AI / AGENT',
    'w1.title': 'Gopher Agent <span>— a Go-native agent runtime</span>',
    'w1.desc': 'Schedules multiple agents concurrently on goroutines, with native MCP tool support, streaming output, resumable runs and end-to-end tracing. Ships as a single binary — operate agents like any other microservice.',
    'w2.tag': 'AI / INFRA',
    'w2.title': 'LLM Gateway <span>— one gateway for every model</span>',
    'w2.desc': 'OpenAI-compatible access to multiple model providers, with smart routing, rate limiting &amp; circuit breaking, failover, semantic caching and token metering — years of gateway experience applied to AI traffic.',
    'w3.tag': 'DISTRIBUTED / MQ',
    'w3.title': 'Beacon <span>— a high-concurrency push engine</span>',
    'w3.desc': 'Distilled from notification-center practice: long-connection gateway + sharded routing + ACK retries + priority queues, designed for hundreds of millions of daily pushes across in-app, mobile push and email.',
    'w4.tag': 'DISTRIBUTED / CACHE',
    'w4.title': 'TierCache <span>— a popularity-aware multi-tier cache</span>',
    'w4.desc': 'Local LRU + Redis + origin in three tiers, promoting and demoting keys by heat, with singleflight against breakdown, jittered TTLs against avalanches and invalidation broadcasts — inspired by video CDN tiered caching.',
    'w5.tag': 'AI / RAG',
    'w5.title': 'go-rag <span>— a RAG toolkit in Go</span>',
    'w5.desc': 'An end-to-end pipeline for chunking, embedding, hybrid BM25 + vector retrieval and reranking, integrated with Milvus / Elasticsearch — drop-in knowledge-base Q&amp;A for Go services.',
    'w6.tag': 'TOOLING',
    'w6.title': 'gopher-skills <span>— Claude Code plugins for Go services</span>',
    'w6.desc': 'A set of Claude Code skills for Go projects: scaffold gRPC services, generate table-driven tests, produce pprof diagnostics and code-review checklists — team conventions that AI can execute.',

    /* 05 stack */
    'stack.title': 'Stack<em>.</em>',
    's1.t': 'Go <em>×</em> Concurrency',
    's1.d': 'Expert in Go, with a deep command of concurrency and the runtime; fluent in profiling and tuning with pprof / trace, and experienced in designing high-concurrency, highly available, scalable systems.',
    's2.t': 'Microservices &amp; Protocols',
    's2.d': 'Design and build microservice systems from scratch — gateways, auth and service governance.',
    's3.t': 'Databases &amp; Middleware',
    's3.d': 'Storage selection, cache consistency and reliable message delivery.',
    's4.t': 'Infrastructure &amp; Ops',
    's4.d': 'Independently deploy and run large-scale clusters, with solid TCP/IP networking fundamentals.',
    's5.t': 'AI Engineering',
    's5.d': 'Rebuilding the dev workflow with AI coding tools, and building AI infrastructure in Go.',
    'chip.ddb': 'Distributed DB',
    'chip.mon': 'Monitoring &amp; Alerting',

    /* 06 journal */
    'journal.title': 'Annual Review<em>.</em>',
    'journal.intro': 'On the last day of every year I jot down a few lines: how work went, how the family is doing, what I got out of the year, and what I want to do next.',
    'journal.note': '8 entries · ~1,000 characters each · written in Chinese',
    'j18.t': 'My first year in Shanghai',
    'j18.ex': 'My first full-time job, and I settled in faster than expected. New to the workplace, full of energy, with good colleagues around me.',
    'j19.t': 'A steady second year',
    'j19.ex': 'Year two: life and work both found their rhythm, and my tech stack matured. I also took care of one of life’s big events — I got married.',
    'j20.t': 'New company, new tech',
    'j20.ex': 'My first year at TapTap brought a whole new set of technologies. I learned them from scratch — and it went well.',
    'j21.t': 'Our son was born',
    'j21.ex': 'My wife went back to our hometown to give birth, and our son arrived. The pandemic hit out of nowhere — at first I was confused and didn’t take it too seriously.',
    'j22.t': 'We bought a home in Shanghai',
    'j22.ex': 'We bought a place in Shanghai — somewhere to put down roots. The pandemic got worse, but I wasn’t afraid, and our son kept growing up healthy.',
    'j23.t': 'A new job at year’s end',
    'j23.ex': 'After four years at XD, I moved to JoyMaker at the end of the year. It’s a long way from home and the commute got longer, but my new colleagues are great.',
    'j24.t': 'Our son started kindergarten',
    'j24.ex': 'Our son started kindergarten and we traveled more as a family. At work, AI tools became part of my daily routine.',
    'j25.t': 'A Xinjiang road trip, and what AI changed',
    'j25.ex': 'A dozen-plus days driving around Xinjiang — pure joy. At work, AI shook things up hard, and it made me rethink where my career is heading.',

    /* 07 contact */
    'contact.cn': 'Stable, scalable, AI-driven systems — let’s build them together.',
    'wx.t': 'WeChat',
    'wx.s': 'Scan to add',
    'wx.scan': 'Scan with WeChat',
    'cv.t': 'Résumé PDF',
  },
};
