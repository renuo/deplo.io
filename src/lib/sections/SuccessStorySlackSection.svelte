<script lang="ts">
  import Carousel from '$lib/components/Carousel.svelte';
  import * as m from '$lib/paraglide/messages';
  import { appear } from '$lib';

  import deploioWave from '$lib/assets/deploio_wave.svg';
  import node from '$lib/assets/language_node.webp';
  import django from '$lib/assets/language_django.webp';
  import go from '$lib/assets/language_go.webp';
  import php from '$lib/assets/language_php.webp';
  import python from '$lib/assets/language_python.webp';
  import ruby from '$lib/assets/language_ruby.webp';
  import Feature from '$lib/components/Feature.svelte';
</script>

<section class="relative overflow-x-clip bg-deploio pb-16 pt-20">
  <img
    src={deploioWave}
    alt="abstract waves background"
    class="pointer-events-none absolute left-0 right-0 top-0 z-0 w-full -rotate-6 scale-[3] opacity-5 sm:scale-[2] md:scale-[1.25]"
  />

  <div class="container relative z-10 mb-30 space-y-20">
    <div class="text-white">
      <h3 class="text-h2 pb-4">
      DIE ZEIT VOR DER CLOUD
      </h3>
      <p>
      Deploio wird durch Nine betrieben und wir waren früher schon Nine-Kunde. Das war vor der Cloud. Wir haben für unsere Kunden Server aufgesetzt und betrieben. Das hat viel Zeit und Nerven gekostet: SSL-Zertifikate kaufen, SSH-Zugriffe verwalten, Festplattenplatz überwachen, Systembibliotheken aktualisieren, usw. Doch dann kam Heroku. Es hat uns von der Server-Administration befreit. Wir konnten uns auf die Software-Entwicklung konzentrieren, dank 12factor auch ohne Vendor-Lock-in. Einfach «git push», CI/CD und der Kunde kann testen. Also sind wir in die Cloud umgezogen.
      </p>
    </div>

    <div class="text-white">
      <h3 class="text-h2 pb-4">
      Die Schöne und das Biest
      </h3>
      <p>Renuo ist eine inhabergeführte Schweizer Firma. Aber Heroku ist Amerikanisch und läuft bei AWS. Das wurmte uns die nächsten zehn Jahre. Es muss doch möglich sein, ein so cooles Produkt wie Heroku zu nutzen, in der Schweiz, wo ich auch mal Türen eintreten kann, wenn mir etwas nicht passt – viel Glück damit bei Salesforce. Wir waren im Enterprise-Vertrag; schlicht ein Konstrukt der Hölle. Da bringt Deploio Entsatz und zur rechten Zeit!</p>
    </div>
  </div>
</section>
