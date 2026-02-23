/**
 * SEO – dinamički title i meta tagovi po ruti.
 * Zameni BASE_URL u main.tsx ako imaš drugi domen.
 */
export const SITE_URL = "https://pcelarstvotodorovic.com";

export const SEO_ROUTES: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Pčelarstvo Todorović | Domaći med i medne mešavine – Srbija",
    description: "Porodično pčelarstvo sa 25+ godina iskustva. Šumski i livadski med, medne mešavine sa voćem i orašastim plodovima.",
  },
  "/o-nama": {
    title: "O nama | Pčelarstvo Todorović – 25+ godina tradicije",
    description: "Saznajte više o našem porodičnom pčelarstvu, tradiciji i načinu proizvodnje meda na Zlatiboru, Tari i Povlenu.",
  },
  "/proizvodi": {
    title: "Proizvodi od meda | Pčelarstvo Todorović",
    description: "Šumski med, livadski med i medne mešavine sa voćem, orašastim plodovima i začinima. Prirodno jačanje imuniteta.",
  },
  "/galerija": {
    title: "Galerija | Pčelarstvo Todorović",
    description: "Fotografije našeg pčelarstva, košnica i proizvoda.",
  },
  "/blog": {
    title: "Blog | Pčelarstvo Todorović",
    description: "Članci o medu, pčelarstvu i zdravlju.",
  },
  "/kontakt": {
    title: "Kontakt | Pčelarstvo Todorović – Pišite nam ili nas pozovite",
    description: "Kontaktirajte nas: +381 64 2299 266, vasilijetodorovic983@gmail.com. Odgovaramo u najkraćem roku.",
  },
};

export function updateSEO(pathname: string) {
  const seo = SEO_ROUTES[pathname] || SEO_ROUTES["/"];
  document.title = seo.title;

  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) descMeta.setAttribute("content", seo.description);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", seo.title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute("content", seo.description);

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute("href", `${SITE_URL}${pathname === "/" ? "" : pathname}`);
}
