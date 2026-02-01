import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { Button } from '../ui/Button';

export function WaitingView() {
    const phase = useGameStore((s) => s.phase);
    const player = useGameStore((s) => s.player);
    const squadAdvance = useGameStore((s) => s.squadAdvance);

    // When clicked, ALL squad members advance to signal_jammer
    const handleStartHeist = () => {
        squadAdvance('signal_jammer');
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-slate-900 cyber-grid flex flex-col items-center justify-center p-4"
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 bg-cyan-400/20"
                        style={{
                            left: `${(i + 1) * 5}%`,
                            height: '100%',
                        }}
                        initial={{ y: '-100%', opacity: 0 }}
                        animate={{ y: '100%', opacity: [0, 0.5, 0] }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center relative z-10"
            >
                {/* Status icon */}
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        borderColor: ['#22d3ee', '#f472b6', '#22d3ee'],
                    }}
                    transition={{
                        rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                        borderColor: { duration: 3, repeat: Infinity },
                    }}
                    className="w-24 h-24 border-4 border-cyan-400 rounded-full mx-auto mb-8 flex items-center justify-center"
                >
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-4 h-4 bg-cyan-400 rounded-full"
                    />
                </motion.div>

                {/* Messages based on phase */}
                {phase === 'lobby' && (
                    <>
                        <h1 className="text-2xl font-bold text-cyan-400 text-glow-cyan tracking-widest mb-4">
                            IDENTITY REGISTERED
                        </h1>
                        <p className="text-slate-400 mb-2">
                            Welcome, <span className="text-pink-400">{player?.nickname}</span>
                        </p>
                        <p className="text-slate-500 text-sm">
                            Awaiting mission briefing...
                        </p>
                    </>
                )}

                {phase === 'chain' && (
                    <>
                        <h1 className="text-2xl font-bold text-green-400 tracking-widest mb-4">
                            TARGET LOCKED
                        </h1>
                        <p className="text-slate-400 mb-2">
                            Connection established
                        </p>
                        <p className="text-slate-500 text-sm mb-6">
                            Waiting for squad synchronization...
                        </p>

                        {/* Squad sync button - advances ALL players */}
                        <Button
                            onClick={handleStartHeist}
                            variant="secondary"
                            className="mt-4"
                        >
                            ⚡ SQUAD READY - START HEIST
                        </Button>
                    </>
                )}

                {phase === 'heist' && (
                    <>
                        <h1 className="text-2xl font-bold text-pink-400 text-glow-pink tracking-widest mb-4">
                            SQUAD SYNCHRONIZED
                        </h1>
                        <p className="text-slate-400 mb-2">
                            Heist protocols loading...
                        </p>
                    </>
                )}

                {/* Pulse rings */}
                <div className="mt-8">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute left-1/2 top-1/2 w-32 h-32 border border-cyan-400/30 rounded-full"
                            style={{ marginLeft: '-64px', marginTop: '-64px' }}
                            initial={{ scale: 1, opacity: 0.5 }}
                            animate={{ scale: 2 + i * 0.5, opacity: 0 }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.7,
                            }}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Bottom tip */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-8 text-slate-500 text-sm text-center"
            >
                Stay alert. Your squad needs you.
            </motion.p>
        </motion.div>
    );
}
