import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { io, Socket } from 'socket.io-client';
import QRCode from 'react-qr-code';
import { DrawingGrid } from './DrawingGrid';
import { SquadProgress } from './SquadProgress';

type Phase = 'lobby' | 'chain' | 'heist' | 'getaway';

interface GameState {
    phase: Phase;
    playerCount: number;
    maxPlayers: number;
    squadCount: number;
    drawings: Array<{
        id: string;
        drawing: string;
        nickname: string;
        timestamp: number;
    }>;
    squads: Array<{
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
    }>;
}

const SOCKET_URL = import.meta.env.PROD
    ? `${window.location.origin}/gm`
    : 'http://localhost:3001/gm';

const JOIN_URL = import.meta.env.PROD
    ? window.location.origin
    : 'http://localhost:5173';

export function GameMasterView() {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [gameState, setGameState] = useState<GameState>({
        phase: 'lobby',
        playerCount: 0,
        maxPlayers: 50,
        squadCount: 0,
        drawings: [],
        squads: [],
    });
    const [errorSquad, setErrorSquad] = useState<string | null>(null);

    useEffect(() => {
        const newSocket = io(SOCKET_URL, {
            transports: ['websocket', 'polling'],
        });

        newSocket.on('connect', () => {
            console.log('[GM] Connected');
        });

        newSocket.on('game_state', (state: GameState) => {
            setGameState(state);
        });

        newSocket.on('player_joined', (data) => {
            setGameState((prev) => ({
                ...prev,
                playerCount: data.count,
                drawings: [...prev.drawings, {
                    id: data.id,
                    drawing: data.drawing,
                    nickname: data.nickname,
                    timestamp: Date.now(),
                }],
            }));
        });

        newSocket.on('player_left', (data) => {
            setGameState((prev) => ({
                ...prev,
                playerCount: data.count,
            }));
        });

        newSocket.on('squad_error', (data: { squadId: string }) => {
            setErrorSquad(data.squadId);
            setTimeout(() => setErrorSquad(null), 300);
        });

        newSocket.on('phase_change', (data: { phase: Phase }) => {
            setGameState((prev) => ({
                ...prev,
                phase: data.phase,
            }));
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const startGame = useCallback(() => {
        socket?.emit('start_game');
    }, [socket]);

    const startHeist = useCallback(() => {
        socket?.emit('start_heist');
    }, [socket]);

    const resetGame = useCallback(() => {
        socket?.emit('reset_game');
    }, [socket]);

    return (
        <div className="min-h-screen bg-slate-900 cyber-grid text-white overflow-hidden">
            {/* Scanlines overlay */}
            <div className="scanlines fixed inset-0 pointer-events-none z-50" />

            {/* Header Bar */}
            <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="fixed top-0 left-0 right-0 z-40 bg-slate-900/90 backdrop-blur border-b border-cyan-400/30"
            >
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-bold text-cyan-400 text-glow-cyan tracking-widest">
                            PROTOCOL: UNMASK
                        </h1>
                        <span className="px-3 py-1 bg-pink-500/20 border border-pink-400 text-pink-400 text-sm tracking-wider">
                            CENTRAL COMMAND
                        </span>
                    </div>

                    {/* Phase indicator */}
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <span className="text-slate-500 text-xs uppercase">Current Phase</span>
                            <p className="text-xl font-bold text-cyan-400 uppercase tracking-wider">
                                {gameState.phase}
                            </p>
                        </div>

                        {/* Control buttons */}
                        <div className="flex gap-2">
                            {gameState.phase === 'lobby' && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={startGame}
                                    disabled={gameState.playerCount < 4}
                                    className="px-4 py-2 bg-green-500/20 border border-green-400 text-green-400 
                             font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    START CHAIN
                                </motion.button>
                            )}
                            {gameState.phase === 'chain' && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={startHeist}
                                    className="px-4 py-2 bg-pink-500/20 border border-pink-400 text-pink-400 font-bold"
                                >
                                    START HEIST
                                </motion.button>
                            )}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={resetGame}
                                className="px-4 py-2 bg-red-500/20 border border-red-400 text-red-400 font-bold"
                            >
                                RESET
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Main Content */}
            <main className="pt-20 min-h-screen">
                <AnimatePresence mode="wait">
                    {/* LOBBY PHASE */}
                    {gameState.phase === 'lobby' && (
                        <motion.div
                            key="lobby"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col lg:flex-row min-h-[calc(100vh-5rem)]"
                        >
                            {/* Left side - QR Code and counter */}
                            <div className="lg:w-1/3 p-8 flex flex-col items-center justify-center border-r border-cyan-400/20">
                                {/* Player Counter */}
                                <motion.div
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    className="text-center mb-8"
                                >
                                    <p className="text-slate-500 text-lg uppercase tracking-wider mb-2">
                                        Operatives Online
                                    </p>
                                    <motion.p
                                        key={gameState.playerCount}
                                        initial={{ scale: 1.5, color: '#4ade80' }}
                                        animate={{ scale: 1, color: '#22d3ee' }}
                                        className="text-8xl font-bold text-cyan-400 text-glow-cyan"
                                    >
                                        {gameState.playerCount}
                                    </motion.p>
                                    <p className="text-slate-500 text-2xl">
                                        / {gameState.maxPlayers}
                                    </p>
                                </motion.div>

                                {/* QR Code */}
                                <motion.div
                                    initial={{ scale: 0, rotate: -10 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.2, type: 'spring' }}
                                    className="p-6 bg-white rounded-lg glow-cyan"
                                >
                                    <QRCode
                                        value={JOIN_URL}
                                        size={256}
                                        level="M"
                                    />
                                </motion.div>

                                <p className="mt-4 text-cyan-400 text-lg font-mono">
                                    SCAN TO JOIN
                                </p>
                                <p className="text-slate-500 text-sm mt-1">
                                    {JOIN_URL}
                                </p>
                            </div>

                            {/* Right side - Drawing mosaic */}
                            <div className="lg:w-2/3 overflow-auto">
                                <div className="p-4">
                                    <h2 className="text-xl text-slate-400 uppercase tracking-wider mb-4">
                                        RECRUITED OPERATIVES
                                    </h2>
                                    <DrawingGrid drawings={gameState.drawings} />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* CHAIN PHASE */}
                    {gameState.phase === 'chain' && (
                        <motion.div
                            key="chain"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="min-h-[calc(100vh-5rem)] p-8"
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-4xl font-bold text-cyan-400 text-glow-cyan tracking-widest mb-2">
                                    NETWORK FORMATION
                                </h2>
                                <p className="text-slate-400 text-lg">
                                    Operatives are establishing secure connections
                                </p>
                            </div>

                            {/* Squad Network Visualization */}
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                                {gameState.squads.map((squad, index) => {
                                    const squadNames = ['ALPHA', 'BRAVO', 'CHARLIE', 'DELTA', 'ECHO'];
                                    const isComplete = squad.isLoopComplete;

                                    return (
                                        <motion.div
                                            key={squad.id}
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: index * 0.15 }}
                                            className={`cyber-card p-6 text-center relative overflow-hidden
                        ${isComplete ? 'border-green-400 glow-green' : 'border-cyan-400/30'}`}
                                        >
                                            {/* Pulse effect when complete */}
                                            {isComplete && (
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0.5 }}
                                                    animate={{ scale: 3, opacity: 0 }}
                                                    transition={{ repeat: Infinity, duration: 2 }}
                                                    className="absolute inset-0 bg-green-400 rounded-lg"
                                                />
                                            )}

                                            <h3 className={`text-2xl font-bold mb-4 ${isComplete ? 'text-green-400' : 'text-cyan-400'
                                                }`}>
                                                {squadNames[index]}
                                            </h3>

                                            {/* Circular network visualization */}
                                            <div className="relative w-32 h-32 mx-auto mb-4">
                                                {/* Connection lines */}
                                                <svg className="absolute inset-0 w-full h-full">
                                                    {squad.players.map((_, pIndex) => {
                                                        const nextIndex = (pIndex + 1) % squad.players.length;
                                                        const angle1 = (pIndex / squad.players.length) * 2 * Math.PI - Math.PI / 2;
                                                        const angle2 = (nextIndex / squad.players.length) * 2 * Math.PI - Math.PI / 2;
                                                        const r = 50;
                                                        const x1 = 64 + r * Math.cos(angle1);
                                                        const y1 = 64 + r * Math.sin(angle1);
                                                        const x2 = 64 + r * Math.cos(angle2);
                                                        const y2 = 64 + r * Math.sin(angle2);

                                                        const scanComplete = pIndex < squad.completedScans;

                                                        return (
                                                            <motion.line
                                                                key={pIndex}
                                                                x1={x1}
                                                                y1={y1}
                                                                x2={x2}
                                                                y2={y2}
                                                                stroke={scanComplete ? '#4ade80' : '#475569'}
                                                                strokeWidth={scanComplete ? 3 : 1}
                                                                initial={{ pathLength: 0, opacity: 0.3 }}
                                                                animate={{
                                                                    pathLength: 1,
                                                                    opacity: scanComplete ? 1 : 0.3,
                                                                }}
                                                                transition={{ delay: 0.5 + pIndex * 0.1 }}
                                                            />
                                                        );
                                                    })}
                                                </svg>

                                                {/* Player nodes */}
                                                {squad.players.map((player, pIndex) => {
                                                    const angle = (pIndex / squad.players.length) * 2 * Math.PI - Math.PI / 2;
                                                    const r = 50;
                                                    const x = 50 + r * Math.cos(angle);
                                                    const y = 50 + r * Math.sin(angle);

                                                    return (
                                                        <motion.div
                                                            key={player.id}
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{ delay: 0.3 + pIndex * 0.1 }}
                                                            className={`absolute w-4 h-4 rounded-full ${!player.connected
                                                                ? 'bg-red-500'
                                                                : player.scanComplete
                                                                    ? 'bg-green-400'
                                                                    : 'bg-slate-600'
                                                                }`}
                                                            style={{
                                                                left: `${x}%`,
                                                                top: `${y}%`,
                                                                transform: 'translate(-50%, -50%)',
                                                            }}
                                                        />
                                                    );
                                                })}
                                            </div>

                                            {/* Status */}
                                            <p className={`text-lg font-mono ${isComplete ? 'text-green-400' : 'text-slate-500'
                                                }`}>
                                                {isComplete ? 'ACTIVATED' : `${squad.completedScans}/${squad.totalScans} LINKED`}
                                            </p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* HEIST PHASE */}
                    {(gameState.phase === 'heist' || gameState.phase === 'getaway') && (
                        <motion.div
                            key="heist"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="min-h-[calc(100vh-5rem)] p-8"
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-4xl font-bold text-pink-400 text-glow-pink tracking-widest mb-2">
                                    HEIST IN PROGRESS
                                </h2>
                                <p className="text-slate-400 text-lg">
                                    Squads are executing their missions
                                </p>
                            </div>

                            <SquadProgress
                                squads={gameState.squads}
                                showError={errorSquad}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Footer status bar */}
            <motion.footer
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur border-t border-cyan-400/30 py-2 px-4"
            >
                <div className="container mx-auto flex justify-between items-center text-sm">
                    <span className="text-slate-500">
                        SYSTEM STATUS: <span className="text-green-400">OPERATIONAL</span>
                    </span>
                    <span className="text-slate-500">
                        SQUADS ACTIVE: <span className="text-cyan-400">{gameState.squadCount}</span>
                    </span>
                    <span className="text-slate-500">
                        UPLINK: <span className="text-green-400">●</span> STABLE
                    </span>
                </div>
            </motion.footer>
        </div>
    );
}
