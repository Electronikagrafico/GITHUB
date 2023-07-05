
//--------------------------------SweetAlert1--------------------------------//
$(function () {
    $('.js-sweetalert').on('click', function () {
        var type = $(this).data('type');
        if (type === 'basic') {
            showBasicMessage();
        }
        else if (type === 'with-title') {
            showWithTitleMessage();
        }
        else if (type === 'success') {
            showSuccessMessage();
        }
        else if (type === 'confirm') {
            showConfirmMessage();
        }
        else if (type === 'cancel') {
            showCancelMessage();
        }
        else if (type === 'eliminar_Dispositivo') {
            eliminarDispositivo();
        }
        else if (type === 'with-custom-icon') {
            showWithCustomIconMessage();
        }
        else if (type === 'Kiosco_creado') {
            showWithCustomIconMessageKioscoCreado();
        }
        else if (type === 'html-message') {
            showHtmlMessage();
        }
        else if (type === 'autoclose-timer') {
            showAutoCloseTimerMessage();
        }
        else if (type === 'prompt') {
            showPromptMessage();
        }
        else if (type === 'redirigir') {
            showPromptMessage_redirigir();
        }
        else if (type === 'posponer') {
            showPromptMessage_posponer();
        }
        else if (type === 'ajax-loader') {
            showAjaxLoaderMessage();
        }
    });
});

//These codes takes from http://t4t5.github.io/sweetalert/
function showBasicMessage() {
    swal("Here's a message!");
}

function showWithTitleMessage() {
    swal("Here's a message!", "It's pretty, isn't it?");
}

function showSuccessMessage() {
    swal("Good job!", "You clicked the button!", "success");
}

function showConfirmMessage() {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        swal("Deleted!", "Your imaginary file has been deleted.", "success");
    });
}

function showConfirmMessage() {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        swal("Deleted!", "Your imaginary file has been deleted.", "success");
    });
}

function showPromptMessage_posponer() {
    swal({
        title: "¿Posponer servicio?",
        text: "Envía turno a la fila , para ser llamado mas adelante.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Si, posponer",
        closeOnConfirm: false
    }, function () {
        swal("Turno postergado", "El turno sera llamado mas adelante.", "success");
        Esconder();
        detener();
    });
}


function showCancelMessage() {
    swal({
    
        title: "¿Marcar turno"+ "   " + "\ncomo Ausente?",
        text: "Se cerrara el turno y se continuara con la fila",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Si",    
        cancelButtonText: "No",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            swal("Ausente!", "Turno finalizado.", "success");
            Esconder();
            detener();
        } else {
            swal("Cancelled", "Your imaginary file is safe :)", "error");
        }
    });
}

function eliminarDispositivo() {
    swal({
    
        title: "Borrar dispositivo "+ "   " + "\n",
        text: "¿Seguro que desea borrar los dispositivos seleccionados?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Si",    
        cancelButtonText: "No",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            swal("Dispositivos eliminados", "", "success");
            eliminar();
            setTimeout(function () {
                location.reload();
            }, 2000);
            
            } else {
            swal("Cancelado", " ", "error");
        }
    });
}



function showWithCustomIconMessage() {
    swal({
        title: "Sweet!",
        text: "Here's a custom image.",
        imageUrl: "../assets/images/sm/avatar2.jpg"
    });
}


function showHtmlMessage() {
    swal({
        title: "HTML <small>Title</small>!",
        text: "A custom <span style=\"color: #CC0000\">html<span> message.",
        html: true
    });
}

function showAutoCloseTimerMessage() {
    swal({
        title: "Auto close alert!",
        text: "I will close in 2 seconds.",
        timer: 2000,
        showConfirmButton: false
    });
}

function showPromptMessage() {
    swal({
        title: "An input!",
        text: "Write something interesting:",
        type: "input",
        
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Write something"
    }, function (inputValue) {
        if (inputValue === false) return false;
        if (inputValue === "") {
            swal.showInputError("You need to write something!"); return false
        }
        swal("Nice!", "You wrote: " + inputValue, "success");
    });
    
}

function showPromptMessage_redirigir() {
    swal({
        title: "An input!",
        text: "Write something interesting:",
        type: "input",
        
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Write something"
    }, function (inputValue) {
        if (inputValue === false) return false;
        if (inputValue === "") {
            swal.showInputError("You need to write something!"); return false
        }
        swal("Nice!", "You wrote: " + inputValue, "success");
    });
    
}


function showAjaxLoaderMessage() {
    swal({
        title: "Ajax request example",
        text: "Submit to run ajax request",
        type: "info",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
    }, function () {
        setTimeout(function () {
            swal("Ajax request finished!");
        }, 2000);
    });
}


//--------------------------------SweetAlert2--------------------------------//
function Crear_grupo() {
    Swal.fire({
        title: 'Ingresa el nombre del nuevo grupo',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Crear',
        showLoaderOnConfirm: true,
        preConfirm: (groupName) => {
            // Envía el nombre del grupo al servidor para crear un nuevo grupo
            return fetch('/content/create-group', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ groupName: groupName })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                location.reload();
            })
            .catch(error => {
                Swal.showValidationMessage(
                    `La solicitud falló: ${error}`
                )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
    });
}

function eliminarContenido() {
    // Muestra un mensaje de confirmación
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, bórralo!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        // Si el usuario confirmó, elimina los elementos
        if (result.value) {  // Aquí se cambió result.isConfirmed por result.value
            const selectedIds = $('.checkbox-tick:checked').map(function () {
                return $(this).val(); // Asegúrate de que cada checkbox tiene el ID del contenido como su valor
            }).get();

            console.log(selectedIds);  // Imprimir los IDs seleccionados para depurar

            $.ajax({
                url: '/content/delete-multiple',
                type: 'POST',
                data: JSON.stringify(selectedIds),
                contentType: 'application/json',
                success: function () {
                    console.log('Eliminación exitosa');  // Log para confirmar la ejecución exitosa del AJAX
                    setTimeout(() => {
                        location.reload();
                    }
                        , 3000);
                 
                },
                error: function(jqXHR, textStatus, errorThrown) {  // Log de error en caso de fallar la petición AJAX
                    console.log(textStatus, errorThrown);
                }
            });

            Swal.fire(
                '¡Eliminado!',
                'Tu contenido ha sido eliminado.',
                'success'
            )
        }
    });
};


$('.delete-button').on('click', function () {


});

function eliminarContenidoUnico(id) {
    // Muestra un mensaje de confirmación
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, bórralo!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        // Si el usuario confirmó, elimina los elementos
        if (result.value) { 

            $.ajax({
                url: '/content/delete/' + id,
                type: 'DELETE',
                success: function (result) {
                    // Haz algo con el resultado
                    console.log("LLEGO ACA");
                    setTimeout(() => {
                        location.reload();
                    }
                        , 2000);
                }
            });

            Swal.fire(
                '¡Eliminado!',
                'Tu contenido ha sido eliminado.',
                'success'

            )
        }
    });
};

function redirigir(){         

    const { value: fruit } =  Swal.fire({
        title: 'Selecciona un servicio para redirigir',
        input: 'select',
        inputOptions: {
          'Rayosx': 'Rayosx',
          'Facturación': 'Facturación',
          'Ingreso': 'Ingreso'
          
        },
        inputPlaceholder: 'Selecciona un servicio',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value === 'Rayosx') {
              resolve()
              Esconder();
              detener();
            } else {
              resolve(' :)')
            }
          })
        }
      })
      
      if (fruit) {
         Swal.fire(`You selected: ${fruit}`)
      }
    } 
      

    function kioscoCreado(){        

        const A =   Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
        } 
      