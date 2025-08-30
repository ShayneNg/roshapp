<!-- src/routes/debug/typography/+page.svelte -->
<script lang="ts">
    import Typography from '$lib/components/ui/Typography.svelte';
  </script>

  <section class="max-w-4xl mx-auto p-6 space-y-6">
    <header>
      <Typography as="h1" variant="heading-1" weight="bold">Typography Debug</Typography>
      <Typography as="p" variant="caption" class="text-[var(--text-muted)]">Live preview of text scale, weights, and line-heights</Typography>
    </header>

    <article class="grid grid-cols-1 gap-6">
      <div>
        <Typography as="h2" variant="heading-2" weight="semibold">Headings</Typography>
        <Typography as="h1" variant="heading-1">Heading 1 / 3xl</Typography>
        <Typography as="h2" variant="heading-2">Heading 2 / 2xl</Typography>
        <Typography as="h3" variant="heading-3">Heading 3 / xl</Typography>
      </div>

      <div>
        <Typography as="h2" variant="heading-2" weight="semibold">Body & Caption</Typography>
        <Typography as="p" variant="body">Base body text for paragraphs and UI copy.</Typography>
        <Typography as="p" variant="caption" class="text-[var(--text-secondary)]">Caption/secondary text for helper copy.</Typography>
      </div>

      <div>
        <Typography as="h2" variant="heading-2" weight="semibold">Prose Demo</Typography>
        <article class="prose prose-zinc dark:prose-invert">
          <h3>Rich content block</h3>
          <p>This block uses the Tailwind Typography plugin for long‑form content rendering.</p>
          <ul>
            <li>Scales font-sizes and line-heights</li>
            <li>Styles lists and headings</li>
          </ul>
        </article>
      </div>
    </article>
  </section>
