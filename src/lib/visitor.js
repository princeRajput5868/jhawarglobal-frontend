export function getOrCreateVisitorId() {
  const key = "jgf_visitor_id";
  try {
    let id = window.localStorage.getItem(key);
    if (!id) {
      id = `vis_${Math.random().toString(16).slice(2)}_${Date.now()}`;
      window.localStorage.setItem(key, id);
    }
    return id;
  } catch {
    // Fallback (very old browsers / private mode)
    return `vis_${Math.random().toString(16).slice(2)}_${Date.now()}`;
  }
}

