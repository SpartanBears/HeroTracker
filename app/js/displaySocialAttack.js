$(document).ready(function(){

	initSAttackSelect();
});

//simula el consumo de un servicio para obtener un JSON que contiene las armas
function getSAttack(callback){

	//ajax success

	var serverResponse = [
		{name:"a1", statA:1, statB: 4},
		{name:"a2", statA:1, statB: 6, statC: 123},
		{name:"a3", statA:999, statB: 999, statC: 999, statD: "asdfg"},
	];

	callback(serverResponse);
}

//crea elementos DOM (option) para el select de las armas e inicializa el select
function populateSAttackSelect(sAttack){

	var saSelect = document.querySelector("#saSelect");

	for(var index = 0; index < sAttack.length; index++){

		var cSA = sAttack[index];

		var nOpt = document.createElement("option");

		nOpt.id = "sa_"+index;
		nOpt.innerHTML = cSA.name;
		nOpt.value = index;

		var cSAStats = Object.keys(cSA);

		for(var indexS = 0; indexS < cSAStats.length; indexS++){

			nOpt.dataset[cSAStats[indexS]] = cSA[cSAStats[indexS]];
		}

		saSelect.appendChild(nOpt);
	}

	$('#saSelect').material_select();
	$('#saSelect').on('change', socialAttackSelectEvt);
}

//inicializa el select de armas
function initSAttackSelect(){

	//pasamos metodo como callback
	getSAttack(populateSAttackSelect);
}

function socialAttackSelectEvt(e){

	var saDom = document.querySelector("#sa_"+this.value);

	refreshSADisplay(saDom);
}

//recibe un option del select
function refreshSADisplay(saDom){

	var saStats = Object.keys(saDom.dataset);
	var statContainer = document.querySelector("#saStatContainer");

	statContainer.innerHTML = "";

	for(var index = 0; index < saStats.length; index++){

		var col = document.createElement("div");
		col.className = "col s"+(Math.floor(12/saStats.length));

		var statName = document.createElement("h5");
		statName.innerHTML = saStats[index];

		var statValue = document.createElement("p");
		statValue.innerHTML = saDom.dataset[saStats[index]];

		col.appendChild(statName);
		col.appendChild(statValue);

		statContainer.appendChild(col);
	}

	var statContainerParent = statContainer.parentNode;

	statContainerParent.classList.remove("hidden");
}