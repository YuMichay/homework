"use strict"
// #1 
// Создать обычный объект и сделать его итерируемым. 
// При этом итерация должна происходить следующим образом:
// Должны поочерёдно проходиться все значения от свойства объекта from, до свойства to.
// (в случае если to < from - должна возникать ошибка).
// Если to или from не указаны ИЛИ to или from не являются числами, должна возникать ошибка. 

const myIterable = {
    from: 1,
    to: 4,
    [Symbol.iterator]() {
        if (typeof this.from !== "number" || typeof this.to !== "number" || this.to < this.from) throw new Error("Incorrect values");
    
        return {
            current: this.from,
            last: this.to,

            next() {
                if (this.current <= this.last) {
                    return { done: false, value: this.current++ };
                } else {
                    return { done: true };
                }
            }
        };
    },
}
  
for (let item of myIterable) {
    console.log(item);
}

const myIterable2 = {
    from: "aaa",
    to: 4,
    [Symbol.iterator]() {
        if (typeof this.from !== "number" || typeof this.to !== "number" || this.to < this.from) throw new Error("Incorrect values");
    
        return {
            current: this.from,
            last: this.to,

            next() {
                if (this.current <= this.last) {
                    return { done: false, value: this.current++ };
                } else {
                    return { done: true };
                }
            }
        };
    }
}
  
for (let item of myIterable2) {
    console.log(item);
}

// > Примеры:
// const myIterable = { from: 1, to: 4 };
// for (let item of myIterable) {
//  console.log(item); // 1, 2, 3, 4
// }

// const myIterable = { from: 'aaa', to: 4 };
// for (let item of myIterable) { // Ошибка!
//  console.log(item);
// }


// #2
// Необходимо реализовать функцию, которая примет имя и возраст человека в виде аргументов, 
// а затем вернет массив объектов. Каждый объект должен быть создан уникальным способом.

function getPersons(name, age) {
    const arrayOfObjects = [{ name, age }, Object.assign({}, { name, age })];

    class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age
        }
    }

    function createObj() {
        this.name = name,
        this.age= age
    }

    const person = {};
    person.name = name;
    person.age = age;

    const person0 = {};
    person0["name"] = name;
    person0["age"] = age;

    const person1 = new Object();
    person1.name = name;
    person1.age = age;

    const personPrototype = {
        name: name,
        age: age,
        info: function() {
            return { name: this.name, age: this.age }
        }
    }
    const person2 = Object.create(personPrototype);

    function createObj2() {}
    createObj2.prototype.name = name;
    createObj2.prototype.age = age;

    function createObj3() {}
    createObj3.prototype = {
        name: name,
        age: age
    }

    arrayOfObjects.push(
        Object.create({}, { name: { value: name }, age: { value: age }}),
        new createObj(name, age),
        new Person(name, age),
        person, person0, person1, person2.info(),
        createObj2.prototype,
        createObj3.prototype
    );

    return arrayOfObjects;
}

getPersons("Yuliya", 26).forEach((obj) => console.log(obj))