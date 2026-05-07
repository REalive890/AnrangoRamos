window.onload = async function () {
    const response = await fetch('/api/argomenti');
    const argomenti = await response.json();
    console.log(argomenti);
    const select = document.getElementById('argomenti');
    argomenti.forEach(argomento => {
        const option = document.createElement('option');
        option.value = argomento._id;
        option.textContent = argomento.argomento;
        select.appendChild(option);
    });
    document.getElementById('invia').addEventListener('click', async function () {
        const argomentoSelezionato = document.getElementById('argomenti').value;
        console.log(argomentoSelezionato)
        const res = await fetch('/api/session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Crucial for the server to read the body
            },
            body: JSON.stringify({
                nome: document.getElementById("nome").value,
                id_argomento: parseInt(argomentoSelezionato)
            }),
        })
        if (res.ok) {
            const result = await res.json();
            console.log(result);
             location.assign("/questionnaire/domande");
        } else {
            console.error("Server error:", res.statusText);
        }
    })
}