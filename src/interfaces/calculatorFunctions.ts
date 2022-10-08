export default interface calculatorFunctions {
    clear(): void;
    delete(): void;
    appendNumber(value: string): void;
    chooseOperation<T extends string>(value: T): void;
    compute(): void;
    getDisplayNumber(value: number): string;
    updateDisplay(): void;
}