const dadosTempo = document.querySelector("#dados-tempo");
const destaques = document.querySelector("#destaques-membros");
const erroDestaques = document.querySelector("#erro-destaques");

async function carregarTempo() {
  const latitude = -23.5505;
  const longitude = -46.6333;
  const chaveOpenWeather = "";

  if (!chaveOpenWeather) {
    await carregarTempoComFallback(latitude, longitude);
    return;
  }

  const url =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}` +
    `&lon=${longitude}&appid=${encodeURIComponent(chaveOpenWeather)}` +
    `&units=metric&lang=pt_br&cnt=24`;

  try {
    const resposta = await fetch(url);
    if (!resposta.ok) {
      throw new Error("Não foi possível consultar o clima.");
    }

    const dados = await resposta.json();
    const atual = dados.list[0];
    const descricao = atual.weather[0].description;
    const dias = dados.list.filter((item) => item.dt_txt.includes("12:00:00")).slice(0, 3);
    const previsao = dias.map((item) => {
      const dia = new Intl.DateTimeFormat("pt-BR", { weekday: "short" })
        .format(new Date(item.dt * 1000));
      return `
        <div class="dia-previsao">
          ${dia}
          <strong>${Math.round(item.main.temp)}°C</strong>
        </div>
      `;
    }).join("");

    dadosTempo.innerHTML = `
      <div class="tempo-atual">
        <span class="temperatura">${Math.round(atual.main.temp)}°C</span>
        <p class="descricao-tempo">${descricao}</p>
      </div>
      <div class="previsao" aria-label="Previsão para os próximos três dias">
        ${previsao}
      </div>
    `;
  } catch (erro) {
    await carregarTempoComFallback(latitude, longitude);
  }
}

async function carregarTempoComFallback(latitude, longitude) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}` +
    `&longitude=${longitude}&current=temperature_2m,weather_code` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=America%2FSao_Paulo&forecast_days=4`;

  const codigosTempo = new Map([
    [0, "céu limpo"],
    [1, "predominantemente limpo"],
    [2, "parcialmente nublado"],
    [3, "nublado"],
    [45, "nevoeiro"],
    [48, "nevoeiro com geada"],
    [51, "garoa leve"],
    [61, "chuva leve"],
    [63, "chuva"],
    [65, "chuva forte"],
    [80, "chuva passageira"],
    [95, "trovoada"]
  ]);

  try {
    const resposta = await fetch(url);
    if (!resposta.ok) throw new Error("Falha no serviço meteorológico.");
    const dados = await resposta.json();
    const descricao = codigosTempo.get(dados.current.weather_code) || "tempo variável";
    const dias = dados.daily.time.slice(1, 4).map((data, indice) => {
      const dia = new Intl.DateTimeFormat("pt-BR", { weekday: "short" })
        .format(new Date(`${data}T12:00:00`));
      const maxima = Math.round(dados.daily.temperature_2m_max[indice + 1]);
      const minima = Math.round(dados.daily.temperature_2m_min[indice + 1]);
      return `<div class="dia-previsao">${dia}<strong>${maxima}° / ${minima}°</strong></div>`;
    }).join("");

    dadosTempo.innerHTML = `
      <div class="tempo-atual">
        <span class="temperatura">${Math.round(dados.current.temperature_2m)}°C</span>
        <p class="descricao-tempo">${descricao}</p>
      </div>
      <div class="previsao" aria-label="Previsão para os próximos três dias">${dias}</div>
    `;
  } catch (erro) {
    dadosTempo.innerHTML =
      "<p>Não foi possível carregar o clima no momento. Tente novamente mais tarde.</p>";
  }
}

function embaralhar(lista) {
  const resultado = [...lista];
  for (let indice = resultado.length - 1; indice > 0; indice--) {
    const outroIndice = Math.floor(Math.random() * (indice + 1));
    [resultado[indice], resultado[outroIndice]] =
      [resultado[outroIndice], resultado[indice]];
  }
  return resultado;
}

async function carregarDestaques() {
  try {
    const resposta = await fetch("dados/membros.json");
    if (!resposta.ok) {
      throw new Error("Não foi possível carregar os membros.");
    }

    const membros = await resposta.json();
    const elegiveis = membros.filter(
      (membro) => membro.nivelAssociacao === 2 || membro.nivelAssociacao === 3
    );
    const selecionados = embaralhar(elegiveis).slice(0, 3);

    destaques.innerHTML = selecionados.map((membro) => {
      const nivel = membro.nivelAssociacao === 3 ? "Ouro" : "Prata";
      return `
        <article class="membro">
          <img src="imagens/${membro.imagem}" alt="Logotipo de ${membro.nome}" width="220" height="150" loading="lazy">
          <div class="corpo-membro">
            <p class="setor">${membro.setor}</p>
            <h3 class="nome-membro">${membro.nome}</h3>
            <p class="endereco">${membro.endereco}</p>
            <p class="telefone">${membro.telefone}</p>
            <a class="site-membro" href="${membro.site}" target="_blank" rel="noopener noreferrer">
              Visitar site
            </a>
            <p class="nivel nivel-${membro.nivelAssociacao}">Membro ${nivel}</p>
          </div>
        </article>
      `;
    }).join("");

    destaques.setAttribute("aria-busy", "false");
  } catch (erro) {
    destaques.setAttribute("aria-busy", "false");
    erroDestaques.hidden = false;
  }
}

carregarTempo();
carregarDestaques();
