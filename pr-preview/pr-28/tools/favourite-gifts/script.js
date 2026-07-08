(function(){var e=[{name:`Agrat`,skin:`–`,t1:`3`,t2:`3`,t3:`1`},{name:`Alisha`,skin:`A`,t1:`1`,t2:`1`,t3:`1`},{name:`Arachne`,skin:`D`,t1:`2`,t2:`2`,t3:`3`},{name:`Asha`,skin:`C`,t1:`1`,t2:`2`,t3:`3`},{name:`Bea`,skin:`A`,t1:`1`,t2:`1`,t3:`2`},{name:`Belle`,skin:`S`,t1:`3`,t2:`3`,t3:`3`},{name:`Blanche`,skin:`S`,t1:`2`,t2:`1`,t3:`2`},{name:`Bonita`,skin:`–`,t1:`3`,t2:`1`,t3:`3`},{name:`Britney`,skin:`–`,t1:`3`,t2:`1`,t3:`2`},{name:`Casey`,skin:`A`,t1:`2`,t2:`2`,t3:`2`},{name:`Charlotte`,skin:`A`,t1:`3`,t2:`1`,t3:`1`},{name:`Esther`,skin:`–`,t1:`1`,t2:`2`,t3:`2`},{name:`Falenia`,skin:`–`,t1:`3`,t2:`1`,t3:`3`},{name:`Grace`,skin:`B`,t1:`2`,t2:`2`,t3:`1`},{name:`Harper`,skin:`S`,t1:`1`,t2:`3`,t3:`1`},{name:`Hilda`,skin:`A`,t1:`3`,t2:`3`,t3:`2`},{name:`Irma`,skin:`–`,t1:`2`,t2:`2`,t3:`3`},{name:`Kiana`,skin:`–`,t1:`2`,t2:`3`,t3:`2`},{name:`Kirsten`,skin:`S`,t1:`3`,t2:`3`,t3:`2`},{name:`Kitty`,skin:`S`,t1:`1`,t2:`3`,t3:`3`},{name:`Lilith`,skin:`S`,t1:`3`,t2:`1`,t3:`3`},{name:`Lola`,skin:`A`,t1:`2`,t2:`2`,t3:`2`},{name:`Lorraine`,skin:`B`,t1:`3`,t2:`2`,t3:`2`},{name:`Lucretia`,skin:`S`,t1:`2`,t2:`2`,t3:`3`},{name:`Mitsuki`,skin:`A`,t1:`3`,t2:`2`,t3:`1`},{name:`Morana`,skin:`S`,t1:`2`,t2:`3`,t3:`3`},{name:`Naomi`,skin:`A`,t1:`3`,t2:`3`,t3:`3`},{name:`Nicole`,skin:`S`,t1:`2`,t2:`3`,t3:`1`},{name:`Nonna`,skin:`–`,t1:`1`,t2:`1`,t3:`2`},{name:`Nymeria`,skin:`B`,t1:`1`,t2:`2`,t3:`2`},{name:`O-Rinn`,skin:`B`,t1:`1`,t2:`3`,t3:`2`},{name:`Omega`,skin:`A`,t1:`3`,t2:`3`,t3:`1`},{name:`Pixie`,skin:`A`,t1:`2`,t2:`2`,t3:`2`},{name:`Ravenna`,skin:`B`,t1:`1`,t2:`1`,t3:`2`},{name:`Regina`,skin:`D`,t1:`2`,t2:`1`,t3:`1`},{name:`River`,skin:`A`,t1:`2`,t2:`2`,t3:`2`},{name:`Rose`,skin:`S`,t1:`1`,t2:`2`,t3:`1`},{name:`Selina`,skin:`–`,t1:`1`,t2:`2`,t3:`3`},{name:`Shelby`,skin:`–`,t1:`3`,t2:`3`,t3:`1`},{name:`Sixtine`,skin:`S`,t1:`3`,t2:`1`,t3:`1`},{name:`Thora`,skin:`S`,t1:`1`,t2:`1`,t3:`1`},{name:`Tsintah`,skin:`–`,t1:`2`,t2:`3`,t3:`1`},{name:`Vespina`,skin:`–`,t1:`1`,t2:`2`,t3:`1`},{name:`Victoria`,skin:`S`,t1:`2`,t2:`1`,t3:`3`},{name:`Vivienne`,skin:`–`,t1:`2`,t2:`1`,t3:`3`},{name:`Wendy`,skin:`C`,t1:`1`,t2:`1`,t3:`3`},{name:`Zelia`,skin:`S`,t1:`3`,t2:`3`,t3:`3`},{name:`Zoe & Chloe`,skin:`B`,t1:`1`,t2:`3`,t3:`3`}],t=[...e],n=document.querySelector(`#giftTable tbody`),r=document.querySelectorAll(`#filterSkin button`),i=[],a=[],o=[],s=[],c=document.getElementById(`search`),l=document.getElementById(`rowCounter`);function u(e){let t=e.map(e=>`
        <tr>
            <td class="icon-cell">
                <img src="/LGWiki-Pages/pr-preview/pr-28/tools/images/mercs/${e.name}.png" 
                alt="${e.name}" 
                loading="lazy">
            </td>

            <td class="name-cell">${e.name}</td>

            <td class="outfit-cell">
                <img src="/LGWiki-Pages/pr-preview/pr-28/tools/images/outfits/${e.name}.png"
                alt="${e.name}" 
                loading="lazy">
            </td>

            <td class="skin-tier-cell">
                <span class="skin-badge skin-${e.skin===`–`?`none`:e.skin}">
                    ${e.skin}
                </span>
            </td>

            <td class="t1">
                <img src="/LGWiki-Pages/pr-preview/pr-28/tools/images/gifts/T1-${e.t1}.png" 
                alt="?" 
                loading="lazy">
            </td>

            <td class="t2">
                <img src="/LGWiki-Pages/pr-preview/pr-28/tools/images/gifts/T2-${e.t2}.png" 
                alt="?" 
                loading="lazy">
            </td>

            <td class="t3">
                <img src="/LGWiki-Pages/pr-preview/pr-28/tools/images/gifts/T3-${e.t3}.png" 
                alt="?" 
                loading="lazy">
            </td>
        </tr>
    `).join(``);requestAnimationFrame(()=>{n.innerHTML=t,l.innerText=`Total: ${e.length}`,f()})}u(t);var d=document.getElementById(`OutfitTooltip`);function f(){document.querySelectorAll(`.outfit-cell img`).forEach(e=>{e.addEventListener(`mouseenter`,()=>{let t=e.closest(`tr`).querySelector(`.name-cell`).innerText;d.innerHTML=`<img src="/LGWiki-Pages/pr-preview/pr-28/tools/images/outfits-desc/${t}.png" 
                alt="${t} Outfit Skill" 
                loading="lazy">`,d.style.display=`block`}),e.addEventListener(`mousemove`,e=>{d.style.left=e.clientX+40+`px`,d.style.top=e.clientY+-25+`px`}),e.addEventListener(`mouseleave`,()=>{d.style.display=`none`})})}function p(){r.forEach(e=>{e.classList.toggle(`active`,i.includes(e.dataset.value))}),document.querySelectorAll(`#filterT1 img`).forEach(e=>{e.classList.toggle(`active`,a.includes(e.dataset.value))}),document.querySelectorAll(`#filterT2 img`).forEach(e=>{e.classList.toggle(`active`,o.includes(e.dataset.value))}),document.querySelectorAll(`#filterT3 img`).forEach(e=>{e.classList.toggle(`active`,s.includes(e.dataset.value))})}var m=1;document.querySelectorAll(`th[data-sort]`).forEach(e=>{e.onclick=()=>{let n=e.dataset.sort;m*=-1,t.sort((e,t)=>((isNaN(e[n])?e[n]:Number(e[n]))>(isNaN(t[n])?t[n]:Number(t[n]))?1:-1)*m),u(t)}});var h=document.getElementById(`sidebar`),g=document.getElementById(`filterToggle`),_=document.querySelector(`.layout`);g.onclick=()=>{h.classList.toggle(`hidden`);let e=!h.classList.contains(`hidden`);_.classList.toggle(`filters-visible`,e),g.classList.toggle(`active`,e)},r.forEach(e=>{e.onclick=()=>{let t=e.dataset.value;e.classList.contains(`active`)?(e.classList.remove(`active`),i=i.filter(e=>e!==t)):(e.classList.add(`active`),i.push(t)),x()}});function v(e,t){e.querySelectorAll(`img`).forEach(e=>{e.onclick=()=>{let n=e.dataset.value,r;if(t===`t1`&&(r=a),t===`t2`&&(r=o),t===`t3`&&(r=s),e.classList.contains(`active`)){e.classList.remove(`active`);let t=r.indexOf(n);t!==-1&&r.splice(t,1)}else e.classList.add(`active`),r.push(n);x()}})}v(document.getElementById(`filterT1`),`t1`),v(document.getElementById(`filterT2`),`t2`),v(document.getElementById(`filterT3`),`t3`),window.addEventListener(`pageshow`,()=>{p()});function y(){let e={skins:i,t1:a,t2:o,t3:s,search:c.value};localStorage.setItem(`giftFilters`,JSON.stringify(e))}function b(){let e=new URLSearchParams,t=c.value.trim();i.length&&e.set(`skin`,i.join(`,`)),a.length&&e.set(`t1`,a.join(`,`)),o.length&&e.set(`t2`,o.join(`,`)),s.length&&e.set(`t3`,s.join(`,`)),t&&e.set(`search`,t);let n=e.toString()?window.location.pathname+`?`+e.toString():window.location.pathname;history.replaceState(null,``,n)}function x(){let n=c.value.trim().toLowerCase();t=e.filter(e=>(i.length===0||i.includes(e.skin))&&(a.length===0||a.includes(e.t1))&&(o.length===0||o.includes(e.t2))&&(s.length===0||s.includes(e.t3))&&(!n||e.name.toLowerCase().includes(n))),u(t),b(),y()}var S;c.oninput=()=>{clearTimeout(S),S=setTimeout(x,150)},document.getElementById(`resetSearch`).onclick=()=>{c.value=``,x()},document.getElementById(`resetFilters`).onclick=()=>{i=[],a=[],o=[],s=[],p(),x(),localStorage.removeItem(`giftFilters`),history.replaceState(null,``,window.location.pathname)};function C(e){i=e.skins||[],a=e.t1||[],o=e.t2||[],s=e.t3||[],c.value=e.search||``,p(),x()}function w(){let e=new URLSearchParams(window.location.search);C({skins:e.get(`skin`)?.split(`,`).filter(Boolean),t1:e.get(`t1`)?.split(`,`).filter(Boolean),t2:e.get(`t2`)?.split(`,`).filter(Boolean),t3:e.get(`t3`)?.split(`,`).filter(Boolean),search:e.get(`search`)||``})}function T(){if(window.location.search)return;let e=localStorage.getItem(`giftFilters`);if(e)try{C(JSON.parse(e))}catch{localStorage.removeItem(`giftFilters`)}}window.location.search?w():T();var E=document.querySelector(`.skin-header`),D=document.getElementById(`SkinTooltip`),O=document.querySelector(`.skin-info-btn`),k=`
    <span class="skin-description">Outfit Tier Descriptions</span><br><br>
    <span class="skin-S">S</span> : Can turn the table when facing enemies with A tier and below, are really hard to counter or kill.<br>
    <span class="skin-A">A</span> : Very strong mercenaries that perform well alone but have several counters.<br>
    <span class="skin-B">B</span> : Strong in the right combos and able to survive a few rounds.<br>
    <span class="skin-C">C</span> : Effective mainly in combos but easy to defeat without protection.<br>
    <span class="skin-D">D</span> : Useful only in a few limited combos.<br>
    <span class="skin-E">E</span> : Very weak and rarely useful in battles.<br>
    <span class="skin-F">F</span> : Rubbish.<br>
    <span class="skin-none">–</span> : No feedback collected yet.
`;O.addEventListener(`mouseenter`,()=>{D.innerHTML=k;let e=E.getBoundingClientRect();D.style.display=`block`,D.style.left=e.left+e.width/2+`px`,D.style.transform=`translateX(-50%)`,D.style.top=e.bottom+5+`px`,A()}),O.addEventListener(`mouseleave`,()=>{D.style.display=`none`}),D.addEventListener(`mouseenter`,()=>{D.style.display=`block`}),D.addEventListener(`mouseleave`,()=>{D.style.display=`none`}),document.querySelector(`.skin-info-btn`).addEventListener(`click`,e=>{e.stopPropagation(),e.preventDefault()});function A(){let e=D.getBoundingClientRect();e.right>window.innerWidth&&(D.style.left=window.innerWidth-e.width-10+`px`),e.left<0&&(D.style.left=`10px`),e.bottom>window.innerHeight&&(D.style.top=window.innerHeight-e.height-10+`px`)}})();