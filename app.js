/* NUVEX CLEAN URL NAVIGATION V1
   Inicio: /  |  Secciones: /#soluciones, /#planes, /#diagnostico, etc.
   Los enlaces directos a secciones siguen funcionando. */
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const sectionIds = ['inicio','soluciones','planes','ventajas','migracion','diagnostico','contacto'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  const header = document.querySelector('header');
  let manualScrollUntil = 0;
  let scrollFrame = 0;
  const rememberManualScroll = () => { manualScrollUntil = Date.now() + 1800; };

  document.querySelectorAll('a[data-home-link]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      manualScrollUntil = 0;
      if (window.location.pathname !== '/' || window.location.search || window.location.hash) {
        window.history.pushState(window.history.state, '', '/');
      }
      window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => { manualScrollUntil = 0; });
  });

  // Update the fragment only for manual scrolling; do not fight smooth anchor navigation.
  window.addEventListener('wheel', rememberManualScroll, { passive: true });
  window.addEventListener('touchmove', rememberManualScroll, { passive: true });
  window.addEventListener('keydown', event => {
    const tag = event.target && event.target.tagName;
    if (['INPUT','TEXTAREA','SELECT'].includes(tag) || event.target?.isContentEditable) return;
    if (['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key)) rememberManualScroll();
  });
  window.addEventListener('scroll', () => {
    if (Date.now() > manualScrollUntil || scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(() => {
      scrollFrame = 0;
      if (Date.now() > manualScrollUntil) return;
      const cutoff = (header?.getBoundingClientRect().height || 94) + 28;
      let active = 'inicio';
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= cutoff) active = section.id;
      }
      const nextHash = active === 'inicio' ? '' : '#' + active;
      if (window.location.hash !== nextHash) {
        window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search + nextHash);
      }
    });
  }, { passive: true });
})();

const menu=document.querySelector('.menu'),nav=document.querySelector('nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');menu.textContent=open?'×':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menú');menu.textContent='☰'}));
const systems={
  contabilidad:['Tu contabilidad,\ncontigo.','Accede a tu entorno de Contabilidad desde donde trabajes, con tus sistemas alojados en la infraestructura de Nuvex.','ledger','contabilidad.png','CONTPAQi Contabilidad'],
  comercial:['Tu operación comercial,\nconectada.','Lleva tu entorno de Comercial Premium a una infraestructura centralizada. Revisamos contigo la versión y los recursos que necesita tu operación.','store','comercial-premium.png','CONTPAQi Comercial Premium'],
  bancos:['Tu entorno de Bancos,\na tu alcance.','Conecta a tu equipo con su sistema de Bancos desde un entorno administrado por Nuvex.','bank','bancos.png','CONTPAQi Bancos'],
  nominas:['Tu sistema de Nóminas,\nen la nube.','Mantén el entorno de trabajo de tu equipo en un servidor administrado, sujeto a validación de compatibilidad, acceso remoto y política de respaldos.','payroll','nominas.png','CONTPAQi Nóminas'],
  xml:['Tus documentos,\nen el mismo entorno.','Incluye tus necesidades de XML en línea y documentos digitales en la revisión de infraestructura, conectividad y respaldos.','xml','xml-en-linea.png','CONTPAQi XML en línea+']
};
/* NUVEX BOUNDED OFFICIAL LOGO SELECTION V3
   Keep the existing IMG elements for all five apps. No injected SVG or new sizing contexts. */
const tabs=[...document.querySelectorAll('[role=tab]')];
const logoSources={
 contabilidad:'assets/contpaqi/contabilidad.png',
 comercial:'assets/contpaqi/comercial-premium.png',
 bancos:'assets/contpaqi/bancos.png',
 nominas:'assets/contpaqi/nominas-horizontal.svg',
 xml:'assets/contpaqi/xml-en-linea-horizontal.svg'
};
function selectTab(t){
  if(!t || !systems[t.dataset.system])return;
  const key=t.dataset.system;
  tabs.forEach(b=>{b.setAttribute('aria-selected',String(b===t));b.tabIndex=b===t?0:-1});
  const [title,description,icon,file,name]=systems[key];
  const heading=document.getElementById('system-title');
  const detail=document.getElementById('system-description');
  const panel=document.getElementById('system-detail');
  const brandName=document.getElementById('system-active-name');
  const smallLogo=document.getElementById('system-active-icon');
  const largeLogo=document.getElementById('system-active-logo');
  if(heading) heading.innerText=title;
  if(detail) detail.textContent=description;
  if(panel) panel.setAttribute('aria-labelledby',t.id);
  if(brandName) brandName.textContent=name;
  const src=logoSources[key];
  if(smallLogo){smallLogo.src=src;smallLogo.alt='';}
  if(largeLogo){largeLogo.src=src;largeLogo.alt='Logotipo de '+name;}
}
tabs.forEach((t,i)=>{t.addEventListener('click',()=>selectTab(t));t.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%tabs.length;else if(e.key==='ArrowLeft')n=(i-1+tabs.length)%tabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;else return;e.preventDefault();selectTab(tabs[n]);tabs[n].focus()})});
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
    volume:document.querySelector('#diag-volume'),
    version:document.querySelector('#diag-version'),
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
    if(diagFields.volume.value==='Más de 1 TB'){
      notices.push('El volumen requiere evaluar capacidad, tiempo de transferencia y política de respaldos.');
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
      'Volumen de datos: '+diagFields.volume.value,
      diagFields.version.value.trim()?'Versión de sistema: '+diagFields.version.value.replace(/[\r\n\t]+/g,' ').trim():null,
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
