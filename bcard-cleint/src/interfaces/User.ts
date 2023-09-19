export default interface User

{
 _id?:string;
 name: string;
 lastName:string;
 password: string;
  email: string;
  phone:string;
   image:string;
   state?:string;
   city:string;
   housenumber:number;
   country:string;
   street:string;
   zip?:number;
role?:string;
}