import { motion, AnimatePresence } from 'framer-motion';

interface DrawingGridProps {
    drawings: Array<{
        id: string;
        drawing: string;
        nickname: string;
        timestamp: number;
    }>;
}

export function DrawingGrid({ drawings }: DrawingGridProps) {
    return (
        <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2 p-4">
            <AnimatePresence mode="popLayout">
                {drawings.map((item, index) => (
                    <motion.div
                        key={item.id}
                        layout
                        initial={{ scale: 0, opacity: 0, rotate: -10 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 25,
                            delay: index * 0.02,
                        }}
                        className="relative aspect-square group"
                    >
                        {/* Drawing */}
                        <motion.img
                            src={item.drawing}
                            alt={item.nickname}
                            className="w-full h-full object-cover border border-cyan-400/30"
                            whileHover={{ scale: 1.1, zIndex: 10 }}
                        />

                        {/* Nickname overlay on hover */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="absolute inset-0 bg-slate-900/80 flex items-center justify-center"
                        >
                            <span className="text-cyan-400 text-xs font-mono truncate px-1">
                                {item.nickname}
                            </span>
                        </motion.div>

                        {/* New indicator */}
                        {Date.now() - item.timestamp < 5000 && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                    className="absolute inset-0 bg-green-400 rounded-full"
                                />
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Empty slots indicator */}
            {drawings.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full text-center py-12"
                >
                    <p className="text-slate-500 text-2xl font-mono">
                        AWAITING OPERATIVES...
                    </p>
                </motion.div>
            )}
        </div>
    );
}
