package edu.fje.daw2.restfuljaxrs;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;

import java.util.ArrayList;
import java.util.List;

@Path("daw2")
/**
 * Servei web rest amb Java
 * URL
 * localhost:8080/api/daw2/consultarTots
 * sergi.grau@fje.edu
 * version 1.0 11.11.21
 */
public class RockPaperScissors {

    @Context
    private UriInfo context;
    private static List<Partida> llistaPartides = new ArrayList<>();

    public RockPaperScissors() {
        if (llistaPartides.size() == 0) {
            llistaPartides.add(new Partida(123, "Guillem", "", "","",""));
        }
    }

    @Path("/consultarTOTS")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String consultarTotsAlumnes() {
        return llistaPartides.toString();
    }

    @Path("/consultarUn/{codiPartida}")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String consultarUn(@PathParam("codiPartida") int codi) {
        Partida temp = new Partida(codi, "", "","","","");
        int pos = llistaPartides.indexOf(temp);
        return llistaPartides.get(pos).toString();
    }

    @Path("/consultarUnQuery")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String consultarUnQuery(@QueryParam("id") int id) {
        Partida temp = new Partida(id, "", "","","","");
        int pos = llistaPartides.indexOf(temp);
        return llistaPartides.get(pos).toString();
    }


    @PUT
    @Path("/modificarAlumne")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.TEXT_PLAIN)
    public Response modificarAlumne(@FormParam("codiPartida") int codi, @FormParam("nom") String nouNom){

        Partida temp = new Partida(codi, nouNom,"","","","");
        int pos = llistaPartides.indexOf(temp);
        llistaPartides.get(pos).setNom(nouNom);
        return Response.status(200).entity("alumne modificat").build();
    }

    @POST
    @Path("/afegirAlumne")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.TEXT_PLAIN)
    public Response afegirAlumne(@FormParam("codiPartida") int codi, @FormParam("nom") String nom) {

        llistaPartides.add(new Partida(codi,nom,"", "",""," "));
        return Response.status(200).entity("alumne creat").build();
    }

    @Path("/esborrarAlumne/{codiPartida}")
    @DELETE
    @Produces(MediaType.TEXT_PLAIN)
    public void esborrarAlumne(@PathParam("codiPartida") int codi) {
        Partida temp = new Partida(codi,"","", "",""," ");
        int pos = llistaPartides.indexOf(temp); // -1
        llistaPartides.remove(pos); //ERROR

    }

}

