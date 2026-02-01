import { motion } from 'framer-motion';

export function CompleteView() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-slate-900 cyber-grid flex flex-col items-center justify-center p-4 relative overflow-hidden"
        >
            {/* Celebration particles */}
            {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                    key={i}
                    className={`absolute w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-cyan-400' : i % 3 === 1 ? 'bg-pink-400' : 'bg-green-400'
                        }`}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        y: [0, -100 - Math.random() * 100],
                    }}
                    transition={{
                        duration: 2 + Math.random(),
                        repeat: Infinity,
                        delay: Math.random() * 2,
                    }}
                />
            ))}

            {/* Success message */}
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="text-center z-10"
            >
                <motion.h1
                    animate={{
                        textShadow: [
                            '0 0 10px rgba(74, 222, 128, 0.8)',
                            '0 0 40px rgba(74, 222, 128, 1)',
                            '0 0 10px rgba(74, 222, 128, 0.8)',
                        ],
                    }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-5xl font-bold text-green-400 tracking-widest mb-4"
                >
                    MISSION COMPLETE
                </motion.h1>

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="w-24 h-24 border-4 border-green-400 rounded-full mx-auto mb-6 flex items-center justify-center"
                >
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-4xl"
                    >
                        ✓
                    </motion.span>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-cyan-400 text-xl mb-2"
                >
                    EXTRACTION SUCCESSFUL
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-slate-400 text-sm"
                >
                    Your squad has completed the heist
                </motion.p>
            </motion.div>

            {/* Pulsing rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute w-64 h-64 border-2 border-green-400/30 rounded-full"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 2 + i, opacity: [0.5, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
}
