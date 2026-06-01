/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  Smile, 
  HelpCircle, 
  Check, 
  X, 
  Award, 
  ArrowRight, 
  RotateCcw,
  BookOpen,
  Sparkles,
  PartyPopper
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface OxQuizProps {
  onNavigateToStory: () => void;
  onNavigateToTools: () => void;
  onNavigateToIdioms: () => void;
}

interface OxQuestion {
  id: number;
  question: string;
  isCorrect: boolean; // true for O, false for X
  explanation: string;
  characterIdea: string;
}

export default function OxQuiz({ 
  onNavigateToStory, 
  onNavigateToTools, 
  onNavigateToIdioms 
}: OxQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [answeredLog, setAnsweredLog] = useState<{ id: number; wasCorrect: boolean }[]>([]);

  const questions: OxQuestion[] = [
    {
      id: 1,
      question: "동화 속에서 윗마을 '길 아저씨'는 태어날 때부터 앞을 전혀 보지 못하는 눈장애가 있었습니다. 맞으면 O, 틀리면 X!",
      isCorrect: false,
      explanation: "틀렸습니다! 두 다리를 전혀 못 써서 방안에 갇혀 지냈던 아저씨는 '길 아저씨'이며, 태어날 때부터 눈이 보이지 않았던 아저씨는 아랫마을의 '손 아저씨'입니다.",
      characterIdea: "두 아저씨의 역할을 똑똑히 구분해 기억하는 것이 첫걸음이에요!"
    },
    {
      id: 2,
      question: "보지 못하는 '손 아저씨'가 걸을 수 없는 '길 아저씨'의 소식을 듣고 먼저 가슴 뜨겁게 직접 찾아갔습니다. 맞으면 O, 틀리면 X!",
      isCorrect: true,
      explanation: "정답입니다! 대추나무 집 할머님께 길 아저씨의 가슴 아픈 사정을 전해 들은 손 아저씨가, 우리가 함께 만나 돕자며 선뜻 길 아저씨네 집으로 달려갔답니다.",
      characterIdea: "대추나무 집 할머니의 소중한 소식 한 문장이 멋진 우정의 시작이었어요!"
    },
    {
      id: 3,
      question: "두 아저씨는 짚신도 꼬고 지게와 멍석도 솜씨 좋게 만들며 스스로 명 장인으로 자립하여 밥 구걸을 끊어 냈습니다. 맞으면 O, 틀리면 X!",
      isCorrect: true,
      explanation: "정답입니다! 두 아저씨는 기적처럼 힘을 합쳐 한 몸뚱이가 된 채로, 이 따금 들어오는 일거리에서 최고의 전통 수공예 솜씨를 닦아 훌륭한 고귀한 자립을 일궈냈습니다.",
      characterIdea: "스스로 일하는 부지런함이야말로 두 사람이 가꾼 기적의 보석이에요!"
    },
    {
      id: 4,
      question: "두 아저씨들이 밤낮으로 정교하게 제작한 '지게, 바소쿠리, 멍석'들이 엉성하고 형편없어 사람들에게 전혀 팔리지 못했습니다. 맞으면 O, 틀리면 X!",
      isCorrect: false,
      explanation: "틀렸습니다! 두 아저씨들이 밤낮을 흐리며 가꾼 새끼꼬기와 짚 소형 공예품들은 어찌나 꼼꼼하고 완성도가 높은 명품인지 온 마을 주민들이 장터에서 다투어 사갔지요.",
      characterIdea: "정성이 가득 실린 물건이라서 온 동네에 아주 유명함 가득했답니다."
    },
    {
      id: 5,
      question: "이 가슴 울리는 동화가 독자 어린이들에게 전하는 가장 소중한 평화의 메시지는 바로 사소한 '협동'과 상상 속 '배려'의 정신입니다. 맞으면 O, 틀리면 X!",
      isCorrect: true,
      explanation: "정답입니다! 혼자서는 캄캄하고 일어서지도 못해 울었지만, 서로를 향한 배려 깊은 등내어줌과 눈채워줌으로 장벽을 부수고 큰 행복을 성취하는 상생 협동의 참된 기쁨을 일깨워줘요.",
      characterIdea: "너와 내가 한마음으로 보듬아 안아 걸으면 기적이 피어난답니다."
    }
  ];

  const activeQ = questions[currentQuestion];

  const handleAnswer = (answer: boolean) => {
    if (userAnswer !== null) return; // Answer locked once clicked

    setUserAnswer(answer);
    setShowFeedback(true);
    
    const wasCorrect = answer === activeQ.isCorrect;
    
    if (wasCorrect) {
      setScore(prev => prev + 20);
    }

    setAnsweredLog(prev => [...prev, { id: activeQ.id, wasCorrect }]);
  };

  const handleNext = () => {
    setUserAnswer(null);
    setShowFeedback(false);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setUserAnswer(null);
    setScore(0);
    setShowFeedback(false);
    setQuizFinished(false);
    setAnsweredLog([]);
  };

  return (
    <div id="ox-quiz-container" className="flex flex-col h-full bg-[#1e293b] rounded-3xl p-4 sm:p-6 text-white border-4 border-[#334155] shadow-2xl max-w-4xl mx-auto">
      
      {/* Blackboard wooden chalk rail top panel */}
      <div className="flex justify-between items-center mb-5 bg-[#334155] p-3 rounded-2xl border border-slate-600 shadow-inner">
        <div className="flex items-center gap-2">
          <Smile className="text-yellow-400 w-5.5 h-5.5 animate-spin-slow" />
          <h2 className="text-sm sm:text-base font-black font-sans text-slate-100">
            길아저씨 손아저씨 영재 학술 퀴즈
          </h2>
        </div>
        <div className="text-xs bg-[#1e293b] px-3.5 py-1 rounded-xl border border-slate-600 font-bold text-yellow-300">
          획득 학사 학위: {score}점
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!quizFinished ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-grow space-y-5"
          >
            {/* Header progress bar */}
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 font-sans text-[11px] font-bold text-slate-400 flex items-center justify-between">
              <span>칠판 퀴즈 진전도</span>
              <span>{currentQuestion + 1} / {questions.length} 문항</span>
              <div className="flex gap-1">
                {questions.map((_, idx) => {
                  const logged = answeredLog[idx];
                  return (
                    <div
                      key={idx}
                      className={`w-4 h-4 rounded flex items-center justify-center text-[8px] font-bold ${
                        idx === currentQuestion
                          ? "bg-yellow-400 text-slate-900"
                          : logged
                            ? logged.wasCorrect
                              ? "bg-emerald-500 text-white"
                              : "bg-rose-500 text-white"
                            : "bg-slate-700 text-slate-500"
                      }`}
                    >
                      {idx + 1}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Question display card */}
            <div className="bg-[#0f172a] p-5 sm:p-6 rounded-2xl border border-slate-700 shadow-md relative min-h-[160px] flex flex-col justify-center">
              <span className="bg-yellow-400/20 text-yellow-300 text-[10px] font-sans font-bold px-2.5 py-0.5 rounded-full border border-yellow-500/30 self-start mb-3">
                질문 {currentQuestion + 1}
              </span>
              <p className="text-slate-100 font-sans text-[14px] sm:text-[17px] leading-relaxed font-semibold text-justify whitespace-pre-line">
                {activeQ.question}
              </p>
              <div className="text-[11px] font-sans italic text-slate-400 mt-3 pt-3 border-t border-slate-800">
                💡 {activeQ.characterIdea}
              </div>
            </div>

            {/* Large O and X action buttons */}
            <div className="grid grid-cols-2 gap-5 pt-2">
              <button
                onClick={() => handleAnswer(true)}
                disabled={userAnswer !== null}
                className={`py-4 rounded-2xl border-2 transition font-sans text-xl sm:text-2xl font-black flex flex-col items-center gap-1 shadow-lg ${
                  userAnswer !== null
                    ? activeQ.isCorrect === true
                      ? "bg-emerald-600 border-emerald-500 text-white"
                      : "bg-slate-800 border-slate-700 text-slate-600 opacity-40 cursor-not-allowed"
                    : "bg-emerald-850 hover:bg-emerald-800 border-emerald-600 hover:border-emerald-500 text-emerald-100 hover:scale-[1.02] transform"
                }`}
              >
                <span className="text-3xl sm:text-4xl">O</span>
                <span className="text-[11px] sm:text-xs">그렇습니다! (참)</span>
              </button>

              <button
                onClick={() => handleAnswer(false)}
                disabled={userAnswer !== null}
                className={`py-4 rounded-2xl border-2 transition font-sans text-xl sm:text-2xl font-black flex flex-col items-center gap-1 shadow-lg ${
                  userAnswer !== null
                    ? activeQ.isCorrect === false
                      ? "bg-rose-600 border-rose-500 text-white"
                      : "bg-slate-800 border-slate-700 text-slate-600 opacity-40 cursor-not-allowed"
                    : "bg-rose-950 hover:bg-rose-900 border-rose-700 hover:border-rose-650 text-rose-100 hover:scale-[1.02] transform"
                }`}
              >
                <span className="text-3xl sm:text-4xl">X</span>
                <span className="text-[11px] sm:text-xs">아닙니다! (거짓)</span>
              </button>
            </div>

            {/* Explanatory feedback */}
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl border text-xs sm:text-[13px] leading-relaxed relative ${
                  userAnswer === activeQ.isCorrect
                    ? "bg-emerald-950/80 text-emerald-200 border-emerald-700"
                    : "bg-rose-950/80 text-rose-200 border-rose-700"
                }`}
              >
                <span className="font-extrabold block text-[13px] sm:text-sm mb-1.5 flex items-center gap-1">
                  {userAnswer === activeQ.isCorrect ? "🙆‍♂️ 대단해요! 완벽한 정답입니다!" : "🙅‍♀️ 아쉬워요! 동화 내용을 다시 짚어봐요!"}
                </span>
                <p className="font-sans text-[12px] sm:text-[13px] leading-relaxed text-slate-300">
                  {activeQ.explanation}
                </p>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleNext}
                    className="px-4 py-1.5 rounded-lg bg-yellow-400 text-slate-950 font-bold hover:bg-yellow-500 text-xs transition flex items-center gap-1 shadow-md"
                  >
                    <span>{currentQuestion < questions.length - 1 ? "다음 문항 풀기" : "최종 학위 수여하기"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

          </motion.div>
        ) : (
          /* GRADUATION VIEW */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0f172a] p-6 rounded-2xl border border-slate-700 shadow-2xl text-center space-y-5"
          >
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-slate-800 border border-slate-700 relative">
                <Award className="w-16 h-16 text-yellow-400 animate-pulse" />
                <PartyPopper className="w-6 h-6 text-emerald-400 absolute top-1 right-1" />
              </div>
            </div>

            <div>
              <span className="text-[10px] sm:text-xs font-black bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full font-mono uppercase tracking-wider border border-yellow-500/30">
                명예 이야기 학위 수령서
              </span>
              <h1 className="text-xl sm:text-3xl font-black font-sans text-slate-100 mt-3">
                축하합니다! {score}점 획득!
              </h1>
              <p className="text-xs sm:text-[13px] text-slate-400 font-sans leading-relaxed mt-2.5 max-w-sm mx-auto">
                {score === 100 
                  ? "백점을 축하합니다! 동화 속 길 아저씨와 손 아저씨의 협동정신을 깊은 가치로 삼아내어 세상의 어두운 구석을 환희 밝혀줄 진정한 지존 학자가 되었습니다!"
                  : "훌륭한 도전이었습니다! 틀린 오답들은 도우며 살아가다 보면 지혜의 보석으로 재수정될 거예요. 고귀한 도전에 박수쳐요!"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-md mx-auto pt-2">
              <button
                onClick={handleRestart}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-sans font-bold text-xs transition flex items-center justify-center gap-1 border border-slate-600 shadow"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>다시 도전하기</span>
              </button>

              <button
                onClick={onNavigateToStory}
                className="py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-sans font-bold text-xs transition flex items-center justify-center gap-1 shadow"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>동화 다시 읽기</span>
              </button>

              <button
                onClick={onNavigateToIdioms}
                className="py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-sans font-bold text-xs transition flex items-center justify-center gap-1 shadow"
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>속담 교실 가기</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chalk tray chalk duster bottoms */}
      <div className="mt-8 pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
        <button
          onClick={onNavigateToStory}
          className="text-slate-400 hover:text-slate-100 font-bold flex items-center gap-1 font-sans"
        >
          <span>← 옛날 그림책 정기구독 방</span>
        </button>
        <button
          onClick={onNavigateToTools}
          className="text-yellow-400 hover:text-yellow-300 font-bold flex items-center gap-1 font-sans"
        >
          <span>지게와 멍석들 만물상전 가기 ←</span>
        </button>
      </div>

    </div>
  );
}
