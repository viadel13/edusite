// // src/scripts/seedData.ts
// // Script pour peupler Firebase avec des données de test
// import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
// import { db } from "../lib/firebase/config";
//
// // Catégories à créer
// const categories = [
//   {
//     id: "biography",
//     name: "Biography",
//     slug: "biography",
//     description: "Biographies et mémoires de personnalités",
//     color: "#F59E0B",
//     icon: "👤",
//   },
//   {
//     id: "thriller",
//     name: "Thriller",
//     slug: "thriller",
//     description: "Romans policiers et thrillers",
//     color: "#10B981",
//     icon: "🔍",
//   },
//   {
//     id: "science_fiction",
//     name: "Science Fiction",
//     slug: "science_fiction",
//     description: "Science-fiction et futurisme",
//     color: "#3B82F6",
//     icon: "🚀",
//   },
//   {
//     id: "fantasy",
//     name: "Fantasy",
//     slug: "fantasy",
//     description: "Mondes fantastiques et magie",
//     color: "#8B5CF6",
//     icon: "🧙",
//   },
//   {
//     id: "romance",
//     name: "Romance",
//     slug: "romance",
//     description: "Histoires d'amour et relations",
//     color: "#EC4899",
//     icon: "💕",
//   },
// ];
//
// // Livres exemples à créer
// const books = [
//   // BIOGRAPHIES
//   {
//     title: "Steve Jobs",
//     description:
//       "La biographie autorisée du co-fondateur d'Apple. Un récit passionnant de l'homme qui a révolutionné l'industrie technologique.",
//     author: ["Walter Isaacson"],
//     price: 29.99,
//     originalPrice: 39.99,
//     discount: 25,
//     publishYear: 2011,
//     isbn: "978-1451648539",
//     pages: 656,
//     language: "fr",
//     categoryId: "biography",
//     subjects: ["Technology", "Business", "Innovation"],
//     rating: 4.5,
//     reviewCount: 1250,
//     inStock: true,
//     featured: true,
//     coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
//   },
//   {
//     title: "Becoming",
//     description:
//       "Les mémoires intimes et puissantes de l'ancienne Première Dame Michelle Obama.",
//     author: ["Michelle Obama"],
//     price: 24.99,
//     publishYear: 2018,
//     isbn: "978-1524763138",
//     pages: 448,
//     language: "fr",
//     categoryId: "biography",
//     subjects: ["Politics", "Inspiration", "Women"],
//     rating: 4.8,
//     reviewCount: 2100,
//     inStock: true,
//     featured: true,
//     coverUrl:
//       "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
//   },
//   {
//     title: "Elon Musk",
//     description:
//       "La biographie définitive du visionnaire derrière Tesla, SpaceX et l'avenir de l'humanité.",
//     author: ["Ashlee Vance"],
//     price: 27.99,
//     publishYear: 2015,
//     isbn: "978-0062301239",
//     pages: 416,
//     language: "fr",
//     categoryId: "biography",
//     subjects: ["Technology", "Space", "Entrepreneurship"],
//     rating: 4.6,
//     reviewCount: 980,
//     inStock: true,
//     featured: false,
//     coverUrl:
//       "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400",
//   },
//
//   // THRILLERS
//   {
//     title: "Gone Girl",
//     description:
//       "Un thriller psychologique captivant sur un mariage qui tourne au cauchemar. Qui dit la vérité ?",
//     author: ["Gillian Flynn"],
//     price: 19.99,
//     originalPrice: 24.99,
//     discount: 20,
//     publishYear: 2012,
//     isbn: "978-0307588371",
//     pages: 432,
//     language: "fr",
//     categoryId: "thriller",
//     subjects: ["Mystery", "Suspense", "Psychological"],
//     rating: 4.2,
//     reviewCount: 1800,
//     inStock: true,
//     featured: true,
//     coverUrl: "https://images.unsplash.com/photo-1554200876-56c2f25224fa?w=400",
//   },
//   {
//     title: "The Girl with the Dragon Tattoo",
//     description:
//       "Un journaliste et une hackeuse enquêtent sur une disparition vieille de 40 ans.",
//     author: ["Stieg Larsson"],
//     price: 22.99,
//     publishYear: 2005,
//     isbn: "978-0307949486",
//     pages: 590,
//     language: "fr",
//     categoryId: "thriller",
//     subjects: ["Crime", "Investigation", "Sweden"],
//     rating: 4.4,
//     reviewCount: 1500,
//     inStock: true,
//     featured: false,
//     coverUrl:
//       "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400",
//   },
//   {
//     title: "The Silent Patient",
//     description:
//       "Une femme tire sur son mari puis ne dit plus un mot. Un psychothérapeute est obsédé par découvrir pourquoi.",
//     author: ["Alex Michaelides"],
//     price: 18.99,
//     publishYear: 2019,
//     isbn: "978-1250301697",
//     pages: 336,
//     language: "fr",
//     categoryId: "thriller",
//     subjects: ["Psychological", "Mystery", "Suspense"],
//     rating: 4.5,
//     reviewCount: 2200,
//     inStock: true,
//     featured: true,
//     coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
//   },
//
//   // SCIENCE FICTION
//   {
//     title: "Dune",
//     description:
//       "Sur la planète désertique d'Arrakis, une épopée galactique se déroule autour de l'épice la plus précieuse de l'univers.",
//     author: ["Frank Herbert"],
//     price: 21.99,
//     publishYear: 1965,
//     isbn: "978-0441172719",
//     pages: 688,
//     language: "fr",
//     categoryId: "science_fiction",
//     subjects: ["Space Opera", "Politics", "Ecology"],
//     rating: 4.7,
//     reviewCount: 3500,
//     inStock: true,
//     featured: true,
//     coverUrl:
//       "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400",
//   },
//   {
//     title: "The Martian",
//     description:
//       "Laissé pour mort sur Mars, un astronaute doit utiliser son ingéniosité pour survivre.",
//     author: ["Andy Weir"],
//     price: 16.99,
//     publishYear: 2011,
//     isbn: "978-0553418026",
//     pages: 384,
//     language: "fr",
//     categoryId: "science_fiction",
//     subjects: ["Mars", "Survival", "Science"],
//     rating: 4.6,
//     reviewCount: 2800,
//     inStock: true,
//     featured: false,
//     coverUrl:
//       "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400",
//   },
//   {
//     title: "Neuromancer",
//     description:
//       "Le roman cyberpunk qui a défini le genre. Un hacker est embauché pour l'ultime piratage.",
//     author: ["William Gibson"],
//     price: 19.99,
//     publishYear: 1984,
//     isbn: "978-0441569595",
//     pages: 271,
//     language: "fr",
//     categoryId: "science_fiction",
//     subjects: ["Cyberpunk", "AI", "Virtual Reality"],
//     rating: 4.3,
//     reviewCount: 1100,
//     inStock: true,
//     featured: false,
//     coverUrl:
//       "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
//   },
//
//   // FANTASY
//   {
//     title: "The Name of the Wind",
//     description:
//       "L'histoire de Kvothe, un aventurier légendaire devenu aubergiste, racontant son passé.",
//     author: ["Patrick Rothfuss"],
//     price: 23.99,
//     publishYear: 2007,
//     isbn: "978-0756404741",
//     pages: 662,
//     language: "fr",
//     categoryId: "fantasy",
//     subjects: ["Magic", "Adventure", "Music"],
//     rating: 4.8,
//     reviewCount: 4200,
//     inStock: true,
//     featured: true,
//     coverUrl:
//       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
//   },
//   {
//     title: "A Game of Thrones",
//     description:
//       "Dans un monde médiéval fantastique, plusieurs maisons nobles se battent pour le trône.",
//     author: ["George R.R. Martin"],
//     price: 25.99,
//     publishYear: 1996,
//     isbn: "978-0553103540",
//     pages: 694,
//     language: "fr",
//     categoryId: "fantasy",
//     subjects: ["Epic", "Politics", "Dragons"],
//     rating: 4.7,
//     reviewCount: 5100,
//     inStock: true,
//     featured: true,
//     coverUrl:
//       "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400",
//   },
//
//   // ROMANCE
//   {
//     title: "The Notebook",
//     description:
//       "Une histoire d'amour intemporelle qui résiste à toutes les épreuves.",
//     author: ["Nicholas Sparks"],
//     price: 15.99,
//     publishYear: 1996,
//     isbn: "978-0446605236",
//     pages: 214,
//     language: "fr",
//     categoryId: "romance",
//     subjects: ["Love", "Drama", "Memory"],
//     rating: 4.5,
//     reviewCount: 2600,
//     inStock: true,
//     featured: false,
//     coverUrl:
//       "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?w=400",
//   },
//   {
//     title: "Pride and Prejudice",
//     description:
//       "Le classique de Jane Austen sur l'amour, les préjugés et les malentendus.",
//     author: ["Jane Austen"],
//     price: 12.99,
//     publishYear: 1813,
//     isbn: "978-0141439518",
//     pages: 432,
//     language: "fr",
//     categoryId: "romance",
//     subjects: ["Classic", "England", "Society"],
//     rating: 4.6,
//     reviewCount: 3200,
//     inStock: true,
//     featured: true,
//     coverUrl:
//       "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=400",
//   },
// ];
//
// /**
//  * Fonction principale pour peupler la base de données
//  */
// export async function seedDatabase() {
//   console.log("🌱 Début du peuplement de la base de données...");
//
//   try {
//     // 1. Créer les catégories
//     console.log("📁 Création des catégories...");
//     for (const category of categories) {
//       const docRef = doc(db, "categories", category.id);
//       await setDoc(docRef, {
//         ...category,
//         createdAt: Timestamp.now(),
//         booksCount: 0,
//       });
//       console.log(`  ✅ Catégorie créée: ${category.name}`);
//     }
//
//     // 2. Créer les livres
//     console.log("\n📚 Création des livres...");
//     for (const book of books) {
//       const booksRef = collection(db, "books");
//       const newDocRef = doc(booksRef);
//
//       await setDoc(newDocRef, {
//         ...book,
//         createdAt: Timestamp.now(),
//         updatedAt: Timestamp.now(),
//       });
//       console.log(`  ✅ Livre créé: ${book.title}`);
//     }
//
//     console.log("\n✨ Base de données peuplée avec succès!");
//     console.log(`   - ${categories.length} catégories créées`);
//     console.log(`   - ${books.length} livres créés`);
//   } catch (error) {
//     console.error("❌ Erreur lors du peuplement:", error);
//     throw error;
//   }
// }
//
// // Exécuter le script si appelé directement
// // Pour l'utiliser: créer un bouton admin ou utiliser Node.js
// if (typeof window === "undefined") {
//   seedDatabase()
//     .then(() => {
//       console.log("✅ Script terminé");
//       process.exit(0);
//     })
//     .catch((error) => {
//       console.error("❌ Erreur:", error);
//       process.exit(1);
//     });
// }
