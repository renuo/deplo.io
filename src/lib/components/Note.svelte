<script lang="ts">
  interface NoteProps {
    title: string;
    description: string;
  }

  let { title, description }: NoteProps = $props();
</script>

<div
  class="w-72 border-t-2 border-deploio bg-white p-6 pb-10 text-deploio shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
>
  <h3 class="h-[75px] text-xl font-medium uppercase">{title}</h3>
  <p>{description}</p>
</div>
