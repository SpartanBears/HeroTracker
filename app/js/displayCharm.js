$(document).ready(function(){

	initCharmSelect();
});

//simula el consumo de un servicio para obtener un JSON que contiene las armas
function getCharm(callback){

	//ajax success

	var serverResponse = [
		{Nombre:"Agarre", Velocidad:999, Acc: 999, Daño: 999, PDV: "la pinga es fuerte", Rate:999, Rango:999, Tag:"asdf", Notas:"adfd qwerty"},
		
	];

	callback(serverResponse);
}

//crea elementos DOM (option) para el select de las armas e inicializa el select
function populateCharmSelect(charms){

	var charmSelect = document.querySelector("#charmSelect");

	for(var index = 0; index < charms.length; index++){

		var cCharm = charms[index];

		var nOpt = document.createElement("option");

		nOpt.id = "charm_"+index;
		nOpt.innerHTML = cCharm.Nombre;
		nOpt.value = index;

		var cCharmStats = Object.keys(cCharm);

		for(var indexS = 0; indexS < cCharmStats.length; indexS++){

			nOpt.dataset[cCharmStats[indexS]] = cCharm[cCharmStats[indexS]];
		}

		wpnSelect.appendChild(nOpt);
	}

	$('#wpnSelect').material_select();
	$('#wpnSelect').on('change', weaponSelectEvt);
}

//inicializa el select de armas
function initWeaponSelect(){

	//pasamos metodo como callback
	getWeapons(populateWeaponSelect);
}

function weaponSelectEvt(e){

	var weaponDom = document.querySelector("#wpn_"+this.value);

	refreshWeaponDisplay(weaponDom);
}

//recibe un option del select
function refreshWeaponDisplay(weaponDom){

	var wpnStats = Object.keys(weaponDom.dataset);
	var statContainer = document.querySelector("#wpnStatContainer");

	statContainer.innerHTML = "";

	for(var index = 0; index < wpnStats.length; index++){

		var col = document.createElement("div");
		col.className = "col s"+(Math.floor(12/wpnStats.length));

		var statName = document.createElement("h5");
		statName.innerHTML = wpnStats[index];

		var statValue = document.createElement("p");
		statValue.innerHTML = weaponDom.dataset[wpnStats[index]];

		col.appendChild(statName);
		col.appendChild(statValue);

		statContainer.appendChild(col);
	}

	var statContainerParent = statContainer.parentNode;

	statContainerParent.classList.remove("hidden");
}