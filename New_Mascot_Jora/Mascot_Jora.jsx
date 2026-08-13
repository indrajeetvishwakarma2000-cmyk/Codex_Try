import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const EXPRESSIONS = {
  idle: {
    emoji: "🦉",
    eyes: "normal",
    mouth: "smile",
    color: "#6C3CE1",
    bgGlow: "rgba(108, 60, 225, 0.15)",
    message: "",
  },
  thinking: {
    emoji: "🤔",
    eyes: "squint",
    mouth: "hmm",
    color: "#6C3CE1",
    bgGlow: "rgba(108, 60, 225, 0.2)",
    message: "Hmm, let me think...",
  },
  correct: {
    emoji: "🎉",
    eyes: "star",
    mouth: "big-smile",
    color: "#10B981",
    bgGlow: "rgba(16, 185, 129, 0.2)",
    message: "",
  },
  wrong: {
    emoji: "💡",
    eyes: "encouraging",
    mouth: "smile",
    color: "#F97316",
    bgGlow: "rgba(249, 115, 22, 0.18)",
    message: "",
  },
  victory: {
    emoji: "🏆",
    eyes: "heart",
    mouth: "open-smile",
    color: "#F59E0B",
    bgGlow: "rgba(245, 158, 11, 0.25)",
    message: "",
  },
  failed: {
    emoji: "💪",
    eyes: "determined",
    mouth: "smile",
    color: "#F59E0B",
    bgGlow: "rgba(245, 158, 11, 0.2)",
    message: "",
  },
  loading: {
    emoji: "⏳",
    eyes: "normal",
    mouth: "smile",
    color: "#6C3CE1",
    bgGlow: "rgba(108, 60, 225, 0.15)",
    message: "Generating your quiz...",
  },
};

const CORRECT_MESSAGES = [
  "Woohoo! You nailed it! 🔥",
  "Brilliant! You're on fire! ⚡",
  "That's absolutely right! 💪",
  "Genius move! Keep going! 🚀",
  "Perfect answer! Amazing! 🌟",
];

const WRONG_MESSAGES = [
  "Missed it — now you'll never forget! 🔥",
  "That's how we learn! Keep going! 💪",
  "Wrong answer = free lesson! 🧠✨",
  "One step closer to getting it right! 🚀",
  "Every mistake is progress in disguise! 💡",
];

const VICTORY_MESSAGES = [
  "You're a quiz champion! 🏆",
  "What an incredible performance! 🌟",
  "You absolutely crushed it! 💥",
];

const FAILED_MESSAGES = [
  "You've got this! Try again! 💪",
  "Every attempt makes you stronger! 🔥",
  "Champions don't quit — go again! 🏆",
];

function getRandomMessage(expression) {
  if (expression === "correct") {
    return CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)];
  }
  if (expression === "wrong") {
    return WRONG_MESSAGES[Math.floor(Math.random() * WRONG_MESSAGES.length)];
  }
  if (expression === "victory") {
    return VICTORY_MESSAGES[Math.floor(Math.random() * VICTORY_MESSAGES.length)];
  }
  if (expression === "failed") {
    return FAILED_MESSAGES[Math.floor(Math.random() * FAILED_MESSAGES.length)];
  }
  return EXPRESSIONS[expression]?.message || "";
}

// SVG Mascot - A cute owl character
function MascotFace({ expression }) {
  const exp = EXPRESSIONS[expression] || EXPRESSIONS.idle;

  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      initial={false}
    >
      {/* Body */}
      <motion.ellipse
        cx="100"
        cy="120"
        rx="65"
        ry="70"
        fill={exp.color}
        animate={{ fill: exp.color }}
        transition={{ duration: 0.3 }}
      />

      {/* Belly */}
      <ellipse cx="100" cy="135" rx="40" ry="45" fill="white" opacity="0.25" />

      {/* Left Ear/Horn */}
      <motion.path
        d="M50 65 L35 25 L70 55 Z"
        fill={exp.color}
        animate={{
          fill: exp.color,
          rotate: expression === "correct" ? [0, -10, 0] : expression === "wrong" ? [0, -5, 0] : 0,
        }}
        transition={{ duration: 0.4, repeat: expression === "correct" ? 2 : 0 }}
        style={{ transformOrigin: "50px 65px" }}
      />

      {/* Right Ear/Horn */}
      <motion.path
        d="M150 65 L165 25 L130 55 Z"
        fill={exp.color}
        animate={{
          fill: exp.color,
          rotate: expression === "correct" ? [0, 10, 0] : expression === "wrong" ? [0, 5, 0] : 0,
        }}
        transition={{ duration: 0.4, repeat: expression === "correct" ? 2 : 0 }}
        style={{ transformOrigin: "150px 65px" }}
      />

      {/* Eye whites */}
      <motion.circle cx="75" cy="95" r="22" fill="white" />
      <motion.circle cx="125" cy="95" r="22" fill="white" />

      {/* Pupils - change based on expression */}
      {exp.eyes === "normal" && (
        <>
          <motion.circle cx="78" cy="95" r="10" fill="#1a1a2e"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle cx="128" cy="95" r="10" fill="#1a1a2e"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <circle cx="82" cy="90" r="3" fill="white" />
          <circle cx="132" cy="90" r="3" fill="white" />
        </>
      )}

      {exp.eyes === "star" && (
        <>
          <motion.text x="65" y="102" fontSize="22" textAnchor="middle"
            initial={{ scale: 0 }} animate={{ scale: 1, rotate: [0, 15, -15, 0] }}
            transition={{ duration: 0.5 }}
          >⭐</motion.text>
          <motion.text x="135" y="102" fontSize="22" textAnchor="middle"
            initial={{ scale: 0 }} animate={{ scale: 1, rotate: [0, -15, 15, 0] }}
            transition={{ duration: 0.5 }}
          >⭐</motion.text>
        </>
      )}

      {exp.eyes === "sad" && (
        <>
          <circle cx="75" cy="100" r="9" fill="#1a1a2e" />
          <circle cx="125" cy="100" r="9" fill="#1a1a2e" />
          <circle cx="79" cy="96" r="3" fill="white" />
          <circle cx="129" cy="96" r="3" fill="white" />
          {/* Eyebrows sad */}
          <line x1="60" y1="78" x2="88" y2="84" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" />
          <line x1="140" y1="78" x2="112" y2="84" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" />
          {/* Tears */}
          <ellipse cx="58" cy="115" rx="4" ry="7" fill="#60A5FA" opacity="0.7" />
          <ellipse cx="148" cy="115" rx="4" ry="7" fill="#60A5FA" opacity="0.7" />
        </>
      )}

      {exp.eyes === "heart" && (
        <>
          <motion.text x="65" y="102" fontSize="22" textAnchor="middle"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >❤️</motion.text>
          <motion.text x="135" y="102" fontSize="22" textAnchor="middle"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
          >❤️</motion.text>
        </>
      )}

      {exp.eyes === "determined" && (
        <>
          {/* Big bright eyes - wide open, enthusiastic */}
          <motion.circle cx="75" cy="95" r="13" fill="#1a1a2e"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <motion.circle cx="125" cy="95" r="13" fill="#1a1a2e"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          {/* Bright sparkle highlights */}
          <circle cx="80" cy="89" r="4" fill="white" />
          <circle cx="130" cy="89" r="4" fill="white" />
          <circle cx="70" cy="98" r="2" fill="white" opacity="0.7" />
          <circle cx="120" cy="98" r="2" fill="white" opacity="0.7" />
          {/* Raised cheerful eyebrows - arched upward = happy + energetic */}
          <path d="M57 76 Q75 68 90 74" fill="none" stroke="#1a1a2e" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M110 74 Q125 68 143 76" fill="none" stroke="#1a1a2e" strokeWidth="3.5" strokeLinecap="round" />
        </>
      )}

      {exp.eyes === "encouraging" && (
        <>
          {/* Warm, kind eyes looking forward with a wink-like energy */}
          <circle cx="75" cy="96" r="11" fill="#1a1a2e" />
          <circle cx="125" cy="96" r="11" fill="#1a1a2e" />
          <circle cx="79" cy="91" r="3.5" fill="white" />
          <circle cx="129" cy="91" r="3.5" fill="white" />
          {/* Warm raised eyebrows — friendly, caring */}
          <path d="M58 78 Q74 71 90 76" fill="none" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" />
          <path d="M110 76 Q126 71 142 78" fill="none" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" />
        </>
      )}

      {exp.eyes === "squint" && (
        <>
          <line x1="60" y1="95" x2="90" y2="97" stroke="#1a1a2e" strokeWidth="4" strokeLinecap="round" />
          <line x1="110" y1="95" x2="140" y2="97" stroke="#1a1a2e" strokeWidth="4" strokeLinecap="round" />
        </>
      )}

      {/* Beak */}
      <path
        d={
          exp.mouth === "big-smile"
            ? "M85 118 L100 135 L115 118 Z"
            : exp.mouth === "frown"
            ? "M90 125 L100 118 L110 125 Z"
            : exp.mouth === "open-smile"
            ? "M85 115 L100 138 L115 115 Z"
            : exp.mouth === "hmm"
            ? "M92 118 L100 125 L108 118 Z"
            : "M90 115 L100 130 L110 115 Z"
        }
        fill="#F59E0B"
      />

      {/* Blush marks for happy/encouraging expressions */}
      {(expression === "correct" || expression === "victory" || expression === "wrong" || expression === "failed") && (
        <>
          <motion.ellipse cx="50" cy="115" rx="10" ry="6" fill="#FDA4AF" opacity="0"
            animate={{ opacity: [0, 0.5, 0.3] }}
            transition={{ duration: 0.5 }}
          />
          <motion.ellipse cx="150" cy="115" rx="10" ry="6" fill="#FDA4AF" opacity="0"
            animate={{ opacity: [0, 0.5, 0.3] }}
            transition={{ duration: 0.5 }}
          />
        </>
      )}

      {/* Feet */}
      <ellipse cx="80" cy="188" rx="18" ry="8" fill={exp.color} opacity="0.7" />
      <ellipse cx="120" cy="188" rx="18" ry="8" fill={exp.color} opacity="0.7" />
    </motion.svg>
  );
}

// Floating particles for celebrations
function Particles({ expression }) {
  if (expression !== "correct" && expression !== "victory" && expression !== "failed") return null;

  if (expression === "failed") {
    const boosts = ["💪", "🔥", "⚡", "🚀", "✨"];
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {boosts.map((p, i) => (
          <motion.div
            key={i}
            className="absolute text-lg"
            initial={{ x: 60 + Math.random() * 80, y: 120, opacity: 0, scale: 0 }}
            animate={{ y: Math.random() * -80 - 20, opacity: [0, 1, 0], scale: [0, 1.2, 0.5] }}
            transition={{ duration: 1.2 + Math.random() * 0.6, delay: i * 0.15, ease: "easeOut" }}
          >
            {p}
          </motion.div>
        ))}
      </div>
    );
  }

  const particles = expression === "victory"
    ? ["🌟", "✨", "🎉", "🏆", "💫", "⭐", "🎊", "💥"]
    : ["✨", "💫", "⭐", "+XP"];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute text-lg"
          initial={{
            x: 80 + Math.random() * 40,
            y: 100,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: Math.random() * 200 - 20,
            y: Math.random() * -100 - 20,
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0.5],
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 1.2 + Math.random() * 0.8,
            delay: i * 0.1,
            ease: "easeOut",
          }}
        >
          {p}
        </motion.div>
      ))}
    </div>
  );
}

export default function Mascot({ expression = "idle", xpGained = 0 }) {
  const exp = EXPRESSIONS[expression] || EXPRESSIONS.idle;
  const message = getRandomMessage(expression);

  return (
    <div className="flex flex-col items-center relative">
      {/* Message Bubble */}
      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative mb-3 max-w-[250px]"
          >
            <div
              className="px-4 py-2.5 rounded-2xl text-center text-sm font-semibold shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${exp.color}15, ${exp.color}25)`,
                border: `2px solid ${exp.color}30`,
                color: exp.color,
              }}
            >
              {message}
            </div>
            {/* Speech bubble tail */}
            <div
              className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 rotate-45"
              style={{
                background: `${exp.color}20`,
                borderRight: `2px solid ${exp.color}30`,
                borderBottom: `2px solid ${exp.color}30`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* XP Badge popup */}
      <AnimatePresence>
        {expression === "correct" && xpGained > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: -20 }}
            className="absolute -top-2 -right-2 z-10"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold text-sm px-3 py-1 rounded-full shadow-lg">
              +{xpGained} XP
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot Container */}
      <motion.div
        className="relative w-40 h-40 md:w-48 md:h-48"
        animate={{
          y: expression === "idle" || expression === "loading"
            ? [0, -8, 0]
            : expression === "correct"
            ? [0, -20, 0, -10, 0]
            : expression === "wrong"
            ? [0, -10, 0, -6, 0]
            : expression === "victory"
            ? [0, -25, 0, -15, 0, -8, 0]
            : expression === "failed"
            ? [0, -15, 0, -10, 0]
            : 0,
          rotate: expression === "wrong"
            ? [0, -5, 5, -5, 5, 0]
            : expression === "victory"
            ? [0, -8, 8, -5, 5, 0]
            : 0,
          scale: expression === "correct"
            ? [1, 1.15, 1]
            : expression === "victory"
            ? [1, 1.2, 0.95, 1.1, 1]
            : 1,
        }}
        transition={{
          duration: expression === "idle" || expression === "loading" ? 3 : 0.8,
          repeat: expression === "idle" || expression === "loading" ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl"
          animate={{
            background: exp.bgGlow,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Shadow */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full bg-black/10 blur-md"
          animate={{
            scaleX: expression === "correct" || expression === "victory"
              ? [1, 0.6, 1]
              : [1, 0.9, 1],
          }}
          transition={{ duration: expression === "idle" ? 3 : 0.8, repeat: expression === "idle" ? Infinity : 0 }}
        />

        <Particles expression={expression} />
        <MascotFace expression={expression} />
      </motion.div>
    </div>
  );
}