
const NLDropdown = {
    HulpdienstDropdown: [
        { value: "all", text: "Alle Hulpdiensten" },
        { value: "Politie", text: "Politie" },
        { value: "Brandweer", text: "Brandweer" },
        { value: "Ambulance", text: "Ambulance" },
        { value: "Reddingsbrigade", text: "Reddingsbrigade" },
        { value: "KNRM", text: "KNRM" },
        { value: "ProRail", text: "ProRail" },
        { value: "Rijkswaterstaat", text: "Rijkswaterstaat" },
        { value: "Ziekenhuizen", text: "Ziekenhuizen" },
        { value: "Scholen", text: "Scholen" },
        { value: "Meldkamers", text: "Meldkamers" },
        { value: "Provincies", text: "Provincies" },
        { value: "Kustwacht", tekst: "Kustwacht" }
    ],

    RegioDropdown: [
        { value: "all", text: "Alle Regio's" },
        { value: "1", text: "1 - Groningen (HVDG)" },
        { value: "2", text: "2 - Fryslan (VRF)" },
        { value: "3", text: "3 - Drenthe (VRD)" },
        { value: "4", text: "4 - Ijsselland (VRIJ)" },
        { value: "5", text: "5 - Twente (VRT)" },
        { value: "6", text: "6 - Noord en Oost-Gelderland (VNOG)" },
        { value: "7", text: "7 - Gelderland Midden (VGGM)" },
        { value: "8", text: "8 - Gelderland Zuid (VRGZ)" },
        { value: "9", text: "9 - Utrecht (VRU)" },
        { value: "10", text: "10 - Noord-Holland Noord (VRNHN)" },
        { value: "11", text: "11 - Zaanstreek-Waterland (VRZW)" },
        { value: "12", text: "12 - Kennemerland (VRK)" },
        { value: "13", text: "13 - Amsterdam-Amstelland (VRAA)" },
        { value: "14", text: "14 - Gooi en Vechtstreek (VRGV)" },
        { value: "15", text: "15 - Haaglanden (VRH)" },
        { value: "16", text: "16 - Hollands Midden (VRHM)" },
        { value: "17", text: "17 - Rotterdam-Rijnmond (VRR)" },
        { value: "18", text: "18 - Zuid-Holland Zuid (VRZHZ)" },
        { value: "19", text: "19 - Zeeland (VRZ)" },
        { value: "20", text: "20 - Midden- en West-Brabant (VRMWB)" },
        { value: "21", text: "21 - Brabant-Noord (VRBN)" },
        { value: "22", text: "22 - Brabant Zuid Oost (VRBZO)" },
        { value: "23", text: "23 - Limburg-Noord (VRLN)" },
        { value: "24", text: "24 - Zuid-Limburg (VRZL)" },
        { value: "25", text: "25 - Flevoland (VRFL)" },
        { value: "26", text: "26 - NIPF (IFV)" },
        { value: "28", text: "28 - Defentie (DF)" },
        { value: "NN", text: "NN - Noord-Nederland" },
        { value: "ON", text: "ON - Oost-Nederland" },
        { value: "MN", text: "MN - Midden-Nederland" },
        { value: "WNN", text: "WNN - West-Nederland-Noord" },
        { value: "WNZ", text: "WNZ - West Nederland-Zuid" }, 
        { value: "ZD", text: "ZD - Zee en Delta" },
        { value: "ZN", text: "ZN - Zuid-Nederland" }, 
    ]
};

const BEDropdown = {
    HulpdienstDropdown: [
        { value: "all", text: "Alle Hulpdiensten" },
        { value: "Politie", text: "Politie" },
        { value: "Brandweer", text: "Brandweer" },
        { value: "Ambulance", text: "Ambulance" },
        { value: "Reddingsbrigade", text: "Reddingsbrigade" },
        { value: "KNRM", text: "KNRM" },
        { value: "ProRail", text: "ProRail" },
        { value: "Rijkswaterstaat", text: "Rijkswaterstaat" },
        { value: "Ziekenhuizen", text: "Ziekenhuizen" },
        { value: "Scholen", text: "Scholen" },
        { value: "Meldkamers", text: "Meldkamers" },
        { value: "Provincies", text: "Provincies" }
    ],

    RegioDropdown: [
        { value: "all", text: "Alle Regio's" },
        { value: "1", text: "BE" },
    ]
};






const table = document.getElementById('list_table');
const input = document.getElementById('search-input');
const hulpdienstDropdown = document.getElementById('hulpdienst-dropdown');
const regioDropdown = document.getElementById('regio-dropdown');

let count = 100;
let preprocessedDataset = [];

// Google Sheets API configuration
const SPREADSHEET_ID = '1hu4jiDn14p6F0rtJ1dZcShN1xrktfLG4Hpa2kg0JFvE';
const API_KEY = 'AIzaSyDyKWfNV0-D7uGYVwFWnHCvvdpRAh_ygDI'; // Replace with your API key
const SHEET_NAME = 'MegaSheet'; // Replace with your sheet name

// Function to fetch data from Google Sheets
async function fetchDataFromGoogleSheets() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.values;
    } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
        return [];
    }
}

function convertSheetDataToJSON(sheetData) {
    const headers = sheetData[2]; // First row is the header
    const rows = sheetData.slice(3); // Skip the first two rows (header and example row)

    return rows.map(row => {
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = row[index] ? row[index].trim() : ''; // Trim spaces and use an empty string as fallback
        });
        return obj;
    });
}

function preprocessDataset(dataset) {
    return dataset.map((row) => {
        // Trim all fields before processing
        const trimmedRow = Object.fromEntries(
            Object.entries(row).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value])
        );

        return {
            ...trimmedRow,
            _searchField: [
                trimmedRow.Adres,
                trimmedRow.Roepnaam,
                trimmedRow.TypeVoertuig,
                trimmedRow.TypeVoer,
                trimmedRow.Kenteken,
                trimmedRow.Bijzonderheden,
                trimmedRow.Hulpdienst,
                trimmedRow.Regio,
            ].map(field => field ? field.toLowerCase() : '').join(' '), // Combine all fields into a single string for searching
        };
    });
}

// Function to populate the dropdown with the given data
function populateDropdown(dropdownButton, dropdownData) {
    const dropdownMenu = dropdownButton.nextElementSibling;

    // Clear current dropdown items
    dropdownMenu.innerHTML = '';

    // Add new dropdown items
    dropdownData.forEach((item) => {
        const li = document.createElement('li');
        li.setAttribute('value', item.value);
        li.textContent = item.text;
        dropdownMenu.appendChild(li);
    });
}

// Function to initialize dropdown functionality
function initializeCustomDropdown(dropdownButton, callback) {
    const dropdownMenu = dropdownButton.nextElementSibling;
    const dropdownItems = dropdownMenu.querySelectorAll('li');

    // Show/Hide dropdown menu on button click
    dropdownButton.addEventListener('click', () => {
        dropdownMenu.classList.toggle('visible');
    });

    // Update dropdown value and trigger callback on item click
    dropdownItems.forEach((item) => {
        item.addEventListener('click', () => {
            dropdownButton.textContent = item.textContent;
            dropdownButton.setAttribute('data-value', item.getAttribute('value'));
            dropdownMenu.classList.remove('visible');
            callback();
        });
    });

    // Close dropdown if clicked outside
    document.addEventListener('click', (e) => {
        if (!dropdownButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('visible');
        }
    });
}

function filterAndSearchDataset(query, region, service, dataset) {
    const lowerQuery = query.toLowerCase();

    return dataset.filter((item) => {
        const matchesRegion = region === 'all' || item.Regio === region;
        const matchesService = service === 'all' || item.Hulpdienst === service; // Filter by Hulpdienst
        const matchesSearch = lowerQuery === '' || item._searchField.includes(lowerQuery);

        return matchesRegion && matchesService && matchesSearch;
    });
}

function generateVisibleRows(dataset, amount) {
    const tableBody = table.querySelector('tbody');
    
    // Clear any existing rows
    const rows = table.querySelectorAll('tr:not(:has(th))');
    rows.forEach((row) => row.remove());

    const rowsToRender = dataset.slice(0, amount);

    // Define the columns to include in the table (excluding 'Hulpdienst' and 'Regio')
    const columnsToInclude = ['Adres', 'Roepnaam', 'TypeVoertuig', 'TypeVoer', 'Kenteken', 'Bijzonderheden'];

    rowsToRender.forEach((row) => {
        const tr = document.createElement('tr');

        // Optional: Add classes based on conditions
        if (row.Roepnaam !== '') tr.classList.add('list_even');
        if (row.Roepnaam === '' && row.Adres !== '') tr.classList.add('list_address');

        // Populate table row with data for the specified columns
        columnsToInclude.forEach((column, colIndex) => {
            const td = document.createElement('td');
            td.textContent = row[column] || ''; // Use empty string as fallback if the field is missing

            // Add dynamic class to each column
            td.classList.add(`td-class-${colIndex + 1}`);

            tr.appendChild(td);
        });

        tableBody.appendChild(tr);
    });
}





// Debounce function for input events
const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
};

// Update list based on input and selected filters
function updAndClear() {
    count = 100;
    updateList();
}

// Update list with the current filters and dataset
const updateList = debounce(() => {
    const query = input.value;
    const regioValue = regioDropdown.getAttribute('data-value') || 'all';
    const hulpdienstValue = hulpdienstDropdown.getAttribute('data-value') || 'all';

    // Filter the dataset based on the selected filters
    const filteredData = filterAndSearchDataset(query, regioValue, hulpdienstValue, preprocessedDataset);

    // Generate the table rows with the filtered data
    generateVisibleRows(filteredData, count);
}, 150);

// Scroll event to load more items when scrolling to the bottom
window.onscroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight + 1 > scrollHeight) {
        count += 100;
        updateList();
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = window.location.search.substring(1); 
    const region = urlParams; // Either 'NL' or 'BE'

    // Fetch data from Google Sheets
    const sheetData = await fetchDataFromGoogleSheets();
    const jsonData = convertSheetDataToJSON(sheetData);

    let dropdownData = null;

    // Set the appropriate dropdown and dataset based on the region
    if (region === 'NL') {
        dropdownData = NLDropdown; // Set NL data for dropdown
        preprocessedDataset = preprocessDataset(jsonData); // Set dataset for NL
        // Change NL link color to accent color
        document.querySelector('a[href="../list.html?NL"]').style.color = 'var(--accent-color)';
    } else if (region === 'BE') {
        dropdownData = BEDropdown; // Set BE data for dropdown
        preprocessedDataset = preprocessDataset(jsonData); // Set dataset for BE
        // Change BE link color to accent color
        document.querySelector('a[href="../list.html?BE"]').style.color = 'var(--accent-color)';
    }

    if (dropdownData) {
        // Populate Hulpdienst dropdown
        populateDropdown(hulpdienstDropdown, dropdownData.HulpdienstDropdown);

        // Populate Regio dropdown
        populateDropdown(regioDropdown, dropdownData.RegioDropdown);
    }

    count = 100;
    updateList();

        // Populate Regio dropdown
        populateDropdown(regioDropdown, dropdownData.RegioDropdown);

        // Initialize dropdown functionality
        initializeCustomDropdown(hulpdienstDropdown, updAndClear);
        initializeCustomDropdown(regioDropdown, updAndClear);

        // Initial list update
        updateList();

    // Attach input event listener for search
    input.addEventListener('input', updAndClear);

    // Check if there's a selected service stored in localStorage
    const selectedHulpdienst = localStorage.getItem("selectedDropdownValue");

    if (selectedHulpdienst) {
        // Update the dropdown with the stored value
        hulpdienstDropdown.textContent = selectedHulpdienst; // Only set the text content
        hulpdienstDropdown.innerHTML += '<i class="fa fa-chevron-down"></i>'; // Add the dropdown icon
    
        hulpdienstDropdown.setAttribute("data-value", selectedHulpdienst);
        // Clear the stored value to reset for future use
        localStorage.removeItem("selectedDropdownValue");
    
        // Trigger update
        updAndClear();
    }
});