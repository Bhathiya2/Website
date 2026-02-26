import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { motion } from "framer-motion";
import { Folder, MessageCircle, Mail } from "lucide-react";
import { getProjects } from "../api/ProjectApi";
import { getFeedbacks } from "../api/FeedbackApi";
import { getLogos } from "../api/LogoApi";
import { getContacts } from "../api/ContactApi";

export default function Dashboard() {
  const [projectsCount, setProjectsCount] = useState(null);
  const [feedbackCount, setFeedbackCount] = useState(null);
  const [recent, setRecent] = useState([]);
  const [logosCount, setLogosCount] = useState(null);
  const [contactsCount, setContactsCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");

    Promise.all([
      getProjects().then((res) => res.data || []),
      getFeedbacks(),
      getLogos(),
      getContacts(),
    ])
      .then(([projects, feedbacks, logos, contacts]) => {
        if (!mounted) return;
        setProjectsCount(projects.length);
        setFeedbackCount(Array.isArray(feedbacks) ? feedbacks.length : 0);
        setRecent(projects.slice(0, 3));
        setLogosCount(Array.isArray(logos) ? logos.length : (logos?.data?.length || 0));
        setContactsCount(Array.isArray(contacts) ? contacts.length : (contacts?.data?.length || 0));
      })
      .catch((err) => {
        console.error(err);
        if (!mounted) return;
        setError(err?.message || 'Failed to load dashboard data');
      })
      .finally(() => { if (mounted) setLoading(false); });

    return () => { mounted = false };
  }, []);
  return (
    <AdminLayout>
      <div className="p-8">
        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-black mb-6">Admin Dashboard</motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-accent/20 border border-cyan-600">
            <div className="text-sm text-zinc-100 uppercase tracking-widest mb-2">Projects</div>
            <div className="text-2xl font-bold">{loading ? '—' : (projectsCount ?? '—')}</div>
            <p className="text-sm text-zinc-400 mt-3">Manage and review project entries.</p>
          </div>

          <div className="p-6 rounded-2xl bg-accent/20 border border-cyan-600">
            <div className="text-sm text-zinc-100 uppercase tracking-widest mb-2">Feedbacks</div>
            <div className="text-2xl font-bold">{loading ? '—' : (feedbackCount ?? '—')}</div>
            <p className="text-sm text-zinc-400 mt-3">User feedback and ratings.</p>
          </div>

          <div className="p-6 rounded-2xl bg-accent/20 border border-cyan-600">
            <div className="text-sm text-zinc-100 uppercase tracking-widest mb-2">Contact Messages</div>
            <div className="text-2xl font-bold">{loading ? '—' : (contactsCount ?? '—')}</div>
            <p className="text-sm text-zinc-400 mt-3">Incoming contact inquiries.</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-accent/20 border border-cyan-600">
            <div className="text-sm text-zinc-100 uppercase tracking-widest mb-2">Logos</div>
            <div className="text-2xl font-bold">{loading ? '—' : (logosCount ?? '—')}</div>
            <p className="text-sm text-zinc-400 mt-3">Company logos</p>
          </div>
        </div>
        {error && <div className="mt-4 text-sm text-red-400">{error}</div>}
      </div>
    </AdminLayout>
  );
}
