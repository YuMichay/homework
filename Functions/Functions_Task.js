// Написать свою реализацию встроенной функции массивов filter.
// Назвать функцию myFilter и сделать так, чтобы любой массив мог использовать данную функцию как "родную".
// В качестве параметров он должен принимать callback-функцию и как необязательный параметр объект,
// который будет использован в качестве this в рамках внутренних вызовов данной callback-функции.
// В конечном итоге ваша реализация myFilter должна работать точно также как и встроенный метод filter.
// Callback-функция, переданная в качестве параметра, также должна вызываться с теми же параметрами,
// что и оригинал (элемент, индекс, массив).


Array.prototype.myFilter = function(callback, obj){
    const arr = [];

    for(let i = 0; i < this.length; i++){
        if(callback.call(obj, this[i], i, this)){
            arr.push(this[i]);
        }
    }

    return arr;
}

const testData = [0, 1, 2, 3, 4, 5];
console.log(testData.myFilter((element) => ( element % 2 === 0 )));

// Необходимо немного перепрошить глобальный объект. 
// При вызове alert() должна отрабатывать логика confirm(), prompt - alert(), confirm() - prompt().
// *Дополнительно - постарайтесь сделать это как можно кратче, за наименьшее количество действий.
// (Под действием имеется ввиду любая операция - создание переменной, приравнивание, вызов метода)

const originalAlert = window.alert;
const originalConfirm = window.confirm;
const originalPrompt = window.prompt;

window.alert = (message = "It's alert, but actually confirm function") => originalConfirm(message);
window.confirm = (message = "It's confirm, but actually prompt function") => originalPrompt(message);
window.prompt = (message = "It's prompt, but actually alert function", defaultValue) => originalAlert(message);

alert();
confirm();
prompt();