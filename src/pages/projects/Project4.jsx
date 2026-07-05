import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Database, Activity, Target, TrendingUp, ChevronDown, ChevronUp, CheckCircle2, Clock, AlertTriangle, FileText, Download, Eye, Quote } from 'lucide-react';
import projectsData from '../../data/projects.json';
import Badge from '../../components/ui/Badge';
import Reveal from '../../components/motion/Reveal';

// Local charts and images
import imgHistograma from '../../resources/projects/Project4/grafica_1_histograma.webp';
import imgRegresion from '../../resources/projects/Project4/grafica_2_regresion_pro.webp';
import imgTStudent from '../../resources/projects/Project4/grafica_3_t_student.webp';
import imgHeatmap from '../../resources/projects/Project4/grafica_4_heatmap.webp';
import imgPlataformas from '../../resources/projects/Project4/grafica_extra_plataformas.webp';
import imgSueno from '../../resources/projects/Project4/grafica_extra_sueno.webp';
import imgResultados from '../../resources/projects/Project4/inves.webp';

// PDF documents
import docInforme from '../../resources/projects/Project4/Informe_Investigacion_RFAN_Ate_Frag.pdf';
import docPresentacion from '../../resources/projects/Project4/Investigacion_Atencion fragmentada_presentacion.pdf';

/* ───────────────────────── building blocks (page-local) ───────────────────────── */

const KeyStat = ({ value, label, accent }) => (
    <div>
        <span className={`font-display text-3xl md:text-4xl font-bold leading-none ${accent ? 'text-rose-400' : 'text-white'}`}>{value}</span>
        <span className="block font-mono text-[11px] text-zinc-500 mt-1.5 uppercase tracking-wider">{label}</span>
    </div>
);

const Figure = ({ n, src, alt, caption }) => (
    <figure className="my-10">
        <div className="rounded-xl overflow-hidden border border-white/8 bg-zinc-950/50 p-2">
            <img src={src} alt={alt} className="w-full h-auto rounded-lg" loading="lazy" />
        </div>
        <figcaption className="mt-3 text-sm text-zinc-500 flex gap-2.5 leading-snug">
            <span className="font-mono text-rose-400 whitespace-nowrap font-medium">Fig.&nbsp;{n}</span>
            <span>{caption}</span>
        </figcaption>
    </figure>
);

const Paper = ({ n, title, children }) => (
    <section className="mt-16 scroll-mt-28">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6 flex items-baseline gap-3">
            <span className="font-mono text-base text-rose-400">§{n}</span> {title}
        </h2>
        <div className="space-y-4 text-zinc-300/90 leading-relaxed text-[15px]">{children}</div>
    </section>
);

const Cite = ({ children }) => <span className="text-rose-300/90 font-medium">{children}</span>;

const Project4 = () => {
    const project = projectsData.find(p => p.id === 4);
    const [expanded, setExpanded] = useState({});
    const toggle = (idx) => setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));

    const techStack = [
        { name: 'Python', role: 'Core language' },
        { name: 'Pandas', role: 'Tabular manipulation' },
        { name: 'NumPy', role: 'Numerical computation' },
        { name: 'SciPy & Statsmodels', role: 'Inferential analysis' },
        { name: 'Matplotlib', role: 'Base plotting' },
        { name: 'Seaborn', role: 'Statistical visualization' },
    ];

    const considerations = [
        { icon: <Database size={16} />, title: 'Data cleaning & filtering', description: 'Self-administered surveys risk dirty or inconsistent data that would skew the statistics.', solution: 'A rigorous cleaning pass excluded incomplete responses, trimming the sample to 705 valid cases — sufficient under the Central Limit Theorem.' },
        { icon: <Activity size={16} />, title: 'Self-report saturation', description: 'Self-reported time variables suffer under- or over-estimation, adding noise to the model.', solution: 'The analysis relied on macro distribution trends. Segmenting on "Affects Academic Performance" diluted individual bias in favor of the general pattern.' },
        { icon: <Target size={16} />, title: 'Publication-quality charts', description: 'Communicating the correlation clearly is not straightforward with Matplotlib defaults.', solution: 'A dedicated script (chinaly.py) packaged the visuals in publication style — violin plots with dense KDEs and styled histograms.' },
        { icon: <TrendingUp size={16} />, title: 'Robust linear regression', description: 'Proving consumption predicted attention loss required a model that properly minimized residual error.', solution: 'An Ordinary Least Squares (OLS) model reached a highly significant R² = 0.692, fitting the true effect line through the scattered data.' },
    ];

    const scripts = [
        { role: 'ETL & Base', file: 'chainalisyst.py', purpose: 'Raw CSV load, basic EDA, original Linear Regression + Student\'s t-test.' },
        { role: 'Visualization', file: 'chinaly.py', purpose: 'Visual refinement — academic-quality histograms, heatmap, violin plots.' },
        { role: 'Analytical Extension', file: 'graphs3.py', purpose: 'Infographic reports: platforms, app time vs. lost sleep, demographics.' },
    ];

    return (
        <div className="relative z-10">
            {/* ─── Abstract / hero ──────────────────────────────────── */}
            <header className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <Link to="/" className="inline-flex items-center text-zinc-400 hover:text-rose-400 mb-10 transition-colors group font-mono text-sm">
                        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        back to work
                    </Link>

                    <div className="flex flex-wrap gap-2 mb-5">
                        {project.tags.map((tag, idx) => <Badge key={idx}>{tag}</Badge>)}
                    </div>

                    <p className="font-mono text-xs text-rose-400 uppercase tracking-[0.25em] mb-4">Research Log · 2025</p>
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-[1.0] tracking-tight">
                        Fragmented<br />Attention<span className="text-rose-500">.</span>
                    </h1>

                    <p className="text-lg text-zinc-400 leading-relaxed mt-7">
                        <span className="font-mono text-xs text-rose-400 uppercase tracking-wider mr-2">Abstract</span>
                        A quantitative study measuring how short-form video consumption (TikTok / Reels)
                        erodes attention and academic performance in university students — and the exact
                        daily-usage threshold beyond which the damage becomes severe.
                    </p>
                </div>
            </header>

            {/* Key results band — the signature scannable row */}
            <div className="border-y border-white/10 bg-white/[0.015] py-8 px-4 sm:px-6 lg:px-8 mb-4">
                <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-5 gap-6">
                    <KeyStat value="r = 0.83" label="Pearson correlation" accent />
                    <KeyStat value="R² = 0.692" label="OLS variance explained" accent />
                    <KeyStat value="t = 23.38" label="Student's t-statistic" />
                    <KeyStat value="3.8 h" label="critical threshold" />
                    <KeyStat value="n = 705" label="filtered sample" />
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

                {/* §1 Background */}
                <Reveal>
                    <Paper n="1" title="Background">
                        <p>
                            Platforms like TikTok build their success on extremely short videos and
                            <strong className="text-zinc-100"> instant-reward</strong> algorithms delivered through infinite scroll.
                            The result is an <strong className="text-zinc-100">attention fragmentation</strong> that collides
                            head-on with the demands of rigorous university programs.
                        </p>
                        <div className="border-l-2 border-rose-500/40 pl-5 py-1 my-6 text-zinc-400">
                            <Quote size={18} className="text-rose-500/60 mb-2" />
                            Retention depends on sustained attention <Cite>(James, 1890)</Cite>; overstimulation erodes
                            the capacity for "deep reading" <Cite>(Carr, 2010)</Cite>, and accelerated stimuli saturate
                            processing under Cognitive Load Theory <Cite>(Sweller, 1988)</Cite>.
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                            <div className="bg-zinc-900/40 rounded-xl p-4 border border-white/5">
                                <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2"><Clock size={15} className="text-rose-400" /> Time fragmentation</h4>
                                <p className="text-xs text-zinc-500 leading-relaxed">Continuous micro-interruptions break the flow state, blocking the transfer of information from short- to long-term memory.</p>
                            </div>
                            <div className="bg-zinc-900/40 rounded-xl p-4 border border-white/5">
                                <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2"><AlertTriangle size={15} className="text-rose-400" /> Cognitive load</h4>
                                <p className="text-xs text-zinc-500 leading-relaxed">Accelerated stimuli saturate processing capacity, inhibiting assimilation (Sweller, 1988).</p>
                            </div>
                        </div>
                    </Paper>
                </Reveal>

                {/* §2 Method */}
                <Reveal>
                    <Paper n="2" title="Method & Data">
                        <p>
                            The analysis was built around <code className="font-mono text-sm text-rose-300 bg-rose-500/10 px-1.5 py-0.5 rounded">Students Social Media Addiction.csv</code> —
                            survey responses from more than <strong className="text-zinc-100">705 university students</strong>, enough to invoke the Central Limit Theorem.
                        </p>

                        <div className="bg-zinc-950/60 rounded-xl p-5 border border-white/8 font-mono text-sm my-6">
                            <p className="text-rose-400 text-[11px] uppercase tracking-wider mb-3 font-sans font-bold">Key dataset variables</p>
                            <div className="space-y-0 text-zinc-300">
                                {[
                                    ['Avg_Daily_Usage_Hours', 'primary X axis'],
                                    ['Addicted_Score', 'Y — cognitive loss'],
                                    ['Affects_Academic_Performance', 'binary separator'],
                                    ['Gender · Platform · Sleep_Score', 'extra features'],
                                ].map(([k, v]) => (
                                    <p key={k} className="flex justify-between gap-4 border-b border-white/5 py-1.5 last:border-0">
                                        <span className="text-rose-200/90">{k}</span>
                                        <span className="text-zinc-600 text-xs whitespace-nowrap self-center">{v}</span>
                                    </p>
                                ))}
                            </div>
                        </div>

                        <p>
                            Exploratory analysis used KDE density estimates — revealing an alarming mean of
                            <strong className="text-zinc-100"> 4.92 daily hours</strong> — and correlation heatmaps before any modeling.
                            Once normality was validated via Shapiro-Wilk, a Student's t-test on separated populations
                            corroborated the self-reported impact against blind addiction-test scores.
                        </p>

                        {/* scripts table */}
                        <div className="rounded-xl overflow-hidden border border-white/8 mt-6">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/10 bg-white/[0.02]">
                                        <th className="text-left px-4 py-2.5 text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Role</th>
                                        <th className="text-left px-4 py-2.5 text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Script</th>
                                        <th className="text-left px-4 py-2.5 text-[11px] font-mono text-zinc-500 uppercase tracking-wider hidden sm:table-cell">Purpose</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scripts.map((s) => (
                                        <tr key={s.file} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                                            <td className="px-4 py-3 text-zinc-300 text-xs font-medium">{s.role}</td>
                                            <td className="px-4 py-3 font-mono text-rose-300 text-xs whitespace-nowrap">{s.file}</td>
                                            <td className="px-4 py-3 text-zinc-500 text-xs hidden sm:table-cell">{s.purpose}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Paper>
                </Reveal>

                {/* §3 Results */}
                <Reveal>
                    <Paper n="3" title="Results">
                        <p>
                            The Pearson coefficient confirmed a very strong positive correlation of
                            <strong className="text-rose-300"> r = 0.83</strong>: more short-form video consumption goes hand in
                            hand with greater deterioration in attentional control.
                        </p>

                        {/* hero equation */}
                        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.04] p-8 my-8 text-center">
                            <p className="font-mono text-[11px] text-rose-400 uppercase tracking-wider mb-4">Prediction equation · least squares</p>
                            <p className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
                                Ŷ = 1.05·X + 1.27
                            </p>
                            <p className="text-sm text-zinc-400 mt-4 max-w-md mx-auto leading-relaxed">
                                <strong className="text-zinc-200">R² = 0.692</strong> — usage time alone explains 69.2% of the
                                variation in attention problems. Each extra hour raises the impact score by
                                <strong className="text-zinc-200"> 1.05 points</strong>.
                            </p>
                        </div>

                        <Figure n="1" src={imgRegresion} alt="OLS regression of hours vs. addiction score" caption="OLS regression — daily usage hours against the addiction / cognitive-loss score, with the fitted least-squares line." />

                        <h3 className="font-display text-xl font-bold text-white mt-10 mb-2">The critical threshold</h3>
                        <p>
                            Evaluating academic impact (<strong className="text-rose-300">t = 23.38</strong>) surfaced a drastic
                            barrier around <strong className="text-zinc-100">3.8 – 4.0 daily hours</strong>. Below 3.8 h, students keep
                            entertainment separate from performance. Crossing that band triggers an exponential probability
                            of cognitive impact — above 95%.
                        </p>

                        <Figure n="2" src={imgTStudent} alt="Student's t-test violin plot" caption="Student's t-test — KDE violin distributions separating students with and without reported academic impact." />

                        <h3 className="font-display text-xl font-bold text-white mt-10 mb-2">Lateral effects</h3>
                        <p>
                            Heatmaps revealed that excessive hours laterally drain other predictors — notably sleep.
                            Students on YouTube and short-form visual platforms showed more fragile sleep profiles,
                            compounding the deficit.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                            <Figure n="3" src={imgHeatmap} alt="Correlation heatmap" caption="Correlation heatmap across all study variables." />
                            <Figure n="4" src={imgSueno} alt="Sleep hours by platform" caption="Sleep hours by platform." />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Figure n="5" src={imgHistograma} alt="Population histogram of usage hours" caption="Population bell curve — distribution of daily usage hours." />
                            <Figure n="6" src={imgPlataformas} alt="Frequency by platform" caption="Usage frequency by social platform." />
                        </div>
                    </Paper>
                </Reveal>

                {/* §4 Discussion */}
                <Reveal>
                    <Paper n="4" title="Discussion">
                        <p className="text-zinc-400">Four methodological challenges shaped the rigor of the study. Expand each for the resolution.</p>
                        <div className="space-y-3 mt-4 not-prose">
                            {considerations.map((c, idx) => (
                                <div key={idx} className="bg-zinc-900/40 border border-white/8 rounded-xl overflow-hidden hover:border-rose-500/20 transition-colors">
                                    <button onClick={() => toggle(idx)} className="w-full flex items-center justify-between p-4 text-left" aria-expanded={!!expanded[idx]}>
                                        <div className="flex items-center gap-3">
                                            <span className="bg-rose-500/10 p-2 rounded-lg border border-rose-500/20 text-rose-400">{c.icon}</span>
                                            <span>
                                                <span className="block font-bold text-white text-sm">{c.title}</span>
                                                <span className="block text-xs text-zinc-500 mt-0.5 line-clamp-1">{c.description}</span>
                                            </span>
                                        </div>
                                        <span className="text-zinc-500 ml-4 flex-shrink-0">{expanded[idx] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
                                    </button>
                                    {expanded[idx] && (
                                        <div className="px-4 pb-4 border-t border-white/5 pt-3">
                                            <p className="text-sm text-zinc-400 mb-3">{c.description}</p>
                                            <div className="flex items-start gap-2 bg-rose-500/5 rounded-lg p-3 border border-rose-500/10">
                                                <CheckCircle2 size={14} className="text-rose-400 mt-0.5 flex-shrink-0" />
                                                <p className="text-sm text-zinc-300"><strong className="text-rose-300">Resolution:</strong> {c.solution}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Paper>
                </Reveal>

                {/* §5 Proposal */}
                <Reveal>
                    <Paper n="5" title="Proposal — Data-Driven Detox">
                        <p className="text-zinc-400">From the regression, the report proposes a quantitative remedy rather than a vague "put the phone down":</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 not-prose">
                            {[
                                { icon: Target, title: 'Active self-monitoring', body: 'A personal limit. Crossing X > 4 h pushes the statistical probability of academic impact past 95%.' },
                                { icon: Activity, title: 'Micro-pauses (20/20)', body: 'Every 20 min of consumption, 20 s without stimuli so working memory flushes its buffer before study.' },
                                { icon: AlertTriangle, title: 'Cognitive friction', body: 'Blocking apps that insert intentional obstacles, forcing a conscious decision before scrolling.' },
                            ].map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div key={item.title} className="bg-zinc-900/40 border border-white/8 rounded-xl p-4 hover:border-rose-500/20 transition-colors">
                                        <Icon size={16} className="text-rose-400 mb-2" />
                                        <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                                        <p className="text-xs text-zinc-500 leading-relaxed">{item.body}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </Paper>
                </Reveal>

                {/* §6 Conclusion */}
                <Reveal>
                    <Paper n="6" title="Conclusion">
                        <p>
                            The study firmly rejects the null hypotheses and establishes mathematical evidence that
                            unrestricted consumption of scroll-friendly platforms damages a student's long-term learning curve.
                        </p>
                        <p className="border-l-2 border-rose-500/40 pl-5 text-zinc-400">
                            With the results supporting Cognitive Load Theory, the groundwork is laid for future
                            software to build smarter, real-world "Digital Detox" environments for institutions.
                        </p>
                    </Paper>
                </Reveal>

                {/* Appendix */}
                <Reveal>
                    <section className="mt-20 pt-10 border-t border-white/10">
                        <h2 className="font-mono text-xs text-zinc-500 uppercase tracking-[0.25em] mb-8">Appendix</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* metadata + stack */}
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-sm font-bold text-zinc-200 mb-3">Dataset metadata</h3>
                                    <div className="space-y-0 text-sm">
                                        {[
                                            ['Source', 'Surveys / local CSV'],
                                            ['Samples', '705 filtered records'],
                                            ['Study type', 'Cross-sectional'],
                                            ['Dependent var.', 'Addiction / cognitive score'],
                                            ['Base model', 'OLS (least squares)'],
                                            ['R² result', '0.692 · highly significant'],
                                        ].map(([k, v]) => (
                                            <div key={k} className="flex justify-between py-1.5 border-b border-white/5 last:border-0">
                                                <span className="text-zinc-500 text-xs font-mono">{k}</span>
                                                <span className="text-zinc-300 text-xs text-right">{v}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-zinc-200 mb-3">Analytics stack</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {techStack.map((t) => (
                                            <span key={t.name} title={t.role} className="font-mono text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-zinc-400">{t.name}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* documents */}
                            <div>
                                <h3 className="text-sm font-bold text-zinc-200 mb-3 flex items-center gap-2"><FileText size={15} className="text-rose-400" /> Documents</h3>
                                <p className="text-xs text-zinc-600 mb-4">Full report and slide deck (Spanish).</p>
                                <div className="space-y-3">
                                    {[
                                        { title: 'Technical Report', file: docInforme, desc: 'Methodology + results · PDF' },
                                        { title: 'Executive Presentation', file: docPresentacion, desc: 'Research slide deck · PDF' },
                                    ].map((doc) => (
                                        <div key={doc.title} className="bg-zinc-900/50 rounded-xl border border-white/8 p-4 hover:border-rose-500/25 transition-colors group">
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <h4 className="text-white font-medium text-sm group-hover:text-rose-300 transition-colors">{doc.title}</h4>
                                                    <p className="text-[11px] text-zinc-600 mt-0.5 font-mono">{doc.desc}</p>
                                                </div>
                                                <div className="flex gap-1.5 flex-shrink-0">
                                                    <a href={doc.file} target="_blank" rel="noopener noreferrer" aria-label={`View ${doc.title}`}
                                                        className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors border border-rose-500/20"><Eye size={15} /></a>
                                                    <a href={doc.file} download aria-label={`Download ${doc.title}`}
                                                        className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-white/5"><Download size={15} /></a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <figure className="mt-5">
                                    <img src={imgResultados} alt="Results infographic summary" className="w-full h-auto rounded-xl border border-white/8" loading="lazy" />
                                    <figcaption className="mt-2 text-xs text-zinc-600 font-mono">summary infographic</figcaption>
                                </figure>
                            </div>
                        </div>
                    </section>
                </Reveal>

                {/* next */}
                <div className="pt-16 mt-10 border-t border-white/10 flex items-center justify-between">
                    <Link to="/project/2" className="font-mono text-sm text-zinc-400 hover:text-rose-400 transition-colors inline-flex items-center gap-2 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> prev · restoration
                    </Link>
                    <Link to="/project/5" className="font-mono text-sm text-zinc-400 hover:text-rose-400 transition-colors inline-flex items-center gap-2 group text-right">
                        next · photolab pro <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Project4;
