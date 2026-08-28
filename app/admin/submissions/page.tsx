"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { Download, RefreshCw, Search, Database, Layers, User, Building, Mail, Phone } from "lucide-react";

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
  created_at: string;
};

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [databaseConnected, setDatabaseConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<SubmissionRecord | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedType && selectedType !== "all") params.set("type", selectedType);
      if (search.trim()) params.set("search", search.trim());
      params.set("limit", "100");

      const res = await fetch(`/api/admin/submissions?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.items || []);
        setTotal(data.total || 0);
        setDatabaseConnected(data.databaseConnected ?? false);
      }
    } catch (err) {
      console.error("Error fetching submissions:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedType, search]);

  useEffect(() => {
    startTransition(() => {
      fetchSubmissions();
    });
  }, [fetchSubmissions]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSubmissions();
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "founder-application":
        return <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">Founder Application</span>;
      case "founder-interest":
        return <span className="rounded-md bg-purple-50 px-2 py-1 text-xs font-semibold text-purple-700">Founder Interest</span>;
      case "sponsor-enquiry":
        return <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">Sponsor Enquiry</span>;
      case "general-contact":
        return <span className="rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">General Contact</span>;
      default:
        return <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">{type}</span>;
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="container-px">
        {/* Header Bar */}
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">LaunchPath Backend</span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                  databaseConnected ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                }`}
              >
                <Database className="h-3 w-3" />
                {databaseConnected ? "Neon Postgres Live" : "Postgres Ready (Set DATABASE_URL)"}
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-bold text-navy sm:text-3xl">Submissions & Applications</h1>
            <p className="text-sm text-slate-600">
              Directly persisted database records from applicants, founders, and sponsor partners.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`/api/admin/submissions?format=csv${selectedType !== "all" ? `&type=${selectedType}` : ""}`}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </a>
            <button
              onClick={() => fetchSubmissions()}
              disabled={loading || isPending}
              className="inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-navy/90 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Database notice banner */}
        {!databaseConnected && (
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <div className="flex items-start gap-3">
              <Database className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
              <div>
                <p className="font-semibold">Neon PostgreSQL Connection Ready</p>
                <p className="mt-0.5 text-xs leading-relaxed text-amber-800">
                  To connect your live Neon database on Vercel, set the <code>DATABASE_URL</code> environment variable in your Vercel Project Settings with your Neon PostgreSQL connection string (e.g. <code>postgres://...neon.tech/neondb?sslmode=require</code>). All form submissions are currently logged securely in local buffer.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Records" },
              { id: "founder-application", label: "Applications" },
              { id: "founder-interest", label: "Interest" },
              { id: "sponsor-enquiry", label: "Sponsors" },
              { id: "general-contact", label: "Contact" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  selectedType === tab.id
                    ? "bg-navy text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearchSubmit} className="relative flex max-w-sm items-center">
            <Search className="absolute left-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search name, email, business..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white py-1.5 pr-3 pl-9 text-xs text-slate-800 focus:border-navy focus:outline-none"
            />
          </form>
        </div>

        {/* Submissions Table & Detail View Grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50/75 px-4 py-3 text-xs font-semibold text-slate-500">
              Showing {submissions.length} of {total} records
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                <RefreshCw className="h-6 w-6 animate-spin text-navy" />
                <p className="mt-2 text-xs">Querying database...</p>
              </div>
            ) : submissions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500">
                <Layers className="h-8 w-8 text-slate-300" />
                <p className="mt-2 font-medium text-slate-700">No submissions found</p>
                <p className="text-xs text-slate-400">Form entries will appear here automatically when submitted.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {submissions.map((sub) => {
                  const isSelected = selectedItem?.id === sub.id;
                  return (
                    <div
                      key={sub.id}
                      onClick={() => setSelectedItem(sub)}
                      className={`cursor-pointer p-4 transition hover:bg-slate-50 ${
                        isSelected ? "bg-blue-50/50 border-l-4 border-navy" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-navy text-sm">{sub.full_name}</span>
                            {getTypeBadge(sub.submission_type)}
                          </div>
                          <p className="mt-1 text-xs text-slate-500">{sub.email} {sub.mobile ? `• ${sub.mobile}` : ""}</p>
                          {(sub.business_name || sub.organisation) && (
                            <p className="mt-0.5 text-xs font-medium text-slate-700">
                              {sub.business_name ? `Business: ${sub.business_name}` : `Org: ${sub.organisation}`}
                            </p>
                          )}
                        </div>
                        <div className="text-right text-[11px] text-slate-400">
                          {new Date(sub.created_at).toLocaleDateString("en-ZA", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Detailed Inspector Card */}
          <div className="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            {selectedItem ? (
              <div>
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400">ID #{selectedItem.id}</span>
                      {getTypeBadge(selectedItem.submission_type)}
                    </div>
                    <h2 className="mt-1 text-lg font-bold text-navy">{selectedItem.full_name}</h2>
                    <p className="text-xs text-slate-500">
                      Submitted on {new Date(selectedItem.created_at).toLocaleString("en-ZA")}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <a href={`mailto:${selectedItem.email}`} className="text-navy hover:underline font-medium">
                      {selectedItem.email}
                    </a>
                  </div>
                  {selectedItem.mobile && (
                    <div className="flex items-center gap-2 text-xs text-slate-700">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <a href={`tel:${selectedItem.mobile}`} className="text-navy hover:underline">
                        {selectedItem.mobile}
                      </a>
                    </div>
                  )}
                  {selectedItem.business_name && (
                    <div className="flex items-center gap-2 text-xs text-slate-700">
                      <Building className="h-4 w-4 text-slate-400" />
                      <span>{selectedItem.business_name}</span>
                    </div>
                  )}
                </div>

                {/* Form Data Fields */}
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Complete Response Data</h3>
                  <div className="mt-3 max-h-96 space-y-2.5 overflow-y-auto pr-1 text-xs">
                    {Object.entries(selectedItem.data || {}).map(([key, value]) => {
                      if (["company", "accuracy", "participation", "dataProcessing", "confidentiality", "sponsorReporting", "popiaConsent"].includes(key)) {
                        return null;
                      }
                      return (
                        <div key={key} className="rounded-lg bg-slate-50 p-2.5">
                          <span className="font-semibold text-slate-600 capitalize">
                            {key.replace(/([A-Z])/g, " $1")}:
                          </span>
                          <p className="mt-0.5 text-slate-800 whitespace-pre-wrap leading-relaxed">
                            {String(value)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400">
                <User className="h-10 w-10 text-slate-300" />
                <p className="mt-2 text-xs font-medium text-slate-600">Select a submission to inspect all details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
