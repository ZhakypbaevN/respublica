import{d as S,k as g,a as _,z as C,o as e,c as s,b as o,F as p,q as u,f as v,w as c,t as n,n as r,e as m,B as k,g as x,T as N,K as I,_ as L}from"./index-fe5fdd18.js";const V={class:"sideBar"},z={class:"sideBar-list"},F=["onClick"],R={key:2,class:"sideBar-dropDown"},T=["onClick"],$={key:0},q={class:"sideBar-dropDown-list"},E=S({__name:"SideBar",props:{list:{}},emits:["clickNav","update:list"],setup(B,{emit:y}){const f=B,w=y,D=g({get:()=>f.list,set:a=>w("update:list",a)});return(a,l)=>{const d=_("RouterLink"),b=_("SvgIcon"),h=C("collapse");return e(),s("div",V,[o("div",z,[(e(!0),s(p,null,u(D.value,t=>(e(),s("div",{key:t.title,class:""},[!t.typeDropDown&&t.link?(e(),v(d,{key:0,class:r(["sideBar-link",{btnStyle:t.typeButton}]),to:t.link,onClick:l[0]||(l[0]=()=>a.$emit("clickNav"))},{default:c(()=>[o("span",null,n(t.title),1)]),_:2},1032,["class","to"])):!t.typeDropDown&&t.func?(e(),s("button",{key:1,class:r(["sideBar-link",{btnStyle:t.typeButton}]),onClick:t.func},[o("span",null,n(t.title),1)],10,F)):(e(),s("div",R,[o("button",{class:r(["sideBar-dropDown-btn",{active:t.active}]),onClick:()=>t.active=!t.active},[o("span",null,n(t.title),1),m(b,{name:"chevron-down",viewboxHeight:"56",viewboxWidth:"56"})],10,T),m(N,null,{default:c(()=>[t.active?k((e(),s("div",$,[o("div",q,[(e(!0),s(p,null,u(t.children,i=>(e(),v(d,{class:"sideBar-link",key:i.title,to:i.link},{default:c(()=>[o("span",null,n(i.title),1)]),_:2},1032,["to"]))),128))])])),[[h]]):x("",!0)]),_:2},1024)]))]))),128))]),I(a.$slots,"default",{},void 0,!0)])}}});const K=L(E,[["__scopeId","data-v-db562439"]]);export{K as S};