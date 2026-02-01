// puzzleData.js - Define complete puzzle configurations for Signal Jammer

export const PUZZLES = [
    {
        id: 'cyber_runes',
        name: 'Cyber Runes',
        grid: [
            { symbol: '◇', color: 'text-cyan-400' },
            { symbol: '△', color: 'text-pink-400' },
            { symbol: '○', color: 'text-green-400' },
            { symbol: '□', color: 'text-yellow-400' },
            { symbol: '⬡', color: 'text-red-400' },
            { symbol: '⬢', color: 'text-purple-400' },
            { symbol: '◈', color: 'text-blue-400' },
            { symbol: '✧', color: 'text-orange-400' },  // ← ANSWER (index 7)
            { symbol: '☆', color: 'text-teal-400' },
        ],
        correctIndex: 7,
        clues: [
            "The symbol is NOT in the first row",
            "The symbol is NOT cyan or pink colored",
            "The symbol is a STAR shape (has points)",
            "The symbol is ORANGE colored",
            "The symbol is in the THIRD row",
        ],
    },
    {
        id: 'math_symbols',
        name: 'Binary Matrix',
        grid: [
            { symbol: '∞', color: 'text-cyan-400' },
            { symbol: '∑', color: 'text-pink-400' },
            { symbol: 'π', color: 'text-green-400' },      // ← ANSWER (index 2)
            { symbol: '√', color: 'text-yellow-400' },
            { symbol: 'Δ', color: 'text-red-400' },
            { symbol: 'Ω', color: 'text-purple-400' },
            { symbol: '∂', color: 'text-blue-400' },
            { symbol: '∫', color: 'text-orange-400' },
            { symbol: 'λ', color: 'text-teal-400' },
        ],
        correctIndex: 2,
        clues: [
            "The symbol is in the FIRST row",
            "The symbol is GREEN colored",
            "The symbol represents a famous CONSTANT",
            "The symbol is NOT infinity or summation",
        ],
    },
    {
        id: 'card_suits',
        name: 'Card Cipher',
        grid: [
            { symbol: '♠', color: 'text-slate-300' },
            { symbol: '♥', color: 'text-red-400' },
            { symbol: '♦', color: 'text-red-400' },
            { symbol: '♣', color: 'text-slate-300' },
            { symbol: '♤', color: 'text-cyan-400' },      // ← ANSWER (index 4)
            { symbol: '♡', color: 'text-pink-400' },
            { symbol: '♢', color: 'text-yellow-400' },
            { symbol: '♧', color: 'text-green-400' },
            { symbol: '⚜', color: 'text-purple-400' },
        ],
        correctIndex: 4,
        clues: [
            "The symbol is a SPADE shape",
            "The symbol is CYAN/BLUE colored",
            "The symbol is an OUTLINE, not filled",
            "The symbol is in the MIDDLE row",
        ],
    },
    {
        id: 'arrows',
        name: 'Vector Grid',
        grid: [
            { symbol: '↑', color: 'text-red-400' },
            { symbol: '↗', color: 'text-orange-400' },
            { symbol: '→', color: 'text-yellow-400' },
            { symbol: '↘', color: 'text-green-400' },
            { symbol: '↓', color: 'text-cyan-400' },
            { symbol: '↙', color: 'text-blue-400' },      // ← ANSWER (index 5)
            { symbol: '←', color: 'text-purple-400' },
            { symbol: '↖', color: 'text-pink-400' },
            { symbol: '⟳', color: 'text-teal-400' },
        ],
        correctIndex: 5,
        clues: [
            "The symbol points DOWNWARD (has down component)",
            "The symbol is BLUE colored",
            "The symbol is DIAGONAL",
            "The symbol is in the THIRD row",
        ],
    },
    {
        id: 'planets',
        name: 'Cosmic Code',
        grid: [
            { symbol: '☉', color: 'text-yellow-400' },
            { symbol: '☽', color: 'text-slate-300' },
            { symbol: '☿', color: 'text-orange-400' },
            { symbol: '♀', color: 'text-pink-400' },
            { symbol: '♁', color: 'text-blue-400' },
            { symbol: '♂', color: 'text-red-400' },       // ← ANSWER (index 5)
            { symbol: '♃', color: 'text-orange-300' },
            { symbol: '♄', color: 'text-yellow-300' },
            { symbol: '♅', color: 'text-cyan-400' },
        ],
        correctIndex: 5,
        clues: [
            "The symbol is RED colored",
            "The symbol is in the SECOND row",
            "The symbol represents a PLANET",
            "The symbol has an ARROW pointing out",
        ],
    },
    {
        id: 'zodiac',
        name: 'Star Chart',
        grid: [
            { symbol: '♈', color: 'text-red-400' },
            { symbol: '♉', color: 'text-green-400' },
            { symbol: '♊', color: 'text-yellow-400' },
            { symbol: '♋', color: 'text-slate-300' },
            { symbol: '♌', color: 'text-orange-400' },
            { symbol: '♍', color: 'text-blue-400' },
            { symbol: '♎', color: 'text-pink-400' },      // ← ANSWER (index 6)
            { symbol: '♏', color: 'text-purple-400' },
            { symbol: '♐', color: 'text-cyan-400' },
        ],
        correctIndex: 6,
        clues: [
            "The symbol is in the THIRD row",
            "The symbol is PINK colored",
            "The symbol looks like SCALES or balance",
            "The symbol is NOT purple or cyan",
        ],
    },
    {
        id: 'weather',
        name: 'Storm Signal',
        grid: [
            { symbol: '☀', color: 'text-yellow-400' },
            { symbol: '☁', color: 'text-slate-300' },
            { symbol: '☂', color: 'text-blue-400' },
            { symbol: '☃', color: 'text-slate-100' },
            { symbol: '☄', color: 'text-orange-400' },    // ← ANSWER (index 4)
            { symbol: '⚡', color: 'text-yellow-300' },
            { symbol: '❄', color: 'text-cyan-400' },
            { symbol: '☾', color: 'text-purple-400' },
            { symbol: '✦', color: 'text-pink-400' },
        ],
        correctIndex: 4,
        clues: [
            "The symbol is in the MIDDLE row",
            "The symbol is ORANGE colored",
            "The symbol has a TRAIL or tail",
            "The symbol is NOT a snowflake",
        ],
    },
];

// Helper to get a random puzzle
export function getRandomPuzzle() {
    return PUZZLES[Math.floor(Math.random() * PUZZLES.length)];
}

// Helper to get puzzle by ID
export function getPuzzleById(id) {
    return PUZZLES.find(p => p.id === id);
}

// Helper to get clue for a specific player index
export function getClueForPlayer(puzzle, playerIndex) {
    return puzzle.clues[playerIndex % puzzle.clues.length];
}
