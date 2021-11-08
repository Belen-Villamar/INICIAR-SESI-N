if(document.querySelector('.contenedor-slider')){

    let index=1;
    let selectedIndex=1;

    const slides=document.querySelector('.slider');
    const slide=slides.children;
    const slidesTotal=slides.childElementCount;

    const dots=document.querySelector('.dots');
    const prev=document.querySelector('.prev');
    const next=document.querySelector('.next');

    for (let i = 0; i < slidesTotal; i++) {
        dots.innerHTML +='<span class="dot"></span>';
    }
 
    mostrarSlider(index);
    setInterval(()=>{
        mostrarSlider(index=selectedIndex);
    },5000); 
    function mostrarSlider(num){
        if(selectedIndex > slidesTotal){
            selectedIndex=1;
        }else{
            selectedIndex++;
        }

        if(num > slidesTotal){
            index=1;
        }

        if(num<1){
            index=slidesTotal;
        }

        for(let i=0; i<slidesTotal;i++){
            slide[i].classList.remove('active');
        }


        for (let x = 0; x < dots.children.length; x++) {
            dots.children[x].classList.remove('active');
        }

        slide[index-1].classList.add('active');
        dots.children[index-1].classList.add('active');   
    }
    next.addEventListener('click',(e)=>{
        mostrarSlider(index +=1);
        selectedIndex=index;
    });

    prev.addEventListener('click',(e)=>{
        mostrarSlider(index +=-1);
        selectedIndex=index;
    });
    for (let y = 0; y < dots.children.length; y++) {
        dots.children[y].addEventListener('click',()=>{
            mostrarSlider(index=y+1);
            selectedIndex=y+1;
        });
    }

}

const tabLink=document.querySelectorAll('.tab-link');
const formularios=document.querySelectorAll('.formulario');

for (let x = 0; x < tabLink.length; x++) {
    
    tabLink[x].addEventListener('click',()=>{
        tabLink.forEach((tab)=> tab.classList.remove('active'));
        tabLink[x].classList.add('active');
        formularios.forEach((form)=>form.classList.remove('active'));
        formularios[x].classList.add('active');
       
    })
}

const mostrarClave=document.querySelectorAll('.mostrarClave');
const inputPass=document.querySelectorAll('.clave');

for (let i = 0; i < mostrarClave.length; i++) {
    
    mostrarClave[i].addEventListener('click',()=>{

        if(inputPass[i].type==="password"){
            inputPass[i].setAttribute('type','text');
            mostrarClave[i].classList.remove('fa-eye');
            mostrarClave[i].classList.add('fa-eye-slash');
            mostrarClave[i].classList.add('active');

        }else{
            inputPass[i].setAttribute('type','password');
             mostrarClave[i].classList.remove('fa-eye-slash');
             mostrarClave[i].classList.add('fa-eye');
             mostrarClave[i].classList.remove('active');
 
        }

    });
}

let nombre,correo,password,cbx_notificaciones,cbx_terminos;

if(document.getElementById('btnRegistro')){

    const btnRegistro=document.getElementById('btnRegistro');
    btnRegistro.addEventListener('click',(e)=>{

        e.preventDefault();

        const msError=document.querySelector('#formRegistro .error-text');
        msError.innerHTML="";
        msError.classList.remove('active');

        nombre=formRegistro.nombre.value.trim();
        correo=formRegistro.correo.value.trim();
        password=formRegistro.password.value.trim();

        cbx_notificaciones=formRegistro.cbx_notificaciones;
        cbx_terminos=formRegistro.cbx_terminos;
        if(nombre=="" && correo=="" && password==""){
            mostrarError('Todos los campos son obligatorios',msError);
            inputError([formRegistro.nombre,formRegistro.correo,formRegistro.password]);
            return false;

        }else{
            inputErrorRemove([formRegistro.nombre,formRegistro.correo,formRegistro.password]);
        }
        if(nombre=="" || nombre==null){

            mostrarError('Por favor ingrese su nombre',msError);
            inputError([formRegistro.nombre]);
            formRegistro.nombre.focus(); 
            return false;
        }else{
            if(!validarSoloLetras(nombre)){
                mostrarError('Ingrese un nombre válido, no se permiten caracteres especiales',msError);
                inputError([formRegistro.nombre]);
                formRegistro.nombre.focus();
                return false;
            }
        }
        if(correo==null || correo==""){
            mostrarError('Por favor ingrese su correo',msError);
            inputError([formRegistro.correo]);
            formRegistro.correo.focus();

            return false;
        }else{

            if(!validarCorreo(correo)){
                mostrarError('Por favor ingrese un correo válido',msError);
                inputError([formRegistro.correo]);
                formRegistro.correo.focus();
                return false;
            }
        }
        if(password=="" || password==null){
            mostrarError('Por favor ingrese una contraseña',msError);
            inputError([formRegistro.password]);
            formRegistro.password.focus();
            return false;
        }else{
            if(password.length <=4){
                mostrarError('Contraseña débil, min.5 carácteres',msError);
                inputError([formRegistro.password]);
                formRegistro.password.focus();
                return false;
            }
        }

        if(cbx_terminos.checked==false){
            mostrarError('Por favor aceptar Términos y condiciones',msError);
            formRegistro.cbx_terminos.parentNode.classList.add('cbx-error');
            return false;
        }else{
            formRegistro.cbx_terminos.parentNode.classList.remove('cbx-error');
        }
        formRegistro.submit();
        return true;

    });

    formRegistro.cbx_terminos.addEventListener('change',(e)=>{
        if(e.target.checked){
            formRegistro.cbx_terminos.parentNode.classList.remove('cbx-error');
        }
    })
}
if(document.getElementById('btnLogin')){

    const btnLogin=document.getElementById('btnLogin');

    btnLogin.addEventListener('click',(e)=>{

        e.preventDefault();

        const msError=document.querySelector('#formLogin .error-text');
        msError.innerHTML="";
        msError.classList.remove('active');

        correo=formLogin.correo.value.trim();
        password=formLogin.password.value.trim();

        if(correo=="" && password==""){
            mostrarError('Por favor ingrese su usuario/contraseña', msError);
            inputError([formLogin.correo,formLogin.password]);
            return false;
        }else{
            inputErrorRemove([formLogin.correo,formLogin.password]);
        }

        if(correo=="" || correo==null){
            mostrarError('Por favor ingrese su correo',msError);
            inputError([formLogin.correo]);
            formLogin.correo.focus();
            return false;
        }

        if(password=="" || password==null){
            mostrarError('Por favor ingrese su contraseña',msError);
            inputError([formLogin.password]);
            formLogin.password.focus();
            return false;
        }

        formLogin.submit();
        return true;

    })
}

function mostrarError(mensaje,msError){

    msError.classList.add('active');

    msError.innerHTML='<p>'+mensaje+'</p>';
}

function inputError(datos){
    for (let i = 0; i < datos.length; i++) {
        datos[i].classList.add('input-error');

    } 
    
}
function inputErrorRemove(datos){
    for (let i = 0; i < datos.length; i++) {
        datos[i].classList.remove('input-error');

    } 
    
}
function validarLetrasNumeros(valor){
    if(!/^[a-zA-Z0-9]+$/.test(valor)){
        return false;
    }
    return true;
}

function validarSoloLetras(valor){
    if(!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/.test(valor)){
        return false;
    }
    return true;
}

function validarCorreo(valor){
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(valor)){
        return false;
    }

    return true;
}
function validarSoloNumeros(valor){
    if(!/^([0-9]{8})*$/.test(valor)){
        return false;
    }
    return true;
}