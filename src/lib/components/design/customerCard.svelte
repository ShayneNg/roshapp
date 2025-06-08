
<script lang="ts">
  export let customerName = '';
  export let membershipLevel = 'Premium';
  export let memberSince = '2024';
  export let loyaltyPoints = 450;
  export let cardNumber = '5699 8908';
</script>

<div class="customer-card">
  <div class="card-background">
    <!-- Gradient overlay -->
    <div class="gradient-overlay"></div>
    
    <!-- Decorative elements -->
    <div class="decorative-elements">
      <!-- Heart shapes scattered around -->
      <div class="heart heart-1">♥</div>
      <div class="heart heart-2">♥</div>
      <div class="heart heart-3">♥</div>
      <div class="heart heart-4">♥</div>
      <div class="heart heart-5">♥</div>
      <div class="heart heart-6">♥</div>
      <div class="heart heart-7">♥</div>
      
      <!-- Nail polish bottles decorative -->
      <div class="nail-bottles">
        <div class="bottle bottle-1"></div>
        <div class="bottle bottle-2"></div>
        <div class="bottle bottle-3"></div>
      </div>
    </div>
    
    <!-- Card content -->
    <div class="card-content">
      <!-- Header with membership level and logo space -->
      <div class="card-header">
        <div class="membership-badge">
          <span class="membership-number">36.6</span>
          <span class="membership-text">{membershipLevel}</span>
          <span class="membership-sub">Club</span>
        </div>
        
        <!-- Logo space -->
        <div class="logo-space">
          <div class="logo-placeholder">
            <!-- Logo will go here -->
            <span class="logo-text">LOGO</span>
          </div>
        </div>
      </div>
      
      <!-- Customer name and tier -->
      <div class="customer-info">
        <div class="tier-icon">★</div>
        <div class="customer-name">{customerName || 'Platinum'}</div>
      </div>
      
      <!-- Card number -->
      <div class="card-number">
        {cardNumber}
      </div>
      
      <!-- Loyalty points indicator -->
      <div class="loyalty-indicator">
        <div class="points-text">{loyaltyPoints} pts</div>
      </div>
    </div>
  </div>
</div>

<style>
.customer-card {
  @apply w-full h-64 mx-auto;
  
  @media (min-width: 769px) {
    @apply max-w-none;
  }

  @media (max-width: 768px) {
    @apply min-w-[320px] max-w-[320px];
  }
}

.card-background {
  @apply w-full h-full relative rounded-lg overflow-hidden shadow-md;
}

.gradient-overlay {
  @apply absolute top-0 left-0 right-0 bottom-0;
  background: linear-gradient(135deg, #ff4500 0%, #ff6b35 25%, #f7931e 50%, #c471ed 75%, #8a2be2 100%);
  opacity: 0.95;
}

.decorative-elements {
  @apply absolute top-0 left-0 right-0 bottom-0 overflow-hidden;
}

.heart {
  @apply absolute text-white text-opacity-20;

  &.heart-1 { @apply top-1/5 right-15; }
  &.heart-2 { @apply top-1/3 right-1/4; font-size: 10px; }
  &.heart-3 { @apply top-1/2 right-1/10; font-size: 12px; }
  &.heart-4 { @apply top-2/3 right-3/10; font-size: 8px; }
  &.heart-5 { @apply top-15 right-35; font-size: 6px; }
  &.heart-6 { @apply top-3/4 right-1/5; font-size: 10px; }
  &.heart-7 { @apply top-2/5 right-1/20; font-size: 7px; }
}

.nail-bottles {
  @apply absolute bottom-5 right-5 flex space-x-1.5;
}

.bottle {
  @apply w-1.5 h-4 bg-white bg-opacity-30 rounded-sm relative;

  &::before {
    content: '';
    @apply absolute top-[-0.75rem] left-1/2 transform-translate-x-[-50%] w-2.5 h-1 bg-white bg-opacity-25 rounded-sm;
  }

  &.bottle-1 { @apply h-3.5; }
  &.bottle-2 { @apply h-4.5; }
  &.bottle-3 { @apply h-3; }
}

.card-content {
  @apply relative z-10 h-full p-5 flex flex-col justify-between text-white;
}

.card-header {
  @apply flex justify-between items-start;
}

.membership-badge {
  @apply flex flex-col items-start;

  .membership-number {
    @apply text-2xl font-bold leading-tight mb-0.5;
  }

  .membership-text {
    @apply text-sm font-medium opacity-95;
  }

  .membership-sub {
    @apply text-xs font-normal opacity-80;
  }
}

.logo-space {
  @apply flex items-center;

  .logo-placeholder {
    @apply w-15 h-10 bg-white bg-opacity-15 rounded-md flex items-center justify-center backdrop-filter-blur-lg border border-white border-opacity-20;

    .logo-text {
      @apply text-[10px] font-semibold opacity-70 tracking-wider;
    }
  }
}

.customer-info {
  @apply flex items-center space-x-2 mt-4;

  .tier-icon {
    @apply text-lg opacity-90;
  }

  .customer-name {
    @apply text-xl font-semibold capitalize;
  }
}

.card-number {
  @apply text-sm font-medium opacity-80 tracking-widest mt-auto;
}

.loyalty-indicator {
  @apply absolute top-5 right-5;

  .points-text {
    @apply text-xs font-medium opacity-90 bg-white bg-opacity-20 px-1.5 py-0.5 rounded-full backdrop-filter-blur-lg;
  }
}

@media (max-width: 640px) {
  .card-content {
    @apply p-4;
  }

  .membership-badge {
    .membership-number {
      @apply text-2xl;
    }
  }

  .customer-name {
    @apply text-lg;
  }

  .logo-space {
    .logo-placeholder {
      @apply w-12.5 h-8;
    }
  }
}
</style>
