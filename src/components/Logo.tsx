import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

const sizeMap = {
  sm: { icon: 24, text: "text-lg" },
  md: { icon: 32, text: "text-xl" },
  lg: { icon: 40, text: "text-2xl" },
  xl: { icon: 56, text: "text-4xl" },
};

export function Logo({ className = "", size = "md", showText = true }: LogoProps) {
  const { icon, text } = sizeMap[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <svg
          width={icon}
          height={icon}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* Main shape - stylized R and arrow combination */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(220, 90%, 56%)" />
              <stop offset="100%" stopColor="hsl(260, 80%, 60%)" />
            </linearGradient>
            <linearGradient id="logoGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(220, 90%, 70%)" />
              <stop offset="100%" stopColor="hsl(260, 80%, 75%)" />
            </linearGradient>
          </defs>
          
          {/* Background circle with gradient */}
          <circle cx="24" cy="24" r="22" fill="url(#logoGradient)" />
          
          {/* Stylized "R" shape */}
          <path
            d="M16 12V36M16 12H26C30.4183 12 34 15.5817 34 20C34 24.4183 30.4183 28 26 28H16M26 28L34 36"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          
          {/* Response arrow indicator */}
          <motion.path
            d="M30 18L34 22L30 26"
            stroke="url(#logoGradientLight)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          />
        </svg>
        
        {/* Glow effect */}
        <div className="absolute inset-0 blur-xl bg-primary/30 rounded-full -z-10 scale-150" />
      </motion.div>

      {showText && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className={`font-display font-bold tracking-tight ${text}`}
        >
          <span className="gradient-text">read</span>
          <span className="text-foreground">spond</span>
        </motion.span>
      )}
    </div>
  );
}
