// Создать класс Stack.
// В качестве единственного необязательного параметра конструктор Stack должен принимать
// максимальное количество элементов в стеке. Если параметр является невалидным числом, генерировать ошибку.
// Если параметр не указан, задавать максимальный размер стека равным 10.

// Реализовать публичные методы:
// - push(elem) - добавить новый элемент в стек (генерировать ошибку, если стек переполнен);
// - pop() - удалить верхний элемент стека и вернуть его (генерировать ошибку, если стек пуст);
// - peek() - получить верхний элемент стека (вернуть null, если стек пуст);
// - isEmpty() - возвращает логическое значение (пуст стек или нет);
// - toArray() - возвращает новый массив, состоящий из элементов стека.

// Реализовать статические публичные методы:
// - fromIterable(iterable) - возвращает новый Stack,
// элементами которого служат элементы переданной итерируемой сущности.
// Максимальное количество элементов такого стека должно быть равно длине этой сущности.
// Если сущность не является итерируемой генерировать ошибку.

class Stack {
    stack = [];

    constructor(maxElem = 10) {
        if (typeof maxElem !== 'number' || maxElem < 1 || !Number.isInteger(maxElem)) throw new Error("Invalid value!");
        this.maxElem = maxElem;
    }

    push(elem) {
        if (this.stack.length >= this.maxElem) throw new Error("Stack is full!");
        this.stack.push(elem);
    }

    pop() {
        if (this.isEmpty()) throw new Error("Stack is empty!");
        return this.stack.pop();
    }

    peek() {
        if (this.stack.length === 0) return null;
        return this.stack.unshift();
    }

    isEmpty() {
        return this.stack.length === 0;
    }

    toArray() {
        return this.stack.slice();
    }

    static fromIterable(iterable) {
        if (typeof iterable[Symbol.iterator] !== 'function') {
            throw new Error('Not an iterable');
        }

        const newStack = new Stack(iterable.length);
        for (let elem of iterable) {
            newStack.push(elem);
        }
        return newStack;
    }
}

const myStack = new Stack(5);
// const myStack = new Stack("5"); value check
myStack.push(10);
myStack.push(2);
myStack.push(45);
// myStack.push(45);
// myStack.push(45);
// myStack.push(45); push method check

console.log(myStack.toArray());
console.log(myStack.peek());
console.log(myStack.pop());
// console.log(myStack.pop());
// console.log(myStack.pop());
// console.log(myStack.pop()); pop method check
console.log(myStack.isEmpty());

const iterable = [8, 5, 6];
// const iterable = 10; fromIterable method check
const stackFromIterable = Stack.fromIterable(iterable);
console.log(stackFromIterable.toArray());