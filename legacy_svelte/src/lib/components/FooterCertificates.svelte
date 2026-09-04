<script>
  import iso9001Icon from '$lib/assets/icons/iso_9001:2015_certification.webp';
  import iso27001Icon from '$lib/assets/icons/iso_27001:2022_certification.webp';
  import co2NeutralIcon from '$lib/assets/icons/co2_neutral_certification.webp';
</script>

<div class="container !mt-0">
  <div class="flex w-fit flex-wrap justify-center gap-8">
    <a href="https://nine.ch/images/nine_ISO9001.pdf" target="_blank" rel="noreferrer">
      <img class="h-20" src={iso9001Icon} width="80" height="80" alt="ISO 9001:2015 certification" />
    </a>
    <a href="https://nine.ch/images/ISO-27001-Nine-Internet-Solutions-AG-2.pdf" target="_blank" rel="noreferrer">
      <img class="h-20" src={iso27001Icon} width="80" height="80" alt="ISO 27001:2022 certification" />
    </a>
    <a href="https://nine.ch/images/myclimate_confirmation_16836958-1.pdf" target="_blank" rel="noreferrer">
      <img class="h-20" src={co2NeutralIcon} width="80" height="80" alt="CO2 neutral certification" />
    </a>
  </div>
</div>
