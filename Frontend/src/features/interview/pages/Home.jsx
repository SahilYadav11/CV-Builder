import React, { useState } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import AppHeader from '../../../components/AppHeader.jsx'

const Home = () => {

    const { loading, generateReport } = useInterview()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const [ error, setError ] = useState("")

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        setError("")
        if (!jobDescription.trim()) {
            setError("Target Job Description is required.")
            return
        }
        if (!selfDescription.trim()) {
            setError("Self-Description is required.")
            return
        }

        try {
            const data = await generateReport({ jobDescription, selfDescription })
            if (data && data._id) {
                navigate(`/interview/${data._id}`)
            } else {
                setError("Failed to generate report. Please verify your API key and input parameters.")
            }
        } catch (err) {
            console.error(err)
            setError(err.message || "Failed to generate report.")
        }
    }

    if (loading) {
        return (
            <main className="min-h-screen w-full flex justify-center items-center bg-bg-page text-2xl font-bold text-slate-400 animate-pulse">
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }

    return (
        <div className="home-page min-h-screen w-full flex flex-col bg-bg-page text-slate-200 font-sans">
            <AppHeader action="logout" />
            <div
            className="flex flex-col items-center justify-center flex-1 w-full"
            style={{ padding: '3rem 1.5rem', gap: '2rem' }}
        >

            {/* Page Header */}
            <header className="page-header text-center flex flex-col items-center justify-center" style={{ gap: '0.5rem' }}>
                <h1 className="text-4xl font-extrabold text-white">Create Your Custom <span className="highlight text-accent">Interview Plan</span></h1>
                <p className="text-slate-400 text-sm max-w-lg leading-relaxed">Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
            </header>

            {error && (
                <div className="w-full max-w-4xl bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm text-center font-medium shadow-md">
                    {error}
                </div>
            )}

            {/* Main Card */}
            <div className="interview-card w-full max-w-4xl bg-bg-card border border-border-color rounded-2xl shadow-2xl overflow-hidden">
                <div className="interview-card__body flex flex-col md:flex-row min-h-[520px]">

                    {/* Left Panel - Job Description */}
                    <div 
                        className="panel panel--left flex-1 flex flex-col relative"
                        style={{ padding: '1.75rem', gap: '1.25rem' }}
                    >
                        <div className="panel__header flex items-center gap-2 mb-1" style={{ gap: '0.5rem' }}>
                            <span className="panel__icon flex items-center text-accent">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            </span>
                            <h2 className="text-base font-semibold text-white flex-1">Target Job Description</h2>
                            <span className="badge badge--required text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-[rgba(255,45,120,0.15)] text-accent border border-[rgba(255,45,120,0.3)]">Required</span>
                        </div>
                        <textarea
                            onChange={(e) => { setJobDescription(e.target.value) }}
                            style={{ padding: '0.75rem 1rem' }}
                            className="panel__textarea flex-1 w-full bg-bg-input border border-border-color rounded-lg text-white placeholder-slate-500 font-sans text-sm resize-none outline-none focus:border-accent transition-all duration-200 leading-relaxed"
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                        />
                        <div className="char-counter absolute bottom-10 right-10 text-xs text-slate-500">{jobDescription.length} / 5000 chars</div>
                    </div>

                    {/* Vertical Divider */}
                    <div className="panel-divider w-px bg-border-color hidden md:block shrink-0" />

                    {/* Right Panel - Self Description */}
                    <div 
                        className="panel panel--right flex-1 flex flex-col"
                        style={{ padding: '1.75rem', gap: '1.25rem' }}
                    >
                        <div className="panel__header flex items-center gap-2 mb-1" style={{ gap: '0.5rem' }}>
                            <span className="panel__icon flex items-center text-accent">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </span>
                            <h2 className="text-base font-semibold text-white flex-1">Self-Description</h2>
                            <span className="badge badge--required text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-[rgba(255,45,120,0.15)] text-accent border border-[rgba(255,45,120,0.3)]">Required</span>
                        </div>
                        <textarea
                            onChange={(e) => { setSelfDescription(e.target.value) }}
                            id="selfDescription"
                            name="selfDescription"
                            style={{ padding: '0.75rem 1rem' }}
                            className="panel__textarea flex-1 w-full bg-bg-input border border-border-color rounded-lg text-white placeholder-slate-500 font-sans text-sm resize-none outline-none focus:border-accent transition-all duration-200 leading-relaxed"
                            placeholder="Describe your experience, key skills, years of experience, and notable projects..."
                            maxLength={3000}
                        />
                        <div className="info-box flex items-start bg-[#1b2a4a] border border-[#2d4a7a] rounded-lg" style={{ padding: '0.75rem 1rem', gap: '0.6rem' }}>
                            <span className="info-box__icon shrink-0 text-[#4a90e2] mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
                            </span>
                            <p className="text-xs text-[#8ab4f8] leading-relaxed">A clear <strong className="text-white font-semibold">Self-Description</strong> helps the AI build a personalized interview plan tailored to your background.</p>
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div 
                    className="interview-card__footer flex items-center justify-between border-t border-border-color"
                    style={{ padding: '1.25rem 1.75rem' }}
                >
                    <span className="footer-info text-xs text-slate-500">AI-Powered Strategy Generation &bull; Approx 30s</span>
                    <button
                        onClick={handleGenerateReport}
                        className="generate-btn flex items-center bg-gradient-to-r from-accent to-accent-dark text-white text-sm font-semibold border-none rounded-lg cursor-pointer hover:opacity-90 active:scale-98 transition-all duration-200 shadow-lg"
                        style={{ padding: '0.75rem 1.5rem', gap: '0.5rem' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>

            {/* Page Footer */}
            <footer className="page-footer flex mt-8" style={{ gap: '1.5rem' }}>
                {/* we can add some footer links here if there are any, currently we don't have any */}
            </footer>
            </div>
        </div>
    )
}

export default Home
