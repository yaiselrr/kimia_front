import Swal from "sweetalert2";
import axios from "axios";

export function mostrarAlerta(titulo, icono, foco = "") {
  if (foco != "") {
    document.getElementById(foco).focus();
  }

  Swal.fire({
    title: titulo,
    icon: icono,
    customClass: { confirmButton: "btn btn-primary", popup: "animated zoonIn" },
    buttonsStyling: false,
  });
}

export function confirmar(id, titulo, mensaje, url, path) {
  const swalWithBootstrapButton = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success me-3",
      cancelButton: "btn btn-danger",
    },
  });

  swalWithBootstrapButton
    .fire({
      title: titulo,
      text: mensaje,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: '<i class="fa-solid fa-check"></i> Yes, delete',
      cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancel',
    })
    .then((res) => {
      if (res.isConfirmed) {
        enviarSolicitudEliminar("Deleted success", url, path);
      } else {
        mostrarAlerta("Operation cancel", "info");
      }
    });
}

export function enviarSolicitudEliminar(mensaje, url, path) {
  axios({ method: "POST", url: url })
    .then(function (response) {
      if (response.status == 204 && response.data == "") {
        mostrarAlerta(mensaje, "success");
        window.setTimeout(function () {
          window.location.href = path;
        }, 1000);
      } else {
        mostrarAlerta("No se pudo recuperar la respuesta", "error");
      }
    })
    .catch(function (error) {
      mostrarAlerta(error.message, "error");
    });
}
export function enviarSolicitudCreate(parametros,mensaje, url, path) {
  axios({method:"POST",url:url,data:parametros}).then(function(res){
      var estado = res.status;

      if (estado == 201) {
          mostrarAlerta(mensaje,'success');
          window.setTimeout(function(){
              window.location.href= path
          },1000);
      }else{
          mostrarAlerta('No se pudo registrar los datos correctamente','error');
      }
  }).catch(function(error){
      mostrarAlerta('Servidor no disponible','error');
  });
}
export function backTeam() {
  window.location.href='listT/'
}
export function enviarSolicitudUpdate(parametros,mensaje, url, path) {
  axios({method:"POST" ,url: url, data:parametros}).then(function(res){
      var estado = res.status;

      if (estado == 200) {
          mostrarAlerta(mensaje,'success');
          window.setTimeout(function(){
              window.location.href=path
          },1000);
      }else{
          mostrarAlerta('No se pudo registrar el equipo','error');
      }
  }).catch(function(error){
      mostrarAlerta('Servidor no disponible','error');
  });
}
