
<script lang="ts">
  import LogoWhite from '$lib/components/layout/LogoWhite.svelte';
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

      <!-- Logo space moved to nail polish bottles -->
      <div class="logo-space">
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
          <span class="w-10 h-10 opacity-90"><LogoWhite /></span>
          <div class="flex flex-col">
            <span class="membership-text">{membershipLevel}</span>
            <span class="membership-sub">Since {memberSince}</span>
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
    </div>

    <!-- Loyalty points indicator -->
    <div class="loyalty-indicator">
      <div class="flex flex-row items-center">
        <div class="points-sub">
          <span>Earned</span>
          <span>Points</span>
        </div>
        <span class="points-text">{loyaltyPoints} </span>
      </div>      
    </div>
  </div>
</div>

<style>
.customer-card {
  width: 100%;
  height: 16rem;
  margin-left: auto;
  margin-right: auto;
}

.card-background {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
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
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
}

.heart {
  position: absolute;
  color: white;
  opacity: 0.2;
}

.logo-space {
  position: absolute;
  top: 2.25rem;
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
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.customer-info{
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}
.customer-name{
  font-size: 1.5rem;
  font-weight: 700;
  opacity: 0.9;
}

.membership-badge {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.membership-text, 
.membership-sub {
  font-size: 0.75rem;
  font-weight: 700;
  opacity: 0.7;
}

.loyalty-indicator {
  position: absolute;
  bottom: 1.25rem;
  right: 0.7rem;
}

.points-text {
  color: white;
  font-size: 2.25rem;
  line-height: 2rem;
  font-weight: 800;
  opacity: 0.9;
  border-radius: 9999px;
  padding: 0.125rem 0.375rem;
}
  
.points-sub {
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 0.9rem;
  line-height: 1rem;
  font-weight: 600;
  opacity: 0.4;
  text-align: right;
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
