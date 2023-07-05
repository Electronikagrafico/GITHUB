const $btnSimple = document.querySelector("#btnSimple"),
    $btnBotonPersonalizado = document.querySelector("#btnBotonPersonalizado"),
    $btnTituloYTexto = document.querySelector("#btnTituloYTexto"),
    $btnHtmlPersonalizado = document.querySelector("#btnHtmlPersonalizado"),
    $btnConfirm = document.querySelector("#btnConfirm"),
    $btnInput = document.querySelector("#btnInput");

$btnSimple.addEventListener("click", () => {
    Swal.fire("Esta es una alerta")
        .then(() => {
            // Aquí la alerta se ha cerrado
            console.log("Alerta cerrada");
        });
});

$btnBotonPersonalizado.addEventListener("click", () => {
    Swal.fire({
        title: "Venta realizada",
        confirmButtonText: "Aceptar",
    });
});


$btnTituloYTexto.addEventListener("click", () => {
    Swal.fire({
        title: "Venta realizada",
        text: "La venta fue guardada con el id 123456",
        confirmButtonText: "Aceptar",
    });
});


$btnHtmlPersonalizado.addEventListener("click", () => {
    Swal.fire({
        html: `<h1>Venta realizada</h1>
    <p>Venta guardada con el id <strong>12321312</strong></p>
    <br>
    <a href="#">Imprimir ticket</a>
    `,
    });
});

$btnConfirm.addEventListener("click", () => {

    Swal
        .fire({
            title: "Venta #123465",
            text: "¿Eliminar?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        })
        .then(resultado => {
            if (resultado.value) {
                // Hicieron click en "Sí"
                console.log("*se elimina la venta*");
            } else {
                // Dijeron que no
                console.log("*NO se elimina la venta*");
            }
        });
});


$btnInput.addEventListener("click", () => {
    const { value: fruit } = 
    Swal
        .fire({
            title: 'Select field validation',
            input: 'select',
            inputOptions: {
              'Fruits': {
                apples: 'Apples',
                bananas: 'Bananas',
                grapes: 'Grapes',
                oranges: 'Oranges'
              },
              'Vegetables': {
                potato: 'Potato',
                broccoli: 'Broccoli',
                carrot: 'Carrot'
              },
              'icecream': 'Ice cream'
            },
            inputPlaceholder: 'Select a fruit',
            showCancelButton: true,
            inputValidator: (value) => {
              return new Promise((resolve) => {
                if (value === 'oranges') {
                  resolve()
                } else {
                  resolve('You need to select oranges :)')
                }
              })
            }
          })
          
          if (fruit) {
            Swal.fire(`You selected: ${fruit}`)
          }})



