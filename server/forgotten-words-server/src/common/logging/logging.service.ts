import { Injectable, LoggerService } from "@nestjs/common";
import * as winston from "winston";
import { info } from "winston";
import * as winstonDailyRotateFile from "winston-daily-rotate-file";


@Injectable()
export class LoggingService implements LoggerService {
  logger: winston.Logger;

  constructor() {
    const logFormat = winston.format.printf(info => {
        if (info.message.constructor === Object) {
          info.message = JSON.stringify(info.message, null, 3);
        }

        return `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`;
      }
    );

    const logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss.sss" // タイムスタンプのフォーマットを変える
        }),
        winston.format.splat(),
        winston.format.errors({ stack: true }), // エラー時はスタックトレースを出力する
        logFormat
      ),
      transports: [
        // アクセスログの出力先設定
        new winstonDailyRotateFile({
          level: "debug", // debugを指定すると、debug以上のログが出力される
          datePattern: "YYYY-MM-DD", // 'YYYY-MM-DD'に設定すると、ログファイルが日付毎に作られる
          filename: "application-%DATE%.log", // 保存先ファイル名(上記のdatePatternが含まれる)
          dirname: "logs", // ログファイルの保存先ディレクトリ名
          maxSize: "20m", // ローテートするファイルの最大サイズ
          maxFiles: "30d" // 保存するログの最大数(日数を使う場合は接尾辞として'd'を追加)
        }),
        // エラーログの出力先設定
        new winstonDailyRotateFile({
          level: "error",
          datePattern: "YYYY-MM-DD",
          filename: "error-%DATE%.log",
          dirname: "logs",
          maxSize: "20m",
          maxFiles: "30d"
        })
      ]
    });

    // 本番環境以外ではコンソールにも出力する
    if (process.env.NODE_ENV !== "production") {
      logger.add(
        new winston.transports.Console(
          {
            format: winston.format.combine(
              winston.format.timestamp({
                format: "YYYY-MM-DD HH:mm:ss.sss" // タイムスタンプのフォーマットを変える
              }),
              winston.format.splat(),
              winston.format.colorize({ all: true }),
              winston.format.errors({ stack: true }), // エラー時はスタックトレースを出力する
              logFormat
            )
          }
        )
      );
    }

    this.logger = logger;
  }


  error(message: any, trace?: string, context?: string): any {
    if (typeof message === "object") {
      message = JSON.stringify(message);
    }
    this.logger.log({
      level: "error",
      label:context,
      message: `${message}:${trace}`
    });
  }

  log(message: any, context?: string): any {
    if (typeof message === "object") {
      message = JSON.stringify(message);
    }
    this.logger.log({
      level: "info",
      label:context,
      message: `${message}`
    });
  }

  warn(message: any, context?: string): any {
    if (typeof message === "object") {
      message = JSON.stringify(message);
    }
    this.logger.log({
      level: "warn",
      label:context,
      message: `${message}`
    });
  }


}
