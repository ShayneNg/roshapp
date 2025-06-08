
<script lang="ts">
  export let customerName = '';
  export let membershipLevel = 'Premium';
  export let memberSince = '2024';
  export let loyaltyPoints = 450;
  export let cardNumber = '1234 5678 9012 3456';
</script>

<div class="customer-card">
  <div class="card-background">
    <!-- Gradient overlay -->
    <div class="gradient-overlay"></div>
    
    <!-- Decorative elements -->
    <div class="decorative-elements">
      <!-- Heart shapes arranged like Australia National Flag -->
      <div class="heart heart-1" style="top: 20%; right: 3.75rem;">♥</div>
      <div class="heart heart-2" style="top: 33.333333%; right: 25%; font-size: 10px;">♥</div>
      <div class="heart heart-3" style="top: 50%; right: 10%; font-size: 12px;">♥</div>
      <div class="heart heart-4" style="top: 66.666667%; right: 30%; font-size: 8px;">♥</div>
      <div class="heart heart-5" style="top: 40%; right: 5%; font-size: 7px;">♥</div>

      <!-- Nail polish bottles decorative -->
      <div class="nail-bottles">
        <div class="bottle bottle-1"></div>
        <div class="bottle bottle-2"></div>
        <div class="bottle bottle-3"></div>
        <div class="bottle bottle-4"></div>
        <div class="bottle bottle-5"></div>
        <div class="bottle bottle-6"></div>
        <div class="bottle bottle-7"></div>
        <div class="bottle bottle-8"></div>
        <div class="bottle bottle-9"></div>
      </div>
    </div>
    
    <!-- Card content -->
    <div class="card-content">
      <!-- Header with membership level and logo space -->
      <div class="card-header">
        <div class="membership-badge">
          <span class="membership-number">36.6</span>
          <div class="flex flex-col">
            <span class="membership-text">{membershipLevel}</span>
            <span class="membership-sub">Since {memberSince}</span>
          </div>
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
}

.card-background {
  @apply w-full h-full relative rounded-lg overflow-hidden shadow;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #ff4500 0%, #ff6b35 25%, #f7931e 40%, #c471ed 68%, #8a2be2 100%);
  opacity: 0.95;
}

.decorative-elements {
  @apply absolute inset-0 overflow-hidden;
}

.heart {
  position: absolute;
  color: white;
  opacity: 0.2;
}

.nail-bottles {
  position: absolute;
  bottom: 1.25rem;
  right: 1.25rem;
  display: flex;
  gap: 0.1rem;
}

.bottle {
  width: 0.2rem;
  height: 1rem;
  background-color: white;
  opacity: 0.3;
  border-radius: 0.125rem;
  position: relative;
}

.bottle::before {
  content: '';
  position: absolute;
  top: -0.75rem;
  left: 50%;
  transform: translateX(-50%);
  width: 0.4rem;
  height: 0.25rem;
  background-color: white;
  opacity: 0.25;
  /* border-radius: 0.125rem; */
}

.bottle-1 { height: 0.875rem; }
.bottle-2 { height: 1.125rem; }
.bottle-3 { height: 0.75rem; }
.bottle-4 { height: 1.25rem; }
.bottle-5 { height: 0.9rem; }
.bottle-6 { height: 1.05rem; }
.bottle-7 { height: 1.15rem; }
.bottle-8 { height: 0.95rem; }
.bottle-9 { height: 1.3rem; }

.card-content {
  position: relative;
  z-index: 10;
  height: 100%;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
}

.card-header {
  @apply flex justify-between items-start;
}

.membership-badge {
  @apply flex flex-row items-center space-x-2;
}

.membership-number {
  @apply text-4xl font-extrabold;
}

.membership-text, 
.membership-sub {
  @apply text-xs font-bold opacity-70;
}

.logo-space {
  display: flex;
  align-items: center;
}

.logo-placeholder {
  width: 3.75rem;
  height: 2.5rem;
  background-color: white;
  opacity: 0.15;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(16px);
  border: 1px solid white;
  border-opacity: 0.2;
}

.logo-text {
  font-size: 10px;
  font-weight: 600;
  opacity: 0.7;
  letter-spacing: 0.1em;
}

.customer-info {
  @apply flex items-center gap-2 mt-16;
}

.tier-icon {
  font-size: 1.125rem;
  opacity: 0.9;
}

.customer-name {
  @apply text-base font-semibold capitalize;
}

.card-number {
  @apply text-sm font-medium opacity-80 tracking-wide mt-auto;
}

.loyalty-indicator {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
}

.points-text {
  @apply text-2xl font-medium opacity-90 bg-opacity-20 rounded-full py-0.125rem px-0.375rem backdrop-blur-lg;
}

/* Mobile styles */
@media (max-width: 768px) {
  .customer-card {
    min-width: 320px;
    max-width: 320px;
  }
}

@media (min-width: 769px) {
  .customer-card {
    max-width: none;
  }
}

@media (max-width: 640px) {
  .card-content {
    padding: 1rem;
  }

  .membership-number {
    font-size: 1.5rem;
  }

  .customer-name {
    font-size: 1.125rem;
  }

  .logo-placeholder {
    width: 3.125rem;
    height: 2rem;
  }
}
</style>
