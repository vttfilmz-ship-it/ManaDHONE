
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Admin from './pages/Admin.tsx';
import Auth from './pages/Auth.tsx';
import BusinessDetail from './pages/BusinessDetail.tsx';
import PropertyDetail from './pages/PropertyDetail.tsx';
import About from './pages/About.tsx';
import Explore from './pages/Explore.tsx';
import Jobs from './pages/Jobs.tsx';
import Freelancers from './pages/Freelancers.tsx';
import DhoneFM from './pages/DhoneFM.tsx';
import Saved from './pages/Saved.tsx';
import Contact from './pages/Contact.tsx';
import Advertise from './pages/Advertise.tsx';
import SubmitListing from './pages/SubmitListing.tsx';
import Stars from './pages/Stars.tsx';
import RealEstate from './pages/RealEstate.tsx';
import Directory from './pages/Directory.tsx';
import Chatbot from './components/Chatbot.tsx';
import { getCurrentUser, logoutUser, getTownStats } from './services/storageService.ts';
import { User, Category, TownStats } from './types.ts';
import { IconBookmark, IconRadio, IconPhone, IconMail, IconFacebook, IconInstagram, IconTwitter, IconStar, IconHome, IconBook, IconBriefcase, IconTrendingUp, IconCheck } from './components/Icons.tsx';

const IconUserAvatar = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

const IconExit = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
);

const IconArrowUp = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m18 15-6-6-6 6"/></svg>
);

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar = ({ user, onLogout }: NavbarProps) => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinkClass = (path: string) => `
        text-sm font-bold transition-all px-3 py-2 rounded-lg
        ${location.pathname === path ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'}
    `;

    return (
        <nav className={`fixed top-0 z-[50] w-full transition-all duration-300 border-b ${
            scrolled ? 'bg-white/95 backdrop-blur-sm border-gray-200 shadow-sm py-2' : 'bg-white border-transparent py-4'
        }`}>
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                    <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl">M</div>
                    <span className="text-xl font-black text-gray-900 tracking-tighter">
                        Mana<span className="text-indigo-600">DHONE</span>
                    </span>
                </Link>
                
                <div className="hidden xl:flex items-center gap-2">
                    <Link to="/" className={navLinkClass('/')}>Home</Link>
                    <Link to="/directory" className={navLinkClass('/directory')}>Directory</Link>
                    <Link to="/explore" className={navLinkClass('/explore')}>Discover</Link>
                    <Link to="/realestate" className={navLinkClass('/realestate')}>Property</Link>
                    <Link to="/jobs" className={navLinkClass('/jobs')}>Jobs</Link>
                    <Link to="/freelancers" className={navLinkClass('/freelancers')}>Freelancers</Link>
                    <Link to="/stars" className={navLinkClass('/stars')}>Stars</Link>
                    <Link to="/fm" className={navLinkClass('/fm')}>Radio</Link>
                    
                    <div className="h-6 w-px bg-gray-200 mx-4"></div>

                    {user ? (
                        <div className="relative">
                            <button 
                                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all"
                            >
                                <IconUserAvatar className="w-4 h-4" />
                                {user.name.split(' ')[0]}
                            </button>
                            
                            {userDropdownOpen && (
                                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-in fade-in zoom-in-95 duration-200">
                                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                        <p className="text-[10px] font-black text-gray-400 uppercase">Account</p>
                                        <p className="text-sm font-bold text-gray-900 truncate">{user.email}</p>
                                    </div>
                                    <Link to="/admin" onClick={() => setUserDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 font-bold">Dashboard</Link>
                                    <Link to="/saved" onClick={() => setUserDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 font-bold">Saved Items</Link>
                                    <button onClick={() => { onLogout(); setUserDropdownOpen(false); }} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-bold border-t border-gray-50 mt-1">
                                        <IconExit className="w-4 h-4" /> Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/auth" className="text-sm font-bold px-6 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-md">
                            Sign In
                        </Link>
                    )}
                </div>

                <div className="flex items-center gap-4 xl:hidden">
                    <button 
                        className="text-gray-900 bg-gray-50 p-2 rounded-xl border border-gray-200"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={mobileMenuOpen ? "M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"}></path>
                        </svg>
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="fixed inset-0 top-16 z-[40] bg-white xl:hidden overflow-y-auto p-6 animate-in slide-in-from-right duration-300">
                    <div className="space-y-4">
                        <MobileNavLink to="/" label="Home" onClick={() => setMobileMenuOpen(false)} />
                        <MobileNavLink to="/directory" label="Directory" onClick={() => setMobileMenuOpen(false)} />
                        <MobileNavLink to="/explore" label="Explore Dhone" onClick={() => setMobileMenuOpen(false)} />
                        <MobileNavLink to="/realestate" label="Real Estate" onClick={() => setMobileMenuOpen(false)} />
                        <MobileNavLink to="/jobs" label="Jobs" onClick={() => setMobileMenuOpen(false)} />
                        <MobileNavLink to="/freelancers" label="Freelancers" onClick={() => setMobileMenuOpen(false)} />
                        <MobileNavLink to="/stars" label="Dhone Stars" onClick={() => setMobileMenuOpen(false)} />
                        <MobileNavLink to="/fm" label="Live Radio" onClick={() => setMobileMenuOpen(false)} />
                        
                        <div className="pt-6 border-t border-gray-100">
                            {user ? (
                                <div className="space-y-3">
                                    <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-xl text-center">Dashboard</Link>
                                    <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="w-full py-3 px-4 text-red-600 font-bold border-2 border-red-50 rounded-xl text-center">Sign Out</button>
                                </div>
                            ) : (
                                <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="block w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-xl text-center shadow-lg">Sign In</Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

const MobileNavLink = ({ to, label, onClick }: { to: string, label: string, onClick: () => void }) => (
    <Link to={to} onClick={onClick} className="block py-4 px-2 border-b border-gray-50 text-lg font-bold text-gray-800 active:bg-indigo-50">
        {label}
    </Link>
);

const Footer = () => {
    const categories = Object.values(Category);
    const [stats, setStats] = useState<TownStats>(getTownStats());

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(getTownStats());
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="md:col-span-1 space-y-6 text-center md:text-left">
                        <Link to="/" className="flex items-center gap-2 justify-center md:justify-start">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-2xl">M</div>
                            <span className="text-2xl font-black text-white tracking-tighter">ManaDHONE</span>
                        </Link>
                        <p className="text-sm leading-relaxed">
                            The premier digital hub for our town. Connecting businesses with residents since 2024.
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:text-white transition-colors"><IconFacebook className="w-5 h-5" /></a>
                            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:text-white transition-colors"><IconInstagram className="w-5 h-5" /></a>
                            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:text-white transition-colors"><IconTwitter className="w-5 h-5" /></a>
                        </div>
                    </div>

                    <div className="text-center md:text-left">
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/directory" className="hover:text-white transition-colors">Directory</Link></li>
                            <li><Link to="/explore" className="hover:text-white transition-colors">Explore</Link></li>
                            <li><Link to="/realestate" className="hover:text-white transition-colors">Real Estate</Link></li>
                            <li><Link to="/jobs" className="hover:text-white transition-colors">Careers</Link></li>
                        </ul>
                    </div>

                    <div className="text-center md:text-left">
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Support</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                            <li><Link to="/advertise" className="hover:text-white transition-colors text-indigo-400 font-bold">Advertise</Link></li>
                            <li><Link to="/admin" className="hover:text-white transition-colors">Staff Access</Link></li>
                        </ul>
                    </div>

                    <div className="text-center md:text-left">
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Stats</h4>
                        <div className="space-y-4">
                            <div>
                                <p className="text-2xl font-black text-indigo-400">{stats.residents}</p>
                                <p className="text-[10px] uppercase font-bold text-gray-500">Residents reached</p>
                            </div>
                            <div>
                                <p className="text-2xl font-black text-indigo-400">{stats.activeListings}</p>
                                <p className="text-[10px] uppercase font-bold text-gray-500">Live listings</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-[10px] font-bold uppercase tracking-widest text-gray-600">
                    <p>© {new Date().getFullYear()} ManaDHONE Portal. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-white flex flex-col pt-16">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="flex-grow">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/directory" element={<Directory />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/realestate" element={<RealEstate />} />
                <Route path="/property/:id" element={<PropertyDetail />} />
                <Route path="/auth" element={<Auth onLoginSuccess={(u) => setUser(u)} />} />
                <Route path="/about" element={<About />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/freelancers" element={<Freelancers />} />
                <Route path="/stars" element={<Stars />} />
                <Route path="/saved" element={<Saved />} />
                <Route path="/fm" element={<DhoneFM />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/advertise" element={<Advertise />} />
                <Route path="/submit-listing" element={<SubmitListing />} />
                <Route path="/business/:id" element={<BusinessDetail />} />
                <Route 
                    path="/admin" 
                    element={user?.role === 'admin' ? <Admin /> : <Navigate to="/auth" replace />} 
                />
            </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </HashRouter>
  );
};

export default App;
