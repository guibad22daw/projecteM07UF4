function inici() {
    let codi;
    let jugador;
    let jugada;

    document.getElementById("iniciarPartida").onclick = async function () {
        codi = document.getElementById("codi").value;
        document.getElementById("moureJugadorResposta").innerHTML = '';
        document.getElementById("jugarResposta").innerHTML = '';
        document.getElementById("acabarResposta").innerHTML = '';
        document.getElementById("consultaResposta").innerHTML = '';

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var graphql = JSON.stringify({
            query: `mutation {\r\n    iniciarPartida(codi:${codi})\r\n}`,
            variables: {}
        })
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: graphql,
            redirect: 'follow'
        };

        const response = await fetch(`http://localhost:4000/graphql`, requestOptions);
        if (response.ok) {
            const resposta = await response.text();
            document.getElementById("iniciarResposta").innerHTML = resposta;
        }
    }

    document.getElementById("moureJugador").onclick = async function () {
        document.getElementById("acabarResposta").innerHTML = '';
        codi = document.getElementById("codi").value;
        jugador = document.getElementById("jugador").value;
        jugada = document.getElementById("jugada").value;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var graphql = JSON.stringify({
            query: `mutation {\r\n    moureJugador(codi: 123, jugador: ${jugador}, jugada: ${jugada})\r\n}`,
            variables: {}
        })

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: graphql,
            redirect: 'follow'
        };

        const response = await fetch(`http://localhost:4000/graphql`, requestOptions);
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

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var graphql = JSON.stringify({
            query: `mutation {\r\n    jugarPartida(codi:${codi})\r\n}`,
            variables: {}
        })

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: graphql,
            redirect: 'follow'
        };

        const response = await fetch(`http://localhost:4000/graphql`, requestOptions);
        if (response.ok) {
            const resposta = await response.text();
            document.getElementById("jugarResposta").innerHTML = resposta;
        }
    }

    document.getElementById("consultaPartida").onclick = async function () {
        document.getElementById("acabarResposta").innerHTML = '';
        document.getElementById("jugarResposta").innerHTML = '';
        codi = document.getElementById("codi").value;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var graphql = JSON.stringify({
            query: `query {\r\n    consultarEstatPartida(codi:${codi}){\r\n        codi\r\n        jugadesJugador1\r\n        jugadesJugador2\r\n        wJug1\r\n        wJug2\r\n        guanyador\r\n    }\r\n}`,
            variables: {}
        })

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: graphql,
            redirect: 'follow'
        };

        const response = await fetch(`http://localhost:4000/graphql`, requestOptions);
        if (response.ok) {
            const resposta = await response.text();
            document.getElementById("consultaResposta").innerHTML = resposta;
        }
    }

    document.getElementById("acabarPartida").onclick = async function () {
        codi = document.getElementById("codi").value;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var graphql = JSON.stringify({
            query: `mutation {\r\n    acabarPartida(codi:${codi})\r\n}`,
            variables: {}
        })

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: graphql,
            redirect: 'follow'
        };

        const response = await fetch(`http://localhost:4000/graphql`, requestOptions);
        if (response.ok) {
            const resposta = await response.text();
            document.getElementById("acabarResposta").innerHTML = resposta;
        }
    }
}