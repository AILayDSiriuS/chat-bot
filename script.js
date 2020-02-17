const input = document.querySelector('#messageInput'),
      messageBox = document.querySelector('.message-box'),
      send = document.querySelector('.paperplane'),
      svgPath = document.querySelector('path');

let bot = true, name = 'Друг', calc = false, numbers;

input.addEventListener('input', check);
svgPath.style.fill = '#bbbbbb';

function check() {
    if (input.value == '') {
        svgPath.style.fill = '#bbbbbb';
        send.removeEventListener('click', execute);
    } else {
        svgPath.style.fill = '#F9C35B';
        send.addEventListener('click', execute);
    }
}

function sendMessage(bot, content) {
    let message = document.createElement('div'),
        avatar = document.createElement('div'),
        img = document.createElement('img'),
        bauble = document.createElement('div'),
        messageContent = document.createElement('div'),
        text = document.createElement('p');

    messageBox.appendChild(message).classList.add("message");
    message.appendChild(avatar).classList.add("avatar");
    message.appendChild(bauble).classList.add("bauble");

    avatar.appendChild(img);
    if (bot) {
        img.src = 'img/bot.png';
        bauble.style.backgroundColor = "#F1F0F0";
    } else {
        img.src = 'img/user.png';
    }
    bauble.appendChild(messageContent).classList.add("message-content");
    messageContent.appendChild(text);
    text.textContent = content;
}

function aSend() {
    if (event.keyCode);
}

let start = false;

function execute() {
    let content = input.value;
    input.value = '';
    check();
    if (content == '') {
        return;
    } else {
        sendMessage(false, content);
        if (content == '/start') {
            if (start) {
                sendMessage(true, 'Эй, мы вроде уже общаемся?')
            } else {
                sendMessage(true, 'Привет, меня зовут Чат-бот, а как зовут тебя?')
                start = true;
            }
        } else if (content.startsWith('/name: ')) {
            if (start) {
                let args = content.split(' ');
                name = args[1];
                sendMessage(true, `Привет ${name}, приятно познакомится. Я умею считать, введи числа, которые надо посчитать`)
            } else {
                sendMessage(true, 'Введите команду /start, для начала общения');
            }

        } else if (content.startsWith('/number: ')) {
            if (start) {
                let args = content.split(':');
                numbers = args[1].split(',');
                calc = true;
                sendMessage(true, 'Что мне сделать с этими числами? +, -, *, /');
            } else {
                sendMessage(true, 'Введите команду /start, для начала общения');
            }

        } else if (content.startsWith('/weather')) {
            if (start) {
                let newRequest = new XMLHttpRequest();
                newRequest.open("GET", `https://api.openweathermap.org/data/2.5/forecast?q=Moscow&appid=7bb0afd0d4de410da540b50e7eafa5d9`);
                newRequest.onload = () => {
                    let ourWeather = JSON.parse(newRequest.responseText);
                    let temp = Math.floor(ourWeather.list[5].main.temp - 273.15);
                    let weather = ourWeather.list[5].weather[0].main;
                    sendMessage(true, `Погода на завтра - ${temp}° по цельсию, ${weather}`);
                }

                newRequest.onerror = err => console.error('Ошибка');

                newRequest.send();
            } else {
                sendMessage(true, 'Введите команду /start, для начала общения');
            }
        } else if (content.startsWith('/stop')) {
            if (start) {
                sendMessage(true, 'Всего доброго, если хочешь поговорить пиши /start');
                start = false;
            } else {
                sendMessage(true, 'Введите команду /start, для начала общения');
            }
        } else if (content == '-' || content == '+' || content == '/' || content == '*') {
            if (start) {
                if (calc) {
                    let a = Number(numbers[0]),
                        b = Number(numbers[1]);
                    switch (content) {
                        case '-': {
                            let result = a - b;
                            sendMessage(true, `Результат - ${result}`);
                            break;
                        }
                        case '+': {
                            let result = a + b;
                            sendMessage(true, `Результат - ${result}`);
                            break;
                        }
                        case '/': {
                            let result = a / b;
                            sendMessage(true, `Результат - ${result}`);
                            break;
                        }
                        case '*': {
                            let result = a * b;
                            sendMessage(true, `Результат - ${result}`);
                            break;
                        }
                    }
                    calc = false;
                } else {
                    sendMessage(true, 'Я не понимаю, введите другую команду!');
                }
            } else {
                sendMessage(true, 'Введите команду /start, для начала общения');
            }
        } else {
            sendMessage(true, 'Я не понимаю, введите другую команду!');
        }
    }
}