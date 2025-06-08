
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
          <span class="membership-sub">Since {memberSince}</span>
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
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #ff4500 0%, #ff6b35 25%, #f7931e 50%, #c471ed 75%, #8a2be2 100%);
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
  color: white;
  opacity: 0.2;
}

.heart-1 { 
  top: 20%; 
  right: 3.75rem; 
}

.heart-2 { 
  top: 33.333333%; 
  right: 25%; 
  font-size: 10px; 
}

.heart-3 { 
  top: 50%; 
  right: 10%; 
  font-size: 12px; 
}

.heart-4 { 
  top: 66.666667%; 
  right: 30%; 
  font-size: 8px; 
}

.heart-5 { 
  top: 3.75rem; 
  right: 8.75rem; 
  font-size: 6px; 
}

.heart-6 { 
  top: 75%; 
  right: 20%; 
  font-size: 10px; 
}

.heart-7 { 
  top: 40%; 
  right: 5%; 
  font-size: 7px; 
}

.nail-bottles {
  position: absolute;
  bottom: 1.25rem;
  right: 1.25rem;
  display: flex;
  gap: 0.375rem;
}

.bottle {
  width: 0.375rem;
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
  width: 0.625rem;
  height: 0.25rem;
  background-color: white;
  opacity: 0.25;
  border-radius: 0.125rem;
}

.bottle-1 { 
  height: 0.875rem; 
}

.bottle-2 { 
  height: 1.125rem; 
}

.bottle-3 { 
  height: 0.75rem; 
}

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

.membership-badge {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.membership-number {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.25;
  margin-bottom: 0.125rem;
}

.membership-text {
  font-size: 0.875rem;
  font-weight: 500;
  opacity: 0.95;
}

.membership-sub {
  font-size: 0.75rem;
  font-weight: 400;
  opacity: 0.8;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tier-icon {
  font-size: 1.125rem;
  opacity: 0.9;
}

.customer-name {
  font-size: 1.25rem;
  font-weight: 600;
  text-transform: capitalize;
}

.card-number {
  font-size: 0.875rem;
  font-weight: 500;
  opacity: 0.8;
  letter-spacing: 0.1em;
  margin-top: auto;
}

.loyalty-indicator {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
}

.points-text {
  font-size: 0.75rem;
  font-weight: 500;
  opacity: 0.9;
  background-color: white;
  background-opacity: 0.2;
  padding: 0.125rem 0.375rem;
  border-radius: 9999px;
  backdrop-filter: blur(16px);
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
