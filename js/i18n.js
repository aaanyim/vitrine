/* AAANYIM — textes du site (francais et anglais).
 * Regle (AZ 21/11 : « plus vrai et moderne ») : seulement ce qui marche aujourd'hui ; aucun chiffre ecrit ici,
 * les nombres viennent du serveur (js/site.js) ou ne sont pas montres. Vouvoiement, phrases courtes. */
var SITE_TEXT = {
  fr: {
    meta: {
      title: "AAANYIM — Les commerces près de chez vous, dans une seule appli",
      description: "Trouvez, commandez, réservez et suivez chez les commerces près de chez vous, au Togo et au Cameroun. Installez l'application en 3 gestes, ou commandez sur WhatsApp."
    },
    nav: { clients: "Clients", merchants: "Commerçants", activities: "Activités", pricing: "Tarifs", install: "Installer l'app", open: "Ouvrir AAANYIM", menu: "Menu" },
    hero: {
      badge: "Togo · Cameroun",
      title1: "Les commerces près de chez vous,",
      title2: "dans une seule appli.",
      sub: "Trouvez, commandez, réservez et suivez votre commande. Payez à la livraison ou par Mobile Money. Et si vous préférez, tout marche aussi sur WhatsApp.",
      install: "Installer l'application",
      installNote: "Gratuit · sans Play Store ni App Store",
      whatsapp: "Commander sur WhatsApp",
      waCM: "WhatsApp Cameroun",
      waTG: "WhatsApp Togo",
      merchant: "Vous êtes commerçant ? Créer mon commerce",
      live: "{n} commerces dans {c} villes vous attendent",
      liveOne: "{n} commerces vous attendent"
    },
    phone: { search: "Que cherchez-vous ?", near: "Près de chez vous", open: "Ouvert", closed: "Fermé", from: "dès", installed: "Sur votre écran d'accueil",
      rayonsTitle: "Que voulez-vous aujourd'hui ?",
      rayons: [["🍽️", "Restaurants"], ["🛒", "Alimentation"], ["💇🏾‍♀️", "Beauté"], ["💊", "Santé"], ["👗", "Mode"], ["🔧", "Réparations"]] },
    install: {
      badge: "Installer",
      title: "Installez AAANYIM en 3 gestes",
      sub: "Une vraie application sur votre écran d'accueil, sans passer par un magasin d'applications. Elle se met à jour toute seule.",
      benefits: [
        { icon: "bell", title: "Vos commandes vous préviennent", text: "Acceptée, en route, prête : votre téléphone vous le dit, même fermé." },
        { icon: "tap", title: "S'ouvre en un toucher", text: "Son icône sur votre écran d'accueil, comme vos autres applications." },
        { icon: "store", title: "Tous vos commerces au même endroit", text: "Vitrines, prix, horaires, livraison : rien à chercher ailleurs." },
        { icon: "chat", title: "WhatsApp continue", text: "Vous pouvez toujours commander par message. L'application ne remplace rien." }
      ],
      tabs: { android: "Android", iphone: "iPhone", desktop: "Ordinateur" },
      android: ["Ouvrez AAANYIM dans Chrome", "Touchez « Installer l'application »", "Ouvrez AAANYIM depuis son icône"],
      androidHelp: "Rien ne s'affiche ? Menu ⋮ du navigateur, puis « Installer l'application ».",
      iphone: ["Ouvrez AAANYIM dans Safari", "Touchez Partager, puis « Sur l'écran d'accueil »", "Touchez « Ajouter », puis ouvrez l'icône"],
      iphoneHelp: "Sur iPhone, les notifications n'arrivent que dans l'application installée.",
      desktopTitle: "Scannez avec votre téléphone",
      desktopText: "Ouvrez l'appareil photo, visez ce code : AAANYIM s'ouvre, prêt à installer.",
      desktopOr: "ou ouvrez app.aaanyim.net sur votre téléphone",
      go: "Ouvrir AAANYIM pour l'installer",
      already: "Déjà installée sur ce téléphone ? Ouvrez-la depuis son icône."
    },
    clients: {
      badge: "Pour vous, client",
      title: "Tout ce qu'il vous faut, dans votre quartier",
      cards: [
        { icon: "search", title: "Trouver près de chez vous", text: "Ouvert maintenant, à quelle distance, à partir de quel prix." },
        { icon: "bag", title: "Commander et suivre", text: "De l'acceptation à la remise, votre commande étape par étape." },
        { icon: "calendar", title: "Réserver et demander", text: "Un rendez-vous au salon, un devis, un service chez vous." },
        { icon: "wallet", title: "Payer comme vous voulez", text: "Espèces à la livraison ou Mobile Money, le montant dit avant." }
      ]
    },
    shops: {
      badge: "Déjà sur AAANYIM",
      title: "Ils vous attendent déjà",
      sub: "Touchez un commerce pour ouvrir sa vitrine.",
      all: "Voir tous les commerces",
      openNow: "Ouvert",
      visit: "Voir la vitrine"
    },
    merchants: {
      badge: "Pour vous, commerçant",
      title: "Votre commerce sur le téléphone de vos clients",
      sub: "Et tout votre travail au même endroit : commandes, caisse, stock, équipe.",
      cards: [
        { icon: "store", title: "Votre vitrine, à votre nom", text: "Vos couleurs, votre logo, vos produits. Une adresse à partager et un QR à afficher." },
        { icon: "inbox", title: "Toutes vos commandes ensemble", text: "Vitrine, WhatsApp, caisse, table : une seule liste, l'urgent d'abord." },
        { icon: "card", title: "Une caisse qui vérifie Mobile Money", text: "La vente est payée quand l'opérateur confirme, jamais avant." },
        { icon: "box", title: "Stock et ce qui va manquer", text: "Vous êtes prévenu avant la rupture, au rythme de vos ventes." },
        { icon: "team", title: "Votre équipe, chacun ses accès", text: "Vendeurs, livreurs, employés : chacun voit ce qui le concerne." },
        { icon: "chat", title: "L'assistant WhatsApp", text: "Vos chiffres, vos commandes, votre journée : il propose, vous touchez." },
        { icon: "tap", title: "Ouvert en 3 écrans", text: "Votre numéro, votre commerce, votre façon de travailler. Pas de mot de passe : vous vendez tout de suite." },
        { icon: "sliders", title: "Juste les écrans qu'il vous faut", text: "Mini, Boutique ou Pro : vous choisissez et vous changez quand vous voulez. Aucune limite de commandes ni d'employés." },
        { icon: "key", title: "Entrer avec WhatsApp", text: "Vous et votre équipe entrez avec WhatsApp ou un code reçu. Un mot de passe, seulement si vous le voulez." }
      ],
      create: "Créer mon commerce",
      activities: "Boutique, restaurant, salon, garage, laboratoire, école, hôtel… plus de cent activités."
    },
    activities: {
      badge: "Votre activité",
      title: "AAANYIM parle votre métier",
      sub: "Les mots, les écrans et les gestes changent avec votre activité.",
      list: [
        { icon: "🍽️", name: "Restaurants et maquis", text: "Commande à table par QR, écran cuisine, ardoises ; le client suit la préparation." },
        { icon: "🛒", name: "Boutiques et alimentation", text: "Caisse avec codes-barres, stock, arrivages, livraisons." },
        { icon: "🧪", name: "Laboratoires et santé", text: "Dossiers, résultats ouverts avec WhatsApp ou un code, organismes payeurs." },
        { icon: "💇", name: "Beauté et bien-être", text: "Rendez-vous pris dans WhatsApp, agenda de chacun, fiche de chaque client." },
        { icon: "🔧", name: "Garages et réparation", text: "Bons de travail, devis accepté ligne par ligne, pièces en stock." },
        { icon: "🏠", name: "Hébergement et immobilier", text: "Séjours, chambres, baux, loyers, état des lieux." },
        { icon: "🎓", name: "Cours et formations", text: "Groupes, présence, frais et rappels aux parents." },
        { icon: "🐔", name: "Élevage et culture", text: "Bandes, pesées, soins rappelés la veille, réservations." },
        { icon: "💧", name: "Production et distribution", text: "Eau, gaz, boulangerie : production, consignes, tournées, revendeurs." },
        { icon: "💼", name: "Services et conseil", text: "Devis en étapes, temps passé, factures et relances." }
      ]
    },
    whatsapp: {
      badge: "Sur WhatsApp aussi",
      title: "Pas d'application ? Écrivez simplement",
      sub: "L'assistant AAANYIM répond au nom du commerce. Vous touchez, il fait le reste.",
      steps: [
        { title: "Écrivez le nom du commerce", text: "Ou scannez son QR code." },
        { title: "Choisissez en touchant", text: "Les produits, leurs prix, en photos." },
        { title: "Commandez, puis suivez", text: "Payez à la livraison ou par Mobile Money." }
      ],
      example: "Exemple",
      note: "Exemples de conversations : les messages de l'assistant sont ceux qu'il envoie vraiment ; les commerces et les noms sont inventés.",
      chats: [
        { label: "Commander", msgs: [{ me: "Chez Ama" }, { bot: "*Chez Ama vous répond*\nBonjour ! Comment voulez-vous commander ?", btn: ["Commander en 1 min", "Commander ici", "Autre demande"] }] },
        { label: "Prendre rendez-vous", msgs: [{ bot: "*Rendez-vous · Salon Étoile*\nTresses — 5 000 FCFA\nDemain, 10:00\n*Total 5 000 FCFA*\nÀ payer sur place\n\nJe réserve ?", btn: ["Confirmer", "Autre heure", "Menu"] }, { me: "Confirmer" }, { bot: "C'est réservé. Salon Étoile est prévenu.", btn: ["Itinéraire", "Déplacer", "Menu"] }] },
        { label: "Livraison", msgs: [{ bot: "*Chez Ama* — votre commande CMD-4821 est en route 🛵\nKofi arrive.", btn: ["J'ai reçu", "Un problème"] }, { me: "J'ai reçu" }, { bot: "Merci ! Chez Ama est prévenu que vous avez bien reçu votre commande. Bonne journée." }] }
      ]
    },
    services: {
      badge: "Ouvert à tous",
      title: "Des services sans compte",
      sub: "Chaque page dit qui répond près de vous. Un service n'apparaît que là où il est ouvert.",
      open: "Ouvrir",
      list: [
        { group: "Trouver", name: "Annuaire", text: "Tous les commerces près de vous", url: "https://app.aaanyim.net/annuaire" },
        { group: "Trouver", name: "Comparer les prix", text: "Le même produit, plusieurs boutiques", url: "https://app.aaanyim.net/comparer" },
        { group: "Demander", name: "Demander un service", text: "Plombier, mécanicien, coiffeuse… ils vous répondent", url: "https://app.aaanyim.net/demande-service" },
        { group: "Demander", name: "Demander un devis", text: "Un prix avant de vous engager", url: "https://app.aaanyim.net/devis" },
        { group: "Réserver", name: "Prendre rendez-vous", text: "Salons, cabinets, cours, hôtels", url: "https://app.aaanyim.net/reserver" },
        { group: "Faire livrer", name: "Envoyer un colis", text: "Dans la ville ou vers une autre ville", url: "https://app.aaanyim.net/envoyer-colis" },
        { group: "Faire livrer", name: "Livraison express", text: "Un coursier tout de suite", url: "https://app.aaanyim.net/livraison-express" },
        { group: "Travailler", name: "Emplois", text: "Les commerces qui recrutent", url: "https://app.aaanyim.net/public/jobs" },
        { group: "Mon compte", name: "Mes commandes", text: "Suivre, recommander, retrouver ses documents", url: "https://app.aaanyim.net/mes-commandes" },
        { group: "Mon compte", name: "Mon carnet", text: "Entrées, dépenses, « on me doit » et « je dois »", url: "https://app.aaanyim.net/mon-carnet" }
      ]
    },
    pricing: {
      badge: "Tarifs",
      title: "Des tarifs simples, dits avant",
      sub: "L'inscription est gratuite. Vous voyez toujours ce que coûte un paiement avant qu'il parte.",
      trialTitle: "{d} jours d'essai",
      trialTitleNoNumber: "Un mois d'essai",
      trialText: "Ils commencent quand vos réglages sont faits. Pendant l'essai, aucune commission, sauf sur les paiements Mobile Money.",
      counterTitle: "0 % sur la caisse",
      counterText: "Vos ventes au comptoir et à table, payées en espèces : rien à payer à AAANYIM.",
      momoTitle: "Mobile Money : les frais du pays",
      momoText: "Quand un client paie par Mobile Money via AAANYIM, les frais sont ceux de votre pays, dits avant chaque paiement.",
      all: "Voir tous les tarifs"
    },
    faq: {
      badge: "Questions",
      title: "Vous vous demandez peut-être",
      list: [
        { q: "Faut-il installer quelque chose pour commander ?", a: "Non. Vous pouvez commander sur WhatsApp ou dans votre navigateur. L'application installée vous prévient de vos commandes et s'ouvre en un toucher." },
        { q: "Pourquoi elle n'est pas sur le Play Store ?", a: "Pas besoin : elle s'installe depuis le navigateur, en 3 gestes, et se met à jour toute seule. Elle prend très peu de place." },
        { q: "Dans quels pays ?", a: "Au Togo et au Cameroun." },
        { q: "Je suis commerçant : combien ça coûte ?", a: "L'inscription est gratuite, sans limite de commandes ni d'employés. Les tarifs sont juste au-dessus, et le détail est sur la page des tarifs." },
        { q: "Faut-il un mot de passe ?", a: "Non. Vous ouvrez votre commerce avec votre numéro et un code, puis vous entrez avec WhatsApp ou un code reçu. Vous pouvez ajouter un mot de passe plus tard." },
        { q: "Mes informations sont-elles protégées ?", a: "Elles servent seulement à vos commandes et à vos rendez-vous. Le détail est dans la page Confidentialité." }
      ]
    },
    contact: {
      badge: "Contact",
      title: "On vous rappelle en moins de 24 h",
      sub: "Dites-nous ce que vous faites, on vous montre comment AAANYIM peut vous aider.",
      name: "Nom complet", email: "E-mail", phone: "Téléphone (WhatsApp)", company: "Nom de votre commerce", sector: "Votre activité",
      sectors: ["Commerce", "Production", "Services", "Distribution", "Restauration", "Santé", "Autre"],
      message: "Votre besoin", submit: "Envoyer", success: "Merci ! On vous contacte dans les 24 h.",
      notice: "Ces informations servent seulement à vous rappeler. Elles nous parviennent par Formspree (États-Unis).",
      privacy: "Confidentialité",
      direct: "Écrivez-nous directement", waCM: "WhatsApp Cameroun", waTG: "WhatsApp Togo", email: "E-mail"
    },
    footer: {
      tagline: "Construit au Togo et au Cameroun pour les commerces et leurs clients.",
      app: "Application", openApp: "Ouvrir AAANYIM", install: "Installer l'app", marketplace: "Les commerces", pricing: "Tarifs", register: "Créer mon commerce",
      order: "Commander", legal: "Légal", privacy: "Confidentialité", terms: "CGU", mentions: "Mentions légales",
      copyright: "© 2026 AAANYIM TOGO SARLU · AAANYIM Cameroon SARL"
    }
  },
  en: {
    meta: {
      title: "AAANYIM — The shops near you, in one app",
      description: "Find, order, book and track at shops near you, in Togo and Cameroon. Install the app in 3 steps, or order on WhatsApp."
    },
    nav: { clients: "Customers", merchants: "Merchants", activities: "Activities", pricing: "Pricing", install: "Install the app", open: "Open AAANYIM", menu: "Menu" },
    hero: {
      badge: "Togo · Cameroon",
      title1: "The shops near you,",
      title2: "in one app.",
      sub: "Find, order, book and track your order. Pay on delivery or by Mobile Money. And if you prefer, everything works on WhatsApp too.",
      install: "Install the app",
      installNote: "Free · no Play Store or App Store needed",
      whatsapp: "Order on WhatsApp",
      waCM: "WhatsApp Cameroon",
      waTG: "WhatsApp Togo",
      merchant: "Do you run a business? Create my shop",
      live: "{n} shops in {c} cities are waiting for you",
      liveOne: "{n} shops are waiting for you"
    },
    phone: { search: "What are you looking for?", near: "Near you", open: "Open", closed: "Closed", from: "from", installed: "On your home screen",
      rayonsTitle: "What would you like today?",
      rayons: [["🍽️", "Restaurants"], ["🛒", "Groceries"], ["💇🏾‍♀️", "Beauty"], ["💊", "Health"], ["👗", "Fashion"], ["🔧", "Repairs"]] },
    install: {
      badge: "Install",
      title: "Install AAANYIM in 3 steps",
      sub: "A real app on your home screen, without going through an app store. It updates itself.",
      benefits: [
        { icon: "bell", title: "Your orders notify you", text: "Accepted, on its way, ready: your phone tells you, even when closed." },
        { icon: "tap", title: "Opens in one tap", text: "Its icon on your home screen, like your other apps." },
        { icon: "store", title: "All your shops in one place", text: "Storefronts, prices, opening hours, delivery: nothing to look for elsewhere." },
        { icon: "chat", title: "WhatsApp still works", text: "You can still order by message. The app replaces nothing." }
      ],
      tabs: { android: "Android", iphone: "iPhone", desktop: "Computer" },
      android: ["Open AAANYIM in Chrome", "Tap “Install app”", "Open AAANYIM from its icon"],
      androidHelp: "Nothing shows? Browser menu ⋮, then “Install app”.",
      iphone: ["Open AAANYIM in Safari", "Tap Share, then “Add to Home Screen”", "Tap “Add”, then open the icon"],
      iphoneHelp: "On iPhone, notifications only arrive in the installed app.",
      desktopTitle: "Scan with your phone",
      desktopText: "Open the camera and point it at this code: AAANYIM opens, ready to install.",
      desktopOr: "or open app.aaanyim.net on your phone",
      go: "Open AAANYIM to install it",
      already: "Already installed on this phone? Open it from its icon."
    },
    clients: {
      badge: "For you, the customer",
      title: "Everything you need, in your neighbourhood",
      cards: [
        { icon: "search", title: "Find near you", text: "Open now, how far, from what price." },
        { icon: "bag", title: "Order and track", text: "From acceptance to delivery, your order step by step." },
        { icon: "calendar", title: "Book and request", text: "A salon appointment, a quote, a service at home." },
        { icon: "wallet", title: "Pay your way", text: "Cash on delivery or Mobile Money, the amount said first." }
      ]
    },
    shops: {
      badge: "Already on AAANYIM",
      title: "They are already waiting for you",
      sub: "Tap a shop to open its storefront.",
      all: "See all shops",
      openNow: "Open",
      visit: "See the storefront"
    },
    merchants: {
      badge: "For you, the merchant",
      title: "Your shop on your customers' phones",
      sub: "And all your work in one place: orders, till, stock, team.",
      cards: [
        { icon: "store", title: "Your storefront, in your name", text: "Your colours, your logo, your products. A link to share and a QR to display." },
        { icon: "inbox", title: "All your orders together", text: "Storefront, WhatsApp, till, table: one list, the urgent first." },
        { icon: "card", title: "A till that checks Mobile Money", text: "The sale is paid when the operator confirms, never before." },
        { icon: "box", title: "Stock and what will run out", text: "You are warned before you run out, at the pace of your sales." },
        { icon: "team", title: "Your team, each with their access", text: "Sellers, couriers, staff: everyone sees what concerns them." },
        { icon: "chat", title: "The WhatsApp assistant", text: "Your figures, your orders, your day: it suggests, you tap." },
        { icon: "tap", title: "Open in 3 screens", text: "Your number, your business, the way you work. No password: you start selling right away." },
        { icon: "sliders", title: "Only the screens you need", text: "Mini, Shop or Pro: you choose and change whenever you like. No limit on orders or staff." },
        { icon: "key", title: "Sign in with WhatsApp", text: "You and your team sign in with WhatsApp or a code you receive. A password only if you want one." }
      ],
      create: "Create my shop",
      activities: "Shop, restaurant, salon, garage, laboratory, school, hotel… more than a hundred activities."
    },
    activities: {
      badge: "Your activity",
      title: "AAANYIM speaks your trade",
      sub: "The words, screens and steps change with your activity.",
      list: [
        { icon: "🍽️", name: "Restaurants", text: "Table orders by QR, kitchen screen, tabs; the customer follows the preparation." },
        { icon: "🛒", name: "Shops and groceries", text: "Till with barcodes, stock, arrivals, deliveries." },
        { icon: "🧪", name: "Laboratories and health", text: "Files, results opened with WhatsApp or a code, payers." },
        { icon: "💇", name: "Beauty and wellness", text: "Appointments booked in WhatsApp, each person's schedule, each client's card." },
        { icon: "🔧", name: "Garages and repair", text: "Work orders, quotes accepted line by line, parts in stock." },
        { icon: "🏠", name: "Lodging and real estate", text: "Stays, rooms, leases, rents, inventory reports." },
        { icon: "🎓", name: "Classes and training", text: "Groups, attendance, fees and reminders to parents." },
        { icon: "🐔", name: "Livestock and farming", text: "Batches, weighings, care reminded the day before, bookings." },
        { icon: "💧", name: "Production and distribution", text: "Water, gas, bakery: production, deposits, rounds, resellers." },
        { icon: "💼", name: "Services and consulting", text: "Staged quotes, time spent, invoices and reminders." }
      ]
    },
    whatsapp: {
      badge: "On WhatsApp too",
      title: "No app? Just write",
      sub: "The AAANYIM assistant answers in the shop's name. You tap, it does the rest.",
      steps: [
        { title: "Write the shop's name", text: "Or scan its QR code." },
        { title: "Choose by tapping", text: "The products and their prices, in photos." },
        { title: "Order, then track", text: "Pay on delivery or by Mobile Money." }
      ],
      example: "Example",
      note: "Sample conversations: the assistant's messages are the ones it really sends; the shops and names are made up.",
      chats: [
        { label: "Ordering", msgs: [{ me: "Chez Ama" }, { bot: "*Chez Ama answers you*\nHello! How would you like to order?", btn: ["Order in 1 min", "Order here", "Other request"] }] },
        { label: "Booking", msgs: [{ bot: "*Appointment · Salon Étoile*\nBraids — 5,000 FCFA\nTomorrow, 10:00\n*Total 5,000 FCFA*\nTo pay on site\n\nShall I book it?", btn: ["Confirm", "Another time", "Menu"] }, { me: "Confirm" }, { bot: "It's booked. Salon Étoile has been notified.", btn: ["Directions", "Move", "Menu"] }] },
        { label: "Delivery", msgs: [{ bot: "*Chez Ama* — your order CMD-4821 is on its way 🛵\nKofi is coming.", btn: ["I received it", "A problem"] }, { me: "I received it" }, { bot: "Thank you! Chez Ama knows you received your order. Have a good day." }] }
      ]
    },
    services: {
      badge: "Open to everyone",
      title: "Services without an account",
      sub: "Each page says who answers near you. A service only appears where it is open.",
      open: "Open",
      list: [
        { group: "Find", name: "Directory", text: "All the shops near you", url: "https://app.aaanyim.net/annuaire" },
        { group: "Find", name: "Compare prices", text: "The same product, several shops", url: "https://app.aaanyim.net/comparer" },
        { group: "Request", name: "Request a service", text: "Plumber, mechanic, hairdresser… they answer you", url: "https://app.aaanyim.net/demande-service" },
        { group: "Request", name: "Request a quote", text: "A price before you commit", url: "https://app.aaanyim.net/devis" },
        { group: "Book", name: "Book an appointment", text: "Salons, practices, classes, hotels", url: "https://app.aaanyim.net/reserver" },
        { group: "Deliver", name: "Send a parcel", text: "Within the city or to another city", url: "https://app.aaanyim.net/envoyer-colis" },
        { group: "Deliver", name: "Express delivery", text: "A courier right now", url: "https://app.aaanyim.net/livraison-express" },
        { group: "Work", name: "Jobs", text: "The shops that are hiring", url: "https://app.aaanyim.net/public/jobs" },
        { group: "My account", name: "My orders", text: "Track, reorder, find your documents", url: "https://app.aaanyim.net/mes-commandes" },
        { group: "My account", name: "My ledger", text: "Income, spending, “owed to me” and “I owe”", url: "https://app.aaanyim.net/mon-carnet" }
      ]
    },
    pricing: {
      badge: "Pricing",
      title: "Simple pricing, said first",
      sub: "Signing up is free. You always see what a payment costs before it goes.",
      trialTitle: "{d}-day trial",
      trialTitleNoNumber: "A one-month trial",
      trialText: "It starts when your settings are done. During the trial, no commission, except on Mobile Money payments.",
      counterTitle: "0% at the till",
      counterText: "Your counter and table sales paid in cash: nothing to pay AAANYIM.",
      momoTitle: "Mobile Money: your country's fees",
      momoText: "When a customer pays by Mobile Money through AAANYIM, the fees are those of your country, said before each payment.",
      all: "See all pricing"
    },
    faq: {
      badge: "Questions",
      title: "You may be wondering",
      list: [
        { q: "Do I need to install anything to order?", a: "No. You can order on WhatsApp or in your browser. The installed app notifies you about your orders and opens in one tap." },
        { q: "Why isn't it on the Play Store?", a: "No need: it installs from the browser in 3 steps and updates itself. It takes very little space." },
        { q: "In which countries?", a: "In Togo and Cameroon." },
        { q: "I run a business: how much does it cost?", a: "Signing up is free, with no limit on orders or staff. The pricing is just above, with the details on the pricing page." },
        { q: "Do I need a password?", a: "No. You open your business with your number and a code, then sign in with WhatsApp or a code you receive. You can add a password later." },
        { q: "Is my information protected?", a: "It is only used for your orders and appointments. The details are on the Privacy page." }
      ]
    },
    contact: {
      badge: "Contact",
      title: "We call you back within 24 h",
      sub: "Tell us what you do, we'll show you how AAANYIM can help.",
      name: "Full name", email: "Email", phone: "Phone (WhatsApp)", company: "Your business name", sector: "Your activity",
      sectors: ["Retail", "Production", "Services", "Distribution", "Restaurant", "Health", "Other"],
      message: "What you need", submit: "Send", success: "Thank you! We'll contact you within 24 h.",
      notice: "This information is only used to call you back. It reaches us through Formspree (United States).",
      privacy: "Privacy",
      direct: "Write to us directly", waCM: "WhatsApp Cameroon", waTG: "WhatsApp Togo", email: "Email"
    },
    footer: {
      tagline: "Built in Togo and Cameroon for shops and their customers.",
      app: "App", openApp: "Open AAANYIM", install: "Install the app", marketplace: "The shops", pricing: "Pricing", register: "Create my shop",
      order: "Order", legal: "Legal", privacy: "Privacy", terms: "Terms", mentions: "Legal notice",
      copyright: "© 2026 AAANYIM TOGO SARLU · AAANYIM Cameroon SARL"
    }
  }
};
