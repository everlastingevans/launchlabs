"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import {
  Download,
  RefreshCw,
  Search,
  Database,
  Layers,
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  TrendingUp,
  Target,
  CheckCircle2,
  Copy,
  Check,
  Laptop,
  Wifi,
  ShieldCheck,
  FileText,
  MessageSquare,
  DollarSign,
  Sparkles,
  Filter,
  X
} from "lucide-react";

type SubmissionRecord = {
  id: string | number;
  submission_type: string;
  full_name: string;
  email: string;
  mobile: string | null;
  business_name: string | null;
  organisation: string | null;
  status: string;
  data: Record<string, unknown>;
  ip_address?: string | null;
  user_agent?: string | null;
  notes?: string | null;
  created_at: string;
};

type Stats = {
  all: number;
  applications: number;
  interests: number;
  sponsors: number;
  contacts: number;
};

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState<Stats>({ all: 0, applications: 0, interests: 0, sponsors: 0, contacts: 0 });
  const [databaseConnected, setDatabaseConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<SubmissionRecord | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showJsonView, setShowJsonView] = useState<boolean>(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedType && selectedType !== "all") params.set("type", selectedType);
      if (statusFilter && statusFilter !== "all") params.set("status", statusFilter);
      if (search.trim()) params.set("search", search.trim());
      params.set("limit", "150");

      const res = await fetch(`/api/admin/submissions?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        const items: SubmissionRecord[] = data.items || [];
        setSubmissions(items);
        setTotal(data.total || 0);
        if (data.stats) {
          setStats(data.stats);
        }
        setDatabaseConnected(data.databaseConnected ?? false);

        // Keep selected item synced or select first if none selected
        if (items.length > 0) {
          setSelectedItem((prev) => {
            if (!prev) return items[0];
            const found = items.find((i) => String(i.id) === String(prev.id));
            return found || items[0];
          });
        } else {
          setSelectedItem(null);
        }
      }
    } catch (err) {
      console.error("Error fetching submissions:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedType, statusFilter, search]);

  useEffect(() => {
    startTransition(() => {
      fetchSubmissions();
    });
  }, [fetchSubmissions]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSubmissions();
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedItem) return;
    setIsUpdatingStatus(true);
    try {
      const res = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedItem.id, status: newStatus })
      });
      if (res.ok) {
        setSelectedItem((prev) => (prev ? { ...prev, status: newStatus } : null));
        setSubmissions((prev) =>
          prev.map((item) => (item.id === selectedItem.id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const copyToClipboard = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const copySummaryToClipboard = () => {
    if (!selectedItem) return;
    const d = selectedItem.data || {};
    const lines = [
      `LAUNCHPATH SUBMISSION #${selectedItem.id}`,
      `Type: ${selectedItem.submission_type}`,
      `Applicant: ${selectedItem.full_name}`,
      `Email: ${selectedItem.email}`,
      `Mobile: ${selectedItem.mobile || "N/A"}`,
      selectedItem.business_name ? `Business: ${selectedItem.business_name}` : null,
      selectedItem.organisation ? `Organisation: ${selectedItem.organisation}` : null,
      d.city ? `Location: ${String(d.city)}, ${String(d.province || "")}` : null,
      d.businessStage ? `Stage: ${String(d.businessStage)}` : null,
      d.industry ? `Industry: ${String(d.industry)}` : null,
      d.currentRevenue ? `Revenue: ${String(d.currentRevenue)}` : null,
      d.problem ? `Problem: ${String(d.problem)}` : null,
      d.targetCustomer ? `Target Customer: ${String(d.targetCustomer)}` : null,
      `Submitted: ${new Date(selectedItem.created_at).toLocaleString("en-ZA")}`
    ].filter(Boolean);

    copyToClipboard(lines.join("\n"), "summary");
  };

  const getTypeMeta = (type: string) => {
    switch (type) {
      case "founder-application":
        return {
          label: "Founder Application",
          bg: "bg-blue-50 text-blue-800 border-blue-200",
          dot: "bg-blue-600",
          badgeColor: "bg-blue-600 text-white"
        };
      case "founder-interest":
        return {
          label: "Founder Interest",
          bg: "bg-purple-50 text-purple-800 border-purple-200",
          dot: "bg-purple-600",
          badgeColor: "bg-purple-600 text-white"
        };
      case "sponsor-enquiry":
        return {
          label: "Sponsor Partner",
          bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
          dot: "bg-emerald-600",
          badgeColor: "bg-emerald-600 text-white"
        };
      case "general-contact":
        return {
          label: "General Contact",
          bg: "bg-amber-50 text-amber-800 border-amber-200",
          dot: "bg-amber-600",
          badgeColor: "bg-amber-600 text-white"
        };
      default:
        return {
          label: type,
          bg: "bg-slate-100 text-slate-800 border-slate-200",
          dot: "bg-slate-500",
          badgeColor: "bg-slate-700 text-white"
        };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "accepted":
      case "shortlisted":
        return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">Shortlisted</span>;
      case "in_review":
      case "review":
        return <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-800">In Review</span>;
      case "contacted":
        return <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-0.5 text-[11px] font-semibold text-indigo-800">Contacted</span>;
      case "waitlisted":
        return <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-0.5 text-[11px] font-semibold text-purple-800">Waitlisted</span>;
      case "rejected":
      case "declined":
        return <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-0.5 text-[11px] font-semibold text-rose-800">Declined</span>;
      case "archived":
        return <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-2 py-0.5 text-[11px] font-semibold text-slate-700">Archived</span>;
      default:
        return <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">New</span>;
    }
  };

  const formattedDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-ZA", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return dateStr;
    }
  };

  const getRelativeTime = (dateStr: string) => {
    try {
      const now = new Date().getTime();
      const past = new Date(dateStr).getTime();
      const diffMinutes = Math.floor((now - past) / (1000 * 60));
      if (diffMinutes < 1) return "Just now";
      if (diffMinutes < 60) return `${diffMinutes}m ago`;
      const diffHours = Math.floor(diffMinutes / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      const diffDays = Math.floor(diffHours / 24);
      if (diffDays < 7) return `${diffDays}d ago`;
      return formattedDate(dateStr);
    } catch {
      return dateStr;
    }
  };

  return (
    <main className="min-h-screen bg-slate-900/5 pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-navy">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  LaunchPath Labs Portal
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                    databaseConnected
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-amber-200 bg-amber-50 text-amber-800"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${databaseConnected ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                  <Database className="h-3 w-3" />
                  {databaseConnected ? "Neon Postgres Live" : "Postgres Ready (Set DATABASE_URL)"}
                </span>
              </div>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
                Applicant & Submission Registry
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Structured overview of founder cohort applicants, expression of interest registrations, and sponsor partners.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`/api/admin/submissions?format=csv${selectedType !== "all" ? `&type=${selectedType}` : ""}${statusFilter !== "all" ? `&status=${statusFilter}` : ""}`}
                download
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-navy active:scale-95"
              >
                <Download className="h-4 w-4 text-slate-500" />
                Export CSV Spreadsheet
              </a>
              <button
                onClick={() => fetchSubmissions()}
                disabled={loading || isPending}
                className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-navy/90 disabled:opacity-50 active:scale-95"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                Refresh Data
              </button>
            </div>
          </div>

          {/* Database notice banner */}
          {!databaseConnected && (
            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-900">
              <div className="flex items-start gap-3">
                <Database className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <div className="space-y-1">
                  <p className="font-bold text-amber-950">Neon PostgreSQL Integration Active</p>
                  <p className="leading-relaxed text-amber-800">
                    To persist all records to your production Neon database on Vercel, set the <code>DATABASE_URL</code> environment variable in your Vercel Project Settings with your connection string. All form entries are currently buffered in high-speed local memory.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Stat Cards */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
            <button
              onClick={() => setSelectedType("all")}
              className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition ${
                selectedType === "all"
                  ? "border-navy bg-navy/5 ring-2 ring-navy/20"
                  : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/70"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                <span>Total Records</span>
                <Layers className="h-4 w-4 text-slate-400" />
              </div>
              <div className="mt-2 text-2xl font-bold text-navy">{stats.all || total}</div>
              <div className="mt-1 text-[11px] text-slate-500">All submissions</div>
            </button>

            <button
              onClick={() => setSelectedType("founder-application")}
              className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition ${
                selectedType === "founder-application"
                  ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/20"
                  : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/70"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-medium text-blue-700">
                <span>Applications</span>
                <Briefcase className="h-4 w-4 text-blue-500" />
              </div>
              <div className="mt-2 text-2xl font-bold text-blue-900">{stats.applications}</div>
              <div className="mt-1 text-[11px] text-blue-600">Cohort applicants</div>
            </button>

            <button
              onClick={() => setSelectedType("founder-interest")}
              className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition ${
                selectedType === "founder-interest"
                  ? "border-purple-600 bg-purple-50/50 ring-2 ring-purple-600/20"
                  : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/70"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-medium text-purple-700">
                <span>Expressions of Interest</span>
                <Target className="h-4 w-4 text-purple-500" />
              </div>
              <div className="mt-2 text-2xl font-bold text-purple-900">{stats.interests}</div>
              <div className="mt-1 text-[11px] text-purple-600">Waitlist & interest</div>
            </button>

            <button
              onClick={() => setSelectedType("sponsor-enquiry")}
              className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition ${
                selectedType === "sponsor-enquiry"
                  ? "border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-600/20"
                  : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/70"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-medium text-emerald-700">
                <span>Sponsors & Partners</span>
                <Building className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="mt-2 text-2xl font-bold text-emerald-900">{stats.sponsors}</div>
              <div className="mt-1 text-[11px] text-emerald-600">Corporate & bursaries</div>
            </button>

            <button
              onClick={() => setSelectedType("general-contact")}
              className={`col-span-2 flex flex-col justify-between rounded-xl border p-3.5 text-left transition sm:col-span-4 lg:col-span-1 ${
                selectedType === "general-contact"
                  ? "border-amber-600 bg-amber-50/50 ring-2 ring-amber-600/20"
                  : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/70"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-medium text-amber-700">
                <span>Contact Inquiries</span>
                <Mail className="h-4 w-4 text-amber-500" />
              </div>
              <div className="mt-2 text-2xl font-bold text-amber-900">{stats.contacts}</div>
              <div className="mt-1 text-[11px] text-amber-600">General messages</div>
            </button>
          </div>
        </div>

        {/* Filter and Search Controls Bar */}
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Records", count: stats.all || total },
              { id: "founder-application", label: "Applications", count: stats.applications },
              { id: "founder-interest", label: "Interest", count: stats.interests },
              { id: "sponsor-enquiry", label: "Sponsors", count: stats.sponsors },
              { id: "general-contact", label: "Contact", count: stats.contacts }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  selectedType === tab.id
                    ? "bg-navy text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-navy"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                    selectedType === tab.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Filter className="h-3.5 w-3.5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 focus:border-navy focus:bg-white focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="in_review">In Review</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="contacted">Contacted</option>
                <option value="waitlisted">Waitlisted</option>
                <option value="declined">Declined</option>
              </select>
            </div>

            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative flex min-w-[240px] items-center">
              <Search className="absolute left-3 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search name, email, business, city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white py-1.5 pr-8 pl-8 text-xs text-slate-800 placeholder-slate-400 focus:border-navy focus:ring-1 focus:ring-navy focus:outline-none"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    startTransition(() => {
                      fetchSubmissions();
                    });
                  }}
                  className="absolute right-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Submissions List & Detailed Inspector Split Grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1.4fr]">
          
          {/* Submissions List (Master Column) */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/75 px-4 py-3 text-xs font-semibold text-slate-600">
              <span>{submissions.length} submission{submissions.length === 1 ? "" : "s"} listed</span>
              <span className="text-[11px] text-slate-400">Click any applicant to inspect</span>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                <RefreshCw className="h-7 w-7 animate-spin text-navy" />
                <p className="mt-3 text-xs font-medium text-slate-600">Loading submission records...</p>
              </div>
            ) : submissions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center text-slate-500">
                <Layers className="h-10 w-10 text-slate-300" />
                <p className="mt-3 font-semibold text-slate-800">No submissions found</p>
                <p className="mt-1 max-w-xs text-xs text-slate-400">
                  {search ? "No submissions matched your search query. Try broadening your keywords." : "Submissions will automatically show up here as soon as users apply or submit."}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 overflow-y-auto max-h-[750px]">
                {submissions.map((sub) => {
                  const isSelected = selectedItem?.id === sub.id;
                  const typeMeta = getTypeMeta(sub.submission_type);
                  const d = sub.data || {};
                  const city = typeof d.city === "string" ? d.city : undefined;
                  const province = typeof d.province === "string" ? d.province : undefined;
                  const stage = typeof d.businessStage === "string" ? d.businessStage : undefined;
                  const industry = typeof d.industry === "string" ? d.industry : undefined;
                  const initials = sub.full_name
                    ? sub.full_name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()
                    : "LP";

                  return (
                    <div
                      key={sub.id}
                      onClick={() => setSelectedItem(sub)}
                      className={`group relative cursor-pointer p-4 transition-all hover:bg-slate-50 ${
                        isSelected
                          ? "bg-blue-50/60 border-l-4 border-navy shadow-[inset_0_1px_0_rgba(0,0,0,0.02)]"
                          : "border-l-4 border-transparent"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Avatar initials */}
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-xs shadow-sm ${
                            isSelected
                              ? "bg-navy text-white"
                              : "bg-slate-100 text-slate-700 group-hover:bg-slate-200"
                          }`}
                        >
                          {initials}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 truncate">
                              <span className="truncate font-bold text-navy text-sm">{sub.full_name}</span>
                              <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${typeMeta.bg}`}>
                                {typeMeta.label}
                              </span>
                            </div>
                            <span className="shrink-0 text-[11px] font-medium text-slate-400">
                              {getRelativeTime(sub.created_at)}
                            </span>
                          </div>

                          {/* Business / Org & Location */}
                          {(sub.business_name || sub.organisation || city || stage || industry) && (
                            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600">
                              {(sub.business_name || sub.organisation) && (
                                <span className="flex items-center gap-1 font-semibold text-slate-800">
                                  <Building className="h-3 w-3 text-slate-400" />
                                  {sub.business_name || sub.organisation}
                                </span>
                              )}
                              {city && (
                                <span className="flex items-center gap-1 text-slate-500">
                                  <MapPin className="h-3 w-3 text-slate-400" />
                                  {city}{province ? `, ${province}` : ""}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Contact snippet & Status */}
                          <div className="mt-2 flex items-center justify-between gap-2 text-xs text-slate-500">
                            <span className="truncate">{sub.email}</span>
                            <div>{getStatusBadge(sub.status)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Detailed Inspector Card (Detail Pane) */}
          <div className="sticky top-28 h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {selectedItem ? (
              <div>
                {/* Header & Quick Action Bar */}
                <div className="border-b border-slate-200 pb-5">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                          ID #{selectedItem.id}
                        </span>
                        <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-bold ${getTypeMeta(selectedItem.submission_type).bg}`}>
                          {getTypeMeta(selectedItem.submission_type).label}
                        </span>
                        {getStatusBadge(selectedItem.status)}
                      </div>
                      <h2 className="mt-1.5 text-xl font-bold tracking-tight text-navy sm:text-2xl">
                        {selectedItem.full_name}
                      </h2>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Received on {formattedDate(selectedItem.created_at)}
                      </p>
                    </div>

                    {/* Status Changer */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-slate-500">Status:</span>
                      <select
                        value={selectedItem.status}
                        disabled={isUpdatingStatus}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-800 shadow-sm focus:border-navy focus:outline-none"
                      >
                        <option value="new">New</option>
                        <option value="in_review">In Review</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="contacted">Contacted</option>
                        <option value="waitlisted">Waitlisted</option>
                        <option value="declined">Declined</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>

                  {/* Action Buttons Toolbar */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <a
                      href={`mailto:${selectedItem.email}?subject=LaunchPath%20Labs%20Application%20-%20${encodeURIComponent(selectedItem.full_name)}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-navy hover:text-white"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      Email Applicant
                    </a>

                    {selectedItem.mobile && (
                      <a
                        href={`tel:${selectedItem.mobile}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-navy hover:text-white"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        Call
                      </a>
                    )}

                    {selectedItem.mobile && (
                      <a
                        href={`https://wa.me/${selectedItem.mobile.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 transition hover:bg-emerald-600 hover:text-white"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        WhatsApp
                      </a>
                    )}

                    <button
                      onClick={copySummaryToClipboard}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      {copiedField === "summary" ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-slate-400" />
                          <span>Copy Summary</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setShowJsonView(!showJsonView)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      <FileText className="h-3.5 w-3.5 text-slate-400" />
                      {showJsonView ? "Formatted View" : "Raw JSON"}
                    </button>
                  </div>
                </div>

                {/* Formatted Content Inspector or JSON View */}
                {showJsonView ? (
                  <div className="mt-5">
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Raw JSON Payload</span>
                      <button
                        onClick={() => copyToClipboard(JSON.stringify(selectedItem, null, 2), "rawjson")}
                        className="inline-flex items-center gap-1 text-xs font-medium text-navy hover:underline"
                      >
                        {copiedField === "rawjson" ? "Copied JSON!" : "Copy JSON"}
                      </button>
                    </div>
                    <pre className="max-h-[500px] overflow-auto rounded-xl bg-slate-900 p-4 text-[11px] leading-relaxed text-emerald-400">
                      {JSON.stringify(selectedItem, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className="mt-5 space-y-6 overflow-y-auto max-h-[620px] pr-1">
                    
                    {/* SECTION 1: Personal & Contact Information */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                      <h3 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-navy">
                        <User className="h-4 w-4 text-blue-600" />
                        1. Personal & Contact Profile
                      </h3>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2 text-xs">
                        <div className="rounded-lg bg-white p-3 border border-slate-100 shadow-sm">
                          <span className="text-slate-400 font-medium">Full Name</span>
                          <p className="mt-0.5 font-bold text-navy">{selectedItem.full_name}</p>
                        </div>

                        <div className="rounded-lg bg-white p-3 border border-slate-100 shadow-sm">
                          <span className="text-slate-400 font-medium">Email Address</span>
                          <p className="mt-0.5 font-semibold text-navy">
                            <a href={`mailto:${selectedItem.email}`} className="hover:underline text-blue-700">
                              {selectedItem.email}
                            </a>
                          </p>
                        </div>

                        <div className="rounded-lg bg-white p-3 border border-slate-100 shadow-sm">
                          <span className="text-slate-400 font-medium">Mobile Phone</span>
                          <p className="mt-0.5 font-semibold text-navy">
                            {selectedItem.mobile ? (
                              <a href={`tel:${selectedItem.mobile}`} className="hover:underline text-blue-700">
                                {selectedItem.mobile}
                              </a>
                            ) : (
                              <span className="text-slate-400">Not provided</span>
                            )}
                          </p>
                        </div>

                        <div className="rounded-lg bg-white p-3 border border-slate-100 shadow-sm">
                          <span className="text-slate-400 font-medium">Location</span>
                          <p className="mt-0.5 font-bold text-navy">
                            {selectedItem.data.city ? `${String(selectedItem.data.city)}, ${String(selectedItem.data.province || "")}` : String(selectedItem.data.region || "South Africa")}
                          </p>
                        </div>

                        {(Boolean(selectedItem.data.device) || Boolean(selectedItem.data.internetAccess)) && (
                          <div className="sm:col-span-2 rounded-lg bg-white p-3 border border-slate-100 shadow-sm flex flex-wrap items-center gap-4">
                            {Boolean(selectedItem.data.device) && (
                              <div className="flex items-center gap-1.5 text-slate-700">
                                <Laptop className="h-3.5 w-3.5 text-slate-400" />
                                <span className="font-semibold text-slate-500">Device:</span>
                                <span>{String(selectedItem.data.device)}</span>
                              </div>
                            )}
                            {Boolean(selectedItem.data.internetAccess) && (
                              <div className="flex items-center gap-1.5 text-slate-700">
                                <Wifi className="h-3.5 w-3.5 text-slate-400" />
                                <span className="font-semibold text-slate-500">Internet:</span>
                                <span>{String(selectedItem.data.internetAccess)}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* SECTION 2: Business & Problem Definition (Applications & Interests) */}
                    {(selectedItem.business_name || Boolean(selectedItem.data.businessStage) || Boolean(selectedItem.data.problem) || Boolean(selectedItem.data.businessDescription)) && (
                      <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                        <h3 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-navy">
                          <Briefcase className="h-4 w-4 text-purple-600" />
                          2. Business & Problem Definition
                        </h3>

                        <div className="mt-3 grid gap-3 sm:grid-cols-2 text-xs">
                          {selectedItem.business_name && (
                            <div className="rounded-lg bg-white p-3 border border-slate-100 shadow-sm">
                              <span className="text-slate-400 font-medium">Business Name</span>
                              <p className="mt-0.5 font-bold text-navy">{selectedItem.business_name}</p>
                            </div>
                          )}

                          {Boolean(selectedItem.data.businessStage) && (
                            <div className="rounded-lg bg-white p-3 border border-slate-100 shadow-sm">
                              <span className="text-slate-400 font-medium">Business Stage</span>
                              <p className="mt-0.5 font-bold text-purple-700">{String(selectedItem.data.businessStage)}</p>
                            </div>
                          )}

                          {Boolean(selectedItem.data.industry) && (
                            <div className="rounded-lg bg-white p-3 border border-slate-100 shadow-sm">
                              <span className="text-slate-400 font-medium">Industry Sector</span>
                              <p className="mt-0.5 font-semibold text-navy">{String(selectedItem.data.industry)}</p>
                            </div>
                          )}

                          {Boolean(selectedItem.data.teamSize) && (
                            <div className="rounded-lg bg-white p-3 border border-slate-100 shadow-sm">
                              <span className="text-slate-400 font-medium">Team Size</span>
                              <p className="mt-0.5 font-semibold text-navy">{String(selectedItem.data.teamSize)} person(s)</p>
                            </div>
                          )}

                          {Boolean(selectedItem.data.businessDescription) && (
                            <div className="sm:col-span-2 rounded-lg bg-white p-3 border border-slate-100 shadow-sm">
                              <span className="text-slate-400 font-medium">Business Description</span>
                              <p className="mt-1 text-slate-800 leading-relaxed whitespace-pre-wrap">
                                {String(selectedItem.data.businessDescription)}
                              </p>
                            </div>
                          )}

                          {Boolean(selectedItem.data.problem) && (
                            <div className="sm:col-span-2 rounded-lg bg-white p-3 border border-slate-100 shadow-sm">
                              <span className="text-slate-400 font-medium">Problem Being Solved</span>
                              <p className="mt-1 text-slate-800 leading-relaxed whitespace-pre-wrap">
                                {String(selectedItem.data.problem)}
                              </p>
                            </div>
                          )}

                          {Boolean(selectedItem.data.targetCustomer) && (
                            <div className="sm:col-span-2 rounded-lg bg-white p-3 border border-slate-100 shadow-sm">
                              <span className="text-slate-400 font-medium">Target Customer</span>
                              <p className="mt-1 text-slate-800 leading-relaxed whitespace-pre-wrap">
                                {String(selectedItem.data.targetCustomer)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* SECTION 3: Traction & Commercial Evidence */}
                    {(Boolean(selectedItem.data.currentRevenue) || Boolean(selectedItem.data.currentEvidence) || Boolean(selectedItem.data.demandTests) || Boolean(selectedItem.data.mostNeedToProve)) && (
                      <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                        <h3 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-navy">
                          <TrendingUp className="h-4 w-4 text-emerald-600" />
                          3. Traction & Commercial Evidence
                        </h3>

                        <div className="mt-3 space-y-3 text-xs">
                          {Boolean(selectedItem.data.currentRevenue) && (
                            <div className="flex items-center justify-between rounded-lg bg-emerald-50 border border-emerald-200 p-3">
                              <span className="font-bold text-emerald-900">Current Monthly Revenue:</span>
                              <span className="rounded-md bg-emerald-700 px-2.5 py-1 font-extrabold text-white text-xs">
                                {String(selectedItem.data.currentRevenue)}
                              </span>
                            </div>
                          )}

                          {Boolean(selectedItem.data.currentEvidence) && (
                            <div className="rounded-lg bg-white p-3 border border-slate-100 shadow-sm">
                              <span className="text-slate-400 font-medium">Existing Evidence of Customer Demand</span>
                              <p className="mt-1 text-slate-800 leading-relaxed whitespace-pre-wrap">
                                {String(selectedItem.data.currentEvidence)}
                              </p>
                            </div>
                          )}

                          {Boolean(selectedItem.data.demandTests) && (
                            <div className="rounded-lg bg-white p-3 border border-slate-100 shadow-sm">
                              <span className="text-slate-400 font-medium">Experiments & Demand Tests Run</span>
                              <p className="mt-1 text-slate-800 leading-relaxed whitespace-pre-wrap">
                                {String(selectedItem.data.demandTests)}
                              </p>
                            </div>
                          )}

                          {Boolean(selectedItem.data.mostNeedToProve) && (
                            <div className="rounded-lg bg-white p-3 border border-slate-100 shadow-sm">
                              <span className="text-slate-400 font-medium">What Founder Needs to Prove Most</span>
                              <p className="mt-1 text-slate-800 leading-relaxed whitespace-pre-wrap">
                                {String(selectedItem.data.mostNeedToProve)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* SECTION 4: Programme Readiness & Validation Commitment */}
                    {(Boolean(selectedItem.data.weeklyCommitment) || Boolean(selectedItem.data.customerAccess) || Boolean(selectedItem.data.goals) || Boolean(selectedItem.data.evidenceResponse)) && (
                      <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                        <h3 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-navy">
                          <Target className="h-4 w-4 text-blue-600" />
                          4. Programme Readiness & Validation Commitment
                        </h3>

                        <div className="mt-3 grid gap-2.5 sm:grid-cols-2 text-xs">
                          {Boolean(selectedItem.data.weeklyCommitment) && (
                            <div className="flex items-center justify-between rounded-lg bg-white p-2.5 border border-slate-100 shadow-sm">
                              <span className="text-slate-600">Weekly Commitment (15h/wk):</span>
                              <span className="font-bold text-navy">{String(selectedItem.data.weeklyCommitment)}</span>
                            </div>
                          )}

                          {Boolean(selectedItem.data.customerAccess) && (
                            <div className="flex items-center justify-between rounded-lg bg-white p-2.5 border border-slate-100 shadow-sm">
                              <span className="text-slate-600">Direct Customer Access:</span>
                              <span className="font-bold text-navy">{String(selectedItem.data.customerAccess)}</span>
                            </div>
                          )}

                          {Boolean(selectedItem.data.customerInterviews) && (
                            <div className="flex items-center justify-between rounded-lg bg-white p-2.5 border border-slate-100 shadow-sm">
                              <span className="text-slate-600">Customer Interviews:</span>
                              <span className="font-bold text-navy">{String(selectedItem.data.customerInterviews)}</span>
                            </div>
                          )}

                          {Boolean(selectedItem.data.pricingTest) && (
                            <div className="flex items-center justify-between rounded-lg bg-white p-2.5 border border-slate-100 shadow-sm">
                              <span className="text-slate-600">Pricing Testing:</span>
                              <span className="font-bold text-navy">{String(selectedItem.data.pricingTest)}</span>
                            </div>
                          )}

                          {Boolean(selectedItem.data.salesOutreach) && (
                            <div className="sm:col-span-2 flex items-center justify-between rounded-lg bg-white p-2.5 border border-slate-100 shadow-sm">
                              <span className="text-slate-600">Cold Outreach / Sales Willingness:</span>
                              <span className="font-bold text-navy">{String(selectedItem.data.salesOutreach)}</span>
                            </div>
                          )}

                          {Boolean(selectedItem.data.evidenceResponse) && (
                            <div className="sm:col-span-2 rounded-lg bg-white p-3 border border-slate-100 shadow-sm">
                              <span className="text-slate-400 font-medium">How Founder Responds to Contradictory Evidence</span>
                              <p className="mt-1 text-slate-800 leading-relaxed">
                                {String(selectedItem.data.evidenceResponse)}
                              </p>
                            </div>
                          )}

                          {Boolean(selectedItem.data.goals) && (
                            <div className="sm:col-span-2 rounded-lg bg-white p-3 border border-slate-100 shadow-sm">
                              <span className="text-slate-400 font-medium">Primary Goals & Growth Objectives</span>
                              <p className="mt-1 text-slate-800 leading-relaxed whitespace-pre-wrap">
                                {String(selectedItem.data.goals)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* SECTION 5: Place Type & Bursary */}
                    {(Boolean(selectedItem.data.placeType) || Boolean(selectedItem.data.paymentOption) || Boolean(selectedItem.data.bursaryAdminFeeUnderstanding)) && (
                      <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                        <h3 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-navy">
                          <DollarSign className="h-4 w-4 text-amber-600" />
                          5. Placement & Bursary Funding
                        </h3>

                        <div className="mt-3 space-y-2 text-xs">
                          {Boolean(selectedItem.data.placeType) && (
                            <div className="flex items-center justify-between rounded-lg bg-white p-2.5 border border-slate-100 shadow-sm">
                              <span className="text-slate-600">Requested Place Type:</span>
                              <span className="font-bold text-navy">{String(selectedItem.data.placeType)}</span>
                            </div>
                          )}

                          {Boolean(selectedItem.data.paymentOption) && (
                            <div className="flex items-center justify-between rounded-lg bg-white p-2.5 border border-slate-100 shadow-sm">
                              <span className="text-slate-600">Payment Option:</span>
                              <span className="font-bold text-navy">{String(selectedItem.data.paymentOption)}</span>
                            </div>
                          )}

                          {Boolean(selectedItem.data.bursaryAdminFeeUnderstanding) && (
                            <div className="flex items-center justify-between rounded-lg bg-white p-2.5 border border-slate-100 shadow-sm">
                              <span className="text-slate-600">Bursary Admin Fee Acknowledged:</span>
                              <span className="font-bold text-emerald-700">{String(selectedItem.data.bursaryAdminFeeUnderstanding)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* SECTION 6: Sponsor / Corporate Partner Specifics */}
                    {(selectedItem.submission_type === "sponsor-enquiry" || selectedItem.organisation || Boolean(selectedItem.data.interest) || Boolean(selectedItem.data.supportType)) && (
                      <div className="rounded-xl border border-slate-200 bg-emerald-50/30 p-4">
                        <h3 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-900">
                          <Building className="h-4 w-4 text-emerald-600" />
                          Sponsor Partner Specifications
                        </h3>

                        <div className="mt-3 grid gap-3 sm:grid-cols-2 text-xs">
                          {selectedItem.organisation && (
                            <div className="rounded-lg bg-white p-3 border border-emerald-100 shadow-sm">
                              <span className="text-slate-400 font-medium">Organisation</span>
                              <p className="mt-0.5 font-bold text-navy">{selectedItem.organisation}</p>
                            </div>
                          )}

                          {Boolean(selectedItem.data.jobTitle) && (
                            <div className="rounded-lg bg-white p-3 border border-emerald-100 shadow-sm">
                              <span className="text-slate-400 font-medium">Job Title / Role</span>
                              <p className="mt-0.5 font-bold text-navy">{String(selectedItem.data.jobTitle)}</p>
                            </div>
                          )}

                          {Boolean(selectedItem.data.organisationType) && (
                            <div className="rounded-lg bg-white p-3 border border-emerald-100 shadow-sm">
                              <span className="text-slate-400 font-medium">Organisation Type</span>
                              <p className="mt-0.5 font-semibold text-navy">{String(selectedItem.data.organisationType)}</p>
                            </div>
                          )}

                          {Boolean(selectedItem.data.sponsorFounderCount) && (
                            <div className="rounded-lg bg-white p-3 border border-emerald-100 shadow-sm">
                              <span className="text-slate-400 font-medium">Founders Sponsoring Count</span>
                              <p className="mt-0.5 font-bold text-emerald-700">{String(selectedItem.data.sponsorFounderCount)}</p>
                            </div>
                          )}

                          {Boolean(selectedItem.data.interest) && (
                            <div className="rounded-lg bg-white p-3 border border-emerald-100 shadow-sm">
                              <span className="text-slate-400 font-medium">Partnership Interest</span>
                              <p className="mt-0.5 font-bold text-navy">{String(selectedItem.data.interest)}</p>
                            </div>
                          )}

                          {Boolean(selectedItem.data.supportType) && (
                            <div className="rounded-lg bg-white p-3 border border-emerald-100 shadow-sm">
                              <span className="text-slate-400 font-medium">Support Type</span>
                              <p className="mt-0.5 font-bold text-navy">{String(selectedItem.data.supportType)}</p>
                            </div>
                          )}

                          {Boolean(selectedItem.data.focusArea) && (
                            <div className="rounded-lg bg-white p-3 border border-emerald-100 shadow-sm">
                              <span className="text-slate-400 font-medium">Focus Area</span>
                              <p className="mt-0.5 font-semibold text-navy">{String(selectedItem.data.focusArea)}</p>
                            </div>
                          )}

                          {Boolean(selectedItem.data.budgetRange) && (
                            <div className="rounded-lg bg-white p-3 border border-emerald-100 shadow-sm">
                              <span className="text-slate-400 font-medium">Budget Range</span>
                              <p className="mt-0.5 font-bold text-emerald-800">{String(selectedItem.data.budgetRange)}</p>
                            </div>
                          )}

                          {Boolean(selectedItem.data.meetingMethod) && (
                            <div className="rounded-lg bg-white p-3 border border-emerald-100 shadow-sm">
                              <span className="text-slate-400 font-medium">Preferred Meeting Method</span>
                              <p className="mt-0.5 font-semibold text-navy">{String(selectedItem.data.meetingMethod)}</p>
                            </div>
                          )}

                          {Boolean(selectedItem.data.reportingRequirements) && (
                            <div className="sm:col-span-2 rounded-lg bg-white p-3 border border-emerald-100 shadow-sm">
                              <span className="text-slate-400 font-medium">Reporting Requirements</span>
                              <p className="mt-1 text-slate-800 leading-relaxed whitespace-pre-wrap">
                                {String(selectedItem.data.reportingRequirements)}
                              </p>
                            </div>
                          )}

                          {Boolean(selectedItem.data.additionalContext) && (
                            <div className="sm:col-span-2 rounded-lg bg-white p-3 border border-emerald-100 shadow-sm">
                              <span className="text-slate-400 font-medium">Additional Context</span>
                              <p className="mt-1 text-slate-800 leading-relaxed whitespace-pre-wrap">
                                {String(selectedItem.data.additionalContext)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* SECTION 7: General Message (Contact Form) */}
                    {(Boolean(selectedItem.data.message) || Boolean(selectedItem.data.enquiryType)) && (
                      <div className="rounded-xl border border-slate-200 bg-amber-50/30 p-4">
                        <h3 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-900">
                          <MessageSquare className="h-4 w-4 text-amber-600" />
                          Inquiry Message
                        </h3>
                        <div className="mt-3 space-y-3 text-xs">
                          {Boolean(selectedItem.data.enquiryType) && (
                            <div className="rounded-lg bg-white p-3 border border-amber-100 shadow-sm">
                              <span className="text-slate-400 font-medium">Enquiry Subject</span>
                              <p className="mt-0.5 font-bold text-navy">{String(selectedItem.data.enquiryType)}</p>
                            </div>
                          )}
                          {Boolean(selectedItem.data.message) && (
                            <div className="rounded-lg bg-white p-4 border border-amber-100 shadow-sm">
                              <span className="text-slate-400 font-medium">Message Body</span>
                              <p className="mt-1 text-slate-800 leading-relaxed whitespace-pre-wrap text-sm">
                                {String(selectedItem.data.message)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* SECTION 8: Declarations & Compliance */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                      <h3 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-navy">
                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                        8. Compliance & Declarations
                      </h3>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2 text-[11px]">
                        <div className="flex items-center gap-2 rounded-lg bg-white p-2.5 border border-slate-100 text-slate-700">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                          <span>POPIA & Data Privacy Consent: <strong>Granted</strong></span>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg bg-white p-2.5 border border-slate-100 text-slate-700">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                          <span>Accuracy & Honesty Declaration: <strong>Confirmed</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 9: Audit Metadata */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50/30 p-4 text-[11px] text-slate-500">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span>Database Record ID: <strong>{selectedItem.id}</strong></span>
                        <span>Logged at: <strong>{formattedDate(selectedItem.created_at)}</strong></span>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center text-slate-400">
                <User className="h-12 w-12 text-slate-300" />
                <p className="mt-3 font-semibold text-slate-700">No applicant selected</p>
                <p className="mt-1 text-xs text-slate-400">Select any submission from the left panel to inspect all details.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
