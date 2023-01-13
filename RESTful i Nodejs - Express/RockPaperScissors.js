/**
 * Aplicació en ExpressJS que crea una API REST completa
 * @author sergi.grau@fje.edu
 * @version 2.0 10.10.21
 */

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // per analitzar les peticions HTTP que portin JSON al body

// const llistaPartides = [{
//     codi: 123,
//     nom: 'Carles',
//     jugadesJugador1: 'tisores tisores tisores ',
//     jugadesJugador2: 'pedra paper tisores ',
//     resultats: '',
//     guanyador: ''
// }];

const llistaPartides = [];

let codis = [];
let partidesAcabades = [];

app.get('/', (req, res) => res.send('hola'));

app.post('/api/iniciarJoc/:codiPartida', (req, res) => {
    let partida = [], codi = parseInt(req.params.codiPartida);
    partida.length = 0;

    if (codis.includes(codi)) res.send("Codi de partida ja existent.");
    else if (!req.body.nom) res.send("Si us plau introdueix un nom.");
    else if (!req.params.codiPartida || isNaN(codi)) res.send("Si us plau introdueix un codi vàlid.");
    else {
        partida = { codi: parseInt(req.params.codiPartida), nom: req.body.nom, estatPartida: 'A punt de començar.', jugadesJugador1: '', jugadesJugador2: '', resultats: '', guanyador: '' };
        llistaPartides.push(partida);
        codis.push(codi);
        res.send(`Partida creada. Número de partida: ${req.params.codiPartida}`);
    }
    console.log(llistaPartides);
    console.log(codis);

});

app.get('/api/consultarEstatPartida/codiPartida', (req, res) => {
    let codi = parseInt(req.body.codiPartida);
    let partida = llistaPartides.find(a => a.codi === codi);

    if (codis.includes(codi)) res.send(partida);
    else if (!req.body.codiPartida) res.send("Si us plau introdueix un codi.");
    else if (!req.body.codiPartida || isNaN(codi)) res.send("Si us plau introdueix un codi vàlid.");
    else res.send(`Introdueix un codi vàlid. Codis de partides disponibles: ${codis.toString()}.`);
});

let compt = 1;
let compt2 = 1;
let jugadesJugador1 = [];
let jugadesJugador2 = [];

app.put('/api/moureJugador/codiPartida/jugador/tipusMoviment', (req, res) => { // /api/moureJugador/123/1/tisores
    let jugadaActual;
    let codi = parseInt(req.body.codiPartida);
    let partidaActual = llistaPartides.find(a => a.codi === codi);
    let jugador = parseInt(req.body.jugador);
    let jugada = req.body.tipusMoviment;

    if (codis.includes(codi) && !(partidesAcabades.includes(codi))) {
        if (jugador == 1) {
            if (compt <= 5) {
                jugadaActual = { ["jugada" + compt]: jugada };
                partidaActual.jugadesJugador1 += `${jugada} `;
                console.log(llistaPartides);
                jugadesJugador1.push(jugadaActual);
                res.send(`Jugada${compt} executada. Comprova el guanyador a /api/acabarJoc/codiPartida`);
                compt++;
            } else {
                res.send(`Partida finalitzada, acudeix a /consultarEstatPartida per esbrinar el guanyador. \n ${JSON.stringify(partidaActual)}`);
            }
        }

        if (jugador == 2) {
            if (compt2 <= 5) {
                jugadaActual = { ["jugada" + compt2]: jugada };
                partidaActual.jugadesJugador2 += `${jugada} `;
                console.log(llistaPartides);
                jugadesJugador2.push(jugadaActual);
                res.send(`Jugada${compt2} executada.`);
                compt2++;
            } else {
                res.send(`Partida finalitzada, acudeix a /consultarEstatPartida per esbrinar el guanyador. \n ${JSON.stringify(partidaActual)}`);
            }
        }
    }
    else if (!req.body.codiPartida || isNaN(codi)) res.send("Si us plau introdueix un codi vàlid.");
    else if (partidesAcabades.includes(codi)) res.send("Aquesta partida ja ha acabat.");
    else res.send("Introdueix un codi vàlid.");

});

app.delete('/api/acabarJoc/codiPartida', (req, res) => {
    let codi = parseInt(req.body.codiPartida);
    let resultats = [], jugades = [];
    let wJug1 = 0, wJug2 = 0;
    let guanyador = '';
    let acabarPartida = llistaPartides.find(a => a.codi === codi);
    let jugadesJugador1 = acabarPartida.jugadesJugador1.split(" ");
    let jugadesJugador2 = acabarPartida.jugadesJugador2.split(" ");

    for (let i = 0; i < jugadesJugador1.length - 1; i++) {
        if (jugadesJugador1[i] == jugadesJugador2[i]) {
            jugades += 'Empat ';
            guanyador = 'Empat';

        } else if ((jugadesJugador1[i] === 'pedra' && jugadesJugador2[i] === 'tisores') ||
            (jugadesJugador1[i] === 'paper' && jugadesJugador2[i] === 'pedra') ||
            (jugadesJugador1[i] === 'tisores' && jugadesJugador2[i] === 'paper')) {
            jugades += 'Jugador1 ';
            guanyador = 'Jugador1';
            wJug1 += 1;
        } else {
            jugades += 'Jugador2 ';
            guanyador = 'Jugador2';
            wJug2 += 1;
        }

        resultats.push({
            JugadesJugador1: jugadesJugador1[i],
            JugadesJugador2: jugadesJugador2[i],
            Guanyador: guanyador
        });
    }
    acabarPartida.resultats = jugades;
    if (wJug1 > wJug2) {
        resultats.push({GuanyadorFinal: "Jugador1"});
        acabarPartida.guanyador = "Jugador 1";
    } else if (wJug1 < wJug2) {
        resultats.push({GuanyadorFinal: "Jugador2"}); 
        acabarPartida.guanyador = "Jugador 2";
    } else {
        resultats.push({GuanyadorFinal: "Empat"}); 
        acabarPartida.guanyador = "Empat";
    }
    acabarPartida.estatPartida = "Acabada.";
    console.log(llistaPartides);
    res.send(resultats);
    partidesAcabades.push(codi);
    compt = 1; compt2 = 1;
});

app.listen(3001, () => console.log('Servidor iniciat.'));