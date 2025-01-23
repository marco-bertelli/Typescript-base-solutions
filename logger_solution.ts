import * as fs from 'fs';

type LogLevel = 'INFO' | 'WARN' | 'ERROR';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
}

class Logger {
  private logFilePath: string;

  constructor(logFilePath: string) {
    this.logFilePath = logFilePath;
  }

  private formatLog(entry: LogEntry): string {
    return `${entry.timestamp} [${entry.level}] ${entry.message}`;
  }

  public writeLog(level: LogLevel, message: string): void {
    const timestamp = new Date().toISOString();
    const logEntry: LogEntry = { timestamp, level, message };
    const formattedLog = this.formatLog(logEntry);

    fs.appendFile(this.logFilePath, formattedLog + '\n', (err) => {
      if (err) {
        console.error('Error writing log:', err);
      }
    });
  }

  public readLogs(): void {
    fs.readFile(this.logFilePath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading log file:', err);
        return;
      }

      const logs = data.split('\n').filter((line) => line !== '');
      logs.forEach((log) => console.log(log));
    });
  }

  public filterLogs(level: LogLevel): void {
    fs.readFile(this.logFilePath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading log file:', err);
        return;
      }

      const logs = data.split('\n').filter((line) => line !== '');
      const filteredLogs = logs.filter((log) => log.includes(`[${level}]`));
      filteredLogs.forEach((log) => console.log(log));
    });
  }
}

// Test del logger
const logger = new Logger('logs.txt');

logger.writeLog('INFO', 'Questo è un log informativo');
logger.writeLog('ERROR', 'Si è verificato un errore');
logger.writeLog('WARN', 'Attenzione: qualcosa potrebbe andare storto');

logger.readLogs();
logger.filterLogs('ERROR');
