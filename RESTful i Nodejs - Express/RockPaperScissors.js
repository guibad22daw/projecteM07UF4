const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // per analitzar les peticions HTTP que portin JSON al body

const llistaPartides = [];
const seguimentPartida = [];

let codis = [];
let partidesAcabades = [];
let moviments = ["pedra", "paper", "tisores"];

app.get('/', (req, res) => res.send('hola'));

app.post('/api/iniciarJoc/:codi', (req, res) => {
    let codi = parseInt(req.params.codi);

    if (codis.includes(codi)) res.send("Codi de partida ja existent.");
    else if (!codi || isNaN(codi)) res.send("Si us plau introdueix un codi vàlid.");
    else if (partidesAcabades.includes(codi)) res.send("Aquesta partida ja ha finalitzat");
    else {
        llistaPartides.push({ codi: codi, estatPartida: 'Iniciada.', jugadesJugador1: '', jugadesJugador2: '', wJug1: 0, wJug2: 0, guanyador: '' });
        seguimentPartida.push({ codi: codi, compt: 0, compt2: 0, tornJugador: 1, wJug1: 0, wJug2: 0, jugat: 1 })
        codis.push(codi);
        res.send(`Partida creada. Número de partida: ${codi}`);
    }
});

app.put('/api/jugarPartida/:codi', (req, res) => {
    let codi = parseInt(req.params.codi);
    let partida = llistaPartides.find(a => a.codi === codi);
    let seguiment = seguimentPartida.find(a => a.codi === codi);

    if (partidesAcabades.includes(codi)) {
        res.send(`Aquesta partida ja ha finalitzat. Guanyador: ${partida.guanyador}.`)
    } else {
        if (partida.estatPartida != "En joc") res.send("La partida amb codi " + codi + " no està en joc.");
        else if (codis.includes(codi) && (partida.estatPartida == "En joc") && (seguiment.compt == seguiment.compt2)) {
            let jugadesJugador1 = partida.jugadesJugador1.split(" ");
            let jugadesJugador2 = partida.jugadesJugador2.split(" ");
            seguiment.jugat = 1;
            partida.wJug1 = 0;
            partida.wJug2 = 0;

            for (let i = 0; i < jugadesJugador1.length - 1; i++) {
                if (jugadesJugador1[i] == jugadesJugador2[i]) {
                    partida.wJug1 = partida.wJug1;

                } else if ((jugadesJugador1[i] === 'pedra' && jugadesJugador2[i] === 'tisores') ||
                    (jugadesJugador1[i] === 'paper' && jugadesJugador2[i] === 'pedra') || (jugadesJugador1[i] === 'tisores' && jugadesJugador2[i] === 'paper')) {
                    partida.wJug1++;

                } else if (jugadesJugador2[i] === "") {
                    partida.wJug1++;
                } else {
                    partida.wJug2++;
                }
            }

            if (partida.wJug1 == 3) {
                partida.guanyador = "Jugador 1";
                partidesAcabades.push(codi);
                res.send("El jugador 1 guanya la partida. \n" + JSON.stringify(partida));
            } else if (partida.wJug2 == 3) {
                partida.guanyador = "Jugador 1";
                partidesAcabades.push(codi);
                res.send("El jugador 2 guanya la partida. \n" + JSON.stringify(partida));
            } else if (seguiment.compt >= 5 && seguiment.compt2 >= 5) {
                if (partida.wJug1 > partida.wJug2) {
                    partida.guanyador = "Jugador 1";
                    res.send("El jugador 1 guanya la partida. \n" + JSON.stringify(partida));
                } else if (partida.wJug1 > partida.wJug2) {
                    partida.guanyador = "Jugador 2";
                    res.send("El jugador 2 guanya la partida. \n" + JSON.stringify(partida));
                } else {
                    partida.guanyador = "Empat";
                    res.send("La partida finalitza en empat. \n" + JSON.stringify(partida));
                }
                partidesAcabades.push(codi);
            } else {
                res.send(partida);
            }

        } else if (seguiment.compt != seguiment.compt2) res.send("El jugador 2 encara no ha llençat.");
        else res.send("La partida amb codi " + codi + " no existeix");
    }
});

app.get('/api/consultarEstatPartida/:codi', (req, res) => {
    let codi = parseInt(req.params.codi);
    let partida = llistaPartides.find(a => a.codi === codi);

    if (codis.includes(codi) || partidesAcabades.includes(codi)) res.send(partida);
    else res.send(`Introdueix un codi vàlid. Codis de partides disponibles: ${codis.toString()}.`);
});



app.put('/api/moureJugador/:codi/:jugador/:jugada', (req, res) => { // /api/moureJugador
    let codi = parseInt(req.params.codi);
    let jugador = parseInt(req.params.jugador);
    let jugada = req.params.jugada;
    let seguiment = seguimentPartida.find(a => a.codi === codi);
    let partida = llistaPartides.find(a => a.codi === codi);

    if (!moviments.includes(jugada)) res.send("Jugada no vàlida. Introdueix un dels següents moviments: pedra, paper, tisores.");
    else if (!jugador || !(jugador > 0 && jugador <= 2)) res.send("Només pot haver-hi jugador 1 i jugador 2");
    else if (partidesAcabades.includes(codi)) res.send("Aquesta partida ja ha finalitzat.");
    else if (codis.includes(codi)) {
        partida.estatPartida = "En joc";

        if (seguiment.jugat == 0 && seguiment.tornJugador == 1) {
            res.send("Encara no s'ha jugat la partida.");
        }

        else if (jugador == 1) {
            if (seguiment.tornJugador != 1) {
                res.send('El jugador 2 encara no ha tirat.');
            } else {
                seguiment.jugat = 0;
                seguiment.compt++;
                partida.jugadesJugador1 += `${jugada} `;
                seguiment.tornJugador = 2;
                res.send(`Jugada ${seguiment.compt} executada.`);
            }
        }

        else if (jugador == 2) {
            if (seguiment.tornJugador != 2) {
                res.send('El jugador 1 encara no ha tirat.');
            } else {
                seguiment.compt2++;
                partida.jugadesJugador2 += `${jugada} `;
                seguiment.tornJugador = 1;
                console.log(partida);
                res.send(`Jugada ${seguiment.compt2} executada.`);
            }
        }
    }
    else res.send("Introdueix un codi vàlid.");

});

app.delete('/api/acabarJoc/:codi', (req, res) => {
    let codi = parseInt(req.params.codi);
    let seguiment = seguimentPartida.find(a => a.codi === codi);
    let partida = llistaPartides.find(a => a.codi === codi);

    if (codis.includes(codi)) {
        partidesAcabades.push(codi);
        codis.splice(codis.indexOf(codi), 1);
        partida.estatPartida = "Finalitzada";
        seguimentPartida.splice(seguimentPartida.indexOf(seguiment),1);
        res.send("Partida finalitzada. \n" + JSON.stringify(partida));
    } else if (partidesAcabades.includes(codi)) {
        codis.splice(codis.indexOf(codi), 1);
        partida.estatPartida = "Finalitzada";
        seguimentPartida.splice(seguimentPartida.indexOf(seguiment),1);
        res.send("Aquesta partida ja ha finalitzat.");
    } else res.send("La partida amb el codi " + codi + " no existeix");

});

app.listen(3001, () => console.log('Servidor iniciat.'));