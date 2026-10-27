import type {Store,Campaign,Asset,Review} from './types';
export interface CreativeStudioService {
 listCampaigns():Promise<Campaign[]>; saveCampaign(c:Campaign):Promise<void>;
 listAssets():Promise<Asset[]>; saveAsset(a:Asset):Promise<void>;
 listReviews():Promise<Review[]>; saveReview(r:Review):Promise<void>;
}
const KEY='creative-studio-demo-v1';
const initial:Store={campaigns:[
{id:'CAMP-0001',title:'Nuestra App Oficial',vertical:'Institucional',objective:'Branding · descargas y registros',description:'Potenciar la app oficial, su descarga y el registro. Utilizar la captura original de la plataforma.',status:'En revisión',owner:'Equipo de Diseño',created:'2026-10-16',formats:['Instagram Story · 1080 × 1920','Instagram Feed · 1080 × 1350','Email / CRM · hero 1:1'],notes:'CTA: DESCARGAR APP. Sin logotipo recreado. Sin condiciones comerciales inventadas.'},
{id:'CAMP-0002',title:'Lanzamiento de nuevos juegos',vertical:'Casino / Slots',objective:'Promoción',description:'Explorar una comunicación de nuevos juegos con imágenes oficiales de Blackjack.',status:'En producción',owner:'Equipo de Diseño',created:'2026-10-14',formats:['Banner web'],notes:'Concepto de demostración; no utilizar campañas anteriores como referencia automática.'}
],assets:[
{id:'AST-001',name:'Captura original de la app',campaignId:'CAMP-0001',type:'Recurso original',version:1,status:'Aprobado',url:'/app-oficial-captura.png',created:'2026-10-16'},
{id:'AST-002',name:'Story · Nuestra App Oficial',campaignId:'CAMP-0001',type:'Instagram Story',version:1,status:'En revisión',created:'2026-10-16'},
{id:'AST-003',name:'Feed · Nuestra App Oficial',campaignId:'CAMP-0001',type:'Instagram Feed',version:1,status:'Borrador',created:'2026-10-16'},
{id:'AST-004',name:'Email / CRM · Hero 1:1',campaignId:'CAMP-0001',type:'Email / CRM',version:2,status:'En revisión',created:'2026-10-16'}
],reviews:[]};
function read():Store {try {const s=localStorage.getItem(KEY);return s?JSON.parse(s) as Store:structuredClone(initial)}catch{return structuredClone(initial)}}
function write(s:Store){localStorage.setItem(KEY,JSON.stringify(s));window.dispatchEvent(new Event('studio:change'))}
export const demoService:CreativeStudioService={
 async listCampaigns(){return read().campaigns},async saveCampaign(c){const s=read();const i=s.campaigns.findIndex(x=>x.id===c.id);if(i<0)s.campaigns.unshift(c);else s.campaigns[i]=c;write(s)},
 async listAssets(){return read().assets},async saveAsset(a){const s=read();const i=s.assets.findIndex(x=>x.id===a.id);if(i<0)s.assets.unshift(a);else s.assets[i]=a;write(s)},
 async listReviews(){return read().reviews},async saveReview(r){const s=read();s.reviews.unshift(r);write(s)}
};
/** Adapter boundary: replace demoService with API endpoints after Entra ID auth.
 * Backend should use Microsoft Graph for SharePoint files and Planner tasks,
 * and a server-side Power Automate approval flow. Never store Graph secrets in Vite.
 */
export interface Microsoft365Integration {
 createCampaignFolder(campaignId:string):Promise<{webUrl:string}>;
 uploadAsset(campaignId:string,filename:string,content:Blob):Promise<{itemId:string;webUrl:string}>;
 createPlannerTask(campaignId:string,title:string,assigneeId:string,dueDate?:string):Promise<{taskId:string}>;
 requestApproval(assetId:string,version:number,approverId:string):Promise<{approvalId:string}>;
 notifyTeams(channelId:string,message:string):Promise<void>;
}
export const integrationStatus={sharePoint:'Pendiente de conexión',planner:'Pendiente de conexión',teams:'Pendiente de conexión',powerAutomate:'Pendiente de conexión'};
export function resetDemo(){localStorage.removeItem(KEY);window.dispatchEvent(new Event('studio:change'))}
