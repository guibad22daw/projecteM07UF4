package edu.fje.daw2.restfuljaxrs;


class Alumne {
    private int id;
    private String nom;
    private int nota;

    public Alumne(int id, String nom, int nota) {
        this.id = id;
        this.nom = nom;
        this.nota = nota;
    }

    public int getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public int getNota() {
        return nota;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setNota(int nota) {
        this.nota = nota;
    }

    @Override
    public String toString() {
        return "Alumne amb les dades {" +
            "id=" + id +
            ", nom='" + nom + '\'' +
            ", nota=" + nota +
            '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Alumne alumne = (Alumne) o;
        return id == alumne.id;
    }
}
