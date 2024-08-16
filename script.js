const daysContainer = document.getElementById('days');
const monthYearDisplay = document.getElementById('month-year');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const eventModal = document.getElementById('event-modal');
const closeModalButton = document.querySelector('.close');
const eventForm = document.getElementById('event-form');
const eventTitleInput = document.getElementById('event-title');
const eventDescriptionInput = document.getElementById('event-description');
const eventColorInput = document.getElementById('event-color');

const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
];

let currentDate = new Date();
let events = {};

function renderCalendar(date) {
    daysContainer.innerHTML = '';
    const month = date.getMonth();
    const year = date.getFullYear();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    monthYearDisplay.textContent = `${months[month]} ${year}`;

    for (let i = 0; i < firstDay; i++) {
        const day = document.createElement('div');
        day.classList.add('inactive');
        daysContainer.appendChild(day);
    }

    for (let i = 1; i <= lastDate; i++) {
        const day = document.createElement('div');
        day.textContent = i;
        day.setAttribute('data-date', `${year}-${month + 1}-${i}`);
        day.classList.add('day');
        if (events[`${year}-${month + 1}-${i}`]) {
            day.classList.add('event-day');
            day.style.backgroundColor = events[`${year}-${month + 1}-${i}`].color;
        }
        day.addEventListener('click', () => openEventModal(`${year}-${month + 1}-${i}`));
        daysContainer.appendChild(day);
    }
}

function openEventModal(date) {
    eventModal.style.display = 'block';
    eventForm.setAttribute('data-date', date);
    const event = events[date];
    if (event) {
        eventTitleInput.value = event.title;
        eventDescriptionInput.value = event.description;
        eventColorInput.value = event.color;
    } else {
        eventTitleInput.value = '';
        eventDescriptionInput.value = '';
        eventColorInput.value = '#007bff';
    }
}

function closeModal() {
    eventModal.style.display = 'none';
}

eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = eventForm.getAttribute('data-date');
    const title = eventTitleInput.value;
    const description = eventDescriptionInput.value;
    const color = eventColorInput.value;
    
    events[date] = { title, description, color };
    renderCalendar(currentDate);
    closeModal();
});

closeModalButton.addEventListener('click', closeModal);

window.onclick = function(event) {
    if (event.target === eventModal) {
        closeModal();
    }
}

prevButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

nextButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

renderCalendar(currentDate);
