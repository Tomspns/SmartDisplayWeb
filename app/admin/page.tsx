"use client";

import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { getUsers, deleteUser, updateUser, User } from "@/lib/authApi";

export default function AdminPage() {

  const [users,setUsers] = useState<User[]>([]);
  const [search,setSearch] = useState("");
  const [editing,setEditing] = useState<User|null>(null);

  useEffect(()=>{

    async function load(){

      const data = await getUsers();
      setUsers(data.users);

    }

    load();

  },[]);

  async function refresh(){

    const data = await getUsers();
    setUsers(data.users);

  }

  async function remove(id:number){

    if(!confirm("Supprimer cet utilisateur ?")) return;

    await deleteUser(id);

    refresh();

  }

  async function save(){

    if(!editing) return;

    await updateUser(editing.id_user,{
      nom:editing.nom,
      prenom:editing.prenom,
      email:editing.email,
      id_role:editing.id_role
    });

    setEditing(null);

    refresh();

  }

  const filtered = users.filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase())
    || u.nom.toLowerCase().includes(search.toLowerCase())
    || u.prenom.toLowerCase().includes(search.toLowerCase())
  )

  return (

    <PageLayout title="Admin - Utilisateurs">

      <Card className="space-y-6">

        <div className="flex items-center justify-between">

          <h2 className="text-xl font-bold">
            Gestion des utilisateurs
          </h2>

          <input
            placeholder="Rechercher utilisateur..."
            className="border rounded-lg px-3 py-2 text-sm"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

        </div>


        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="text-left border-b">

              <tr>

                <th className="py-2">Nom</th>
                <th>Email</th>
                <th>Role</th>
                <th className="text-right">Actions</th>

              </tr>

            </thead>

            <tbody>

              {filtered.map(u => (

                <tr key={u.id_user} className="border-b">

                  <td className="py-3">
                    {u.prenom} {u.nom}
                  </td>

                  <td>
                    {u.email}
                  </td>

                  <td>

                    {u.id_role === 2 ? (

                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                        Admin
                      </span>

                    ) : (

                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                        Utilisateur
                      </span>

                    )}

                  </td>

                  <td className="flex justify-end gap-2 py-2">

                    <Button
                      onClick={()=>setEditing(u)}
                    >
                      Modifier
                    </Button>

                    <Button
                      onClick={()=>remove(u.id_user)}
                    >
                      Supprimer
                    </Button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </Card>


      {editing && (

        <Card className="mt-6 space-y-4">

          <h3 className="font-bold text-lg">
            Modifier utilisateur
          </h3>

          <input
            className="border p-2 rounded w-full"
            value={editing.nom}
            onChange={(e)=>setEditing({...editing,nom:e.target.value})}
          />

          <input
            className="border p-2 rounded w-full"
            value={editing.prenom}
            onChange={(e)=>setEditing({...editing,prenom:e.target.value})}
          />

          <input
            className="border p-2 rounded w-full"
            value={editing.email}
            onChange={(e)=>setEditing({...editing,email:e.target.value})}
          />

          <select
            className="border p-2 rounded w-full"
            value={editing.id_role}
            onChange={(e)=>setEditing({...editing,id_role:Number(e.target.value)})}
          >

            <option value={1}>Utilisateur</option>
            <option value={2}>Admin</option>

          </select>

          <div className="flex gap-2">

            <Button onClick={save}>
              Enregistrer
            </Button>

            <Button onClick={()=>setEditing(null)}>
              Annuler
            </Button>

          </div>

        </Card>

      )}

    </PageLayout>

  )

}