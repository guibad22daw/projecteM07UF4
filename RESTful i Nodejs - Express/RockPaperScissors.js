/**
 * Aplicació en ExpressJS que crea una API REST completa
 * @author sergi.grau@fje.edu
 * @version 2.0 10.10.21
 */

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // per analitzar les peticions HTTP que portin JSON al body

let llistaPartides = [
    { codi: 0, nom: 'PROVA', estatPartida: 'Acabada' }
];

let codis = [0];

app.get('/', (req, res) => res.send('hola'));

app.post('/api/iniciarJoc/:codiPartida', (req, res) => {
    let partida = [], codi = parseInt(req.params.codiPartida);
    partida.length = 0;
    
    if (codis.includes(codi)) res.send("Codi de partida ja existent.");
    else if (!req.body.nom) res.send("Si us plau introdueix un nom.");
    else if (!req.params.codiPartida || isNaN(codi)) res.send("Si us plau introdueix un codi vàlid.");
    else {
        partida = { codi: parseInt(req.params.codiPartida), nom: req.body.nom, estatPartida: 'A punt de començar.' };
        llistaPartides.push(partida);
        codis.push(codi);
        res.send(`Partida creada. Número de partida: ${req.params.codiPartida}`);
    }    
    console.log(llistaPartides);
    console.log(codis);

});

app.get('/api/consultarEstatPartida/codiPartida', (req, res) => {
    let partida = codis.find(a => a.codi === parseInt(req.body.codi));
    for (let i of codis) {
        if (i.codi == req.body.codi) {
            res.send(partida);
        } else if (!req.body.codi) res.send("Introdueix un codi.");
    }
    if (!partida) {
        res.send(`Introdueix un codi vàlid. Codis de partides disponibles: ${codis.toString()}.`);
    }
});

let jugador1 = 0, jugador2 = 0;

app.put('/api/moureJugador/codiPartida/jugador/tipusMoviment', (req, res) => { // /api/moureJugador/123/1/tisores
    let partidaActual = { "codi": req.body.codi, "jugador": req.body.jugador, "tipusMoviment": req.body.tipusMoviment };
    // ASSIGNACIONS
    let partida = codis.find(a => a.codi === parseInt(req.body.codi));
    for (let i of codis) {
        if (i.codi == req.body.codi) {
            if (req.body.jugador == 1 && req.body.tipusMoviment == "pedra") {
                jugador1 = "pedra";
                console.log("Pedra1.");
            } else if (req.body.jugador == 2 && req.body.tipusMoviment == "pedra") {
                jugador2 = "pedra"
                console.log("Pedra2.");
            } else if (req.body.jugador == 1 && req.body.tipusMoviment == "paper") {
                jugador1 = "paper";
                console.log("Paper1.");
            } else if (req.body.jugador == 2 && req.body.tipusMoviment == "paper") {
                jugador2 = "paper";
                console.log("Paper2.");
            } else if (req.body.jugador == 1 && req.body.tipusMoviment == "tisores") {
                jugador1 = "tisores";
                console.log("Tisores1.");
            } else if (req.body.jugador == 2 && req.body.tipusMoviment == "tisores") {
                jugador2 = "tisores";
                console.log("Tisores2.");
            }

            if (jugador1 === jugador2) {
                res.send("Empat.")
            } else {
                if (jugador1 == "pedra" && jugador2 == "paper") res.send("Guanya jugador 2.");
                else if (jugador1 == "pedra" && jugador2 == "tisores") res.send("Guanya jugador 1.");
                else if (jugador1 == "paper" && jugador2 == "pedra") res.send("Guanya jugador 1.");
                else if (jugador1 == "paper" && jugador2 == "tisores") res.send("Guanya jugador 2.");
                else if (jugador1 == "tisores" && jugador2 == "paper") res.send("Guanya jugador 1.");
                else if (jugador1 == "tisores" && jugador2 == "pedra") res.send("Guanya jugador 2.");
            }

            console.log(jugador1, jugador2);
        } else if (!req.body.codi) res.send("Introdueix un codi vàlid.");
    }
});

app.delete('/api/acabarJoc/codiPartida', (req, res) => {
    res.send(alumnes);
});

app.listen(3000, () => console.log('Servidor iniciat.'));