export type FormatPreset = {id:string;label:string;width?:number;height?:number;square?:boolean;note?:string};
export type FormatRequest = {id:string;label:string;width:string;height:string};
export const FORMAT_PRESETS:FormatPreset[] = [
 {id:'banner-reference',label:'Banner web · referencia Mystery Buffalo',width:1600,height:854,note:'Medida de referencia de esa campaña; ajustable para otras ubicaciones.'},
 {id:'wide',label:'Banner Wide',width:2112,height:496},
 {id:'mpb',label:'MPB — Mini Banner Promotion',width:1536,height:515},
 {id:'thumb-landscape',label:'Thumb Landscape',width:400,height:288},
 {id:'thumb-square',label:'Thumb Square',width:400,height:400},
 {id:'story',label:'Instagram Story',width:1080,height:1920},
 {id:'feed-portrait',label:'Instagram Feed 4:5',width:1080,height:1350},
 {id:'feed-square',label:'Instagram Feed 1:1',width:1080,height:1080},
 {id:'email',label:'Email / CRM · cuadrado',square:true,note:'Indicá resolución exacta; ancho y alto deben coincidir.'},
 {id:'mobile',label:'Banner mobile',note:'Indicá las medidas de la ubicación.'},
 {id:'custom',label:'Personalizado',note:'Indicá nombre de ubicación y medidas.'}
];
export const makeRequest=(preset:FormatPreset):FormatRequest=>({id:preset.id,label:preset.id==='custom'?'':preset.label,width:preset.width?.toString()||'',height:preset.height?.toString()||''});
export const positivePixels=(value:string)=>/^\d+$/.test(value)&&Number.isSafeInteger(Number(value))&&Number(value)>0;
export const formatError=(request:FormatRequest):string=>{
 if(!request.label.trim())return 'Indicá el nombre de la ubicación.';
 if(!positivePixels(request.width)||!positivePixels(request.height))return 'Indicá ancho y alto enteros positivos en píxeles.';
 const preset=FORMAT_PRESETS.find(p=>p.id===request.id);
 if((preset?.square||request.id==='thumb-square'||request.id==='feed-square')&&Number(request.width)!==Number(request.height))return 'Este formato requiere ancho y alto iguales.';
 return '';
};
export const formatLabel=(request:FormatRequest)=>`${request.label.trim()} · ${Number(request.width)} × ${Number(request.height)} px`;
