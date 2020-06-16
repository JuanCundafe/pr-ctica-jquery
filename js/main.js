/* Objeto que guarda los datos de los koders del DOM */
var koders = [];
var count = 0;
/* Obteniendo los datos del DOM y guardandolos */
const getDataForm = (event) => {
  event.preventDefault();
  let koderObject = {};
  let data = $("#form-koder");
  let dataArr = data.serializeArray().forEach((koder) => {
    koderObject[koder.name] = koder.value;
    koderObject["index"] = count;
  });
  console.log(koderObject);
  saveAll(koderObject);
  printData(koderObject);
};
/* Imprimiendo los datos obtenidos en la tabla en el DOM */
const printData = (koderObject) => {
  const { name, mail, phone, index, koderKey } = koderObject;
  $("#table-container").append(`
      <tr class="koder">
        <th>${index}</th>
        <th>${name}</th>
        <th>${mail}</th>
        <th>${phone}</th>
        <td>
          <button type="submit" class="btn btn-danger delete-btn" data-koder-key=${koderKey}>Delete</button>
        </td>
      </tr>`);
  count++;
};
/* Guardando todos los koders creados */
const saveAll = (koderObject) => {
  koders.push(koderObject);
};
/* Haciendo la peticion de enviar */
const sendAll = (data) => {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      getKoders();
    }
  };
  xhttp.open(
    "POST",
    "https://ajaxclass-1ca34.firebaseio.com/Equipo1/koders/.json",
    true
  );
  xhttp.send(JSON.stringify(data));
};

const sendDataBtn = () => {
  event.preventDefault();
  console.log(koders);
  koders.forEach((koder) => {
    sendAll(koder);
  });
};

/* Bajando database de los koders */

const getKoders = () => {
  let kodersWrapper = document.getElementById("table-container");
  kodersWrapper.innerHTML = "";
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      for (let koder in response) {
        printData({ ...response[koder], koderKey: koder });
        addDeleteListeners();
      }
    }
  };
  xhttp.open(
    "GET",
    "https://ajaxclass-1ca34.firebaseio.com/Equipo1/koders/.json",
    true
  );
  xhttp.send();
};

/* Eliminando un elemento */
const deleteKoder = (event) => {
  let postWrapper = $("#table-container");
  postWrapper.innerHTML = "";
  let selectedKoder = event.target;
  let koderKey = selectedKoder.dataset.koderKey;
  console.log(koderKey);
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      count--;
      getKoders();
    }
  };
  xhttp.open(
    "DELETE",
    `https://ajaxclass-1ca34.firebaseio.com/Equipo1/koders/${koderKey}/.json`,
    true
  );
  xhttp.send();
};

/*Agregando eventos */
$("#add-btn").click(getDataForm);
$("#save-btn").click(sendDataBtn);

/* Agregando Evento para cada boton creado */
const addDeleteListeners = () => {
  let btnList = document.querySelectorAll(".delete-btn");
  btnList.forEach((button) => {
    button.addEventListener("click", deleteKoder);
  });
};

/*const addDeleteListeners = () => {
  $(".delete-btn").each(function () {
    console.log(this);
    this.click(deleteKoder);
  });
};
*/
getKoders();
