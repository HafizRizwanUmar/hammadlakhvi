import { useState, useEffect, useCallback } from "react";
import { FONTS, GLOBAL_STYLE } from "./constants";
import { TV_PROGRAMS_DATA, PAYAM_SUBAH_YEARS } from "./data/videos";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { VideoModal, WhatsAppButton } from "./components/UI";

import HomePage from "./pages/HomePage";
import BiographyPage from "./pages/BiographyPage";
import ShortsPage from "./pages/ShortsPage";
import LecturesPage from "./pages/LecturesPage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticleDetailPage from "./pages/ArticleDetail";
import FatwaPage from "./pages/FatwaPage";
import EventsPage from "./pages/EventsPage";
import CommunityPage from "./pages/CommunityPage";
import ContactPage from "./pages/ContactPage";
import TVProgramDetailPage from "./pages/TVProgramDetail";
import PayamSubahPage, { PayamYearPage } from "./pages/PayamSubah";

function parseHash(hash) {
  const raw = (hash || "").replace(/^#\/?/, "");
  const parts = raw.split("/").filter(Boolean);
  return { section: parts[0] || "home", sub: parts[1] || null, id: parts[2] || null };
}

function pushHash(section, sub, id) {
  let h = "#/" + section;
  if (sub) h += "/" + sub;
  if (id) h += "/" + id;
  window.location.hash = h;
  return parseHash(h);
}

export default function App() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const onHashChange = () => {
      const r = parseHash(window.location.hash);
      setRoute(r);
      if (r.section !== "articles" || !r.sub) setSelectedArticle(null);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [route.section, route.sub, route.id]);

  const navigate = useCallback((section, sub, id) => { setRoute(pushHash(section, sub, id)); }, []);
  const handleVideoClick = (v) => setSelectedVideo(v);
  const navActive = route.section === "tv" ? "community" : route.section;

  const renderPage = () => {
    const { section, sub, id } = route;

    if (section === "tv") {
      if (sub === "payam-e-subah") {
        if (id) {
          const yearData = PAYAM_SUBAH_YEARS.find(y => y.year === id);
          if (yearData) return <PayamYearPage yearData={yearData} onBack={() => navigate("tv", "payam-e-subah")} onVideoClick={handleVideoClick} />;
        }
        return <PayamSubahPage onYearSelect={(year) => navigate("tv", "payam-e-subah", year)} onBack={() => navigate("community")} />;
      }
      if (sub) {
        const program = TV_PROGRAMS_DATA.find(p => p.slug === sub || p.id === sub);
        if (program) {
          if (program.useYearlyFormat) { navigate("tv", "payam-e-subah"); return null; }
          return <TVProgramDetailPage program={program} onBack={() => navigate("community")} onVideoClick={handleVideoClick} onPayamSubahOpen={() => navigate("tv", "payam-e-subah")} />;
        }
      }
      return <CommunityPage onProgramClick={(slug) => navigate("tv", slug)} />;
    }

    if (section === "articles" && sub && selectedArticle) {
      return <ArticleDetailPage article={selectedArticle} onBack={() => { setSelectedArticle(null); navigate("articles"); }} />;
    }

    switch (section) {
      case "home": return <HomePage setActive={(id) => navigate(id)} onProgramClick={(slug) => navigate("tv", slug)} />;
      case "biography": return <BiographyPage />;
      case "clips": return <ShortsPage onVideoClick={handleVideoClick} />;
      case "lectures": return <LecturesPage onVideoClick={handleVideoClick} />;
      case "articles": return (
        <ArticlesPage onArticleSelect={(article) => {
          setSelectedArticle(article);
          const slug = article.title.slice(0, 40).replace(/\s+/g, "-").replace(/[^\w\u0600-\u06FF-]/g, "").toLowerCase() || "article";
          navigate("articles", slug);
        }} />
      );
      case "fatwa": return <FatwaPage />;
      case "events": return <EventsPage />;
      case "community": return <CommunityPage onProgramClick={(slug) => navigate("tv", slug)} />;
      case "contact": return <ContactPage />;
      default: return <HomePage setActive={(id) => navigate(id)} onProgramClick={(slug) => navigate("tv", slug)} />;
    }
  };

  return (
    <>
      <style>{FONTS + GLOBAL_STYLE}</style>
      <NavBar active={navActive} setPage={(id) => navigate(id)} />
      <main style={{ minHeight: "100vh" }}>{renderPage()}</main>
      <Footer setPage={(id) => navigate(id)} />
      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      <WhatsAppButton />
    </>
  );
}
