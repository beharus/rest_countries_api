const API = "https://restcountries.com/v3.1/all";
const APIById = "https://restcountries.com/v3.1/alpha/"
const APIForSearch = "https://restcountries.com/v3.1/"

const overlay = document.querySelector(".overlay");

const allCountries = document.querySelector(".all");
const allNumb = document.querySelector(".all_countries");
// ASIA
const asiaCountries = document.querySelector(".asia");
const asiaNumb = document.querySelector(".asian_countries");
// AFRICA
const africanCountries = document.querySelector(".africa");
const africaNumb = document.querySelector(".african_countries");
// EUROPES
const europeanCountries = document.querySelector(".europe");
const europeNumb = document.querySelector(".europian_countries");
// AMERICAS
const americanCountries = document.querySelector(".america");
const americaNumb = document.querySelector(".american_countries");
// OCEANIA
const oceanianCountries = document.querySelector(".oceania");
const oceaniaNumb = document.querySelector(".oceanian_countries");

// MORE

let more = document.querySelector(".more_info");

const newData = (resource) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener("readystatechange", () => {
      if (request.readyState < 4) {
        overlay.classList.remove("hidden");
      } else if (request.readyState == 4 && request.status == 200) {
        overlay.classList.add("hidden");
        const data = JSON.parse(request.responseText);
        resolve(data);
      } else if (request.readyState == 4) {
        overlay.classList.add("hidden");
        reject("error");
      }
    });
    request.open("GET", resource);
    request.send();
  });
};

newData(API)
  .then((data) => {
    all(data);
    asia(data);
    africa(data);
    europe(data);
    Americas(data);
    ocean(data);
  })
  .catch((err) => {
    console.log("error");
  });

// MAKE CARDS
const getCountry = (country, correctRegion, group) => {
  // GET CORRECT LANGUAGE
  country.forEach((element) => {
    const { name, region, cca2, } = element;

    // GET COUNTRIES WITH REGIONS
    if (region == correctRegion) {
      group.innerHTML += `
            <div id="${cca2}" class="country">
                    <div class="flag"><img src="https://flagcdn.com/${cca2.toLowerCase()}.svg" alt="" /></div>
                    <div class="header">${name.common.length > 20
          ? name.common.slice(0, 20) + "..."
          : name.common
        }</div>
                    <div class="hover">${name.official}<div>
            </div>`;
    }
  });

  //   MORE INFO PAGE CLICK
  group.querySelectorAll(".country").forEach((country) => {
    country.addEventListener("click", () => {
      // UPLOAD NEW INFORMATION
      newData(APIById + country.getAttribute("id")).then((data) => {
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
    });
  });
};
// COUNTRIES FUNC
const all = (data) => {
  getCountry(data, "Africa", allCountries);
  getCountry(data, "Asia", allCountries);
  getCountry(data, "Europe", allCountries);
  getCountry(data, "Americas", allCountries);
  getCountry(data, "Oceania", allCountries);
  allNumb.innerHTML += `(${document.querySelectorAll(".all .country").length
    });`;
};
const asia = (data) => {
  getCountry(data, "Asia", asiaCountries);
  asiaNumb.innerHTML += `(${document.querySelectorAll(".asia .country").length
    });`;
};
const africa = (data) => {
  getCountry(data, "Africa", africanCountries);
  africaNumb.innerHTML += `(${document.querySelectorAll(".africa .country").length
    });`;
};
const europe = (data) => {
  getCountry(data, "Europe", europeanCountries);
  europeNumb.innerHTML += `(${document.querySelectorAll(".europe .country").length
    });`;
};
const Americas = (data) => {
  getCountry(data, "Americas", americanCountries);
  americaNumb.innerHTML += `(${document.querySelectorAll(".america .country").length
    });`;
};
const ocean = (data) => {
  getCountry(data, "Oceania", oceanianCountries);
  oceaniaNumb.innerHTML += `(${document.querySelectorAll(".oceania .country").length
    });`;
};

const closeFunc = (item, i2) => {
  // CLOSE AND CLEAR
  document.querySelectorAll(".x").forEach(element => {
    element.addEventListener("click", () => {
      item.classList.add("hidden");
      i2.innerHTML = " "
    });
  })
}