window.onload = async function () {
    const ulDomande = document.getElementById('ulDomande');
    const response = await fetch('/api/domande');
    const domande = await response.json();
    domande.forEach(domanda => {

        const li = document.createElement('li');
        li.textContent = domanda.testo;

        
        const a = document.createElement('input');
        a.type = 'radio';
        a.name = 'domanda' + domanda._id;
        a.value = "a";

        li.appendChild(a);
        li.innerHTML += domanda.opz_a;

        const b = document.createElement('input');
        b.type = 'radio';
        b.name = 'domanda' + domanda._id;
        b.value = "b";
        li.appendChild(b);
        li.innerHTML += domanda.opz_b;

        const c = document.createElement('input');
        c.type = 'radio';
        c.name = 'domanda' + domanda._id;
        c.value = "c";
        li.appendChild(c);
        li.innerHTML += domanda.opz_c;

        ulDomande.appendChild(li);
    });
    document.getElementById('invia').addEventListener('click', async function () {

        const risposte = {
            iddomanda1: parseInt(domande[0]._id),
            risposta1: document.querySelector('input[name="domanda' + domande[0]._id + '"]:checked').value,
            iddomanda2: parseInt(domande[1]._id),
            risposta2: document.querySelector('input[name="domanda' + domande[1]._id + '"]:checked').value,
        }
        console.log(risposte)
        var res = await fetch('/api/risposte', {
            method: "POST",
            body: JSON.stringify(risposte),
            headers: {
                'Content-Type': 'application/json' // Crucial for the server to read the body
            }
        })
        if (res.ok) {

            const result = await res.json();
            console.log(result);
            location.assign("/questionnaire/correzione");
        }

    });
}