document.addEventListener("DOMContentLoaded", () => {
  const populatePokemonData = (data) => {
    const { name, id, weight, height, types, stats, sprites } = data;

    document.getElementById("pokemon-name").textContent = name.toUpperCase();
    document.getElementById("pokemon-id").textContent = `#${id}`;
    document.getElementById("weight").textContent = `Weight: ${weight}`;
    document.getElementById("height").textContent = `Height: ${height}`;

    const typesContainer = document.getElementById("types");
    typesContainer.innerHTML = "";
    types.forEach((type) => {
      const typeElement = document.createElement("span");
      typeElement.textContent = type.type.name.toUpperCase();
      typesContainer.appendChild(typeElement);
    });

    const statsElements = [
      "hp",
      "attack",
      "defense",
      "special-attack",
      "special-defense",
      "speed",
    ];
    stats.forEach((stat, index) => {
      document.getElementById(statsElements[index]).textContent =
        stat.base_stat;
    });

    const sprite = document.getElementById("sprite");
    sprite.src = sprites.front_default;
    sprite.style.display = "block";
  };

  const fetchAPI = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        alert("Pokémon not found");
        throw new Error("Pokémon not found");
      }
      return response.json();
    } catch (error) {
      console.error(`Error fetching Pokémon data: ${error}`);
    }
  };

  document
    .getElementById("search-button")
    .addEventListener("click", async () => {
      const userInput = document
        .getElementById("search-input")
        .value.toLowerCase()
        .trim();

      const url = `https://pokeapi.co/api/v2/pokemon/${userInput}`;
      const data = await fetchAPI(url);
      if (data) {
        populatePokemonData(data);
      }
    });
});
