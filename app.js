const menu=document.querySelector('.menu'),nav=document.querySelector('nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');menu.textContent=open?'×':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menú');menu.textContent='☰'}));
const systems={contabilidad:['Tu contabilidad,\ncontigo.','Accede a tu entorno de Contabilidad desde donde trabajes, con tus sistemas alojados en la infraestructura de Nuvex.'],comercial:['Tu operación comercial,\nconectada.','Lleva tu entorno de Comercial a una infraestructura centralizada. Revisamos contigo la versión y los recursos que necesita tu operación.'],bancos:['Tu entorno de Bancos,\na tu alcance.','Conecta a tu equipo con su sistema de Bancos desde un entorno administrado por Nuvex.'],nominas:['Tu sistema de Nóminas,\nen la nube.','Mantén el entorno de trabajo de tu equipo en un servidor administrado, con acceso remoto y respaldos diarios.'],xml:['Tus documentos,\nen el mismo entorno.','Incluye tus necesidades de XML y documentos digitales en la revisión de tu infraestructura y respaldos.']};const tabs=[...document.querySelectorAll('[role=tab]')];function selectTab(t){tabs.forEach(b=>{b.setAttribute('aria-selected',String(b===t));b.tabIndex=b===t?0:-1});const [title,description]=systems[t.dataset.system];document.querySelector('#system-title').innerText=title;document.querySelector('#system-description').textContent=description;document.querySelector('#system-detail').setAttribute('aria-labelledby',t.id)}tabs.forEach((t,i)=>{t.addEventListener('click',()=>selectTab(t));t.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%tabs.length;else if(e.key==='ArrowLeft')n=(i-1+tabs.length)%tabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;else return;e.preventDefault();selectTab(tabs[n]);tabs[n].focus()})});
document.querySelector('#quote-form').addEventListener('submit',e=>{e.preventDefault();const name=document.querySelector('#name');if(!name.value.trim()){name.setCustomValidity('Escribe tu nombre o empresa.');name.reportValidity();return}name.setCustomValidity('');const message=`Hola, Nuvex Cloud. Soy ${name.value.trim()}. Me gustaría cotizar un servidor en la nube.\nPlan: ${document.querySelector('#plan').value}.\nSistema: ${document.querySelector('#product').value}.\nUsuarios simultáneos: ${document.querySelector('#users').value}.\n¿Me pueden compartir información?`;const url='https://wa.me/526145153676?text='+encodeURIComponent(message);window.open(url,'_blank','noopener,noreferrer');const status=document.querySelector('#form-status');status.replaceChildren();const link=document.createElement('a');link.href=url;link.target='_blank';link.rel='noopener noreferrer';link.textContent='Solicitud preparada. Si WhatsApp no abrió, toca aquí ↗';status.append(link)});document.querySelector('#name').addEventListener('input',e=>e.target.setCustomValidity(''));

document.querySelectorAll("[data-plan]").forEach(link => link.addEventListener("click", () => { document.querySelector("#plan").value = link.dataset.plan; }));

/* Evaluación preliminar: solo lógica local, sin almacenar ni transmitir datos hasta que el usuario abra WhatsApp. */
const diagnosticForm=document.querySelector('#diagnostic-form');
if(diagnosticForm){
  const diagFields={
    product:document.querySelector('#diag-product'),
    users:document.querySelector('#diag-users'),
    origin:document.querySelector('#diag-origin'),
    backup:document.querySelector('#diag-backup'),
    companies:document.querySelector('#diag-companies'),
    name:document.querySelector('#diag-name')
  };
  const diagResult=document.querySelector('#diagnostic-result');
  const diagTitle=document.querySelector('#diag-result-title');
  const diagText=document.querySelector('#diag-result-text');
  const diagStatus=document.querySelector('#diagnostic-status');
  function updateDiagnostic(){
    const notices=[];
    let attention=false;
    if(diagFields.backup.value==='No tengo un respaldo identificado'){
      notices.push('Primero es necesario localizar o generar un respaldo verificable.');
      attention=true;
    }else if(diagFields.backup.value==='Tengo respaldo, sin probar restauración'){
      notices.push('Se requiere una prueba de restauración antes de programar el cambio.');
      attention=true;
    }else if(diagFields.backup.value==='No lo sé'){
      notices.push('Confirmaremos la disponibilidad y la restaurabilidad de los respaldos.');
    }else{
      notices.push('Revisaremos fecha, integridad y alcance del respaldo disponible.');
    }
    if(['16 a 30','Más de 30'].includes(diagFields.users.value)){
      notices.push('La cantidad de usuarios requiere una evaluación detallada de carga y licencias.');
    }else{
      notices.push('Validaremos usuarios concurrentes y recursos necesarios.');
    }
    if(diagFields.origin.value==='Otra nube o proveedor'){
      notices.push('Acordaremos con el proveedor actual el acceso a los respaldos y la ventana de traslado.');
    }
    if(['Aspel u otro sistema','No estoy seguro'].includes(diagFields.product.value)){
      notices.push('La compatibilidad del producto y de su versión debe confirmarse.');
    }
    if(diagFields.companies.value==='Más de 5'){
      notices.push('Revisaremos tamaño y cantidad de bases de datos por empresa.');
    }
    diagResult.dataset.level=attention?'attention':'review';
    diagTitle.textContent=attention?'Punto por resolver antes de migrar':'Evaluación técnica requerida';
    diagText.textContent=notices.join(' ');
  }
  diagnosticForm.addEventListener('change',updateDiagnostic);
  diagnosticForm.addEventListener('submit',event=>{
    event.preventDefault();
    updateDiagnostic();
    const name=diagFields.name.value.replace(/[\r\n\t]+/g,' ').trim();
    const message=[
      'Hola, Nuvex Cloud. Solicito un diagnóstico preliminar para migrar mi infraestructura.',
      name?'Nombre o empresa: '+name:null,
      'Aplicación: '+diagFields.product.value,
      'Usuarios simultáneos: '+diagFields.users.value,
      'Entorno actual: '+diagFields.origin.value,
      'Respaldos: '+diagFields.backup.value,
      'Empresas: '+diagFields.companies.value,
      'Quiero revisar compatibilidad, respaldos, alcance y plan de migración. No envío contraseñas ni datos contables por este formulario.'
    ].filter(Boolean).join('\n');
    const url='https://wa.me/526145153676?text='+encodeURIComponent(message);
    const link=document.createElement('a');
    link.href=url;
    link.target='_blank';
    link.rel='noopener noreferrer';
    link.textContent='Solicitud preparada. Si WhatsApp no abrió, toca aquí ↗';
    diagStatus.replaceChildren(link);
    window.open(url,'_blank','noopener,noreferrer');
  });
  updateDiagnostic();
}
