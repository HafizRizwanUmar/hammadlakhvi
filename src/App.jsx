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

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import ArticleManager from './admin/ArticleManager';
import VideoManager from './admin/VideoManager';
import SettingsManager from './admin/SettingsManager';
import InquiryManager from './admin/InquiryManager';
import BiographyManager from './admin/BiographyManager';
import EventManager from './admin/EventManager';
import FatwaManager from './admin/FatwaManager';

import SEO from "./components/SEO";
import { useParams } from "react-router-dom";

function TVProgramRouteWrapper({ handleVideoClick }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const program = TV_PROGRAMS_DATA.find(p => p.slug === slug || p.id === slug);
  const [payamYear, setPayamYear] = useState(null);

  if (!program) return <Navigate to="/tv-programs-and-community" replace />;

  if (slug === 'payam-e-subah') {
    if (payamYear) {
        return (
            <>
                <NavBar active="community" />
                <main style={{ minHeight: "100vh" }}>
                    <PayamYearPage 
                      year={payamYear} 
                      onBack={() => setPayamYear(null)} 
                      onVideoClick={handleVideoClick} 
                    />
                </main>
                <Footer />
            </>
        );
    }
    return (
      <>
        <NavBar active="community" />
        <main style={{ minHeight: "100vh" }}>
          <PayamSubahPage onYearSelect={(yr) => setPayamYear(yr)} onBack={() => navigate("/tv-programs-and-community")} />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar active="community" />
      <main style={{ minHeight: "100vh" }}>
        <TVProgramDetailPage 
          program={program} 
          onBack={() => navigate("/tv-programs-and-community")} 
          onVideoClick={handleVideoClick}
          onPayamSubahOpen={() => {}} // Not needed as we handle it above
        />
      </main>
      <Footer />
    </>
  );
}

function PayamYearRouteWrapper({ handleVideoClick }) {
    const { year } = useParams();
    const navigate = useNavigate();
    return (
        <>
            <NavBar active="community" />
            <main style={{ minHeight: "100vh" }}>
                <PayamYearPage year={year} onBack={() => navigate("/tv/payam-e-subah")} onVideoClick={handleVideoClick} />
            </main>
            <Footer />
        </>
    );
}
export default function App() {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const handleVideoClick = (v) => setSelectedVideo(v);

  return (
    <>
      <style>{FONTS + GLOBAL_STYLE}</style>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="articles" element={<ArticleManager />} />
          <Route path="videos" element={<VideoManager />} />
          <Route path="inquiries" element={<InquiryManager />} />
          <Route path="events" element={<EventManager />} />
          <Route path="biography" element={<BiographyManager />} />
          <Route path="fatwas" element={<FatwaManager />} />
          <Route path="settings" element={<SettingsManager />} />
        </Route>

        {/* Public Site Routes */}
        <Route path="/" element={
          <>
            <NavBar active="home" />
            <SEO title="Home" description="Official website of Prof. Dr. Muhammad Hammad Lakhvi. Islamic scholar and directory of Faith Foundation." />
            <main style={{ minHeight: "100vh" }}><HomePage /></main>
            <Footer />
          </>
        } />

        <Route path="/biography-of-dr-hammad-lakhvi" element={
          <>
            <NavBar active="biography" />
            <SEO title="Biography" description="Detailed biography of Prof. Dr. Muhammad Hammad Lakhvi, his education, teachers, and academic achievements." />
            <main style={{ minHeight: "100vh" }}><BiographyPage /></main>
            <Footer />
          </>
        } />

        <Route path="/islamic-short-clips" element={
          <>
            <NavBar active="shorts" />
            <SEO title="Short Video Clips" description="Watch and share short Islamic clips and reminders by Dr. Hammad Lakhvi." />
            <main style={{ minHeight: "100vh" }}><ShortsPage onVideoClick={handleVideoClick} /></main>
            <Footer />
          </>
        } />

        <Route path="/islamic-lectures-and-series" element={
          <>
            <NavBar active="lectures" />
            <SEO title="Islamic Lectures & Series" description="Comprehensive collection of Tafseer, Hadith, and Islamic lecture series by Dr. Hammad Lakhvi." />
            <main style={{ minHeight: "100vh" }}><LecturesPage onVideoClick={handleVideoClick} /></main>
            <Footer />
          </>
        } />

        <Route path="/research-articles-by-dr-hammad-lakhvi" element={
          <>
            <NavBar active="articles" />
            <SEO title="Research Articles" description="Explore peer-reviewed publications and research articles on Islamic theology, history, and contemporary issues." />
            <main style={{ minHeight: "100vh" }}><ArticlesPage onArticleSelect={(a) => navigate(`/article/${a.id || a._id}`)} /></main>
            <Footer />
          </>
        } />

        <Route path="/islamic-qa-and-fatwa" element={
          <>
            <NavBar active="fatwa" />
            <SEO title="Q&A / Fatwas" description="Islamic guidance and answers to contemporary questions in the light of Quran and Sunnah." />
            <main style={{ minHeight: "100vh" }}><FatwaPage /></main>
            <Footer />
          </>
        } />

        <Route path="/events-and-activities" element={
          <>
            <NavBar active="events" />
            <SEO title="Events & Activities" description="Latest updates on seminars, conferences, and community events involving Dr. Hammad Lakhvi." />
            <main style={{ minHeight: "100vh" }}><EventsPage /></main>
            <Footer />
          </>
        } />

        <Route path="/tv-programs-and-community" element={
          <>
            <NavBar active="community" />
            <SEO title="TV Programs & Community" description="Explore Pegham TV programs and community services provided by the Lakhvi family." />
            <main style={{ minHeight: "100vh" }}><CommunityPage onProgramClick={(slug) => navigate(`/tv/${slug}`)} /></main>
            <Footer />
          </>
        } />

        <Route path="/contact-us" element={
          <>
            <NavBar active="contact" />
            <SEO title="Contact" description="Get in touch for questions, invitations, or community support." />
            <main style={{ minHeight: "100vh" }}><ContactPage /></main>
            <Footer />
          </>
        } />
        
        {/* Detail Routes */}
        <Route path="/tv/:slug" element={<TVProgramRouteWrapper handleVideoClick={handleVideoClick} />} />
        <Route path="/tv/payam-e-subah/:year" element={<PayamYearRouteWrapper handleVideoClick={handleVideoClick} />} />

        <Route path="/article/:id" element={
          <>
            <NavBar active="articles" />
            <main style={{ minHeight: "100vh" }}>
              <ArticleDetailPage onBack={() => navigate("/research-articles-by-dr-hammad-lakhvi")} />
            </main>
            <Footer />
          </>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      <WhatsAppButton />
    </>
  );
}
