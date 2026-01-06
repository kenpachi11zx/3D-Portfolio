import React, { useEffect, useState, useRef } from 'react';
import { TerminalLog } from '../types';

const INITIAL_LOGS: string[] = [
  "INITIALIZING KERNEL...",
  "LOADING NEURAL NETWORKS...",
  "BYPASSING SECURITY PROTOCOLS...",
  "ACCESS GRANTED.",
  "CONNECTING TO VOID SERVER...",
  "ESTABLISHING SECURE HANDSHAKE...",
  "RENDERING 3D ASSETS...",
  "LOADING SHADERS: FRAGMENT... VERTEX...",
  "SYSTEM OPTIMIZATION: 99.9%",
];

export const Terminal: React.FC = () => {
  const [logs, setLogs] = useState<TerminalLog[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const logCounter = useRef(0);

  // Initial load effect
  useEffect(() => {
    let timeoutIds: ReturnType<typeof setTimeout>[] = [];

    INITIAL_LOGS.forEach((msg, index) => {
      const timeout = setTimeout(() => {
        addLog(msg, index < 3 ? 'info' : index === 3 ? 'success' : 'info');
      }, index * 400); // Stagger logs
      timeoutIds.push(timeout);
    });

    return () => timeoutIds.forEach(clearTimeout);
  }, []);

  // Periodic random logs effect
  useEffect(() => {
    const randomLogs = [
        "Scanning for inputs...",
        "Updating frame buffer...",
        "Pinging satellite link...",
        "Detecting user presence...",
        "Calibrating flux capacitor..."
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
         const msg = randomLogs[Math.floor(Math.random() * randomLogs.length)];
         addLog(msg, 'info');
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const addLog = (message: string, type: TerminalLog['type']) => {
    setLogs(prev => {
        const newLog: TerminalLog = {
            id: Date.now() + Math.random(),
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
            message,
            type
        };
        // Keep last 6 logs
        return [...prev, newLog].slice(-6);
    });
  };

  return (
    <div className="w-full max-w-md pointer-events-none">
      <div className="bg-[rgba(0,0,0,0.5)] border-l-2 border-pink-500 p-2 font-mono text-xs md:text-sm">
        <div className="text-pink-500 mb-1 tracking-wider opacity-70">TERMINAL_OUTPUT</div>
        <div ref={scrollRef} className="flex flex-col gap-1 overflow-hidden h-32 justify-end">
          {logs.map((log) => (
            <div key={log.id} className="flex gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
               <span className="text-gray-500">[{log.timestamp}]</span>
               <span className={`${
                   log.type === 'error' ? 'text-red-500' : 
                   log.type === 'success' ? 'text-green-400' : 
                   log.type === 'warning' ? 'text-yellow-400' : 
                   'text-cyan-300'
               }`}>
                 {log.type === 'success' ? '>>' : '>'} {log.message}
               </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};