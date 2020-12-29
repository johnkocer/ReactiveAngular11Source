import { environment } from "src/environments/environment";

export function Clog(T: any, s: string='') {
  if(!environment.production){
   if(s !== undefined && s !== '')     console.log(`%c ${s}`, 'background: green; color: white; display: block;');
   if(T.name !== undefined) console.log(`%c ${T.name}` , 'background: green; color: white; display: block;');

   console.log(JSON.stringify(T));
 }
}
