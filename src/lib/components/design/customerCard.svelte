
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
      <!-- Header with membership level -->
      <div class="card-header">
        <div class="membership-badge">
          <span class="membership-number">36.6</span>
          <span class="membership-text">{membershipLevel}</span>
          <span class="membership-sub">Club</span>
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
  max-width: 400px;
  height: 250px;
  perspective: 1000px;
  margin: 0 auto;
}

.card-background {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  transform: rotateX(5deg) rotateY(-5deg);
  transition: transform 0.3s ease;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: rotateX(0deg) rotateY(0deg) scale(1.02);
  }
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
  color: rgba(255, 255, 255, 0.3);
  font-size: 16px;
  animation: float 6s ease-in-out infinite;
  
  &.heart-1 { top: 20%; right: 15%; animation-delay: 0s; }
  &.heart-2 { top: 35%; right: 25%; animation-delay: 1s; font-size: 12px; }
  &.heart-3 { top: 50%; right: 10%; animation-delay: 2s; font-size: 14px; }
  &.heart-4 { top: 65%; right: 30%; animation-delay: 3s; font-size: 10px; }
  &.heart-5 { top: 15%; right: 35%; animation-delay: 1.5s; font-size: 8px; }
  &.heart-6 { top: 75%; right: 20%; animation-delay: 4s; font-size: 12px; }
  &.heart-7 { top: 40%; right: 5%; animation-delay: 2.5s; font-size: 9px; }
}

.nail-bottles {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 8px;
}

.bottle {
  width: 8px;
  height: 20px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 2px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 6px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
  
  &.bottle-1 { height: 18px; }
  &.bottle-2 { height: 22px; }
  &.bottle-3 { height: 16px; }
}

.card-content {
  position: relative;
  z-index: 10;
  height: 100%;
  padding: 24px;
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
    font-size: 32px;
    font-weight: 700;
    line-height: 0.9;
    margin-bottom: 2px;
  }
  
  .membership-text {
    font-size: 16px;
    font-weight: 500;
    opacity: 0.95;
  }
  
  .membership-sub {
    font-size: 14px;
    font-weight: 400;
    opacity: 0.8;
  }
}

.customer-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  
  .tier-icon {
    font-size: 18px;
    opacity: 0.9;
  }
  
  .customer-name {
    font-size: 24px;
    font-weight: 600;
    text-transform: capitalize;
  }
}

.card-number {
  font-size: 16px;
  font-weight: 500;
  opacity: 0.8;
  letter-spacing: 2px;
  margin-top: auto;
}

.loyalty-indicator {
  position: absolute;
  top: 24px;
  right: 24px;
  
  .points-text {
    font-size: 12px;
    font-weight: 500;
    opacity: 0.9;
    background: rgba(255, 255, 255, 0.2);
    padding: 4px 8px;
    border-radius: 12px;
    backdrop-filter: blur(10px);
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .customer-card {
    max-width: 320px;
    height: 200px;
  }
  
  .card-content {
    padding: 20px;
  }
  
  .membership-badge .membership-number {
    font-size: 28px;
  }
  
  .customer-name {
    font-size: 20px;
  }
}
</style>
