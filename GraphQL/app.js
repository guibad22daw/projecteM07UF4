const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const llistaPartides = [];
const seguimentPartida = [];
const codis = [];
const partidesAcabades = [];

const esquema = buildSchema(`
enum Jugades{
  pedra
  paper
  tisores
}

type Error {
  message: String!
}

type Partida{
  codi: ID!
  estatPartida: String
  jugadesJugador1: String
  jugadesJugador2: String
  wJug1: Int
  wJug2: Int
  guanyador: String
}

type Query {
  consultarEstatPartida(codi: ID!): Partida
}

type Mutation {
  iniciarPartida(codi: ID!): String
  moureJugador(codi: ID!, jugador: Int, jugada: Jugades): String
  jugarPartida(codi: ID!): String
  acabarPartida(codi: ID!): String
}
`);


const arrel = {

   iniciarPartida: ({ codi }) => {
      if (codis.includes(codi)) return "Aquesta partida ja existeix.";
      else if (partidesAcabades.includes(codi)) return "Aquesta partida ja ha finalitzat.";
      else {
         partida = { codi: codi, estatPartida: 'Iniciada.', jugadesJugador1: '', jugadesJugador2: '', wJug1: 0, wJug2: 0, guanyador: '' };
         llistaPartides.push(partida);
         seguimentPartida.push({ codi: codi, compt: 0, compt2: 0, tornJugador: 1, wJug1: 0, wJug2: 0, jugat: 1 })
         codis.push(codi);
         console.log(`Partida creada. Número de partida: ${codi}`);
         return `Partida creada. Número de partida: ${codi}`;
      }
   },

   consultarEstatPartida: ({ codi }) => {
      let partida = llistaPartides.find(a => a.codi === codi);
      if (codis.includes(codi) || partidesAcabades.includes(codi)) return partida;
      else {
         throw new Error("Introdueix un codi vàlid.");
      }
   },

   moureJugador: ({ codi, jugador, jugada }) => {
      let partida = llistaPartides.find(a => a.codi === codi);
      let seguiment = seguimentPartida.find(a => a.codi === codi);

      if (partidesAcabades.includes(codi)) return "Aquesta partida ja ha finalitzat";
      else if (codis.includes(codi)) {
         partida.estatPartida = "En joc";

         if (seguiment.jugat == 0 && seguiment.tornJugador == 1) {
            return "Encara no s'ha jugat la partida;"
         }

         else if (jugador == 1) {
            if (seguiment.tornJugador != 1) {
               return "El jugador 2 encara no ha tirat.";
            } else {
               seguiment.jugat = 0;
               seguiment.compt++;
               partida.jugadesJugador1 += `${jugada} `;
               seguiment.tornJugador = 2;
               return `Jugador 1: Has triat ${jugada}.`;
            }
         }

         else if (jugador == 2) {
            if (seguiment.tornJugador != 2) {
               return "El jugador 1 encara no ha tirat.";
            } else {
               seguiment.compt2++;
               partida.jugadesJugador2 += `${jugada} `;
               seguiment.tornJugador = 1;
               console.log(partida);
               return `Jugador 2: Has triat ${jugada}.`;
            }
         }
      }
      else return "Introdueix un codi vàlid.";
   },

   jugarPartida: ({ codi }) => {
      let partida = llistaPartides.find(a => a.codi === codi);
      let seguiment = seguimentPartida.find(a => a.codi === codi);

      if (partidesAcabades.includes(codi)) {
         return `Aquesta partida ja ha finalitzat. Guanyador: ${partida.guanyador}.`;
      } else {
         if (!codis.includes(codi)) return "La partida amb codi " + codi + " no existeix";
         else if (partida.estatPartida != "En joc") return "La partida amb codi " + codi + " no està en joc.";
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
            
            let textJson = JSON.stringify(partida).replace(/\"/g,"").replace(/:/g,": ").replace(/,/g,", ");
            if (partida.wJug1 == 3) {
               partidesAcabades.push(codi);
               partida.guanyador = "Jugador 1";
               partidesAcabades.push(codi);
               return "El jugador 1 guanya la partida. " + textJson;

            } else if (partida.wJug2 == 3) {
               partidesAcabades.push(codi);
               partida.guanyador = "Jugador 2";
               partidesAcabades.push(codi);
               return "El jugador 2 guanya la partida. " + textJson;

            } else if (seguiment.compt >= 5 && seguiment.compt2 >= 5) {
               partidesAcabades.push(codi);

               if (partida.wJug1 > partida.wJug2) {
                  partida.guanyador = "Jugador 1";
                  return "El jugador 1 guanya la partida. " + textJson;

               } else if (partida.wJug1 > partida.wJug2) {
                  partida.guanyador = "Jugador 2";
                  return "El jugador 2 guanya la partida. " + textJson;

               } else {
                  partida.guanyador = "Empat";
                  return "La partida finalitza en empat. " + textJson;
               }
            } else {
               return textJson;
            }

         } else if (seguiment.compt != seguiment.compt2) return "El jugador 2 encara no ha llençat.";
      }
   },

   acabarPartida: ({ codi }) => {
      let seguiment = seguimentPartida.find(a => a.codi === codi);
      let partida = llistaPartides.find(a => a.codi === codi);

      if (codis.includes(codi)) {
         if (partida.wJug1 > partida.wJug2) partida.guanyador = "Jugador 1";
         else if (partida.wJug1 < partida.wJug2) partida.guanyador = "Jugador 2";
         else partida.guanyador = "Empat";
         partidesAcabades.push(codi);
         codis.splice(codis.indexOf(codi), 1);
         partida.estatPartida = "Finalitzada";
         let textJson = JSON.stringify(partida).replace(/\"/g,"").replace(/:/g,": ").replace(/,/g,", ");
         seguimentPartida.splice(seguimentPartida.indexOf(seguiment), 1);
         return "Partida finalitzada. " + textJson;

      } else if (partidesAcabades.includes(codi)) {
         codis.splice(codis.indexOf(codi), 1);
         partida.estatPartida = "Finalitzada";
         seguimentPartida.splice(seguimentPartida.indexOf(seguiment), 1);
         return "Aquesta partida ja ha finalitzat.";
      } else return "La partida amb el codi " + codi + " no existeix";
   }
};


const app = express();
app.use(express.static('public'));
app.use('/graphql', graphqlHTTP({
   schema: esquema,
   rootValue: arrel,
   graphiql: true,
}));

app.listen(4000);
console.log('Executant servidor GraphQL API a http://localhost:4000/graphql');