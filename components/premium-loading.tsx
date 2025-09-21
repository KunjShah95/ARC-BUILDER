"use client"

import { motion } from "framer-motion"
import { Code2, Sparkles, Loader2, Zap, Brain, Wand2 } from "lucide-react"

interface PremiumLoadingProps {
  message?: string
  submessage?: string
  showLogo?: boolean
  variant?: "default" | "minimal" | "dots" | "pulse"
}

export function PremiumLoading({ 
  message = "Loading...", 
  submessage,
  showLogo = true,
  variant = "default"
}: PremiumLoadingProps) {
  
  if (variant === "minimal") {
    return (
      <div className="flex items-center justify-center p-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Loader2 className="w-8 h-8 text-primary" />
        </motion.div>
      </div>
    )
  }

  if (variant === "dots") {
    return (
      <div className="flex items-center justify-center space-x-2 p-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-gradient-primary rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === "pulse") {
    return (
      <div className="flex items-center justify-center p-8">
        <motion.div
          className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Brain className="w-8 h-8 text-white" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background-secondary to-background relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-mesh opacity-20 dark:opacity-10" />
        <motion.div
          className="absolute inset-0 opacity-30 dark:opacity-15"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, hsl(var(--primary)) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {showLogo && (
          <motion.div
            className="flex items-center justify-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center shadow-2xl">
                <Code2 className="w-10 h-10 text-white" />
              </div>
              <motion.div
                className="absolute -inset-2 bg-gradient-primary rounded-3xl opacity-20 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Animated Icons */}
        <motion.div
          className="flex items-center justify-center space-x-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {[
            { Icon: Sparkles, delay: 0 },
            { Icon: Zap, delay: 0.2 },
            { Icon: Brain, delay: 0.4 },
            { Icon: Wand2, delay: 0.6 },
          ].map(({ Icon, delay }, index) => (
            <motion.div
              key={index}
              className="w-12 h-12 glass rounded-2xl flex items-center justify-center"
              animate={{
                y: [-5, 5, -5],
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: delay,
                ease: "easeInOut",
              }}
            >
              <Icon className="w-6 h-6 text-primary" />
            </motion.div>
          ))}
        </motion.div>

        {/* Loading Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
            {message}
          </h2>
          {submessage && (
            <p className="text-lg text-foreground-secondary max-w-md mx-auto">
              {submessage}
            </p>
          )}
        </motion.div>

        {/* Animated Progress Dots */}
        <motion.div
          className="flex items-center justify-center space-x-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-gradient-primary rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Loading Progress Bar */}
        <motion.div
          className="w-64 h-1 bg-border rounded-full overflow-hidden mt-8 mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.div
            className="h-full bg-gradient-primary rounded-full"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-6 h-6 glass rounded-full flex items-center justify-center"
        animate={{
          y: [-10, 10, -10],
          x: [-5, 5, -5],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="w-2 h-2 bg-gradient-primary rounded-full" />
      </motion.div>

      <motion.div
        className="absolute top-3/4 right-1/4 w-8 h-8 glass rounded-xl flex items-center justify-center"
        animate={{
          y: [10, -10, 10],
          x: [5, -5, 5],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <div className="w-3 h-3 bg-gradient-to-br from-accent to-primary rounded-full" />
      </motion.div>
    </div>
  )
}

// Inline Loading Spinner Component
export function InlineSpinner({ size = "md", className = "" }: { size?: "sm" | "md" | "lg", className?: string }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    >
      <div className="w-full h-full border-2 border-primary/30 border-t-primary rounded-full" />
    </motion.div>
  )
}

// Skeleton Loading Component
export function SkeletonLoader({ className = "", lines = 3 }: { className?: string, lines?: number }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className="h-4 bg-muted rounded-lg overflow-hidden"
          style={{ width: `${100 - (i * 10)}%` }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-primary/10 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}