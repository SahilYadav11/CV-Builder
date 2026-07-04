import { Link, useNavigate } from 'react-router'
import { useAuth } from '../features/auth/hooks/useAuth'

const actionButtonClass =
    'inline-flex items-center justify-center bg-gradient-to-r from-accent to-accent-dark text-white text-sm font-semibold border-none rounded-lg cursor-pointer hover:opacity-90 active:scale-98 transition-all duration-200 shadow-lg whitespace-nowrap'

const AppHeader = ({ action }) => {
    const navigate = useNavigate()
    const { user, handleLogout } = useAuth()

    const logoDestination = user ? '/home' : '/login'

    const onLogout = async () => {
        await handleLogout()
        navigate('/login')
    }

    const renderAction = () => {
        if (action === 'register') {
            return (
                <Link to="/register" className={actionButtonClass} style={{ padding: '0.6rem 1.25rem' }}>
                    Register
                </Link>
            )
        }

        if (action === 'login') {
            return (
                <Link to="/login" className={actionButtonClass} style={{ padding: '0.6rem 1.25rem' }}>
                    Login
                </Link>
            )
        }

        if (action === 'logout') {
            return (
                <button
                    type="button"
                    onClick={onLogout}
                    className={actionButtonClass}
                    style={{ padding: '0.6rem 1.25rem', gap: '0.5rem' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                    Logout
                </button>
            )
        }

        return null
    }

    return (
        <header className="w-full bg-bg-page shrink-0">
            <div className="flex items-center justify-between px-6 py-4">
                <Link to={logoDestination} className="flex flex-col items-start gap-1.5 w-fit group">
                    <span className="text-xl font-bold text-white tracking-tight group-hover:text-slate-200 transition-colors duration-200">CVbuilder</span>
                    <div className="h-px w-full min-w-full bg-border-color" />
                </Link>
                {renderAction()}
            </div>
        </header>
    )
}

export default AppHeader
