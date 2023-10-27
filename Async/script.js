// #1
// Создать класс Calculator. Конструктор принимает два числа, если хотя бы одно не валидно - бросает ошибку. 
// Infinity и прочие специальные значения типа number валидными числами не считаем. Методы:
// setX() - устанавливает первое число
// setY() - устанавливает второе число

// logSum() - возвращает сумму заданных чисел
// logMul() - возвращает произведение заданных чисел
// logSub() - возвращает разность заданных чисел
// logDiv() - возвращает частное заданных чисел, кидает ошибку при делении на 0.

// Все методы второй группы должны работать корректно даже если вынести их в отдельную переменную

class Calculator {
    constructor(x, y) {
        this.x = this.checkIsValid(x);
        this.y = this.checkIsValid(y);
    }

    checkIsValid(num) {
        if (typeof num !== "number" || !isFinite(num) || isNaN(num)) {
            throw new Error("Invalid value!");
        }
        return num;
    }

    setX = (x) => this.x = this.checkIsValid(x);

    setY = (y) => this.y = this.checkIsValid(y);

    logSum = () => this.x + this.y;

    logMul = () => this.x * this.y;

    logSub = () => this.x - this.y;

    logDiv = () => {
        if (this.y === 0) {
            throw new Error("Division by zero is not allowed.");
        }
        return this.x / this.y;
    }
}

const calculator = new Calculator(2, 5);
const logSumRef = calculator.logSum;
console.log(logSumRef());

// #2
// Заморозить страницу асинхронной операцией =)
// Т.е. while (true) не считается

async function freezePageForMilliseconds(ms) {
    await new Promise(() => setTimeout(freezePageForMilliseconds, ms));
}
  
freezePageForMilliseconds(0);