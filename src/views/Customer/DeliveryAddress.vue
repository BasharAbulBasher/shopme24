<template>
    <div class="my-profile bg-dark mt-2 card d-flex justify-content-center" style="min-height: 200px;">
        <div class="container">
            <div class="row create-delivery-add">
                <div class="header">
                <h3 class="text-danger" style="width: 60%;">Create New Delivery Address</h3>
                </div>
                <div class="mb-3 col-md-6 text-light">
                    <label class="form-label ">Firstname</label>
                    <input v-model="firstnameInput" type="text" class="form-control" placeholder="Firstname...">
                    <small class="text-danger">{{ first_name }}</small>
                </div>
                <div class="mb-3 col-md-6 text-light">
                    <label class="form-label ">Lastname</label>
                    <input v-model="lastnameInput" type="text" class="form-control" placeholder="Lastname...">
                    <small class="text-danger">{{ last_name }}</small>
                </div>
                <div class="mb-3 col-md-6 text-light">
                    <label class="form-label ">Street</label>
                    <input v-model="streetInput" type="text" class="form-control" placeholder="Berlinerplatz...">
                    <small class="text-danger">{{ street }}</small>
                </div>
                <div class="mb-3 col-md-3 text-light">
                    <label class="form-label ">HousNr</label>
                    <input v-model="housNrInput" type="number" class="form-control" placeholder="123...">
                    <small class="text-danger">{{ nr }}</small>
                </div>
                <div class="mb-3 col-md-6 text-light">
                    <label class="form-label ">City</label>
                    <input v-model="cityInput" type="text" class="form-control" placeholder="Berlin...">
                    <small class="text-danger">{{ city }}</small>
                </div>
                <div class="mb-3 col-md-3 text-light">
                    <label class="form-label ">PLZ</label>
                    <input v-model="plzInput" type="number" class="form-control" placeholder="12345...">
                    <small class="text-danger">{{ plz }}</small>
                </div>
                <div class="footer col-md-12">
                    <button v-show="spinner!=true" v-on:click="create()" class="btn btn-outline-danger w-100 mb-2">Create</button>
                    <BaseSpinner v-if="spinner==true"/>
                    <h4 class="text-success">{{ successMes }}</h4>
                    <small class="text-danger">{{ errorMes }}</small>
                    
                </div>
            </div>
            <div class="row show-delivery-add mt-3 mb-5">
                <div class="header">
                    <h3 class="text-danger" style="width:60%;">My Delivery Addresses</h3>
                </div>
                <div class="card col-md-3 p-3 bg-dark me-2" v-for="(address, index) in deliveryAddresses" :key="index">
                    <div class="card-header">
                        <h3 class="text-danger">{{ address.first_name }} {{ address.last_name }}</h3>
                    </div>
                    <div class="card-body">
                        <p class="card-text m-0 text-light">{{ address.street }} {{ address.nr }}</p>
                        <p class="card-text m-0 text-light">{{ address.city }} {{ address.plz }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import BaseSpinner from '@/components/Spinner/BaseSpinner.vue';
export default {

    data() {
        return {
            //Address Date
            firstnameInput:null,
            lastnameInput:null,
            streetInput:null,
            housNrInput:null,
            cityInput:null,
            plzInput:null,
            //Success & Error Messge
            successMes:'',
            errorMes:'',
            //Validation
            first_name:'',
            last_name:'',
            street:'',
            nr:'',
            city:'',
            plz:'',
            //Show Delivery-Addresses
            deliveryAddresses:null,
            //Spinner
            spinner:false,
        };
    },
    mounted() {
         this.$store.dispatch('getDeliveryAddresses').then(res=>{
            console.log(res)
            this.deliveryAddresses=res.data;
         }).catch(err=>{
            console.log(err)
         })
    },

    methods: {
        create()
        {
            this.reset();
            this.spinner=true;
            axios.post(this.$store.state.baseBackendUrlRequest+'address/save',{
                'first_name':this.firstnameInput,
                'last_name':this.lastnameInput,
                'street':this.streetInput,
                'nr':this.housNrInput,
                'city':this.cityInput,
                'plz':this.plzInput,
            },
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
                }
            }).then(res=>{
                this.spinner=false;
                if(res.data.success==true)
                {
                    this.successMes=res.data.message;
                    window.location.reload();
                }else{
                    this.errorMes="Something went worng..."
                }
            }).catch(err=>{
                this.spinner=false;
                console.log(err)
                if(err.response.data.errors!=null)
                {
                    var errors=err.response.data.errors;
                    this.getValidAttributes().forEach(attr => {
                        if(errors[attr]!=null)
                        {
                            this[attr]=errors[attr][0];
                        }
                    });
                }
                this.errorMes=err.response.data.message;
            })
        },
        reset()
        {
            //Reset Validation Messages
            this.first_name='';
            this.last_name='';
            this.street='';
            this.nr='';
            this.city='';
            this.plz='';
            //Reset Error & Success MEssages
            this.errorMes='';
            this.successMes='';
        },
        getValidAttributes()
        {
            return[
            'first_name',
            'last_name',
            'street',
            'nr',
            'city',
            'plz',
            ]
        }
    },
    components:{
        BaseSpinner,
    }
};
</script>

<style lang="scss" scoped>

</style>