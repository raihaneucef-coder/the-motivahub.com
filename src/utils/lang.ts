// Detect post language from slug heuristics.
// Default to "en"; French posts typically use hyphens between French words
// or contain French stopwords.
const FR_HINT = /\b(le|la|les|des|d'|un|une|du|au|aux|et|est|sont|pour|avec|sans|dans|sur|sous|comment|pourquoi|quand|objectif|objectifs|habitude|habitudes|regle|règle|productivite|productivité|discipline|mental|mentale|menteur|force|puissance|reveil|réveil|matin|soir|journee|journée|etre|être|avoir|faire|aller|vouloir|pouvoir|vaincre|casser|arreter|arrêter|trouver|choisir|investir|reussite|réussite|echec|échec|gagner|perdre|vivre|vie|mort|temps|argent|travail|focus|stress|sommeil|nutrition|voyage|seul|solo)\b/i;

export function detectLangFromSlug(slug: string): "fr" | "en" {
  if (FR_HINT.test(slug)) return "fr";
  return "en";
}

export function langPath(slug: string): string {
  return detectLangFromSlug(slug) === "fr" ? "/fr/journal" : "/journal";
}