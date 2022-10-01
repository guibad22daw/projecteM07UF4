/**
 * Aplicació en ExpressJS que crea una API REST completa
 * @author sergi.grau@fje.edu
 * @version 2.0 10.10.21
 */

const express = require('express');
const app=express();

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // per analitzar les peticions HTTP que portin JSON al body

// let alumnes = [
//     {codi:1, nom:'SERGI',nota:5},
//     {codi:2, nom:'ANNA',nota:6},
//     {codi:3, nom:'JOAN',nota:4}
// ];
let codiPartides = [
    {codi: 0}
];

app.get('/', (req, res)=>res.send('hola'));

app.post('/api/iniciarJoc/:codiPartida', (req, res) => {
    let partida = [];
    for(i=0;i<codiPartides.length;i++){
        if (req.body.codi == codiPartides[i].codi) {
            res.send(codiPartides[i].codi);

        }else{
            partida = {codi: parseInt(req.body.codi)};
            codiPartides.push(partida);
        }
    }
    res.send(codiPartides);
});

app.get('/api/consultarEstatPartida/codiPartida:JSONs', (req, res) => {
    res.send(alumnes);
});

app.put('/api/moureJugador/codiPartida/jugador/tipusMoviment', (req, res) => {
    res.send("Hola");
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

app.listen(3000, ()=>console.log('inici servidor'));