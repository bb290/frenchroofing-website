import fs from "node:fs";
import path from "node:path";
import { SERVICE_AREAS } from "@/lib/constants";

/*
  Past projects (2026-11-18). One JSON file per project in src/data/projects/<slug>.json, images in
  public/images/projects/<slug>/NN.webp. Adding a file is all it takes: this module reads the folder at build time.

  Drafts: status "draft" projects exist only when VERCEL_ENV is not "production" (preview deployments and local dev),
  so Brittany can review them on a preview branch. On production they are absent from every list, the sitemap, and
  generateStaticParams (detail routes use dynamicParams = false, so a draft URL is a 404 there).

  Public data only: city + state, never a street, customer name, house number, or Housecall Pro job number.
*/

export type ProjectService = "roof-replacement" | "roof-repair" | "roof-cleaning" | "maintenance" | "roof-inspections";

export type ProjectPhoto = { src: string; alt: string; caption?: string; stage?: "before" | "during" | "after" };

export type Project = {
  slug: string;
  status: "draft" | "published";
  service: ProjectService;
  title: string;
  city: string;
  state: "OR";
  /** "YYYY-MM". Optional only for older gallery projects whose job date isn't recorded. */
  completed?: string;
  material?: string;
  roofType?: string;
  summary: string;
  scope: string[];
  body?: string[];
  photos: ProjectPhoto[];
  faqs?: { question: string; answer: string }[];
  addedAt: string;
};

export const PROJECTS_PER_PAGE = 12;

export const SERVICE_LABELS: Record<ProjectService, string> = {
  "roof-replacement": "Roof Replacement",
  "roof-repair": "Roof Repair",
  "roof-cleaning": "Roof Cleaning",
  maintenance: "Roof Maintenance",
  "roof-inspections": "Roof Inspection",
};

/** Services with per-city pages under /services/<service>/<city-slug>. */
const CITY_PAGE_SERVICES: ProjectService[] = ["roof-replacement", "roof-repair", "roof-cleaning", "roof-inspections"];

const DIR = path.join(process.cwd(), "src/data/projects");
const SHOW_DRAFTS = process.env.VERCEL_ENV !== "production";

function load(): Project[] {
  if (!fs.existsSync(DIR)) return [];
  const all = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const p = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")) as Project;
      if (p.slug !== f.replace(/\.json$/, "")) throw new Error(`src/data/projects/${f}: slug "${p.slug}" must match the file name`);
      if (!p.photos?.length) throw new Error(`src/data/projects/${f}: needs at least one photo`);
      if (!(p.service in SERVICE_LABELS)) throw new Error(`src/data/projects/${f}: unknown service "${p.service}"`);
      return p;
    });
  return all
    .filter((p) => p.status === "published" || (SHOW_DRAFTS && p.status === "draft"))
    .sort((a, b) => (b.completed ?? "").localeCompare(a.completed ?? "") || b.addedAt.localeCompare(a.addedAt));
}

/** Every visible project, newest first. */
export const PROJECTS: Project[] = load();

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function projectsFor(service?: ProjectService): Project[] {
  return service ? PROJECTS.filter((p) => p.service === service) : PROJECTS;
}

/** Services that have at least one visible project, in label order. */
export function servicesWithProjects(): ProjectService[] {
  return (Object.keys(SERVICE_LABELS) as ProjectService[]).filter((s) => PROJECTS.some((p) => p.service === s));
}

export function pageCount(list: Project[]): number {
  return Math.max(1, Math.ceil(list.length / PROJECTS_PER_PAGE));
}

export function pageSlice(list: Project[], page: number): Project[] {
  return list.slice((page - 1) * PROJECTS_PER_PAGE, page * PROJECTS_PER_PAGE);
}

/** "2026-10" -> "October 2026". */
export function formatCompleted(ym?: string): string | null {
  if (!ym) return null;
  const [y, m] = ym.split("-").map(Number);
  if (!y || !m) return null;
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

/** /services/<service>/<city> when that city page exists, else null. */
export function cityServiceHref(p: Project): string | null {
  if (!CITY_PAGE_SERVICES.includes(p.service)) return null;
  const area = SERVICE_AREAS.all.find((a) => a.name.toLowerCase() === p.city.toLowerCase() && a.state === p.state);
  return area ? `/services/${p.service}/${area.slug}` : null;
}

/** Up to `count` other projects: same city first, then same service, then newest. */
export function relatedProjects(p: Project, count = 3): Project[] {
  const others = PROJECTS.filter((o) => o.slug !== p.slug);
  const sameCity = others.filter((o) => o.city === p.city);
  const sameService = others.filter((o) => o.service === p.service && o.city !== p.city);
  const rest = others.filter((o) => !sameCity.includes(o) && !sameService.includes(o));
  return [...sameCity, ...sameService, ...rest].slice(0, count);
}

export function projectHref(p: Project): string {
  return `/past-projects/${p.slug}`;
}

/** List path for a page of the index or a service filter. Page 1 has no /page/1 suffix. */
export function listHref(page: number, service?: ProjectService): string {
  const base = service ? `/past-projects/service/${service}` : "/past-projects";
  return page <= 1 ? base : `${base}/page/${page}`;
}
