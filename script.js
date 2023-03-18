window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//создаём экземпляр распознования речи:
const recognition = new SpeechRecognition();
// отображает промежуточный результат сразу на экране:
recognition.interimResults = true;
recognition.lang = 'en-US';

//создаём обзац:
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', (e) => {
    const transcript = Array.from(e.results) //приводим ответ к массиву
        .map((result) => result[0])//получаем результат
        .map((result) => result.transcript)//и еще результат
        .join('');//склеиваем в одну строку несколько результатов

    //создать абзац после молчания
    p.textContent = transcript;
    if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
    }
    if (transcript.includes('say the date' || 'the date')) {
        console.log(Date.now());//выполняем после услышанной фразы
    }

    if (transcript.includes('unicorn')) {
        console.log('🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄');
    }

    console.log(transcript);
});

recognition.addEventListener('end', recognition.start);//заново запускаем ф после молчания
recognition.start();