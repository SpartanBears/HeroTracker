$(document).ready(function(){

	initArmorSelect();
});

//simula el consumo de un servicio para obtener un JSON que contiene las armas
function getArmor(callback){

	//ajax success

	var serverResponse = [
		{Nombre:"a1", Velocidad:999, Acc: 999, Daño: 999, PDV: "la pinga es fuerte", Rate:999, Rango:999, Tag:"asdf", Notas:"adfd qwerty"},
		{Nombre:"a2", Velocidad:999, Acc: 999, Daño: 999, PDV: "la pinga es fuerte", Rate:999, Rango:999, Tag:"asdf", Notas:"adfd qwerty"},
		{Nombre:"a3", Velocidad:999, Acc: 999, Daño: 999, PDV: "la pinga es fuerte", Rate:999, Rango:999, Tag:"asdf", Notas:"adfd qwerty"},
	];

	callback(serverResponse);
}

//crea elementos DOM (option) para el select de las armas e inicializa el select
function populateArmorSelect(armor){

	var armorSelect = document.querySelector("#armorSelect");

	for(var index = 0; index < armor.length; index++){

		var cArmor = armor[index];

		var nOpt = document.createElement("option");

		nOpt.id = "armor_"+index;
		nOpt.innerHTML = cArmor.Nombre;
		nOpt.value = index;

		var cArmorStats = Object.keys(cArmor);

		for(var indexS = 0; indexS < cArmorStats.length; indexS++){

			nOpt.dataset[cArmorStats[indexS]] = cArmor[cArmorStats[indexS]];
		}

		armorSelect.appendChild(nOpt);
	}

	$('#armorSelect').material_select();
	$('#armorSelect').on('change', armorSelectEvt);
}

//inicializa el select de armas
function initArmorSelect(){

	//pasamos metodo como callback
	getArmor(populateArmorSelect);
}

function armorSelectEvt(e){

	var armorDom = document.querySelector("#armor_"+this.value);

	refreshArmorDisplay(armorDom);
}

//recibe un option del select
function refreshArmorDisplay(armorDom){

	var armorStats = Object.keys(armorDom.dataset);
	var statContainer = document.querySelector("#armorStatContainer");

	statContainer.innerHTML = "";

	for(var index = 0; index < armorStats.length; index++){

		var col = document.createElement("div");
		col.className = "col s"+(Math.floor(12/armorStats.length));

		var statName = document.createElement("h5");
		statName.innerHTML = armorStats[index];

		var statValue = document.createElement("p");
		statValue.innerHTML = armorDom.dataset[armorStats[index]];

		col.appendChild(statName);
		col.appendChild(statValue);

		statContainer.appendChild(col);
	}

	var statContainerParent = statContainer.parentNode;

	statContainerParent.classList.remove("hidden");
}