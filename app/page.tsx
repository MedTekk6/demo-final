"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    adresseLivraison: "",
  });
  const [status, setStatus] = useState<{ type: string; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.ok) {
      setStatus({ type: "success", message: "✅ Commande enregistrée !" });
      setFormData({ nom: "", prenom: "", email: "", adresseLivraison: "" });
    } else {
      setStatus({ type: "error", message: data.error || "Erreur" });
    }
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Passer commande</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="adresseLivraison" placeholder="Adresse de livraison" value={formData.adresseLivraison} onChange={handleChange} className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Envoyer</button>
      </form>
      {status && (
        <div className={`mt-4 p-2 text-center rounded ${status.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {status.message}
        </div>
      )}
    </main>
  );
}