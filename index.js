const API_URL =
  'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309-FSA-ET-WEB-FT-SF/events';

const state = {
  parties: [],
};

const partyList = document.querySelector ('#parties');
const addPartyForm = document.querySelector ('#addParty');
addPartyForm.addEventListener ('submit', addParty);

// Fetch the list of parties
async function getParties () {
  try {
    const response = await fetch (API_URL);
    const json = await response.json ();

    console.log (`response is a ${typeof response}`);
    console.log (`json is a ${typeof json}`);

    // update the state.parties with list from response
    state.parties = json;
  } catch (error) {
    console.log (error);
  }
}

function renderParties () {
  if (!state.parties.length) {
    partyList.innerHTML = `<li>No parties found </li>`;
    return;
  }

  // map method to convert js object into party elements
  const partyElements = state.parties.map (party => {
    const li = document.createElement ('li');
    li.classList.add ('party');
    li.innerHTML = `
        <h2>${party.name}</h2>
        <p>${party.dateTime}</p>
        <p>${party.location}</p>
        <p>${party.description}</p>
        `;
    // create delete button seperately for event listener
    const deleteButton = document.createElement ('button');
    deleteButton.textContent = 'Delete Event';
    li.append (deleteButton);
    deleteButton.addEventListener ('click', deleteParty (party.id));

    return li;
  });
  partyList.replaceChildren (...partyElements);
}
 