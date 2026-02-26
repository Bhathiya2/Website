import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Home, Folder, MessageCircle, Mail, LogOut, Menu, X, Users, Image } from "lucide-react";
import { logout } from "../api/userManagement";
import SignOutModal from "../components/SignOutModal";
import { getProjects } from "../api/ProjectApi";
import { getFeedbacks } from "../api/FeedbackApi";
import { getLogos } from "../api/LogoApi";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [projectsCount, setProjectsCount] = useState(null);
  const [feedbacksCount, setFeedbacksCount] = useState(null);
  const [logosCount, setLogosCount] = useState(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      getProjects().then((res) => res.data || []),
      getFeedbacks(),
      getLogos(),
    ])
      .then(([projects, feedbacks, logos]) => {
        if (!mounted) return;
        setProjectsCount(Array.isArray(projects) ? projects.length : (projects?.data?.length || 0));
        setFeedbacksCount(Array.isArray(feedbacks) ? feedbacks.length : (feedbacks?.data?.length || 0));
        setLogosCount(Array.isArray(logos) ? logos.length : (logos?.data?.length || 0));
      })
      .catch(() => {
        if (!mounted) return;
        setProjectsCount(0);
        setFeedbacksCount(0);
        setLogosCount(0);
      });
    return () => (mounted = false);
  }, []);

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/signin');
    }
  };

  const handleSignOutClick = () => {
    setShowSignOutModal(true);
  };

  const confirmSignOut = () => {
    setShowSignOutModal(false);
    handleSignOut();
  };

  const cancelSignOut = () => {
    setShowSignOutModal(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 md:hidden bg-black/70 border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button aria-label="Open menu" onClick={() => setOpen(true)} className="p-2 rounded-md hover:bg-white/5">
            <Menu className="w-5 h-5 text-cyan-400" />
          </button>
          <div className="text-lg font-black">Admin</div>
        </div>
        <div>
          <button onClick={handleSignOutClick} className="p-2 rounded-md hover:bg-white/5">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      <aside className="w-72 bg-black/60 border-r border-white/5 p-6 hidden md:flex md:fixed md:inset-y-0 md:left-0 md:w-72 flex-col overflow-y-auto">
        <div className="mb-8">
          <h3 className="text-2xl font-black">Admin</h3>
          <p className="text-sm text-zinc-400">Control Panel</p>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link to="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                <Home className="w-5 h-5 text-cyan-400" />
                <span className="font-bold">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/projects" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                <Folder className="w-5 h-5 text-cyan-400" />
                <span className="font-bold">Projects</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/feedbacks" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                <MessageCircle className="w-5 h-5 text-cyan-400" />
                <span className="font-bold">Feedbacks</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/logos" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                <Image className="w-5 h-5 text-cyan-400" />
                <span className="font-bold">Logos</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/users" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                <Users className="w-5 h-5 text-cyan-400" />
                <span className="font-bold">User Management</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/contacts" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                <Mail className="w-5 h-5 text-cyan-400" />
                <span className="font-bold">Contact</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-auto">
          <div className="mb-4 px-3">
            <p className="text-white font-medium">{user.first_name} {user.last_name}</p>
          </div>
          <button onClick={handleSignOutClick} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Sign out</span>
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-50 md:hidden ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
        <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-black/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} />
        <aside className={`absolute left-0 top-0 bottom-0 w-72 bg-black/90 p-6 transform transition-transform ${open ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-black">Admin</h3>
              <p className="text-sm text-zinc-400">Control Panel</p>
            </div>
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2 rounded-md hover:bg-white/5">
              <X className="w-5 h-5 text-zinc-300" />
            </button>
          </div>

          <nav className="flex-1">
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <Home className="w-5 h-5 text-cyan-400" />
                  <span className="font-bold">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/projects" onClick={() => setOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <Folder className="w-5 h-5 text-cyan-400" />
                  <span className="font-bold">Projects</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/feedbacks" onClick={() => setOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <MessageCircle className="w-5 h-5 text-cyan-400" />
                  <span className="font-bold">Feedbacks</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/logos" onClick={() => setOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <Image className="w-5 h-5 text-cyan-400" />
                  <span className="font-bold">Logos</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/users" onClick={() => setOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <Users className="w-5 h-5 text-cyan-400" />
                  <span className="font-bold">User Management</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/contacts" onClick={() => setOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  <span className="font-bold">Contact</span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="mt-auto">
            <div className="mb-4 px-3">
              <p className="text-white font-medium">{user.first_name} {user.last_name}</p>
            </div>
            <button onClick={() => { handleSignOutClick(); setOpen(false); }} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Sign out</span>
            </button>
          </div>
        </aside>
      </div>

      <main className="flex-1 pt-16 md:pt-0 md:ml-72">
        {children}
      </main>

      <SignOutModal
        isOpen={showSignOutModal}
        onClose={cancelSignOut}
        onConfirm={confirmSignOut}
      />
    </div>
  );
}
