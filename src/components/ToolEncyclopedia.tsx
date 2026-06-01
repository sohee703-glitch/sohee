/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  Sparkles, 
  Bookmark, 
  HelpCircle, 
  Hand, 
  Hammer, 
  CheckCircle,
  TrendingUp, 
  ChevronRight,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ToolsProps {
  onNavigateToStory: () => void;
  onNavigateToIdioms: () => void;
  onNavigateToQuiz: () => void;
}

interface ToolDetail {
  id: string;
  name: string;
  koreanName: string;
  summary: string;
  description: string;
  material: string;
  usageDetail: string;
  modernAlternative: string;
  characterIdea: string; // How they made/used it in the story
}

export default function ToolEncyclopedia({ 
  onNavigateToStory, 
  onNavigateToIdioms, 
  onNavigateToQuiz 
}: ToolsProps) {
  const [selectedTool, setSelectedTool] = useState<string>("jige");
  
  // States for interactive mini-games
  const [jigeLoads, setJigeLoads] = useState<string[]>([]);
  const [basokuriVegetables, setBasokuriVegetables] = useState<string[]>([]);
  const [bongtaegiItems, setBongtaegiItems] = useState<string[]>([]);
  const [meongseokWeaveProgress, setMeongseokWeaveProgress] = useState<number>(0);
  const [isWeavingCompleted, setIsWeavingCompleted] = useState<boolean>(false);

  const toolsList: ToolDetail[] = [
    {
      id: "jige",
      name: "Jige (Carrying Frame)",
      koreanName: "지게",
      summary: "무거운 나무, 풀, 거름 등을 어깨에 메고 손쉽게 나르던 전통 운반기구",
      description: "사람의 척추 구조에 기가 막히게 비례해서 짐을 효율적으로 분산하고 지탱하도록 정교하게 만들어진 나뭇가지 모양 골조 기구입니다. 지게 발이 균형을 맞춰 혼자 쓰러지지 않고 땅에 안전하게 딛어 있어요.",
      material: "소나무, 참나무 등 가볍고 질긴 나뭇가지, 새끼줄",
      usageDetail: "숲에서 해온 장작이나 산에서 채취한 도라지, 거름 등을 산 비탈길에서 가뿐히 메고 내려올 때 쓰였습니다. 지겟작대기로 균형을 잡으며 일어섰어요.",
      modernAlternative: "화물 지게차, 특수 백팩, 바퀴 달린 리어카",
      characterIdea: "대본에서 길 아저씨와 손 아저씨는 자립하기 위해 튼튼한 장작을 정성스레 베어와 지게를 깎고 다듬었어요. 그 지겟마루에 짐을 높여 부귀를 얻기 시작했답니다."
    },
    {
      id: "basokuri",
      name: "Basokuri (Wicker Basket)",
      koreanName: "바소쿠리",
      summary: "대나무나 풀줄기로 널찍하고 둥그스름하게 엮어 야채, 곡식, 생선을 담거나 말리던 그릇",
      description: "물기가 많거나 통풍이 중요한 식재료를 담아 보관하거나 한꺼번에 다른 장소로 이동할 때 쓴 채반 형태 바구니입니다. 짚과 대가지로 얼기설기 짜서 구멍이 숭숭 나 있어 건조에 백점이에요.",
      material: "대나무, 싸리나무 줄기, 갈풀",
      usageDetail: "밭에서 방금 캐낸 싱싱한 감자나 대추를 담거나 물로 헹궈내고 뙤약볕에 올려 말릴 때 많이 요긴하게 사용되었습니다.",
      modernAlternative: "플라스틱 소쿠리, 체반, 스테인리스 볼",
      characterIdea: "두 아저씨는 고품질의 바소쿠리를 수공예로 곱게 짰습니다. 이웃들은 정교한 만듦새를 보고 감탄하며 아낌없이 구매해 장을 가득 채웠지요."
    },
    {
      id: "bongtaegi",
      name: "Bongtaegi (Straw Bag)",
      koreanName: "봉태기",
      summary: "망을 촘촘하고 크게 짜서 질긴 짚풀끈으로 메고 다녔던 기특한 서민 가방",
      description: "오늘날의 주머니 달린 백팩이나 가벼운 에코백 역할을 하던 주머니 모양 자루입니다. 끈을 어깨에 가뿐히 동여매거나 몸에 밀착하여 무거운 화물이나 씨앗을 담아 다녔습니다.",
      material: "벼를 말려 얻은 질긴 짚풀, 새끼끈",
      usageDetail: "씨앗 자루를 넣고 밭에 씨를 고루 뿌리러 갈 때 지니거나, 산중에 무구한 야생 열매나 들나물을 싹싹 담아 운반할 때 활용되었습니다.",
      modernAlternative: "에코백, 배낭, 부직포 마대자루",
      characterIdea: "짚줄을 고르는 길 아저씨의 섬세한 정성과, 보이지 않는 손끝으로 단단히 매듭을 지은 손 아저씨의 협동이 명가방 봉태기로 재탄생했습니다."
    },
    {
      id: "meongseok",
      name: "Meongseok (Huge Straw Mat)",
      koreanName: "멍석",
      summary: "가을에 추수한 볏가리나 고추를 말릴 때 마당에 광활하게 깔아 쓰던 대형 짚돗자리",
      description: "마을 기쁜 잔치날에 손님들이 옹기종기 모여 앉아 빈대떡을 먹던 따뜻한 한옥 거실의 조상님 매트입니다. 겨울철엔 단열 효과를 내고 가을철엔 건조대 역할을 하던 다목적 도구입니다.",
      material: "건조시킨 볏짚",
      usageDetail: "양지바른 뜰아래에 넓게 펼치고 잘 씻은 대추, 빨간 가을 고추, 통통한 깨를 촉촉히 쏟아 뽀송하게 햇볕에 오랜 시간 말릴 때 쓰였습니다.",
      modernAlternative: "방수 돗자리, 캠핑 매트, 건조용 파란 은박 비닐 천",
      characterIdea: "두 아저씨의 부지런한 손에 의해 대형 멍석 위에서 새끼줄이 비로소 꽈졌고, 온갖 전통 도구들이 정돈되어 탄생한 일터의 기반이 되어주었습니다."
    }
  ];

  const activeTool = toolsList.find(t => t.id === selectedTool) || toolsList[0];

  // Helper inside click game
  const handleAddJigeLoad = (item: string) => {
    if (jigeLoads.length < 5) {
      setJigeLoads(prev => [...prev, item]);
    }
  };

  const handleEmptyJige = () => {
    setJigeLoads([]);
  };

  const handleAddBasokuriVeg = (veg: string) => {
    if (basokuriVegetables.length < 6) {
      setBasokuriVegetables(prev => [...prev, veg]);
    }
  };

  const handleEmptyBasokuri = () => {
    setBasokuriVegetables([]);
  };

  // Weave Mat interaction
  const handleWeaveMeongseok = () => {
    if (meongseokWeaveProgress < 100) {
      setMeongseokWeaveProgress(prev => {
        const next = prev + 10;
        if (next >= 100) {
          setIsWeavingCompleted(true);
        }
        return next;
      });
    }
  };

  const handleResetWeave = () => {
    setMeongseokWeaveProgress(0);
    setIsWeavingCompleted(false);
  };

  return (
    <div id="encyclopedia-container" className="flex flex-col h-full bg-slate-50 rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xl max-w-4xl mx-auto">
      {/* Top Banner section */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6 bg-amber-600/90 text-white rounded-2xl p-4 shadow border border-amber-700">
        <div>
          <h1 className="text-xl sm:text-2xl font-black font-sans tracking-tight">
            길아저씨네 옛날 만물상 도구 백과
          </h1>
          <p className="text-xs text-amber-100 mt-1">
            동화 속 주인공 아저씨들의 흘린 땀과 협동으로 자립하게 해 준 명 도구들을 공부하고 체험해봐요!
          </p>
        </div>
        
        {/* Quick Back & Forward navigation */}
        <div className="flex gap-2 self-start sm:self-center">
          <button
            onClick={onNavigateToStory}
            className="px-3.5 py-1.5 rounded-lg bg-amber-700 text-white hover:bg-amber-850 transition text-xs font-sans font-bold flex items-center gap-1 border border-amber-800"
          >
            <span>동화 다시 읽기</span>
          </button>
          <button
            onClick={onNavigateToIdioms}
            className="px-3.5 py-1.5 rounded-lg bg-white text-amber-800 font-sans font-bold text-xs hover:bg-slate-50 transition border border-amber-50 shadow"
          >
            <span>상황 속담 퀴즈</span>
          </button>
        </div>
      </div>

      {/* Grid: Left Column is tool selector cards, Right column is dynamic detail & simulator */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT BAR: 4 tools selector tiles (md:span-4) */}
        <div className="md:col-span-4 flex flex-col gap-3">
          <div className="bg-slate-100/70 p-2.5 rounded-xl border border-slate-200/50">
            <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-500 font-sans block mb-2 px-1">
              박물관 도구 선택
            </span>
            <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-none">
              {toolsList.map(t => {
                const isSelected = selectedTool === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTool(t.id)}
                    className={`flex-shrink-0 md:w-full flex items-center gap-3 p-3 rounded-xl border text-left transition ${
                      isSelected
                        ? "bg-amber-50 border-amber-400 text-amber-900 shadow-sm"
                        : "bg-white hover:bg-slate-50 border-slate-200 text-slate-750"
                    }`}
                  >
                    {/* Tiny Custom SVG Badge */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                      isSelected ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"
                    }`}>
                      {t.koreanName[0]}
                    </div>
                    <div>
                      <div className="font-sans font-black text-xs sm:text-[13px] leading-tight flex items-center gap-1">
                        <span>{t.koreanName}</span>
                        <span className="text-[10px] text-slate-400 font-normal">({t.name.split(" ")[0]})</span>
                      </div>
                      <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 max-w-[130px] md:max-w-none">
                        {t.summary}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick learning tip */}
          <div className="bg-sky-50 rounded-xl p-3 border border-sky-150 text-[11px] text-sky-850 font-sans leading-relaxed shadow-inner">
            <div className="flex gap-1 items-center mb-1 font-bold text-sky-900">
              <Info className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
              <span>전통 과학의 지혜</span>
            </div>
            초가집 창고나 민속 박물관에서만 보던 지게와 멍석들엔 구부정한 우리 선조들의 정교한 인체 공학 설계 디자인이 깃들어 있습니다.
          </div>
        </div>

        {/* RIGHT AREA: Full dictionary details & Interactive sandbox (md:span-8) */}
        <div className="md:col-span-8 flex flex-col gap-4">
          
          {/* Main detailed description panel */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black font-sans text-amber-900">
                    {activeTool.koreanName}
                  </span>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-sans font-bold px-2 py-0.5 rounded-full">
                    {activeTool.name}
                  </span>
                </div>
                <p className="text-xs text-amber-800 font-semibold font-sans mt-1">
                  {activeTool.summary}
                </p>
              </div>
              
              <div className="text-[11px] font-sans font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md">
                주요 재료: {activeTool.material}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[13px] sm:text-[14px] text-slate-700 font-sans leading-relaxed text-justify whitespace-pre-line">
                {activeTool.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-[11px] sm:text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-600 block mb-1">🔍 어떻게 쓰였나요? (전통 용도)</span>
                  <p className="text-slate-600 leading-relaxed font-sans">{activeTool.usageDetail}</p>
                </div>
                
                <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-800 block mb-1">💡 오늘날은 무엇과 닮았나요?</span>
                  <p className="text-amber-800 leading-relaxed font-sans">{activeTool.modernAlternative}</p>
                </div>
              </div>

              {/* Story relation text */}
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/50 text-[11px] text-stone-700 mt-2 font-sans">
                <span className="font-bold text-stone-800">📖 동화 속 상생 스토리:</span> {activeTool.characterIdea}
              </div>
            </div>
          </div>

          {/* Interactive sandbox: "어린이 서당 도구 체험 놀이방" */}
          <div className="bg-amber-50/30 p-4 rounded-2xl border border-amber-200 shadow-inner flex flex-col">
            <div className="flex items-center gap-1.5 mb-3 border-b border-amber-200/50 pb-2">
              <Hammer className="w-4.5 h-4.5 text-amber-700" />
              <h3 className="text-xs sm:text-sm font-black font-sans text-amber-900">
                체험 놀이방: "{activeTool.koreanName}" 직접 사용해보기!
              </h3>
            </div>

            {/* Dynamic sandbox content based on selectedTool */}
            <div className="bg-white rounded-xl p-4 border border-amber-100/85">
              
              {/* 1. JIGE GAME */}
              {selectedTool === "jige" && (
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex flex-col items-center">
                    {/* Jige status display drawing */}
                    <div className="w-[120px] h-[150px] relative bg-amber-50 rounded-xl border border-amber-200 flex flex-col justify-end p-2 overflow-hidden shadow-inner">
                      {/* Straw basket frame outline */}
                      <div className="absolute inset-x-4 top-4 bottom-2 border-2 border-dashed border-amber-300 rounded-lg flex flex-col justify-end gap-1 p-1">
                        {jigeLoads.map((load, index) => (
                          <motion.div
                            key={index}
                            initial={{ y: -50, scale: 0.8 }}
                            animate={{ y: 0, scale: 1 }}
                            className="bg-yellow-700 text-white text-[10px] py-1 rounded text-center font-bold font-sans shadow-sm"
                          >
                            {load}
                          </motion.div>
                        ))}
                        {jigeLoads.length === 0 && (
                          <span className="text-[9px] text-slate-400 text-center m-auto font-sans leading-tight">
                            아저씨 등에 업은 지게가 비어있어요. 장작을 가득 실어주세요!
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold font-sans mt-2">
                      적재 짐: {jigeLoads.length} / 5 개
                    </span>
                  </div>

                  {/* Actions column */}
                  <div className="flex-1 flex flex-col justify-center gap-2">
                    <span className="text-xs font-bold text-slate-700 block">나무꾼 아저씨처럼 물건을 싫어 날라봅시다.</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => handleAddJigeLoad("🔥 질긴 참나무")}
                        disabled={jigeLoads.length >= 5}
                        className="p-2 rounded-lg bg-orange-50 text-orange-800 font-sans font-semibold border border-orange-200 text-[11px] hover:bg-orange-100 transition whitespace-nowrap"
                      >
                        참나무 짐 싣기
                      </button>
                      <button
                        onClick={() => handleAddJigeLoad("🌾 보슬보슬 볏짚")}
                        disabled={jigeLoads.length >= 5}
                        className="p-2 rounded-lg bg-amber-50 text-amber-800 font-sans font-semibold border border-amber-200 text-[11px] hover:bg-amber-100 transition whitespace-nowrap"
                      >
                        볏짚 한마차 싣기
                      </button>
                      <button
                        onClick={() => handleAddJigeLoad("🥔 시골 가을 감자")}
                        disabled={jigeLoads.length >= 5}
                        className="p-2 rounded-lg bg-yellow-50 text-yellow-800 font-sans font-semibold border border-yellow-250 text-[11px] hover:bg-yellow-100 transition whitespace-nowrap"
                      >
                        양달 감자 가방
                      </button>
                      <button
                        onClick={() => handleAddJigeLoad("💎 보물 금화 주머니")}
                        disabled={jigeLoads.length >= 5}
                        className="p-2 rounded-lg bg-rose-50 text-rose-800 font-sans font-semibold border border-rose-200 text-[11px] hover:bg-rose-100 transition whitespace-nowrap"
                      >
                        화폐 자루 싣기
                      </button>
                    </div>

                    <button
                      onClick={handleEmptyJige}
                      className="mt-2 text-[11px] text-stone-500 hover:text-stone-700 underline font-sans text-left"
                    >
                      지게 짐 다 부리기 (비우기)
                    </button>
                  </div>
                </div>
              )}

              {/* 2. BASOKURI GAME */}
              {selectedTool === "basokuri" && (
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex flex-col items-center">
                    {/* Basokuri circle wicker draw */}
                    <div className="w-[130px] h-[130px] rounded-full border-4 border-amber-600 bg-amber-100/40 relative flex flex-wrap justify-center items-center p-2.5 shadow-inner">
                      {/* Grid cross lines under */}
                      <div className="absolute inset-0 border border-amber-300 rounded-full opacity-30 pointer-events-none" />
                      
                      {basokuriVegetables.map((veg, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-emerald-600 text-white rounded-full text-[9px] px-2 py-0.5 m-0.5 font-bold font-sans shadow-sm border border-emerald-700 flex items-center"
                        >
                          {veg}
                        </motion.div>
                      ))}

                      {basokuriVegetables.length === 0 && (
                        <div className="text-[10px] text-amber-800 text-center font-sans tracking-wide">
                          소쿠리가 비었어요
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    <span className="text-xs font-bold text-slate-700 block mb-2">뙤약볕에 말릴 싱싱한 푸른 농사물들을 바소쿠리에 담아 정돈하십시오.</span>
                    <div className="flex flex-wrap gap-2">
                      {["🥔 햇 감자", "🌶️ 매운 고추", "🍂 빨간 말린대추", "🧅 맛 좋은 양파", "🥬 부드러운 배추"].map(v => (
                        <button
                          key={v}
                          onClick={() => handleAddBasokuriVeg(v)}
                          disabled={basokuriVegetables.length >= 6}
                          className="px-2.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-sans border border-teal-200 text-xs font-bold"
                        >
                          + {v} 담기
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={handleEmptyBasokuri}
                      className="mt-3 text-[11px] text-slate-500 hover:text-slate-700 underline font-sans text-left"
                    >
                      바소쿠리 완전히 비우기
                    </button>
                  </div>
                </div>
              )}

              {/* 3. BONGTAEGI GAME */}
              {selectedTool === "bongtaegi" && (
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex flex-col items-center">
                    {/* Straw bag sack rendering */}
                    <div className="w-[100px] h-[130px] rounded-b-3xl rounded-t-lg bg-amber-700/80 border-2 border-amber-900 relative flex flex-col-reverse p-2 overflow-hidden shadow">
                      {/* String handle */}
                      <div className="absolute top-0 inset-x-2 h-4 border-2 border-amber-950 rounded-b-full pointer-events-none" />
                      
                      {bongtaegiItems.map((item, index) => (
                        <div key={index} className="bg-yellow-104 text-yellow-900 text-[10px] rounded py-0.5 text-center font-bold font-sans border border-yellow-200 mb-0.5 uppercase tracking-wide">
                          {item}
                        </div>
                      ))}

                      {bongtaegiItems.length === 0 && (
                        <div className="text-[10px] text-white/90 text-center m-auto font-sans leading-tight">
                          가방 안에 씨앗이 필요해요!
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    <span className="text-xs font-bold text-slate-700 block mb-1">
                      짚풀 주머니 봉태기에 이듬해 뿌릴 소중한 봄 씨앗들을 가득 담아 수축 보관해 보세요!
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {["🌾 보리 보리씨", "🌽 노란 옥수수씨", "🫘 튼튼한 메주콩", "🌱 들깨 고운씨"].map(crop => (
                        <button
                          key={crop}
                          onClick={() => {
                            if (bongtaegiItems.length < 5) {
                              setBongtaegiItems(p => [...p, crop]);
                            }
                          }}
                          disabled={bongtaegiItems.length >= 5}
                          className="px-2.5 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-800 font-sans border border-orange-250 text-xs font-bold"
                        >
                          {crop} 투입
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setBongtaegiItems([])}
                      className="mt-3 text-[11px] text-slate-500 hover:text-slate-700 underline font-sans text-left"
                    >
                      봉태기 지퍼 열어 비우기
                    </button>
                  </div>
                </div>
              )}

              {/* 4. MEONGSEOK GAME */}
              {selectedTool === "meongseok" && (
                <div className="flex flex-col md:flex-row gap-5 items-center">
                  <div className="flex flex-col items-center justify-center">
                    {/* Progressive mat width loader */}
                    <div className="w-[180px] h-[90px] bg-yellow-102 border border-yellow-300 rounded-xl relative overflow-hidden flex flex-col justify-center items-center shadow-inner">
                      {/* Moving texture as we progress */}
                      <motion.div 
                        className="absolute inset-y-0 left-0 bg-yellow-500/30 border-r border-amber-600"
                        style={{ width: `${meongseokWeaveProgress}%` }}
                        transition={{ duration: 0.2 }}
                      />

                      {/* Displaying dried red chilies on complete */}
                      {isWeavingCompleted && (
                        <div className="absolute inset-0 flex flex-wrap justify-around items-center p-2 z-10">
                          {["🌶️", "🌶️", "🌶️", "🌶️", "🌶️", "🌽", "🌶️"].map((emoji, i) => (
                            <motion.span 
                              key={i} 
                              initial={{ scale: 0, rotate: -20 }}
                              animate={{ scale: 1, rotate: 10 }}
                              className="text-xs"
                            >
                              {emoji}
                            </motion.span>
                          ))}
                        </div>
                      )}

                      <span className="z-10 font-sans font-black text-xs text-amber-900 bg-white/70 px-2 py-0.5 rounded-full border border-amber-200">
                        볏짚 엮기률: {meongseokWeaveProgress}%
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    <span className="text-xs font-bold text-slate-700 block mb-2">
                      두 손으로 '엮기' 버튼을 열심히 타닥타닥 눌러서, 마당에 크게 펼칠 넓은 멍석을 손수 짜 보십시오!
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleWeaveMeongseok}
                        disabled={isWeavingCompleted}
                        className={`px-4 py-2 font-sans font-black text-xs rounded-xl shadow transition ${
                          isWeavingCompleted 
                            ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                            : "bg-amber-500 hover:bg-amber-650 text-white animate-bounce"
                        }`}
                      >
                        {isWeavingCompleted ? "👍 영광의 명품 멍석 완성!" : "🌾 짚 엮기 (클릭!)"}
                      </button>

                      <button
                        onClick={handleResetWeave}
                        className="p-2 border border-slate-200 text-slate-500 hover:text-slate-700 text-xs rounded-lg font-sans bg-white hover:bg-slate-50"
                      >
                        처음부터 짜기
                      </button>
                    </div>

                    {isWeavingCompleted && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[11px] font-sans font-bold text-rose-600 mt-2.5 flex items-center gap-1 bg-rose-50 p-2 rounded-lg border border-rose-100"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>전설의 멍석이 지어졌어요! 햇빛 아래 고추가 맛있게 마릅니다!</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Quick navigators */}
          <div className="mt-2 flex justify-between items-center bg-slate-100 p-3 rounded-xl border border-slate-200 text-xs">
            <span className="font-sans text-slate-500 font-bold">공부를 마쳤다면?</span>
            <button
              onClick={onNavigateToIdioms}
              className="py-1 px-4.5 rounded-lg bg-amber-600 text-white font-sans font-extrabold hover:bg-amber-700 transition flex items-center gap-1 shadow"
            >
              <span>상황 맞춤 속담 놀이로 출발</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
