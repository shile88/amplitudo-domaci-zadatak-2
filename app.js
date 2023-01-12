const movies = [
  {
    watched: false,
    title: "Batman",
    year: 2005,
    country: "USA",
    description: "action movie",
    actors: ["Christian Bale", "Katie Holmes"],
  },
  {
    watched: false,
    title: "Inception",
    year: 2010,
    country: "USA",
    description: "sci-fi movie",
    actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
  },
  {
    watched: false,
    title: "Interstellar",
    year: 2014,
    country: "USA",
    description: "sci-fi movie",
    actors: ["Matthew McConaughey", "Anne Hathaway"],
  },
];

function displayMovies() {
  let content = "";
  movies.forEach((movie) => {
    content += `<tr id='row' class='false'>
                    <td><input class='form-check-input border border-primary' type='checkbox' name='myCheck''></td>
                    <td>${movie.title}</td>
                    <td>${movie.year}</td>
                    <td>${movie.country}</td>
                    <td>${movie.description}</td>
                    <td>${movie.actors}</td>
                 </tr>`;
  });
  document.getElementById("table-body").innerHTML = content;
}

displayMovies();

function change() {
  let checkbox = document.getElementsByName("myCheck");

  for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener("change", (e) => {
      if (e.target.checked == true) {
        e.target.parentNode.parentNode.classList.remove("false");
        e.target.parentNode.parentNode.classList.add("true");
      } else {
        e.target.parentNode.parentNode.classList.remove("true");
        e.target.parentNode.parentNode.classList.add("false");
      }
    });
  }
}

change();

function addMoviesInput() {
  let actorsArray = [];
  let actors = document.getElementById("actors-input").value;
  if(actors !== "") {
    actors = actors.split(",");
    actorsArray.push(actors);
  }
 
  return {
    watched: false,
    title: document.getElementById("title-input").value,
    year: document.getElementById("year-input").value,
    country: document.getElementById("country-input").value,
    description: document.getElementById("description-input").value,
    actors: actorsArray,
  };
}

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
});

function handleSubmit() {
  let inputInfo = addMoviesInput();
  let sameMovie = "";

  movies.forEach((movie) => {
    if (movie.title.toLowerCase() === inputInfo.title.toLowerCase()) {
      sameMovie = true;
      document.getElementById("title-input").classList.add("is-invalid");
      document.getElementById("sameMovie").innerHTML = "<p>Film vec postoji!</p>"
    }
  });

  if ( !sameMovie) {
    document.getElementById("title-input").classList.remove("is-invalid");
    document.getElementById("sameMovie").innerHTML = ""
  }

  let checkYear = "";

  if (inputInfo.year === "") {
    checkYear = true;
  } else {
    var yearNumber = parseInt(inputInfo.year);
    if (yearNumber > 1930 && yearNumber < 2021) {
      inputInfo.year = yearNumber;
      checkYear = true;
    }
  }

  if(inputInfo.actors.length === 0) {
    document.getElementById("actors-input").classList.add("is-invalid");
    document.getElementById("no-actors").innerHTML = "<p>Unesite bar jednog glumca!</p>"
  } else {
    document.getElementById("actors-input").classList.remove("is-invalid");
    document.getElementById("no-actors").innerHTML = ""
  }

  if (!sameMovie && checkYear && inputInfo.actors.length !== 0) {
    movies.push(inputInfo);
    var myModalEl = document.getElementById("staticBackdrop");
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
    document.getElementById('form').reset();
    document.getElementById("title-input").classList.remove("is-invalid");
    document.getElementById("actors-input").classList.remove("is-invalid");
    document.getElementById("sameMovie").innerHTML = ""
    document.getElementById("no-actors").innerHTML = ""
  }
  displayMovies();
  change();
}
