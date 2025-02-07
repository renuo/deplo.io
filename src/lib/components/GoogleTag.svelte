<script>
    const googleTagId = import.meta.env.VITE_GOOGLE_TAG_ID;

    import { onMount } from 'svelte';

    onMount(() => {
        const scriptTag = document.createElement('script');
        scriptTag.async = true;
        scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${googleTagId}`;
        document.head.appendChild(scriptTag);

        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', googleTagId);
    });
</script>
