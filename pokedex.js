function fetchPokemon(pokemon) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  fetch(url)
    .then((respuesta) => {
      if (respuesta.status != "200") {
        console.log(respuesta);
        const pokeImg = document.getElementById("pokeImg");
        pokeImg.src = ("./poketriste.png");
        var input = document.getElementById('pokemon');
        input.value = "Not found";
      } else {
        return respuesta.json();
      }
    })
    .then((data) => {
      console.log(data);

      const pokemon = {
        imgJuego: data.sprites.front_default,
        imgCvg: data.sprites.other.home.front_default,
        id: data.id,
        nombre: data.name,
        experiencia: data.base_experience,
        tipo: data.types[0].type.name,
        altura: data.height,
        peso: data.weight,
        hp: data.stats[0].base_stat,
        ataque: data.stats[1].base_stat,
        defensa: data.stats[2].base_stat,
        especialAtck: data.stats[3].base_stat,
        especialDef: data.stats[4].base_stat,
        velocidad: data.stats[5].base_stat,
        movimientos: data.moves,
      };

      actualizarPokemon(pokemon);
    });
}

function imprimir() {
  const pokeName = document.getElementById("pokemon");
  let pokeValue = pokeName.value;
  fetchPokemon(pokeValue.toLowerCase());
}

function actualizarPokemon(pokemon) {
  const pokeImg = document.getElementById("pokeImg");
  pokeImg.src = pokemon.imgCvg;

  document.getElementById("name").innerHTML =
    pokemon.nombre[0].toUpperCase() + pokemon.nombre.substring(1);
  document.getElementById("pokeId").innerHTML = "N°" + pokemon.id;
  document.getElementById("type").innerHTML =
    pokemon.tipo[0].toUpperCase() + pokemon.tipo.substring(1);

  document.getElementById("height").innerHTML = pokemon.altura;
  document.getElementById("weight").innerHTML = pokemon.peso;
  document.getElementById("exp").innerHTML = pokemon.experiencia;

  document.getElementById("hp").innerHTML = pokemon.hp;
  document.getElementById("atk").innerHTML = pokemon.ataque;
  document.getElementById("def").innerHTML = pokemon.defensa;
  document.getElementById("satk").innerHTML = pokemon.especialAtck;
  document.getElementById("sdef").innerHTML = pokemon.especialDef;
  document.getElementById("spd").innerHTML = pokemon.velocidad;

  PokeMoves = document.getElementById("movimientos");

  for (let i = 0; i < pokemon.movimientos.length; i++) {
    const move = document.createElement("li");
    PokeMoves.appendChild(move);

    move.innerText = pokemon.movimientos[i].move.name;

  }
}
