import { useState } from "react";
import SetupScreen from "./components/game/SetupScreen";
import GameScreen from "./components/game/GameScreen";
import MatchManager from "./components/game/MatchManager";
import EndScreen from "./components/game/EndScreen";
import { GameSettings } from "./lib/gameLogic";
import { Toaster } from "./components/ui/toaster";
import { motion, AnimatePresence } from "framer-motion";

interface PlayerResult {
  name: string;
  score: number;
  successRate: number;
  status: "WON" | "BUST";
}

type Screen = "SETUP" | "SOLO_GAME" | "MATCH" | "END";

function App() {
  const [screen, setScreen] = useState<Screen>("SETUP");
  const [settings, setSettings] = useState<GameSettings>({
    playerName: "Player 1",
    player2Name: "Player 2",
    playerCount: 1,
    gameMode: "CLASSIC",
    version: "20",
    botLevelId: 3,
  });
  const [soloResult, setSoloResult] = useState<PlayerResult | null>(null);

  const handleStart = (newSettings: GameSettings) => {
    setSettings(newSettings);
    setSoloResult(null);
    if (newSettings.playerCount === 1) {
      setScreen("SOLO_GAME");
    } else {
      setScreen("MATCH");
    }
  };

  const handleSoloGameOver = (score: number, successRate: number, status: "WON" | "BUST") => {
    setSoloResult({ name: settings.playerName, score, successRate, status });
    setScreen("END");
  };

  const handleExit = () => setScreen("SETUP");

  return (
    <div className="min-h-[100dvh] bg-background text-foreground dark selection:bg-primary selection:text-primary-foreground">
      <AnimatePresence mode="wait">

        {screen === "SETUP" && (
          <motion.div key="setup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SetupScreen initialSettings={settings} onStart={handleStart} />
          </motion.div>
        )}

        {/* 1-player solo mode (full game, no alternating) */}
        {screen === "SOLO_GAME" && (
          <motion.div key="solo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <GameScreen
              settings={settings}
              onGameOver={handleSoloGameOver}
              onExit={handleExit}
            />
          </motion.div>
        )}

        {/* 2-player or VS BOT — alternating rounds */}
        {screen === "MATCH" && (
          <motion.div key="match" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <MatchManager settings={settings} onExit={handleExit} />
          </motion.div>
        )}

        {/* Solo end screen */}
        {screen === "END" && soloResult && (
          <motion.div key="end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <EndScreen
              players={[soloResult]}
              onNewGame={() => setScreen("SETUP")}
            />
          </motion.div>
        )}

      </AnimatePresence>
      <Toaster />
    </div>
  );
}

export default App;
