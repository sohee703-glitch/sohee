/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  Trophy, 
  Sparkles, 
  Users, 
  PartyPopper,
  ArrowRight, 
  BookOpen, 
  ChevronRight, 
  HelpCircle,
  CheckCircle,
  XCircle,
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface IdiomsProps {
  onNavigateToStory: () => void;
  onNavigateToTools: () => void;
  onNavigateToQuiz: () => void;
}

interface QuestionStage {
  id: number;
  stageName: string;
  storyContext: string;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  clue: string;
  hancha?: string;
}

export default function IdiomQuiz({ 
  onNavigateToStory, 
  onNavigateToTools, 
  onNavigateToQuiz 
}: IdiomsProps) {
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const stages: QuestionStage[] = [
    {
      id: 1,
      stageName: "제 1문: 슬픔을 공유하는 순간",
      storyContext: "부모님을 한꺼번에 여의고 캄캄한 방안에 홀로 상처받아 남은 두 주인공 아저씨. 손 아저씨는 앞이 완전히 안 보여 외로웠고, 길 아저씨는 두 다리를 구부릴 수조차 없어 막막한 아픔을 겪고 있습니다. 이처럼 같은 아픔과 불쌍한 처지에 놓여있는 사람끼리 누구보다 서로의 고독을 한눈에 알아보며 '따뜻한 마음으로 불쌍히 여기며 끌어안아 위로함'을 뜻하는 훌륭한 사자성어는 무엇일까요?",
      question: "위 상황에 감동적으로 알맞은 사자성어를 골라보세요!",
      options: [
        {
          text: "동병상련 (同病相憐)",
          isCorrect: true,
          explanation: "동병상련(같은 동, 병들 병, 서로 상, 이웃여길 련)은 아픈 사람들끼리 누구보다 슬픔을 잘 공감하고 사랑으로 이겨나감을 일컬어요!"
        },
        {
          text: "작심삼일 (作心三일)",
          isCorrect: false,
          explanation: "작심삼일은 결심한 마음이 삼일 만에 맥없이 무너진다는 뜻으로 게으름을 질책하는 사자성어입니다."
        },
        {
          text: "유유자적 (悠悠自適)",
          isCorrect: false,
          explanation: "유유자적은 한가롭고 편안하게 자연을 지극히 만끽하며 근심 없이 산다는 뜻으로 지금의 위기극복과는 거리가 있습니다."
        },
        {
          text: "천고마비 (天高馬肥)",
          isCorrect: false,
          explanation: "천고마비는 가을 하늘이 드높고 말이 무르익어 살찐다는 가을철 날씨 묘사 문구입니다."
        }
      ],
      clue: "힌트: '아픔(病)을 같이(同) 겪는 이들끼리 서로(相) 불쌍히 여긴다(憐)'"
    },
    {
      id: 2,
      stageName: "제 2문: 등을 내어주는 감동의 협동",
      storyContext: "손 아저씨는 앞은 못 보지만 두 어깨가 바위처럼 힘차고 단단합니다. 길 아저씨는 걷지는 못하나 맑고 똑바른 길눈을 가지고 산천을 볼 수 있습니다. '내가 자네의 튼튼한 다리가 되어줄 테니 자네는 내 밝은 등대눈이 되어 다오!' 하며 힘을 멋지게 한데 모으자 기적이 완성되었어요. '아무리 미약한 종이 조각 한 장조차도 힘을 맞잡아 모으면 훨씬 더 수월하고 기적을 불러온다'는 조상의 영예로운 한국 속담은 무엇입니까?",
      question: "위 이야기의 핵심인 '협동'을 비유하는 알맞은 속담을 고르세요!",
      options: [
        {
          text: "등 잔 밑이 어둡다",
          isCorrect: false,
          explanation: "가까운 곳의 중요한 일을 오히려 눈치채지 못하고 헤맨다는 뜻의 은유 속담입니다."
        },
        {
          text: "백지장도 맞들면 낫다",
          isCorrect: true,
          explanation: "백지장도 맞들면 낫다는 한없이 연약한 한 조각의 하얀 백지조차 서로 양쪽을 마주 잡아 올리면 일을 백배 손쉽게 성취한다는 지혜의 금언입니다!"
        },
        {
          text: "소 잃고 외양간 고친다",
          isCorrect: false,
          explanation: "일이 다 파투나고 실패한 다음 허겁지겁 뒤늦게 수습해 소용없다는 안타까운 훈계입니다."
        },
        {
          text: "원숭이도 나무에서 떨어진다",
          isCorrect: false,
          explanation: "경험이 무구하고 아무리 똑똑한 천재 장인일지라도 가끔은 사소한 실수를 번복해 저지른다는 충고입니다."
        }
      ],
      clue: "힌트: 얇은 하얀 백지(紙)조차도 마주(對)들어야 힘이 벌어요!"
    },
    {
      id: 3,
      stageName: "제 3문: 이웃과 서로 성실히 상부상조하기",
      storyContext: "두 아저씨는 매일 멍석에 앉아 새끼를 질기게 꼬고, 바소쿠리와 튼튼한 지게를 하나씩 뚝딱 역어가기 시작했습니다. 이웃들은 아저씨들의 흘린 정성에 박수를 보냈고 번갈아가며 일감을 정답게 나누었어요. 우리 선조들이 농촌에서 품앗이를 가치 있게 하듯 '어려움에 처했을 때 양쪽이 따사롭게 비벼서 힘을 다해 양쪽을 부축하고 돕는다'는 평화로운 사자성어는 무엇일까요?",
      question: "서로 돕고 사는 공동체의 지혜를 담은 사자성어를 고르세요!",
      options: [
        {
          text: "우이독경 (牛耳讀經)",
          isCorrect: false,
          explanation: "쇠의 귀에 대고 아무리 소중한 경전을 읊어도 전혀 깨우치지 못한다는 뜻으로 전혀 소통되지 않는 고집불통을 일컬어요."
        },
        {
          text: "조삼모사 (朝三暮四)",
          isCorrect: false,
          explanation: "아침에 세 개, 저녁에 네 개로 눈앞에 사소한 잔꾀를 써서 어리석은 남을 기만하고 우롱한다는 뜻입니다."
        },
        {
          text: "상부상조 (相扶相助)",
          isCorrect: true,
          explanation: "상부상조는 서로(相) 부축하고(扶) 서로(相) 아름답게 구원해 나간다(助)는 뜻으로, 두 아저씨와 마을 사람들이 지켜낸 소중한 품앗이 정신입니다!"
        },
        {
          text: "아전인수 (我田引水)",
          isCorrect: false,
          explanation: "자기 눈 논물 대기처럼 오직 남들은 안중에 없고 자기 이기적인 욕심만 악착같이 챙긴다는 뜻입니다."
        }
      ],
      clue: "힌트: '서로 상(相)' 가 들어간 대표적인 한국 품앗이 예절!"
    },
    {
      id: 4,
      stageName: "제 4문: 땀 어린 수공예와 달콤한 자립",
      storyContext: "협동이라는 맑은 씨앗을 정성껏 심은 아저씨들. 오랜 노력 끝에 질 좋은 지게와 돗자리를 성실히 만들어 부자가 되었고, 숙이·연이 아가씨와 평화로운 기와집을 나란히 쌓아 장가들며 행복한 미솔 짓게 하였습니다. 이처럼 '괴롭고 눈물 겨운 골짜기 길을 참고 인내하며 헤쳐 나가면 마침내 온 동네가 환해지는 참되고 달콤한 행복이 반드시 피어난다'는 자연 진리를 가르쳐주는 사자성어는 무엇일까요?",
      question: "슬픈 나날 뒤 찾아온 위대한 해피엔딩에 어울리는 완성 사자성어를 고르세요!",
      options: [
        {
          text: "새옹지마 (塞翁之馬)",
          isCorrect: false,
          explanation: "변방 늙은이의 말 이야기로 인생사의 온갖 화복과 운세는 종잡을 수 없이 오고 감을 지칭합니다."
        },
        {
          text: "고진감래 (苦盡甘來)",
          isCorrect: true,
          explanation: "고진감래(쓸 고, 다할 진, 달 감, 올 래)는 매서운 고통(苦)과 시련이 눈물처럼 밤하늘에 기우면(盡), 비로소 햇님 가득 기쁘고 달디단 행복(甘)이 성실히 찾아온다(來)는 축복의 지혜입니다!"
        },
        {
          text: "동문서답 (東問西答)",
          isCorrect: false,
          explanation: "동쪽 길을 묻는데 엉뚱하게 서쪽 냇가 물살을 핑계 댄다는 동문서답은 어긋나거나 맞지 않는 얼토당토한 답변입니다."
        },
        {
          text: "일석이조 (一石二鳥)",
          isCorrect: false,
          explanation: "돌멩이 한 개로 연달아 새 두 마리를 단번에 사냥해 잡는 대단히 효율적인 일거양득 이익을 일컫는 문구입니다."
        }
      ],
      clue: "힌트: '클 고(苦)' 고통은 가고, '달 감(甘)' 단맛 행복이 다가와요!"
    }
  ];

  const currentChallenge = stages[currentStage];

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return; // Allow only one selection per stage
    
    setSelectedOption(index);
    setShowExplanation(true);
    
    if (currentChallenge.options[index].isCorrect) {
      setScore(prev => prev + 25);
    }
  };

  const handleNextStage = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    
    if (currentStage < stages.length - 1) {
      setCurrentStage(prev => prev + 1);
    } else {
      setIsGameOver(true);
    }
  };

  const handleRestart = () => {
    setCurrentStage(0);
    setSelectedOption(null);
    setScore(0);
    setShowExplanation(false);
    setIsGameOver(false);
  };

  return (
    <div id="idiom-quiz-container" className="flex flex-col h-full bg-[#FAF7F2] rounded-3xl p-4 sm:p-6 border-2 border-stone-200 shadow-xl max-w-4xl mx-auto">
      
      {/* Top Title Area */}
      <div className="flex justify-between items-center mb-5 bg-[#EDE8DC] p-3 rounded-2xl border border-stone-300">
        <div className="flex items-center gap-2">
          <BookOpen className="text-amber-800 w-5.5 h-0.5" />
          <h2 className="text-base sm:text-lg font-black font-sans text-stone-800">
            속담·사자성어 선비 서당
          </h2>
        </div>
        
        <div className="flex items-center gap-2 text-xs">
          <span className="bg-amber-800 text-white font-bold px-3 py-1 rounded-xl">
            누적 학식 점수: {score}냥
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isGameOver ? (
          <motion.div
            key={currentStage}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex-grow space-y-4"
          >
            {/* Progress indicator */}
            <div className="flex items-center justify-between text-xs font-sans font-bold text-stone-500 bg-white p-2.5 rounded-xl border border-stone-200">
              <span>서당 등급 시험단 진척</span>
              <span>{currentStage + 1} / {stages.length} 단계</span>
              <div className="flex gap-1">
                {stages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      idx === currentStage 
                        ? "bg-amber-700" 
                        : idx < currentStage 
                          ? "bg-stone-400" 
                          : "bg-stone-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Scenario Context Card */}
            <div className="bg-white p-4.5 sm:p-5 rounded-2xl border border-stone-200/85 shadow-sm space-y-3 relative overflow-hidden">
              <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded text-[10px] font-sans font-bold text-amber-800 border border-amber-200/50">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>장면 해설 대목</span>
              </div>

              <div className="text-xs font-bold text-slate-400 font-sans tracking-wide">
                {currentChallenge.stageName}
              </div>
              <p className="text-slate-700 font-sans text-[13px] sm:text-base leading-relaxed text-justify whitespace-pre-line bg-stone-50/50 p-3 rounded-lg border border-stone-100 italic">
                "{currentChallenge.storyContext}"
              </p>
              
              <div className="font-sans font-black text-xs sm:text-sm text-stone-800 pt-2 border-t border-dashed border-stone-200/60">
                {currentChallenge.question}
              </div>
            </div>

            {/* Answer Choices Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {currentChallenge.options.map((opt, index) => {
                const isSelected = selectedOption === index;
                const showCorrectColor = selectedOption !== null && opt.isCorrect;
                const showIncorrectColor = isSelected && !opt.isCorrect;
                
                let btnStyle = "bg-white hover:bg-stone-50 border-stone-200 text-stone-850";
                
                if (selectedOption !== null) {
                  if (opt.isCorrect) {
                    btnStyle = "bg-emerald-500 text-white border-emerald-600 font-extrabold";
                  } else if (isSelected) {
                    btnStyle = "bg-rose-500 text-white border-rose-600 font-bold-cross shadow-none";
                  } else {
                    btnStyle = "bg-stone-50 text-stone-400 border-stone-100 opacity-60 cursor-not-allowed";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(index)}
                    disabled={selectedOption !== null}
                    className={`p-3.5 rounded-xl border text-left transition text-xs sm:text-[13px] font-sans font-bold flex items-center justify-between shadow ${btnStyle}`}
                  >
                    <span className="leading-tight">{opt.text}</span>
                    {selectedOption !== null && (
                      opt.isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-white flex-shrink-0" />
                      ) : null
                    )}
                  </button>
                );
              })}
            </div>

            {/* Clue button before answering */}
            {selectedOption === null && (
              <div className="bg-yellow-50/80 px-3 py-2 rounded-xl border border-yellow-200 text-[11px] font-sans font-bold text-amber-800 text-center shadow-inner">
                {currentChallenge.clue}
              </div>
            )}

            {/* Interactive feedback card on Selection */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl border font-sans text-xs sm:text-[13px] leading-relaxed relative ${
                  currentChallenge.options[selectedOption!].isCorrect
                    ? "bg-emerald-50 text-emerald-900 border-emerald-250"
                    : "bg-rose-50 text-rose-900 border-rose-250"
                }`}
              >
                <div className="font-extrabold mb-1 flex items-center gap-1">
                  <span>{currentChallenge.options[selectedOption!].isCorrect ? "🎉 정답입니다! 축하드려요!" : "😭 오답이군요, 다음장을 넘겨 배워봐요!"}</span>
                </div>
                <p>{currentChallenge.options[selectedOption!].explanation}</p>
                
                {/* Next button inside explanation */}
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={handleNextStage}
                    className="px-4 py-1.5 rounded-lg bg-stone-800 text-white font-extrabold hover:bg-stone-900 text-xs transition flex items-center gap-1 shadow"
                  >
                    <span>{currentStage < stages.length - 1 ? "다음 문제 풀기" : "시험 결과 확인하기"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

          </motion.div>
        ) : (
          /* GAME OVER / RESULTS VIEW Part */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-2xl border border-stone-200 shadow-lg text-center space-y-5"
          >
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-amber-100">
                <Trophy className="w-14 h-14 text-amber-600 animate-bounce" />
              </div>
            </div>

            <div>
              <span className="text-[10px] sm:text-xs font-black bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-sans uppercase tracking-wider">
                서당 장원급제 등급 결과지
              </span>
              <h1 className="text-xl sm:text-2xl font-black font-sans text-stone-800 mt-2.5">
                선비님의 시험 점수: {score}점만점!
              </h1>
              <p className="text-xs sm:text-[13px] text-stone-500 font-sans leading-relaxed mt-2.5 max-w-sm mx-auto">
                {score === 100 
                  ? "훌륭하십니다! '길아저씨 손아저씨' 동화에 깃든 마음씨와 조상의 모든 한자 지혜를 완벽하게 정복해 장원급제하셨습니다!"
                  : "좋은 수양이었어요! 속담과 한자가 낯설었지만, 두 아저씨가 주신 백지장의 협동 정신을 가슴 깊이 간직하는 계기가 되었길 바라요."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-md mx-auto pt-2">
              <button
                onClick={handleRestart}
                className="py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-750 text-white font-sans font-black text-xs transition flex items-center justify-center gap-1 shadow"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>서당 시험 다시보기(재시험)</span>
              </button>
              
              <button
                onClick={onNavigateToQuiz}
                className="py-2.5 px-4 rounded-xl bg-indigo-650 hover:bg-indigo-750 text-white font-sans font-black text-xs transition flex items-center justify-center gap-1 shadow"
              >
                <PartyPopper className="w-3.5 h-3.5 text-yellow-300" />
                <span>줄거리 OX 테스트방 가기</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer shortcut rails */}
      <div className="mt-8 pt-4 border-t border-stone-200/50 flex justify-between items-center text-xs">
        <button
          onClick={onNavigateToStory}
          className="text-stone-500 hover:text-stone-800 font-bold flex items-center gap-1 font-sans"
        >
          <span>← 만화 동화책 보기</span>
        </button>
        <button
          onClick={onNavigateToTools}
          className="text-amber-800 hover:text-amber-900 font-bold flex items-center gap-1 font-sans"
        >
          <span>지게·멍석 옛날 가게 공부 ←</span>
        </button>
      </div>

    </div>
  );
}
