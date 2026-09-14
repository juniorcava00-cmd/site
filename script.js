document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));

const modal=document.querySelector('#downloadModal');
const openButtons=document.querySelectorAll('.download-trigger');
const closeButtons=document.querySelectorAll('[data-close-download]');
const fileButton=document.querySelector('#downloadFileButton');

function openDownload(){
  if(!modal)return;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close')?.focus();
}
function closeDownload(){
  if(!modal)return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
}
openButtons.forEach(button=>button.addEventListener('click',openDownload));
closeButtons.forEach(button=>button.addEventListener('click',closeDownload));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeDownload()});
fileButton?.addEventListener('click',()=>{
  fileButton.textContent='Instalador em breve';
  fileButton.disabled=true;
  fileButton.style.opacity='.65';
});
