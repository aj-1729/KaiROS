import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import pageBackground from './page.jpg';
import softSound from './soft-transition-338894.mp3';
import uploadSound from './cinematic-designed-sci-fi-whoosh-transition-nexawave-228295-[AudioTrimmer.com].mp3';
import resultsSound from './lucky-guitar-sound-379745.mp3';

const animations = {
    initial: {
        opacity: 0
    },
    in: {
        opacity: 1
    },
    out: {
        opacity: 0
    }
};


const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 1.0
};


//Logo
const MusicIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
    </svg>
);


const Header = ({ onGoHome }) => (
    <header className="flex justify-between items-center w-full">
        <a href="#" onClick={(e) => { e.preventDefault(); onGoHome && onGoHome(); }} className="flex items-center gap-3 z-10 cursor-pointer">
            <div className="bg-black/20 p-2 rounded-lg">
                <MusicIcon className="text-white" />
            </div>
            <span className="text-2xl font-bold tracking-wide">KaiROS</span>
        </a>
        <div className="hidden md:block text-white/80">
            <p>Connect. Emotions. Cherish. Moments.</p>
        </div>
        <div className="hidden sm:flex items-center gap-3 z-10">
            <button className="px-5 py-2.5 rounded-full font-semibold bg-white/10 hover:bg-white/20 transition-colors duration-300">
                Log in
            </button>
            <button className="px-5 py-2.5 rounded-full font-bold bg-white text-black hover:bg-gray-200 transition-colors duration-300">
                Sign up
            </button>
        </div>
    </header>
);


const Footer = ({ bgColor, dropdownColor, onContactClick }) => (
     <footer className="w-full" style={{ backgroundColor: bgColor }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
            {/* Mobile Layout*/}
            <div className="flex flex-col items-center gap-8 md:hidden">
                <a href="#" className="flex items-center gap-3">
                    <div className="bg-black/10 p-2 rounded-lg"><MusicIcon className="text-gray-800" /></div>
                    <span className="text-xl font-bold text-gray-800">KaiROS</span>
                </a>
                <div className="text-white/90 flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer" style={{backgroundColor: dropdownColor}}>
                    <span>English (US)</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
                <nav className="flex flex-wrap justify-center items-center gap-6 font-medium text-gray-600">
                    <a href="#" className="hover:text-black transition-colors">Cookies</a>
                    {/* --- MODIFIED LINK --- */}
                    <a href="#" onClick={(e) => { e.preventDefault(); onContactClick(); }} className="hover:text-black transition-colors">Contact Us</a>
                    <a href="#" className="hover:text-black transition-colors">About us</a>
                </nav>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-3 md:items-center">
                <div className="justify-self-start">
                    <a href="#" className="flex items-center gap-3">
                        <div className="bg-black/10 p-2 rounded-lg"><MusicIcon className="text-gray-800" /></div>
                        <span className="text-xl font-bold text-gray-800">KaiROS</span>
                    </a>
                </div>
                <div className="justify-self-center">
                    <div className="text-white/90 flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer" style={{backgroundColor: dropdownColor}}>
                        <span>English (US)</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                </div>
                <div className="justify-self-end">
                    <nav className="flex items-center gap-6 font-medium text-gray-600">
                        <a href="#" className="hover:text-black transition-colors">Cookies</a>
                        {/* --- MODIFIED LINK --- */}
                        <a href="#" onClick={(e) => { e.preventDefault(); onContactClick(); }} className="hover:text-black transition-colors">Contact Us</a>
                        <a href="#" className="hover:text-black transition-colors">About us</a>
                    </nav>
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-400/50 text-center">
                <p className="text-gray-500">KaiROS, 2025, All rights reserved (no we don't)</p>
            </div>
        </div>
    </footer>
);

// Home Page
const HomePage = ({ onGetStarted, onGoHome, onContactClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <motion.div initial="initial" animate="in" exit="out" variants={animations} transition={pageTransition}>
            <div className="min-h-screen bg-cover bg-bottom flex flex-col font-sans relative overflow-hidden" style={{ backgroundImage: `url(${pageBackground})` }}>
                <header className="absolute top-0 left-0 right-0 p-6 md:p-8 z-20">
                    <nav className="container mx-auto flex justify-between items-center">
                        <a href="#" onClick={(e) => { e.preventDefault(); onGoHome && onGoHome(); }} className="flex items-center gap-3 cursor-pointer">
                            <div className="bg-[#FFC5C2] p-2 rounded-lg"><MusicIcon className="text-gray-900" /></div>
                            <span className="text-2xl font-bold tracking-wide text-gray-900">KaiROS</span>
                        </a>
                        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 px-4 py-2 rounded-full font-medium text-gray-800" style={{backgroundColor: '#FFC5C2'}}>Connect. Emotions. Cherish. Moments.</div>
                        <div className="hidden md:flex items-center space-x-4"><button className="font-semibold text-gray-800 px-5 py-2 rounded-md hover:bg-black/5 transition-colors">Log in</button><button className="font-semibold px-5 py-2 rounded-md bg-[#626161] text-white hover:bg-gray-700 transition-all">Sign up</button></div>
                        <div className="md:hidden"><button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-900">{isMenuOpen ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>}</button></div>
                    </nav>
                </header>
                <div className={`md:hidden absolute top-0 left-0 w-full h-full bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-8 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}><a href="#" className="text-2xl font-semibold text-gray-800">Home</a><a href="#" className="text-2xl font-semibold text-gray-800">About</a><a href="#" className="text-2xl font-semibold text-gray-800">Contact</a><div className="mt-8 flex flex-col gap-4 w-4/5"><button className="font-semibold w-full text-gray-800 px-5 py-3 rounded-md border border-gray-400">Log in</button><button className="font-semibold w-full px-5 py-3 rounded-md bg-[#626161] text-white">Sign up</button></div></div>
                <main className="flex-grow flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 md:pl-20 relative z-0">
                    <div className="max-w-2xl px-8 py-10 rounded-xl mt-32 md:mt-0" style={{ backgroundColor: '#FADCD9' }}>
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-800">An audio recognition based <br /> Scalable AI.</h1>
                        <p className="mt-4 text-md md:text-lg text-gray-700 max-w-lg">Our technology processes your audio files and recommends songs based on your preferences.</p>
                    </div>
                    <button
                        onClick={onGetStarted}
                        className="mt-8 px-12 py-4 font-oswald tracking-wider text-xl rounded-full shadow-lg transition-all transform hover:scale-105 text-gray-800"
                        style={{ backgroundColor: '#FFC5C2' }}
                    >
                        Get started
                    </button>
                </main>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 w-full md:w-auto flex justify-center">
                    <div className="p-3 rounded-md font-bold text-gray-800" style={{ backgroundColor: '#FADCD9' }}>TEAM NO FUTURE</div>
                </div>
                <div className="hidden md:flex absolute bottom-8 right-8 space-x-6 text-gray-900 font-semibold">
                    <a href="#" className="hover:underline transition-colors">ABOUT US</a>
                    {/* --- MODIFIED LINK --- */}
                    <a href="#" onClick={(e) => { e.preventDefault(); onContactClick(); }} className="hover:underline transition-colors">CONTACT US</a>
                </div>
            </div>
        </motion.div>
    );
};

// Landing Page
const LandingPage = ({ onUpload, onGoHome, onContactClick }) => {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            onUpload(file);
        }
    };

    const handleUploadClick = () => { fileInputRef.current.click(); };

    return (
        <motion.div initial="initial" animate="in" exit="out" variants={animations} transition={pageTransition}>
            <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F2EBAF' }}>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="audio/*" />
                <div className="text-white rounded-b-[3rem] md:rounded-b-[5rem] drop-shadow-2xl flex-grow" style={{ backgroundColor: '#8B7DD8' }}>
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 h-full flex flex-col">
                        <Header onGoHome={onGoHome} />
                        <main className="flex-grow flex flex-col items-center justify-center text-center py-20 sm:py-24 lg:py-32">
                            <div className="max-w-4xl w-full">
                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight" style={{ color: '#FDE047' }}>Listen to the Feeling, Not Just the Sound</h1>
                                <div className="max-w-2xl mx-auto mt-6 text-white/90 text-lg leading-relaxed space-y-4"><p>We create AI that moves beyond simple sound recognition to perceive the subtle, human nuances in speech.</p><p className="mt-4 font-semibold">Upload a music file and we'll get started.</p></div>
                                <div className="mt-10"><button onClick={handleUploadClick} className="bg-[#3D451] hover:bg-[#2c313a] text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">{fileName ? `Uploading: ${fileName}` : 'Upload Music'}</button></div>
                            </div>
                        </main>
                    </div>
                </div>
                {/* --- MODIFIED FOOTER --- */}
                <Footer bgColor="#F2EBAF" dropdownColor="#8A898F" onContactClick={onContactClick} />
            </div>
        </motion.div>
    );
};

// Processing Page
const ProcessingPage = ({ error, onStartOver, onGoHome, onContactClick }) => (
    <motion.div initial="initial" animate="in" exit="out" variants={animations} transition={pageTransition}>
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#D7E5A2' }}>
            <div className="text-white rounded-b-[3rem] md:rounded-b-[5rem] drop-shadow-2xl flex-grow flex flex-col" style={{ backgroundColor: '#7CAA73' }}>
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 w-full">
                    <Header onGoHome={onGoHome} />
                </div>
                <main className="flex-grow flex items-center justify-center text-center p-4">
                    {error ? (
                        <div className="bg-black/20 p-8 rounded-2xl shadow-lg text-center relative -translate-x-[15px]">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-red-300">Analysis Failed</h1>
                            <p className="text-lg text-white/80 max-w-md mb-8">{error}</p>
                            <button
                                onClick={onStartOver}
                                className="bg-red-400 text-white font-bold text-lg px-10 py-3 rounded-full shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <div className="relative -translate-x-[15px]">
                            <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center">Analyzing your song...</h1>
                            <div className="flex items-center justify-center gap-4">
                                <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-white"></div>
                                <p className="text-lg">Processing</p>
                            </div>
                            <p className="text-white/80 mt-2 text-center">Please be patient, our model is listening carefully.</p>
                        </div>
                    )}
                </main>
            </div>
           {/* --- MODIFIED FOOTER --- */}
           <Footer bgColor="#D7E5A2" dropdownColor="#787B7A" onContactClick={onContactClick} />
        </div>
    </motion.div>
);

// Results Page
const ResultsPage = ({ result, onStartOver, onGoHome, onContactClick }) => {
    if (!result || !result.emotion || !result.recommendations) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
                <p>Loading results or data is incomplete...</p>
            </div>
        );
    }

    return (
        <motion.div initial="initial" animate="in" exit="out" variants={animations} transition={pageTransition}>
            <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#E5CBA2' }}>
                <div className="text-white rounded-b-[3rem] md:rounded-b-[5rem] drop-shadow-2xl flex-grow" style={{ backgroundColor: '#477B80' }}>
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 h-full flex flex-col">
                        <Header onGoHome={onGoHome} />
                        <main className="flex-grow flex flex-col lg:flex-row items-center justify-center text-center lg:text-left p-4 gap-12 py-20 sm:py-24 lg:py-32">
                            <div className="w-full lg:w-2/5 flex flex-col items-center lg:items-start space-y-8">
                                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                                    The song seems to be:
                                    <span className="capitalize block text-yellow-300 text-6xl md:text-7xl mt-2">{result.emotion}</span>
                                </h1>
                                <button
                                    onClick={onStartOver}
                                    className="bg-white/90 text-gray-800 text-xl font-bold px-10 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
                                >
                                    Try Another Song
                                </button>
                            </div>

                            <div className="w-full lg:w-3/5">
                                <h2 className="text-3xl font-bold mb-6 text-center">Recommended Songs</h2>
                                <div className="bg-black/20 p-6 rounded-2xl max-h-[28rem] overflow-y-auto">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {result.recommendations.map((song, index) => (
                                            <div key={index} className="bg-white/10 p-4 rounded-lg flex items-center gap-3 hover:bg-white/20 transition-colors">
                                                <span className="text-xl font-bold text-white/50">{index + 1}.</span>
                                                <div className="flex flex-col text-left min-w-0"> {/* Added min-w-0 for truncation */}
                                                    <span className="text-lg truncate font-semibold" title={song.song_name}>{song.song_name}</span>
                                                    <span className="text-sm text-white/70">{song.predicted_emotion}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
               {/* --- MODIFIED FOOTER --- */}
               <Footer bgColor="#E5CBA2" dropdownColor="#787B7A" onContactClick={onContactClick} />
            </div>
        </motion.div>
    );
};


// --- NEW COMPONENT: ContactModal ---

const modalBackdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const modalContentVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
};

const ContactModal = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        variants={modalBackdropVariants}
                        onClick={onClose}
                    ></motion.div>

                    {/* Modal Content */}
                    <motion.div
                        className="relative z-10 w-full max-w-md p-6 bg-white rounded-2xl shadow-xl text-gray-800"
                        variants={modalContentVariants}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-700 transition-colors"
                                aria-label="Close modal"
                            >
                                {/* Close Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <p className="text-lg">For any inquiries, please email us at:</p>
                        <p className="mt-2 text-xl font-semibold text-center bg-gray-100 p-3 rounded-lg text-blue-600 break-words">
                            KaiROSnoFuture@gmail.com
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


// Main App Logic
function App() {
    const [page, setPage] = useState('home');
    const [analysisResult, setAnalysisResult] = useState(null);
    const [error, setError] = useState(null);
    const [showContactModal, setShowContactModal] = useState(false); // <-- ADDED STATE

    const HometoLang = useRef({ play: () => {}, currentTime: 0 });
    const LandgtoProcesng = useRef({ play: () => {}, currentTime: 0 });
    const ProcesngtoResults = useRef({ play: () => {}, currentTime: 0 });

    const transnHometoLandg = () => {
        if (HometoLang.current) {
            HometoLang.current.currentTime = 0;
            HometoLang.current.play();
        }
    };

    const transnLandgtoProcesng = () => {
        if (LandgtoProcesng.current) {
            LandgtoProcesng.current.currentTime = 0;
            LandgtoProcesng.current.play();
        }
    };

    const transnProcesngtoResults = () => {
        if (ProcesngtoResults.current) {
            ProcesngtoResults.current.currentTime = 0;
            ProcesngtoResults.current.play();
        }
    };

    const handleGetStarted = () => {
        transnHometoLandg();
        setPage('landing');
    };

    const handleStartOver = () => {
        transnHometoLandg();
        setAnalysisResult(null);
        setError(null);
        setPage('landing');
    };

    const handleGoHome = () => {
        setPage('home');
    };
    
    // --- ADDED HANDLERS ---
    const openContactModal = () => setShowContactModal(true);
    const closeContactModal = () => setShowContactModal(false);
    // ---------------------

    // --- THIS IS THE CORRECTED FUNCTION ---
    const handleUpload = async (file) => {
        transnLandgtoProcesng();
        setPage('processing');
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            // 1. Call ONLY the /recommend endpoint (like in your old code)
            const response = await fetch('http://127.0.0.1:5000/recommend', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                // Get error details from backend if possible
                const errorData = await response.json().catch(() => ({ error: 'An unknown error occurred.' }));
                throw new Error(errorData.error || 'Could not get recommendations.');
            }

            const data = await response.json();

            // 2. Use the data structure from your old code
            const combinedResult = {
                emotion: data.seed_song_analysis.emotion,
                recommendations: data.recommendations
            };
            
            // 3. Play sound and set page
            transnProcesngtoResults();
            setAnalysisResult(combinedResult);
            setPage('results');

        } catch (err) {
            console.error("API call failed:", err);
            setError(err.message || 'Failed to fetch. Please check your connection.');
            setPage('processing'); // Stay on processing page to show the error
        }
    };
    // ------------------------------------

    const renderPage = () => {
        switch (page) {
            case 'landing':
                // --- PROP ADDED ---
                return <LandingPage key="landing" onUpload={handleUpload} onGoHome={handleGoHome} onContactClick={openContactModal} />;
            case 'processing':
                // --- PROP ADDED ---
                return <ProcessingPage key="processing" error={error} onStartOver={handleStartOver} onGoHome={handleGoHome} onContactClick={openContactModal} />;
            case 'results':
                // --- PROP ADDED ---
                return <ResultsPage key="results" result={analysisResult} onStartOver={handleStartOver} onGoHome={handleGoHome} onContactClick={openContactModal} />;
            case 'home':
            default:
                // --- PROP ADDED ---
                return <HomePage key="home" onGetStarted={handleGetStarted} onGoHome={handleGoHome} onContactClick={openContactModal} />;
        }
    };

    return (
        <>
            <audio ref={HometoLang} src={softSound} preload="auto" />
            <audio ref={LandgtoProcesng} src={uploadSound} preload="auto" />
            <audio ref={ProcesngtoResults} src={resultsSound} preload="auto" />
            
            {/* --- ADDED MODAL RENDER --- */}
            <ContactModal isOpen={showContactModal} onClose={closeContactModal} />
            
            <AnimatePresence mode="wait">
                {renderPage()}
            </AnimatePresence>
        </>
    );
}

export default App;