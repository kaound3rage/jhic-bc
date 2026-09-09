import { majors, schoolStats, getMajorBySlug } from "./majors";

const MAJORS_API = "/api/majors";
const SCHOOL_STATS_API = "/api/school-stats";

// GET /api/majors -> { majors: [...] }
export async function fetchMajors() {
  try {
    const res = await fetch(MAJORS_API);
    if (res.ok) {
      const data = await res.json();
      const list = Array.isArray(data) ? data : data?.majors;
      if (Array.isArray(list) && list.length) {
        return { majors: list, fromApi: true };
      }
    }
  } catch {
    /* fallback ke data statis */
  }
  return { majors, fromApi: false };
}

// GET /api/majors/:slug -> { major: {...} }
export async function fetchMajor(slug) {
  try {
    const res = await fetch(`${MAJORS_API}/${slug}`);
    if (res.ok) {
      const data = await res.json();
      const major = data?.major ?? data;
      if (major && major.slug) return { major, fromApi: true };
    }
    if (res.status === 404) return { major: null, fromApi: false };
  } catch {
    /* fallback ke data statis */
  }
  return { major: getMajorBySlug(slug) ?? null, fromApi: false };
}

// GET /api/school-stats -> { akreditasi, berdiriSejak, kerjasamaIndustri }
export async function fetchSchoolStats() {
  try {
    const res = await fetch(SCHOOL_STATS_API);
    if (res.ok) {
      const data = await res.json();
      if (data && (data.akreditasi || data.berdiriSejak)) {
        return { stats: data, fromApi: true };
      }
    }
  } catch {
    /* fallback ke data statis */
  }
  return { stats: schoolStats, fromApi: false };
}