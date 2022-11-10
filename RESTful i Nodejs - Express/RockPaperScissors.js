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
    let codi = parseInt(req.body.codi);
    let partida = llistaPartides.find(a => a.codi === codi);
    // const partida = codis.find(({ codi }) => codi === codi);

    if (codis.includes(codi)) res.send(partida);
    else if (!req.body.codi) res.send("Si us plau introdueix un codi.");
    else if (!req.body.codi || isNaN(codi)) res.send("Si us plau introdueix un codi vàlid.");
    else res.send(`Introdueix un codi vàlid. Codis de partides disponibles: ${codis.toString()}.`);
});

let jugador1 = 0, jugador2 = 0, wJug1 = 0,wJug2 = 0;

app.put('/api/moureJugador/codiPartida/jugador/tipusMoviment', (req, res) => { // /api/moureJugador/123/1/tisores
    let partidaActual = { "codi": req.body.codi, "jugador": req.body.jugador, "tipusMoviment": req.body.tipusMoviment };
    let codi = parseInt(req.body.codiPartida);
    let jugador = req.body.jugador;
    let jugada = req.body.tipusMoviment;
    if (codis.includes(codi)){
        if (jugador == 1 && jugada == "pedra") jugador1 = "pedra";
        else if (jugador == 2 && jugada == "pedra") jugador2 = "pedra";
        else if (jugador == 1 && jugada == "paper") jugador1 = "paper";
        else if (jugador == 2 && jugada == "paper") jugador2 = "paper";
        else if (jugador == 1 && jugada == "tisores") jugador1 = "tisores";
        else if (jugador == 2 && jugada == "tisores") jugador2 = "tisores";
        if (jugador1 === jugador2) res.send("Empat.");
        else {
            if (jugador1 == "pedra" && jugador2 == "paper"){
                wJug2 += 1;
                if(wJug2 == 3){
                    wJug1 = 0;wJug2 = 0;
                    res.send("Guanya jugador 2. Partida acabada.");
                }else{
                    res.send("Guanya jugador 2.");
                }
            }
            else if (jugador1 == "pedra" && jugador2 == "tisores") {
                wJug1 += 1;
                if(wJug1 == 3){
                    wJug1 = 0;wJug2 = 0;
                    res.send("Guanya jugador 1. Partida acabada.");
                }else{
                    res.send("Guanya jugador 1.");
                }
            }
            else if (jugador1 == "paper" && jugador2 == "pedra") {
                wJug1 += 1;
                if(wJug1 == 3){
                    wJug1 = 0;wJug2 = 0;
                    res.send("Guanya jugador 1. Partida acabada.");
                }else{
                    res.send("Guanya jugador 1.");
                }
            }
            else if (jugador1 == "paper" && jugador2 == "tisores") {
                wJug2 += 1;
                if(wJug2 == 3){
                    wJug1 = 0;wJug2 = 0;
                    res.send("Guanya jugador 2. Partida acabada.");
                }else{
                    res.send("Guanya jugador 2.");
                }
            }
            else if (jugador1 == "tisores" && jugador2 == "paper") {
                wJug1 += 1;
                if(wJug1 == 3){
                    wJug1 = 0;wJug2 = 0;
                    res.send("Guanya jugador 1. Partida acabada.");
                }else{
                    res.send("Guanya jugador 1.");
                }
            }
            else if (jugador1 == "tisores" && jugador2 == "pedra") {
                wJug2 += 1;
                if(wJug2 == 3){
                    wJug1 = 0;wJug2 = 0;
                    res.send("Guanya jugador 2. Partida acabada.");
                }else{
                    res.send("Guanya jugador 2.");
                }
            }
            
        }
    }
    else if (!req.body.codiPartida || isNaN(codi)) res.send("Si us plau introdueix un codi vàlid.");
    else res.send("Introdueix un codi vàlid.")
});

app.delete('/api/acabarJoc/codiPartida', (req, res) => {
    partidesAcabades.push(parseInt(req.body.codiPartida));
    res.send(`Partida ${req.body.codiPartida} acabada.`);
    console.log(partidesAcabades);

});

app.listen(3002, () => console.log('Servidor iniciat.'));