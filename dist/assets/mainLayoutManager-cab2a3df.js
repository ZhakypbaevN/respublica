import{d as m,i as h,r as s,o as d,c,a as e,b as a,w as _,A as v,J as f,p as g,e as y,_ as u,f as w,T as k,g as x,h as M}from"./index-fa3f324d.js";import{S as b}from"./SideBar-0f12841f.js";const B=t=>(g("data-v-9fa069df"),t=t(),y(),t),I={class:"header"},S={class:"header-main",id:"header-main"},C={class:"wrapper"},L={class:"header-main-inner"},$={class:"header-main-right"},H=B(()=>e("button",{class:"header-main-lang"},[e("span",null,"РУ")],-1)),J=m({__name:"headerManager",setup(t){const o=h(!1);return(l,n)=>{const i=s("SvgIcon"),r=s("RouterLink"),p=s("Button");return d(),c("header",I,[e("div",S,[e("div",C,[e("div",L,[a(r,{to:"/",class:"header-main-logo"},{default:_(()=>[a(i,{class:"logo-big",name:"logo",viewboxWidth:260,viewboxHeight:49})]),_:1}),e("div",$,[e("button",{onClick:n[0]||(n[0]=()=>o.value=!0),class:"header-main-logo"},[a(p,{name:"Создать члена партии",type:"default-blue"})]),H,a(v)])])])]),a(f,{show:o.value,onHide:n[1]||(n[1]=()=>o.value=!1)},null,8,["show"])])}}});const A=u(J,[["__scopeId","data-v-9fa069df"]]);const N={class:"layout"},P={class:"layout-inner"},R={class:"layout-content",id:"layout-content"},T={__name:"mainLayoutManager",setup(t){w(()=>{document.body.style="height:100vh;overflow:hidden;"});const o=[{title:"Члены партии",link:"/manager/party-list/confirm"},{title:"Заявки на удаление",link:"/manager/party-list/exit-request"},{title:"Удаленные",link:"/manager/party-list/deleted"}];return(l,n)=>{const i=s("router-view");return d(),c("div",N,[a(A),e("div",P,[a(b,{list:o}),e("div",R,[a(i,null,{default:_(({Component:r})=>[a(k,{mode:"out-in"},{default:_(()=>[(d(),x(M(r),{key:l.$route.path}))]),_:2},1024)]),_:1})])])])}}},D=u(T,[["__scopeId","data-v-583cf00e"]]);export{D as default};