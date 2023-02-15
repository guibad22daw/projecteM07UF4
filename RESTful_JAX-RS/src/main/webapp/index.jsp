<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <script type="text/javascript" src="script.js"></script>
    <style>
        body {
            margin: 20px;
        }

        #iniciarPartida {
            border-top-left-radius: 0 !important;
            border-top-right-radius: 8px;
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 8px;
        }

        #moureJugador {
            border-top-left-radius: 0 !important;
            border-top-right-radius: 8px;
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 8px;
        }

        #moureJugadorResposta, #jugarResposta, #acabarResposta, #consultaResposta {
            margin-top: 15px;
        }

        table {
            border: 1px solid black;
            margin-top: 20px;
        }
    </style>
</head>
<body onload="inici()">
<h2>Pedra, paper, tisores</h2> <br>
<h6 for="codi">Codi:</h6>
<div class="input-group mb-3" style="width: 300px">
    <input id="codi" class="form-control" name="codi" type="number" placeholder="Codi..." required>
    <div class="input-group-append">
        <button class="btn btn-primary" id="iniciarPartida" name="iniciarPartida" type="button">Iniciar partida</button>
    </div>
</div>
<div id="iniciarResposta"></div><br>

<h6 for="jugador">Jugador:</h6>
<select class="form-select" name="jugador" id="jugador" style="width: 70px;">
    <option value="1" selected>1</option>
    <option value="2">2</option>
</select>

<br>

<h6 for="jugada">Jugada:</h6>
<div class="input-group" style="width: 300px">
    <select class="form-select" id="jugada">
        <option value="pedra" selected>Pedra</option>
        <option value="paper">Paper</option>
        <option value="tisores">Tisores</option>
    </select>
    <div class="input-group-append">
        <button class="btn btn-primary" id="moureJugador">Seleccionar jugada</button>
    </div>
</div>
<div id="moureJugadorResposta"></div><br>
<br>

<button class="btn btn-primary" id="jugarPartida">Jugar partida</button>
<div id="jugarResposta"></div><br><br>

<button class="btn btn-primary" id="consultaPartida">Consulta estat partida</button>
<div id="consultaResposta"></div><br><br>

<button class="btn btn-danger" id="acabarPartida">Acabar partida</button>
<div id="acabarResposta"></div><br>
</body>
</html>