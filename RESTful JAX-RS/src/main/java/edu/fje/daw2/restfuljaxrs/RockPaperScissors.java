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
        }
        codis.add(codi);
        Partida temp = new Partida(codi, nom, "Iniciada","","","","");
        seguimentPartida temp2 = new seguimentPartida(codi, 0, 0,1,0,0);
        llistaPartides.add(temp);
        seguiment.add(temp2);
        System.out.println(llistaPartides.toString());
        return "Partida creada. Número de partida: "+codi+".";
    }

    @Path("/consultarEstatPartida/{codiPartida}")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String consultarEstatPartida(@PathParam("codiPartida") int codi) {
        Partida temp = new Partida(codi,"","","","","","");
        int pos = llistaPartides.indexOf(temp);
        if(pos == -1) {
            return "La partida amb codi " + codi + " no existeix.";
        }
        return llistaPartides.get(pos).toString();
    }



    @Path("/moureJugador/{codiPartida}/{jugador}/{jugada}")
    @PUT
    @Produces(MediaType.TEXT_PLAIN)
    public String moureJugador(@PathParam("codiPartida") int codi, @PathParam("jugador") int jugador, @PathParam("jugada") String jugada){
        Partida temp = new Partida(codi, "","","","","","");
        seguimentPartida temp2 = new seguimentPartida(codi,0 ,0,1,0,0);

        if (!jugada.equals("pedra") && !jugada.equals("paper") && !jugada.equals("tisores")) return "Escull una jugada: pedra, paper o tisores.";
        else if (!(jugador > 0 && jugador <= 2)) return "Només pot haver-hi jugador 1 i jugador 2";
        else if (codis.contains(codi)) {
            if (seguiment.get(seguiment.indexOf(temp2)).getCompt2() == 5 && seguiment.get(seguiment.indexOf(temp2)).getCompt() == 5) {
                return "Partida finalitzada, acudeix a /acabarJoc per esbrinar el guanyador";
            }
            else if(jugador == 1) {
                if (seguiment.get(seguiment.indexOf(temp2)).getTornJugador() != 1) {
                    return "El jugador 2 encara no ha tirat.";
                } else {
                    seguiment.get(seguiment.indexOf(temp2)).setCompt(seguiment.get(seguiment.indexOf(temp2)).getCompt() + 1);
                    System.out.println(seguiment.get(seguiment.indexOf(temp2)).getCompt());
                    llistaPartides.get(llistaPartides.indexOf(temp)).setJugadesJugador1(jugada+" ");
                    seguiment.get(seguiment.indexOf(temp2)).setTornJugador(2);
                    System.out.println(llistaPartides.toString());
                    System.out.println(seguiment.toString());
                    if (seguiment.get(seguiment.indexOf(temp2)).getCompt() >= 5) {
                        seguiment.get(seguiment.indexOf(temp2)).setTornJugador(2);
                        return "Jugada 5 executada. Partida finalitzada, acudeix a /acabarJoc per esbrinar el guanyador";
                    }
                    return "Jugada " +seguiment.get(seguiment.indexOf(temp2)).getCompt()+" executada.";
                }
            }

            else {
                if (seguiment.get(seguiment.indexOf(temp2)).getTornJugador() != 2) {
                    return "El jugador 1 encara no ha tirat.";
                } else {
                    seguiment.get(seguiment.indexOf(temp2)).setCompt2(seguiment.get(seguiment.indexOf(temp2)).getCompt2() + 1);
                    llistaPartides.get(llistaPartides.indexOf(temp)).setJugadesJugador2(jugada+" ");
                    seguiment.get(seguiment.indexOf(temp2)).setTornJugador(1);
                    System.out.println(llistaPartides.toString());
                    System.out.println(llistaPartides.toString());
                    if (seguiment.get(seguiment.indexOf(temp2)).getCompt2() >= 5) {
                        seguiment.get(seguiment.indexOf(temp2)).setTornJugador(1);
                        return "Jugada 5 executada. Partida finalitzada, acudeix a /acabarJoc per esbrinar el guanyador";
                    }
                    return "Jugada " +seguiment.get(seguiment.indexOf(temp2)).getCompt2()+" executada.";
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
        seguimentPartida seguimentTemp = new seguimentPartida(codi,0 ,0,1,0,0);
        int pos2 = seguiment.indexOf(seguimentTemp);

        String[] jugadesJugador1 = (llistaPartides.get(pos).getJugadesJugador1()).split(" ");
        String[] jugadesJugador2 = (llistaPartides.get(pos).getJugadesJugador2()).split(" ");
        ArrayList<String> jugades = new ArrayList<>();
        String guanyador;
        System.out.println(Arrays.toString(jugadesJugador1));

        for (int i=0; i<jugadesJugador1.length - 1; i++) {
            if (jugadesJugador1[i].equals(jugadesJugador2[i])) {
                jugades.add("Empat");
                guanyador = "Empat";
            } else if (jugadesJugador1[i].equals("pedra") && jugadesJugador2[i].equals("tisores") || jugadesJugador1[i].equals("paper") && jugadesJugador2[i].equals("pedra") ||
                    jugadesJugador1[i].equals("tisores") && jugadesJugador2[i].equals("paper")) {
                jugades.add("Jugador 1");
                guanyador = "Jugador1";
                seguiment.get(pos2).setwJug1(seguiment.get(pos2).getwJug1() + 1);

            } else if (jugadesJugador2[i].equals("")) {
                jugades.add("Jugador 1");
                guanyador = "Jugador 1";
                seguiment.get(pos2).setwJug1(seguiment.get(pos2).getwJug1() + 1);
            } else {
                jugades.add("Jugador 2");
                guanyador = "Jugador 2";
                seguiment.get(pos2).setwJug2(seguiment.get(pos2).getwJug2() + 1);
            }
        }

        if(seguiment.get(pos2).getwJug1() > seguiment.get(pos2).getwJug2()) {
            llistaPartides.get(pos).setGuanyador("Jugador 1");
        } else if (seguiment.get(pos2).getwJug1() < seguiment.get(pos2).getwJug2()) {
            llistaPartides.get(pos).setGuanyador("Jugador 2");
        } else {
            llistaPartides.get(pos).setGuanyador("Empat");
        }

        /* int pos = llistaPartides.indexOf(temp);
        List<String> jugadesJugador1 = new ArrayList<String>();
        List<String> jugadesJugador2 = new ArrayList<String>();
        jugadesJugador1.add(llistaPartides.get(pos).getJugadesJugador1());
        jugadesJugador2.add(llistaPartides.get(pos).getJugadesJugador2());
        System.out.println(jugadesJugador1);
        System.out.println(jugadesJugador2.toString());
        llistaPartides.get(pos).getJugadesJugador1();
        return Response.status(200).entity("alumne modificat").build(); */
        return llistaPartides.get(pos).toString();
    }

    @POST
    @Path("/afegirAlumne")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.TEXT_PLAIN)
    public Response afegirAlumne(@FormParam("codiPartida") int codi, @FormParam("nom") String nom) {

        llistaPartides.add(new Partida(codi,nom,"", "","","",""));
        return Response.status(200).entity("alumne creat").build();
    }

    @Path("/esborrarAlumne/{codiPartida}")
    @DELETE
    @Produces(MediaType.TEXT_PLAIN)
    public void esborrarAlumne(@PathParam("codiPartida") int codi) {
        Partida temp = new Partida(codi,"","", "","","","");
        int pos = llistaPartides.indexOf(temp); // -1
        llistaPartides.remove(pos); //ERROR

    }

    @Path("/consultarTOTS")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String consultarPartides() {
        return llistaPartides.toString();
    }

    @Path("/consultarServidor")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String prova() {
        return "server funciona";
    }

}

