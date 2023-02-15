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

        fetch(`http://localhost:8080/RESTful_JAX_RS_war_exploded/api/daw2/iniciarPartida/${codi}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                document.getElementById('iniciarResposta').innerHTML = result;
            })
            .catch(error => console.log('error', error));
    }

    document.getElementById("moureJugador").onclick = async function () {
        document.getElementById("acabarResposta").innerHTML = '';
        codi = document.getElementById("codi").value;
        jugador = document.getElementById("jugador").value;
        jugada = document.getElementById("jugada").value;

        var requestOptions = {
            method: 'PUT',
            redirect: 'follow'
        };

        const response = await fetch(`http://localhost:8080/RESTful_JAX_RS_war_exploded/api/daw2/moureJugador/${codi}/${jugador}/${jugada}`, requestOptions);
        if (response.ok) {
            const resposta = await response.text();
            document.getElementById("moureJugadorResposta").innerHTML = resposta;
        }
    }

    document.getElementById("jugarPartida").onclick = async function () {
        document.getElementById("moureJugadorResposta").innerHTML = '';
        document.getElementById("consultaResposta").innerHTML = '';
        document.getElementById("acabarResposta").innerHTML = ''
        codi = document.getElementById("codi").value;

        var requestOptions = {
            method: 'PUT',
            redirect: 'follow'
        };

        const response = await fetch(`http://localhost:8080/RESTful_JAX_RS_war_exploded/api/daw2/jugarPartida/${codi}`, requestOptions);
        if (response.ok) {
            const resposta = await response.text();
            document.getElementById("jugarResposta").innerHTML = resposta;
        }
    }

    document.getElementById("consultaPartida").onclick = async function () {
        document.getElementById("acabarResposta").innerHTML = '';
        document.getElementById("jugarResposta").innerHTML = '';
        codi = document.getElementById("codi").value;

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const response = await fetch(`http://localhost:8080/RESTful_JAX_RS_war_exploded/api/daw2/consultarEstatPartida/${codi}`, requestOptions);
        if (response.ok) {
            const resposta = await response.text();
            document.getElementById("consultaResposta").innerHTML = resposta;
        }
    }

    document.getElementById("acabarPartida").onclick = async function () {
        codi = document.getElementById("codi").value;

        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        const response = await fetch(`http://localhost:8080/RESTful_JAX_RS_war_exploded/api/daw2/acabarPartida/${codi}`, requestOptions);
        if (response.ok) {
            const resposta = await response.text();
            document.getElementById("acabarResposta").innerHTML = resposta;
        }
    }
}