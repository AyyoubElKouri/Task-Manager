const LogLevel = {
    INFO: "info",
    WARN: "warn",
    ERROR: "error",
};

export class Logger {
    private readonly name: string;
    private readonly file: string;
    private readonly module: string;

    private readonly INFO_STYLE =
        "color: white; background-color: #3B82F6; padding: 2px 6px; border-radius: 4px; font-weight: bold;";
    private readonly WARN_STYLE =
        "color: black; background-color: #FACC15; padding: 2px 6px; border-radius: 4px; font-weight: bold;";
    private readonly ERROR_STYLE =
        "color: white; background-color: #EF4444; padding: 2px 6px; border-radius: 4px; font-weight: bold;";
    private readonly MESSAGE_STYLE =
        "color: black; background-color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold; margin-left: 9px; margin-right: 9px";

    constructor(name: string, file: string, module: string) {
        this.name = name;
        this.file = file;
        this.module = module;
    }

    private log(message: string, line: number, loglevel: string): void {
        let levelLabel = "";
        let levelStyle = "";

        switch (loglevel) {
            case LogLevel.INFO:
                levelLabel = "INFO";
                levelStyle = this.INFO_STYLE;
                break;

            case LogLevel.WARN:
                levelLabel = "WARN";
                levelStyle = this.WARN_STYLE;
                break;

            case LogLevel.ERROR:
                levelLabel = "ERROR";
                levelStyle = this.ERROR_STYLE;
                break;
        }

        console.log(
            `%c${levelLabel}%c${message} %c(${this.file}:${line})`,
            levelStyle,
            this.MESSAGE_STYLE,
            "color: gray;"
        );

        console.log(
            `%cLogger Info:`,
            "color: #10B981; font-weight: bold; margin-top: 4px;"
        );
        console.log({
            logger: this.name,
            module: this.module,
            file: this.file,
            line: line,
            level: levelLabel,
        });
    }

    public info(message: string, line: number): void {
        this.log(message, line, LogLevel.INFO);
    }

    public warn(message: string, line: number): void {
        this.log(message, line, LogLevel.WARN);
    }

    public error(message: string, line: number): void {
        this.log(message, line, LogLevel.ERROR);
    }
}
