export type Role='Administrador'|'Coordinación de Arte'|'Diseñador'|'Solicitante'|'Aprobador';
export type Status='Brief recibido'|'En producción'|'En revisión'|'Aprobado'|'Entregado';
export type Campaign={id:string;title:string;vertical:string;objective:string;description:string;status:Status;owner:string;created:string;formats:string[];notes:string};
export type Asset={id:string;name:string;campaignId:string;type:string;version:number;status:'Borrador'|'En revisión'|'Aprobado';url?:string;created:string};
export type Review={id:string;assetId:string;decision:'Aprobado'|'Cambios solicitados';comment:string;by:string;at:string};
export type Store={campaigns:Campaign[];assets:Asset[];reviews:Review[]};
