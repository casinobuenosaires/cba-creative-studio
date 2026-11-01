import React from 'react';
import {FORMAT_PRESETS,makeRequest,formatError} from './formats';
import type {FormatRequest} from './formats';
import './format-picker.css';
export default function FormatPicker({value,onChange}:{value:FormatRequest[];onChange:(value:FormatRequest[])=>void}){
 const update=(id:string,patch:Partial<FormatRequest>)=>onChange(value.map(f=>f.id===id?{...f,...patch}:f));
 return <fieldset className="format-picker"><legend>Formatos solicitados · selección múltiple</legend><p>Elegí los formatos y revisá las medidas. Se guardarán en el brief en píxeles.</p><div className="format-options">{FORMAT_PRESETS.map(preset=>{
  const selected=value.find(f=>f.id===preset.id);const error=selected?formatError(selected):'';
  return <div key={preset.id} className={'format-option '+(selected?'is-selected':'')}>
   <label className="format-check"><input type="checkbox" checked={!!selected} onChange={e=>onChange(e.target.checked?[...value,makeRequest(preset)]:value.filter(f=>f.id!==preset.id))}/><span><strong>{preset.label}</strong><small>{preset.width?`${preset.width} × ${preset.height} px`:'Medidas a definir'}</small></span></label>
   {selected&&<div className="format-measures">{preset.note&&<small>{preset.note}</small>}{preset.id==='custom'&&<label>Nombre de ubicación<input required value={selected.label} onChange={e=>update(preset.id,{label:e.target.value})}/></label>}<div className="format-size-pair"><label>Ancho (px)<input required type="number" min="1" step="1" value={selected.width} onChange={e=>update(preset.id,{width:e.target.value})}/></label><span aria-hidden="true">×</span><label>Alto (px)<input required type="number" min="1" step="1" value={selected.height} onChange={e=>update(preset.id,{height:e.target.value})}/></label></div>{error&&<small role="status" className="format-error">{error}</small>}</div>}
  </div>;
 })}</div>{value.length>0&&<div className="format-summary"><strong>{value.length} formato{value.length===1?'':'s'} seleccionado{value.length===1?'':'s'}</strong><small>Estas son las medidas del pedido. La validación del archivo se realiza después de exportarlo.</small></div>}</fieldset>;
}
