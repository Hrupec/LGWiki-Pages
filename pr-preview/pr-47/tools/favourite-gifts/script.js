(function(){function e(e){return e.replace(/ & /g,`-and-`).replace(/\s+/g,`-`)}var t=[{name:`Agrat`,skin:`–`,t1:`3`,t2:`3`,t3:`1`},{name:`Alisha`,skin:`A`,t1:`1`,t2:`1`,t3:`1`},{name:`Arachne`,skin:`D`,t1:`2`,t2:`2`,t3:`3`},{name:`Asha`,skin:`C`,t1:`1`,t2:`2`,t3:`3`},{name:`Bea`,skin:`A`,t1:`1`,t2:`1`,t3:`2`},{name:`Belle`,skin:`S`,t1:`3`,t2:`3`,t3:`3`},{name:`Blanche`,skin:`S`,t1:`2`,t2:`1`,t3:`2`},{name:`Bonita`,skin:`–`,t1:`3`,t2:`1`,t3:`3`},{name:`Britney`,skin:`–`,t1:`3`,t2:`1`,t3:`2`},{name:`Casey`,skin:`A`,t1:`2`,t2:`2`,t3:`2`},{name:`Charlotte`,skin:`A`,t1:`3`,t2:`1`,t3:`1`},{name:`Esther`,skin:`–`,t1:`1`,t2:`2`,t3:`2`},{name:`Falenia`,skin:`–`,t1:`3`,t2:`1`,t3:`3`},{name:`Grace`,skin:`B`,t1:`2`,t2:`2`,t3:`1`},{name:`Harper`,skin:`S`,t1:`1`,t2:`3`,t3:`1`},{name:`Hilda`,skin:`A`,t1:`3`,t2:`3`,t3:`2`},{name:`Irma`,skin:`–`,t1:`2`,t2:`2`,t3:`3`},{name:`Justina`,skin:`–`,t1:`2`,t2:`3`,t3:`1`},{name:`Kiana`,skin:`–`,t1:`2`,t2:`3`,t3:`2`},{name:`Kirsten`,skin:`S`,t1:`3`,t2:`3`,t3:`2`},{name:`Kitty`,skin:`S`,t1:`1`,t2:`3`,t3:`3`},{name:`Lilith`,skin:`S`,t1:`3`,t2:`1`,t3:`3`},{name:`Lola`,skin:`A`,t1:`2`,t2:`2`,t3:`2`},{name:`Lorraine`,skin:`B`,t1:`3`,t2:`2`,t3:`2`},{name:`Lucretia`,skin:`S`,t1:`2`,t2:`2`,t3:`3`},{name:`Maddie`,skin:`–`,t1:`1`,t2:`2`,t3:`2`},{name:`Mitsuki`,skin:`A`,t1:`3`,t2:`2`,t3:`1`},{name:`Morana`,skin:`S`,t1:`2`,t2:`3`,t3:`3`},{name:`Naomi`,skin:`A`,t1:`3`,t2:`3`,t3:`3`},{name:`Nicole`,skin:`S`,t1:`2`,t2:`3`,t3:`1`},{name:`Nonna`,skin:`–`,t1:`1`,t2:`1`,t3:`2`},{name:`Nymeria`,skin:`B`,t1:`1`,t2:`2`,t3:`2`},{name:`O-Rinn`,skin:`B`,t1:`1`,t2:`3`,t3:`2`},{name:`Omega`,skin:`A`,t1:`3`,t2:`3`,t3:`1`},{name:`Pixie`,skin:`A`,t1:`2`,t2:`2`,t3:`2`},{name:`Ravenna`,skin:`B`,t1:`1`,t2:`1`,t3:`2`},{name:`Regina`,skin:`D`,t1:`2`,t2:`1`,t3:`1`},{name:`River`,skin:`A`,t1:`2`,t2:`2`,t3:`2`},{name:`Rose`,skin:`S`,t1:`1`,t2:`2`,t3:`1`},{name:`Selina`,skin:`–`,t1:`1`,t2:`2`,t3:`3`},{name:`Shelby`,skin:`–`,t1:`3`,t2:`3`,t3:`1`},{name:`Sixtine`,skin:`S`,t1:`3`,t2:`1`,t3:`1`},{name:`Thora`,skin:`S`,t1:`1`,t2:`1`,t3:`1`},{name:`Tsintah`,skin:`–`,t1:`2`,t2:`3`,t3:`1`},{name:`Vespina`,skin:`–`,t1:`1`,t2:`2`,t3:`1`},{name:`Victoria`,skin:`S`,t1:`2`,t2:`1`,t3:`3`},{name:`Vivienne`,skin:`–`,t1:`2`,t2:`1`,t3:`3`},{name:`Wendy`,skin:`C`,t1:`1`,t2:`1`,t3:`3`},{name:`Zelia`,skin:`S`,t1:`3`,t2:`3`,t3:`3`},{name:`Zoe & Chloe`,skin:`B`,t1:`1`,t2:`3`,t3:`3`}],n=[...t],r=document.querySelector(`#giftTable tbody`),i=document.querySelectorAll(`#filterSkin button`),a=[],o=[],s=[],c=[],l=document.getElementById(`search`),u=document.getElementById(`rowCounter`);function d(t){let n=t.map(t=>`
        <tr>
            <td class="icon-cell">
                <img src="/LGWiki-Pages/pr-preview/pr-47/tools/images/mercs/${e(t.name)}.png" 
                alt="${t.name}" 
                loading="lazy">
            </td>

            <td class="name-cell">${t.name}</td>

            <td class="outfit-cell">
                <img src="/LGWiki-Pages/pr-preview/pr-47/tools/images/outfits/${e(t.name)}.png"
                alt="${t.name}" 
                loading="lazy">
            </td>

            <td class="skin-tier-cell">
                <span class="skin-badge skin-${t.skin===`–`?`none`:t.skin}">
                    ${t.skin}
                </span>
            </td>

            <td class="t1">
                <img src="/LGWiki-Pages/pr-preview/pr-47/tools/images/gifts/T1-${t.t1}.png" 
                alt="?" 
                loading="lazy">
            </td>

            <td class="t2">
                <img src="/LGWiki-Pages/pr-preview/pr-47/tools/images/gifts/T2-${t.t2}.png" 
                alt="?" 
                loading="lazy">
            </td>

            <td class="t3">
                <img src="/LGWiki-Pages/pr-preview/pr-47/tools/images/gifts/T3-${t.t3}.png" 
                alt="?" 
                loading="lazy">
            </td>
        </tr>
    `).join(``);requestAnimationFrame(()=>{r.innerHTML=n,u.innerText=`Total: ${t.length}`,p()})}d(n);var f=document.getElementById(`OutfitTooltip`);function p(){document.querySelectorAll(`.outfit-cell img`).forEach(t=>{t.addEventListener(`mouseenter`,()=>{let n=t.closest(`tr`).querySelector(`.name-cell`).innerText;f.innerHTML=`<img src="/LGWiki-Pages/pr-preview/pr-47/tools/images/outfits-desc/${e(n)}.png" 
                alt="${n} Outfit Skill" 
                loading="lazy">`,f.style.display=`block`}),t.addEventListener(`mousemove`,e=>{f.style.left=e.clientX+40+`px`,f.style.top=e.clientY+-25+`px`}),t.addEventListener(`mouseleave`,()=>{f.style.display=`none`})})}function m(){i.forEach(e=>{e.classList.toggle(`active`,a.includes(e.dataset.value))}),document.querySelectorAll(`#filterT1 img`).forEach(e=>{e.classList.toggle(`active`,o.includes(e.dataset.value))}),document.querySelectorAll(`#filterT2 img`).forEach(e=>{e.classList.toggle(`active`,s.includes(e.dataset.value))}),document.querySelectorAll(`#filterT3 img`).forEach(e=>{e.classList.toggle(`active`,c.includes(e.dataset.value))})}var h=1;document.querySelectorAll(`th[data-sort]`).forEach(e=>{e.onclick=()=>{let t=e.dataset.sort;h*=-1,n.sort((e,n)=>((isNaN(e[t])?e[t]:Number(e[t]))>(isNaN(n[t])?n[t]:Number(n[t]))?1:-1)*h),d(n)}});var g=document.getElementById(`sidebar`),_=document.getElementById(`filterToggle`),v=document.querySelector(`.layout`);_.onclick=()=>{g.classList.toggle(`hidden`);let e=!g.classList.contains(`hidden`);v.classList.toggle(`filters-visible`,e),_.classList.toggle(`active`,e)},i.forEach(e=>{e.onclick=()=>{let t=e.dataset.value;e.classList.contains(`active`)?(e.classList.remove(`active`),a=a.filter(e=>e!==t)):(e.classList.add(`active`),a.push(t)),S()}});function y(e,t){e.querySelectorAll(`img`).forEach(e=>{e.onclick=()=>{let n=e.dataset.value,r;if(t===`t1`&&(r=o),t===`t2`&&(r=s),t===`t3`&&(r=c),e.classList.contains(`active`)){e.classList.remove(`active`);let t=r.indexOf(n);t!==-1&&r.splice(t,1)}else e.classList.add(`active`),r.push(n);S()}})}y(document.getElementById(`filterT1`),`t1`),y(document.getElementById(`filterT2`),`t2`),y(document.getElementById(`filterT3`),`t3`),window.addEventListener(`pageshow`,()=>{m()});function b(){let e={skins:a,t1:o,t2:s,t3:c,search:l.value};localStorage.setItem(`giftFilters`,JSON.stringify(e))}function x(){let e=new URLSearchParams,t=l.value.trim();a.length&&e.set(`skin`,a.join(`,`)),o.length&&e.set(`t1`,o.join(`,`)),s.length&&e.set(`t2`,s.join(`,`)),c.length&&e.set(`t3`,c.join(`,`)),t&&e.set(`search`,t);let n=e.toString()?window.location.pathname+`?`+e.toString():window.location.pathname;history.replaceState(null,``,n)}function S(){let e=l.value.trim().toLowerCase();n=t.filter(t=>(a.length===0||a.includes(t.skin))&&(o.length===0||o.includes(t.t1))&&(s.length===0||s.includes(t.t2))&&(c.length===0||c.includes(t.t3))&&(!e||t.name.toLowerCase().includes(e))),d(n),x(),b()}var C;l.oninput=()=>{clearTimeout(C),C=setTimeout(S,150)},document.getElementById(`resetSearch`).onclick=()=>{l.value=``,S()},document.getElementById(`resetFilters`).onclick=()=>{a=[],o=[],s=[],c=[],m(),S(),localStorage.removeItem(`giftFilters`),history.replaceState(null,``,window.location.pathname)};function w(e){a=e.skins||[],o=e.t1||[],s=e.t2||[],c=e.t3||[],l.value=e.search||``,m(),S()}function T(){let e=new URLSearchParams(window.location.search);w({skins:e.get(`skin`)?.split(`,`).filter(Boolean),t1:e.get(`t1`)?.split(`,`).filter(Boolean),t2:e.get(`t2`)?.split(`,`).filter(Boolean),t3:e.get(`t3`)?.split(`,`).filter(Boolean),search:e.get(`search`)||``})}function E(){if(window.location.search)return;let e=localStorage.getItem(`giftFilters`);if(e)try{w(JSON.parse(e))}catch{localStorage.removeItem(`giftFilters`)}}window.location.search?T():E();var D=document.querySelector(`.skin-header`),O=document.getElementById(`SkinTooltip`),k=document.querySelector(`.skin-info-btn`),A=`
    <span class="skin-description">Outfit Tier Descriptions</span><br><br>
    <span class="skin-S">S</span> : Can turn the table when facing enemies with A tier and below, are really hard to counter or kill.<br>
    <span class="skin-A">A</span> : Very strong mercenaries that perform well alone but have several counters.<br>
    <span class="skin-B">B</span> : Strong in the right combos and able to survive a few rounds.<br>
    <span class="skin-C">C</span> : Effective mainly in combos but easy to defeat without protection.<br>
    <span class="skin-D">D</span> : Useful only in a few limited combos.<br>
    <span class="skin-E">E</span> : Very weak and rarely useful in battles.<br>
    <span class="skin-F">F</span> : Rubbish.<br>
    <span class="skin-none">–</span> : No feedback collected yet.
`;k.addEventListener(`mouseenter`,()=>{O.innerHTML=A;let e=D.getBoundingClientRect();O.style.display=`block`,O.style.left=e.left+e.width/2+`px`,O.style.transform=`translateX(-50%)`,O.style.top=e.bottom+5+`px`,j()}),k.addEventListener(`mouseleave`,()=>{O.style.display=`none`}),O.addEventListener(`mouseenter`,()=>{O.style.display=`block`}),O.addEventListener(`mouseleave`,()=>{O.style.display=`none`}),document.querySelector(`.skin-info-btn`).addEventListener(`click`,e=>{e.stopPropagation(),e.preventDefault()});function j(){let e=O.getBoundingClientRect();e.right>window.innerWidth&&(O.style.left=window.innerWidth-e.width-10+`px`),e.left<0&&(O.style.left=`10px`),e.bottom>window.innerHeight&&(O.style.top=window.innerHeight-e.height-10+`px`)}})();