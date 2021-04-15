gulp_place("../services/style_global.sub.js", "file_once");/* global style_global */
gulp_place("../services/data.sub.js", "file_once");/* global data */
gulp_place("../avatar_helpers/hairFullConfig.sub.js", "file_once");/* global hairFullConfig */
gulp_place("../elements_helpers/createSVG.sub.js", "file_once");/* global createSVG */
gulp_place("../elements_helpers/createUSE.sub.js", "file_once");/* global createUSE */
gulp_place("../elements_helpers/mixinObservedAttributes.sub.js", "file_once");/* global mixinObservedAttributes */
/* this folder *//* global SVGBigHeads */
/** @extends {HTMLElement} */
class SVGBigHeadsPart extends mixinObservedAttributes(HTMLElement, [ "href", "type", "value" ]){
    static get tag_name(){ return SVGBigHeads.tag_name+"-part"; }
    constructor(){ super(); style_global.create(); }
    attributeChangedCallback(name, value_old, value_new){
        if(name==="type") return false;
        if(!this._svg||value_new===value_old) return false;
        return this.connectedCallback();
    }
    connectedCallback(){
        const [ type, value, href ]= this.config;
        if(this._svg) this._svg.remove();
        this._svg= this.appendChild(createSVG());
        if(!type||value==="none") return false;
        
        const appendUSE= name=> this._svg.appendChild(createUSE(`${href}#${type}-${name}`));
        if(!data.isFromMultiplePieces(type))
            return appendUSE(value);
        const config= hairFullConfig(value);
        [ "back", "top", "front" ].forEach(part=> appendUSE(config[part]));
    }
    get config(){
        const [ href, type, value ]= this.constructor.observedAttributes.map(n=> this.getAttribute(n));
        return [ type, value, href ];
    }
    nextValue(shift= 1){
        return this.setAttribute("value", data.getNextPartName(
            this.getAttribute("type"),
            this.getAttribute("value"),
            shift
        ));
    }
}
customElements.define(SVGBigHeadsPart.tag_name, SVGBigHeadsPart);