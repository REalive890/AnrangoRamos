window.onload = async function () {
    const res = await fetch('/api/correzione')
    if (res.ok) {
        const result = await res.json();

        const header = document.getElementById("header")
        header.textContent += result.argomento + " di " + result.nome + " in data" + result.data_test

        document.getElementById("risposta1").textContent = result.risposta1
        document.getElementById("risposta1").style.color = (result.giusto1) ? 'Black' : 'Red'

        document.getElementById("risposta2").textContent = result.risposta2
        document.getElementById("risposta2").style.color = (result.giusto2) ? 'Black' : 'Red'

        let punteggio = 0
        if(result.giusto1) punteggio+=5
        if (result.giusto2) punteggio += 5
        document.getElementById("punti").textContent+=punteggio+" punti"
        
    } else {
        console.log("La correzione non è arrivata...")
    }
}