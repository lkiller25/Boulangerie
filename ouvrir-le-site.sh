#!/bin/bash
# Ouvre le site vitrine dans le navigateur.
# À placer dans le dossier du site, puis : ./ouvrir-le-site.sh

cd "$(dirname "$0")" || exit 1
PORT=8000

# Trouver un interpréteur Python
if command -v python3 >/dev/null 2>&1; then PY=python3
elif command -v python  >/dev/null 2>&1; then PY=python
else
  echo "Python n'est pas installé. Ouvrez simplement le fichier index.html dans votre navigateur."
  exit 1
fi

URL="http://localhost:$PORT/index.html"

# Lancer le serveur en arrière-plan s'il n'est pas déjà démarré
if ! curl -s -o /dev/null "$URL"; then
  echo "Démarrage du serveur sur le port $PORT..."
  nohup "$PY" -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1 &
  sleep 2
fi

echo "Le site est disponible sur : $URL"

# Ouvrir le navigateur selon le système
if   command -v xdg-open >/dev/null 2>&1; then xdg-open "$URL"
elif command -v open     >/dev/null 2>&1; then open "$URL"
else echo "Ouvrez manuellement $URL dans votre navigateur."
fi

echo "Pour arrêter le serveur : appuyez sur Ctrl+C, puis fermez cette fenêtre."
wait
