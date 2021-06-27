// {
//   /* <ListaPostaci postaci={postaci} ilosc={5} />; */
// }
// {
//   /* to samo co to
//   ListaPostaci({postaci, ilosc:5}) */
// }

import KartaPostaci from "./KartaPostaci";

function ListaPostaci({ postaci, ilosc }) {
  return (
    <div>
      <h2>Lista Postaci ({postaci.info.count})</h2>
      {postaci.results
        .filter((item, index) => index < 5)
        .map(({ name, species, image }) => (
          <KartaPostaci name={name} species={species} image={image} />
        ))}
    </div>
  );
}

export default ListaPostaci;
