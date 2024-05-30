<template>
  <div>
    <div v-if="data.user!=null" class="bg-dark">
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" :id="'heading'+data.address.id">
            <button class="accordion-button bg-dark text-light" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse'+data.address.id" aria-expanded="true" :aria-controls="'collapse'+data.address.id">
            <h3 class="text-danger">Customer:</h3>
            <span>{{ data.user.first_name }} {{ data.user.last_name }}.  </span>
            <h3 class="text-danger"> The Delivery Address:</h3>
             <span>{{ data.address.first_name }} {{data.address.last_name }}, {{ data.address.street }}{{ data.address.nr }}, {{ data.address.plz }} {{ data.address.city }}. </span>
            </button>
          </h2>
        </div>
        <div :id="'collapse'+data.address.id" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <div class="invoice-data card p-5">
              <div class="invoice-header">
                <p><span class="fw-bold">Invoice-Id:</span> {{ data.address.invoice.id }}</p>
                <p><span class="fw-bold">Payment-Source:</span> {{ data.address.invoice.payment_source }}</p>
              </div>
              <div class="orders">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Order-Id</th>
                      <th>Article</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(order,index) in data.address.invoice.orders" :key="index">
                      <td>{{ order.id }}</td>
                      <td>{{ order.article.title }}</td>
                      <td>{{ order.article.price }}€</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="show-invoices">
        <div v-for="(address, index) in data.addresses" :key="index">
            <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" :id="'heading'+address.id">
                    <button class="accordion-button bg-dark text-light" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse'+address.id" aria-expanded="true" :aria-controls="'collapse'+address.id">
                    <h3 class="text-danger">Yor Delivery Address{{(index+1)}}:</h3>
                     <span>{{ address.first_name }} {{address.last_name }}, {{ address.street }}{{ address.nr }}, {{ address.plz }} {{ address.city }}</span>
                    </button>
                  </h2>
                </div>
                  <div :id="'collapse'+address.id" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <div class="invoices" v-for="(invoice, index) in address.invoices" :key="index">
                            <div class="invoice-data card p-5">
                                <div class="invoice-header">
                                    <p><span class="fw-bold">Invoice-Id:</span> {{ invoice.id }}</p>
                                    <p><span class="fw-bold">Payment-Source:</span> {{ invoice.payment_source }}</p>
                                </div>
                                <div class="orders">
                                    <table class="table">
                                        <thead>
                                          <tr>
                                            <th>Order-Id</th>
                                            <th>Article</th>
                                            <th>Price</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(order,index) in invoice.orders" :key="index">
                                                <td>{{ order.id }}</td>
                                                <td>{{ order.article.title }}</td>
                                                <td>{{ order.article.price }}€</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ShopmeLaravelVuejsShow',

  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
  props:['data']
};
</script>
<style scoped>
.invoice-header *{
    margin-bottom: 0px;
}
</style>