// function stworzKartePostaci(data) {
//   const $card = document.createElement("div");
//   $card.classList = "card";
//   const $img = document.createElement("img");
//   $img.src = data.image;
//   $img.alt = data.name;
//   $card.appendChild($img);
//   const $container = document.createElement("div");
//   $container.classList = "container";
//   const $name = document.createElement("h4");
//   $name.innerHTML = data.name;
//   const $species = document.createElement("p");
//   $species.innerHTML = data.species;
//   $container.appendChild($name);
//   $container.appendChild($species);
//   $card.appendChild($container);
//   $card.dataset.name = data.name;
//   stanAplikacji.$lista.appendChild($card);
// }

function KartaPostaci({ name, image, species }) {
  return (
    <div className="card" data-name={name}>
      <img src={image} alt={name} />
      <div className="container">
        <h4>{name}</h4>
        <p>{species}</p>
      </div>
    </div>
  );
}
export default KartaPostaci;
