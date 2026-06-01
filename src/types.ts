/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StoryPage {
  id: number;
  pageNum: number;
  text: string;
  illustrationPrompt: string;
  imageKey: string;
  fallbackGradient: string;
  theme: string;
}

export interface TraditionalTool {
  id: string;
  name: string;
  pronunciation?: string;
  description: string;
  detailedUsage: string;
  howItMade: string;
  imageKey: string;
  historicalValue: string;
  funFact: string;
}

export interface ProverbChallenge {
  id: number;
  stageName: string;
  storyContext: string;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  category: "proverb" | "idiom";
  clue: string;
  moral: string;
}

export interface OxQuizQuestion {
  id: number;
  question: string;
  isCorrect: boolean; // true for O, false for X
  explanation: string;
  characterReaction: {
    correct: string;
    incorrect: string;
  };
}
