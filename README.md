# PROJECTE M07UF4

Una empresa vol implementar el joc de Pedra, paper, tisora de manera virtual mitjançant Web Services.
Ha triat aquesta opció perquè els clients del joc poden ser molt diversos, com ara un front end de
navegador, una app mòbil, una aplicació d'escriptori o un TV intel·ligent. A més, es vol desenvolupar
una API per a que qualsevol desenvolupador pugui implantar el joc en una solució o plataforma.
Podeu trobar el funcionament del joc descrit <a href="https://ca.wikipedia.org/wiki/Pedra,_paper,_tisora.">aquí</a>.

</br><b>PART BACK-END amb Serveis Web SOAP en llenguatge JAVA</b></br>

Funcionalitats a implementar:

• Cal utilitzar l'API de programació JAX-WS (Java) per a desenvolupar el productor SOAP.

• La pràctica consisteix en implementar el back end del joc amb tota la lògica del joc, incloent una estructura de dades que l'estat de la partida, una partida consisteix en guanyar 3 cops.

• El client SOAP serà un programa en Java.

Característiques del disseny:

• Cal utilitzar el paradigma de POO.

• Operacions RPC a implementar poden ser aquestes.

• iniciarJoc(codiPartida:enter):booleà

• moureJugador(tipus:enter), on enter representa pedra, paper o tisora

• consultarEstatPartida(codiPartida:enter):enter, on enter representa el jugador que va guanyant

• acabarJoc(codiPartida:enter):booleà

</br><b>PART BACK-END amb Serveis Web RESTful i JAX-RS, en llenguatge Java.</b></br>

Funcionalitats a implementar:

• Cal utilitzar l'API de programació JAX-RS (Java) amb la implementació de Jersey per adesenvolupar el productor REST.

• La pràctica consisteix en implementar el back end del joc amb tota la lògica del joc, incloent una estructura de dades que l'estat de la partida, una partida consisteix en guanyar 3 cops.

• Cal desenvolupar un consumidor de Servei Web en JS, funcionant en un navegador
Característiques del disseny.

• Cal utilitzar el paradigma de POO.

• Les URIs a implementar poden ser aquestes.

• POST /iniciarJoc/codiPartida.

• GET /consultarEstatPartida/codiPartida : JSON.

• PUT /moureJugador/codiPartida/jugador/tipusMoviment.

• DELETE /acabarJoc/codiPartida.

• El disseny d’interfície web és lliure.


</br><b>PART BACK-END amb Serveis Web RESTful i Node.js / Express</b></br>

Funcionalitats a implementar:

• Cal utilitzar desenvolupar una aplicació de back end per a RESTFUL amb Node.js i Express.

• La pràctica consisteix en implementar el back end del joc amb tota la lògica del joc, incloent una estructura de dades que l'estat de la partida, una partida consisteix en guanyar 3 cops.

• Cal desenvolupar un consumidor de Servei Web en format Web en JS.

Característiques del disseny:

• Cal utilitzar el paradigma de POO.

• Les URIs a implementar poden ser aquestes.

• POST /iniciarJoc/codiPartida

• GET /consultarEstatPartida/codiPartida : JSON

• PUT /moureJugador/codiPartida/jugador/tipusMoviment

• DELETE /acabarJoc/codiPartida

• El disseny d’interfície web és lliure.
