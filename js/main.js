//TODO SETTINGS
let objectGameName;
objectGameName = {
	codeGame: "Soul Breaker",
	settings: {}
}

class SETTINGS {
	constructor(valueObject, setDefault) {
		objectGameName.settings[valueObject] = setDefault;
		this.valueObject = valueObject;
		this.setDefault = setDefault;
	}

	isNewDefault = () => {
		if (objectGameName.settings[this.valueObject] == undefined) {
			objectGameName.settings[this.valueObject] = this.setDefault;
		}
	}
}

class SETTINGSTOOGLE extends SETTINGS {
	constructor(button, valueStorage, setDefault, setFunctionOn, setFunctionOff) {
		super(valueStorage, setDefault);
		this.button = button;
		this.setFunctionOn = setFunctionOn;
		this.setFunctionOff = setFunctionOff;
	}

	setToogle = () => {
		if (objectGameName.settings[this.valueObject]) {
			this.setFunctionOn();
		} else {
			this.setFunctionOff();
		}
	}

	setChange = () => {
		this.button.addEventListener("click", () => {
			if (objectGameName.settings[this.valueObject]) {
				objectGameName.settings[this.valueObject] = false;
			} else {
				objectGameName.settings[this.valueObject] = true;
			}

			this.setToogle();
		})
	}
}

const themeSetting = new SETTINGSTOOGLE(buttonTheme, "theme", true,
	() => {
		myBody.style.backgroundColor = "white";
	},
	() => {
		myBody.style.backgroundColor = "gray";
	}
);

themeSetting.setChange();

//

let fileHandle = null;

const quitWelcome = () => {
    idWelcome.style.display = "none";
}

const onBeforeUnload = () => {
	window.onbeforeunload = (event) => {
		event.returnValue = ""
	}
}

const setNewDefault = () => {
	themeSetting.isNewDefault();
	themeSetting.setToogle();
}

buttonNewGame.addEventListener("click", () => {
    quitWelcome();
	buttonSave.style.opacity = 0.5;
	buttonSave.style.pointerEvents = "none";

	objectGameName = {
		codeGame: "Soul Breaker",
		settings: {}
	}

	setNewDefault();

    console.log(JSON.stringify(objectGameName));
	onBeforeUnload();
})

buttonLoadGame.addEventListener("click", async () => {
	try {
		[fileHandle] = await window.showOpenFilePicker({
			types: [
				{
					description: 'txt',
					accept: {
						'text/*': ['.txt']
					}
				},
			],
			excludeAcceptAllOption: true,
			multiple: false
		});
		let fileData = await fileHandle.getFile();
		let text = await fileData.text();
		objectGameName = JSON.parse(text);
		
		if (objectGameName.codeGame == "Soul Breaker") {
			console.log("Has entrado, ¡viva!");
			quitWelcome();
			buttonSave.style.opacity = 1;
			buttonSave.style.pointerEvents = "inherit";
			buttonSave.innerText = "Guardar " + fileHandle.name;

			setNewDefault();

			console.log(objectGameName);
			onBeforeUnload();
		} else {
			console.error("El archivo es inválido");
		}
	} catch {
		console.error("Se ha cancelado la solicitud");
	}
})

console.log(JSON.stringify(objectGameName));

const save = async () => {
	try {
	let stream = await fileHandle.createWritable();
	await stream.write(JSON.stringify(objectGameName));
	await stream.close();
	} catch {}
}

buttonSave.addEventListener("click", save);

buttonSaveAs.addEventListener("click", async () => {
	try {
		fileHandle = await window.showSaveFilePicker({
			types: [
				{
					description: 'txt',
					accept: {
						'text/*': ['.txt']
					}
				},
			],
			excludeAcceptAllOption: true
		});
		save();
		buttonSave.innerText = "Guardar " + fileHandle.name;
	} catch {}
})

buttonExitGame.addEventListener("click", () => {
	fileHandle = null;
	objectGameName = null;
	idWelcome.style.display = "flex";
})