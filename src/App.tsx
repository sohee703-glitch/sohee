/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { 
  BookOpen, 
  HelpCircle, 
  Award, 
  Sparkles, 
  ChevronRight, 
  Heart,
  Store,
  Trophy,
  History,
  GraduationCap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import Storybook from "./components/Storybook";
import ToolEncyclopedia from "./components/ToolEncyclopedia";
import IdiomQuiz from "./components/IdiomQuiz";
import OxQuiz from "./components/OxQuiz";

type ActiveViewType = "dashboard" | "story" | "tools" | "idioms" | "ox-quiz";

export default function App() {
  const [activeView, setActiveView] = useState<ActiveViewType>("dashboard");
  
  // Achievement States
  const [badges, setBadges] = useState<{
    story: boolean;
    tools: boolean;
    idioms: boolean;
    ox: boolean;
  }>({
    story: false,
    tools: false,
    idioms: false,
    ox: false
  });

  // Load state from localStorage on startup
  useEffect(() => {
    const saved = localStorage.getItem("kil_son_achievements");
    if (saved) {
      try {
        setBadges(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load achievements", e);
      }
    }
  }, []);

  const saveBadge = (key: keyof typeof badges) => {
    const updated = { ...badges, [key]: true };
    setBadges(updated);
    localStorage.setItem("kil_son_achievements", JSON.stringify(updated));
  };

  const resetAllAchievements = () => {
    if (window.confirm("공부했던 모든 자랑스러운 업적을 다시 리셋하여 공부할까요?")) {
      const reset = { story: false, tools: false, idioms: false, os: false, ox: false } as any;
      setBadges(reset);
      localStorage.removeItem("kil_son_achievements");
    }
  };

  // Quick navigation shortcuts
  const navigateTo = (view: ActiveViewType) => {
    setActiveView(view);
    // Auto unlock badges on entry to encourage children, or on certain actions
    if (view === "story") saveBadge("story");
    if (view === "tools") saveBadge("tools");
    if (view === "idioms") saveBadge("idioms");
    if (view === "ox-quiz") saveBadge("ox");
    
    // Smooth scroll to top when changing views
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans selection:bg-amber-200">
      
      {/* Dancheong-inspired Colorful Traditional Border Trim (Red/Green/Gold) */}
      <div className="h-2.5 w-full bg-gradient-to-r from-emerald-600 via-yellow-500 to-rose-600 shadow-sm" />

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        
        {/* Dynamic header - displays back button if not on dashboard */}
        <header className="flex flex-col sm:flex-row justify-between items-center border-b border-stone-200/80 pb-6 mb-8 gap-4">
          <div className="flex items-center gap-3">
            {/* Traditional Korean Arch shape design */}
            <div className="w-12 h-12 rounded-full bg-amber-700/10 border-2 border-amber-800 flex items-center justify-center text-amber-800 font-serif font-black shadow-inner">
              상생
            </div>
            <div>
              <h1 
                onClick={() => navigateTo("dashboard")} 
                className="text-2xl sm:text-3xl font-serif font-bold text-amber-900 tracking-tight cursor-pointer hover:opacity-85 select-none"
              >
                길아저씨 손아저씨 배움터
              </h1>
              <p className="text-xs text-stone-500 font-sans tracking-wide mt-0.5">
                그림책 '길아저씨 손아저씨'의 감동적인 이야기를 통한 우리말과 역사 교육 프로그램
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {activeView !== "dashboard" ? (
              <button
                onClick={() => navigateTo("dashboard")}
                className="px-4 py-2 font-sans font-black text-xs sm:text-sm rounded-xl bg-stone-800 text-stone-100 hover:bg-stone-950 transition shadow flex items-center gap-1.5"
                id="back-to-home-btn"
              >
                <span>← 메인 배움터(홈)로 이동</span>
              </button>
            ) : (
              <span className="text-[11px] font-sans font-extrabold text-amber-805 bg-amber-100/60 border border-amber-200/50 px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>서로 배려하고 협동하면 기적이 일어나요</span>
              </span>
            )}
          </div>
        </header>

        {/* View Router */}
        <div className="transition-all duration-300">
          <AnimatePresence mode="wait">
            
            {/* 1. DASHBOARD VIEW (Active by default) */}
            {activeView === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                
                {/* Book Preface Introduction Banner */}
                <div className="bg-amber-50/50 p-5 sm:p-7 rounded-3xl border border-amber-200/70 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 space-y-3">
                    <div className="flex items-center gap-1.5 bg-amber-100 text-amber-900 text-[10px] font-sans font-black w-fit px-3 py-0.5 rounded-full border border-amber-200">
                      <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                      <span>그림책 소개: 길아저씨 손아저씨 (권정생 글)</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-serif font-black text-amber-950 leading-tight">
                      다리가 아픈 길아저씨, 눈이 안 자라는 손아저씨,<br />
                      두 사람이 어깨를 맞잡고 완성해 나간 자립 스토리
                    </h2>
                    <p className="text-[13px] sm:text-[14px] text-stone-600 font-sans leading-relaxed text-justify max-w-2xl">
                      태어날 때부터 거동조차 하지 못했던 길아저씨와 앞을 일절 보지 못한 슬픈 손아저씨는 부모님이 세상을 뜨신 이후 커다란 한숨 속에 울었습니다. 하지만 손아저씨의 가슴에서 늠름한 생각의 불이 켜졌고, 길아저씨와 ‘눈이 되고 다리가 되어’ 완벽한 동반자가 되었습니다. 두 분이 멍석 위에 도란도란 둘러앉아 한국 전통 도구들을 직접 손수 삼아 자립을 이뤄낸 아름답고 지혜로운 일깨움을 직접 체득해 봅시다!
                    </p>
                  </div>

                  <div className="md:col-span-4 bg-white/80 p-4 rounded-2xl border border-amber-100 flex flex-col items-center justify-center text-center shadow-inner relative overflow-hidden min-h-[160px]">
                    {/* Tiny visual traditional mountain overlay */}
                    <div className="absolute bottom-0 inset-x-0 h-8 opacity-10 bg-repeat-x bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-900 to-transparent" />
                    
                    {/* Hands heart icon representation */}
                    <div className="text-4xl">🤝🧑‍🤝‍🧑</div>
                    <h3 className="font-serif font-black text-xs sm:text-[13px] text-amber-950 mt-2">
                      “내가 자네 어깨를 빌릴 테니,<br />자네는 내 눈길을 빌려 주게나!”
                    </h3>
                    <button 
                      onClick={() => navigateTo("story")}
                      className="mt-3 py-1.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-sans font-black text-[11px] transition shadow"
                    >
                      교실 동화 보러가기
                    </button>
                  </div>
                </div>

                {/* 4 Entrances Navigation Grid */}
                <div className="space-y-4">
                  <h3 className="text-xs font-sans font-extrabold uppercase tracking-wider text-stone-500 px-1">
                    📖 아래의 배움 활동 카드를 클릭하여 각각 입장해 보셔요!
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                    
                    {/* Card 1: Storybook */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => navigateTo("story")}
                      className="bg-amber-50/20 hover:bg-amber-150 border border-amber-200/60 rounded-2xl p-5 cursor-pointer flex flex-col justify-between h-[210px] shadow transition-all relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 opacity-10 group-hover:opacity-15 group-hover:scale-110 transitionText font-black text-8xl text-amber-800">
                        1
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-sans font-bold text-amber-700">제 1부 : 그림책 돋보기</span>
                        <h4 className="text-base sm:text-lg font-serif font-black text-amber-950 mt-1">
                          동화 극장 책방
                        </h4>
                        <p className="text-[11px] text-stone-500 font-sans mt-1 line-clamp-2">
                          목소리 듣기와 예쁜 한옥 삽화들로 온 줄거리를 깊이 정독해요.
                        </p>
                      </div>
                      <span className="text-[10px] font-sans font-black text-amber-800 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                        <span>입장하기</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </motion.div>

                    {/* Card 2: Traditional tools dictionary */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => navigateTo("tools")}
                      className="bg-emerald-50/10 hover:bg-emerald-150 border border-emerald-200/50 rounded-2xl p-5 cursor-pointer flex flex-col justify-between h-[210px] shadow transition-all relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 opacity-10 group-hover:opacity-15 group-hover:scale-110 transitionText font-black text-8xl text-emerald-800">
                        2
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                        <Store className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-sans font-bold text-emerald-700">제 2부 : 옛날 명물 공부</span>
                        <h4 className="text-base sm:text-lg font-serif font-black text-slate-850 mt-1">
                          전통 도구 박물관
                        </h4>
                        <p className="text-[11px] text-stone-500 font-sans mt-1 line-clamp-2">
                          지게, 바소쿠리, 봉태기, 멍석의 뜻을 배우고 가상 체험 놀이를 즐겨요!
                        </p>
                      </div>
                      <span className="text-[10px] font-sans font-black text-emerald-800 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                        <span>입장하기</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </motion.div>

                    {/* Card 3: Idiom in matches */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => navigateTo("idioms")}
                      className="bg-teal-50/10 hover:bg-teal-150 border border-teal-200/50 rounded-2xl p-5 cursor-pointer flex flex-col justify-between h-[210px] shadow transition-all relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 opacity-10 group-hover:opacity-15 group-hover:scale-110 transitionText font-black text-8xl text-teal-800">
                        3
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-850 flex items-center justify-center font-bold">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-sans font-bold text-teal-700">제 3부 : 선비네 우리말 지혜</span>
                        <h4 className="text-base sm:text-lg font-serif font-black text-slate-850 mt-1">
                          속담·사자성어 서당
                        </h4>
                        <p className="text-[11px] text-stone-500 font-sans mt-1 line-clamp-2">
                          ‘백지장도 맞들면 낫다’를 비롯한 상황 맞춤 시험에 등급 도전을 해봐요!
                        </p>
                      </div>
                      <span className="text-[10px] font-sans font-black text-teal-800 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                        <span>입장하기</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </motion.div>

                    {/* Card 4: Comprehension OX quiz */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => navigateTo("ox-quiz")}
                      className="bg-indigo-50/10 hover:bg-indigo-150 border border-indigo-250/50 rounded-2xl p-5 cursor-pointer flex flex-col justify-between h-[210px] shadow transition-all relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 opacity-10 group-hover:opacity-15 group-hover:scale-110 transitionText font-black text-8xl text-indigo-800">
                        4
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-850 flex items-center justify-center font-bold">
                        <HelpCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-sans font-bold text-indigo-700">제 4부 : 독서 장원평가</span>
                        <h4 className="text-base sm:text-lg font-serif font-black text-slate-850 mt-1">
                          줄거리 OX 골든벨
                        </h4>
                        <p className="text-[11px] text-stone-500 font-sans mt-1 line-clamp-2">
                          길아저씨와 손아저씨가 겪은 소중한 정답들을 맞추며 명 학위를 얻어요.
                        </p>
                      </div>
                      <span className="text-[10px] font-sans font-black text-indigo-800 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                        <span>입장하기</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </motion.div>

                  </div>
                </div>

                {/* TRADITIONAL KOREAN ACHIEVEMENTS SHELF (전통 업적 보관함) */}
                <div className="bg-[#FAF7F0] p-6 rounded-3xl border border-stone-200/80 shadow-md">
                  <div className="flex justify-between items-center border-b border-stone-200 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="text-amber-800 w-5 h-5" />
                      <h3 className="text-sm sm:text-base font-serif font-black text-amber-950">
                        나의 배움터 전통 업적 보관실 (스스로 잠금 해제!)
                      </h3>
                    </div>
                    
                    <button
                      onClick={resetAllAchievements}
                      className="text-[10px] font-sans text-stone-400 hover:text-stone-600 underline"
                    >
                      전체 진척 리셋
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Badge 1: Read Story */}
                    <div className={`p-4 rounded-xl border flex flex-col items-center text-center transition ${
                      badges.story 
                        ? "bg-white border-amber-300 text-amber-900 shadow-sm" 
                        : "bg-stone-100/50 border-stone-200 text-stone-400"
                    }`}>
                      <div className="text-3xl mb-1.5 filter grayscale-0 select-none">
                        {badges.story ? "🏅" : "🔒"}
                      </div>
                      <span className="text-xs font-black font-sans">이야기 완독 마패</span>
                      <p className="text-[9px] text-stone-500 mt-1 font-sans">
                        {badges.story ? "동화 독서 통과 완성!" : "1부를 공부하세요."}
                      </p>
                    </div>

                    {/* Badge 2: Explore traditional tools */}
                    <div className={`p-4 rounded-xl border flex flex-col items-center text-center transition ${
                      badges.tools 
                        ? "bg-white border-emerald-300 text-emerald-950 shadow-sm" 
                        : "bg-stone-100/50 border-stone-200 text-stone-400"
                    }`}>
                      <div className="text-3xl mb-1.5 filter grayscale-0 select-none">
                        {badges.tools ? "🧺" : "🔒"}
                      </div>
                      <span className="text-xs font-black font-sans">전통도구 만물박사</span>
                      <p className="text-[9px] text-stone-500 mt-1 font-sans">
                        {badges.tools ? "민속 도구 척척학사 완료!" : "2부를 체험하세요."}
                      </p>
                    </div>

                    {/* Badge 3: Match Idiom quiz */}
                    <div className={`p-4 rounded-xl border flex flex-col items-center text-center transition ${
                      badges.idioms 
                        ? "bg-white border-teal-300 text-teal-950 shadow-sm" 
                        : "bg-stone-100/50 border-stone-200 text-stone-400"
                    }`}>
                      <div className="text-3xl mb-1.5 filter grayscale-0 select-none">
                        {badges.idioms ? "📜" : "🔒"}
                      </div>
                      <span className="text-xs font-black font-sans">서당 장원급제</span>
                      <p className="text-[9px] text-stone-500 mt-1 font-sans">
                        {badges.idioms ? "한자와 속담 정복 성공!" : "3부 서당을 푸셔요."}
                      </p>
                    </div>

                    {/* Badge 4: Clean OX quiz */}
                    <div className={`p-4 rounded-xl border flex flex-col items-center text-center transition ${
                      badges.ox 
                        ? "bg-white border-indigo-300 text-indigo-950 shadow-sm" 
                        : "bg-stone-100/50 border-stone-200 text-stone-400"
                    }`}>
                      <div className="text-3xl mb-1.5 filter grayscale-0 select-none">
                        {badges.ox ? "🎓" : "🔒"}
                      </div>
                      <span className="text-xs font-black font-sans">독서 학사자격장</span>
                      <p className="text-[9px] text-stone-500 mt-1 font-sans">
                        {badges.ox ? "OX 최종 골든벨 우승!" : "4부를 통과하세요."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cultural Quote Footer section */}
                <div className="bg-[#FAF7F0] p-4 rounded-2xl border border-stone-200/50 text-center text-stone-500 text-xs font-sans">
                  "우리가 살아가는 세상에서 저마다 힘든 처지가 있지만, 둘이 서로 귀를 빌리고 어깨를 비벼 나란히 걸으면 그 어떤 험난한 고개라도 기차처럼 거뜬히 넘어갈 우정의 꽃봉오리를 맺습니다."
                </div>

              </motion.div>
            )}

            {/* 2. STORYBOOK THEATER VIEW */}
            {activeView === "story" && (
              <motion.div
                key="story"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Storybook 
                  onNavigateToTools={() => navigateTo("tools")}
                  onNavigateToIdioms={() => navigateTo("idioms")}
                  onNavigateToQuiz={() => navigateTo("ox-quiz")}
                />
              </motion.div>
            )}

            {/* 3. TRADITIONAL TOOLS ENCYCLOPEDIA VIEW */}
            {activeView === "tools" && (
              <motion.div
                key="tools"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ToolEncyclopedia 
                  onNavigateToStory={() => navigateTo("story")}
                  onNavigateToIdioms={() => navigateTo("idioms")}
                  onNavigateToQuiz={() => navigateTo("ox-quiz")}
                />
              </motion.div>
            )}

            {/* 4. IDIOM/PROVERB MATCH ACADEMY VIEW */}
            {activeView === "idioms" && (
              <motion.div
                key="idioms"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <IdiomQuiz 
                  onNavigateToStory={() => navigateTo("story")}
                  onNavigateToTools={() => navigateTo("tools")}
                  onNavigateToQuiz={() => navigateTo("ox-quiz")}
                />
              </motion.div>
            )}

            {/* 5. OX STORY PLOT COMPREHENSION QUIZ VIEW */}
            {activeView === "ox-quiz" && (
              <motion.div
                key="ox-quiz"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <OxQuiz 
                  onNavigateToStory={() => navigateTo("story")}
                  onNavigateToTools={() => navigateTo("tools")}
                  onNavigateToIdioms={() => navigateTo("idioms")}
                />
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </main>

      {/* Copy footer */}
      <footer className="bg-stone-100 border-t border-stone-200 mt-20 py-8 text-center text-xs text-stone-400 font-sans tracking-wide">
        <p>© 2026 길아저씨 손아저씨 배움터. All Rights Reserved.</p>
        <p className="mt-1">가슴 울리는 문학의 정수로 고귀한 자율과 공존의 기쁨을 곱씹습니다.</p>
      </footer>

    </div>
  );
}
