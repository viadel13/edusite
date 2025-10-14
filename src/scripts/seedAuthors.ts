import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

const authors = [
  {
    id: "walter_isaacson",
    name: "Walter Isaacson",
    profileImage:
      "https://images.unsplash.com/photo-1512447582229-d8326325d547?w=400",
    bio: "Auteur de biographies célèbres, notamment celle de Steve Jobs.",
    categories: ["biography"], // L'auteur est dans la catégorie "biography"
  },
  {
    id: "michelle_obama",
    name: "Michelle Obama",
    profileImage:
      "https://images.unsplash.com/photo-1531588669495-cdb77d5c4f91?w=400",
    bio: "Ancienne Première Dame des États-Unis et auteure des mémoires 'Becoming'.",
    categories: ["biography"], // L'auteur est dans la catégorie "biography"
  },
  {
    id: "ashlee_vance",
    name: "Ashlee Vance",
    profileImage:
      "https://images.unsplash.com/photo-1502831258482-8be712f7b2cf?w=400",
    bio: "Journaliste et auteur de la biographie d'Elon Musk.",
    categories: ["biography"], // L'auteur est dans la catégorie "biography"
  },
  {
    id: "gillian_flynn",
    name: "Gillian Flynn",
    profileImage:
      "https://images.unsplash.com/photo-1554200876-56c2f25224fa?w=400",
    bio: "Auteur de thrillers psychologiques, notamment 'Gone Girl'.",
    categories: ["thriller"], // L'auteur est dans la catégorie "thriller"
  },
  {
    id: "stieg_larsson",
    name: "Stieg Larsson",
    profileImage:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400",
    bio: "Auteur suédois, connu pour la série 'Millénium'.",
    categories: ["thriller"], // L'auteur est dans la catégorie "thriller"
  },
  {
    id: "alex_michaelides",
    name: "Alex Michaelides",
    profileImage:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
    bio: "Auteur de thrillers psychologiques à succès, notamment 'The Silent Patient'.",
    categories: ["thriller"], // L'auteur est dans la catégorie "thriller"
  },
  {
    id: "frank_herbert",
    name: "Frank Herbert",
    profileImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400",
    bio: "Auteur de science-fiction, connu pour 'Dune'.",
    categories: ["science_fiction"], // L'auteur est dans la catégorie "science_fiction"
  },
  {
    id: "andy_weir",
    name: "Andy Weir",
    profileImage:
      "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400",
    bio: "Auteur de science-fiction, connu pour 'The Martian'.",
    categories: ["science_fiction"], // L'auteur est dans la catégorie "science_fiction"
  },
  {
    id: "william_gibson",
    name: "William Gibson",
    profileImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
    bio: "Auteur de science-fiction, pionnier du genre cyberpunk.",
    categories: ["science_fiction"], // L'auteur est dans la catégorie "science_fiction"
  },
  {
    id: "patrick_rothfuss",
    name: "Patrick Rothfuss",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    bio: "Auteur de fantasy, connu pour 'The Name of the Wind'.",
    categories: ["fantasy"], // L'auteur est dans la catégorie "fantasy"
  },
  {
    id: "george_rr_martin",
    name: "George R.R. Martin",
    profileImage:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400",
    bio: "Auteur de fantasy, créateur de la saga 'A Song of Ice and Fire'.",
    categories: ["fantasy"], // L'auteur est dans la catégorie "fantasy"
  },
  {
    id: "nicholas_sparks",
    name: "Nicholas Sparks",
    profileImage:
      "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?w=400",
    bio: "Auteur de romance, connu pour 'The Notebook'.",
    categories: ["romance"], // L'auteur est dans la catégorie "romance"
  },
  {
    id: "jane_austen",
    name: "Jane Austen",
    profileImage:
      "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=400",
    bio: "Auteur classique de romans, connue pour 'Pride and Prejudice'.",
    categories: ["romance"], // L'auteur est dans la catégorie "romance"
  },
];

// Fonction pour ajouter les auteurs dans Firebase
export async function seedAuthors() {
  console.log("🌱 Début de la création des auteurs...");
  const authorsRef = collection(db, "authors"); // Référence à la collection "auteurs"

  for (const author of authors) {
    const newDocRef = doc(authorsRef); // Laisser Firebase générer l'ID automatiquement
    await setDoc(newDocRef, {
      authorId: author.id,
      name: author.name,
      profileImage: author.profileImage,
      bio: author.bio,
      categories: author.categories, // Les catégories associées à l'auteur
      createdAt: Timestamp.now(),
    });
    console.log(`  ✅ Auteur créé: ${author.name}`);
  }
}

// Appel de la fonction pour peupler la base de données
