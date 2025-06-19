const myLibraryListDiv = document.getElementById('my-library-list');
const addBtn = document.getElementById('add-book-btn');
const formDiv = document.getElementById('book-form');
const saveBtn = document.getElementById('save-book-btn');

const myLibrary = [
    {
        uuid: crypto.randomUUID(),
        title: "Man and His Symbols",
        author: "Carl Jung",
        readStatus: "Read",
        addedAt: "2025-06-10T12:30:00",
    },
    {
        uuid: crypto.randomUUID(),
        title: "The Wim Hof Method",
        author: "Wim Hof",
        readStatus: "Read",
        addedAt: "2025-06-10T14:30:00",
    }
];

function showLibrary () {
    myLibraryListDiv.innerHTML = "";

    const sortedMyLibrary = [...myLibrary].sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));

    sortedMyLibrary.forEach(
        book => {
            const card = document.createElement('div');
            card.className = 'book-card';
            card.innerHTML = 
            `
            <h4>${book.title}</h4>
            <p>Author: ${book.author}</p>
            <p><em>Added: ${new Date(book.addedAt).toLocaleDateString()}</em></p>
            `;

            // Выпадающий список для смены статуса
            const statusSelect = document.createElement('select');
            statusSelect.setAttribute('data-uuid', book.uuid);

            const statuses = ["Reading", "Next Read", "To read", "Read"];
            statuses.forEach(status => {
                const option = document.createElement('option');
                option.value = status;
                option.textContent = status;
                if (status === book.readStatus) {
                    option.selected = true;
                }
                statusSelect.appendChild(option);
            });

            statusSelect.addEventListener('change', (e) => {
                updateBookStatus(e.target.dataset.uuid, e.target.value);
            });

            card.appendChild(statusSelect);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.setAttribute('data-uuid', book.uuid);
            deleteBtn.classList.add('delete-button');

            deleteBtn.addEventListener('click', () => {
                deleteBook(book.uuid);
            });

            card.appendChild(deleteBtn);
            myLibraryListDiv.appendChild(card);
        }
    )
}

showLibrary();

// Show Book Adding form
addBtn.addEventListener('click', () => {
    formDiv.style.display = formDiv.style.display === 'none' ? 'block' : 'none';
})

function updateBookStatus(uuid, newStatus) {
    const book = myLibrary.find(book => book.uuid === uuid);
    if (book) {
        book.readStatus = newStatus;
        showLibrary();
    }
}

function deleteBook(uuid) {
    const index = myLibrary.findIndex(book => book.uuid === uuid);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        showLibrary();
    }
}

saveBtn.addEventListener('click', () => {
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const status = document.getElementById('status').value.trim();

  if (!title || !author || !status) {
    alert("Please fill in all fields.");
    return;
  }

  myLibrary.push({
    uuid: crypto.randomUUID(),
    title,
    author,
    readStatus: status,
    addedAt: new Date().toISOString()
  });

  formDiv.style.display = 'none';
  document.getElementById('title').value = "";
  document.getElementById('author').value = "";
  document.getElementById('status').value = "Reading";

  showLibrary();

})