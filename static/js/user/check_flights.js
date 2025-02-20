document.getElementById('flight-search-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const source = document.getElementById('source').value.trim();
    const destination = document.getElementById('destination').value.trim();
    const flightClass = document.getElementById('flight-class').value;

    if (!source || !destination) {
        alert('Please fill out all fields.');
        return;
    }

    fetch('/user/check-flights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            source: source,
            destination: destination,
            flight_class: flightClass
        }),
    })
    .then(response => response.json())
    .then(data => {
        const flightResults = document.getElementById('flight-results');
        flightResults.innerHTML = '';

        if (data.status === "error") {
            flightResults.innerHTML = `<p class="no-flights">${data.message}</p>`;
            return;
        }

        data.flights.forEach(flight => {
            const flightCard = document.createElement('div');
            flightCard.className = 'flight-card animate__animated animate__fadeIn';
            flightCard.innerHTML = `
                <h4>Flight ID: ${flight.flight_id}</h4>
                <p><strong>From:</strong> ${flight.source}</p>
                <p><strong>To:</strong> ${flight.destination}</p>
                <p><strong>Departure:</strong> ${new Date(flight.departure_time).toLocaleString()}</p>
                <p><strong>Duration:</strong> ${flight.duration}</p>
                <p><strong>Class:</strong> ${flight.flight_class}</p>
                <button class="btn btn-success book-ticket" data-id="${flight.flight_id}" data-class="${flight.flight_class}">
                    Book Ticket
                </button>
            `;
            flightResults.appendChild(flightCard);
        });

        document.querySelectorAll('.book-ticket').forEach(button => {
            button.addEventListener('click', function () {
                const flightId = this.getAttribute('data-id');
                const flightClass = this.getAttribute('data-class');
                window.location.href = `/book-ticket?flight_id=${flightId}&flight_class=${flightClass}`;
            });
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while searching for flights.');
    });
});document.getElementById('flight-search-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const source = document.getElementById('source').value.trim();
    const destination = document.getElementById('destination').value.trim();
    const flightClass = document.getElementById('flight-class').value;

    if (!source || !destination) {
        alert('Please fill out all fields.');
        return;
    }

    fetch('/user/check-flights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            source: source,
            destination: destination,
            flight_class: flightClass
        }),
    })
    .then(response => response.json())
    .then(data => {
        const flightResults = document.getElementById('flight-results');
        flightResults.innerHTML = '';

        if (data.status === "error") {
            flightResults.innerHTML = `<p class="no-flights">${data.message}</p>`;
            return;
        }

        data.flights.forEach(flight => {
            const flightCard = document.createElement('div');
            flightCard.className = 'flight-card animate__animated animate__fadeIn';
            flightCard.innerHTML = `
                <h4>Flight ID: ${flight.flight_id}</h4>
                <p><strong>From:</strong> ${flight.source}</p>
                <p><strong>To:</strong> ${flight.destination}</p>
                <p><strong>Departure:</strong> ${new Date(flight.departure_time).toLocaleString()}</p>
                <p><strong>Duration:</strong> ${flight.duration}</p>
                <p><strong>Class:</strong> ${flight.flight_class}</p>
                <button class="btn btn-success book-ticket" data-id="${flight.flight_id}" data-class="${flight.flight_class}">
                    Book Ticket
                </button>
            `;
            flightResults.appendChild(flightCard);
        });

        document.querySelectorAll('.book-ticket').forEach(button => {
            button.addEventListener('click', function () {
                const flightId = this.getAttribute('data-id');
                const flightClass = this.getAttribute('data-class');
                window.location.href = `/book-ticket?flight_id=${flightId}&flight_class=${flightClass}`;
            });
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while searching for flights.');
    });
});