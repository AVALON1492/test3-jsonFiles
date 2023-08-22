let objectGameName = {
    valueA: false,
    valueB: false,
    valueC: false
}

console.log(objectGameName);

objectGameName.valueC = true;

console.log(objectGameName);

if (typeof(Storage) !== "undefined") {
    if (localStorage["gameName"]) {
    } else {
        localStorage["gameName"] = JSON.stringify(objectGameName);
    }
}

localStorage["gameName"] = JSON.stringify(objectGameName);