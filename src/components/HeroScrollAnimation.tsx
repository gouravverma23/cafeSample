import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowDown, ArrowUpRight, MessageSquare, MapPin, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';
import { siteConfig } from '../config/site';

const TOTAL_FRAMES = 180;

interface Chapter {
  id: string;
  label: string;
  startProgress: number;
  endProgress: number;
  frame: number;
}

const CHAPTERS: Chapter[] = [
  { id: 'origin', label: '1. The Origin', startProgress: 0.0, endProgress: 0.22, frame: 1 },
  { id: 'grind', label: '2. The Grind', startProgress: 0.26, endProgress: 0.48, frame: 60 },
  { id: 'pour', label: '3. The Infusion', startProgress: 0.52, endProgress: 0.75, frame: 120 },
  { id: 'cup', label: '4. The Cup', startProgress: 0.78, endProgress: 1.0, frame: 180 },
];

export function HeroScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const loadedSetRef = useRef<Set<number>>(new Set());
  
  const [loadCount, setLoadCount] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const animationFrameIdRef = useRef<number | null>(null);
  const playRafIdRef = useRef<number | null>(null);

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(siteConfig.contact.whatsappPrefilledMessage)}`;

  // Formatter for frame paths
  const getFrameUrl = (idx: number) => {
    const frameNum = String(idx + 1).padStart(3, '0');
    return `/clipframes/ezgif-frame-${frameNum}.jpg`;
  };

  // Find nearest loaded frame index to guarantee zero visual blackouts
  const getNearestLoadedIndex = useCallback((targetIdx: number): number => {
    if (loadedSetRef.current.has(targetIdx)) {
      return targetIdx;
    }
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = targetIdx - offset;
      if (prev >= 0 && loadedSetRef.current.has(prev)) return prev;
      const next = targetIdx + offset;
      if (next < TOTAL_FRAMES && loadedSetRef.current.has(next)) return next;
    }
    return 0;
  }, []);

  // Draw a frame to canvas with aspect-ratio cover & high-DPI
  const renderFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const bestIdx = getNearestLoadedIndex(frameIdx);
    const img = imagesRef.current[bestIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;

    // Cover calculations
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasAspect > imgAspect) {
      drawHeight = width / imgAspect;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = height * imgAspect;
      offsetX = (width - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, [getNearestLoadedIndex]);

  // Adjust canvas resolution for Retina displays
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const newWidth = Math.round(rect.width * dpr);
    const newHeight = Math.round(rect.height * dpr);

    if (canvas.width !== newWidth || canvas.height !== newHeight) {
      canvas.width = newWidth;
      canvas.height = newHeight;
      renderFrame(currentFrameIndex);
    }
  }, [currentFrameIndex, renderFrame]);

  // Image preloading strategy (first frame immediately, then priority batch, then rest)
  useEffect(() => {
    let isCancelled = false;

    const loadImage = (idx: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        if (imagesRef.current[idx]) {
          return resolve(imagesRef.current[idx]!);
        }
        const img = new Image();
        img.src = getFrameUrl(idx);
        img.onload = () => {
          if (isCancelled) return;
          imagesRef.current[idx] = img;
          loadedSetRef.current.add(idx);
          setLoadCount((prev) => prev + 1);
          if (idx === 0) {
            renderFrame(0);
          }
          resolve(img);
        };
        img.onerror = reject;
      });
    };

    // 1. First frame immediately
    loadImage(0).then(() => {
      if (isCancelled) return;
      resizeCanvas();
    });

    // 2. High priority key frames (chapters)
    const priorityIndices = [0, 59, 119, 179, 15, 30, 45, 75, 90, 105, 135, 150, 165];
    priorityIndices.forEach((idx) => {
      if (idx < TOTAL_FRAMES) loadImage(idx);
    });

    // 3. Batched queue for all other frames
    const remainingIndices: number[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (!priorityIndices.includes(i)) {
        remainingIndices.push(i);
      }
    }

    // Concurrent loader
    const concurrency = 6;
    let cur = 0;
    const loadNext = () => {
      if (isCancelled || cur >= remainingIndices.length) return;
      const idx = remainingIndices[cur++];
      loadImage(idx).finally(() => {
        loadNext();
      });
    };

    for (let c = 0; c < concurrency; c++) {
      loadNext();
    }

    return () => {
      isCancelled = true;
    };
  }, [resizeCanvas, renderFrame]);

  // Listen to window resize
  useEffect(() => {
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  // Handle on-scroll frame calculation
  useEffect(() => {
    const handleScroll = () => {
      if (isPlaying) return; // scroll driven is paused when auto-playing
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollable = rect.height - viewportHeight;

      if (totalScrollable <= 0) return;

      // Calculate progress between 0 and 1
      const rawProgress = -rect.top / totalScrollable;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      setProgress(clampedProgress);

      const targetFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(clampedProgress * (TOTAL_FRAMES - 1)))
      );

      setCurrentFrameIndex(targetFrame);

      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      animationFrameIdRef.current = requestAnimationFrame(() => {
        renderFrame(targetFrame);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [renderFrame, isPlaying]);

  // Auto-play animation feature
  useEffect(() => {
    if (!isPlaying) {
      if (playRafIdRef.current) cancelAnimationFrame(playRafIdRef.current);
      return;
    }

    let startTimestamp: number | null = null;
    const duration = 6500; // 6.5s full cinematic loop
    const startProgress = progress >= 0.98 ? 0 : progress;

    const animate = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const p = Math.min(1, startProgress + (elapsed / duration) * (1 - startProgress));

      setProgress(p);
      const frame = Math.min(TOTAL_FRAMES - 1, Math.floor(p * (TOTAL_FRAMES - 1)));
      setCurrentFrameIndex(frame);
      renderFrame(frame);

      // Also gently sync window scroll to container
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        const totalScrollable = container.offsetHeight - window.innerHeight;
        const targetScrollY = window.scrollY + rect.top + p * totalScrollable;
        window.scrollTo({ top: targetScrollY, behavior: 'instant' });
      }

      if (p < 1) {
        playRafIdRef.current = requestAnimationFrame(animate);
      } else {
        setIsPlaying(false);
      }
    };

    playRafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (playRafIdRef.current) cancelAnimationFrame(playRafIdRef.current);
    };
  }, [isPlaying, renderFrame]);

  // Jump to specific chapter
  const scrollToChapter = (chapter: Chapter) => {
    setIsPlaying(false);
    const container = containerRef.current;
    if (!container) return;

    const totalScrollable = container.offsetHeight - window.innerHeight;
    const targetScrollY = window.scrollY + container.getBoundingClientRect().top + chapter.startProgress * totalScrollable;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  // Helper to determine opacity & transform of narrative phases
  const getPhaseStyles = (start: number, end: number, current: number) => {
    // Fade in from start-0.04 to start+0.04, stay solid, fade out from end-0.04 to end+0.04
    const fadeInStart = Math.max(0, start - 0.03);
    const fadeInEnd = start + 0.03;
    const fadeOutStart = end - 0.03;
    const fadeOutEnd = Math.min(1, end + 0.04);

    let opacity = 0;
    let translateY = 20;

    if (current >= fadeInStart && current <= fadeOutEnd) {
      if (current < fadeInEnd) {
        const factor = (current - fadeInStart) / (fadeInEnd - fadeInStart || 0.01);
        opacity = Math.max(0, Math.min(1, factor));
        translateY = 20 * (1 - opacity);
      } else if (current > fadeOutStart) {
        const factor = (fadeOutEnd - current) / (fadeOutEnd - fadeOutStart || 0.01);
        opacity = Math.max(0, Math.min(1, factor));
        translateY = -20 * (1 - opacity);
      } else {
        opacity = 1;
        translateY = 0;
      }
    }

    return {
      opacity,
      transform: `translateY(${translateY}px)`,
      pointerEvents: opacity > 0.4 ? ('auto' as const) : ('none' as const),
      visibility: opacity <= 0.01 ? ('hidden' as const) : ('visible' as const),
    };
  };

  const isLoadedComplete = loadCount >= TOTAL_FRAMES;
  const loadPercentage = Math.round((loadCount / TOTAL_FRAMES) * 100);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full bg-[#1A0E0A] text-[#FDFBF7]"
      style={{ height: '420vh' }}
    >
      {/* Sticky Fullscreen Viewport Canvas & Experience Layer */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* Background Fullscreen Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Cinematic Vignette & Ambient Radial Warm Lighting */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-radial-[at_50%_50%] from-transparent via-[#1A0E0A]/40 to-[#1A0E0A]/85" />
        <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-[#1A0E0A]/80 via-transparent to-[#1A0E0A]/90" />

        {/* Top Header Information & Interactive Chapter Bar */}
        <div className="relative z-20 pt-24 sm:pt-28 px-6 sm:px-12 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 backdrop-blur-xs">
            {/* Location & Roastery Kicker */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-widest text-[#E07D5A] font-medium">
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <MapPin className="w-3.5 h-3.5 text-[#E07D5A]" />
                Jubilee Hills, Hyderabad
              </span>
              <span className="text-white/30">•</span>
              <span className="text-white/80">Artisanal Specialty Roastery</span>
              <span className="text-white/30 hidden sm:inline">•</span>
              <span className="text-white/60 hidden sm:inline">Est. {siteConfig.establishedYear}</span>
            </div>

            {/* Scrubber Chapters Quick Jump */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {CHAPTERS.map((ch) => {
                const isActive = progress >= ch.startProgress && progress <= ch.endProgress;
                return (
                  <button
                    key={ch.id}
                    onClick={() => scrollToChapter(ch)}
                    className={`px-2.5 py-1 text-[10px] sm:text-xs rounded-full font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-[#BC5A36] text-white shadow-md shadow-[#BC5A36]/30 font-semibold scale-105'
                        : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    {ch.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Middle Scrollytelling Narrative Centerpiece */}
        <div className="relative z-20 flex-1 max-w-7xl mx-auto px-6 sm:px-12 w-full flex items-center justify-start pointer-events-none">
          
          {/* ================= PHASE 1: THE ORIGIN (0% - 22%) ================= */}
          <div
            style={getPhaseStyles(0.0, 0.22, progress)}
            className="transition-all duration-300 max-w-2xl py-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BC5A36]/20 border border-[#BC5A36]/40 text-[#E07D5A] text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Stage 01 • The Handpicked Harvest</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6 text-balance drop-shadow-md">
              Where every <span className="italic font-normal text-[#E07D5A]">pour</span> tells a deliberate story.
            </h1>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl mb-8 drop-shadow-sm font-light">
              Single-origin shade-grown beans sourced from 1800m heritage estates in Chikmagalur. Roasted in micro-batches twice weekly for peak aromatic clarity.
            </p>

            <div className="flex flex-wrap items-center gap-4 pointer-events-auto">
              <a
                href="#menu"
                className="inline-flex items-center justify-center px-7 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-[#BC5A36] hover:bg-[#9E4524] rounded-xs transition-all duration-200 shadow-lg shadow-[#BC5A36]/25"
              >
                Explore Seasonal Menu
              </a>

              <a
                href={siteConfig.contact.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xs backdrop-blur-md transition-colors duration-200"
              >
                <span>Get Directions</span>
                <ArrowUpRight className="w-4 h-4 text-[#E07D5A]" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white py-3.5 px-3 transition-colors"
                title="Direct WhatsApp Chat"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>

          {/* ================= PHASE 2: THE GRIND (26% - 48%) ================= */}
          <div
            style={getPhaseStyles(0.26, 0.48, progress)}
            className="transition-all duration-300 max-w-xl py-4 absolute"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C88D4A]/25 border border-[#C88D4A]/40 text-[#F5C27C] text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
              <span>Stage 02 • Burr Dialing</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-5 drop-shadow-md">
              Cracked with intention, <span className="italic font-normal text-[#F5C27C]">ground</span> for sweetness.
            </h2>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-lg mb-6 drop-shadow-sm font-light">
              Milled to precise sub-millimeter uniformity moments before brewing. Releasing trapped aromatic notes of wild jasmine, stone fruit, and dark cacao.
            </p>

            <div className="grid grid-cols-3 gap-3 bg-black/40 backdrop-blur-md p-4 rounded-sm border border-white/10 pointer-events-auto">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-white/60">Burr Spec</div>
                <div className="font-serif text-base sm:text-lg font-bold text-[#F5C27C]">83mm Flat</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-white/60">Uniformity</div>
                <div className="font-serif text-base sm:text-lg font-bold text-white">98.4%</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-white/60">Dose</div>
                <div className="font-serif text-base sm:text-lg font-bold text-white">19.5g</div>
              </div>
            </div>
          </div>

          {/* ================= PHASE 3: THE INFUSION & POUR (52% - 75%) ================= */}
          <div
            style={getPhaseStyles(0.52, 0.75, progress)}
            className="transition-all duration-300 max-w-xl py-4 absolute"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BC5A36]/25 border border-[#BC5A36]/40 text-[#E07D5A] text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
              <span>Stage 03 • 9-Bar Extraction</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-5 drop-shadow-md">
              Silky micro-foam marries <span className="italic font-normal text-[#E07D5A]">dense crema</span>.
            </h2>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-lg mb-6 drop-shadow-sm font-light">
              Steamed to 62°C to convert natural sugars into silky sweetness. Cut precisely into double-shot espresso for seamless caramel harmony.
            </p>

            <div className="grid grid-cols-3 gap-3 bg-black/40 backdrop-blur-md p-4 rounded-sm border border-white/10 pointer-events-auto">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-white/60">Extraction</div>
                <div className="font-serif text-base sm:text-lg font-bold text-[#E07D5A]">28 Sec</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-white/60">Steam Temp</div>
                <div className="font-serif text-base sm:text-lg font-bold text-white">62°C</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-white/60">Profile</div>
                <div className="font-serif text-base sm:text-lg font-bold text-white">Sweet Silk</div>
              </div>
            </div>
          </div>

          {/* ================= PHASE 4: THE COMPLETED CUP (78% - 100%) ================= */}
          <div
            style={getPhaseStyles(0.78, 1.0, progress)}
            className="transition-all duration-300 max-w-2xl py-4 absolute"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C88D4A]/25 border border-[#C88D4A]/40 text-[#F5C27C] text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
              <span>Stage 04 • Ready on the Bar</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-5 drop-shadow-md">
              Your intentional pause, <span className="italic font-normal text-[#F5C27C]">served</span>.
            </h2>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-lg mb-8 drop-shadow-sm font-light">
              From Indian shade-grown estates straight to your table in Jubilee Hills. Paired with house-laminated sourdough pastries fresh from our deck ovens.
            </p>

            <div className="flex flex-wrap items-center gap-4 pointer-events-auto mb-6">
              <a
                href="#menu"
                className="inline-flex items-center justify-center px-7 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-[#BC5A36] hover:bg-[#9E4524] rounded-xs transition-all duration-200 shadow-lg shadow-[#BC5A36]/25"
              >
                Order Today's Special
              </a>

              <a
                href={siteConfig.contact.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xs backdrop-blur-md transition-colors duration-200"
              >
                <span>Visit Us Today</span>
                <ArrowUpRight className="w-4 h-4 text-[#F5C27C]" />
              </a>
            </div>

            {/* Quick Stat Bar */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/10 text-xs text-white/70">
              <div>
                <span className="font-bold text-white">4.9 ★</span> Rating (620+ Reviews)
              </div>
              <span className="text-white/30">•</span>
              <div>
                <span className="font-bold text-white">Fresh Pastries</span> Every 4 Hours
              </div>
              <span className="text-white/30">•</span>
              <div>
                <span className="font-bold text-white">Open:</span> 8:00 AM – 9:30 PM
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Control HUD & Progress Bar */}
        <div className="relative z-20 pb-6 px-6 sm:px-12 max-w-7xl mx-auto w-full">
          <div className="bg-[#1A0E0A]/70 backdrop-blur-md rounded-md p-3 sm:p-4 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Play/Scrub Controls */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white transition-colors"
                title={isPlaying ? "Pause cinematic reel" : "Play cinematic reel"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#E07D5A]" /> : <Play className="w-3.5 h-3.5 text-[#E07D5A]" />}
                <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToChapter(CHAPTERS[0])}
                className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                title="Restart sequence"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <div className="text-xs text-white/70 font-mono tabular-nums">
                Frame {String(currentFrameIndex + 1).padStart(3, '0')} / {TOTAL_FRAMES}
              </div>
            </div>

            {/* Middle Scrubber Progress Bar */}
            <div className="flex-1 w-full max-w-md mx-2">
              <div className="relative w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#BC5A36] via-[#C88D4A] to-[#F5C27C] rounded-full transition-all duration-75"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>

            {/* Preload Status & Scroll Hint */}
            <div className="flex items-center gap-4 text-xs text-white/60">
              {!isLoadedComplete && (
                <span className="text-[11px] text-[#E07D5A] font-mono animate-pulse">
                  Preloading: {loadPercentage}%
                </span>
              )}

              <div className="hidden md:flex items-center gap-1.5 text-white/80 animate-bounce">
                <span>Scroll to brew</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#E07D5A]" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
