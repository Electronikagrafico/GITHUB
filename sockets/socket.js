const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

  client.on('siguienteTicket', (data, callback) =>{

      let siguiente = ticketControl.next();
    console.log(siguiente);
    callback(siguiente);

  });

  client.emit('estadoActual',{

    actual:ticketControl.getUltimoTicket(),
    ultimosCuatro: ticketControl.getUltimosCuatro()

  });

  client.on('atenderTicket', (data, callback) => {


    if(!data.escritorio){
      return callback({
        err: true,
        mensaje: 'La ventanilla es necesaria3'
      });
    }


    let atenderTicket = ticketControl.atenderTicket(data.escritorio);
    callback(atenderTicket);
   
    client.broadcast.emit('ultimosCuatro', {
      ultimosCuatro: ticketControl.getUltimosCuatro()
    });

  });

  client.on('numerodeturno', (turno, callback)  => {

    let InicioAtencion = ticketControl.InicioAtención(turno);   
    
  });



});