const botao = document.querySelector("#searchButton")
const weatherBox = document.querySelector(".search-box")
const errorImage = document.querySelector("#image-error")

botao.addEventListener("click", () => {
    pegarDados()
})

async function pegarDados() {
    const cidade = document.querySelector("#inputText").value;
    
    
    try {
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=8ec509478dca5663906e942e56591d5d`);

        if(resposta.status !== 200){
            weatherBox.classList.replace('search-box', 'search-box-error')
            errorImage.style.display = "block"
        }

        const dados = await resposta.json();
        console.log(dados)
    } catch (erro) {
        console.log("Erro: ", erro.message)
    }
}