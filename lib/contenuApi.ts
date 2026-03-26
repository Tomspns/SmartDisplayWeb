import { apiFetch } from "./api"

export type Contenu = {
  id_contenu:number
  titre:string
  message:string
  type:string
  date_debut:string
  date_fin:string
}

export async function getContenus(){

  return apiFetch<{contenus:Contenu[]}>("/contenus")

}

export async function createContenu(data:{
  titre:string
  message:string
  type:string
  date_debut:string
  date_fin:string
}){

  return apiFetch("/contenus",{
    method:"POST",
    body:JSON.stringify(data)
  })

}