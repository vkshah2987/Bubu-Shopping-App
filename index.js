import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting = {
    databaseURL: "https://vks-scrimbaplayground-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSetting)
const database = getDatabase(app)
const ItemValueinDb = ref(database, "ShoppingCart")


let Add2Cart = document.getElementById("add2cart")
let InputValue = document.getElementById("inputvalue")
let UlEl = document.getElementById("ulel")

let StoringValue
let CheckValue

onValue(ItemValueinDb, function (snapshot) {

    if (snapshot.exists()) {
        CheckValue = Object.values(snapshot.val())
        StoringValue = Object.entries(snapshot.val())
        UlEl.innerHTML = ""
        for (let i = 0; i < StoringValue.length; i++) {
            // UlEl.innerHTML += `<li>${StoringValue[i]}</li>`
            UpdateHTMLList(StoringValue[i])
        }
    }
    else {
        UlEl.innerHTML = "No Item To Display"
    }
})


Add2Cart.addEventListener("click", function () {
    let StoringValueEl = InputValue.value
    if (!(StoringValue === undefined)) {
        if (!(CheckValue.includes(StoringValueEl))) {
            push(ItemValueinDb, StoringValueEl)
        }
    }
    else if(StoringValue === undefined){
        console.log("Has to create db")
        push(ItemValueinDb, StoringValueEl)
    }
    InputValue.value = ""
})


function UpdateHTMLList(Data) {
    // UlEl.innerHTML += `<li>${Data}</li>`
    let NewEl = document.createElement("li")
    NewEl.textContent = Data[1]
    UlEl.append(NewEl)

    NewEl.addEventListener("dblclick", function () {
        let delItem = ref(database, `ShoppingCart/${Data[0]}`)
        remove(delItem)
    })
}