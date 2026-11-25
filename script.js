'use strict';
const tabs=[...document.querySelectorAll('[role="tab"]')];
function selectTab(tab){for(const item of tabs){const active=item===tab;item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;document.getElementById(item.getAttribute('aria-controls')).hidden=!active;}}
for(const tab of tabs){tab.addEventListener('click',()=>selectTab(tab));tab.addEventListener('keydown',event=>{let index=tabs.indexOf(tab);if(event.key==='ArrowRight')index=(index+1)%tabs.length;else if(event.key==='ArrowLeft')index=(index-1+tabs.length)%tabs.length;else if(event.key==='Home')index=0;else if(event.key==='End')index=tabs.length-1;else return;event.preventDefault();selectTab(tabs[index]);tabs[index].focus();});}
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const revealElements=[...document.querySelectorAll('.about>div:not(.capabilities),.capabilities article,.section-heading,.career,.earlier-role,.sample-disclaimer,.sample-tabs,.sample-panel,.tool-section .wrap,.education>div,.contact-section .wrap')];
if('IntersectionObserver' in window&&!reduceMotion.matches){
 const revealObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}}},{threshold:.08,rootMargin:'0px 0px -25px 0px'});
 for(const element of revealElements){element.classList.add('reveal');revealObserver.observe(element);}
 document.querySelectorAll('.capabilities article').forEach((element,index)=>element.style.setProperty('--reveal-delay',`${index*90}ms`));
 document.documentElement.classList.add('motion-ready');
 reduceMotion.addEventListener('change',()=>{if(reduceMotion.matches){document.documentElement.classList.remove('motion-ready');revealObserver.disconnect();}});
}
const progress=document.querySelector('.reading-progress span');
const backTop=document.querySelector('.back-top');
const header=document.querySelector('header');
const navLinks=[...document.querySelectorAll('nav a')];
const sections=navLinks.map(link=>document.querySelector(link.getAttribute('href')));
let scheduled=false;
function updateScroll(){
 const y=window.scrollY;
 const max=document.documentElement.scrollHeight-window.innerHeight;
 progress.style.transform=`scaleX(${max>0?Math.min(1,Math.max(0,y/max)):0})`;
 backTop.hidden=y<500;
 header.classList.toggle('scrolled',y>20);
 let active=-1;
 sections.forEach((section,index)=>{if(section.getBoundingClientRect().top<=180)active=index;});
 if(max>0&&y>=max-3)active=sections.length-1;
 navLinks.forEach((link,index)=>{if(index===active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
 scheduled=false;
}
window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;window.requestAnimationFrame(updateScroll);}},{passive:true});
window.addEventListener('resize',updateScroll);
updateScroll();
backTop.addEventListener('click',()=>{window.scrollTo({top:0,behavior:reduceMotion.matches?'instant':'smooth'});document.querySelector('.brand').focus({preventScroll:true});});
const copyEmail=document.querySelector('.copy-email');
const copyStatus=document.querySelector('.copy-status');
copyEmail.addEventListener('click',async()=>{
 try{await navigator.clipboard.writeText('akhila.sujan.p@gmail.com');copyStatus.textContent='Email address copied.';}
 catch{copyStatus.textContent='Select the email address above to copy it.';}
});
