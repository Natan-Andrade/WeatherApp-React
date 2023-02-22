import './App.css';
import { useState } from 'react';

function Search() {

  const [cidade, setCidade] = useState("");

  function detectarPesquisa() {

    let currentValue = document.querySelector('input[name=pesquisar]').value;

    // Requisição API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=95671f47fb53c0d07c100da8eadfa3be&units=metric`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const { main, name, sys, weather } = data;

        if (sys != undefined) {
          console.log(sys);
        }

        if (weather != undefined) {
          const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
          setCidade(`
              <h2 class="card-title mb-4">${name}</h2>
              <p>${weather[0]['description']}</p>
              <div class='card-number fw-bold'>${main.temp}º</div>
              <img class="icon" src="${icon}" />
          `)
        } else {
          setCidade("");
        }

      })

  }

  return (
    <div className="Search">
      <header className="App-header">
        <div className="col-md-6 d-flex justify-content-center">
          <div className='card m-2 cb1 text-center'>
            <div class="card-body">
                
                {
                  (cidade != '')?
                  <div dangerouslySetInnerHTML={{__html: cidade}} />:
                  <div>Qual a sua cidade?</div>
                }
                <input className="btn" placeholder='pesquisar' type="text" onKeyUp={detectarPesquisa} name="pesquisar" />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

{/* <input className="input-group-text" type="text" onKeyUp={detectarPesquisa} name="pesquisar" />
{
  (cidade != '')?
  <div dangerouslySetInnerHTML={{__html: cidade}} />:
  <div>Pesquise por algo acima</div>
} */}

export default Search;
