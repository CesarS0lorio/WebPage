// js/datePickerLib.js

function initializeDatePicker() {
    console.log("Initializing DatePicker..."); //

    const dateInput = document.getElementById('date-input-dp'); //
    const calendarContainer = document.getElementById('calendar-container-dp'); //
    const monthSelect = document.getElementById('month-select-dp'); //
    const yearSelect = document.getElementById('year-select-dp'); //
    const calendarDays = document.getElementById('calendar-days-dp'); //
    const prevMonthButton = document.getElementById('prev-month-dp'); //
    const nextMonthButton = document.getElementById('next-month-dp'); //
    const todayButton = document.getElementById('today-button-dp'); //
    const clearButton = document.getElementById('clear-button-dp'); //

    // Nuevos elementos
    const viewSelectedDateButton = document.getElementById('view-selected-date-btn');
    const clearSelectedDateButton = document.getElementById('clear-selected-date-btn');
    const selectedDateMessageArea = document.getElementById('selected-date-message-area');

    if (!dateInput || !calendarContainer || !monthSelect || !yearSelect || !calendarDays || !prevMonthButton || !nextMonthButton || !todayButton || !clearButton ||
        !viewSelectedDateButton || !clearSelectedDateButton || !selectedDateMessageArea) { //
        console.error("DatePicker elements (or new action buttons/message area) not found. Aborting initialization."); //
        return; //
    }

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; //
    let currentDateState = new Date(); // State for calendar navigation //

    function populateMonths() {
        monthSelect.innerHTML = ''; //
        monthNames.forEach((month, index) => { //
            const option = document.createElement('option'); //
            option.value = index; //
            option.textContent = month; //
            monthSelect.appendChild(option); //
        });
    }

    function populateYears() {
        yearSelect.innerHTML = ''; //
        const currentSystemYear = new Date().getFullYear(); //
        for (let i = currentSystemYear - 10; i <= currentSystemYear + 10; i++) { //
            const option = document.createElement('option'); //
            option.value = i; //
            option.textContent = i; //
            yearSelect.appendChild(option); //
        }
    }

    function renderCalendar(year, month) {
        calendarDays.innerHTML = ''; //
        monthSelect.value = month; //
        yearSelect.value = year; //
        currentDateState = new Date(year, month, 1); // Update state //

        const firstDayOfMonth = new Date(year, month, 1); //
        const lastDayOfMonth = new Date(year, month + 1, 0); //
        const daysInMonth = lastDayOfMonth.getDate(); //
        const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 (Sun) - 6 (Sat) //

        const today = new Date(); //
        const todayDate = today.getDate(); //
        const todayMonth = today.getMonth(); //
        const todayYear = today.getFullYear(); //

        const prevMonthLastDay = new Date(year, month, 0).getDate(); //
        for (let i = 0; i < startingDayOfWeek; i++) { //
            const dayCell = document.createElement('div'); //
            dayCell.classList.add('dp-day-cell', 'dp-other-month'); //
            dayCell.textContent = prevMonthLastDay - startingDayOfWeek + 1 + i; //
            calendarDays.appendChild(dayCell); //
        }

        for (let day = 1; day <= daysInMonth; day++) { //
            const dayCell = document.createElement('div'); //
            dayCell.classList.add('dp-day-cell'); //
            dayCell.textContent = day; //
            if (day === todayDate && month === todayMonth && year === todayYear) { //
                dayCell.classList.add('dp-current-day'); //
            }
            dayCell.addEventListener('click', () => { //
                const selectedDay = day.toString().padStart(2, '0'); //
                const selectedMonth = (month + 1).toString().padStart(2, '0'); //
                dateInput.value = `${selectedDay}/${selectedMonth}/${year}`; //
                calendarContainer.style.display = 'none'; //
            });
            calendarDays.appendChild(dayCell); //
        }

        const totalCells = startingDayOfWeek + daysInMonth; //
        const remainingCells = (totalCells % 7 === 0) ? 0 : 7 - (totalCells % 7); //
        for (let i = 1; i <= remainingCells; i++) { //
            const dayCell = document.createElement('div'); //
            dayCell.classList.add('dp-day-cell', 'dp-other-month'); //
            dayCell.textContent = i; //
            calendarDays.appendChild(dayCell); //
        }
    }

    dateInput.addEventListener('click', (event) => { //
        event.stopPropagation(); //
        const isVisible = calendarContainer.style.display === 'block'; //
        if (isVisible) { //
            calendarContainer.style.display = 'none'; //
        } else {
            calendarContainer.style.display = 'block'; //
            const inputRect = dateInput.getBoundingClientRect(); //
            calendarContainer.style.top = (inputRect.bottom + window.scrollY + 5) + 'px'; //
            calendarContainer.style.left = (inputRect.left + window.scrollX) + 'px'; //

            const dateParts = dateInput.value.split('/'); //
            let targetYear = currentDateState.getFullYear(); //
            let targetMonth = currentDateState.getMonth(); //

            if (dateParts.length === 3) { //
                const day = parseInt(dateParts[0], 10); //
                const monthVal = parseInt(dateParts[1], 10) - 1; //
                const yearVal = parseInt(dateParts[2], 10); //
                if (!isNaN(day) && !isNaN(monthVal) && !isNaN(yearVal)) { //
                    const minYearOption = yearSelect.options[0] ? parseInt(yearSelect.options[0].value, 10) : currentSystemYear - 10; //
                    const maxYearOption = yearSelect.options[yearSelect.options.length - 1] ? parseInt(yearSelect.options[yearSelect.options.length - 1].value, 10) : currentSystemYear + 10; //
                    if (yearVal >= minYearOption && yearVal <= maxYearOption && monthVal >= 0 && monthVal <= 11) { //
                        targetYear = yearVal; //
                        targetMonth = monthVal; //
                    }
                }
            }
            renderCalendar(targetYear, targetMonth); //
        }
    });

    document.addEventListener('click', (event) => { //
        if (calendarContainer.style.display === 'block' && //
            !calendarContainer.contains(event.target) && //
            event.target !== dateInput) { //
            calendarContainer.style.display = 'none'; //
        }
    });

    prevMonthButton.addEventListener('click', () => { //
        currentDateState.setMonth(currentDateState.getMonth() - 1); //
        renderCalendar(currentDateState.getFullYear(), currentDateState.getMonth()); //
    });

    nextMonthButton.addEventListener('click', () => { //
        currentDateState.setMonth(currentDateState.getMonth() + 1); //
        renderCalendar(currentDateState.getFullYear(), currentDateState.getMonth()); //
    });

    monthSelect.addEventListener('change', (e) => { //
        currentDateState.setMonth(parseInt(e.target.value, 10)); //
        renderCalendar(currentDateState.getFullYear(), currentDateState.getMonth()); //
    });

    yearSelect.addEventListener('change', (e) => { //
        currentDateState.setFullYear(parseInt(e.target.value, 10)); //
        renderCalendar(currentDateState.getFullYear(), currentDateState.getMonth()); //
    });

    todayButton.addEventListener('click', () => { //
        const today = new Date(); //
        const day = today.getDate().toString().padStart(2, '0'); //
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); //
        const year = today.getFullYear(); //
        dateInput.value = `${day}/${month}/${year}`; //
        currentDateState = new Date(today); //
        renderCalendar(year, today.getMonth()); //
        calendarContainer.style.display = 'none'; //
    });

    // Event listener para el botón "Clear" original del calendario
    clearButton.addEventListener('click', () => { //
        dateInput.value = ''; //
        selectedDateMessageArea.textContent = ''; // También limpiar el mensaje si el clear del calendario se usa
        calendarContainer.style.display = 'none'; //
    });

    // Funcionalidad para los nuevos botones "View" y "Clear"
    viewSelectedDateButton.addEventListener('click', () => {
        const selectedDate = dateInput.value;
        if (selectedDate) {
            selectedDateMessageArea.textContent = `You have selected the date: ${selectedDate}`;
        } else {
            selectedDateMessageArea.textContent = 'Please select a date first.';
        }
    });

    clearSelectedDateButton.addEventListener('click', () => {
        selectedDateMessageArea.textContent = '';
        dateInput.value = ''; // Limpiar también el campo de fecha
        // Opcional: cerrar el calendario si está abierto
        // if (calendarContainer.style.display === 'block') {
        //     calendarContainer.style.display = 'none';
        // }
    });


    populateMonths(); //
    populateYears(); //
    calendarContainer.style.display = 'none'; //
    console.log("DatePicker initialized."); //
}