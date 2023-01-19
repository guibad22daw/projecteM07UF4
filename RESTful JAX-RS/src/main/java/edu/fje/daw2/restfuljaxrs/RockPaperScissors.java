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
    public static int compt = 0;
    public static int compt2 = 0;

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
        llistaPartides.add(temp);
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
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.TEXT_PLAIN)
    public String moureJugador(@PathParam("codiPartida") int codi, @PathParam("jugador") int jugador, @PathParam("jugada") String jugada){
        Partida temp = new Partida(codi, "","","","","","");
        int pos = llistaPartides.indexOf(temp);

        if (!codis.contains(codi)) return "Si us plau introdueix un codi vàlid.";
        else if (!jugada.equals("pedra") && !jugada.equals("paper") && !jugada.equals("tisores")) return "Escull una jugada: pedra, paper o tisores.";
        else if (!(jugador > 0 && jugador <= 2)) return "Només pot haver-hi jugador 1 i jugador 2";
        else if((jugador == 1 && compt >= 5) || (jugador == 2 && compt2 >= 5)) return "Partida finalitzada, acudeix a /consultarEstatPartida per esbrinar el guanyador.";
        else if (jugador == 2) {
            llistaPartides.get(pos).setJugadesJugador2(jugada+" ");
            compt2++;
            return "Jugada "+compt2+" executada.";
        }
        llistaPartides.get(pos).setJugadesJugador1(jugada+" ");     // S'afegeix la jugada a jugadesJugador1
        System.out.println(llistaPartides.toString());
        compt++;
        return "Jugada "+compt+" executada.";
    }

    @Path("/modificarAlumne")
    @PUT
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.TEXT_PLAIN)
    public Response modificarAlumne(@FormParam("codiPartida") int codi, @FormParam("nom") String nouNom){

        Partida temp = new Partida(codi, nouNom,"","","","","");
        int pos = llistaPartides.indexOf(temp);
        llistaPartides.get(pos).setNom(nouNom);
        return Response.status(200).entity("alumne modificat").build();
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

