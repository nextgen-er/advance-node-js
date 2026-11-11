import { Observables } from "../src/observable.mjs";

const user = new Observables({
    name: "Ankit",
    designation: "Software Developer"
})

console.log(user.get("designation"))

user.on('change', change => {
    console.log(`${change.key} changed from ${change.oldValue} to ${change.newValue}`)
})

user.set("designation", "Sr. Software Developer")

console.log(user.get("designation"))

user.set("name", "Dummy Name")
user.set("designation", "Sr. Fullstack Developer")
