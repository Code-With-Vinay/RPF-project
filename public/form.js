
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
    const links = document.querySelector('.links');
    links.classList.toggle('active');
    hamburger.classList.toggle('show-links');
});



document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();

      let  name = document.getElementById('name')
       let detail = document.getElementById('details')

       if(name.value === 'select' && detail.value === ''){
        alert('Entry officer name or Entry Details cannot be empty');
    } else {
        submitData()
}
});

function submitData(){
    const formData = {
        name: document.getElementById('name').value,
        gd_number: document.getElementById('gd_number').value,
        details: document.getElementById('details').value,
        zone: document.getElementById('zone').value
    };  

        console.log(formData)
        console.log( JSON.stringify({entries:[formData]}))

    fetch('https://rpf-dfyw.onrender.com/entry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({entries:[formData]})
    })
    .then(response => response.json())
    .then(data => {
        console.log("data",data)
        if (data) {
            alert('Form submitted successfully');
            location.reload();
        } else {
            alert('Form submission failed');
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {

    const date = new Date();
    const fromday = String(date.getDate()).padStart(2, '0');
    const today = String(date.getDate()+1).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const year = date.getFullYear();
    let from =  `${fromday}-${month}-${year}`;
    let to =  `${today}-${month}-${year}`;
    run(from, to)
    const timestampInput = document.getElementById('timestamp');
    const now = new Date();
    const formattedDate = now.toLocaleString(); // Formats date and time based on the user's locale
    timestampInput.value = formattedDate;
    document.getElementById('timestamp').value;

    let name = localStorage.getItem('name')
    let branch = localStorage.getItem('branch')
    let role = localStorage.getItem('role')
    let zone = localStorage.getItem('branch')
    let officerEmail = localStorage.getItem('email')
    selectOfficer(officerEmail)
    if (!name) {
        navigateToLogin();
        return;
    }
    document.querySelector('.StoredName').textContent = name
    document.querySelector('.zone-wel').textContent = role+'/'+ zone 
    document.querySelector('.branch').textContent = branch
    document.querySelector('.zone').value = zone



    const linksElement = document.querySelector('.links');
    const container1 = document.querySelector('.container1');
    const head = document.querySelector('.head');
  
    // Add 'active' class to the .links element for demonstration
    linksElement.classList.add('active');
  
    // Add 'active-welcome' class to the .welcome element if .links is active
    if (linksElement.classList.contains('active')) {
      container1.classList.add('active-side');
      head.classList.add('active-side');
    }
  
});



async function run(from, to) {
    console.log(from +'-'+ to);
    let url = "https://rpf-dfyw.onrender.com/entry/filter";
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ start_date: from , end_date: to })
        });

        const data = await response.json();

        class Order {
            constructor() {
                this._history = [];
            }

            get history() {
                return this._history;
            }

            set history(menuArray) {
                this._history = menuArray.map(menuItem => ({
                    EntryNumber: menuItem.id, // Adjusted property names
                    EntryOfficer: menuItem.name,
                    Timestamp: formatDate(menuItem.date),
                    Details: menuItem.details,
                    zone: menuItem.zone,
                }));

            }
            getLastEntryNumber() {
                if (this._history.length > 0) {
                    return this._history[this._history.length - 1].EntryNumber;
                }
                return 0;
            }

        }

        class Ui {
            static menu(orderInstance) {
                const table_body = document.getElementById('table-body');
                table_body.innerHTML = orderInstance.history.map(item => `
                    <tr>
                        <td datalabel="GD Entry Number">${item.EntryNumber}</td>
                        <td datalabel="Entry Officer">${item.EntryOfficer}</td>
                        <td datalabel="Entry Officer">${item.zone}</td>
                        <td datalabel="Timestamp">${item.Timestamp}</td>
                        <td datalabel="Details of Entry">${item.Details}</td>
                    </tr>
                `).join('');
                const lastEntryNumber = orderInstance.getLastEntryNumber();
                document.getElementById('gd_number').value = lastEntryNumber + 1;
            
            }
        }

        const order = new Order();
        order.history = data.filtered_entries;
        Ui.menu(order);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


// Function to format date to "DD-MM-YYYY HH:mm:ss"
function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    return formattedDate;
}

// Function to pad single digits with leading zero
function pad(num) {
    return num.toString().padStart(2, '0');
}




// logout and seesion

  const logoutButton = document.getElementById('logout_btn');
  logoutButton.addEventListener('click', clearSession);
  
  const search_btn = document.getElementById('search_btn');
  search_btn.addEventListener('click', navigateToSearch);
  
  

    function clearSession() {
        if (confirm("Do you want Logout?")) {
            const toClear = ['name', 'role', 'designation', 'branch', 'username', 'expiration'];
            toClear.forEach(key => {
                    localStorage.removeItem(key, toClear[key]);
            });
        navigateToLogin();
        } else {
            return
        }
        
  }
  
  function navigateToLogin() {
    const linkHref = 'index.html'
    window.location.href = linkHref;
  }

  function navigateToSearch() {
    const linkHref = 'filter.html'
    document.querySelector('.loading').style.display = 'flex';
    document.querySelector('.container1').style.display = 'none';
    setTimeout(() => {
    document.querySelector('.loading').style.display = 'none';
    window.location.href = linkHref;
    }, 2000);
  }




  function selectOfficer(officer_email) {
    const select = document.getElementById('name');
    select.innerHTML = ''; // Clear existing options
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                if (data[officer_email]) {
                    data[officer_email].forEach(item => {
                        const option = document.createElement('option');
                        // Check if the role is defined and not empty
                        if (item.role) {
                            option.textContent = `${item.name} - ${item.role}`;
                        } else {
                            option.textContent = item.name;
                        }
                        select.appendChild(option);
                    });
                } else {
                    console.log('No data found for the provided email.');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }