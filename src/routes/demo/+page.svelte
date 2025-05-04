<script lang="ts">
    import * as Card from "$lib/components/ui/card";

    import { iconSizes } from '$lib/config/iconSizes';
    import { textSizes } from '$lib/config/textSizes';
    import { spacing } from '$lib/config/spacing';
    import { typography } from '$lib/config/typography';
    import { ui } from '$lib/config/ui';

    import Icon from '$lib/icons/Icon.svelte';
   </script>
    
   <Card.Root>
    <Card.Header>
        <Card.Title>Icons</Card.Title>
        <Card.Description>Test display case for icon wrapper</Card.Description>
    </Card.Header>
        <Card.Content>
            <Icon name="Home" size={iconSizes.sidebar} />
            <Icon name="User" size={iconSizes.header} className="text-muted-foreground" />
        </Card.Content>
   </Card.Root>

   <Card.Root>
    <Card.Header>
        <Card.Title>Spacing and TextSizes</Card.Title>
        <Card.Description>Test display case for spacing & text sizes</Card.Description>
    </Card.Header>
    <Card.Content>
        <div class={`bg-card ${spacing.cardPadding}`}>
            <h2 class={textSizes.sectionTitle}>Nail Art Packages</h2>
            <p class={textSizes.muted}>Includes design, gel, and shaping.</p>
        </div>
    </Card.Content>
   </Card.Root>

<Card.Root>
   <Card.Header>
       <Card.Title>Typography</Card.Title>
       <Card.Description>Test display case for typography</Card.Description>
   </Card.Header>
       <Card.Content>
            <h1 class={typography.heading}>Book Your Appointment</h1>
            <p class={typography.body}>Choose a time and service that suits you best.</p>
            <span class={typography.caption}>* Limited slots available</span>
       </Card.Content>
</Card.Root>

<Card.Root>
    <Card.Header>
        <Card.Title>Spacing Advanced</Card.Title>
        <Card.Description>Test display case for spacing in advanced</Card.Description>
    </Card.Header>
    <Card.Content>
        <form class={`${spacing.form.column}`}>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <div class={spacing.buttonGroup.inline}>
                <button>Cancel</button>
                <button>Submit</button>
            </div>
        </form>
    </Card.Content>
</Card.Root>

<Card.Root>
    <Card.Header>
        <Card.Title>UI in used</Card.Title>
        <Card.Description>Test display case for uid</Card.Description>
    </Card.Header>
    <Card.Content>
        <h2 class={ui.typography.heading}>Nail Packages</h2>
        <p class={ui.typography.body}>Select from various gel and art options.</p>
        <Icon name="Star" size={ui.iconSizes.card} />
    </Card.Content>
</Card.Root>

<a href="/demo/lucia">lucia</a>
