// ==UserScript==
// @name       Starred
// @namespace  http://work-tmzbot.rhcloud.com/
// @version    0.1
// @description  Starred
// @match      *
// @copyright  2012+, tmzbot
// ==/UserScript==

var star = document.createElement("div");
var a;
document.documentElement.appendChild(star);
star.classList.add("widget_star_class_container");
var isStarred = document.createElement("div");
var stars = document.createElement("div");
star.appendChild(isStarred);
star.appendChild(stars);
stars.classList.add("widget_star_class_list");
var starredWebpages = JSON.parse(localStorage["widget_star_website"]?localStorage["widget_star_website"]:(localStorage["widget_star_website"]="{}")),
	keys = Object.keys(starredWebpages),
	l = keys.length,
	s = "",
	ss=false,
	sc,
	se;//memory pre-allocation
for(var i=0;i<l;++i){
	s=keys[i];
	a=document.createElement("a");
	a.classList.add("widget_star_class_jumper");
	a.innerHTML=a.title=s;
	a.href=starredWebpages[s];
	if(starredWebpages[s]==location.href){
		ss=true;
		sc=s;
		a.classList.add("widget_star_class_jumper_view");
		se=a;
	}
	stars.appendChild(a);
}
isStarred.classList.add("widget_star_class_is");
if(ss==true){
	isStarred.classList.add("widget_star_class_iss");
	isStarred.innerHTML="Starred";
}else{
	isStarred.innerHTML="Not starred";
}
function starIT(){
	sc=prompt("Starring title:",sc);
	//update localStorage data
	starredWebpages = JSON.parse(localStorage["widget_star_website"]);
	starredWebpages[sc]=location.href;
	localStorage["widget_star_website"]=JSON.stringify(starredWebpages);
	//end updating
	//style
	isStarred.classList.add("widget_star_class_iss");
	isStarred.innerHTML="Starred";
	//se config
	se=document.createElement("a");
	se.href=localStorage[sc];
	se.innerHTML=sc;
	stars.appendChild(se);
	se.classList.add("widget_star_class_jumper");
	se.classList.add("widget_star_class_jumper_view");
	//se end
	//added successfully
	ss=true;
}
function deStarIT () {
	isStarred.classList.remove("widget_star_class_iss");
	isStarred.innerHTML="Not starred";
	ss=false;
	//update localStorage data
	starredWebpages = JSON.parse(localStorage["widget_star_website"]);
	delete starredWebpages[sc];//delete local data
	localStorage["widget_star_website"]=JSON.stringify(starredWebpages);
	//end updating
	stars.removeChild(se);
}
function toggleStar(){
	if(ss==false){
		starIT();
	}else{
		deStarIT();
	}
}
isStarred.addEventListener("click",toggleStar);
document.documentElement.appendChild(star);
