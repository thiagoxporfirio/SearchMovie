let movieNameRef = document.getElementById("movie-name")
let searchBtn = document.getElementById("search-btn")
let result = document.getElementById("result")

let getMovie = () => {
    let movieName = movieNameRef.value
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;


    movieNameRef.addEventListener("input", function(){

        if(movieName.length <= 2 ){
            result.innerHTML = ` `

        }

    })

    if(movieName.length <= 0 ){
        result.innerHTML = `<h3 class="msg">Por favor coloque o nome do filme<h3>`

      
    }
    else {
        fetch(url).then((resp) => resp.json()).then((data) => {
            //if movie exist in database
            if (data.Response == "True") {
                result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                `;
            }


                else{
                    result.innerHTML = `
                        <h3 class="msg" > Nada encontrado :( <h3>
                    `
                }
            })
    }
}

movieNameRef.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      searchBtn.click();
    }

});

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);