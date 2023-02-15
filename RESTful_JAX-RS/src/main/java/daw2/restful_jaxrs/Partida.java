package daw2.restful_jaxrs;

public class Partida {
    private int codi;
    private String estatPartida;
    private String jugadesJugador1;
    private String jugadesJugador2;
    private int wJug1;
    private int wJug2;

    private String guanyador;

    public Partida(int codi, String estatPartida, String jugadesJugador1, String jugadesJugador2, int wJug1, int wJug2, String guanyador) {
        this.codi = codi;
        this.estatPartida = estatPartida;
        this.jugadesJugador1 = jugadesJugador1;
        this.jugadesJugador2 = jugadesJugador2;
        this.wJug1 = wJug1;
        this.wJug2 = wJug2;
        this.guanyador = guanyador;
    }

    public int getCodi() {
        return codi;
    }

    public void setCodi(int codi) {
        this.codi = codi;
    }

    public String getEstatPartida() {
        return estatPartida;
    }

    public void setEstatPartida(String estatPartida) {
        this.estatPartida = estatPartida;
    }

    public String getJugadesJugador1() {
        return jugadesJugador1;
    }

    public void setJugadesJugador1(String jugadesJugador1) {
        this.jugadesJugador1 = jugadesJugador1;
    }

    public String getJugadesJugador2() {
        return jugadesJugador2;
    }

    public void setJugadesJugador2(String jugadesJugador2) {
        this.jugadesJugador2 = jugadesJugador2;
    }

    public int getwJug1() {
        return wJug1;
    }

    public void setwJug1(int wJug1) {
        this.wJug1 = wJug1;
    }

    public int getwJug2() {
        return wJug2;
    }

    public void setwJug2(int wJug2) {
        this.wJug2 = wJug2;
    }

    public String getGuanyador() {
        return guanyador;
    }

    public void setGuanyador(String guanyador) {
        this.guanyador = guanyador;
    }

    @Override
    public String toString() {
        return "Codi: " + codi + "  |   Estat partida: " + estatPartida + "  |  Jugades J1: " + jugadesJugador1 + "  |  Jugades J2: " + jugadesJugador2 + "  |  Guanyades J1: " + wJug1 + "  |  Guanyades J2: " + wJug2 + "  |  Guanyador: " + guanyador;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Partida partida = (Partida) o;
        return codi == partida.codi;
    }
}
