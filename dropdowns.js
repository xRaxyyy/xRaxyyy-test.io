function ShowDropdownPage(hulpdienst) {
    // Navigate to dropdown.html with hulpdienst as a query parameter
    window.location.href = `dropdown.html?hulpdienst=${encodeURIComponent(hulpdienst)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    // Get the query parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const hulpdienst = urlParams.get('hulpdienst');

    // Find the title element and update it
    const title = document.getElementById('hulpdienst_title');
    if (title && hulpdienst) {
        title.textContent = hulpdienst; // Update the title with the value from the query
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const regioDropdown = document.getElementById('regios-dropdown');
    const hulpdienstDropdown = document.getElementById('hulpdienst-dropdown');

    // Handle dropdown change for both dropdowns
    [regioDropdown, hulpdienstDropdown].forEach(dropdown => {
        dropdown?.addEventListener('change', () => {
            const selectedRegio = regioDropdown?.value || 'all';
            const selectedHulpdienst = hulpdienstDropdown?.value || 'all';

            // Redirect to list.html with filters as query parameters
            window.location.href = `list.html?regio=${encodeURIComponent(selectedRegio)}&hulpdienst=${encodeURIComponent(selectedHulpdienst)}`;
        });
    });
});
