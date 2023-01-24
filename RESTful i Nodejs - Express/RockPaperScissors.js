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

app.post('/api/iniciarJoc', (req, res) => {
    let codi = parseInt(req.body.codi);

    if (codis.includes(codi)) res.send("Codi de partida ja existent.");
    else if (!req.body.nom) res.send("Si us plau introdueix un nom.");
    else if (!codi || isNaN(codi)) res.send("Si us plau introdueix un codi vàlid.");
    else {
        llistaPartides.push({ codi: codi, nom: req.body.nom, estatPartida: 'En progrés.', jugadesJugador1: '', jugadesJugador2: '', resultats: '', guanyador: '' });
        seguimentPartida.push({ codi: codi, compt: 0, compt2: 0, tornJugador: 1, wJug1: 0, wJug2: 0 })
        codis.push(codi);
        res.send(`Partida creada. Número de partida: ${codi}`);
    }
    console.log(llistaPartides);
    console.log(codis);

});

app.get('/api/consultarEstatPartida/:codi', (req, res) => {
    let codi = parseInt(req.params.codi);
    let partida = llistaPartides.find(a => a.codi === codi);

    if (codis.includes(codi)) res.send(partida);
    else res.send(`Introdueix un codi vàlid. Codis de partides disponibles: ${codis.toString()}.`);
});



app.put('/api/moureJugador', (req, res) => { // /api/moureJugador
    let codi = parseInt(req.body.codi);
    let seguiment = seguimentPartida.find(a => a.codi === codi);
    let partidaActual = llistaPartides.find(a => a.codi === codi);
    let jugador = parseInt(req.body.jugador);
    let jugada = req.body.jugada;

    if (!moviments.includes(jugada)) res.send("Jugada no vàlida. Introdueix un dels següents moviments: pedra, paper, tisores.");
    else if (!jugador || !(jugador > 0 && jugador <= 2)) res.send("Només poden haver-hi jugador 1 i jugador 2");
    else if (partidesAcabades.includes(codi)) res.send("Aquesta partida ja ha acabat.");
    else if (codis.includes(codi)) {
        if (jugador == 1) {
            if (seguiment.tornJugador != 1) {
                res.send('El jugador 2 encara no ha tirat.');
            } else {
                partidaActual.jugadesJugador1 += `${jugada} `;
                console.log(llistaPartides);
                seguiment.tornJugador = 2;
                seguiment.compt++;
                if (seguiment.compt == 5) {
                    res.send(`Jugada ${seguiment.compt} executada.\nPartida finalitzada, acudeix a /consultarEstatPartida per esbrinar el guanyador.`);
                    seguiment.tornJugador = 2;
                } else res.send(`Jugada ${seguiment.compt} executada.`);
            }
        }

        if (jugador == 2) {
            if (seguiment.tornJugador != 2) {
                res.send('El jugador 1 encara no ha tirat.');
            } else {
                partidaActual.jugadesJugador2 += `${jugada} `;
                console.log(llistaPartides);
                seguiment.tornJugador = 1;
                seguiment.compt2++;
                if (seguiment.compt2 == 5) {
                    res.send(`Jugada ${seguiment.compt2} executada.\nPartida finalitzada, acudeix a /consultarEstatPartida per esbrinar el guanyador.`);
                    seguiment.tornJugador = 1;
                } else res.send(`Jugada ${seguiment.compt2} executada.`);
            }
        }
    }

    else res.send("Introdueix un codi vàlid.");

});

app.delete('/api/acabarJoc/:codi', (req, res) => {
    let codi = parseInt(req.params.codi);
    let seguiment = seguimentPartida.find(a => a.codi === codi);
    let resultats = [], jugades = [];
    let guanyador = '';
    let acabarPartida = llistaPartides.find(a => a.codi === codi);

    if (codis.includes(codi)) {
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
                seguiment.wJug1++;
            } else if (jugadesJugador2[i] === "") {
                guanyador = 'Jugador1';
                seguiment.wJug1++;
            } else {
                jugades += 'Jugador2 ';
                guanyador = 'Jugador2';
                seguiment.wJug2++;
            }

            resultats.push({
                JugadesJugador1: jugadesJugador1[i],
                JugadesJugador2: jugadesJugador2[i],
                Guanyador: guanyador
            });
        }

        acabarPartida.resultats = jugades;
        if (seguiment.wJug1 > seguiment.wJug2) {
            resultats.push({ GuanyadorFinal: "Jugador1" });
            acabarPartida.guanyador = "Jugador 1";
        } else if (seguiment.wJug1 < seguiment.wJug2) {
            resultats.push({ GuanyadorFinal: "Jugador2" });
            acabarPartida.guanyador = "Jugador 2";
        } else {
            resultats.push({ GuanyadorFinal: "Empat" });
            acabarPartida.guanyador = "Empat";
        }

        if (seguiment.compt == 5 && seguiment.compt2 == 5) {
            acabarPartida.estatPartida = "Acabada.";
            partidesAcabades.push(codi);
        }
        res.send(resultats);
    } else res.send("Introdueix un codi vàlid.");

});

app.listen(3001, () => console.log('Servidor iniciat.'));