import json
import re
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

HOME_TEMPLATE      = BASE_DIR / "home_template.html"
TRANSLATIONS_PATH  = BASE_DIR / "translations.json"
OUTPUT_DIR         = BASE_DIR.parent

PAGES = {
    "home": {
        "template": HOME_TEMPLATE,
        "output": {
            "en": "home_en.html",
            "es": "home_es.html",
        },
    }
}

PLACEHOLDER_PATTERN = re.compile(r"\$\$\$(\w+)\$\$\$")


# ------------------------------------------------------------------
# CARGA DE TRADUCCIONES
# ------------------------------------------------------------------
def load_translations(path: Path) -> dict:
    if not path.exists():
        raise FileNotFoundError(f"No se encuentra el JSON de traducciones: {path}")
    with path.open(encoding="utf-8") as f:
        return json.load(f)


# ------------------------------------------------------------------
# CONSTRUCCIÓN DE UNA PÁGINA
# ------------------------------------------------------------------
def build_page(template: str, translations: dict, lang: str, page_name: str) -> str:
    missing = []

    def replace(match: re.Match) -> str:
        key = match.group(1)

        # caso especial: el propio idioma
        if key == "lang":
            return lang

        entry = translations.get(key)
        if entry is None or lang not in entry:
            missing.append(key)
            return match.group(0)  # deja el placeholder tal cual

        return entry[lang]

    result = PLACEHOLDER_PATTERN.sub(replace, template)

    if missing:
        # set() para no repetir la misma clave varias veces
        print(f"[AVISO] ({page_name}/{lang}) Claves sin traducción: {sorted(set(missing))}")

    return result


# ------------------------------------------------------------------
# MAIN
# ------------------------------------------------------------------
def main():
    print(f"Directorio del script : {BASE_DIR}")
    print(f"Directorio de salida  : {OUTPUT_DIR}")

    translations = load_translations(TRANSLATIONS_PATH)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for page_name, config in PAGES.items():
        template_path: Path = config["template"]

        if not template_path.exists():
            print(f"[ERROR] No se encuentra la plantilla: {template_path}")
            continue

        template = template_path.read_text(encoding="utf-8")

        for lang, filename in config["output"].items():
            html = build_page(template, translations, lang, page_name)
            out_path = OUTPUT_DIR / filename
            out_path.write_text(html, encoding="utf-8")
            print(f"Generado: {out_path}")


if __name__ == "__main__":
    main()