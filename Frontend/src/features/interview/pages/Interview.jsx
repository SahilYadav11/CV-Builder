import React, { useState, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useParams } from 'react-router'
import AppHeader from '../../../components/AppHeader.jsx'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

const QuestionCard = ({ item, index }) => {
    const [ open, setOpen ] = useState(false)
    return (
        <div className="q-card bg-bg-panel border border-border-color rounded-lg overflow-hidden transition-all duration-200 hover:border-slate-500">
            <div className="q-card__header flex items-start gap-3 px-5 py-4 cursor-pointer select-none" onClick={() => setOpen(o => !o)}>
                <span className="q-card__index shrink-0 text-[10px] font-bold text-accent bg-[rgba(255,45,120,0.1)] border border-[rgba(255,45,120,0.2)] rounded-md px-3 py-1.5 mt-0.5">Q{index + 1}</span>
                <p className="q-card__question flex-1 m-0 text-sm font-semibold text-white leading-relaxed">{item.question}</p>
                <span className={`q-card__chevron shrink-0 text-slate-400 transition-transform duration-200 mt-0.5 ${open ? 'rotate-180 text-accent' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className="q-card__body px-6 py-5 flex flex-col gap-5 border-t border-border-color">
                    <div className="q-card__section flex flex-col gap-2.5">
                        <span className="q-card__tag text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-md w-fit text-violet-400 bg-[rgba(167,139,250,0.1)] border border-[rgba(167,139,250,0.2)]">Intention</span>
                        <p className="m-0 text-xs text-slate-300 leading-relaxed">{item.intention}</p>
                    </div>
                    <div className="q-card__section flex flex-col gap-2.5">
                        <span className="q-card__tag text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-md w-fit text-emerald-400 bg-[rgba(63,185,80,0.1)] border border-[rgba(63,185,80,0.2)]">Model Answer</span>
                        <p className="m-0 text-xs text-slate-300 leading-relaxed">{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className="roadmap-day flex flex-col gap-2 py-3 pl-14 relative">
        {/* Timeline Dot */}
        <div className="absolute left-[21px] top-[1.05rem] w-3.5 h-3.5 rounded-full bg-bg-card border-2 border-accent" />
        <div className="roadmap-day__header flex items-center gap-2.5">
            <span className="roadmap-day__badge text-[10px] font-bold text-accent bg-[rgba(255,45,120,0.1)] border border-[rgba(255,45,120,0.25)] px-2 py-0.5 rounded-full">Day {day.day}</span>
            <h3 className="roadmap-day__focus m-0 text-sm font-semibold text-white">{day.focus}</h3>
        </div>
        <ul className="roadmap-day__tasks list-none m-0 p-0 flex flex-col gap-1.5">
            {day.tasks.map((task, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                    <span className="roadmap-day__bullet shrink-0 w-1.5 h-1.5 rounded-full bg-slate-500 mt-1.5" />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

const Interview = () => {
    const [ activeNav, setActiveNav ] = useState('technical')
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [ interviewId ])

    if (loading || !report) {
        return (
            <main className="min-h-screen w-full flex justify-center items-center bg-bg-page text-2xl font-bold text-slate-400 animate-pulse">
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }

    const scoreColor =
        report.matchScore >= 80 ? 'border-severity-low text-severity-low' :
            report.matchScore >= 60 ? 'border-severity-medium text-severity-medium' : 'border-severity-high text-severity-high'

    return (
        <div className="interview-page w-full min-h-screen bg-bg-page text-slate-200 font-sans flex flex-col box-border">
            <AppHeader action="logout" />
            <div className="interview-layout flex flex-1 w-full min-h-0 bg-bg-card justify-between">

                {/* ── Left Nav ── */}
                <nav className="interview-nav w-[256px] shrink-0 px-5 py-6 flex flex-col gap-6 bg-bg-card h-full">
                    <div className="nav-content flex flex-col gap-1">
                        <p className="interview-nav__label text-[10px] font-bold uppercase tracking-wider text-slate-500 text-center w-full mb-3">Sections</p>
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                className={`interview-nav__item flex items-center gap-2.5 w-full px-3 py-2.5 bg-transparent border-none rounded-lg text-slate-400 font-sans text-sm cursor-pointer text-left hover:bg-bg-panel hover:text-white transition-all duration-150 ${activeNav === item.id ? 'bg-[rgba(255,45,120,0.1)] text-accent font-semibold' : ''}`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span className="interview-nav__icon flex items-center shrink-0">{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => { getResumePdf(interviewId) }}
                        className="w-full bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl transition-all duration-300 active:scale-98 cursor-pointer flex items-center justify-center gap-2 text-xs whitespace-nowrap shrink-0"
                        style={{ padding: '0.5rem 0.75rem' }}
                    >
                        <svg className="shrink-0" width="14" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
                        Download Resume
                    </button>
                </nav>

                <div className="interview-divider w-px bg-border-color shrink-0" />

                {/* ── Center Content ── */}
                <main className="interview-content flex-1 px-8 py-8 overflow-y-auto min-h-0 bg-bg-card">
                    {activeNav === 'technical' && (
                        <section>
                            <div className="content-header flex items-baseline gap-3 mb-6 pb-4 border-b border-border-color">
                                <h2 className="text-lg font-bold text-white m-0">Technical Questions</h2>
                                <span className="content-header__count text-xs text-slate-400 bg-bg-panel px-3.5 py-1.5 rounded-full border border-border-color">{report.technicalQuestions.length} questions</span>
                            </div>
                            <div className="q-list flex flex-col gap-3">
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className="content-header flex items-baseline gap-3 mb-6 pb-4 border-b border-border-color">
                                <h2 className="text-lg font-bold text-white m-0">Behavioral Questions</h2>
                                <span className="content-header__count text-xs text-slate-400 bg-bg-panel px-3.5 py-1.5 rounded-full border border-border-color">{report.behavioralQuestions.length} questions</span>
                            </div>
                            <div className="q-list flex flex-col gap-3">
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className="content-header flex items-baseline gap-3 mb-6 pb-4 border-b border-border-color">
                                <h2 className="text-lg font-bold text-white m-0">Preparation Road Map</h2>
                                <span className="content-header__count text-xs text-slate-400 bg-bg-panel px-3.5 py-1.5 rounded-full border border-border-color">{report.preparationPlan.length}-day plan</span>
                            </div>
                            <div className="roadmap-list flex flex-col gap-0 relative">
                                {/* Timeline Line */}
                                <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent to-[rgba(255,45,120,0.1)] rounded" />
                                {report.preparationPlan.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                <div className="interview-divider w-px bg-border-color shrink-0" />

                {/* ── Right Sidebar ── */}
                <aside className="interview-sidebar w-[280px] shrink-0 px-4 py-8 flex flex-col gap-3 bg-bg-card">

                    {/* Match Score */}
                    <div className="match-score flex flex-col items-center gap-4">
                        <p className="match-score__label text-[10px] font-bold uppercase tracking-wider text-slate-500 self-start w-full">Match Score</p>
                        <div className={`match-score__ring w-[160px] h-[160px] border-[6px] rounded-full flex flex-col items-center justify-center border-solid ${scoreColor}`}>
                            <span className="match-score__value text-5xl font-extrabold text-white leading-none">{report.matchScore}</span>
                            <span className="match-score__pct text-base text-slate-400 mt-0.5">%</span>
                        </div>
                        <p className={`match-score__sub m-0 text-sm text-center font-semibold ${
                            report.matchScore >= 80 ? 'text-severity-low' :
                            report.matchScore >= 60 ? 'text-severity-medium' : 'text-severity-high'
                        }`}>
                            {report.matchScore >= 80 ? 'Strong Match' : report.matchScore >= 60 ? 'Good Match' : 'Potential Match'}
                        </p>
                    </div>

                    <div className="sidebar-divider h-px bg-border-color" />

                    {/* Skill Gaps */}
                    <div className="skill-gaps flex flex-col gap-2">
                        <p className="skill-gaps__label text-[10px] font-bold uppercase tracking-wider text-slate-500">Skill Gaps</p>
                        <div className="skill-gaps__list flex flex-wrap gap-x-2 gap-y-1.5">
                            {report.skillGaps.map((gap, i) => (
                                <span key={i} className={`skill-tag inline-block text-xs font-semibold px-5 py-3 rounded-lg border cursor-default leading-snug ${
                                    gap.severity === 'high' ? 'text-severity-high bg-[rgba(255,77,77,0.1)] border-[rgba(255,77,77,0.25)]' :
                                    gap.severity === 'medium' ? 'text-severity-medium bg-[rgba(245,166,35,0.1)] border-[rgba(245,166,35,0.25)]' :
                                    'text-severity-low bg-[rgba(63,185,80,0.1)] border-[rgba(63,185,80,0.25)]'
                                }`}>
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    )
}

export default Interview