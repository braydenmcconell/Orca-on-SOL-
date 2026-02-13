
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Twitter, 
  Send, 
  Copy, 
  Check, 
  BarChart3, 
  Wallet, 
  Cpu, 
  ShieldAlert,
  Menu,
  X,
  Zap,
  ChevronDown,
  Info,
  Waves,
  // Fix: Added missing ArrowRight icon import
  ArrowRight
} from 'lucide-react';
import { TOKEN_INFO, SOCIAL_LINKS, FLASHCARDS_DATA } from './constants';
import { transformImageToOrca } from './services/geminiService';
import { ToolState } from './types';

// --- Helper Components ---

const Button: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  href?: string;
  disabled?: boolean;
}> = ({ children, onClick, variant = 'primary', className = '', href, disabled }) => {
  const baseStyles = "relative px-8 py-4 font-display uppercase tracking-widest text-sm transition-all active:scale-95 flex items-center justify-center gap-2 overflow-hidden group";
  const variants = {
    primary: "bg-neon-pink text-white hover:bg-opacity-80 shadow-[4px_4px_0px_#00f3ff] disabled:opacity-50",
    secondary: "bg-neon-cyan text-black hover:bg-opacity-80 shadow-[4px_4px_0px_#ff007f] disabled:opacity-50",
    outline: "border-2 border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white disabled:opacity-50"
  };

  const content = (
    <span className="relative z-10 flex items-center gap-2">
      {children}
    </span>
  );

  const glow = (
    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${baseStyles} ${variants[variant]} ${className}`}>
        {glow}
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {glow}
      {content}
    </button>
  );
};

const SectionTitle: React.FC<{ children: React.ReactNode; subtitle?: string }> = ({ children, subtitle }) => (
  <div className="mb-16 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-5xl md:text-7xl font-display uppercase mb-4 cyber-glow tracking-tighter"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center gap-3 text-neon-cyan font-mono text-sm tracking-widest uppercase"
      >
        <span className="w-8 h-px bg-neon-cyan/50"></span>
        {subtitle}
        <span className="w-8 h-px bg-neon-cyan/50"></span>
      </motion.div>
    )}
  </div>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Chase', href: '#chase' },
    { label: 'Identity', href: '#ca' },
    { label: 'AI Labs', href: '#ai' },
    { label: 'Intel', href: '#facts' },
    { label: 'Terminal', href: '#trade' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0d0221]/90 backdrop-blur-xl py-4 border-b border-neon-pink/20' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-neon-pink flex items-center justify-center group-hover:rotate-[360deg] transition-transform duration-700 shadow-[0_0_15px_#ff007f]">
             <span className="font-display text-2xl text-white">O</span>
          </div>
          <span className="font-display text-xl tracking-tighter hidden sm:block group-hover:text-neon-cyan transition-colors">ORCA ON SOL</span>
        </a>

        <div className="hidden md:flex gap-10">
          {links.map(link => (
            <a key={link.href} href={link.href} className="font-mono text-xs font-bold tracking-[0.2em] hover:text-neon-pink transition-all uppercase relative group">
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon-pink transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-[#0d0221] z-[60] flex flex-col p-10 gap-8"
          >
            <div className="flex justify-between items-center mb-10">
              <span className="font-display text-2xl">ORCA</span>
              <button onClick={() => setIsOpen(false)}><X size={40} className="text-neon-pink" /></button>
            </div>
            {links.map(link => (
              <a 
                key={link.href} 
                href={link.href} 
                className="font-display text-4xl hover:text-neon-pink transition-colors border-b border-white/5 pb-4"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ChaseScene: React.FC = () => {
  const [viewMode, setViewMode] = useState<'cyber' | 'realism'>('realism');

  return (
    <section id="chase" className="py-24 bg-[#0a0118] overflow-hidden relative border-y-4 border-neon-pink">
      {/* Dynamic Water Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518114055437-075836c28f67?auto=format&fit=crop&q=80&w=1920')] bg-cover"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="text-left">
            <h2 className="text-5xl md:text-8xl font-display uppercase mb-4 cyber-glow tracking-tighter">THE GREAT HUNT</h2>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-neon-pink text-white font-mono text-[10px] uppercase">Status: Lethal</span>
              <p className="text-neon-cyan font-mono text-sm tracking-[0.2em]">OBSERVE THE APEX PREDATOR IN ACTION</p>
            </div>
          </div>
          <div className="flex gap-2 p-1.5 bg-black/80 backdrop-blur-md border border-neon-pink/30 shadow-[0_0_20px_rgba(255,0,127,0.2)]">
            <button 
              onClick={() => setViewMode('cyber')}
              className={`px-6 py-3 font-mono text-[10px] uppercase tracking-widest transition-all ${viewMode === 'cyber' ? 'bg-neon-pink text-white' : 'text-gray-500 hover:text-white'}`}
            >
              Tactical HUD
            </button>
            <button 
              onClick={() => setViewMode('realism')}
              className={`px-6 py-3 font-mono text-[10px] uppercase tracking-widest transition-all ${viewMode === 'realism' ? 'bg-neon-cyan text-black' : 'text-gray-500 hover:text-white'}`}
            >
              Cinematic Reality
            </button>
          </div>
        </div>
        
        <div className="relative h-[650px] w-full bg-black shadow-[0_0_60px_rgba(0,0,0,0.8)] border-2 border-neon-pink/20 overflow-hidden">
          <AnimatePresence mode="wait">
            {viewMode === 'cyber' ? (
              <motion.div 
                key="cyber-view"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="absolute inset-0 flex items-center"
              >
                {/* HUD Grid Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-10 pointer-events-none"></div>
                <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] h-full opacity-5 pointer-events-none">
                  {[...Array(40)].map((_, i) => <div key={i} className="border-r border-neon-cyan h-full"></div>)}
                </div>

                <motion.div 
                  animate={{ x: ['-20%', '120%'] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="flex items-center gap-24 relative z-20"
                >
                  <div className="relative">
                    <div className="absolute -inset-10 bg-neon-pink/30 blur-3xl rounded-full animate-pulse"></div>
                    <img src="https://picsum.photos/seed/orca-wire/400/400" alt="Orca HUD" className="w-40 h-40 object-contain border-4 border-neon-pink brightness-150 contrast-150" />
                    <div className="absolute -top-10 -right-10 bg-neon-pink text-white px-4 py-2 text-xs font-mono border-2 border-black">
                      ID: APEX_01<br/>SPD: 55KN<br/>HDG: 220°
                    </div>
                  </div>
                  
                  <div className="relative h-2 w-96 bg-neon-pink/10 overflow-hidden">
                    <motion.div 
                      animate={{ x: ['-100%', '100%'] }} 
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-neon-pink to-transparent"
                    ></motion.div>
                  </div>

                  <div className="relative">
                    <img src="https://picsum.photos/seed/penguin-wire/200/200" alt="Penguin HUD" className="w-24 h-24 object-contain border-2 border-white/20 grayscale" />
                    <div className="absolute -top-10 -right-10 bg-white text-black px-4 py-2 text-xs font-mono border-2 border-neon-pink">
                      ID: PREY_X<br/>SPD: 12KN<br/>THREAT: 99%
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                key="realism-view"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-[#051319]"
              >
                {/* High-Resolution Cinematic Background */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80"></div>
                </div>

                {/* Particle Effects (Bubbles) */}
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 700, x: Math.random() * 1400, opacity: 0 }}
                    animate={{ y: -100, opacity: [0, 0.4, 0] }}
                    transition={{ 
                      duration: 3 + Math.random() * 5, 
                      repeat: Infinity, 
                      delay: Math.random() * 10,
                      ease: "linear"
                    }}
                    className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
                  />
                ))}

                {/* The Orca Lunge (Inspired by user image) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative w-full h-full">
                    {/* Orca Body */}
                    <motion.div 
                      initial={{ scale: 0.8, y: 100, opacity: 0 }}
                      animate={{ scale: 1, y: 0, opacity: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute inset-0 flex items-center justify-center z-10"
                    >
                      <motion.div
                        animate={{ y: [-15, 15, -15], rotate: [-1, 1, -1] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative max-w-5xl px-12"
                      >
                        {/* Dramatic Lighting Glow */}
                        <div className="absolute -inset-20 bg-cyan-500/10 blur-[100px] rounded-full"></div>
                        
                        {/* Main Orca Image (mimics the user's high-realism request) */}
                        <img 
                          src="https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=1200" 
                          alt="Cinematic Orca" 
                          className="w-full h-auto object-contain drop-shadow-[0_0_50px_rgba(0,0,0,0.8)] contrast-125 brightness-90"
                        />
                        
                        {/* Overlay Splash Graphics */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"></div>
                      </motion.div>
                    </motion.div>

                    {/* The Penguin Escape */}
                    <motion.div 
                      initial={{ scale: 0.2, x: 200, y: 200, opacity: 0 }}
                      animate={{ scale: 1, x: 50, y: 150, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                      className="absolute bottom-1/4 right-1/4 z-20"
                    >
                      <motion.div
                        animate={{ 
                          x: [-30, 30, -30], 
                          y: [20, -10, 20],
                          rotate: [-10, 15, -10]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="relative"
                      >
                        <img 
                          src="https://images.unsplash.com/photo-1517783999520-f068d7431a60?auto=format&fit=crop&q=80&w=400" 
                          alt="Penguin Escape" 
                          className="w-40 h-40 object-cover rounded-full border-4 border-neon-cyan/40 shadow-2xl brightness-110 contrast-125"
                        />
                        <div className="absolute -top-6 -right-6 bg-neon-pink text-white px-4 py-1 font-mono text-xs uppercase shadow-[4px_4px_0px_#000]">TARGET_LOCKED</div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>

                {/* Cinematic Letterboxing and HUD Details */}
                <div className="absolute inset-0 z-30 pointer-events-none">
                  <div className="h-16 w-full bg-black/60 backdrop-blur-sm border-b border-neon-cyan/20 flex items-center px-10">
                    <div className="flex gap-8 text-[10px] font-mono text-neon-cyan/80">
                      <span>BIOMETRIC_LINK: ESTABLISHED</span>
                      <span className="hidden sm:inline">PULSE: 42BPM</span>
                      <span className="text-white animate-pulse">DETECTING PREY...</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 h-16 w-full bg-black/60 backdrop-blur-sm border-t border-neon-pink/20 flex items-center justify-center">
                    <div className="text-[10px] font-mono tracking-[0.5em] text-neon-pink uppercase">
                      :: APEX PROTOCOL ENGAGED :: LEVEL 09 ::
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-12 text-center">
          <p className="font-mono text-xs text-gray-600 uppercase tracking-widest leading-loose">
            The ocean is a dark place. Those who don't hunt become the hunted.<br/>
            $ORCA is here to dominate the ecosystem.
          </p>
        </div>
      </div>
    </section>
  );
};

const AIModule: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<ToolState>(ToolState.IDLE);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setTransformedImage(null);
        setStatus(ToolState.IDLE);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTransform = async () => {
    if (!selectedImage) return;
    setStatus(ToolState.LOADING);
    try {
      const result = await transformImageToOrca(selectedImage);
      setTransformedImage(result);
      setStatus(ToolState.SUCCESS);
    } catch (err) {
      console.error(err);
      setStatus(ToolState.ERROR);
    }
  };

  return (
    <section id="ai" className="py-32 max-w-[1400px] mx-auto px-6">
      <SectionTitle subtitle="GENERATE YOUR CYBERPOD AVATAR">AI NEURAL FORGE</SectionTitle>
      
      <div className="grid md:grid-cols-2 gap-16 items-start bg-black border-4 border-neon-pink p-10 shadow-[20px_20px_0px_rgba(0,243,255,0.3)] relative overflow-hidden">
        {/* Background circuit lines */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="h-full w-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>

        <div className="space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-cyan/20 border border-neon-cyan text-neon-cyan font-mono text-[10px] uppercase">
             {/* Corrected label to match actual model used */}
             <Cpu size={12} /> Powered by Gemini 2.5 Flash
          </div>
          <h3 className="text-4xl md:text-5xl font-display leading-tight uppercase">JOIN THE POD</h3>
          <p className="text-gray-400 font-mono text-sm leading-relaxed">
            Scan your physical presence to create a unique Cybernetic Orca identification. Our neural networks will adapt your biological data into high-performance predatory hardware.
          </p>
          
          <div className="border-2 border-dashed border-neon-cyan/50 p-12 flex flex-col items-center gap-6 hover:border-neon-pink transition-all bg-white/5 group cursor-pointer">
            <input 
              type="file" 
              accept="image/*" 
              id="image-upload" 
              className="hidden" 
              onChange={handleFileChange}
            />
            <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center w-full">
              <div className="w-16 h-16 bg-neon-cyan/10 border-2 border-neon-cyan flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Waves className="text-neon-cyan" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-white">Select Bio-Data File</span>
              <span className="text-[10px] text-gray-500 mt-2">JPG, PNG, WEBP (MAX 5MB)</span>
            </label>
            {selectedImage && (
              <div className="flex items-center gap-2 text-neon-pink font-mono text-[10px] animate-pulse">
                 <Check size={12} /> SOURCE DETECTED
              </div>
            )}
          </div>

          <Button 
            onClick={handleTransform} 
            variant="primary" 
            className="w-full h-16"
            disabled={!selectedImage || status === ToolState.LOADING}
          >
            {status === ToolState.LOADING ? (
              <span className="flex items-center gap-3">
                 <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin"></div>
                 ENCODING DNA...
              </span>
            ) : 'INITIATE SWAP'}
          </Button>

          {status === ToolState.ERROR && (
             <p className="text-red-500 font-mono text-xs text-center flex items-center justify-center gap-2">
               <Info size={14} /> MAIN CLUSTER DISCONNECTED. PLEASE RETRY.
             </p>
          )}
        </div>

        <div className="flex flex-col items-center justify-center min-h-[500px] bg-[#0d0221] border-2 border-neon-cyan/50 overflow-hidden relative group">
          <AnimatePresence mode="wait">
            {!selectedImage && !transformedImage && (
              <motion.div 
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-gray-700 flex flex-col items-center p-12 text-center"
              >
                <div className="w-40 h-40 border-2 border-white/5 flex items-center justify-center text-6xl font-display mb-6 opacity-20">?</div>
                <p className="font-mono text-xs tracking-widest uppercase">WAITING FOR INPUT SIGNAL</p>
              </motion.div>
            )}

            {selectedImage && !transformedImage && status !== ToolState.LOADING && (
               <motion.div 
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full relative"
               >
                 <img 
                    src={selectedImage} 
                    className="w-full h-full object-cover grayscale opacity-30"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neon-pink/20 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="px-6 py-2 border-2 border-neon-pink text-neon-pink font-mono text-xs tracking-widest bg-black">PRE-ANALYTIC VIEW</div>
                  </div>
               </motion.div>
            )}

            {status === ToolState.LOADING && (
              <motion.div 
                key="loading"
                className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/60 backdrop-blur-md"
              >
                <div className="relative">
                  <div className="w-24 h-24 border-4 border-neon-pink border-t-transparent animate-spin rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Cpu className="text-neon-pink animate-pulse" />
                  </div>
                </div>
                <p className="font-mono text-sm tracking-[0.3em] mt-8 text-neon-pink animate-pulse uppercase">Neural Linking...</p>
                <div className="w-48 h-1 bg-white/10 mt-4 overflow-hidden">
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-full bg-neon-cyan"
                  ></motion.div>
                </div>
              </motion.div>
            )}

            {transformedImage && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-full relative group"
              >
                <img 
                  src={transformedImage} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-[20px] border-black/20 group-hover:border-neon-pink/10 transition-all pointer-events-none"></div>
                <div className="absolute bottom-6 right-6 flex flex-col items-end gap-2">
                  <div className="bg-neon-pink text-white px-6 py-2 font-display text-sm shadow-[8px_8px_0px_#000]">
                    AVATAR GEN_01
                  </div>
                  <div className="bg-black/80 text-neon-cyan px-4 py-1 font-mono text-[10px] uppercase">
                    Verification Confirmed
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Flashcards: React.FC = () => {
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <section id="facts" className="py-32 bg-black relative">
       {/* Background glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-neon-pink/5 blur-[200px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <SectionTitle subtitle="SYSTEM SPECIFICATIONS">POD PROTOCOLS</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {FLASHCARDS_DATA.map((card) => (
            <div 
              key={card.id}
              className="h-80 cursor-pointer group perspective"
              onClick={() => setFlipped(flipped === card.id ? null : card.id)}
            >
              <motion.div 
                className="w-full h-full relative transition-all duration-700 preserve-3d shadow-2xl"
                animate={{ rotateY: flipped === card.id ? 180 : 0 }}
              >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-[#120a2e] border-2 border-neon-pink/30 p-10 flex flex-col items-start justify-between group-hover:border-neon-pink transition-colors">
                  <div className="w-12 h-12 bg-neon-pink/10 flex items-center justify-center text-neon-pink group-hover:scale-110 transition-transform">
                    <Zap size={24} />
                  </div>
                  <div>
                    <span className="text-neon-pink font-mono text-[10px] mb-3 uppercase tracking-[0.3em]">Protocol {card.id}</span>
                    <h4 className="text-2xl font-display leading-tight">{card.question}</h4>
                  </div>
                  <div className="flex items-center gap-2 text-neon-cyan font-mono text-[10px] uppercase tracking-widest mt-4">
                    <span className="animate-pulse">Click to decrypt</span>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden bg-neon-pink border-4 border-neon-cyan p-10 flex flex-col items-center justify-center text-center transform rotate-y-180">
                   <div className="text-black/20 font-display text-8xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
                     {card.id}
                   </div>
                  <p className="text-black font-display text-2xl uppercase leading-tight relative z-10 italic">
                    "{card.answer}"
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .perspective { perspective: 2000px; }
        .backface-hidden { backface-visibility: hidden; }
        .preserve-3d { transform-style: preserve-3d; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </section>
  );
};

const Hero: React.FC = () => {
  return (
    <header className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-[#0d0221]">
      {/* Animated Background Layers */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center mix-blend-screen animate-[pulse_10s_infinite]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0221]/60 to-[#0d0221]"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
             <motion.div
               key={i}
               animate={{ 
                 y: [-20, 20, -20], 
                 opacity: [0.1, 0.4, 0.1],
                 scale: [1, 1.2, 1]
               }}
               transition={{ duration: 5 + Math.random() * 5, repeat: Infinity }}
               className="absolute w-2 h-2 bg-neon-cyan rounded-full blur-[2px]"
               style={{ 
                 left: `${Math.random() * 100}%`, 
                 top: `${Math.random() * 100}%` 
               }}
             />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-2 mb-10 bg-white/5 border border-neon-pink/50 backdrop-blur-md rounded-full"
          >
            <div className="w-2 h-2 bg-neon-pink rounded-full animate-ping"></div>
            <span className="text-white font-mono text-[10px] tracking-[0.4em] uppercase">Solana Mainnet :: Signal Established</span>
          </motion.div>

          <h1 className="text-7xl md:text-[10rem] mb-6 leading-none tracking-tighter cyber-glow font-display italic">
            $ORCA
          </h1>
          
          <div className="max-w-2xl mx-auto mb-16">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-2xl md:text-3xl text-neon-cyan font-display uppercase tracking-widest leading-tight"
            >
              The Apex Predator of <span className="text-white">Solana</span>. No Mercy for Penguins.
            </motion.p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Button href={SOCIAL_LINKS.raydium} variant="primary" className="w-full sm:w-auto min-w-[240px]">
              <Wallet size={20} />
              INITIATE SWAP
            </Button>
            <Button href={SOCIAL_LINKS.telegram} variant="outline" className="w-full sm:w-auto min-w-[240px]">
              <Send size={20} />
              CONNECT_NODE
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Hero Visual Element */}
      <motion.div 
        animate={{ 
          y: [-15, 15, -15],
          rotate: [0, 3, 0],
          scale: [1, 1.02, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-20 hidden lg:block opacity-40 hover:opacity-100 transition-opacity"
      >
        <div className="relative p-12">
          <div className="absolute inset-0 border-2 border-neon-cyan/20 animate-pulse"></div>
          <div className="absolute inset-4 border border-neon-pink/20"></div>
          <div className="font-display text-8xl text-neon-pink/20 select-none">ORCA</div>
          <div className="mt-4 font-mono text-[10px] text-neon-cyan uppercase tracking-[1em]">Apex_Entity_v3</div>
        </div>
      </motion.div>
    </header>
  );
};

const ContractSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(TOKEN_INFO.ca);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ca" className="py-32 bg-black relative border-y border-white/5">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="bg-[#120a2e] border-l-8 border-neon-pink p-12 md:p-20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Info size={200} />
          </div>
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-16 relative z-10">
            <div className="flex-1">
              <h3 className="text-4xl md:text-6xl font-display mb-8 uppercase tracking-tighter">ORCA_IDENTIFIER</h3>
              <p className="text-gray-400 font-mono text-sm mb-10 leading-relaxed max-w-xl">
                The primary cryptographic key for interacting with the $ORCA ecosystem. Verified secure on the Solana blockchain. Accept no imitations.
              </p>
              
              <div className="flex flex-col gap-4">
                <div className="relative group/ca">
                  <div className="absolute -inset-1 bg-gradient-to-r from-neon-pink to-neon-cyan opacity-20 group-hover/ca:opacity-50 transition-opacity blur"></div>
                  <div className="relative bg-black p-6 font-mono text-lg text-neon-cyan border border-white/10 flex items-center justify-between overflow-hidden">
                    <span className="truncate">{TOKEN_INFO.ca}</span>
                    <button 
                      onClick={copyToClipboard}
                      className="ml-4 bg-neon-pink text-white p-3 hover:scale-110 active:scale-90 transition-all flex-shrink-0"
                    >
                      {copied ? <Check size={24} /> : <Copy size={24} />}
                    </button>
                  </div>
                </div>
                {copied && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-neon-pink font-mono text-[10px] uppercase tracking-widest mt-2">Hash copied to neural clipboard</motion.p>}
              </div>
            </div>

            <div className="w-full lg:w-auto">
              <div className="bg-white p-6 shadow-[0_0_50px_rgba(255,255,255,0.1)] group-hover:rotate-3 transition-transform">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${TOKEN_INFO.ca}`} alt="QR Code" className="w-56 h-56" />
                <p className="text-[10px] font-mono text-black text-center mt-4 uppercase font-bold tracking-widest">Digital Auth Link</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TradingSection: React.FC = () => {
  return (
    <section id="trade" className="py-32 bg-[#0d0221] relative">
      <div className="max-w-[1400px] mx-auto px-6">
        <SectionTitle subtitle="MARKET PENETRATION">HUNTING TERMINAL</SectionTitle>
        
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 bg-black border-2 border-neon-cyan/20 h-[700px] relative overflow-hidden group shadow-[0_0_80px_rgba(0,243,255,0.1)]">
            <div className="absolute inset-0 z-0 flex flex-col items-center justify-center opacity-40">
              <BarChart3 size={120} className="text-neon-cyan animate-pulse mb-6" />
              <p className="font-mono text-neon-cyan text-sm uppercase tracking-[0.5em]">Real-Time Feed Loading...</p>
            </div>
            
            <iframe 
              src={`https://dexscreener.com/solana/${TOKEN_INFO.ca}?embed=1&theme=dark&trades=0&info=0`}
              className="w-full h-full border-0 relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
              onLoad={(e) => (e.currentTarget.style.opacity = '1')}
              title="DexScreener Chart"
            />
          </div>

          <div className="flex flex-col gap-10">
            <div className="bg-[#1a1a1a] border border-neon-pink p-10 relative">
               <div className="absolute -top-4 -right-4 bg-neon-pink text-white p-2">
                 <Zap size={20} />
               </div>
              <h4 className="text-2xl font-display mb-8 uppercase italic">POD METRICS</h4>
              <ul className="space-y-6 font-mono text-sm">
                <li className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-gray-500 uppercase">Liquidity Pool</span>
                  <span className="text-neon-pink font-bold">LOCKED / BURNED</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-gray-500 uppercase">Ownership</span>
                  <span className="text-neon-cyan font-bold">REVOKED</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-gray-500 uppercase">Protocol Fee</span>
                  <span className="text-white">0% TAX</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-500 uppercase">Total Supply</span>
                  <span className="text-white">1,000,000,000</span>
                </li>
              </ul>
            </div>

            <div className="flex-1 bg-neon-cyan/5 border border-neon-cyan/30 p-10 flex flex-col justify-center gap-8 relative overflow-hidden group">
               <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-neon-cyan/10 blur-3xl rounded-full"></div>
              <h4 className="text-2xl font-display text-neon-cyan uppercase">EXECUTE SWAP</h4>
              <div className="space-y-4">
                <Button href={SOCIAL_LINKS.raydium} variant="secondary" className="w-full h-16 group/btn">
                  SWAP ON RAYDIUM
                  <ArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
                </Button>
                <Button href="#" variant="outline" className="w-full h-16 opacity-30 cursor-not-allowed">
                  JUPITER (SOON)
                </Button>
              </div>
              <div className="flex gap-4 items-start bg-black/40 p-4 border border-white/5">
                <ShieldAlert size={32} className="text-neon-pink flex-shrink-0" />
                <p className="text-[9px] font-mono text-gray-500 uppercase leading-relaxed tracking-wider">
                  DISCLAIMER: This is a meme project for entertainment. Crypto assets are volatile. Don't invest what you can't afford to lose in the depths.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-black py-32 border-t border-white/5 relative overflow-hidden">
       {/* Decorative bottom lines */}
       <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-pink"></div>

      <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-12 gap-16 mb-24">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-8">
             <div className="w-10 h-10 bg-neon-pink flex items-center justify-center shadow-[0_0_15px_#ff007f]">
                <span className="font-display text-2xl text-white">O</span>
             </div>
             <span className="font-display text-2xl tracking-tighter uppercase italic">ORCA ON SOL</span>
          </div>
          <p className="text-gray-500 font-mono text-sm max-w-md mb-10 leading-relaxed uppercase tracking-widest">
            Dominating the Solana ecosystem. The deep sea is our playground, the blockchain is our hunting ground.
          </p>
          <div className="flex gap-6">
            <a href={SOCIAL_LINKS.twitter} className="group relative w-14 h-14 border border-neon-pink flex items-center justify-center text-neon-pink overflow-hidden transition-all">
              <div className="absolute inset-0 bg-neon-pink translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <Twitter className="relative z-10 group-hover:text-white" />
            </a>
            <a href={SOCIAL_LINKS.telegram} className="group relative w-14 h-14 border border-neon-cyan flex items-center justify-center text-neon-cyan overflow-hidden transition-all">
              <div className="absolute inset-0 bg-neon-cyan translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <Send className="relative z-10 group-hover:text-black" />
            </a>
          </div>
        </div>

        <div className="md:col-span-2">
          <h5 className="font-display text-neon-pink mb-10 uppercase tracking-[0.3em] text-xs font-black">POD_MAP</h5>
          <ul className="space-y-6 font-mono text-[10px] text-gray-400 uppercase tracking-widest">
            <li><a href="#" className="hover:text-neon-cyan transition-colors">Surface</a></li>
            <li><a href="#chase" className="hover:text-neon-cyan transition-colors">The Hunt</a></li>
            <li><a href="#facts" className="hover:text-neon-cyan transition-colors">Intel Hub</a></li>
            <li><a href="#ai" className="hover:text-neon-cyan transition-colors">Neural Lab</a></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h5 className="font-display text-neon-pink mb-10 uppercase tracking-[0.3em] text-xs font-black">LEGAL_OUT</h5>
          <ul className="space-y-6 font-mono text-[10px] text-gray-400 uppercase tracking-widest">
            <li>NFA Notice</li>
            <li>DYOR Protocol</li>
            <li>Meme Only</li>
            <li>Zero Warranty</li>
          </ul>
        </div>

        <div className="md:col-span-3 flex flex-col items-end">
           <button 
             onClick={scrollToTop}
             className="w-16 h-16 border border-white/20 flex flex-col items-center justify-center text-gray-500 hover:text-neon-cyan hover:border-neon-cyan transition-all group"
           >
             <ChevronDown className="rotate-180 group-hover:-translate-y-2 transition-transform" />
             <span className="text-[8px] font-mono mt-2">SURFACE</span>
           </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
        <p className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.4em]">
          &copy; MMXXV ORCA_SOL_CTO :: ALL RECEPTIONS SECURED
        </p>
        <div className="flex items-center gap-3 text-neon-pink">
          <Waves size={14} className="animate-pulse" />
          <span className="text-[9px] font-mono uppercase tracking-[0.5em] font-bold">Apex Predation In Progress</span>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-neon-pink selection:text-white bg-[#0d0221] text-white">
      <Navbar />
      <Hero />
      <ChaseScene />
      <ContractSection />
      <AIModule />
      <Flashcards />
      <TradingSection />
      <Footer />
    </div>
  );
}
