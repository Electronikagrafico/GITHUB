let marcas = [], idInterval,tiempoInicio = null;


		$btnIniciar = document.querySelector("#llamar_btn");
		//const $tiempoTranscurrido = document.querySelector("#tiempoTranscurrido");

		function detener(){
			
			$btnIniciar.disabled = false;
			clearInterval(idInterval);
			init();
			marcas = [];
			//dibujarMarcas();
			diferenciaTemporal = 0;
		
		}

		
		function detener_en_atencion(){
			
			$btnIniciar.disabled = false;
			clearInterval(idInterval);
			init_2();
			marcas = [];
			//dibujarMarcas();
			diferenciaTemporal = 0;
		
		}

		const init = () => {
			const $tiempoTranscurrido = document.querySelector("#tiempoTranscurrido");
			$tiempoTranscurrido.textContent = "00:00.00";
			//ocultarElemento($btnPausar);
			//ocultarElemento($btnMarca);
			//ocultarElemento($btnDetener);
		};
		const init_2 = () => {
			//$tiempoTranscurrido_2.textContent = "00:00.00";
			//ocultarElemento($btnPausar);
			//ocultarElemento($btnMarca);
			//ocultarElemento($btnDetener);
		};
		const pausar = () => {
			diferenciaTemporal = new Date() - tiempoInicio.getTime();
			clearInterval(idInterval);

		};

		const restablercer_tiempo = ()=>{

			console.log(tiempoInicio +  idInterval);

			const $tiempoTranscurrido = document.querySelector("#tiempoTranscurrido");
			const $tiempoTranscurrido_2 = document.querySelector("#tiempoTranscurrido_2");
			$tiempoTranscurrido.textContent = "00:00.00";
			$tiempoTranscurrido_2.textContent = "00:00.00";
			clearInterval(idInterval);
			diferenciaTemporal = 0;
		}






document.addEventListener("DOMContentLoaded", () => {
	const $tiempoTranscurrido = document.querySelector("#tiempoTranscurrido"),
		$btnIniciar = document.querySelector("#llamar_btn"),
		$btnIniciarTurno = document.querySelector("#iniciarTurno_btn"),
		$btnPausar = document.querySelector("#btnPausar"),
		$btnMarca = document.querySelector("#btnMarca"),
		$btnDetener = document.querySelector("#btnDetener"),
		$contenedorMarcas = document.querySelector("#contenedorMarcas");
	
	let diferenciaTemporal = 0;

	const ocultarElemento = elemento => {
		//elemento.style.display = "none";
	}

	const mostrarElemento = elemento => {
		//elemento.style.display = "";
	}

	const agregarCeroSiEsNecesario = valor => {
		if (valor < 10) {
			return "0" + valor;
		} else {
			return "" + valor;
		}
	}

	const milisegundosAMinutosYSegundos = (milisegundos) => {
		const minutos = parseInt(milisegundos / 1000 / 60);
		milisegundos -= minutos * 60 * 1000;
		segundos = (milisegundos / 1000);
		return `${agregarCeroSiEsNecesario(minutos)}:${agregarCeroSiEsNecesario(segundos.toFixed(1))}`;
	};


	const iniciar = () => {
        llamar();
        $btnIniciar.disabled = true;
        $btnIniciar.style.opacity = 1;
		const ahora = new Date();
		tiempoInicio = new Date(ahora.getTime() - diferenciaTemporal);
		console.log(tiempoInicio);
		clearInterval(idInterval);
		idInterval = setInterval(refrescarTiempo, 100);
	};

	const iniciarAtencion = () => {
        $btnIniciar.disabled = true;
        $btnIniciar.style.opacity = 1;
		const ahora = new Date();
		tiempoInicio = new Date(ahora.getTime() - diferenciaTemporal);
		clearInterval(idInterval);
		idInterval = setInterval(refrescarTiempo, 100);
	};

	const iniciar_turno = () => {
        Iniciar();
		iniciarAtencion();
		detener_en_atencion();
        $btnIniciar.disabled = true;
        $btnIniciar.style.opacity = 1;
		const ahora = new Date();
		tiempoInicio = new Date(ahora.getTime() - diferenciaTemporal);
		clearInterval(idInterval);
		idInterval = setInterval(refrescarTiempoAtencion, 100);


	};

	const pausar = () => {
		diferenciaTemporal = new Date() - tiempoInicio.getTime();
		clearInterval(idInterval);
		mostrarElemento($btnIniciar);
		ocultarElemento($btnMarca);
		ocultarElemento($btnPausar);
		mostrarElemento($btnDetener);
	};
	const refrescarTiempo = () => {
		const ahora = new Date();
		const diferencia = ahora.getTime() - tiempoInicio.getTime();
		$tiempoTranscurrido.textContent = milisegundosAMinutosYSegundos(diferencia);
		
	};
	const refrescarTiempoAtencion = () => {
		const ahora = new Date();
		const diferencia = ahora.getTime() - tiempoInicio.getTime();
		$tiempoTranscurrido_2.textContent = milisegundosAMinutosYSegundos(diferencia);
		
	};

	const ponerMarca = () => {
		marcas.unshift(new Date() - tiempoInicio.getTime());
		dibujarMarcas();
	};
	const dibujarMarcas = () => {
		$contenedorMarcas.innerHTML = "";
		for (const [indice, marca] of marcas.entries()) {
			const $p = document.createElement("p");
			$p.innerHTML = `<strong class="is-size-4">${marcas.length - indice}.</strong> ${milisegundosAMinutosYSegundos(marca)}`;
			$p.classList.add("is-size-3");
			$contenedorMarcas.append($p);
		}
	};

	const Atencion = () =>{
	
		var Texto_btnIni = this.document.getElementById("EnAtencion_txt").innerHTML;
			switch (Texto_btnIni) {
	
				case "Iniciar Turno":
						iniciar_turno();	
					break;
	
				case "Finalizar turno":
					pausar();
					Esconder();
					detener();
					init();
					init_2();
					$btnIniciar.disabled = false;
					break;
	
		}
	
	}

const $tiempoTranscurrido_2 = document.querySelector("#tiempoTranscurrido_2");

	const init = () => {
		$tiempoTranscurrido.textContent = "00:00.00";
		$tiempoTranscurrido_2.textContent = "00:00.00";
		ocultarElemento($btnPausar);
		ocultarElemento($btnMarca);
		ocultarElemento($btnDetener);
	};
	init();

	$btnIniciar.onclick = iniciar;
	$btnIniciarTurno.onclick = Atencion;


	const detener = () => {

		clearInterval(idInterval);
		init();

		diferenciaTemporal = 0;
	}


	
});


