# CookieConsent v3 skonfigurowane pod Consent Mode v2 + szablon tagu GTM.

**Demo:** [https://balabon.unixstorm.org/ccc/](https://balabon.unixstorm.org/ccc/)

**Typ:** Uniwersalny plugin JS

**Bazuje na:** [orestbida/cookieconsent](https://github.com/orestbida/cookieconsent)

***

## Instalacja
1. Pobierz zip lub uruchom git pull.
2. Dodaj katalog ./cc do projektu.
3. Wczytaj CSS z cdn lub lokalnie:
   - \<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v3.0.0-rc.17/dist/cookieconsent.css">
4. Wczytaj JS:
   - <script type="module" src="./cc/js/cookieconsent-config.js" defer></script>


**JS - konfiguracja**

./cc/js/cookieconsent-config.js

**CSS**

./cc/style.css

**Oryginalna dokumentacja:** [CookieConsent v3](https://cookieconsent.orestbida.com/)

***

## Tag GTM
1. Pobierz szablon tagu GTM CC Cookies GDPR consent GTM template.tpl
2. Zaimportuj szablon w GTM
![Import GTM template](./docs_images/gtm_setup_01.jpg)
3. Stwórz nowy tag korzystając z zaimportowanego szablonu.
![Create new GTM tag from the template](./docs_images/gtm_setup_02.jpg)
4. Dodaj wiersz z domyślnymi ustawieniami zgód. Możesz dostosować ustawienia ilub dodać wiele wierszy dla różnych regionów.
![Add default consent settings](./docs_images/gtm_setup_03.jpg)
5. Ustaw wyzwalacz tagu na Consent Initialization - All Pages.
![Tag triggering](./docs_images/gtm_setup_06.jpg)
6. Jeżeli korzystasz z innych tagów, ustaw im wymagane zgody.
![Tags consent](./docs_images/gtm_setup_07.jpg)

## Debugowanie Tagu
1. Jeżeli chcesz, włącz logowanie zdarzeń w konsoli (debug mode) w ustawieniach tagu.
2. Uruchom debug view w GTM.
3. Przed ustawieniem zgód przez użytkownika, GTM otrzyma zgody defaultowe z ustawień tagu.
![Consent Mode debug](./docs_images/gtm_setup_08.jpg)
4. Po zdarzeniu ustawienia zgód (CookiesSet), GTM otrzyma aktualizacje zgód na wybrane przez użytkownika.
![Consent Mode debug](./docs_images/gtm_setup_09.jpg)

## Debugowanie GA
Możesz dodatkowo zweryfikować Consent Mode w GA:

1. Wczytaj stronę bez zgody na analytics_storage.
2. Sprawdź parametr **gcs** wysyłany przez analytics.google.com/g/collect w konsoli:

 | gcs | description |
 | --- | --- |
 | G100 | Odmowa udzielenia zgody zarówno na ad_storage, jak i w przypadku elementu analytics_storage. |
 | G110 | Udzielono zgody w przypadku: ad_storage i odmówiono w przypadku: analytics_storage. |
 | G101 | Udzielono zgody w przypadku: ad_storage, a w przypadku: analytics_storage. |
 | G111 | Udzielono zgody zarówno na ad_storage, jak i na analytics_storage. |
 | G1-- | Witryna nie wymagała zgody w przypadku tych domen: ad_storage ani analytics_storage. |

 > [!NOTE]
> Pamiętaj, żeby ustawić anonymizeIp=true w tagu GA.

***

## Zaawansowane

> [!NOTE]
> Sprawdź, czy domeny bez plików cookie (np. googledistribution.com) są używane, gdy ads_data_redaction ma wartość true.

> [!NOTE]
> Sprawdź, czy tagi gclid/dclid są dołączane do wychodzących adresów URL, gdy parametr url_passthrough ma wartość true i czy występuje parametr łączący _gl (np. https://www.example.com/?_gl=1*abcde5*).