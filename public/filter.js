
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
    const links = document.querySelector('.links');
    links.classList.toggle('active');
    hamburger.classList.toggle('show-links');
});



function navigateToLogin() {
    const linkHref = 'index.html'
    window.location.href = linkHref;
  }


const home_btn = document.getElementById('home_btn');
home_btn.addEventListener('click', navigateToHome);


function navigateToHome() {
    const linkHref = 'form.html'
    document.querySelector('.loading').style.display = 'flex';
    document.querySelector('.filter-wrapper').style.display = 'none';
    setTimeout(() => {
    document.querySelector('.loading').style.display = 'none';
    window.location.href = linkHref;
    }, 2000);
  }


document.addEventListener("DOMContentLoaded", () => {
    const linksElement = document.querySelector('.links');
    const filter_wrapper = document.querySelector('.filter-wrapper');
  
    // Add 'active' class to the .links element for demonstration
    linksElement.classList.add('active');
  
    // Add 'active-welcome' class to the .welcome element if .links is active
    if (linksElement.classList.contains('active')) {
      filter_wrapper.classList.add('active-side');
    }
    
    let name = localStorage.getItem('expiration')
    if (!name) {
        navigateToLogin();
        return;
    }
    run()
})



    async function run() {
    let allData = [];
    const zoneDropdown = document.getElementById('zone');
    let url = "https://rpf-dfyw.onrender.com/entry/filter";

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ start_date: "01-07-2024" , end_date: "31-12-2028" })
            });
            const data = await response.json();
                allData = data.filtered_entries
            populateTable(allData)
            populateZones(allData);
 

    document.getElementById('filterForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const fromDate = new Date(document.getElementById('from-date').value);
        const toDate = new Date(document.getElementById('to-date').value);
        const zone = document.getElementById('zone').value;
        document.querySelector('.head').textContent = 'DAILY DIARY REGISTER' + ' ' + zone
        // Ensure the required fields are selected
        if (isNaN(fromDate) || isNaN(toDate) || zone === "Select") {
            alert('Please select all fields');
            return;
        }

        // Filter data based on selected criteria
        const filteredData = allData.filter(entry => {
            const entryDate = new Date(entry.date);
            return entryDate >= fromDate && entryDate <= toDate && (zone === "Select" || entry.zone === zone);
        });

        populateTable(filteredData);
    });

    function sortDataByTimestampAscending(data) {
        return data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    }


    function populateTable(data) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ''; // Clear existing rows

    // Sort data by timestamp in descending order
    const sortedData = sortDataByTimestampAscending(data);
    sortedData.forEach(entry => {
        const row = document.createElement('tr');

        const gdEntryNumber = document.createElement('td');
        gdEntryNumber.textContent = entry.id;
        row.appendChild(gdEntryNumber);

        const entryOfficer = document.createElement('td');
        entryOfficer.textContent = entry.name;
        row.appendChild(entryOfficer);

        const zone = document.createElement('td');
        zone.textContent = entry.zone;
        row.appendChild(zone);

        const timestamp = document.createElement('td');
        timestamp.textContent = formatDate(entry.date); // Assumes formatDate function exists
        row.appendChild(timestamp);

        const details = document.createElement('td');
        details.textContent = entry.details;
        row.appendChild(details);

        tableBody.appendChild(row);
    });
}

// Example date formatting function
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

    function populateZones(data) {
        const uniqueZones = new Set(data.map(entry => entry.zone));
        
        uniqueZones.forEach(zone => {
            const option = document.createElement('option');
            option.value = zone;
            option.textContent = zone;
            zoneDropdown.appendChild(option);
        });
    }

    // Example date formatting function
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }
    }
