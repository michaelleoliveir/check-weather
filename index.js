const botao = document.querySelector("#searchButton")

botao.addEventListener("click", () => {
    pegarDados()
})

async function pegarDados() {
    const cidade = document.querySelector("#inputText").value;
    const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=8ec509478dca5663906e942e56591d5d`);

    console.log(resposta)
}