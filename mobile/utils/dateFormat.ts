import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export const formatRelativeTime = (dateString: string): string => {
  const distance = formatDistanceToNow(new Date(dateString), {
    locale: fr,
    addSuffix: false,
  });

  return `Depuis ${distance
    .replace("environ ", "")
    .replace("moins de ", "< ")
    .replace(" jours", "J")
    .replace(" jour", "J")
    .replace(" heures", "h")
    .replace(" heure", "h")
    .replace(" mois", "M")
    .replace(" minutes", "min")
    .replace(" minute", "min")}`;
};
