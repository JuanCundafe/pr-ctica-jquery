
var koderObject = {}


const getDataForm = () => {
    event.preventDefault()
    $('input').each(function(){
    let key = $(this).attr("id")
    let value = $(this).val()
    koderObject[key] = value
    })
    printData(koderObject)
}

const printData = (koderObject) => {
    const {name, mail, phone} = koderObject
    $("#table-container").append(`<tr>
        <th>${name}</th>
        <th>${mail}</th>
        <th>${phone}</th>
        <td>
          <button id="delete-btn" type="submit" class="btn btn-danger" data-point-to= "" >Delete</button>
        </td>
      </tr>`)
      converToArray(koderObject)
}

var array = [] 
const converToArray = (koderObject) => {
   array.push(koderObject)
   console.log(array)
}

$("#add-btn").click(getDataForm)






