/* FORMULARIO */
$(document).ready(function() {
    $("#basic-form").validate({
        rules: {
            name : {
                required: true,
                minlength: 3
            },
            age: {
                required: true,
                number: true,
                min: 18
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                number: true,
                minlength: 9,
                maxlength : 9
            }
        },
        messages : {
            name: {
                required: "Por favor introduce tu nombre",
                minlength: "El nombre debe tener al menos 3 caracteres"
            },
            age: {
                required: "Por favor introduce tu edad",
                number: "Debes introducir tu edad con un valor numérico",
                min: "Debes tener al menos 18 años"
            },
            email: {
                required: "Por favor introduce tu e-mail",
                email: "El e-mail debe estar en formato: abc@dominio.tld"
            },
            phone: {
                required: "Por favor introduce tu teléfono",
                number: "Debes introducir tu teléfono con un valor numérico",
                minlength: "El teléfono debe tener 9 dígitos",
                maxlength: "El teléfono debe tener 9 dígitos"
            }
        }
    });
});

/* CATEGORÍAS */
$.ajax({
    url: "../json/datos.json",
    timeout:5000,
    success: function (response) {
        $.each(response.productos, function (index, el) { 
            const div = $('<div>').attr("class", "categoria");
            const titulo = $('<h3>').text(el.titulo);
            const link = $('<a>').text("Enlace").attr('href', el.link).attr('title', el.titulo).attr('target', "_blank");
            const imagen = $('<img>').attr('src', el.imagen);
            $('.categorias').append(div);
            $(div)
            .append(imagen)
            .append(titulo)
            .append(link);
        });
        
    },error: function() {
        alert("No se han podido obtener las categorías");
    }
});

/* TESTIMONIOS */
let arrayTestimonios=[];
$.ajax({
    url: "../json/datos.json",
    timeout: 5000,
    success: function (response) {
        $.each(response.testimonios, function (index, el) {
            const div = $('<div>').attr("class", "testimonio");
            const nombre = $('<h3>').text(el.nombre);
            const texto = $('<p>').text(el.texto).attr('id', 'texto');
            const fecha = $('<p>').text(el.fecha).attr('id', 'fecha');
            const imagen = $('<img>').attr('src', el.imagen);
            $(div)
            .append(imagen)
            .append(nombre)
            .append(texto)
            .append(fecha);
            arrayTestimonios.push(div);
        });
        function elegirTestimonios() {
            $('.testimonios').empty();
            let arrayAleatorio=[];
            for (let i = 0; i < 3; i++) {
                let aleatorio = Math.floor(Math.random() * (arrayTestimonios.length));
                arrayAleatorio.push(aleatorio);
            }
            for (let i = 0; i < arrayAleatorio.length; i++) {
                $('.testimonios').append(arrayTestimonios[arrayAleatorio[i]]);
            }
        }
        elegirTestimonios();
    },error: function() {
        alert("No se han podido obtener los testimonios");
    }
});

/* VOLVER INICIO PÁGINA */
$(document).ready(function() {
	$(window).scroll(function() {
		if ($(this).scrollTop() > 0) {
			$('#inicio').fadeIn();
		} else {
			$('#inicio').fadeOut();
		}
	});
	$('#inicio').click(function() {
		$('body,html').animate ({
			scrollTop: 0
		}, 400);
		return false;
    });
    $('#logo').click(function() {
        $('body,html').animate ({
	    	scrollTop: 0
		}, 400);
		return false;
    });
});

/* OBTENER LOCALIDAD */
navigator.geolocation.getCurrentPosition(success, error);
function success(position) {
	let coord = position.coords;
	$.ajax(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAzpqqTMMfGLgzeMm3_mIi3i2a8CsB5LlA&address=${coord.latitude},${coord.longitude}`)
	.done((response) => {
		console.log("El usuario está accediendo a la web desde " + response.results[0].address_components[2].long_name);
	})
	.fail((error) => {
		console.warn(error);
	});
}
function error(error) {
	console.warn(`ERROR(${error.code}): ${error.message}`);
}
