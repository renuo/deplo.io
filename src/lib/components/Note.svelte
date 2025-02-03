<script lang="ts">
  interface NoteProps {
    title: string;
    description: string;
  }

  let { title, description }: NoteProps = $props();
</script>

<div
  class="min-w-[320px] max-w-[320px] border-t-2 border-deploio bg-white p-6 pb-10 text-deploio shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
>
  <h3 class="text-h4 h-[75px]">{title}</h3>
  <p>{description}</p>
</div>
