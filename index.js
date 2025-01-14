const botao = document.querySelector("#searchButton")
const weatherBox = document.querySelector(".search-box")
const weatherDetails = document.querySelector(".weather-details")
const errorImage = document.querySelector("#image-error")
const weatherImage = document.querySelector("#weather-condition")

botao.addEventListener("click", () => {
    pegarDados()
})

async function pegarDados() {
    const cidade = document.querySelector("#inputText").value;
    
    weatherBox.classList.remove("search-box-expand", "search-box-error");
    weatherBox.classList.add("search-box-loading");
    errorImage.style.display = "none";

    try {
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=8ec509478dca5663906e942e56591d5d`);

        if(resposta.status !== 200){
            weatherBox.classList.remove('search-box-loading');
            weatherBox.classList.remove('search-box');
            weatherBox.classList.add('search-box-expand')
            errorImage.style.display = "block";
            return;
        }

        const dados = await resposta.json();
        console.log(dados)

        const weatherCondition = dados.weather[0].main;
        const weatherCases = {
            Clear: "./images/clear.png",
            Cloud: "./images/cloud.png",
            Mist: "./images/mist.png",
            Rain: "./images/rain.png",
            Snow: "./images/snow.png"
        }

        weatherImage.src = weatherCases[weatherCondition] || ""

        weatherBox.classList.remove('search-box-loading');
        weatherBox.classList.add('search-box-expand')
        weatherDetails.style.display = "block"
    } catch (erro) {
        console.log("Erro: ", erro.message)
    }
}