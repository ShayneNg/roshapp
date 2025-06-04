<script>
  let widgets = ['Sales', 'Revenue', 'User Growth', 'Customer Satisfaction'];
</script>

<style>
  .dashboard {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
  
  .widget {
    background-color: #f3f4f6;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>

<div class="dashboard">
  {#each widgets as widget}
    <div class="widget">
      <h3>{widget}</h3>
      <p>Content for {widget}.</p>
    </div>
  {/each}
</div>