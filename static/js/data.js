const findElement = (string) => {
  return document.querySelector(string)
}

checkIfPopup = (event) => {
 if (!event.target.classList.contains('modal')) closeAllPopups()
  return
}

const refresh = () => {
  location.reload()
}
let key

const keyValuePairArrayLength = JSON.parse(document.querySelector("#keyValuePairs").textContent)
const addRowEl = findElement("#add-row")
const tbodyEl = findElement("#tbody")
const infoTextSpan = findElement('#info-text')
const infoTextContainer = findElement('#info-text-container')
const keys = [...document.querySelectorAll(".key")]
const values = [...document.querySelectorAll('.value')]
const tableFooterRow = findElement('#table-footer-row')
const saveContainer = findElement('#save-container')
const refreshSaveContainer = findElement('#refresh-save-container')
const storedCount = findElement('#stored-count')
const errorContainer = findElement('#error-container')

const displaySaveButton = (activate) => {
  // activate should be a boolean
  saveContainer.style.opacity = activate ? '100%' : '40%';
  saveContainer.style.border = activate ? 'var(--strong-border)' : 'var(--weak-border)'
  activate ? saveContainer.classList.remove('disable-events') : saveContainer.classList.add('disable-events')
}

const checkArray = (items) => {
  if(items === 0) {
    tableFooterRow.style.display = 'none';
    refreshSaveContainer.style.display = 'none'
  } 
}

const openDeletePopup = (key, deletePopup) => {
  closeAllPopups()
  findElement(`#delete-popup-${key}`).style.display = 'block'
  const popups = document.querySelectorAll(`[id^=delete-popup-]`)
  const popupArray = [...popups];
  const updatedArray = popupArray.map(popup => {
    return popup.parentElement
  })
  const index = updatedArray.indexOf(deletePopup)
  updatedArray.splice(index, 1)
  for (let popup of updatedArray) {
    popup.setAttribute('onClick', 'deleteData(this)')
  }
}

const closeDeletePopup = (key) => {
  const popup = document.querySelector(`delete-popup-${key}`);
  popup.style.display = 'none';
}

const closeAllPopups = () => {
  const popups = document.querySelectorAll(`[id^=delete-popup-]`);
  for (let popup of popups) {
    popup.style.display = "none";
  }
}

// Method DELETE
const deleteData = (deletePopup) => {
  addRowEl.classList.add('disable-events')
  key = deletePopup.closest('tr').id
  deletePopup.setAttribute('onClick', 'cancelDelete(this)')
  openDeletePopup(key, deletePopup)
}

const confirmDelete = async () => {
  closeAllPopups();
  const res = await (await fetch(`item/${key}`, {
    method: 'DELETE',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({}),
  })).json();
  if (res.success !== true) console.log(res.error);
  const storedKeys = Number(storedCount.textContent);
  storedCount.textContent = storedKeys - 1;
  document.getElementById(`${key}`).remove();
  addRowEl.classList.remove('disable-events');
  if(storedKeys - 1 < 1) {
    tableFooterRow.style.display = 'none';
    refreshSaveContainer.style.display = 'none';
  }
};

const cancelDelete = (deleteButton) => {
  closeAllPopups()
  addRowEl.classList.remove('disable-events')
  deleteButton.setAttribute('onClick', 'deleteData(this)')
}

// Method POST
const addData = () => {
  const newRow = `
    <tr id="new-row" class="key-value-row">
    <td class="checkmark-td"></td>
    <td>
    <textarea class="new-pair-key" rows="1" placeholder="key..." ></textarea>
      </td>
      <td class="value-td">
        <textarea class="new-pair-value" rows="1" placeholder="value..." ></textarea>
      </td>
      <td class="table-addrow-x pointer" onClick="cancelAdd()">
        <img class="pointer" src="../static/img/x.png" />
      </td>
    </tr>
  `
  tbodyEl.innerHTML += newRow
  const addedRow = findElement('#new-row')
  const newPairKey = findElement('.new-pair-key')
  const newPairValue = findElement('.new-pair-value')
  tableFooterRow.style.display = 'table-row';
  refreshSaveContainer.style.display = 'flex'
  saveContainer.style.display = 'flex';
  addRowEl.classList.add('disable-events')
  addedRow.addEventListener('keyup', () => {
    if (newPairKey.value && newPairValue.value) {
      saveContainer.style.opacity = '100%';
      saveContainer.style.border = 'var(--strong-border)'
      saveContainer.classList.remove('disable-events')
    } 
  })
}

const confirmAdd = async () => {
  const keyValuePairs = [];
  const keys = document.querySelectorAll(".new-pair-key");
  const values = document.querySelectorAll('.new-pair-value');
  const checkmarkTds = document.querySelectorAll('.checkmark-td');

  for (let i = 0; i < keys.length; i++) {
    keyValuePairs.push({
      key: keys[i].value,
      value: values[i].value,
    });
  }

  const res = await (await fetch('', {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(keyValuePairs),
  })).json();

  if (res.success === true) {
    errorContainer.innerHTML = ''
    saveContainer.classList.add('disable-events')
    saveContainer.style.opacity = '40%'
    saveContainer.style.border = 'var(--weak-border)'
    addRowEl.classList.remove('disable-events')
    const storedKeys = Number(storedCount.textContent)
    storedCount.textContent = storedKeys + 1
    /* 
      Function below is specifically for single deposit. If you want to add multiple key and values you must change the method of 
      inserting information back into the table
   */
    findElement('#new-row').remove()
    for (let x = 0; x < keys.length; x++) {
      tbodyEl.innerHTML += `
        <tr id="${res.id}" class="key-value-row">
          <td>
            <div class="icon-container flex">
              <img src="../static/img/checkmark-black.png" alt="checkmark" />
            </div>
          </td>
          <td>
            <textarea class="key" rows="1" disabled >${res.key}</textarea>
          </td>
          <td class="value-td">
            <textarea class="value" rows="1" disabled >${res.value}</textarea>
          </td>
          <td>
            <div class="icon-container flex pointer position-relative" onClick="deleteData(this)">
              <img src="../static/img/x.png" alt="delete-button" />
              <div id="delete-popup-${res.id}" class="popup" onclick="confirmDelete(this)">
                <span class="popuptext">
                  Confirm <br />
                  <button class="delete-button">
                    Delete
                  </button>
                </span>  
              </div>    
            </div>
          </td>
        </tr>
      `
      keys[x].innerHTML = res.key
      keys[x].setAttribute('disabled',true)
      keys[x].classList.remove('new-pair-key')
      values[x].innerHTML = res.value
      values[x].setAttribute('disabled', true)
      values[x].classList.remove('new-pair-value')
      checkmarkTds[x].innerHTML = `
        <div class="icon-container flex">
          <img src="../static/img/checkmark-black.png" alt="checkmark" />
        </div>
      `
    } 
  } else {
    // This code has to be changed if you want to add multiple keys
    errorContainer.innerHTML = `
      <img src="../static/img/error-exclamation-mark.png" alt="red exclamation mark" />
      <span>${res.error}</span>
    `
    checkmarkTds[0].innerHTML = `
      <div class="icon-container flex">
        <img src="../static/img/error-exclamation-mark.png" alt="red exclamation mark" />
      </div>
    `
  }
};

const cancelAdd = () => {
  findElement('#new-row').remove()
  addRowEl.classList.remove('disable-events')
  displaySaveButton(false)
  errorContainer.innerHTML = ''
  checkArray(keyValuePairArrayLength)
}