const API_URL = process.env.PUBLIC_DJANGO_API_URL ?? "http://localhost:8000";

export type AdminSession = {
  accessToken: string;
  refreshToken: string;
  user: { id: string; email: string; name: string };
  organizations: { id: string; name: string; role: string }[];
};

export async function loginAdmin(email: string, password: string): Promise<AdminSession> {
  const res = await fetch(`${API_URL}/api/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Login failed");
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    user: data.user,
    organizations: data.organizations ?? [],
  };
}

export function saveAdminSession(session: AdminSession) {
  localStorage.setItem("admin_access_token", session.accessToken);
  localStorage.setItem("admin_refresh_token", session.refreshToken);
  localStorage.setItem("admin_user", JSON.stringify(session.user));
}

export function getAdminSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  const accessToken = localStorage.getItem("admin_access_token");
  const refreshToken = localStorage.getItem("admin_refresh_token");
  const userRaw = localStorage.getItem("admin_user");
  if (!accessToken || !refreshToken || !userRaw) return null;
  try {
    return { accessToken, refreshToken, user: JSON.parse(userRaw), organizations: [] };
  } catch {
    return null;
  }
}

export function clearAdminSession() {
  localStorage.removeItem("admin_access_token");
  localStorage.removeItem("admin_refresh_token");
  localStorage.removeItem("admin_user");
}

export async function fetchAdminDashboard(accessToken: string) {
  const res = await fetch(`${API_URL}/api/dashboard/`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error("Failed to load dashboard");
  return res.json();
}
