package consumidorSoap;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int option;
        int codi;
        int jugador;
        String jugada;

        while (true) {
            System.out.println("\n---------- MENÚ PRINCIPAL ----------\n");
            System.out.println("1. Iniciar partida");
            System.out.println("2. Moure jugador");
            System.out.println("3. Jugar partida");
            System.out.println("4. Consultar l'estat de la partida");
            System.out.println("5. Acabar partida");
            System.out.println("6. Sortir");
            System.out.print("\nSelecciona una opció: ");
            option = sc.nextInt();

            switch (option) {
                case 1:
                    System.out.println("Introdueix el codi de partida: ");
                    codi = sc.nextInt();
                    System.out.println(iniciarPartida(codi));
                    break;
                
                case 2:
                    System.out.println("Introdueix el codi de partida: ");
                    codi = sc.nextInt();
                    System.out.println("Quin jugador ets? (1 o 2): ");
                    jugador = sc.nextInt();
                    System.out.println("Jugada a executar (pedra, paper o tisores): ");
                    jugada = sc.next();
                    System.out.println(moureJugador(codi,jugador,jugada));
                    break;
                    
                case 3:
                    System.out.println("Introdueix el codi de partida: ");
                    codi = sc.nextInt();
                    System.out.println(jugarPartida(codi));
                    break;
                
                case 4:
                    System.out.println("Introdueix el codi de partida: ");
                    codi = sc.nextInt();
                    System.out.println(consultarEstatPartida(codi));
                    break;
                    
                case 5:
                    System.out.println("Introdueix el codi de partida: ");
                    codi = sc.nextInt();
                    System.out.println(acabarJoc(codi));
                    break;
                    
                case 6:
                    System.out.println("Sortint...");
                    System.exit(0);
                    break;
                
                default:
                    System.out.println("Opció incorrecta.");
                    break;
            }
        }
    }

    private static String iniciarPartida(int codi) {
        PedraPaperTisores.WebServiceRockPaperScissors_Service service = new PedraPaperTisores.WebServiceRockPaperScissors_Service();
        PedraPaperTisores.WebServiceRockPaperScissors port = service.getWebServiceRockPaperScissorsPort();
        return port.iniciarPartida(codi);
    }
    
    private static String jugarPartida(int codi) {
        PedraPaperTisores.WebServiceRockPaperScissors_Service service = new PedraPaperTisores.WebServiceRockPaperScissors_Service();
        PedraPaperTisores.WebServiceRockPaperScissors port = service.getWebServiceRockPaperScissorsPort();
        return port.jugarPartida(codi);
    }

    private static String consultarEstatPartida(int codi) {
        PedraPaperTisores.WebServiceRockPaperScissors_Service service = new PedraPaperTisores.WebServiceRockPaperScissors_Service();
        PedraPaperTisores.WebServiceRockPaperScissors port = service.getWebServiceRockPaperScissorsPort();
        return port.consultarEstatPartida(codi);
    }

    private static String moureJugador(int codi, int jugador, java.lang.String jugada) {
        PedraPaperTisores.WebServiceRockPaperScissors_Service service = new PedraPaperTisores.WebServiceRockPaperScissors_Service();
        PedraPaperTisores.WebServiceRockPaperScissors port = service.getWebServiceRockPaperScissorsPort();
        return port.moureJugador(codi, jugador, jugada);
    }

    private static String acabarJoc(int codi) {
        PedraPaperTisores.WebServiceRockPaperScissors_Service service = new PedraPaperTisores.WebServiceRockPaperScissors_Service();
        PedraPaperTisores.WebServiceRockPaperScissors port = service.getWebServiceRockPaperScissorsPort();
        return port.acabarJoc(codi);
    }
    
}
