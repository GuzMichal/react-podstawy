function mainWrapper() {
  const stanAplikacji = {
    page: 1,
    info: null,
    $listaPostaci: document.getElementById("lista"),
    $lista: document.getElementById("lista"),
    $liczbaPostaci: document.getElementById("liczba-postaci"),
    $naKtorejStonieJestesmy: document.getElementById("aktualna-strona"),
    $iloscStron: document.getElementById("ilosc-stron"),
    filters: {
      name: "",
      status: "",
    },
  };

  const $buttonPrev = document.getElementById("prev");
  const $buttonNext = document.getElementById("next");
  const $inputFilter = document.getElementById("filter");
  const $selectStatus = document.getElementById("status");
  const $buttonClear = document.getElementById("clear");
  const $inputPage = document.getElementById("page");

  $buttonPrev.addEventListener("click", handlePageChangeClick);
  $buttonNext.addEventListener("click", handlePageChangeClick);
  $inputFilter.addEventListener("keyup", handleFilterBackend);
  $selectStatus.addEventListener("change", handleFilterStatus);
  $buttonClear.addEventListener("click", handleClearFilters);
  $inputPage.addEventListener("keyup", handlePageChange);

  async function handlePageChange(event) {
    const { value } = event.target;
    if (value < 1 || value > stanAplikacji.info.pages) {
      alert("Podana strona nie istnieje");
      return;
    }
    stanAplikacji.page = value;

    const data = await pobierzPostaci();

    if (data.error) {
      alert(error);
    } else {
      stanAplikacji.info = data.info;
      stanAplikacji.$listaPostaci.innerHTML = "";
      data.results.forEach(stworzKartePostaci);
      updateUI();
    }
  }

  function handleClearFilters() {
    stanAplikacji.filters = { name: "", status: "" };

    stanAplikacji.page = 1;
  }

  async function handleFilterStatus(event) {
    const { value } = event.target;
    console.log("value", value);
    const characters = await pobierzPostaci();
    stanAplikacji.filters.status = value;
    stanAplikacji.info = characters.info;
    stanAplikacji.$listaPostaci.innerHTML = "";
    characters.results.forEach(stworzKartePostaci);
    stanAplikacji.$liczbaPostaci.innerHTML = characters.info.count;
  }

  async function handleFilterBackend(event) {
    const { value } = event.target;
    const characters = await pobierzPostaci();
    stanAplikacji.filters.name = value;
    console.log(characters, "characters");
    if (characters.error) {
      alert(characters.error);
    } else {
      stanAplikacji.info = characters.info;
      stanAplikacji.$listaPostaci.innerHTML = "";
      characters.results.forEach(stworzKartePostaci);
      stanAplikacji.$liczbaPostaci.innerHTML = characters.info.count;
    }
  }

  async function handlePageChangeClick(event) {
    const direction = event.target.id;

    if (direction === "prev" && stanAplikacji.info.prev === null) {
      alert("Jesteś na 1 stronie!");
      return;
    } else if (direction === "next" && stanAplikacji.info.next === null) {
      alert("Jesteś na ostatniej stronie!");
      return;
    }
    direction === "prev" ? stanAplikacji.page-- : stanAplikacji.page++;

    const characters = await pobierzPostaci();
    stanAplikacji.info = characters.info;
    stanAplikacji.$listaPostaci.innerHTML = "";
    characters.results.forEach(stworzKartePostaci);
    updateUI();
  }

  function updateUI() {
    stanAplikacji.$naKtorejStonieJestesmy.innerHTML = stanAplikacji.page;
    console.log("stanAplikacji.page", stanAplikacji.page);
  }

  async function pobierzPostaci() {
    let params = `/?page=${stanAplikacji.page}`;
    if (stanAplikacji.filters.name) {
      params += `&name=${stanAplikacji.filters.name}`;
    }
    if (stanAplikacji.filters.status) {
      params += `&status=${stanAplikacji.filters.status}`;
    }

    const data = await fetch(
      `https://rickandmortyapi.com/api/character${params}`
    );
    const response = await data.json();
    return response;
  }

  function stworzKartePostaci(data) {
    const $card = document.createElement("div");
    $card.classList = "card";
    const $img = document.createElement("img");
    $img.src = data.image;
    $img.alt = data.name;
    $card.appendChild($img);
    const $container = document.createElement("div");
    $container.classList = "container";
    const $name = document.createElement("h4");
    $name.innerHTML = data.name;
    const $species = document.createElement("p");
    $species.innerHTML = data.species;
    $container.appendChild($name);
    $container.appendChild($species);
    $card.appendChild($container);
    $card.dataset.name = data.name;
    stanAplikacji.$lista.appendChild($card);
  }

  async function main() {
    const characters = await pobierzPostaci();
    stanAplikacji.info = characters.info;
    stanAplikacji.$liczbaPostaci.innerHTML = characters.info.count;
    stanAplikacji.$iloscStron.innerHTML = characters.info.pages;
    updateUI();
    characters.results.forEach(stworzKartePostaci);
  }

  main();
}

setTimeout(mainWrapper, 100);
