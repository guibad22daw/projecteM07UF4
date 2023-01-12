/**
 * Aplicació en ExpressJS que crea una API REST completa
 * @author sergi.grau@fje.edu
 * @version 2.0 10.10.21
 */

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // per analitzar les peticions HTTP que portin JSON al body

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
        partida = { codi: parseInt(req.params.codiPartida), nom: req.body.nom, estatPartida: 'A punt de començar.' };
        llistaPartides.push(partida);
        codis.push(codi);
        res.send(`Partida creada. Número de partida: ${req.params.codiPartida}`);
    }
    console.log(llistaPartides);
    console.log(codis);

});

app.get('/api/consultarEstatPartida/codiPartida', (req, res) => {
    let codi = parseInt(req.body.codiPartida);
    let partida = codis.find(a => a.codi === codi);

    if (codis.includes(codi)) res.send(partida);
    else if (!req.body.codi) res.send("Si us plau introdueix un codi.");
    else if (!req.body.codi || isNaN(codi)) res.send("Si us plau introdueix un codi vàlid.");
    else res.send(`Introdueix un codi vàlid. Codis de partides disponibles: ${codis.toString()}.`);
});

let compt = 1;
let compt2 = 1;
let partidaAcabada = 1;
let jugadesJugador1 = [];
let jugadesJugador2 = [];

app.put('/api/moureJugador/codiPartida/jugador/tipusMoviment', (req, res) => { // /api/moureJugador/123/1/tisores
    let jugadaActual;
    //let partidaActual = { "codi": req.body.codi, "jugador": req.body.jugador, "tipusMoviment": req.body.tipusMoviment };
    let codi = parseInt(req.body.codiPartida);
    let jugador = parseInt(req.body.jugador);
    let jugada = req.body.tipusMoviment;

    if (codis.includes(codi) && !(partidesAcabades.includes(codi))) {
        if (jugador == 1) {
            if (compt <= 3) {
                jugadaActual = { ["jugada" + compt]: jugada };
                jugadesJugador1.push(jugadaActual);
                res.send(`Jugada${compt} executada.`);
                compt++;
            } else {
                if (partidaAcabada == 3) {
                    partidesAcabades.push(codi);
                    res.send(`Partida finalitzada, acudeix a /consultarEstatPartida per esbrinar el guanyador. \n ${JSON.stringify(jugadesJugador1)}`);
                    partidaAcabada = 1;
                } else {
                    res.send(`Partida ${partidaAcabada} finalitzada.`);
                    partidaAcabada++;
                    compt = 1;
                }
            } 
        }

        if (jugador == 2) {
            if (compt2 <= 3) {
                jugadaActual = { ["jugada" + compt2]: jugada };
                jugadesJugador2.push(jugadaActual);
                res.send(`Jugada${compt2} executada.`);
                compt2++;
            } else {
                res.send(`Partida finalitzada, acudeix a /consultarEstatPartida per esbrinar el guanyador. \n ${JSON.stringify(jugadesJugador2)}`);
                compt2 = 1;
            }
        }
    }
    else if (!req.body.codiPartida || isNaN(codi)) res.send("Si us plau introdueix un codi vàlid.");
    else if (partidesAcabades.includes(codi)) res.send("Aquesta partida ja ha acabat.");
    else res.send("Introdueix un codi vàlid.");

});

app.delete('/api/acabarJoc/codiPartida', (req, res) => {
    partidesAcabades.push(parseInt(req.body.codiPartida));
    res.send(`Partida ${req.body.codiPartida} acabada.`);
    console.log(partidesAcabades);

});

app.listen(3001, () => console.log('Servidor iniciat.'));