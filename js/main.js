//INICIO SOFTWARE


(function () {

    document.addEventListener('DOMContentLoaded',iniciar,false);

    function iniciar() {
        //****************************** Eventos  **********************************//
        var video=document.getElementsByTagName('video')[0];
        video.addEventListener('click',aplicacion.clickVideo,false);
        window.addEventListener('keypress',aplicacion.teclaVideo,false);
        video.addEventListener('mouseenter',aplicacion.mostrarControles,false);
        //video.addEventListener('mouseleave',aplicacion.ocultarControles,false);
        video.addEventListener('loadedmetadata',aplicacion.cargar_metadata);
        video.addEventListener('timeupdate', aplicacion.tiempo_update );
        var paraVideo = document.getElementById('play');
        paraVideo.addEventListener('click',aplicacion.pararVideo,false);
        paraVideo.parentNode.previousElementSibling.lastElementChild.addEventListener('click',aplicacion.subirVolumen,false);
        paraVideo.parentNode.previousElementSibling.lastElementChild.addEventListener('mouseenter',aplicacion.volumenStatusIN,false);
        paraVideo.parentNode.previousElementSibling.firstElementChild.addEventListener('mouseenter',aplicacion.volumenStatusIN,false);
        paraVideo.parentNode.previousElementSibling.firstElementChild.addEventListener('click',aplicacion.bajarVolumen,false);
        paraVideo.parentNode.previousElementSibling.lastElementChild.previousElementSibling.addEventListener('mouseenter',aplicacion.volumenStatusIN,false);
        paraVideo.parentNode.previousElementSibling.lastElementChild.previousElementSibling.addEventListener('click',aplicacion.rangeAudio,false);
        paraVideo.previousElementSibling.addEventListener('click',aplicacion.moverAtras,false);
        paraVideo.nextElementSibling.addEventListener('click',aplicacion.moverDelante,false);
        video.nextElementSibling.firstElementChild.lastElementChild.lastElementChild.previousElementSibling.addEventListener('click',aplicacion.rangeVideo,false);
        paraVideo.parentNode.nextElementSibling.addEventListener('click',aplicacion.entrarFullScreen,false);

    }


    var aplicacion = (function(){
        //****************************** Variable global de video **********************************//

        var video=document.getElementsByTagName('video')[0];

        //****************************** Función para parar y pausar el video, ademas cambia el icono **********************************//

        function pausaPlay() {
            var paraVideo = video.nextElementSibling.firstElementChild.firstElementChild.lastElementChild.previousElementSibling.lastElementChild.previousElementSibling;
            if (video.paused) {
                video.play();
                paraVideo.src = "images/ff.svg";
            } else {
                video.pause();
                paraVideo.src = "images/play.svg";
            }
        }

        //****************************** Función recoge el evento click al pulsar sobre el video y la envia a otra **********************************//

        function clickVideo(e){
            //console.log(e);
            //console.log(e.target);
            pausaPlay();


        }

        //****************************** Función recoge la tecla pulsada, la evalua y la envia a otra fn **********************************//

        function teclaVideo(e){
            //console.log(e);
            //console.log(e.target);
            //console.log(e.keyCode);
            if(e.keyCode == 32){
                pausaPlay();
            } else {
                //console.log("tecla erronea");
                //console.log(e.keyCode);

            }

        }



        //****************************** Funcion para ver el tiempo total y mostrarlo en hh:mm:ss **********************************//
        function cargar_metadata(e){
            var tamanovideo = video.nextElementSibling.firstElementChild.lastElementChild.lastElementChild;
            var horas = Math.floor( video.duration / 3600);
            var minutos =Math.floor(video.duration/60);
            var segundos = Math.floor(video.duration % 60);
            //Pone un cero delante del número si es menor que 10
            minutos = minutos < 10 ? '0' + minutos : minutos;
            //Pone un cero delante del número si es menor que 10
            segundos = segundos < 10 ? '0' + segundos : segundos;
            tamanovideo.textContent = horas + ":"+ minutos + ":" + segundos;
            //console.log(video.currentTime);

        }

        //****************************** Funcion para entrar en modo pantalla completa y ocultar los controles **********************************//
        function entrarFullScreen(e){
            //console.log("maximizar");
            var caja = video.parentNode;
            if(caja.requestFullScreen){
                caja.requestFullScreen();

            } else if(caja.webkitRequestFullScreen){
                caja.webkitRequestFullScreen();

            } else if(caja.mozRequestFullScreen){
                caja.mozRequestFullScreen();

            };

            /*if(video.requestFullScreen){
                video.requestFullScreen();

            } else if(video.webkitRequestFullScreen){
                video.webkitRequestFullScreen();

            } else if(video.mozRequestFullScreen){
                video.mozRequestFullScreen();

            };*/

            // Oculta los controles.
            setTimeout(function (){
                video.nextElementSibling.style.display="none";

            }, 2000)

        }

        //****************************** Muestra los controles y los vuelve a ocultar **********************************//
        function mostrarControles() {
            video.nextElementSibling.style.display="block";
            console.log("activado");
            /*setTimeout(function (){
                document.getElementById('caja-contenedor').style.display="none";

            }, 5000)*/

        }
        //****************************** Intento de saber si estoy en modo fullscreen **********************************//
       /*function ocultarControles() {
            var caja = document.getElementById('caja-contenedor');//.style.display="none";
            var element = window.fullscreenElement;
            console.log("que soy " + element);
            console.log("ocultar");

        }*/

        //****************************** Funcion que muestra el tiempo que va transcurriendo y lo pinta en el range y en el span **********************************//
        function tiempo_update() {

            var currenttime = video.nextElementSibling.lastElementChild.previousElementSibling;
            var rango_tiempo = video.nextElementSibling.firstElementChild.lastElementChild.lastElementChild.previousElementSibling;
            var tiempotranscurrido = video.nextElementSibling.firstElementChild.lastElementChild.firstElementChild;
            rango_tiempo.max=video.duration;
            currenttime.textContent = "Video Mostrado segundo: " + Math.floor(video.currentTime);
            rango_tiempo.value=video.currentTime;

            // Si el estado del video es distinto de pausado lanza el setInterval si el estado es pausado muestra un mensaje.

            if (!video.paused){
                var intervalo_tiempo = setInterval(function(){
                    //console.log(video.currentTime);
                    var horas = Math.floor( video.currentTime / 3600 );
                    var minutos =Math.floor(video.currentTime/60);
                    var segundos = Math.floor(video.currentTime % 60);
                    //Anteponiendo un 0 a los minutos si son menos de 10
                    minutos = minutos < 10 ? '0' + minutos : minutos;
                    //Anteponiendo un 0 a los segundos si son menos de 10
                    segundos = segundos < 10 ? '0' + segundos : segundos;
                    tiempotranscurrido.textContent = horas + ":"+ minutos + ":" + segundos;
                    comprobarTiempo(intervalo_tiempo);

                },500)

            } else {
                //console.log("parado");
            }

        }
        //****************************** Si cuando llego aqui soy igual al final o estoy pausado paro el intervalo para evitar bucles infinitos. **********************************//
        function comprobarTiempo(intervalo_tiempo){

            if(video.currentTime == video.duration || video.paused){
                clearInterval(intervalo_tiempo);
                //console.log("intervalo_parado");

            }

        }
        //****************************** Reproduce o pausa el video segun la pulsacion y cambia su imagen. **********************************//
        function pararVideo (e){
            console.log(e);
            console.log(e.target);
            if (video.paused) {
                video.play();
                e.target.src = "images/ff.svg";
            } else {
                video.pause();
                e.target.src = "images/play.svg";
            }



        }
        //****************************** Reproduce o pausa el video segun la pulsacion y cambia su imagen. **********************************//
        function subirVolumen (e){
            sonido=rango_vol.value;
            sonido = parseFloat(sonido);
            //console.log(sonido);
            if(rango_vol.value != 1){
                sonido += 0.04;
                rango_vol.value=sonido;
                video.volume=sonido;
                //console.log(sonido);

            } else {

                //console.log("total del volumen");
            }

        }
        //****************************** Reproduce o pausa el video segun la pulsacion y cambia su imagen. **********************************//
        function bajarVolumen (e){

            sonido=rango_vol.value;
            sonido = parseFloat(sonido);
            //console.log(sonido);
            if(rango_vol.value != 0){
                sonido -= 0.04;
                rango_vol.value=sonido;
                video.volume=sonido;
                console.log(sonido);

            } else {

                //console.log("vol 0");
            }

        }

        //****************************** Rango del audio. **********************************//

        function rangeAudio (){

            video.volume=rango_vol.value;
            //console.log(rango_vol.value);
        }


        //****************************** Rango del video. **********************************//

        function rangeVideo () {
            var rango_tiempo = video.nextElementSibling.firstElementChild.lastElementChild.lastElementChild.previousElementSibling;

           //console.log("rangetiempo");
           //console.log(rango_tiempo.value);
            //console.log(video.currentTime);
            video.currentTime = rango_tiempo.value;

        }

        //****************************** Retrocede el video . **********************************//

        function moverAtras () {

            //console.log(rango_tiempo.value);
            var tiempo= parseFloat(rango_tiempo.value);
            tiempo = tiempo - 0.99;
            rango_tiempo.value = tiempo;
            video.currentTime = tiempo;
            //console.log(tiempo);

        }


        //****************************** Avanza el video con el boton. **********************************//

        function moverDelante () {

            //console.log(rango_tiempo.value);
            var tiempo= parseFloat(rango_tiempo.value);
            tiempo = tiempo + 0.99;
            rango_tiempo.value=tiempo;
            video.currentTime = tiempo;
            //console.log(tiempo);

        }

        //****************************** Muestra el estado del volumen . **********************************//

        function volumenStatusIN() {

            video.nextElementSibling.lastElementChild.textContent = "Vol " + Math.floor(video.volume * 100) + "%";
            setTimeout(function(){
                video.nextElementSibling.lastElementChild.textContent = "";
            },2000)
        }


        //****************************** Return para el acceso a la aplicacion. **********************************//

        return {
            moverDelante:moverDelante,
            moverAtras: moverAtras,
            volumenStatusIN : volumenStatusIN,
            moverAtras : moverAtras,
            rangeVideo:rangeVideo,
            rangeAudio:rangeAudio,
            bajarVolumen:bajarVolumen,
            subirVolumen:subirVolumen,
            pararVideo:pararVideo,
            comprobarTiempo:comprobarTiempo,
            tiempo_update: tiempo_update,
            clickVideo:clickVideo,
            teclaVideo:teclaVideo,
            cargar_metadata:cargar_metadata,
            entrarFullScreen:entrarFullScreen,
            mostrarControles:mostrarControles,


        }

    })();



})();
