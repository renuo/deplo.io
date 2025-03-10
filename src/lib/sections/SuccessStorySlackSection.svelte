<script lang="ts">
  import { appear } from '$lib';

  import deploioWave from '$lib/assets/deploio_wave.svg';
  import samuelAvatar from '$lib/assets/samuel.png';
  import thomasAvatar from '$lib/assets/thomas.png';
  import SlackMessage from '$lib/components/SlackMessage.svelte';
</script>

<section class="relative overflow-x-clip bg-deploio pb-16 pt-20">
  <img
    src={deploioWave}
    alt="abstract waves background"
    class="pointer-events-none absolute left-0 right-0 top-0 z-0 w-full -rotate-6 scale-[3] opacity-5 sm:scale-[2] md:scale-[1.25]"
  />

  <div class="mb-30 container relative z-10 flex gap-12">
    <div class="flex w-1/2 flex-col gap-5">
      <SlackMessage
        baseDelay={200}
        name="Samuel Steiner  ·  Renuo AG"
        avatar={samuelAvatar}
        date="23. Sep 2022 um 23:42 Uhr"
      >
        Hey zämä. Hostet jemand primär mit Heroku und ist mit deren kürzlich angekündigten Anpassungen auch nicht so
        zufrieden? Es wäre eine gute Gelegenheit, etwas eigenes aufzuziehen. Freue mich über PNs.
      </SlackMessage>

      <SlackMessage baseDelay={300} name="Thomas Hug" avatar={thomasAvatar} date="24. Sep 2022 um 14:15 Uhr">
        Hey Samuel<br />Wir sind zwar nicht selber auf Heroku, haben aber viel eigene Infrastruktur, eine Kubernetes
        Platform im eigenen Datacenter sowie eine Platform, welche auf Googles Kubernetes Engine aufbaut auf Google
        Cloud.<br />Was möchtest du genau machen? Was passt dir nicht bei heroku?<br />Vielleicht sprechen wir mal?<br
        />Gruss<br />Tom<br />
        Ah … wir/ich = <a href="https://nine.ch" class="text-blue-600">nine.ch</a>
      </SlackMessage>
    </div>
    <div class="w-1/2">
      <div class="text-white" use:appear={{ delay: 100 }}>
        <h3 class="text-h3 pb-4">
          <!-- TODO: Add translations -->
          DIE ZEIT VOR DER CLOUD
        </h3>
        <p use:appear={{ delay: 200 }}>
          Deploio wird durch Nine betrieben und wir waren früher schon Nine-Kunde. Das war vor der Cloud. Wir haben für
          unsere Kunden Server aufgesetzt und betrieben. Das hat viel Zeit und Nerven gekostet: SSL-Zertifikate kaufen,
          SSH-Zugriffe verwalten, Festplattenplatz überwachen, Systembibliotheken aktualisieren, usw. Doch dann kam
          Heroku. Es hat uns von der Server-Administration befreit. Wir konnten uns auf die Software-Entwicklung
          konzentrieren, dank 12factor auch ohne Vendor-Lock-in. Einfach «git push», CI/CD und der Kunde kann testen.
          Also sind wir in die Cloud umgezogen.
        </p>
      </div>

      <div class="ml-auto w-2/3 text-white">
        <h3 class="text-h3 mt-8 pb-4" use:appear={{ delay: 300 }}>Die Schöne und das Biest</h3>
        <p use:appear={{ delay: 400 }}>
          Renuo ist eine inhabergeführte Schweizer Firma. Aber Heroku ist Amerikanisch und läuft bei AWS. Das wurmte uns
          die nächsten zehn Jahre. Es muss doch möglich sein, ein so cooles Produkt wie Heroku zu nutzen, in der
          Schweiz, wo ich auch mal Türen eintreten kann, wenn mir etwas nicht passt – viel Glück damit bei Salesforce.
          Wir waren im Enterprise-Vertrag; schlicht ein Konstrukt der Hölle. Da bringt Deploio Entsatz und zur rechten
          Zeit!
        </p>
      </div>
    </div>
  </div>
</section>
