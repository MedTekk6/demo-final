import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const clients = await prisma.client.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-4">Commandes reçues</h1>
      <table className="w-full border">
        <thead><tr><th>ID</th><th>Nom</th><th>Email</th><th>Adresse</th><th>Date</th></tr></thead>
        <tbody>
          {clients.map(c => (
            <tr key={c.id}>
              <td className="border p-2">{c.id}</td>
              <td>{c.prenom} {c.nom}</td>
              <td>{c.email}</td>
              <td>{c.adresseLivraison}</td>
              <td>{new Date(c.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}