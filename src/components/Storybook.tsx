/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  HelpCircle, 
  Heart, 
  Users, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface StorybookProps {
  onNavigateToQuiz: () => void;
  onNavigateToTools: () => void;
  onNavigateToIdioms: () => void;
}

export default function Storybook({ 
  onNavigateToQuiz, 
  onNavigateToTools, 
  onNavigateToIdioms 
}: StorybookProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechUtterance, setSpeechUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  const storySlides = [
    {
      id: 1,
      title: "방 안에 갇힌 길 아저씨",
      illustrationType: "kil_in_room",
      narration: "옛날 옛적, 아름다운 한국의 옛 마을에 두 아저씨가 살고 있었어요. 윗마을 '길 아저씨'는 두 다리가 많이 불편했어요. 그래서 아주 어릴 때부터 따뜻한 방 안에서 꼼짝을 하지 못하고 늘 앉아서만 외롭게 시간을 보냈답니다. 다행히 부모님이 살아 계실 때는 길 아저씨를 정성껏 돌봐주셔서 소박하게 살 수 있었지요.",
      accentText: "길 아저씨는 두 다리가 불편해서 늘 방안에만 있었어요.",
      bgClass: "bg-amber-50"
    },
    {
      id: 2,
      title: "앞을 보지 못하는 손 아저씨",
      illustrationType: "son_with_cane",
      narration: "아랫마을의 '손 아저씨'는 태어날 때부터 앞이 보이지 않는 시각장애를 가지고 태어났어요. 세상의 맑은 하늘도 예쁜 꽃나무도 볼 수 없으니 마음이 얼마나 답답했을까요? 손 아저씨도 어른이 될 때까지 집 안에서만 외롭게 벽을 더듬거리며 자라났답니다.",
      accentText: "손 아저씨는 두 눈이 보이지 않는 시각장애가 있었어요.",
      bgClass: "bg-teal-50"
    },
    {
      id: 3,
      title: "부모님이 돌아가신 후 찾아온 위기",
      illustrationType: "sad_crisis",
      narration: "시간이 흘러, 길 아저씨와 손 아저씨의 든든한 보호자였던 부모님들이 모두 세상을 떠나고 말았어요. 넓은 세상에 단둘이 남겨진 두 아저씨에게 큰 어려움이 닥쳤습니다. 어떻게 살아가야 할지 막막하여 방 안에서 조용히 흐느낄 뿐이었죠.",
      accentText: "든든했던 부모님이 떠나고, 이제 두 분만 남게 되었어요.",
      bgClass: "bg-stone-100"
    },
    {
      id: 4,
      title: "더듬거리며 구걸하는 손 아저씨",
      illustrationType: "son_begging",
      narration: "길 아저씨는 다리가 불편해 방 밖을 전혀 나가지 못해 고통에 울었습니다. 하지만 손 아저씨는 눈은 보이지 않아도 지팡이에 의지해서 더듬더듬 밖으로 걸어 나갈 수 있었어요. 그리하여 바가지를 들고 마을 여기저기서 밥 한 술을 구걸해서 겨우 먹고살기 시작했어요.",
      accentText: "손 아저씨는 바가지를 들고 구걸을 해서 목숨을 이어갔어요.",
      bgClass: "bg-yellow-50"
    },
    {
      id: 5,
      title: "대추나무 집 할머님의 한마디",
      illustrationType: "halmoni_clue",
      narration: "어느 날이었어요. 손 아저씨가 커다란 대추나무가 서 있는 기와집으로 구걸을 갔을 때, 그 집 할머니께서 손 아저씨의 사정을 가여워하시며 말씀하셨어요. '아이고 애처로운 것... 하지만 저 윗마을 길 총각에 비하면 너는 나은 편이란다. 그 아이는 다리를 완전히 못 써서 방안에서 한 발자국도 밖을 구경하지 못하거든.'",
      accentText: "할머니께서 윗마을 길 아저씨의 딱한 사정을 알려주셨어요.",
      bgClass: "bg-orange-50"
    },
    {
      id: 6,
      title: "머릿속에 번쩍인 아이디어",
      illustrationType: "lightbulb",
      narration: "할머니의 그 말씀을 듣자, 손 아저씨의 머릿속에 번쩍하고 놀라운 슬기가 떠올랐어요! '할머니, 혹시 저를 윗마을 길 총각네 집에 좀 데려다주실 수 있을까요? 무언가 우리가 만나면 서로 도울 수 있을 것 같아요!' 할머니는 반신반의하며 손 아저씨를 길 아저씨네 방 앞으로 이끌어 주었답니다.",
      accentText: "길 아저씨와 만난다면 도울 수 있는 길이 보일 것 같았어요!",
      bgClass: "bg-blue-50"
    },
    {
      id: 7,
      title: "서로 통하는 두 마음의 울림",
      illustrationType: "meet_together",
      narration: "방문이 활짝 열리고 처음 마주한 두 아저씨는 서로의 슬픔과 처지를 눈물이 나도록 공감했어요. '이보게, 길 형씨! 우리 이렇게 무기력하게 주저앉지 말고, 힘을 모아 같이 도우며 살아보는 건 어떻겠나?' 손 아저씨가 밝은 얼굴로 다정한 포옹과 악수를 제안했습니다.",
      accentText: "서로 어려운 형편인 두 아저씨의 은혜로운 만남이었어요.",
      bgClass: "bg-purple-50"
    },
    {
      id: 8,
      title: "내가 자네의 튼튼한 다리가 되겠네",
      illustrationType: "son_carries_kil",
      narration: "길 아저씨가 울먹이며 물었어요. '하지만 나는 한 발자국도 걸을 수 없는데 어떻게 자네를 돕겠는가?' 손 아저씨는 늠름하게 어깨를 가리키며 답했어요. '나는 비록 눈은 감겼지만 두 다리와 어깨가 아주 가위바위보처럼 튼튼하네! 내가 자네를 등에 업고 다닐 테니, 자네는 나의 밝은 눈이 되어 세상을 밝혀주게!'",
      accentText: "“내가 자네의 튼튼한 다리가 될 테니, 내 눈이 되어주게나!”",
      bgClass: "bg-red-50"
    },
    {
      id: 9,
      title: "둘이서 하나가 된 세상 나들이",
      illustrationType: "running_together",
      narration: "그 감동적인 약속에 길 아저씨의 얼굴엔 해님 같은 미소가 퍼졌어요. 그날부로 손 아저씨는 튼튼한 등에 길 아저씨를 감싸 구부려 업었습니다. 그리고 길 아저씨는 높은 어깨 위에서 앞을 가리키며 맑고 똑바른 소리로 방향을 안내했지요. '자, 오른쪽으로 세 걸음!', '앞에 예쁜 돌다리가 있어 살살 가세!'. 그들은 한 몸처럼 신나게 세상을 향해 펄쩍 뛰어나갔어요.",
      accentText: "비가 오나 눈이 오나 둘은 완벽한 한 몸이 되어 살았어요.",
      bgClass: "bg-lime-50"
    },
    {
      id: 10,
      title: "멍석에 앉아 열심히 삼는 짚신",
      illustrationType: "making_straw_shoes",
      narration: "두 사람은 이 마을 저 마을로 다정하게 오가며 일을 도왔어요. 고마운 이웃집들이 일감을 건네주면, 멍석을 곱게 깔고 앉아 손가락이 부르트도록 집풀로 새끼줄을 꼬고 정성스레 한국 짚신을 삼았어요. 서로를 격려해가며 구슬땀을 흘리자 어느샌가 귀하고 예쁜 우리 공예품들이 빚어졌답니다.",
      accentText: "둘이 부지런히 새끼도 꼬고 짚신도 예쁘게 삼았습니다.",
      bgClass: "bg-amber-100"
    },
    {
      id: 11,
      title: "고품질 전통 도구와 영광스러운 자립",
      illustrationType: "making_tools",
      narration: "봄, 여름, 가을, 겨울 세월이 흘러 두 아저씨는 유명한 최고의 전통 장인이 되었답니다! 지게를 정성스레 나무로 다듬고, 바소쿠리와 봉태기를 짚으로 삼고, 거대한 멍석과 깨끗한 돗자리를 엮어 장터에 내놓았어요. 물건들이 어찌나 부드럽고 꼼꼼한지 모든 마을 사람들이 다투어 사 갔고, 자립하여 풍족한 생활을 가꾸게 되었어요.",
      accentText: "지게, 바소쿠리, 봉태기, 멍석을 만들어 당당히 자립했어요!",
      bgClass: "bg-amber-50"
    },
    {
      id: 12,
      title: "이웃 사촌으로 새긴 영원한 행복",
      illustrationType: "happy_ending_home",
      narration: "착하고 성실한 길 아저씨에게 반해 이웃 마을의 '숙이' 아가씨가 먼저 결혼을 하고 싶어 했고, 손 아저씨도 착한 마음씨가 소문나 단정한 '연이' 아가씨를 아내로 맞아 가정을 꾸렸어요. 두 아저씨는 나란히 집을 짓고 함께 도우며 아름다운 기적을 일구어냈답니다. 평화와 행복 속에 영원히 사랑을 나누며 살았답니다.",
      accentText: "협동과 배려로 탄탄한 기적을 완성하고, 행복한 가정을 꾸렸어요.",
      bgClass: "bg-emerald-50"
    }
  ];

  // Configure SpeechSynthesis on load
  useEffect(() => {
    if ("speechSynthesis" in window) {
      // Clear any remaining speech
      window.speechSynthesis.cancel();
    }
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Update speech synthesis when page changes
  useEffect(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);

      const text = storySlides[currentPage].narration;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ko-KR";
      utterance.rate = 1.0;
      
      utterance.onend = () => {
        setIsPlayingAudio(false);
      };
      
      utterance.onerror = () => {
        setIsPlayingAudio(false);
      };

      setSpeechUtterance(utterance);
    }
  }, [currentPage]);

  const handleToggleVoice = () => {
    if (!speechUtterance) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.speak(speechUtterance);
      setIsPlayingAudio(true);
    }
  };

  const handleNext = () => {
    if (currentPage < storySlides.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentPage(0);
  };

  // Safe renderer for custom SVG vector scenes
  const renderSVGIllustration = (type: string) => {
    switch (type) {
      case "kil_in_room":
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full max-h-[220px] rounded-lg bg-orange-100/40 border border-amber-200">
            {/* Background elements */}
            <rect x="10" y="10" width="380" height="280" rx="15" fill="#FFFBEB" stroke="#E2E8F0" strokeWidth="2" />
            <line x1="10" y1="210" x2="390" y2="210" stroke="#F59E0B" strokeWidth="4" />
            {/* Window */}
            <rect x="250" y="40" width="100" height="90" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
            <line x1="300" y1="40" x2="300" y2="130" stroke="#D97706" strokeWidth="1.5" />
            <line x1="250" y1="85" x2="350" y2="85" stroke="#D97706" strokeWidth="1.5" />
            <circle cx="310" cy="85" r="4" fill="#D97706" />
            {/* Traditional Korean Mat */}
            <ellipse cx="160" cy="235" rx="100" ry="25" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
            {/* Sad main character (Kil in room, crying/sitting) */}
            <g transform="translate(110, 100)">
              {/* Sitting legs folded */}
              <path d="M 10 110 C 10 110, 30 130, 90 120 C 100 110, 110 80, 70 80 C 50 80, 20 80, 10 110 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
              {/* Torso */}
              <ellipse cx="65" cy="70" rx="25" ry="35" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />
              {/* Traditional Korean Collar (Jeogori) */}
              <path d="M 50 45 L 65 65 L 80 45" fill="none" stroke="#64748B" strokeWidth="2" />
              <path d="M 62 65 L 60 90" fill="none" stroke="#64748B" strokeWidth="2" />
              {/* Head with black traditional hair */}
              <circle cx="65" cy="25" r="22" fill="#FEE2E2" stroke="#475569" strokeWidth="1.5" />
              <path d="M 43 22 C 43 10, 87 10, 87 22 C 87 25, 43 25, 43 22" fill="#334155" />
              {/* Korean Topknot Headband */}
              <rect x="44" y="24" width="42" height="4" fill="#1E293B" />
              {/* Sad face details */}
              <path d="M 55 24 Q 60 21 61 24" stroke="#475569" strokeWidth="2" fill="none" />
              <path d="M 75 24 Q 70 21 69 24" stroke="#475569" strokeWidth="2" fill="none" />
              <circle cx="58" cy="29" r="1.5" fill="#475569" />
              <circle cx="72" cy="29" r="1.5" fill="#475569" />
              <path d="M 61 38 Q 65 34 69 38" stroke="#EF4444" strokeWidth="2" fill="none" /> {/* Tears */}
              <line x1="58" y1="31" x2="58" y2="40" stroke="#60A5FA" strokeWidth="2" />
              <line x1="72" y1="31" x2="72" y2="40" stroke="#60A5FA" strokeWidth="2" />
            </g>
            <text x="250" y="270" textAnchor="middle" className="text-xs font-sans text-amber-800 font-medium bg-amber-100 px-3 py-1 rounded">
              방 안에 누운 길 아저씨
            </text>
          </svg>
        );
      case "son_with_cane":
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full max-h-[220px] rounded-lg bg-teal-100/40 border border-teal-200">
            <rect x="10" y="10" width="380" height="280" rx="15" fill="#F0FDFA" stroke="#CCFBF1" strokeWidth="2" />
            {/* Ground */}
            <path d="M 10 230 Q 200 210 390 230" fill="none" stroke="#2DD4BF" strokeWidth="3" />
            {/* Little plant */}
            <path d="M 50 220 Q 55 190 65 190 Q 75 190 80 220" fill="none" stroke="#14B8A6" strokeWidth="2" />
            {/* Blind Son character walking */}
            <g transform="translate(170, 70)">
              {/* Leg 1 */}
              <line x1="50" y1="110" x2="40" y2="150" stroke="#115E59" strokeWidth="4.5" />
              <line x1="40" y1="150" x2="30" y2="151" stroke="#2DD4BF" strokeWidth="3" />
              {/* Leg 2 */}
              <line x1="70" y1="110" x2="80" y2="150" stroke="#115E59" strokeWidth="4.5" />
              <line x1="80" y1="150" x2="90" y2="151" stroke="#2DD4BF" strokeWidth="3" />
              {/* Body */}
              <ellipse cx="60" cy="80" rx="20" ry="35" fill="#F0FDFA" stroke="#14B8A6" strokeWidth="2" />
              {/* Head */}
              <circle cx="60" cy="35" r="18" fill="#FFE4E6" stroke="#475569" strokeWidth="1.5" />
              {/* Hair */}
              <path d="M 42 35 C 42 20, 78 20, 78 35" fill="#3D405B" />
              {/* Close Eyes (sleeping/blind line art) */}
              <path d="M 50 35 Q 54 38 56 35" stroke="#475569" strokeWidth="2" fill="none" />
              <path d="M 64 35 Q 66 38 70 35" stroke="#475569" strokeWidth="2" fill="none" />
              <path d="M 56 46 Q 60 41 64 46" stroke="#14B8A6" strokeWidth="1.5" fill="none" />
              {/* Cane */}
              <line x1="25" y1="60" x2="10" y2="150" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
              {/* Arm holding cane */}
              <path d="M 50 70 Q 30 65 25 60" fill="none" stroke="#FFE4E6" strokeWidth="5" strokeLinecap="round" />
            </g>
            <text x="200" y="270" textAnchor="middle" className="text-xs font-sans text-teal-800 font-medium">
              더듬더듬 지팡이 짚는 손 아저씨
            </text>
          </svg>
        );
      case "sad_crisis":
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full max-h-[220px] rounded-lg bg-stone-200/40 border border-stone-300">
            <rect x="10" y="10" width="380" height="280" rx="15" fill="#FAF9F6" stroke="#E7E5E4" strokeWidth="2" />
            {/* Raining lines for sad atmosphere */}
            <line x1="40" y1="20" x2="30" y2="70" stroke="#D6D3D1" strokeWidth="1" />
            <line x1="120" y1="30" x2="110" y2="80" stroke="#D6D3D1" strokeWidth="1" />
            <line x1="280" y1="20" x2="270" y2="70" stroke="#D6D3D1" strokeWidth="1" />
            <line x1="340" y1="40" x2="330" y2="90" stroke="#D6D3D1" strokeWidth="1" />
            {/* Character sitting curled up with head down */}
            <g transform="translate(150, 90)">
              <rect x="0" y="0" width="100" height="100" rx="50" fill="#E7E5E4" opacity="0.3" />
              {/* Sad Curled Human */}
              <path d="M 20 80 Q 20 40 50 40 Q 80 40 80 80" fill="none" stroke="#78716C" strokeWidth="3" />
              <circle cx="50" cy="30" r="15" fill="#FFE4E6" stroke="#78716C" strokeWidth="2" />
              <path d="M 40 18 C 40 10, 60 10, 60 18" fill="#44403C" stroke="#78716C" />
            </g>
            <text x="200" y="240" textAnchor="middle" className="text-xs font-sans text-stone-600 italic">
              부모님이 돌아가신 쓸쓸한 초가집 안
            </text>
          </svg>
        );
      case "son_begging":
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full max-h-[220px] rounded-lg bg-yellow-105 border border-yellow-200">
            <rect x="10" y="10" width="380" height="280" rx="15" fill="#FEFDF0" stroke="#FEF08A" strokeWidth="2" />
            {/* Ground */}
            <line x1="10" y1="220" x2="390" y2="220" stroke="#EAB308" strokeWidth="2" />
            {/* Gourd bowl on the ground */}
            <path d="M 130 200 C 130 200, 140 220, 160 220 C 180 220, 190 200, 190 200 Z" fill="#D97706" stroke="#92400E" strokeWidth="2" />
            {/* Begging symbol */}
            <circle cx="160" cy="180" r="10" fill="#FEF08A" opacity="0.7" />
            <text x="160" y="184" textAnchor="middle" className="text-xs font-bold text-amber-700">밥</text>
            {/* Son figure leaning over */}
            <g transform="translate(230, 70)">
              {/* Body bent */}
              <path d="M 10 110 Q -20 60, 10 40 Q 40 40, 50 110" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="2" />
              <circle cx="20" cy="20" r="15" fill="#FFE4E6" stroke="#854D0E" strokeWidth="1.5" />
              {/* Hands holding stick */}
              <line x1="0" y1="50" x2="-20" y2="120" stroke="#78350F" strokeWidth="3" />
            </g>
            <text x="140" y="260" className="text-xs font-sans text-amber-800">바가지에 담긴 소중한 밥 한끼</text>
          </svg>
        );
      case "halmoni_clue":
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full max-h-[220px] rounded-lg bg-orange-100/40 border border-orange-200">
            <rect x="10" y="10" width="380" height="280" rx="15" fill="#FFF7ED" stroke="#FFEDD5" strokeWidth="2" />
            {/* Large Jujube tree (대추나무) */}
            <g transform="translate(40, 30)">
              <rect x="35" y="100" width="15" height="100" fill="#9A3412" />
              <circle cx="25" cy="80" r="35" fill="#15803D" />
              <circle cx="60" cy="70" r="40" fill="#166534" />
              <circle cx="35" cy="50" r="30" fill="#14532D" />
              {/* Jujube fruits (Red dots) */}
              <circle cx="20" cy="75" r="4.5" fill="#991B1B" />
              <circle cx="35" cy="85" r="4.5" fill="#991B1B" />
              <circle cx="15" cy="60" r="4.5" fill="#991B1B" />
              <circle cx="50" cy="55" r="4.5" fill="#991B1B" />
              <circle cx="65" cy="80" r="4.5" fill="#991B1B" />
            </g>
            {/* Grandmother figure talks */}
            <g transform="translate(230, 80)">
              {/* Back crouched (elderly) */}
              <path d="M 40 120 C 40 120, 20 80, 50 60 C 80 40, 90 80, 80 120 Z" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="2" />
              {/* Head with gray hair in a bun (Jjokmeori) */}
              <circle cx="65" cy="35" r="16" fill="#FFE4E6" stroke="#9CA3AF" strokeWidth="1.5" />
              <circle cx="65" cy="19" r="16" fill="#E5E7EB" /> {/* Gray hair top */}
              <circle cx="79" cy="27" r="5" fill="#9CA3AF" /> {/* Bun */}
              {/* Stick */}
              <line x1="45" y1="65" x2="30" y2="135" stroke="#78350F" strokeWidth="2.5" />
            </g>
            <text x="210" y="260" className="text-xs font-sans text-orange-850 font-bold bg-orange-100 px-2 py-0.5 rounded">
              대추나무 집 가마솥 굴뚝과 정겨운 할머니
            </text>
          </svg>
        );
      case "lightbulb":
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full max-h-[220px] rounded-lg bg-blue-100/40 border border-blue-200">
            <rect x="10" y="10" width="380" height="280" rx="15" fill="#EFF6FF" stroke="#DBEAFE" strokeWidth="2" />
            <g transform="translate(200, 120)">
              {/* Sparkles effect */}
              <circle cx="0" cy="0" r="45" fill="#FDE047" opacity="0.2" />
              <path d="M 0 -70 L 0 -50 M 0 50 L 0 70 M -70 0 L -50 0 M 50 0 L 70 0" stroke="#EAB308" strokeWidth="3" strokeLinecap="round" />
              <path d="M -45 -45 L -35 -35 M 45 45 L 35 35 M -45 45 L -35 35 M 45 -45 L 35 -35" stroke="#EAB308" strokeWidth="3" strokeLinecap="round" />
              {/* Gourd and ideas */}
              <circle cx="0" cy="-5" r="28" fill="#FEF08A" stroke="#CA8A04" strokeWidth="3" />
              <path d="M -15 15 L 15 15 L 10 32 L -10 32 Z" fill="#D1D5DB" stroke="#4B5563" strokeWidth="2" />
              <path d="M -8 32 H 8" stroke="#1F2937" strokeWidth="4" />
              <path d="M -4 38 H 4" stroke="#1F2937" strokeWidth="4" />
            </g>
            <text x="200" y="240" textAnchor="middle" className="text-sm font-sans font-extrabold text-blue-800">
              슬기로운 반짝임! "아하! 서로 도우면 되겠구나!"
            </text>
          </svg>
        );
      case "meet_together":
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full max-h-[220px] rounded-lg bg-purple-100/40 border border-purple-200">
            <rect x="10" y="10" width="380" height="280" rx="15" fill="#FAF5FF" stroke="#F1F5F9" strokeWidth="2" />
            {/* Heart symbol of sympathy */}
            <path d="M 200 80 C 180 50, 150 70, 200 110 C 250 70, 220 50, 200 80 Z" fill="#EC4899" opacity="0.8" />
            {/* Dialogue bubble */}
            <rect x="25" y="120" width="130" height="40" rx="10" fill="#FFFFFF" stroke="#C084FC" strokeWidth="2" />
            <polygon points="120,160 120,170 140,160" fill="#FFFFFF" stroke="#C084FC" strokeWidth="2" />
            <text x="90" y="144" textAnchor="middle" className="text-xs font-sans font-bold text-purple-700">같이 도우며 살세!</text>
            
            {/* Two icons meeting */}
            <g transform="translate(130, 150)">
              <circle cx="20" cy="10" r="16" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
              <text x="20" y="14" textAnchor="middle" className="text-xs font-bold text-red-600">길</text>
            </g>
            <g transform="translate(230, 150)">
              <circle cx="20" cy="10" r="16" fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="2" />
              <text x="20" y="14" textAnchor="middle" className="text-xs font-bold text-sky-600">손</text>
            </g>
            <path d="M 166 160 Q 200 140 234 160" fill="none" stroke="#A855F7" strokeWidth="3" strokeDasharray="3" />
            <text x="200" y="270" textAnchor="middle" className="text-xs font-sans text-purple-800 font-medium">
              처음 만난 길 아저씨와 손 아저씨의 굳은 위로
            </text>
          </svg>
        );
      case "son_carries_kil":
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full max-h-[220px] rounded-lg bg-red-100/40 border border-red-200">
            <rect x="10" y="10" width="380" height="280" rx="15" fill="#FEF2F2" stroke="#FEE2E2" strokeWidth="2" />
            {/* Sun in background representing hope */}
            <circle cx="340" cy="50" r="22" fill="#F87171" opacity="0.8" />
            
            {/* Backside illustration representing piggyback */}
            <g transform="translate(140, 60)">
              {/* Son (Bottom carrying) */}
              <ellipse cx="60" cy="130" rx="20" ry="32" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
              <circle cx="60" cy="85" r="18" fill="#FFE4E6" stroke="#94A3B8" />
              {/* Kil (Top carried) */}
              <ellipse cx="60" cy="70" rx="18" ry="25" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
              <circle cx="60" cy="35" r="16" fill="#FFE2E2" stroke="#D97706" />
              {/* Supporting legs / arms */}
              <path d="M 40 110 Q 20 100 40 90" fill="none" stroke="#FEF3C7" strokeWidth="6" strokeLinecap="round" />
              <path d="M 80 110 Q 100 100 80 90" fill="none" stroke="#FEF3C7" strokeWidth="6" strokeLinecap="round" />
            </g>
            <text x="200" y="275" textAnchor="middle" className="text-xs font-sans font-bold text-red-800">
              “내가 자네의 다리가 되고, 자네가 나의 눈이 되어주게!”
            </text>
          </svg>
        );
      case "running_together":
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full max-h-[220px] rounded-lg bg-lime-100/40 border border-lime-200">
            <rect x="10" y="10" width="380" height="280" rx="15" fill="#F7FEE7" stroke="#ECFCCB" strokeWidth="2" />
            {/* Mountain trail path with butterflies */}
            <path d="M 10 240 Q 150 170 390 220" fill="none" stroke="#84CC16" strokeWidth="4" />
            
            {/* Butterfly */}
            <path d="M 280 60 Q 290 50 300 60 Q 310 50 320 60 L 300 80 Z" fill="#F59E0B" />
            
            <g transform="translate(150, 50)">
              {/* Carrying team walking proudly */}
              <ellipse cx="40" cy="120" rx="15" ry="28" fill="#F1F5F9" stroke="#475569" strokeWidth="1.5" />
              <ellipse cx="40" cy="75" r="14" fill="#FFE4E6" stroke="#475569" />
              {/* Kil pointing far */}
              <line x1="50" y1="75" x2="80" y2="60" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
              <circle cx="80" cy="60" r="3" fill="#FFE4E6" />
            </g>
            <text x="200" y="270" textAnchor="middle" className="text-xs font-sans text-lime-900 font-medium">
              풍경을 가리키며 동네를 신나게 누비는 두 영웅
            </text>
          </svg>
        );
      case "making_straw_shoes":
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full max-h-[220px] rounded-lg bg-amber-100/40 border border-amber-200">
            <rect x="10" y="10" width="380" height="280" rx="15" fill="#FFFBEB" stroke="#FEF3C7" strokeWidth="2" />
            {/* Traditional Meongseok (멍석) woven pattern background */}
            <ellipse cx="200" cy="180" rx="130" ry="40" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
            <line x1="100" y1="180" x2="300" y2="180" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3" />
            
            {/* Korean Straw shoes (짚신) on the mat */}
            <g transform="translate(150, 165)">
              <ellipse cx="20" cy="10" rx="16" ry="7" fill="#F3F4F6" stroke="#B45309" strokeWidth="2" />
              <line x1="10" y1="10" x2="30" y2="10" stroke="#B45309" strokeWidth="1" strokeDasharray="2" />
              <ellipse cx="60" cy="10" rx="16" ry="7" fill="#F3F4F6" stroke="#B45309" strokeWidth="2" />
              <line x1="50" y1="10" x2="70" y2="10" stroke="#B45309" strokeWidth="1" strokeDasharray="2" />
            </g>
            <text x="200" y="250" textAnchor="middle" className="text-xs font-sans text-amber-800 font-bold">
              멍석 위에 삼아놓은 아기자기한 국산 짚신
            </text>
          </svg>
        );
      case "making_tools":
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full max-h-[220px] rounded-lg bg-amber-50 border border-amber-200">
            <rect x="10" y="10" width="380" height="280" rx="15" fill="#FFFDF5" stroke="#FEE2E2" strokeWidth="2" />
            {/* Jige and wicker basket display */}
            <g transform="translate(60, 60)">
              {/* Jige (지게) */}
              <line x1="10" y1="20" x2="20" y2="140" stroke="#78350F" strokeWidth="4" />
              <line x1="40" y1="20" x2="50" y2="140" stroke="#78350F" strokeWidth="4" />
              <line x1="14" y1="50" x2="43" y2="50" stroke="#78350F" strokeWidth="4.5" />
              <line x1="17" y1="90" x2="47" y2="90" stroke="#78350F" strokeWidth="4.5" />
              {/* Jige branches */}
              <line x1="43" y1="50" x2="70" y2="80" stroke="#78350F" strokeWidth="4" />
              <line x1="14" y1="50" x2="-10" y2="80" stroke="#78350F" strokeWidth="4" />
            </g>
            
            <g transform="translate(230, 80)">
              {/* Basket (바소쿠리) */}
              <ellipse cx="40" cy="60" rx="35" ry="25" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
              <path d="M 5 60 C 5 80, 75 80, 75 60 Z" fill="#FCD34D" stroke="#B45309" strokeWidth="1.5" />
              <circle cx="40" cy="48" r="5" fill="#9A3412" />
              <circle cx="55" cy="45" r="5" fill="#15803D" />
              <circle cx="25" cy="46" r="5" fill="#1e3a8a" />
            </g>
            <text x="200" y="250" textAnchor="middle" className="text-xs font-sans text-amber-900 font-bold">
              주인공들이 갓 만든 전통 지게와 둥그런 바소쿠리
            </text>
          </svg>
        );
      case "happy_ending_home":
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full max-h-[220px] rounded-lg bg-emerald-100/40 border border-emerald-200">
            <rect x="10" y="10" width="380" height="280" rx="15" fill="#ECFDF5" stroke="#D1FAE5" strokeWidth="2" />
            {/* Twin houses (새 기와집 나란히) */}
            <g transform="translate(60, 80)">
              {/* House 1 */}
              <rect x="10" y="40" width="100" height="60" fill="#FFF" stroke="#6B7280" strokeWidth="2" />
              {/* Roof (Giwa style) */}
              <path d="M 0 40 Q 60 10 120 40 Z" fill="#4B5563" stroke="#1F2937" strokeWidth="2" />
              <text x="60" y="75" textAnchor="middle" className="text-xs font-sans font-semibold text-slate-800">길 아저씨댁</text>
            </g>
            <g transform="translate(220, 80)">
              {/* House 2 */}
              <rect x="10" y="40" width="100" height="60" fill="#FFF" stroke="#6B7280" strokeWidth="2" />
              {/* Roof */}
              <path d="M 0 40 Q 60 10 120 40 Z" fill="#374151" stroke="#111827" strokeWidth="2" />
              <text x="60" y="75" textAnchor="middle" className="text-xs font-sans font-semibold text-slate-800">손 아저씨댁</text>
            </g>
            {/* Rainbow */}
            <path d="M 50 50 Q 200 -10 350 50" fill="none" stroke="#F43F5E" strokeWidth="2" opacity="0.5" />
            <path d="M 60 50 Q 200 5 340 50" fill="none" stroke="#10B981" strokeWidth="2" opacity="0.5" />
            <path d="M 70 50 Q 200 20 330 50" fill="none" stroke="#3B82F6" strokeWidth="2" opacity="0.5" />
            <text x="200" y="240" textAnchor="middle" className="text-xs font-sans font-black text-emerald-800">
              서로 돕고 사랑하며 맺은 최고의 행복
            </text>
          </svg>
        );
      default:
        return null;
    }
  };

  const activeSlide = storySlides[currentPage];

  return (
    <div id="storybook-container" className="flex flex-col h-full bg-amber-50/20 rounded-3xl p-4 sm:p-6 border border-amber-100 shadow-xl max-w-4xl mx-auto">
      {/* Upper Navigation Row */}
      <div className="flex justify-between items-center mb-4 bg-amber-100/60 p-3 rounded-2xl border border-amber-200">
        <div className="flex items-center gap-2">
          <BookOpen className="text-amber-700 w-5 h-5 animate-pulse" />
          <h2 className="text-base sm:text-lg font-sans font-bold text-slate-800">
            길아저씨 손아저씨 동화책방
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
          {/* TTS Speaker Toggle Button */}
          <button
            onClick={handleToggleVoice}
            className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-sans font-semibold transition-all shadow ${
              isPlayingAudio 
                ? "bg-red-500 text-white border-red-600 animate-bounce" 
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
            title="동화 내용 우리말로 청취하기"
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>듣기 멈춤</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-amber-700" />
                <span>이야기 듣기</span>
              </>
            )}
          </button>
          
          <button 
            onClick={handleReset}
            className="p-2 rounded-xl bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 text-xs flex items-center gap-1 shadow"
            title="처음부터 읽기"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">처음으로</span>
          </button>
        </div>
      </div>

      {/* Main Book Visual Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-inner flex-grow items-center">
        {/* Left column: SVG illustration slide-out theater */}
        <div className="flex flex-col items-center justify-center bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden min-h-[250px]">
          {/* Decorative frame overlay */}
          <div className="absolute top-2 left-2 flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          
          <div className="absolute top-2 right-2 text-[10px] font-mono text-slate-400">
            Page {activeSlide.id} / {storySlides.length}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.95, rotate: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full flex justify-center items-center py-2"
            >
              {renderSVGIllustration(activeSlide.illustrationType)}
            </motion.div>
          </AnimatePresence>

          {/* Slogan Banner */}
          <div className="mt-3 bg-amber-50/80 px-3 py-1.5 rounded-lg border border-amber-200/50 text-center w-full">
            <p className="text-xs font-sans font-bold text-amber-800 leading-tight">
              {activeSlide.accentText}
            </p>
          </div>
        </div>

        {/* Right column: Texts & Details */}
        <div className="flex flex-col justify-between h-full min-h-[220px] py-2">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="bg-amber-100 text-amber-800 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full">
                제 {currentPage + 1} 장
              </span>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs font-bold text-slate-500 font-sans">
                {activeSlide.title}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-slate-700 font-sans text-[14px] sm:text-base leading-relaxed text-justify indent-4 whitespace-pre-line tracking-wide">
                  {activeSlide.narration}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Educational Theme Highlighter */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span className="text-[11px] font-sans font-bold text-rose-600">
                따뜻한 깨달음의 가치 : 협동과 배려
              </span>
            </div>
            
            <div className="text-[11px] font-sans font-semibold text-slate-400">
              한국 아동문학의 거장 권정생 작가의 감동작
            </div>
          </div>
        </div>
      </div>

      {/* Slide Controllers Bottom Row */}
      <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 justify-between bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
        {/* Pagination Dots */}
        <div className="flex gap-1.5 flex-wrap justify-center max-w-[200px] sm:max-w-none">
          {storySlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentPage === idx 
                  ? "bg-amber-600 w-6" 
                  : "bg-slate-200 hover:bg-slate-350"
              }`}
              title={`Page ${idx + 1}`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-bold flex items-center gap-1 transition shadow border ${
              currentPage === 0
                ? "bg-slate-50 text-slate-350 border-slate-100 cursor-not-allowed shadow-none"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>이전 페이지</span>
          </button>

          {currentPage === storySlides.length - 1 ? (
            <button
              onClick={onNavigateToTools}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-bold bg-amber-600 text-white border border-amber-700 hover:bg-amber-700 transition flex items-center gap-1 shadow animate-pulse"
            >
              <span>전통 도구 공부하기</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-bold bg-amber-500 text-white border border-amber-600 hover:bg-amber-600 transition flex items-center gap-1 shadow"
            >
              <span>다음 페이지</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation Shortcut Panels */}
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        <button
          onClick={onNavigateToTools}
          className="bg-amber-50 hover:bg-amber-100 text-amber-800 p-2 text-center rounded-xl text-[11px] font-sans font-bold border border-amber-200/50 transition flex items-center justify-center gap-1"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>옛날 도구전</span>
        </button>
        <button
          onClick={onNavigateToIdioms}
          className="bg-teal-50 hover:bg-teal-100 text-teal-800 p-2 text-center rounded-xl text-[11px] font-sans font-bold border border-teal-250 transition flex items-center justify-center gap-1"
        >
          <Users className="w-3.5 h-3.5" />
          <span>속담·사자성어</span>
        </button>
        <button
          onClick={onNavigateToQuiz}
          className="bg-indigo-50 hover:bg-indigo-100 text-indigo-800 p-2 text-center rounded-xl text-[11px] font-sans font-bold border border-indigo-250 transition flex items-center justify-center gap-1"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>줄거리 OX</span>
        </button>
      </div>
    </div>
  );
}
