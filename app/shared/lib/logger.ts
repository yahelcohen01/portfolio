// app/shared/lib/logger.ts
import pino from "pino";

const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";

// Simple logger configuration that works in all environments
export const logger = pino({
  level: process.env.LOG_LEVEL || (isProduction ? "warn" : "info"),

  // Production: structured JSON logging
  ...(isProduction && {
    timestamp: pino.stdTimeFunctions.isoTime,
  }),

  // Development: more readable format
  ...(isDevelopment && {
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  }),
});

// Custom formatting function for better development experience
const formatMessage = (level: string, message: string, ...args: any[]) => {
  if (isDevelopment && typeof window === "undefined") {
    // Server-side development logging with colors
    const colors = {
      INFO: "\x1b[34m", // Blue
      WARN: "\x1b[33m", // Yellow
      ERROR: "\x1b[31m", // Red
      FATAL: "\x1b[41m", // Red background
      RESET: "\x1b[0m", // Reset
    };

    const timestamp = new Date().toLocaleTimeString();
    const color = colors[level as keyof typeof colors] || colors.RESET;

    console.log(
      `${color}[${timestamp}] ${level}${colors.RESET} - ${message}`,
      ...args
    );
    return;
  }

  // Use pino for all other cases
  return { message, args };
};

// Export logger methods
export const log = {
  info: (message: string, ...args: any[]) => {
    if (isDevelopment && typeof window === "undefined") {
      formatMessage("INFO", message, ...args);
    } else {
      logger.info(message, ...args);
    }
  },

  warn: (message: string, ...args: any[]) => {
    if (isDevelopment && typeof window === "undefined") {
      formatMessage("WARN", message, ...args);
    } else {
      logger.warn(message, ...args);
    }
  },

  error: (message: string, error?: Error | any, ...args: any[]) => {
    if (isDevelopment && typeof window === "undefined") {
      formatMessage("ERROR", message, error, ...args);
      if (error instanceof Error) {
        console.error(error.stack);
      }
    } else {
      if (error instanceof Error) {
        logger.error({ err: error, ...args }, message);
      } else {
        logger.error(message, error, ...args);
      }
    }
  },

  fatal: (message: string, error?: Error | any, ...args: any[]) => {
    if (isDevelopment && typeof window === "undefined") {
      formatMessage("FATAL", message, error, ...args);
      if (error instanceof Error) {
        console.error(error.stack);
      }
    } else {
      if (error instanceof Error) {
        logger.fatal({ err: error, ...args }, message);
      } else {
        logger.fatal(message, error, ...args);
      }
    }
  },
};

export default log;
