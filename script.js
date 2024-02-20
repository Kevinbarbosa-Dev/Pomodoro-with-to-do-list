/*
function openNav() {
    document.getElementById('myNav').style.width = '30%';
    document.querySelector('.overlay').style.display = 'block';
}*/
/*
function closeNav() {
    document.getElementById('overlay').style.width = '0%';
}*/
document.addEventListener('DOMContentLoaded', function () {
    let menuBtn = document.getElementById('barra');
    let overlay = document.getElementById('overlay');
    let close = document.getElementById('close');

    menuBtn.addEventListener('click', function () {
        if (window.innerWidth <= 600) {
            overlay.style.width = '90%';
        }else if(window.innerWidth <= 700){
            overlay.style.width = '70%';
        } else if (window.innerWidth <= 980) {
            overlay.style.width = '50%';
        } else {
            overlay.style.width = '30%';
        }
    });

    close.addEventListener('click', function () {
        overlay.style.width = '0%';
    });
});
// se input for apagado ou acrecentado e se textarea estiver on então textare continua on
let inputText = document.getElementById('todo');

function inputAtive() {
    let adicionar = document.getElementById('addOk')
    adicionar.style.display = inputText.value.trim() !== "" ? "block" : "none";
}
function nota() {

    let resume = document.getElementById('resumeId');
    // textarea
    let closeNote = document.getElementById('fecharNote');
    // botão fechar textarea
    let notebtn = document.getElementById('note');
    // botão note
    let taskContainer = document.getElementById('task-container');
    // container do overlay
    notebtn.style.display = 'none'
    resume.style.display = 'block'
    closeNote.style.display = 'block';
    taskContainer.style.height = '330px';
    resume.focus();

    closeNote.addEventListener('click', function () {
        resume.style.display = 'none';
        closeNote.style.display = 'none';
        resume.value = "";
        notebtn.style.display = 'block';
        taskContainer.style.height = '440px';
    });

}




document.getElementById('todo').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        task();
    }
});


function task() {
    let taskText = inputText.value.trim();
    let resumeContent = document.getElementById('resumeId').value.trim();
    let taskList = document.getElementById('tasks');
    let taskDiv = document.createElement('div');
    let checkbox = document.createElement('i');
    let newTaskContainer = document.createElement('div'); // Criando a div que conterá a li e a div
    let newTask = document.createElement('li');
    let taskResume = document.createElement('div');
    let span = document.createElement('span');
    let remove = document.createElement('button');

    taskDiv.className = 'task';
    checkbox.className = 'checkbox';
    checkbox.innerHTML = '<i class="fa-regular fa-square"></i>';
    checkbox.onclick = function () {
        checkbox.innerHTML = '<i class="fa-solid fa-square-check"></i>'
    };

    newTask.className = 'taskEdit';
    newTask.innerHTML = `<span>${taskText}</span>`;
    newTaskContainer.appendChild(newTask); // Adicionando a li à div container
    newTaskContainer.style.display = 'flex'; // Configurando para display flex
    newTaskContainer.style.alignItems = 'center'; // Alinhando ao centro

    remove.innerHTML = '<i class="fa-solid fa-trash"></i>';
    remove.className = 'fa-trash';
    remove.onclick = function () {
        removeTask(taskDiv);
    };

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(newTaskContainer); // Adicionando a div container ao taskDiv

    if (resumeContent !== "") {
        span.className = 'text-resume';
        span.textContent = resumeContent;
        taskResume.className = 'task-resume';
        newTaskContainer.style.alignItems="";
        newTaskContainer.style.flexDirection="column";
        taskResume.appendChild(span);
        taskDiv.appendChild(taskResume);
        taskDiv.appendChild(newTaskContainer);
        newTaskContainer.appendChild(taskResume);
    }

    taskDiv.appendChild(remove);
    taskList.appendChild(taskDiv);
    inputText.value = '';
    document.getElementById('resumeId').value = ''; // Limpar o conteúdo do textarea
    inputText.focus();
    inputAtive(); // Atualizar visibilidade dos botões
}




function removeTask(taskDiv) {
    taskDiv.remove();
}

let timerInterval;
let minutes = 0;
let seconds = 0;
let isRunning = false;
let icon = document.getElementById('icon');
document.body.classList.add("pomodoro-bg")

function pomodoro() {
    minutes = 25;
    seconds = 0;
    enableButtons();
    document.body.classList.remove("descansar-bg");
    document.body.classList.add("pomodoro-bg")
    const paragraph = document.getElementById('tempo');
    paragraph.style.color = "#260F26"
    updateTimerDisplay();
}

function descansar() {
    minutes = 15;
    seconds = 0;
    enableButtons();
    document.body.classList.remove("pomodoro-bg");
    document.body.classList.add("descansar-bg");
    const paragraph = document.getElementById('tempo');
    paragraph.style.color = "#CD7B5C"
    updateTimerDisplay();
}

function updateTimer() {
    if (seconds > 0 || minutes > 0) {
        if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
    updateTimerDisplay();
}

function add() {
    if (!isRunning && minutes < 120) {
        minutes += 15;
        seconds = 0;
        updateTimerDisplay();
    }
}

function minus() {
    if (!isRunning && minutes > 0) {
        minutes -= 15;
        seconds = 0;

        if (minutes < 0) {
            minutes = 0;
        }
        updateTimerDisplay();
    }
}

function updateTimerDisplay() {
    const timerDisplay = document.getElementById('tempo');
    timerDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
    document.title = `${formatTime(minutes)}:${formatTime(seconds)} - Pomodoro Timer`;
    
}

function começar() {
    if (isRunning) {
        clearInterval(timerInterval);
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        enableButtons();
    } else {
        timerInterval = setInterval(updateTimer, 1000);
        disableButtons();
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    }
    isRunning = !isRunning;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function enableButtons() {
    document.getElementById('addButton').disabled = false;
    document.getElementById('minusButton').disabled = false;
}

function disableButtons() {
    document.getElementById('addButton').disabled = true;
    document.getElementById('minusButton').disabled = true;
}

