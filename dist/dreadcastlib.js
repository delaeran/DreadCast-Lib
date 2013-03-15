/*! DreadCastLib - v0 - 2012-12-01
* http://www.dreadcast.me/
* Copyright (c) 2012 Nobody; Licensed WTF Public License */

/*--------------Init.js-----------------*/
var VRAI = true; 
var FAUX = false;
var classes = {};


/*-------------Faire un heritage-------------------*/
function heritage(object1, object2) { 
        var output = clonage(object1);

        for (var key in object2) { 
		output[key] = object2[key];
	}

        return output;

}

/*-------------Faire un clonage-------------------*/
function clonage(object1)
{
	if(typeof(object1) != 'object' || object1 == null)
	{
		return object1;
	}
	
	var newObject = object1.constructor();
	for(var i in object1)
	{
		newObject[i] = clonage(object1[i]);
	}
	
	return newObject;
}

/*------------Element ID via RegExp-----------------*/
function getElementsByRegExpId(p_regexp, p_element, p_tagName) {
	p_element = p_element === undefined ? document : p_element;
	p_tagName = p_tagName === undefined ? '*' : p_tagName;
	var v_return = [];
	var v_inc = 0;
	for(var v_i = 0, v_il = p_element.getElementsByTagName(p_tagName).length; v_i < v_il; v_i++) {
		if(p_element.getElementsByTagName(p_tagName).item(v_i).id && p_element.getElementsByTagName(p_tagName).item(v_i).id.match(p_regexp)) {
			v_return[v_inc] = p_element.getElementsByTagName(p_tagName).item(v_i);
			v_inc++;
		}
	}
	return v_return;
}


/*--------------Activable.class.js-----------------*/

var Execute = { null : null };

classes["activable"] = function (name) { var objet = {

	estOuvert: function() { 
			var reg = new RegExp("^db_"+name+"_\\d+$", "i");
			return (getElementsByRegExpId(reg).length != 0) ? true : false;
		},

	ouverture: function(callback) { 
			Execute[name] = false;
			Execute[name+"_"] = function() {
				if (item(name).estOuvert() && !Execute[name]){
					callback();
					alert("exec :" + Execute[name])
					Execute[name] = true;
				}
				else if (!item(name).estOuvert() && Execute[name]) {
					alert("exec :" + Execute[name])
					Execute[name] = false;
				}
			}
			
			setInterval(Execute[name+"_"], 1000);
		},
		
	fermeture: function(callback) { 
			Execute[name] = false;
			Execute["_"+name] = function() {
				if (item(name).estOuvert() && !Execute[name]){
					Execute[name] = true;
				}
				else if (!item(name).estOuvert() && Execute[name]) {
					callback();
					Execute[name] = false;
				}
			}
			
			setInterval(Execute["_"+name], 1000);
		}


}; 

objet.estOuvert.toString = function() { return objet.estOuvert(); 

};return objet;};

/*--------------Item.class.js-----------------*/
classes["item"] = function (name) { var objet = { 

    type : name
    
    
    
    
    

}; return heritage(classes[name](name), objet);};

var item = classes["item"];

/*--------------Aitl.class.js-----------------*/
classes["aitl"] = function (name) { var objet = { 

	couleur : "blanc"



}; return heritage(classes["activable"](name), objet);};
