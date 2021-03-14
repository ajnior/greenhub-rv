import svgUrls from "../../images/icons/*.svg";

const ICONS_DICTIONARY = {
  sun: {
    high: "high-sun",
    low: "low-sun",
    no: "no-sun",
  },
  water: {
    daily: "3-drops",
    regularly: "2-drops",
    rarely: "1-drop",
  },
};

function renderPlants(target, plants) {
  console.log("plants", plants);

  if (!plants.length)
    document.querySelector(".no-results").classList.remove("hide");

  const cards = plants.map((plant) => {
    const imgDiv = document.createElement("div");
    imgDiv.setAttribute("class", "card__image");

    const img = document.createElement("img");
    img.setAttribute("src", plant.url);
    imgDiv.append(img);

    const infoDiv = document.createElement("div");
    infoDiv.setAttribute("class", "card__info");

    const nameDiv = document.createElement("div");
    nameDiv.setAttribute("class", "card__name");

    const name = document.createElement("h3");
    name.innerHTML = plant.name;
    nameDiv.append(name);

    const priceIconDiv = document.createElement("div");
    priceIconDiv.setAttribute("class", "card__price-icon");

    const priceDiv = document.createElement("div");
    const price = document.createElement("h4");
    price.innerHTML = `$${plant.price}`;
    priceDiv.setAttribute("class", "card__price");
    priceDiv.append(price);

    const iconsDiv = document.createElement("div");
    iconsDiv.setAttribute("class", "card__icons");

    /* Toxic Icon */
    const toxicIcon = document.createElement("img");
    toxicIcon.setAttribute(
      "src",
      `${plant.toxicity ? svgUrls["pet"] : svgUrls["toxic"]}`
    );

    /* Sun Icon */
    const sunIcon = document.createElement("img");
    sunIcon.setAttribute("src", `${svgUrls[ICONS_DICTIONARY.sun[plant.sun]]}`);

    /* Water Icon */
    const waterIcon = document.createElement("img");
    waterIcon.setAttribute(
      "src",
      `${svgUrls[ICONS_DICTIONARY.water[plant.water]]}`
    );

    iconsDiv.appendChild(toxicIcon);
    iconsDiv.appendChild(sunIcon);
    iconsDiv.appendChild(waterIcon);

    console.log("svgUrls", svgUrls);

    priceIconDiv.append(priceDiv);
    priceIconDiv.append(iconsDiv);
    infoDiv.append(nameDiv);
    infoDiv.append(priceIconDiv);

    const cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card");
    if (plant.staff_favorite) cardDiv.classList.add("card--favorite");

    cardDiv.append(imgDiv, infoDiv);

    return cardDiv;
  });

  document.querySelector(".no-results").classList.add("hide");

  return cards.map((card) => target.append(card));
}

function sortByFavorite(list) {
  return list.sort((a, b) => b.staff_favorite - a.staff_favorite);
}

export default function renderResults() {
  const resultsDiv = document.querySelector("#cards");

  this.state.plants.length
    ? renderPlants(resultsDiv, sortByFavorite(this.state.plants))
    : null;
}
