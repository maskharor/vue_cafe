<template>
    <div class="body bagian-print">
        <div id="nota" class="mt-3">
            <div>

                <b>Cafe Wikusama</b><br>
                <small>Jalan mars No.99 (sawojajar) <br> IG: @WikusamaCafe <br> <br> Nama Kasir: {{ data_transaksi[0].nama_petugas }}<br> <br> Tgl : {{ data_transaksi[0].tgl_pesan }}<br> 
                
                <span style="text-decoration: underline; color: blue; cursor: pointer;" @click="print()" class="bagian-nonprint">Print</span>
                </small>


                <div class="container">
                    <table class="mt-3 table table-hover table-striped">
                        <thead>
                            <tr class="bg-light text-dark">
                                <td>No</td>
                                <td>Menu</td>
                                <td>Jumlah</td>
                                <td>Total</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, nomor) in data_transaksi" :key="nomor">
                                <td>{{ nomor + 1 }}</td>
                                <td>{{ data.nama_menu }}</td>
                                <td>{{ data.total_pesanan }}</td>
                                <td>{{ data.total_harga }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <b>Total Harga : {{ total_harga }} </b>
                </div>

                <div class="note">
                    <b>
                        Terimakasih sudah datang 
                    </b>
                </div>
                <!-- <p style="position: absolute;">print</p> -->
            </div>
        </div>
    </div>
</template>

<style scoped>

    @media print {
        .bagian-print{
            display: block !important;
        }

        .bagian-nonprint{
            display: none !important;
        }
    }

    #nota {
        width: 10cm;
        height: 15cm;
        background-color: #ffffff;
        border: 1px solid #000000;
    }

    .body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        }

    .note {
        margin-left: 4%;
        margin-right: 35%;
        margin-top: 65%;
        border: 1px solid black;
    }
</style>

<script>
    import axios from 'axios'

    export default{
        data(){
            return{
                data_transaksi:{},
                total_harga:''
            }
        },
        mounted(){
            this.getdata(this.$route.params.code)
            this.gettotal()
        },
        methods: {
            getdata(code) {
                axios.get('http://localhost:8000/api/gethistory/' + code)
                    .then(
                        ({ data }) => {
                            console.log(data)
                            this.data_transaksi = data
                        }
                    )
            },
            gettotal() {
            axios.get('http://localhost:8000/api/gettotal/' + this.$route.params.code)
                .then(
                    ({ data }) => {
                        console.log(data)
                        this.total_harga = data
                    }
                )
        },
            print(){
                window.print()
                setTimeout(() => {
                    location.href = '/menu'
                }, 1200);
            }
        }
    }
</script>