document.addEventListener('DOMContentLoaded', function () {
  const saveBtn = document.getElementById('save-entry');
  const resetBtn = document.getElementById('reset-entry');
  const entriesContainer = document.getElementById('entries-container');
  
  saveBtn.addEventListener('click', function () {
      const journalEntry = document.getElementById('journal-entry').value;
      if (journalEntry.trim() !== '') {
          saveEntry(journalEntry);
          displayEntries();
          document.getElementById('journal-entry').value = '';
      } else {
          alert('Error: Empty Entry');
      }
  });

  function saveEntry(entry) {
      let entries = localStorage.getItem('journalEntries');
      entries = entries ? JSON.parse(entries) : [];
      const date = new Date(); // Get current date
      const currentMonth = date.getMonth() + 1; // Months are zero-indexed, so add 1
      const currentDate = date.getDate();
      const currentYear = date.getFullYear();
      const timestamp = `${currentMonth}/${currentDate}/${currentYear}`; // Format the date
      entries.push({ entry, timestamp }); // Save entry along with timestamp
      localStorage.setItem('journalEntries', JSON.stringify(entries));
  }


  resetBtn.addEventListener('click', function () {
    var userPreference;
    if(entriesContainer.textContent.trim() === ''){
        alert('Error: No entries to reset.');
    } else {
        if (confirm("Confirm: This action will delete all entries.")) {
            userPreference = "Data reset successfully!";
            localStorage.removeItem('journalEntries');
            entriesContainer.innerHTML = '';
        } else {
            userPreference = "Reset Cancelled!";
        }
    }
});


  function displayEntries() {
      const entries = JSON.parse(localStorage.getItem('journalEntries'));
      if (entries) {
          entriesContainer.innerHTML = '';
          entries.forEach(function (entryObj, index) {
              const entryDiv = document.createElement('div');
              entryDiv.classList.add('entry');
              entryDiv.innerHTML = `<p><strong>Entry ${index + 1} - ${entryObj.timestamp}:</strong></p><p>${entryObj.entry}</p>`;
              entriesContainer.appendChild(entryDiv);
          });
      }
  }

  displayEntries();
});
