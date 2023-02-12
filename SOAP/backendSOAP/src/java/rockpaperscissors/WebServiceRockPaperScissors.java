package rockpaperscissors;

import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import java.util.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;


@WebService(serviceName = "WebServiceRockPaperScissors")
public class WebServiceRockPaperScissors {
    @Context
    private UriInfo context;
    private static List<Partida> llistaPartides = new ArrayList<Partida>();
    private static List<Integer> codis = new ArrayList<Integer>();
    private static List<Integer> partidesAcabades = new ArrayList<Integer>();
    private static List<seguimentPartida> seguiment = new ArrayList<seguimentPartida>();
    
    @WebMethod(operationName = "iniciarPartida")
    public String iniciarJoc(@WebParam(name = "codi") int codi) {
        if(codis.contains(codi)) {
            return "Ja existeix una partida amb aquest codi.";
        } else if (partidesAcabades.contains(codi)) {
            return "Aquesta partida ja ha finalitzat.";
        }
        codis.add(codi);
        Partida temp = new Partida(codi, "Iniciada","","",0,0,"");
        seguimentPartida temp2 = new seguimentPartida(codi, 0, 0,1,1);
        llistaPartides.add(temp);
        seguiment.add(temp2);
        System.out.println(llistaPartides.get(llistaPartides.indexOf(temp)).toString());
        return "Partida creada. Número de partida: "+codi+".";
    }
    
    @WebMethod(operationName = "jugarPartida")
    public String jugarPartida(@WebParam(name = "codi") int codi) {
        Partida partidaTemp = new Partida(codi, "","","",0,0,"");
        int pos = llistaPartides.indexOf(partidaTemp);

        if (partidesAcabades.contains(codi)) {
            return "Aquesta partida ja ha finalitzat. Guanyador: "+ llistaPartides.get(pos).getGuanyador();
        } else {
            seguimentPartida seguimentTemp = new seguimentPartida(codi,0 ,0,1,1);
            int pos2 = seguiment.indexOf(seguimentTemp);

            if (llistaPartides.get(pos).getEstatPartida().equals("Iniciada")) {
                return "La partida amb codi " + codi + " no està en joc.";
            } else if (codis.contains(codi) && llistaPartides.get(pos).getEstatPartida().equals("En joc") && seguiment.get(pos2).getCompt() == seguiment.get(pos2).getCompt2()) {
                seguiment.get(pos2).setJugat(1);

                String[] jugadesJugador1 = (llistaPartides.get(pos).getJugadesJugador1()).split(" ");
                String[] jugadesJugador2 = (llistaPartides.get(pos).getJugadesJugador2()).split(" ");
                System.out.println(Arrays.toString(jugadesJugador1));

                llistaPartides.get(pos).setwJug1(0);
                llistaPartides.get(pos).setwJug2(0);

                for (int i=0; i < jugadesJugador1.length; i++) {
                    if (jugadesJugador1[i].equals(jugadesJugador2[i])) {
                        llistaPartides.get(pos).setwJug1(llistaPartides.get(pos).getwJug1());
                    } else if (jugadesJugador1[i].equals("pedra") && jugadesJugador2[i].equals("tisores") || jugadesJugador1[i].equals("paper") && jugadesJugador2[i].equals("pedra") ||
                            jugadesJugador1[i].equals("tisores") && jugadesJugador2[i].equals("paper")) {
                        llistaPartides.get(pos).setwJug1(llistaPartides.get(pos).getwJug1()+1);
                    } else if (jugadesJugador2[i].equals("")) {
                        llistaPartides.get(pos).setwJug1(llistaPartides.get(pos).getwJug1()+1);
                    } else {
                        llistaPartides.get(pos).setwJug2(llistaPartides.get(pos).getwJug2()+1);
                    }
                }

                if(llistaPartides.get(pos).getwJug1() == 3) {
                    llistaPartides.get(pos).setGuanyador("Jugador 1");
                    partidesAcabades.add(codi);
                    return "El jugador 1 guanya la partida.\n"+llistaPartides.get(pos).toString();
                } else if (llistaPartides.get(pos).getwJug2() == 3) {
                    llistaPartides.get(pos).setGuanyador("Jugador 2");
                    partidesAcabades.add(codi);
                    return "El jugador 2 guanya la partida.\n"+llistaPartides.get(pos).toString();
                } else {
                    if (seguiment.get(pos2).getCompt() >= 5 && seguiment.get(pos2).getCompt2() >= 5) {
                        if (llistaPartides.get(pos).getwJug1() > llistaPartides.get(pos).getwJug2()){
                            llistaPartides.get(pos).setGuanyador("Jugador 1");
                            partidesAcabades.add(codi);
                            return "El jugador 1 guanya la partida.\n"+llistaPartides.get(pos).toString();
                        } else if (llistaPartides.get(pos).getwJug1() < llistaPartides.get(pos).getwJug2()){
                            llistaPartides.get(pos).setGuanyador("Jugador 2");
                            partidesAcabades.add(codi);
                            return "El jugador 2 guanya la partida.\n"+llistaPartides.get(pos).toString();
                        } else {
                            llistaPartides.get(pos).setGuanyador("Empat");
                            partidesAcabades.add(codi);
                            return "La partida finalitza en empat.\n"+llistaPartides.get(pos).toString();
                        }
                    }
                }

                return llistaPartides.get(pos).toString();
            } else if (seguiment.get(pos2).getCompt() != seguiment.get(pos2).getCompt2()) {
                return "El jugador 2 encara no ha llençat";
            } else {
                return "La partida amb codi " + codi + " no existeix";
            }
        }

    }
    
    @WebMethod(operationName = "consultarEstatPartida")
    public String consultarEstatPartida(@WebParam(name = "codi") int codi) {
        if ((codis.contains(codi)) || partidesAcabades.contains(codi)) {
            Partida temp = new Partida(codi,"","","",0,0,"");
            int pos = llistaPartides.indexOf(temp);
            return llistaPartides.get(pos).toString();
        } else {
            return "La partida amb codi " + codi + " no existeix.";
        }
    }
    
    @WebMethod(operationName = "moureJugador")
    public String moureJugador(@WebParam(name = "codi") int codi, @WebParam(name = "jugador") int jugador, @WebParam(name = "jugada") String jugada){
        Partida temp = new Partida(codi,"","","",0,0,"");
        seguimentPartida temp2 = new seguimentPartida(codi,0 ,0,1,1);
        int pos = llistaPartides.indexOf(temp);
        int pos2 = seguiment.indexOf(temp2);

        if (!jugada.equals("pedra") && !jugada.equals("paper") && !jugada.equals("tisores")) return "Jugada no vàlida. Introdueix un dels següents moviments: pedra, paper, tisores.";
        else if (!(jugador > 0 && jugador <= 2)) return "Només pot haver-hi jugador 1 i jugador 2";
        else if (partidesAcabades.contains(codi)) return "Aquesta partida ja ha finalitzat.";
        else if (codis.contains(codi)) {
            llistaPartides.get(pos).setEstatPartida("En joc");
            if (seguiment.get(pos2).getJugat() == 0 && seguiment.get(pos2).getTornJugador() == 1) {
                return "Encara no s'ha jugat la partida";
            } else if(jugador == 1) {
                if (seguiment.get(pos2).getTornJugador() != 1) {
                    return "El jugador 2 encara no ha tirat.";
                } else {
                    seguiment.get(pos2).setJugat(0);
                    seguiment.get(pos2).setCompt(seguiment.get(pos2).getCompt() + 1);
                    llistaPartides.get(pos).setJugadesJugador1(llistaPartides.get(pos).getJugadesJugador1()+jugada+" ");
                    seguiment.get(pos2).setTornJugador(2);
                    System.out.println(llistaPartides.get(pos).toString());
                    return "Jugada " +seguiment.get(pos2).getCompt()+" executada.";
                }
            }

            else {
                if (seguiment.get(pos2).getTornJugador() != 2) {
                    return "El jugador 1 encara no ha tirat.";
                } else {
                    seguiment.get(pos2).setCompt2(seguiment.get(pos2).getCompt2() + 1);
                    llistaPartides.get(pos).setJugadesJugador2(llistaPartides.get(pos).getJugadesJugador2()+jugada+" ");
                    seguiment.get(pos2).setTornJugador(1);
                    System.out.println(llistaPartides.get(pos).toString());
                    return "Jugada " +seguiment.get(pos2).getCompt2()+" executada.";
                }
            }
        }
        return "Introdueix un codi vàlid";
    }
    
    
    @WebMethod(operationName = "acabarJoc")
    public String acabarJoc(@WebParam(name = "codi") int codi) {
        Partida partidaTemp = new Partida(codi,"","","",0,0,"");
        int pos = llistaPartides.indexOf(partidaTemp);
        seguimentPartida seguimentTemp = new seguimentPartida(codi,0 ,0,1,1);

        if (codis.contains(codi)) {
            partidesAcabades.add(codi);
            codis.remove(codis.indexOf(codi));
            llistaPartides.get(pos).setEstatPartida("Finalitzada");
            seguiment.remove(seguimentTemp);
            return "Partida finalitzada. \n"+llistaPartides.get(pos).toString();
        } else if (partidesAcabades.contains(codi)) {
            llistaPartides.get(pos).setEstatPartida("Finalitzada");
            seguiment.remove(seguimentTemp);
            return "Aquesta partida ja ha finalitzat.";
        } else {
            return "La partida amb el codi " + codi + " no existeix";
        }
    }
    
    
    
}
