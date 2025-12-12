import { z } from "zod";

export type CreateCarFormInputs = {
  prix: string;
  marqueId: string;
  modeleId: string;
  anneeMiseCirculation: string;
  moisMiseCirculation: string;
  kilometrage: string;
  villeId: string;
  vendeur: {
    type: "INDIVIDUAL" | "PROFESSIONAL" | "DEALER";
    nom: string;
    tel: string;
    email: string;
    adresse: string;
    villeId: string;
  };
};

export const CreateCarFormSchema = z.object({
  prix: z
    .string()
    .min(1, "Le prix est requis")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 1000, {
      message: "Le prix minimum est 1000 MAD",
    }),
  marqueId: z.string().min(1, "La marque est requise"),
  modeleId: z.string().min(1, "Le modèle est requis"),
  anneeMiseCirculation: z
    .string()
    .min(1, "L'année est requise")
    .refine(
      (val) => {
        const year = Number(val);
        return !isNaN(year) && year >= 1900 && year <= new Date().getFullYear();
      },
      {
        message: `L'année doit être entre 1900 et ${new Date().getFullYear()}`,
      }
    ),
  moisMiseCirculation: z
    .string()
    .min(1, "Le mois est requis")
    .refine(
      (val) => {
        const month = Number(val);
        return !isNaN(month) && month >= 1 && month <= 12;
      },
      {
        message: "Le mois doit être entre 1 et 12",
      }
    ),
  kilometrage: z
    .string()
    .min(1, "Le kilométrage est requis")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Le kilométrage ne peut pas être négatif",
    }),
  villeId: z.string().min(1, "La ville est requise"),
  vendeur: z.object({
    type: z.enum(["INDIVIDUAL", "PROFESSIONAL", "DEALER"]),
    nom: z.string().min(1, "Le nom du vendeur est requis"),
    tel: z
      .string()
      .min(1, "Le téléphone est requis")
      .regex(
        /^\+212[5-7]\d{8}$/,
        "Le numéro doit être au format marocain (+212xxxxxxxxx)"
      ),
    email: z
      .string()
      .min(1, "L'email est requis")
      .email("L'email n'est pas valide"),
    adresse: z.string().min(1, "L'adresse est requise"),
    villeId: z.string().min(1, "La ville du vendeur est requise"),
  }),
});
