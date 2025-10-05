 // Function to switch sections
    function showSection(sectionId) {
      document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
      document.getElementById(sectionId).style.display = 'block';
    }

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    // Note: We use querySelector for error message as it's the simplest
    const errorMessage = document.getElementById('error-message');
    
    // New progress elements (Ensure these IDs exist in your HTML)
    const taskCounter = document.getElementById('task-counter');
    const progressFill = document.getElementById('progress-fill');
    const statTitle = document.getElementById('stat-title');
    
    // Use the global listContainer and inputBox from the user's logic
    let listContainer = document.getElementById("task-list");
    let inputBox = document.getElementById("task-input");

    // --- Helper Functions for Progress Bar ---
    
    /**
     * Calculates the total tasks and completed tasks, and updates the UI (counter and progress bar).
     */
    function updateProgress() {
        if (!listContainer || !taskCounter || !progressFill || !statTitle) {
             console.error("Progress bar elements not found. Make sure task-counter, progress-fill, and stat-title IDs exist.");
             return;
        }

        const allTasks = listContainer.querySelectorAll('li');
        const totalTasks = allTasks.length;
        
        // Find completed tasks based on the 'checked' class
        const completedTasks = listContainer.querySelectorAll('li.checked').length;
        
        // Update the counter text (e.g., "3 / 5")
        taskCounter.textContent = `${completedTasks} / ${totalTasks}`;
        
        let percentage = 0;
        if (totalTasks > 0) {
            percentage = (completedTasks / totalTasks) * 100;
        }
        
        // Update the progress bar width
        progressFill.style.width = `${percentage}%`;

        // Update the motivational title based on progress
        if (totalTasks === 0) {
            statTitle.textContent = "Start a New Task!";
        } else if (percentage === 100) {
            statTitle.textContent = "All Done! 🎉";
        } else {
            statTitle.textContent = "Keep It Up!";
        }
    }

    // --- User's Provided Logic ---

    // Save tasks to localStorage
    function saveData() {
        localStorage.setItem("data", listContainer.innerHTML);
    }

    // Show tasks from localStorage on page load
    function showTask() {
        listContainer.innerHTML = localStorage.getItem("data") || "";
        // IMPORTANT: After loading tasks, initialize progress bar
        updateProgress();
    }

    // Add a task
    function addTask() {
        if (inputBox.value.trim() === "") {
            console.error("You must write something!");
            if (errorMessage) {
                errorMessage.classList.remove('hidden');
            }
        } else {
            if (errorMessage) {
                errorMessage.classList.add('hidden');
            }

            let li = document.createElement("li");
            li.textContent = inputBox.value.trim(); // safer than innerHTML
            listContainer.appendChild(li);

            // Add delete button
            let span = document.createElement("span");
            span.innerHTML = "\u00d7"; // × symbol
            li.appendChild(span);

            inputBox.value = ""; // clear input box
            saveData(); // save after adding
            updateProgress(); // CRUCIAL: Update progress after adding a task
        }
    }

    // --- Event Handlers and Initialization ---

    // Show existing tasks and initial progress bar state
    showTask();

    // Add task on button click (assuming button ID is 'add-tsk-btn' from prior context)
    const addTaskBtn = document.getElementById('add-tsk-btn');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', (event) => {
            event.preventDefault();
            addTask();
        });
    }

    // Add task on Enter key press
    if (inputBox) {
        inputBox.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent default Enter key behavior
                addTask();
            }
        });
    }

    // Add event listener for toggling 'checked' class and deleting
    listContainer.addEventListener(
        "click",
        function (e) {
            if (e.target.tagName === "LI") {
                e.target.classList.toggle("checked");
                saveData();
                updateProgress(); // CRUCIAL: Update progress after checking a task
            } else if (e.target.tagName === "SPAN") {
                e.target.parentElement.remove();
                saveData();
                updateProgress(); // CRUCIAL: Update progress after deleting a task
            }
        },
        false
    );

});


 const notesBox = document.getElementById('notes-box');

  //  Load saved notes when page loads
  window.addEventListener('load', () => {
    const savedNote = localStorage.getItem('userNotes');
    if (savedNote) {
      notesBox.value = savedNote;
    }
  });

  // 💾 Save notes to localStorage
  function saveNotes() {
    const noteContent = notesBox.value.trim();
    localStorage.setItem('userNotes', noteContent);
    alert('✅ Notes saved successfully!');
  }

  const themeToggle = document.getElementById('theme-toggle');
  const fontSizeSelect = document.getElementById('font-size');

  // 🔹 Load saved settings when page loads
  window.addEventListener('load', () => {
    // Theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.style.background = '#121212';
      document.body.style.color = '#fff';
      themeToggle.checked = true;
    }

    // Font size
    const savedFont = localStorage.getItem('fontSize');
    if (savedFont) {
      document.body.style.fontSize = savedFont;
      fontSizeSelect.value = savedFont;
    }
  });

  // 🌙 Toggle dark/light mode
  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      document.body.style.background = '#121212';
      document.body.style.color = '#fff';
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.style.background = '#f4f6f9';
      document.body.style.color = '#000';
      localStorage.setItem('theme', 'light');
    }
  });

  // 🔤 Change font size
  fontSizeSelect.addEventListener('change', () => {
    const size = fontSizeSelect.value;
    document.body.style.fontSize = size;
    localStorage.setItem('fontSize', size);
  });

  // 🧹 Clear all saved data
  function clearAllData() {
    if (confirm('Are you sure you want to clear all saved data (tasks + notes)?')) {
      localStorage.clear();
      alert('All data cleared successfully!');
      location.reload();
    }
  }


