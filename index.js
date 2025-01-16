const botao = document.querySelector("#searchButton");
const weatherBox = document.querySelector(".search-box");
const weatherDetails = document.querySelector(".weather-details");
const errorImage = document.querySelector("#image-error");
const weatherImage = document.querySelector("#weather-condition");
const loading = document.querySelector(".loading-text");
const header = document.querySelector(".header")

botao.addEventListener("click", () => {
    pegarDados();
});

async function pegarDados() {
    const cidade = document.querySelector("#inputText").value;

    weatherDetails.style.display = "none"
    weatherBox.classList.remove("search-box-expand", "search-box-error", "search-box");
    weatherBox.classList.add("search-box-loading");
    loading.style.display = "block";
    errorImage.style.display = "none";
    header.style.display = "none"

    try {
        const resposta = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=8ec509478dca5663906e942e56591d5d`
        );

        if (resposta.status !== 200) {
            weatherBox.classList.remove("search-box");
            weatherBox.classList.add("search-box-expand");

            loading.style.display = "none";
            errorImage.style.display = "block";
            return;
        } else {
            const dados = await resposta.json();
            console.log(dados);

            const weatherCondition = dados.weather[0].main;
            const weatherCases = {
                Clear: "./images/clear.png",
                Clouds: "./images/cloud.png",
                Mist: "./images/mist.png",
                Rain: "./images/rain.png",
                Snow: "./images/snow.png",
            };

            weatherImage.src = weatherCases[weatherCondition] || "./images/404.png";

            const temperature = document.querySelector("#temp-num");
            temperature.textContent = `${dados.main.temp} ºC`;

            const humidity = document.querySelector("#hum-num");
            humidity.textContent = `${dados.main.humidity}% UR`;

            loading.style.display = "none";
            weatherBox.classList.remove("search-box-loading", "search-box");
            weatherBox.classList.add("search-box-expand");
            weatherDetails.style.display = "block";
        }
    } catch (erro) {
        weatherBox.classList.remove("search-box");
        weatherBox.classList.add("search-box-expand");
        loading.style.display = "none";
        errorImage.style.display = "block";
    }
}

function loadingText() {
    const loadingText = "Loading data...";
    const container = document.querySelector(".loading-text");

    container.innerHTML = "";

    loadingText.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.setProperty('--i', index)
        container.appendChild(span);
    });

    if (!weatherBox.contains(container)) {
        weatherBox.appendChild(container);
    }

}

loadingText();
