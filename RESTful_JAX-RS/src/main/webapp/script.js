function inici() {
    let codi;
    let jugador;
    let jugada;

    document.getElementById("iniciarPartida").onclick = function () {
        codi = document.getElementById("codi").value;
        neteja();
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
        neteja();
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
        neteja();
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
        neteja();
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
        neteja();
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

    function neteja() {
        document.getElementById("iniciarResposta").innerHTML = '';
        document.getElementById("jugarResposta").innerHTML = '';
        document.getElementById("moureJugadorResposta").innerHTML = '';
        document.getElementById("consultaResposta").innerHTML = '';
        document.getElementById("acabarResposta").innerHTML = '';
    }
}