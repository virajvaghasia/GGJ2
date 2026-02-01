import { motion, AnimatePresence } from 'framer-motion';

interface Squad {
    id: string;
    playerCount: number;
    completedScans: number;
    totalScans: number;
    isLoopComplete: boolean;
    progress: number;
    currentMinigame: string | null;
    players: Array<{
        id: string;
        nickname: string;
        connected: boolean;
        scanComplete: boolean;
    }>;
}

interface SquadProgressProps {
    squads: Squad[];
    showError?: string | null; // squadId that just errored
}

const SQUAD_NAMES = ['ALPHA', 'BRAVO', 'CHARLIE', 'DELTA', 'ECHO'];
const SQUAD_COLORS = [
    { bg: 'from-cyan-500/20 to-cyan-600/30', border: 'border-cyan-400', text: 'text-cyan-400' },
    { bg: 'from-pink-500/20 to-pink-600/30', border: 'border-pink-400', text: 'text-pink-400' },
    { bg: 'from-green-500/20 to-green-600/30', border: 'border-green-400', text: 'text-green-400' },
    { bg: 'from-yellow-500/20 to-yellow-600/30', border: 'border-yellow-400', text: 'text-yellow-400' },
    { bg: 'from-purple-500/20 to-purple-600/30', border: 'border-purple-400', text: 'text-purple-400' },
];

export function SquadProgress({ squads, showError }: SquadProgressProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 p-4">
            {squads.map((squad, index) => {
                const colors = SQUAD_COLORS[index % SQUAD_COLORS.length];
                const squadName = SQUAD_NAMES[index % SQUAD_NAMES.length];
                const hasError = showError === squad.id;

                return (
                    <motion.div
                        key={squad.id}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`cyber-card p-4 ${colors.border} ${hasError ? 'glitch' : ''}`}
                    >
                        {/* Squad Name */}
                        <div className="flex items-center justify-between mb-4">
                            <motion.h2
                                className={`text-2xl font-bold ${colors.text} tracking-widest`}
                                animate={squad.isLoopComplete ? {
                                    textShadow: [
                                        '0 0 10px currentColor',
                                        '0 0 20px currentColor',
                                        '0 0 10px currentColor',
                                    ],
                                } : {}}
                                transition={{ repeat: Infinity, duration: 1 }}
                            >
                                {squadName}
                            </motion.h2>

                            {/* Status badge */}
                            <AnimatePresence mode="wait">
                                {squad.isLoopComplete && squad.progress < 100 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="px-2 py-1 bg-green-500/20 border border-green-400 text-green-400 text-xs"
                                    >
                                        ACTIVATED
                                    </motion.span>
                                )}
                                {squad.progress >= 100 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ repeat: Infinity, duration: 0.5 }}
                                        className="px-2 py-1 bg-green-500 text-slate-900 text-xs font-bold"
                                    >
                                        COMPLETE
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                <span>PROGRESS</span>
                                <span>{squad.progress}%</span>
                            </div>
                            <div className="w-full h-4 bg-slate-800 rounded-sm overflow-hidden">
                                <motion.div
                                    className={`h-full bg-gradient-to-r ${colors.bg.replace('/20', '/80').replace('/30', '/90')}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${squad.progress}%` }}
                                    transition={{ type: 'spring', stiffness: 50 }}
                                    style={{
                                        boxShadow: hasError
                                            ? '0 0 20px rgba(248, 113, 113, 0.8)'
                                            : squad.progress > 0
                                                ? `0 0 10px currentColor`
                                                : 'none',
                                    }}
                                />

                                {/* Error flash */}
                                <AnimatePresence>
                                    {hasError && (
                                        <motion.div
                                            initial={{ opacity: 1 }}
                                            animate={{ opacity: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute inset-0 bg-red-500/50"
                                        />
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Current Status */}
                        <div className="text-center mb-4">
                            <AnimatePresence mode="wait">
                                {squad.currentMinigame && (
                                    <motion.p
                                        key={squad.currentMinigame}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-slate-300 text-sm font-mono"
                                    >
                                        {squad.currentMinigame === 'signal_jammer' && '🔊 DECRYPTING SIGNAL...'}
                                        {squad.currentMinigame === 'tumbler' && '🔐 CRACKING VAULT...'}
                                    </motion.p>
                                )}
                                {!squad.isLoopComplete && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-slate-500 text-sm font-mono"
                                    >
                                        CHAIN: {squad.completedScans}/{squad.totalScans}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Player dots */}
                        <div className="flex justify-center gap-2">
                            {squad.players.map((player, pIndex) => (
                                <motion.div
                                    key={player.id}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5 + pIndex * 0.1 }}
                                    className="relative group"
                                >
                                    <motion.div
                                        className={`w-3 h-3 rounded-full ${!player.connected
                                            ? 'bg-red-500 animate-pulse'
                                            : player.scanComplete
                                                ? 'bg-green-400'
                                                : 'bg-slate-600'
                                            }`}
                                        animate={player.scanComplete ? {
                                            boxShadow: [
                                                '0 0 0 0 rgba(74, 222, 128, 0.4)',
                                                '0 0 0 4px rgba(74, 222, 128, 0)',
                                            ],
                                        } : {}}
                                        transition={{ repeat: player.scanComplete ? Infinity : 0, duration: 1 }}
                                    />

                                    {/* Tooltip */}
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 
                                  opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        <span className="bg-slate-800 text-xs px-2 py-1 rounded whitespace-nowrap">
                                            {player.nickname}
                                        </span>
                                    </div>

                                    {/* Connection line to next player */}
                                    {pIndex < squad.players.length - 1 && (
                                        <motion.div
                                            className={`absolute top-1/2 left-full w-2 h-0.5 ${squad.players[pIndex].scanComplete ? 'bg-green-400' : 'bg-slate-700'
                                                }`}
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ delay: 0.6 + pIndex * 0.1 }}
                                            style={{ transformOrigin: 'left' }}
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                );
            })}

            {/* Empty state */}
            {squads.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full text-center py-12"
                >
                    <p className="text-slate-500 text-2xl font-mono">
                        SQUADS FORMING...
                    </p>
                </motion.div>
            )}
        </div>
    );
}
