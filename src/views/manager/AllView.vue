<template> 
    <div>
        <div class="hero_area">
            <!-- header section strats -->
            <header style="background-color: #191825;" class="header_section">
            <div class="container">
                <nav class="navbar navbar-expand-lg custom_nav-container ">
                <a class="navbar-brand" href="index.html">
                    <span>
                        Wikusama
                    </span>
                </a>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class=""></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav  mx-auto ">
                    <!-- <li class="nav-item active">
                        <a class="nav-link" href="/all">All Transaction <span class="sr-only">(current)</span></a>
                    </li> -->
                    <li class="nav-item">
                        <a class="nav-link" href="/filter">Filter  </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/ongoing">Profit</a>
                    </li>
                    </ul>

                    <div class="user_option">
                    <p class="order_online">
                        MANAGER
                    </p>
                    </div>
                </div>
                </nav>
            </div>
            </header>
            <!-- end header section -->

             <!-- Service Start -->
             <div class="container-xxl py-5">
                <div class="container">
                    {{ role }}
                    <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h5 class="section-title ff-secondary text-center text-primary fw-normal">Transaction History</h5>
                    </div>

                    <div class="row mt-2">
                        <div class="col">
                            <input type="text" class="form-control" v-model="cari_kasir" autocomplete="off"
                                placeholder="Cari nama kasir...">
                        </div>
                    </div>

                    <div class="card mt-4" v-for="transaksi in filterdata" :key="transaksi.id_history">
                        <div class="card-header">
                            Transaksi pada tanggal {{ transaksi.tgl_transaksi }}
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Pelanggan atas nama {{ transaksi.nama_pelanggan }}</h5>
                            <p class="card-text">Di layani oleh kasir {{ transaksi.nama_petugas }}</p>
                            <a href="#" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#detail"
                                @click="getfunc(transaksi)">See detail</a>
                        </div>
                    </div>


                </div>
            </div>
            <!-- Service End -->

            <!-- DETAIL -->
            <div class="modal fade" id="detail" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">DETAIL</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <table class="table table-hover table-striped">
                                <thead class="bg-light text dark">
                                    <tr>
                                        <th>No</th>
                                        <th>Menu</th>
                                        <th>Jumlah</th>
                                        <th>Harga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(t, nomor) in detail" :key="nomor">
                                        <td>{{ nomor + 1 }}</td>
                                        <td>{{ t.nama }}</td>
                                        <td>{{ t.total_pesanan }}</td>
                                        <td>{{ t.total_harga }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p>Total Harga: <b>{{ total }}</b></p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END DETAIL -->
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import swal from 'sweetalert'

    export default{
        data(){
            return{
                alltransaksi:{},
                cari_kasir:'',
                detail:{},
                total:''
            }
        },
        mounted() {
        this.gettransaksi()
        this.gettotal()
    },
    computed: {
        filterdata() {
            let filterdata = this.alltransaksi
            if (this.cari_kasir) {
                filterdata = filterdata.filter(transaksi => transaksi.nama_petugas.toLowerCase().toString().includes(this.cari_kasir.toLowerCase()))
            }
            return filterdata
        }
    },
    methods: {
        getfunc(history){
            this.gettotal(history)
            this.getdetail(history)
        },
        gettransaksi() {
            axios.get('http://localhost:8000/api/gethistory')
                .then(
                    ({ data }) => {
                        console.log(data)
                        this.alltransaksi = data
                    }
                )
        },
        gettotal(history) {
            axios.get('http://localhost:8000/api/gettotal/' + history.id_keranjang)
                .then(
                    ({ data }) => {
                        console.log(data)
                        this.total = data
                    }
                )
        },
        logout() {
            swal({
                icon: 'warning',
                title: 'Ingin Log Out?',
                dangerMode: true,
                buttons: true
            }).then(
                (response) => {
                    if (response) {
                        localStorage.removeItem('role')
                        localStorage.removeItem('token')
                        swal({
                            icon: 'success',
                            button: false
                        })
                        setTimeout(() => {
                            location.href = '/'
                        }, 1200);
                    }
                }
            )
        }
    }
    }
</script>
