package edu.fje.daw2.restfuljaxrs;

public class Partida {
    private int codi;
    private String nom;
    private String estatPartida;
    private String jugadesJugador1;
    private String jugadesJugador2;
    private String resultats;
    private String guanyador;

    public Partida(int codi, String nom, String estatPartida, String jugadesJugador1, String jugadesJugador2, String resultats, String guanyador) {
        this.codi = codi;
        this.nom = nom;
        this.estatPartida = estatPartida;
        this.jugadesJugador1 = jugadesJugador1;
        this.jugadesJugador2 = jugadesJugador2;
        this.resultats = resultats;
        this.guanyador = guanyador;
    }

    public int getCodi() {
        return codi;
    }

    public void setCodi(int codi) {
        this.codi = codi;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
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
        this.jugadesJugador1 += jugadesJugador1;
    }

    public String getJugadesJugador2() {
        return jugadesJugador2;
    }

    public void setJugadesJugador2(String jugadesJugador2) {
        this.jugadesJugador2 += jugadesJugador2;
    }

    public String getResultats() {
        return resultats;
    }

    public void setResultats(String resultats) {
        this.resultats = resultats;
    }

    public String getGuanyador() {
        return guanyador;
    }

    public void setGuanyador(String guanyador) {
        this.guanyador = guanyador;
    }

    @Override
    public String toString() {
        return "Partida{" +
            "codi=" + codi +
            ", nom='" + nom + '\'' +
            ", estatPartida='" + estatPartida + '\'' +
            ", jugadesJugador1='" + jugadesJugador1 + '\'' +
            ", jugadesJugador2='" + jugadesJugador2 + '\'' +
            ", resultats='" + resultats + '\'' +
            ", guanyador='" + guanyador + '\'' +
            '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Partida partida = (Partida) o;
        return codi == partida.codi;
    }
}
