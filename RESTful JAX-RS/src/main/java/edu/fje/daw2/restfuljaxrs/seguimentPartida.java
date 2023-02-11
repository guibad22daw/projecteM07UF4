package edu.fje.daw2.restfuljaxrs;

public class seguimentPartida {
    private int codi;
    private int compt;
    private int compt2;
    private int tornJugador;
    private int wJug1;
    private int wJug2;
    private int jugat;


    public seguimentPartida(int codi, int compt, int compt2, int tornJugador, int wJug1, int wJug2, int jugat) {
        this.codi = codi;
        this.compt = compt;
        this.compt2 = compt2;
        this.tornJugador = tornJugador;
        this.wJug1 = wJug1;
        this.wJug2 = wJug2;
        this.jugat = jugat;
    }

    public int getCodi() {
        return codi;
    }

    public void setCodi(int codi) {
        this.codi = codi;
    }

    public int getCompt() {
        return compt;
    }

    public void setCompt(int compt) {
        this.compt = compt;
    }

    public int getCompt2() {
        return compt2;
    }

    public void setCompt2(int compt2) {
        this.compt2 = compt2;
    }

    public int getTornJugador() {
        return tornJugador;
    }

    public void setTornJugador(int tornJugador) {
        this.tornJugador = tornJugador;
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

    public int getJugat() {
        return jugat;
    }

    public void setJugat(int jugat) {
        this.jugat = jugat;
    }

    @Override
    public String toString() {
        return "seguimentPartida{" +
                "codi=" + codi +
                ", compt=" + compt +
                ", compt2=" + compt2 +
                ", tornJugador=" + tornJugador +
                ", wJug1=" + wJug1 +
                ", wJug2=" + wJug2 +
                ", jugat=" + jugat +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        seguimentPartida partida = (seguimentPartida) o;
        return codi == partida.codi;
    }
}
