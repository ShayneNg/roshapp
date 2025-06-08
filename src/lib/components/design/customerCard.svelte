
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

<style lang="scss">
.customer-card {
  width: 100%;
  height: 250px;
  margin: 0 auto;
  
  /* Desktop to tablet landscape: full parent width */
  @media (min-width: 769px) {
    max-width: none;
  }
  
  /* Smaller screens: minimum 320px width */
  @media (max-width: 768px) {
    min-width: 320px;
    max-width: 320px;
  }
}

.card-background {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.15),
    0 2px 6px rgba(0, 0, 0, 0.1);
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    #ff4500 0%,
    #ff6b35 25%,
    #f7931e 50%,
    #c471ed 75%,
    #8a2be2 100%
  );
  opacity: 0.95;
}

.decorative-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.heart {
  position: absolute;
  color: rgba(255, 255, 255, 0.2);
  font-size: 14px;
  
  &.heart-1 { top: 20%; right: 15%; }
  &.heart-2 { top: 35%; right: 25%; font-size: 10px; }
  &.heart-3 { top: 50%; right: 10%; font-size: 12px; }
  &.heart-4 { top: 65%; right: 30%; font-size: 8px; }
  &.heart-5 { top: 15%; right: 35%; font-size: 6px; }
  &.heart-6 { top: 75%; right: 20%; font-size: 10px; }
  &.heart-7 { top: 40%; right: 5%; font-size: 7px; }
}

.nail-bottles {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 6px;
}

.bottle {
  width: 6px;
  height: 16px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -3px;
    left: 50%;
    transform: translateX(-50%);
    width: 10px;
    height: 4px;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 2px;
  }
  
  &.bottle-1 { height: 14px; }
  &.bottle-2 { height: 18px; }
  &.bottle-3 { height: 12px; }
}

.card-content {
  position: relative;
  z-index: 10;
  height: 100%;
  padding: 20px;
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

.membership-badge {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  .membership-number {
    font-size: 28px;
    font-weight: 700;
    line-height: 0.9;
    margin-bottom: 2px;
  }
  
  .membership-text {
    font-size: 14px;
    font-weight: 500;
    opacity: 0.95;
  }
  
  .membership-sub {
    font-size: 12px;
    font-weight: 400;
    opacity: 0.8;
  }
}

.logo-space {
  display: flex;
  align-items: center;
  
  .logo-placeholder {
    width: 60px;
    height: 40px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    
    .logo-text {
      font-size: 10px;
      font-weight: 600;
      opacity: 0.7;
      letter-spacing: 0.5px;
    }
  }
}

.customer-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  
  .tier-icon {
    font-size: 16px;
    opacity: 0.9;
  }
  
  .customer-name {
    font-size: 20px;
    font-weight: 600;
    text-transform: capitalize;
  }
}

.card-number {
  font-size: 14px;
  font-weight: 500;
  opacity: 0.8;
  letter-spacing: 2px;
  margin-top: auto;
}

.loyalty-indicator {
  position: absolute;
  top: 20px;
  right: 20px;
  
  .points-text {
    font-size: 11px;
    font-weight: 500;
    opacity: 0.9;
    background: rgba(255, 255, 255, 0.2);
    padding: 3px 6px;
    border-radius: 10px;
    backdrop-filter: blur(10px);
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .card-content {
    padding: 16px;
  }
  
  .membership-badge .membership-number {
    font-size: 24px;
  }
  
  .customer-name {
    font-size: 18px;
  }
  
  .logo-space .logo-placeholder {
    width: 50px;
    height: 32px;
  }
}
</style>
