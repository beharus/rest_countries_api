let sticky = document.querySelector(".search_content")
let fixed = document.querySelector(".fixed")
let search_cards = document.querySelector(".search_cards")
// SEARCH BOXES & BUTTONS
let searchBtns = document.getElementsByClassName("search")
Array.from(searchBtns)

// SCROLL
const scrollFunc = () => {

  if (window.scrollY >= sticky.offsetHeight) {
    fixed.classList.add("show")
    console.log(true);
  } else {
    fixed.classList.remove("show")
  }
}

setInterval(() => {
  scrollFunc()
}, 500)

// SELECT
let select = document.querySelector("select")

for (i = 0; i < searchBtns.length; i++) {
  const el = searchBtns[i];
  // SELECT
  let selectedValue = String(select.options[select.selectedIndex].id)
  select.addEventListener("change", (e) => {
    selectedValue = String(e.target.options[e.target.selectedIndex].id)
  })
  // SEARCH BUTTON
  el.addEventListener("click", () => {
    
  let search_value = el.parentElement.firstElementChild.value
    newData(`${APIForSearch}${selectedValue}/${el.parentElement.firstElementChild.value}`).then((data) => {
      data.forEach(element => {
        const { flags, name, cca2 } = element
        // SEARCH CARDS
        search_cards.innerHTML += `
        <div id="${cca2.toLowerCase()}" class="search_card">
            <div class="left">
              <img src="${flags.svg}" alt="">
            </div>
            <div class="right">
              <h1>${name.common}</h1>
              <p></p>
            </div>
          </div>
        `
        search_cards.parentElement.querySelector("span").innerHTML = `We found ${data.length == 1 ? `${data.length} country` : `${data.length} countries`} on the <b>${search_value}</b>`
        search_cards.parentElement.classList.remove("hidden")
        search_cards.querySelectorAll(".search_card").forEach(item => {
          item.addEventListener("click", () => {
            newData(APIById + item.getAttribute("id")).then((data) => {
              data.forEach((item) => {
                let {
                  name,
                  cca2,
                  capital,
                  area,
                  coatOfArms,
                  landlocked,
                  continents,
                  independent,
                  fifa,
                  languages,
                  startOfWeek,
                  population,
                  maps
                } = item;
                // CLOSE FUNC
                closeFunc(document.querySelector(".more"), more)
                // LANGUAGE 
                let language = ''
                for (const property in languages) {
                  language += languages[property] + ", "
                }

                // CARDS INFO
                more.innerHTML += `
                          <div class="more_content">
                              <div class="left col">
                                  <div class="">
                                  <img class="flag " src="https://flagcdn.com/${cca2.toLowerCase()}.svg" alt="">
                                  <img class="gerb hidden" src="${coatOfArms.png}" alt="">
                                  </div>
                                  <div class="btns">
                                  <button class="flag_btn active">Flag</button>
                                  <button class="gerb_btn">Coat of arms</button>
                                  </div>
                              </div>
                              <div class="right col">
                                  <h1>${name.official}</h1>
                                  <p>The Catipal of this country is <b>${capital}</b>. The area of this country is about <b>
                                  ${String(area).length > 9
                    ? `${(area / 1000000000).toFixed(1)}billion`
                    : String(area).length > 6
                      ? `${(area / 1000000).toFixed(1)} million`
                      : String(area).length > 3
                        ? `${(area / 1000).toFixed(1)} thousand`
                        : area
                  } square km</b>. it is ${independent == true ? "" : "not"
                  } independent country. Thr population is <b>${String(population).length > 9
                    ? `${(population / 1000000000).toFixed(1)}billion`
                    : String(population).length > 6
                      ? `${(population / 1000000).toFixed(1)} million`
                      : String(population).length > 3
                        ? `${(population / 1000).toFixed(1)} thousand`
                        : population} people</b>. The Football Team of this country ${fifa
                          ? `participates in the "FIFA" football games under the name "<b>${fifa}</b>"`
                          : `does not participate in "FIFA" football games`
                  }. The people who live in this country speak in <b>${language}</b> languages. ${landlocked ? "The country is landlocked." : ""} It loacated in <b> <span class="region"> ${continents}</span> </b>. In this country weeks start from <b>${startOfWeek}</b> </b><p>
                  <br>
                  <a href="${maps.googleMaps}" target="_blank" class="show">show in maps</a>
                              </div>
                          </div>
                              `;


                // FLAG | GERB
                let flag_btn = document.querySelectorAll(".flag_btn");
                let gerb_btn = document.querySelectorAll(".gerb_btn");
                // CLICK ON FLAG
                flag_btn.forEach((item) => {
                  item.addEventListener("click", () => {
                    if (
                      !item.parentElement.previousElementSibling.children[0]
                        .getAttribute("class")
                        .includes("active")
                    ) {
                      item.classList.add("active");
                      item.nextElementSibling.classList.remove("active");
                      item.parentElement.previousElementSibling.children[0].classList.remove(
                        "hidden"
                      );
                      item.parentElement.previousElementSibling.children[1].classList.add(
                        "hidden"
                      );
                    } else {
                      item.classList.remove("active");
                      item.nextElementSibling.classList.add("active");
                      item.parentElement.previousElementSibling.children[0].classList.add(
                        "hidden"
                      );
                      item.parentElement.previousElementSibling.children[1].classList.remove(
                        "hidden"
                      );
                    };
                  });
                })

                //   CLICK ON GERB
                gerb_btn.forEach((item) => {
                  if (
                    !item.parentElement.previousElementSibling.children[1]
                      .getAttribute("src")
                      .includes("http")
                  ) {
                    item.classList.add("hidden");
                  }
                  item.addEventListener("click", () => {
                    if (
                      !item.parentElement.previousElementSibling.children[1]
                        .getAttribute("class")
                        .includes("active")
                    ) {
                      item.classList.add("active");
                      item.previousElementSibling.classList.remove("active");
                      item.parentElement.previousElementSibling.children[0].classList.add(
                        "hidden"
                      );
                      item.parentElement.previousElementSibling.children[1].classList.remove(
                        "hidden"
                      );
                    } else {
                      item.classList.remove("active");
                      item.previousElementSibling.classList.add("active");
                      item.parentElement.previousElementSibling.children[1].classList.add(
                        "hidden"
                      );
                      item.parentElement.previousElementSibling.children[0].classList.remove(
                        "hidden"
                      );
                    }
                  });
                });
                document.querySelector(".more").classList.remove("hidden");
              })
            })
          })
        })
      });
    })
    el.parentElement.firstElementChild.value = ""
  })

}

document.querySelector(".xxx").addEventListener("click", () => {
  search_cards.parentElement.classList.add("hidden");
  search_cards.innerHTML = " "
});