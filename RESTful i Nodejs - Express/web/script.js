function inici() {
    let codi;
    let jugador;
    let jugada;

    document.getElementById("iniciarPartida").onclick = function () {
        codi = document.getElementById("codi").value;
        document.getElementById("moureJugadorResposta").innerHTML = '';
        document.getElementById("jugarResposta").innerHTML = '';
        document.getElementById("acabarResposta").innerHTML = '';
        document.getElementById("consultaResposta").innerHTML = '';
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch(`http://localhost:3001/api/iniciarPartida/${codi}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                document.getElementById('iniciarResposta').innerHTML = result;
            })
            .catch(error => console.log('error', error));
    }

    document.getElementById("moureJugador").onclick = async function () {
        codi = document.getElementById("codi").value;
        jugador = document.getElementById("jugador").value;
        jugada = document.getElementById("jugada").value;

        var requestOptions = {
            method: 'PUT',
            redirect: 'follow'
        };

        const response = await fetch(`http://localhost:3001/api/moureJugador/${codi}/${jugador}/${jugada}`, requestOptions);
        if (response.ok) {
            const respostaMoure = await response.text();
            console.log(respostaMoure);
            document.getElementById("moureJugadorResposta").innerHTML = respostaMoure;
        }
    }

    document.getElementById("jugarPartida").onclick = async function () {
        document.getElementById("moureJugadorResposta").innerHTML = '';
        codi = document.getElementById("codi").value;

        var requestOptions = {
            method: 'PUT',
            redirect: 'follow'
        };

        const response = await fetch(`http://localhost:3001/api/jugarPartida/${codi}`, requestOptions);
        if (response.ok) {
            const respostaJugar = await response.text();
            try {
                let partides = [];
                let respostaJugarJSON = JSON.parse(respostaJugar);
                partides.push(respostaJugarJSON);

                var table = "<table class= table table-bordered table-hover table-condensed style='width: 800px; text-align: center'><tr><th>Codi</th><th>Estat</th><th>Jugades J1</th><th>Jugades J2</th><th>Guanyades J1</th><th>Guanyades J2</th><th>Guanyador</th></tr>";
                console.log(partides.length);
                for (var i = 0; i < partides.length; i++) {
                    table += "<tr><td>" + partides[i].codi + "</td><td>" + partides[i].estatPartida + "</td><td>" + partides[i].jugadesJugador1 + "</td><td>" + partides[i].jugadesJugador2 + "</td><td>" + partides[i].wJug1 + "</td><td>" + partides[i].wJug2 + "</td><td>" + partides[i].guanyador + "</td></tr>";
                    if (partides[i].codi == codi) break;
                }
                table += "</table>";
                document.getElementById("jugarResposta").innerHTML = table;
            } catch (err) {
                console.log(err);
                document.getElementById("jugarResposta").innerHTML = respostaJugar;
            }
        }
    }

    document.getElementById("consultaPartida").onclick = async function () {
        codi = document.getElementById("codi").value;

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const response = await fetch(`http://localhost:3001/api/consultarEstatPartida/${codi}`, requestOptions);
        if (response.ok) {
            try {
                const respostaConsulta = await response.text();
                let partides = [];
                let respostaConsultaJSON = JSON.parse(respostaConsulta);
                partides.push(respostaConsultaJSON);

                var table = "<table class= table table-bordered table-hover table-condensed style='width: 800px; text-align: center'><tr><th>Codi</th><th>Estat</th><th>Jugades J1</th><th>Jugades J2</th><th>Guanyades J1</th><th>Guanyades J2</th><th>Guanyador</th></tr>";
                console.log(partides.length);
                for (var i = 0; i < partides.length; i++) {
                    table += "<tr><td>" + partides[i].codi + "</td><td>" + partides[i].estatPartida + "</td><td>" + partides[i].jugadesJugador1 + "</td><td>" + partides[i].jugadesJugador2 + "</td><td>" + partides[i].wJug1 + "</td><td>" + partides[i].wJug2 + "</td><td>" + partides[i].guanyador + "</td></tr>";
                    if (partides[i].codi == codi) break;
                }
                table += "</table>";
                document.getElementById("consultaResposta").innerHTML = table;
            } catch (err) {
                console.log(err);
                document.getElementById("consultaResposta").innerHTML = respostaConsulta;
            }
        }
    }

    document.getElementById("acabarPartida").onclick = async function () {
        codi = document.getElementById("codi").value;

        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        const response = await fetch(`http://localhost:3001/api/acabarPartida/${codi}`, requestOptions);
        if (response.ok) {
            const respostaAcabar = await response.text();
            console.log(respostaAcabar);
            document.getElementById("acabarResposta").innerHTML = respostaAcabar;
        }
    }


}