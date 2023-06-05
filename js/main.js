//Länkar till alla låtar som används, samt antalet visningar (1 = 1 miljon)
//https://www.youtube.com/watch?v=CD-E-LDc384&ab_channel=Metallica                  //Enter Sandman            //594 mil
//https://www.youtube.com/watch?v=9jK-NcRmVcw&ab_channel=EuropeVEVO                 //Final Count Down         //1001 mil
//https://www.youtube.com/watch?v=l5aZJBLAu1E&ab_channel=TheWeatherGirlsVEVO        //It's Raining Men         //81 mil
//https://www.youtube.com/watch?v=XEjLoHdbVeE&ab_channel=AbbaVEVO                   //Gimme! Gimme! Gimme!     //387 mil
//https://www.youtube.com/watch?v=0J2QdDbelmY&ab_channel=TheWhiteStripes            //White Stripes            //563 mil
//https://www.youtube.com/watch?v=0qanF-91aJo&ab_channel=BlackSabbath               //Paranoid                 //210 mil
//https://www.youtube.com/watch?v=O4irXQhgMqg&ab_channel=ABKCOVEVO                  //Paint it Black           //459 mil
//https://www.youtube.com/watch?v=oVWEb-At8yc&ab_channel=Sabaton                    //Bismark                  //76 mil
//https://www.youtube.com/watch?v=4-43lLKaqBQ&ab_channel=TheAnimalsTributeChannel   //House of the Rising Sun  //212 mil
//https://www.youtube.com/watch?v=N8NcQzMQN_U&ab_channel=JoseFelicianoVEVO          //Feliz Navidad            //29 mil

//Denna funktion väljer på random en av de tio videorna
//Det är videornas id, så man kan med hjälp av dom-script lätt
//Lägga till dom i API requesten
function vilkenVideo(){
    const videoIds = [
        "CD-E-LDc384",
        "9jK-NcRmVcw",
        "l5aZJBLAu1E",
        "XEjLoHdbVeE",
        "0J2QdDbelmY",
        "0qanF-91aJo",
        "O4irXQhgMqg",
        "oVWEb-At8yc",
        "4-43lLKaqBQ",
        "N8NcQzMQN_U",
    ]
    const randomIndex = Math.floor(Math.random() * videoIds.length);
    return videoIds[randomIndex];
}

//YoutTube API Key
const apiKey = 'AIzaSyCSFeEL7iEZxBxXvWY8iJHHUeSqKsQNtcQ';

//Definerar visnings variablerna
//Originellt så tänkte jag ta antalet visningar från API datan,
//Men den skickades ej med i datan.
let visningar1 = 0
let visningar2 = 0

//Detta är main funktinen, det är den som innehåller hela programets funktion
//Denna körs när man trycker på starta knappen
function run(){

    //Eftersom koden ska köras flera gånger så finns denna kod för att "återställa" elementens värden
    //.innerHTML = ""; byter ut innehållet av element med ingenting
    //.insertAdjacentHTML() lägger till värde i elementen
    //.classList.remove() tar bort ett element från en class, i detta fall så är det en start/stop för animationen
    document.querySelector("#lite-info1").innerHTML = '';
    document.querySelector("#lite-info2").innerHTML = '';
    document.querySelector("#lite-info1").insertAdjacentHTML("beforeend", "Lite info om video 1")
    document.querySelector("#lite-info2").insertAdjacentHTML("beforeend", "Lite info om video 2")
    document.querySelector("#vänster").classList.remove("animation-grön")
    document.querySelector("#vänster").classList.remove("animation-röd")
    document.querySelector("#höger").classList.remove("animation-grön")
    document.querySelector("#höger").classList.remove("animation-röd")
    document.querySelector("#main-info").innerHTML = ""
    document.querySelector("#main-info").insertAdjacentHTML("beforeend", "Du ska gissa vilken av dessa låtar som har mest visningar på YouTube")
    document.querySelector("#ul1").innerHTML = '';
    document.querySelector("#ul2").innerHTML = '';

    //Väljer ett video ID och tilldelaren den till en variabel
    let video1 = vilkenVideo()
    let video2 = vilkenVideo()

    //Kollar om både video1 och video2 har samma video ID
    if (video1 === video2) {
        var sammaQ = true
    }
    else{

    }

    //Ifall det har det så körs denna loop som inte köra om och om igen så länge de har samma video ID
    while (sammaQ === true) {
        video2 = vilkenVideo()
        if (video1 === video2) {
        sammaQ = true
        }
        else{
            sammaQ = false
        }
    }

    //Detta är funktionen för den vänstra sidan
    function funktion1(){

        //API requesten, video1 är video ID oc apikey är API nyckeln
        fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${video1}&key=${apiKey}`)
            .then(res => {
                //Datan från API:n
                return res.json();
            })
            .then(data => {
                //Tar Kanal titel, publiseringsdatum och video titel
                //och sedan så tilldelas dem en variabel
                let tumnagel = data.items[0].snippet.thumbnails.high.url;
                let kanal = `<li>Kanal: ${data.items[0].snippet.channelTitle}</li><br>`;
                let datum = `<li>Datum: ${data.items[0].snippet.publishedAt}</li><br>`;
                let titel = `<li>Titel: ${data.items[0].snippet.title}</li>`;
                var bild1 = document.getElementById("img1")
;
                //Här läggs datan till på sidan i #ul1
                bild1.src = tumnagel
                document.querySelector("#ul1").insertAdjacentHTML("beforeend", kanal)
                document.querySelector("#ul1").insertAdjacentHTML("beforeend", datum)
                document.querySelector("#ul1").insertAdjacentHTML("beforeend", titel)                                                                                                      
            })
    }

    //Detta är funktionen för den högra sidan
    function funktion2(){

        //API requesten, video1 är video ID oc apikey är API nyckeln
        fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${video2}&key=${apiKey}`)
            .then(res => {
                //Datan från API:n
                return res.json();
            })
            .then(data => {
                //Tar Kanal titel, publiseringsdatum och video titel
                //och sedan så tilldelas dem en variabel
                let tumnagel = data.items[0].snippet.thumbnails.high.url;
                let kanal = `<li>Kanal: ${data.items[0].snippet.channelTitle}</li><br>`;
                let datum = `<li>Datum: ${data.items[0].snippet.publishedAt}</li><br>`;
                let titel = `<li>Titel: ${data.items[0].snippet.title}</li>`;
                var bild2 = document.getElementById("img2")

                //Här läggs datan till på sidan i #ul1
                bild2.src = tumnagel
                document.querySelector("#ul2").insertAdjacentHTML("beforeend", kanal, "\n")
                document.querySelector("#ul2").insertAdjacentHTML("beforeend", datum, "\n")
                document.querySelector("#ul2").insertAdjacentHTML("beforeend", titel, "\n")
            })
    }

    //Kör funktion ett och två
    funktion1()
    funktion2()
    
    //Video1
    //Om video är lika med X id så har den så här många visningar
    //Detta gör jag då antalet visningar inte skickas med datan från YouTube API:n
    if (video1 === "CD-E-LDc384"){
        visningar1 = 594
    }
    else if (video1 === "9jK-NcRmVcw"){
        visningar1 = 1001
    }
    else if (video1 === "l5aZJBLAu1E"){
        visningar1 = 81
    }
    else if (video1 === "XEjLoHdbVeE"){
        visningar1 = 387
    }
    else if (video1 === "0J2QdDbelmY"){
        visningar1 = 563
    }
    else if (video1 === "0qanF-91aJo"){
        visningar1 = 210
    }
    else if (video1 === "O4irXQhgMqg"){
        visningar1 = 459
    }
    else if (video1 === "oVWEb-At8yc"){
        visningar1 = 76
    }
    else if (video1 === "4-43lLKaqBQ"){
        visningar1 = 212
    }
    else if (video1 === "N8NcQzMQN_U"){
        visningar1 = 29
    }
    
    
    //Video 2
    //Om video är lika med X id så har den så här många visningar
    //Detta gör jag då antalet visningar inte skickas med datan från YouTube API:n
    if (video2 === "CD-E-LDc384"){
        visningar2 = 594
    }
    else if (video2 === "9jK-NcRmVcw"){
        visningar2 = 1001
    }
    else if (video2 === "l5aZJBLAu1E"){
        visningar2 = 81
    }
    else if (video2 === "XEjLoHdbVeE"){
        visningar2 = 387
    }
    else if (video2 === "0J2QdDbelmY"){
        visningar2 = 563
    }
    else if (video2 === "0qanF-91aJo"){
        visningar2 = 210
    }
    else if (video2 === "O4irXQhgMqg"){
        visningar2 = 459
    }
    else if (video2 === "oVWEb-At8yc"){
        visningar2 = 76
    }
    else if (video2 === "4-43lLKaqBQ"){
        visningar2 = 212
    }
    else if (video2 === "N8NcQzMQN_U"){
        visningar2 = 29
    }
    
}

//Om du trycker på den vänstra knappen
function rättVideoBTN1(){
    //Om visningar 1 är större än visningar 2 så har du rätt
    if (visningar1 > visningar2) {

        //Tar bort innehållet på elementet med ID main-info och sedan byter ut mot "Du gissade rätt!"
        document.querySelector("#main-info").innerHTML = ""
        document.querySelector("#main-info").insertAdjacentHTML("beforeend", "Du gissade rätt! Tryck på börja för att köra igen")

        //Startar animationerna
        //Animation grön byter bakgrunden från gul till grön
        //Animation grön byter bakgrunden från gul till röd
        //Eftersom CSS animationer behöver en klass eller ett id för att kuna göra ändringar så har jag skapat animationer -
        //- I till Dessa klasser i förväg, så när denna kod ger elementen dessa klasser så startas animationen automatiskt
        document.querySelector("#vänster").classList.add("animation-grön")
        document.querySelector("#höger").classList.add("animation-röd")

        //Byter ut "lite info om video 1/2" mot antalet visningar den videon har
        document.querySelector("#lite-info1").innerHTML = ""
        document.querySelector("#lite-info2").innerHTML = ""
        document.querySelector("#lite-info1").insertAdjacentHTML("beforeend", `${visningar1} miljoner visningar`)
        document.querySelector("#lite-info2").insertAdjacentHTML("beforeend", `${visningar2} miljoner visningar`)

    }
    //Om visningar 2 är större än visningar 1 så har du fel
    else if (visningar2> visningar1) {

        //Tar bort innehållet på elementet med ID main-info och sedan byter ut mot "Du gissade fel!"
        document.querySelector("#main-info").innerHTML = ""
        document.querySelector("#main-info").insertAdjacentHTML("beforeend", "Du gissade fel! Tryck på börja för att köra igen")

        //Startar animationerna
        //Animation grön byter bakgrunden från gul till grön
        //Animation grön byter bakgrunden från gul till röd
        //Eftersom CSS animationer behöver en klass eller ett id för att kuna göra ändringar så har jag skapat animationer -
        //- I till Dessa klasser i förväg, så när denna kod ger elementen dessa klasser så startas animationen automatiskt
        document.querySelector("#höger").classList.add("animation-grön")
        document.querySelector("#vänster").classList.add("animation-röd")

        //Byter ut "lite info om video 1/2" mot antalet visningar den videon har
        document.querySelector("#lite-info1").innerHTML = ""
        document.querySelector("#lite-info2").innerHTML = ""
        document.querySelector("#lite-info1").insertAdjacentHTML("beforeend", `${visningar1} miljoner visningar`)
        document.querySelector("#lite-info2").insertAdjacentHTML("beforeend", `${visningar2} miljoner visningar`)
    }
}

//Om du trycker på den högra knappen
function rättVideoBTN2(){
    //Om visningar 2 är större än visningar 1 så har du rätt
    if (visningar2 > visningar1) {

        //Tar bort innehållet på elementet med ID main-info och sedan byter ut mot "Du gissade rätt!"
        document.querySelector("#main-info").innerHTML = ""
        document.querySelector("#main-info").insertAdjacentHTML("beforeend", "Du gissade rätt! Tryck på börja för att köra igen")

        //Startar animationerna
        //Animation grön byter bakgrunden från gul till grön
        //Animation grön byter bakgrunden från gul till röd
        //Eftersom CSS animationer behöver en klass eller ett id för att kuna göra ändringar så har jag skapat animationer -
        //- I till Dessa klasser i förväg, så när denna kod ger elementen dessa klasser så startas animationen automatiskt
        document.querySelector("#höger").classList.add("animation-grön")
        document.querySelector("#vänster").classList.add("animation-röd")

        //Byter ut "lite info om video 1/2" mot antalet visningar den videon har
        document.querySelector("#lite-info1").innerHTML = ""
        document.querySelector("#lite-info2").innerHTML = ""
        document.querySelector("#lite-info1").insertAdjacentHTML("beforeend", `${visningar1} miljoner visningar`)
        document.querySelector("#lite-info2").insertAdjacentHTML("beforeend", `${visningar2} miljoner visningar`)
    }
    //Om visningar 1 är större än visningar 2 så har du fel
    else if (visningar1 > visningar2) {

        //Tar bort innehållet på elementet med ID main-info och sedan byter ut mot "Du gissade fel!"
        document.querySelector("#main-info").innerHTML = ""
        document.querySelector("#main-info").insertAdjacentHTML("beforeend", "Du gissade fel! Tryck på börja för att köra igen")

        //Startar animationerna
        //Animation grön byter bakgrunden från gul till grön
        //Animation grön byter bakgrunden från gul till röd
        //Eftersom CSS animationer behöver en klass eller ett id för att kuna göra ändringar så har jag skapat animationer -
        //- I till Dessa klasser i förväg, så när denna kod ger elementen dessa klasser så startas animationen automatiskt
        document.querySelector("#vänster").classList.add("animation-grön")
        document.querySelector("#höger").classList.add("animation-röd")

        //Byter ut "lite info om video 1/2" mot antalet visningar den videon har
        document.querySelector("#lite-info1").innerHTML = ""
        document.querySelector("#lite-info2").innerHTML = ""
        document.querySelector("#lite-info1").insertAdjacentHTML("beforeend", `${visningar1} miljoner visningar`)
        document.querySelector("#lite-info2").insertAdjacentHTML("beforeend", `${visningar2} miljoner visningar`)
    }
}
