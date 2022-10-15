/**
 * Aplicació en ExpressJS que crea una API REST completa
 * @author sergi.grau@fje.edu
 * @version 2.0 10.10.21
 */

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // per analitzar les peticions HTTP que portin JSON al body

// let alumnes = [
//     {codi:1, nom:'SERGI',nota:5},
//     {codi:2, nom:'ANNA',nota:6},
//     {codi:3, nom:'JOAN',nota:4}
// ];

let codiPartides = [
    { "codi": '0', "nom": 'PROVA', "estatPartida": 'Acabada' }
];

app.get('/', (req, res) => res.send('hola'));

app.post('/api/iniciarJoc/:codiPartida', (req, res) => {
    let partida = [];
    partida.length = 0;
    for (let i of codiPartides) {
        if (i.codi == req.params.codiPartida) {
            res.send("Codi de partida ja existent.");
        } if (!req.body.nom) {
            res.send("Si us plau introdueix un nom.")

        } else {
            partida = { "codi": parseInt(req.params.codiPartida), "nom": req.body.nom, "estatPartida": 'A punt de començar.' };
        }
    }
    codiPartides.push(partida);
    console.log(codiPartides);
    res.send(codiPartides);

});

app.get('/api/consultarEstatPartida/codiPartida', (req, res) => {
    let partida = codiPartides.find(a => a.codi === parseInt(req.body.codi));
    let codis = [];
    for (let i of codiPartides) codis.push(i.codi);
    for (let i of codiPartides) {
        let codis = [];
        codis.push(i.codi);
        if (i.codi == req.body.codi) {
            res.send(partida);
        } else if (!req.body.codi) res.send("Introdueix un codi.");
    }
    if (!partida) {
        res.send(`Introdueix un codi vàlid. Codis de partides disponibles: ${codis.toString()}.`);
    }
});

let jugador1 = 0, jugador2 = 0;
let pedra1 = 0, paper1 = 0, tisores1 = 0, pedra2 = 0, paper2 = 0, tisores2 = 0;

app.put('/api/moureJugador/codiPartida/jugador/tipusMoviment', (req, res) => { // /api/moureJugador/123/1/tisores
    let partidaActual = { "codi": req.body.codi, "jugador": req.body.jugador, "tipusMoviment": req.body.tipusMoviment };
    // ASSIGNACIONS
    let partida = codiPartides.find(a => a.codi === parseInt(req.body.codi));
    for (let i of codiPartides) {
        if (i.codi == req.body.codi) {
            if (req.body.jugador == 1 && req.body.tipusMoviment == "pedra") {
                jugador1 = "pedra";
                console.log("Pedra1.");
            }else if (req.body.jugador == 2 && req.body.tipusMoviment == "pedra") {
                jugador2 = "pedra"
                console.log("Pedra2.");
            }else if (req.body.jugador == 1 && req.body.tipusMoviment == "paper") {
                jugador1 = "paper";
                console.log("Paper1.");
            }else if (req.body.jugador == 2 && req.body.tipusMoviment == "paper") {
                jugador2 = "paper";
                console.log("Paper2.");
            }else if (req.body.jugador == 1 && req.body.tipusMoviment == "tisores") {
                jugador1 = "tisores";
                console.log("Tisores1.");
            }else if (req.body.jugador == 2 && req.body.tipusMoviment == "tisores") {
                jugador2 = "tisores";
                console.log("Tisores2.");
            }
            
            if(jugador1 === jugador2){
                res.send("Empat.")
            }else{
                if(jugador1 == "pedra" && jugador2 == "paper"){
                    res.send("Guanya jugador 2.");
                }
                else if(jugador1 == "pedra" && jugador2 == "tisores"){
                    res.send("Guanya jugador 1.");
                }
                else if(jugador1 == "paper" && jugador2 == "pedra"){
                    res.send("Guanya jugador 1.");
                }
                else if(jugador1 == "paper" && jugador2 == "tisores"){
                    res.send("Guanya jugador 2.");
                }                
                else if(jugador1 == "tisores" && jugador2 == "paper"){
                    res.send("Guanya jugador 1.");
                }
                else if(jugador1 == "tisores" && jugador2 == "pedra"){
                    res.send("Guanya jugador 2.");
                }                               
            }

            console.log(jugador1,jugador2);
        } else if (!req.body.codi) res.send("Introdueix un codi vàlid.");
    }
    // if (req.body.jugador > 2) res.send("Escull si ets el jugador 1 o 2.");

    
    // switch (key) {
    //     case "pedra":
    //         if ((jugador1 && pedra) && (jugador2 && paper)) res.send("Jugador 2 guanya.");
    //         else if ((jugador1 && pedra) && (jugador2 && tisores)) res.send("Jugador 1 guanya.");
    //         break;
        
    //     case "paper":
    //         if ((jugador1 && paper) && (jugador2 && tisores)) res.send("Jugador 2 guanya.");
    //         else if ((jugador1 && paper) && (jugador2 && pedra)) res.send("Jugador 1 guanya.");
    //         break;
        
    //     case "tisores":
    //         if ((jugador1 && tisores) && (jugador2 && pedra)) res.send("Jugador 2 guanya.");
    //         else if ((jugador1 && tisores) && (jugador2 && paper)) res.send("Jugador 1 guanya.");
    //         break;
    // }

    // console.log(jugador1,tisores,jugador2,paper,pedra);
    // if ((jugador1 == 1 && pedra == 1) && (jugador2 == 1 && paper == 1)) {
    //     console.log("Guanya jugador 2.");
    //     res.send("Guanya jugador 2.");

    // }
    // else if ((jugador1 == 1 && pedra == 1) && (jugador2 == 1 && tisores == 1)) {
    //     console.log("Guanya jugador 1.");
    //     res.send("Guanya jugador 1.");
        
    // }    
    // else if ((jugador1 == 1 && paper == 1) && (jugador2 == 1 && pedra == 1)) {
    //     console.log("Guanya jugador 1.");
    //     res.send("Guanya jugador 1.");
        
    // }
    // else if ((jugador1 == 1 && paper == 1) && (jugador2 == 1 && tisores == 1)) {
    //     console.log("Guanya jugador 2.");
    //     res.send("Guanya jugador 2.");
        
    // }   
    // else if ((jugador1 == 1 && tisores == 1) && (jugador2 == 1 && pedra == 1)) {
    //     console.log("Guanya jugador 2.");
    //     res.send("Guanya jugador 2.");
        
    // }
    
    // else if (jugador1 == 1 && tisores == 1 && jugador2 == 1 && paper == 1) {
    //     res.send("Guanya jugador 1.");
    // }     
     
    //  if(req.body.tipusMoviment == "pedra") pedra = 1;
    //  if(req.body.tipusMoviment == "paper") paper = 1;
    //  if(req.body.tipusMoviment == "tisores") tisores = 1;
    //  if(jugador1 && pedra && jugador2 && paper){
    //      res.send("Guanya el jugador 2.");
    //  }
    //  else if(jugador1 && pedra && jugador2 && tisores){
    //      res.send("Guanya el jugador 1.");
    //  }
    //  else if(jugador1 && pedra && jugador2 && pedra){
    //      res.send("Empat.");
    //  }        
});

app.delete('/api/acabarJoc/codiPartida', (req, res) => {
    res.send(alumnes);
});

// app.get('/api/alumnes/:codi', (req, res)=>{
//     let alumne = alumnes.find(a =>a.codi===parseInt(req.params.codi));
//     if (!alumne) res.status(404, 'error');
//     res.send(alumne);
// });

// app.get('/api/aprovats', (req, res)=>{
//     let aprovats = [];
//     for(let i=0; i<alumnes.length; i++){ 
//         if(alumnes[i].nota >= 5) {
//             let alumne = alumnes[i];
//             aprovats.push(alumne);
//         }
//     }
//     res.send(aprovats);
// });

// app.get('/api/mitjana', (req, res)=>{
//     let sumaNotes = 0;
//     let numAlumnes = 0;
//     for(let i=0; i<alumnes.length; i++){ 
//         sumaNotes = sumaNotes + alumnes[i].nota;
//         numAlumnes = numAlumnes + i;
//     }
//     let mitjana = sumaNotes / numAlumnes;
//     res.send(`La mitjana de les notes de tots els alumnes es ${mitjana.toFixed(2)}.`);
// });

// app.put('/api/canviarNota/:notaAntiga/:notaNova', (req, res) => {
//     for (let i of alumnes){
//         console.log(i);
//             if (i.nota == req.params.notaAntiga){
//                 i.nota = parseInt(req.params.notaNova);
//             } 
//     }
//     res.send(alumnes);
// });

// app.post('/api/alumnes', (req, res)=>{
//     console.log(req.body.codi);
//     let alumne={codi: parseInt(req.body.codi), nom: req.body.nom, nota: req.body.nota };

//     alumnes.push(alumne);
//     res.send(alumnes);
// });

// app.delete('/api/alumnes/:codi', (req, res)=>{
//     var alumne = alumnes.find(a =>a.codi===parseInt(req.params.codi));
//     var index =alumnes.indexOf(alumne);

//     if(alumne){
//         alumnes.splice(index, 1);
//         res.send(alumnes);
//     }
// });

// app.put('/api/alumnes/:codi', (req, res)=>{
//     let nouAlumne={codi: req.body.codi, nom: req.body.nom, nota: req.body.nota };
//     let alumne = alumnes.find(a =>a.codi===parseInt(req.params.codi));
//     let index =alumnes.indexOf(alumne);

//     alumnes[index]=nouAlumne;
//     res.send(alumnes)
// });

app.listen(3002, () => console.log('Servidor iniciat.'));