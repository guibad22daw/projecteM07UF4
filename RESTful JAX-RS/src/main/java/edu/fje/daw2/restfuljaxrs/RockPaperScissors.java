package edu.fje.daw2.restfuljaxrs;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;
import jakarta.servlet.*;
import jakarta.servlet.http.*;

import java.util.*;

@Path("daw2")
public class RockPaperScissors {

    @Context
    private UriInfo context;
    private static List<Partida> llistaPartides = new ArrayList<Partida>();
    private static List<Integer> codis = new ArrayList<Integer>();
    private static List<Integer> partidesAcabades = new ArrayList<Integer>();
    private static List<seguimentPartida> seguiment = new ArrayList<seguimentPartida>();

    public RockPaperScissors() {
        if (llistaPartides.size() == 0) {
            llistaPartides.add(new Partida(123,"Guillem", "Iniciada.","", "","",""));
            codis.add(123);
        }
    }

    @Path("/iniciarJoc/{codiPartida}/{nom}")
    @POST
    @Produces(MediaType.TEXT_PLAIN)
    public String iniciarJoc(@PathParam("codiPartida") int codi, @PathParam("nom") String nom) {
        if(codis.contains(codi)) {
            return "Ja existeix una partida amb aquest codi.";
        } else if (partidesAcabades.contains(codi)) {
            return "Aquesta partida ja ha finalitzat.";
        }
        codis.add(codi);
        Partida temp = new Partida(codi, nom, "Iniciada","","","","");
        seguimentPartida temp2 = new seguimentPartida(codi, 0, 0,1,0,0,1);
        llistaPartides.add(temp);
        seguiment.add(temp2);
        System.out.println(llistaPartides.toString());
        return "Partida creada. Número de partida: "+codi+".";
    }

    @Path("/jugarPartida/{codiPartida}")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String jugarPartida(@PathParam("codiPartida") int codi) {
        if (codis.contains(codi)) {
            Partida partidaTemp = new Partida(codi, "","","","","","");
            int pos = llistaPartides.indexOf(partidaTemp);
            seguimentPartida seguimentTemp = new seguimentPartida(codi,0 ,0,1,0,0,1);
            int pos2 = seguiment.indexOf(seguimentTemp);

            seguiment.get(pos2).setJugat(1);

            String[] jugadesJugador1 = (llistaPartides.get(pos).getJugadesJugador1()).split(" ");
            String[] jugadesJugador2 = (llistaPartides.get(pos).getJugadesJugador2()).split(" ");
            System.out.println(Arrays.toString(jugadesJugador1));

            if(partidesAcabades.contains(codi)) return "Aquesta partida ja ha finalitzat.";
            else if (!codis.contains(codi)) return "Aquesta partida no existeix";

            llistaPartides.get(pos).setResultats("");
            seguiment.get(pos2).setwJug1(0);
            seguiment.get(pos2).setwJug2(0);

            if(seguiment.get(pos2).getCompt() != seguiment.get(pos2).getCompt2()) return "El jugador 2 encara no ha llençat.";

            for (int i=0; i < jugadesJugador1.length; i++) {
                if (jugadesJugador1[i].equals(jugadesJugador2[i])) {
                    llistaPartides.get(pos).setResultats((llistaPartides.get(pos).getResultats()+"Empat "));
                } else if (jugadesJugador1[i].equals("pedra") && jugadesJugador2[i].equals("tisores") || jugadesJugador1[i].equals("paper") && jugadesJugador2[i].equals("pedra") ||
                        jugadesJugador1[i].equals("tisores") && jugadesJugador2[i].equals("paper")) {
                    llistaPartides.get(pos).setResultats((llistaPartides.get(pos).getResultats()+"Jugador1 "));
                    seguiment.get(pos2).setwJug1(seguiment.get(pos2).getwJug1() + 1);

                } else if (jugadesJugador2[i].equals("")) {
                    llistaPartides.get(pos).setResultats((llistaPartides.get(pos).getResultats()+"Jugador1 "));
                    seguiment.get(pos2).setwJug1(seguiment.get(pos2).getwJug1() + 1);
                } else {
                    llistaPartides.get(pos).setResultats((llistaPartides.get(pos).getResultats()+"Jugador2 "));
                    seguiment.get(pos2).setwJug2(seguiment.get(pos2).getwJug2() + 1);
                }
            }

            System.out.println(seguiment.get(pos2).getwJug1()+" "+seguiment.get(pos2).getwJug2());
            if(seguiment.get(pos2).getwJug1() > seguiment.get(pos2).getwJug2()) {
                llistaPartides.get(pos).setGuanyador("Jugador1");
            } else if (seguiment.get(pos2).getwJug1() < seguiment.get(pos2).getwJug2()) {
                llistaPartides.get(pos).setGuanyador("Jugador2");
            } else {
                llistaPartides.get(pos).setGuanyador("Empat");
            }

            return llistaPartides.get(pos).toString();
        } else {
            return "La partida amb codi " + codi + " no existeix.";
        }
    }

    @Path("/consultarEstatPartida/{codiPartida}")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String consultarEstatPartida(@PathParam("codiPartida") int codi) {
        if ((codis.contains(codi)) || partidesAcabades.contains(codi)) {
            Partida temp = new Partida(codi,"","","","","","");
            int pos = llistaPartides.indexOf(temp);
            return llistaPartides.get(pos).toString();
        } else {
            return "La partida amb codi " + codi + " no existeix.";
        }

    }

    @Path("/moureJugador/{codiPartida}/{jugador}/{jugada}")
    @PUT
    @Produces(MediaType.TEXT_PLAIN)
    public String moureJugador(@PathParam("codiPartida") int codi, @PathParam("jugador") int jugador, @PathParam("jugada") String jugada){
        Partida temp = new Partida(codi, "","","","","","");
        seguimentPartida temp2 = new seguimentPartida(codi,0 ,0,1,0,0,1);
        int pos = llistaPartides.indexOf(temp);
        int pos2 = seguiment.indexOf(temp2);

        if (!jugada.equals("pedra") && !jugada.equals("paper") && !jugada.equals("tisores")) return "Escull una jugada: pedra, paper o tisores.";
        else if (!(jugador > 0 && jugador <= 2)) return "Només pot haver-hi jugador 1 i jugador 2";
        else if (partidesAcabades.contains(codi)) return "Aquesta partida ja ha finalitzat.";
        else if (codis.contains(codi)) {
            if (seguiment.get(pos2).getCompt2() == 5 && seguiment.get(pos2).getCompt() == 5) {
                return "Partida finalitzada, acudeix a /acabarJoc per esbrinar el guanyador";
            } else if (seguiment.get(pos2).getJugat() == 0 && seguiment.get(pos2).getTornJugador() == 1) {
                return "Encara no s'ha jugat la partida";
            } else if(jugador == 1) {
                if (seguiment.get(pos2).getTornJugador() != 1) {
                    return "El jugador 2 encara no ha tirat.";
                } else {
                    seguiment.get(pos2).setJugat(0);
                    seguiment.get(pos2).setCompt(seguiment.get(pos2).getCompt() + 1);
                    System.out.println(seguiment.get(pos2).getCompt());
                    llistaPartides.get(pos).setJugadesJugador1(jugada+" ");
                    seguiment.get(pos2).setTornJugador(2);
                    System.out.println(llistaPartides.toString());
                    System.out.println(seguiment.toString());
                    if (seguiment.get(pos2).getCompt() >= 5) {
                        seguiment.get(pos2).setTornJugador(2);
                        seguiment.get(pos2).setCompt(5);
                        return "Jugada 5 executada. Partida finalitzada, acudeix a /acabarJoc per esbrinar el guanyador";
                    }
                    return "Jugada " +seguiment.get(pos2).getCompt()+" executada.";
                }
            }

            else {
                if (seguiment.get(pos2).getTornJugador() != 2) {
                    return "El jugador 1 encara no ha tirat.";
                } else {
                    seguiment.get(pos2).setCompt2(seguiment.get(pos2).getCompt2() + 1);
                    llistaPartides.get(pos).setJugadesJugador2(jugada+" ");
                    seguiment.get(pos2).setTornJugador(1);
                    System.out.println(llistaPartides.toString());
                    System.out.println(llistaPartides.toString());
                    if (seguiment.get(pos2).getCompt2() >= 5) {
                        seguiment.get(pos2).setTornJugador(1);
                        seguiment.get(pos2).setCompt2(5);
                        return "Jugada 5 executada. Partida finalitzada, acudeix a /acabarJoc per esbrinar el guanyador";
                    }
                    return "Jugada " +seguiment.get(pos2).getCompt2()+" executada.";
                }
            }
        }
        return "Introdueix un codi vàlid";
    }

    @Path("/acabarJoc/{codiPartida}")
    @DELETE
    @Produces(MediaType.TEXT_PLAIN)
    public String acabarJoc(@PathParam("codiPartida") int codi) {
        Partida partidaTemp = new Partida(codi, "","","","","","");
        int pos = llistaPartides.indexOf(partidaTemp);
        seguimentPartida seguimentTemp = new seguimentPartida(codi,0 ,0,1,0,0,1);
        int pos2 = seguiment.indexOf(seguimentTemp);

        if (seguiment.get(pos2).getCompt() >= 5 && seguiment.get(pos2).getCompt2() >= 5) {
            partidesAcabades.add(codi);
            codis.remove(codis.indexOf(codi));
            llistaPartides.get(pos).setEstatPartida("Finalitzada");
        }
        return llistaPartides.get(pos).toString();
    }
}

