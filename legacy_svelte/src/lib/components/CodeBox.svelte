<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  const CHARACTER_MS = 75;
  const RESULT_DELAY_MS = 200;

  interface CodeBoxProps {
    class?: string;
    commands: { command: string; result: string }[];
  }

  let { commands, class: className }: CodeBoxProps = $props();
</script>

<div class={twMerge('group w-72 overflow-hidden rounded-lg bg-neutral-100/90 shadow-2xl backdrop-blur', className)}>
  <div class="flex w-full select-none items-center gap-2 bg-neutral-100/50 p-2">
    <span class="size-3 rounded-full bg-neutral-500/50 transition-colors group-hover:bg-[#FA6058]">&nbsp;</span>
    <span class="size-3 rounded-full bg-neutral-500/50 transition-colors group-hover:bg-[#FABD2E]">&nbsp;</span>
    <span class="size-3 rounded-full bg-neutral-500/50 transition-colors group-hover:bg-[#27CA41]">&nbsp;</span>
  </div>

  <div class="flex flex-col p-2 pr-6 text-left font-mono text-[13px] font-medium text-neutral-700">
    {#each commands as command, i}
      {@const previousCommandsLength = commands.slice(0, i).reduce((acc, { command }) => acc + command.length, 0)}
      {@const commandLength = command.command.length}
      {@const commandStartMs = previousCommandsLength * CHARACTER_MS + i * RESULT_DELAY_MS}
      {@const resultStartMs = commandStartMs + commandLength * CHARACTER_MS + RESULT_DELAY_MS}

      <code>
        <span
          class="inline-block min-w-4 select-none font-bold text-deploio opacity-0"
          style:animation="typing .1s linear {commandStartMs}ms forwards">$</span
        >{#each [...command.command] as character, j}<span
            class="inline-block opacity-0"
            style:animation="typing .1s linear {j * CHARACTER_MS + commandStartMs}ms forwards"
          >
            {#if character === ' '}
              &nbsp;
            {:else}
              {character}
            {/if}
          </span>
        {/each}
        <!--        <span class="bg-deploio" style:animation="pulse 0.5s linear infinite">-->
        <!--          &nbsp;-->
        <!--        </span>-->
      </code>

      <code class="mb-2 ml-4 mt-2 inline-block select-none font-bold">
        {#each command.result.split('\n') as line, j}
          <span
            class="-translate-x-full opacity-0"
            style:animation="echo .3s linear {j * CHARACTER_MS + resultStartMs}ms forwards"
          >
            {line}<br />
          </span>
        {/each}
      </code>
    {/each}
  </div>
</div>
