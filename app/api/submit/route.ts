import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom, prenom, email, adresseLivraison } = body;

    if (!nom || !prenom || !email || !adresseLivraison) {
      return NextResponse.json({ error: "Tous les champs sont obligatoires" }, { status: 400 });
    }

    const newClient = await prisma.client.create({
      data: { nom, prenom, email, adresseLivraison },
    });

    return NextResponse.json({ message: "Commande enregistrée", client: newClient }, { status: 200 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Cet email existe déjà" }, { status: 409 });
    }
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}