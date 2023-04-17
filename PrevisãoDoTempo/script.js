const searchBtn = document.querySelector('#search');
const cidadeNome = document.querySelector('#cityName');
const tempAtual = document.querySelector('#tempAtual');
const tempo = document.querySelector('#tempo');

/*API call
https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
*/
const keyApi = '332a662da702e7898563d0ecb0a9bd66';

searchBtn.addEventListener('click', buscar);

function renderiza(dados) 
{
    cidadeNome.innerHTML = dados.name;
    tempAtual.innerHTML = `${(dados.main.temp - 273).toFixed(0)} °C`
    tempo.innerHTML = dados.weather[0].main;

    if (dados.weather[0].main == 'Clouds') {
        const pagina = document.querySelector('body');
        const container = document.querySelector('.container');
        container.style.background = 'url(../PrevisãoDoTempo/Modelo/cloudyDay.png)';
        container.style.backgroundSize = 'cover';
        cidadeNome.style.color = 'white'
        tempAtual.style.color = 'white'
        tempo.style.color = 'white'
    }
    if (dados.weather[0].main == 'Rain') {
        const pagina = document.querySelector('body');
        const container = document.querySelector('.container');
        container.style.background = 'url(../PrevisãoDoTempo/Modelo/rainy.jpg)';
        container.style.backgroundSize = 'cover';
        cidadeNome.style.color = 'rgb(208, 208, 208)'
        tempAtual.style.color = 'rgb(208, 208, 208)'
        tempo.style.color = 'rgb(208, 208, 208)'
    }

    if (dados.weather[0].main == 'Clear') {
        const pagina = document.querySelector('body');
        const container = document.querySelector('.container');
        container.style.background = 'url(../PrevisãoDoTempo/Modelo/clear.png)';
        container.style.backgroundSize = 'cover';
    }
}

async function buscarDados(cidade) {
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${keyApi}&lang=pt-br`).then(resposta => resposta.json());
    console.log(dados);
    renderiza(dados);
};

function buscar() 
{
    const cidade = document.querySelector('#inputSearch').value;
    const data = buscarDados(cidade);
    cidade.value = ''
    cidade.focus();
}
