import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminApi, getAdminToken } from "../../lib/adminApi";
import AdminLayout from "../../components/admin/AdminLayout";
import { 
  Award, BookOpen, Star, Users, TrendingUp, Calendar, 
  ChevronRight, FileText, Settings, BarChart3, 
  Clock, CheckCircle, XCircle, ExternalLink 
} from "lucide-react";

function StatCard({ label, value, icon, accent, subtitle }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-6 group">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-2xl md:text-3xl font-sora font-extrabold text-gray-900 leading-tight">
            {value}
          </div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1">
            {label}
          </div>
          {subtitle && (
            <div className="text-[10px] text-gray-400 mt-0.5">{subtitle}</div>
          )}
        </div>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${accent}15`, color: accent }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function QuickAction({ title, description, icon, link, color }) {
  return (
    <Link
      to={link}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${color}15`, color }}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-sm group-hover:text-[#7B1C1C] transition-colors">
            {title}
          </h3>
          <p className="text-gray-500 text-xs mt-1">{description}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#7B1C1C] group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}

function ActivityItem({ certificate }) {
  return (
    <Link
      to={`/admin/certificates/${certificate.id}/preview`}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-[#7B1C1C]/20 hover:bg-[#7B1C1C]/5 transition-all duration-300 group"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-full bg-[#7B1C1C]/10 flex items-center justify-center shrink-0">
          <Award className="w-4 h-4 text-[#7B1C1C]" />
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-gray-800 text-sm truncate group-hover:text-[#7B1C1C] transition-colors">
            {certificate.fullName}
          </div>
          <div className="text-xs text-gray-400 font-mono">
            {certificate.certificateNumber}
          </div>
        </div>
      </div>
      <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-[#7B1C1C] transition-colors shrink-0" />
    </Link>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const hasToken = useMemo(() => !!getAdminToken(), []);

  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!hasToken) {
      navigate("/admin/login", { replace: true });
      return;
    }

    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const [coursesRes, statsRes] = await Promise.all([
          adminApi.get("/api/admin/courses"),
          adminApi.get("/api/admin/certificates/stats"),
        ]);
        setCourses(coursesRes.data || []);
        setStats(statsRes.data || null);
      } catch (e) {
        setErr(e?.response?.data?.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    })();
  }, [hasToken, navigate]);

  const statsCards = [
    {
      label: "Total Certificates",
      value: stats ? stats.totalcertificates : "—",
      icon: <Award className="w-6 h-6" />,
      accent: "#7B1C1C",
      subtitle: "Issued to students",
    },
    {
      label: "Active Courses",
      value: stats ? stats.totalCourses : "—",
      icon: <BookOpen className="w-6 h-6" />,
      accent: "#B8860B",
      subtitle: "Available for enrollment",
    },
    {
      label: "Courses with Certificates",
      value: stats ? stats.distinctCoursesWithcertificates : "—",
      icon: <Star className="w-6 h-6" />,
      accent: "#2563EB",
      subtitle: "Active programs",
    },
  ];

  const quickActions = [
    {
      title: "Manage Certificates",
      description: "Search, edit, upload photos and delete issued certificates",
      icon: <FileText className="w-6 h-6" />,
      link: "/admin/certificates",
      color: "#7B1C1C",
    },
    {
      title: "Course Modules",
      description: "Create, update or delete course modules",
      icon: <Settings className="w-6 h-6" />,
      link: "/admin/courses",
      color: "#B8860B",
    },
    {
      title: "Analytics",
      description: "View course performance and student engagement",
      icon: <BarChart3 className="w-6 h-6" />,
      link: "/admin/analytics",
      color: "#2563EB",
    },
  ];

  return (
    <AdminLayout 
      title="Dashboard" 
      subtitle="Overview of courses & issued certificates"
    >
      {err && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-700 font-semibold">Error</p>
            <p className="text-red-600 text-sm">{err}</p>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <StatCard
            key={index}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            accent={stat.accent}
            subtitle={stat.subtitle}
          />
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="font-sora font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#7B1C1C]" />
            Quick Actions
          </h2>
          <div className="space-y-4">
            {quickActions.map((action, index) => (
              <QuickAction
                key={index}
                title={action.title}
                description={action.description}
                icon={action.icon}
                link={action.link}
                color={action.color}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-sora font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#7B1C1C]" />
            Recent Activity
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            {stats?.recent?.length > 0 ? (
              <div className="space-y-2">
                {stats.recent.slice(0, 5).map((c) => (
                  <ActivityItem key={c.id} certificate={c} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">No recent certificates</p>
                <p className="text-gray-400 text-xs">New certificates will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-[#7B1C1C]" />
            <h2 className="font-sora font-bold text-gray-800">Courses</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
              {loading ? "Loading..." : `${courses.length} total`}
            </span>
            <Link
              to="/admin/courses"
              className="text-[#7B1C1C] text-sm font-semibold hover:underline flex items-center gap-1"
            >
              Manage
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="p-4 font-bold text-gray-500 uppercase tracking-wider text-[10px]">Slug</th>
                <th className="p-4 font-bold text-gray-500 uppercase tracking-wider text-[10px]">Title</th>
                <th className="p-4 font-bold text-gray-500 uppercase tracking-wider text-[10px]">Level</th>
                <th className="p-4 font-bold text-gray-500 uppercase tracking-wider text-[10px]">Status</th>
                <th className="p-4 font-bold text-gray-500 uppercase tracking-wider text-[10px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-[#7B1C1C] border-t-transparent rounded-full animate-spin" />
                      <span className="text-gray-500">Loading courses...</span>
                    </div>
                  </td>
                </tr>
              ) : courses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    <div className="text-gray-500">
                      <BookOpen className="w-8 h-8 mx-auto mb-3 text-gray-300" />
                      <p>No courses found</p>
                      <p className="text-xs text-gray-400 mt-1">Create your first course to get started</p>
                    </div>
                  </td>
                </tr>
              ) : (
                courses.map((c, index) => (
                  <tr 
                    key={c.id} 
                    className={`border-t border-gray-100 hover:bg-[#7B1C1C]/5 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                  >
                    <td className="p-4 font-mono text-gray-600 text-xs">{c.slug}</td>
                    <td className="p-4 font-semibold text-gray-800">{c.title}</td>
                    <td className="p-4 text-gray-500 text-xs">{c.level || "—"}</td>
                    <td className="p-4">
                      {c.isActive ? (
                        <span className="inline-flex items-center gap-1.5 text-green-700 font-bold text-[10px] bg-green-50 px-2.5 py-1 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-gray-500 font-bold text-[10px] bg-gray-100 px-2.5 py-1 rounded-full">
                          <XCircle className="w-3 h-3" />
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <Link
                        to={`/admin/courses/${c.slug}/modules`}
                        className="inline-flex items-center gap-1.5 text-[#7B1C1C] font-semibold text-xs hover:underline transition-colors"
                      >
                        <Settings className="w-3.5 h-3.5" />
                        Manage Modules
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
          <div className="text-[#7B1C1C] font-sora font-extrabold text-xl">
            {stats ? stats.totalcertificates : "—"}
          </div>
          <div className="text-xs text-gray-500">Total Certificates</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
          <div className="text-[#B8860B] font-sora font-extrabold text-xl">
            {stats ? stats.totalCourses : "—"}
          </div>
          <div className="text-xs text-gray-500">Total Courses</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
          <div className="text-[#2563EB] font-sora font-extrabold text-xl">
            {stats ? stats.distinctCoursesWithcertificates : "—"}
          </div>
          <div className="text-xs text-gray-500">Active Programs</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
          <div className="text-[#7B1C1C] font-sora font-extrabold text-xl">
            {stats?.recent?.length || 0}
          </div>
          <div className="text-xs text-gray-500">Recent Certificates</div>
        </div>
      </div>
    </AdminLayout>
  );
}