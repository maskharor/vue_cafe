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
                    <li class="nav-item ">
                        <a class="nav-link" href="/menu">Menu</a>
                    </li>
                    <li class="nav-item active ">
                        <a class="nav-link" href="/cart">Cart <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/ongoing">On-going</a>
                    </li>
                    <!-- <li class="nav-item">
                        <a class="nav-link" href="/history">History</a>
                    </li> -->
                    </ul>

                    <div class="user_option">
                        <a href="# " @click="logout">
                            <p class="order_online">
                            <i class="bi bi-box-arrow-right"></i>
                                KASIR
                            </p>
                        </a>
                    </div>
                </div>
                </nav>
            </div>
            </header>
            <!-- end header section -->

            <table class="table table-hover table-striped">
                <thead>
                    <tr class="bg-dark text-light">
                        <th>No</th>
                        <th>Menu</th>
                        <th>Jumlah</th>
                        <th>Total Harga</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(menu, nomor) in cart" :key="nomor">
                        <td>{{ nomor + 1 }}</td>
                        <td>{{ menu.nama_menu }}</td>
                        <td>{{ menu.total_pesanan }}</td>
                        <td>{{ menu.total_harga }}</td>
                        <td><button class="btn btn-outline-danger" @click="hapus(menu)">Hapus</button></td>
                    </tr>
                </tbody>
            </table>
            <button class="btn btn-outline-success mt-3" data-bs-toggle="modal" data-bs-target="#checkout">CheckOut</button>
        </div>
        <div class="modal fade" id="checkout" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Check Out</h1>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <form @submit.prevent="checkoutnow">
                        <div class="modal-body">

                            <label for="meja" >Nama Kasir</label>                            
                            <input type="text" class="form-control" v-model="nama" readonly> 
                            <label for="meja">Meja</label>
                            <select required class="form-control" v-model="checkout.id_meja" id="meja">
                                <option v-for="nomor in meja" :key="nomor.id_meja" :value="nomor.id_meja">{{
                                    nomor.nomor_meja }}</option>
                            </select>

                            <label for="nama">Pelanggan:</label>
                            <input type="text" class="form-control" v-model="checkout.nama_pelanggan" required
                                autocomplete="off" placeholder="Masukkan nama pelanggan...">

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Check Out</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import swal from 'sweetalert'

    export default{
        data(){
            return{
                cart: {
                    
                },
                kasir: {

                },
                meja: {

                },
                checkout: {
                    id_user : localStorage.getItem('id_user')
                },
                nama:localStorage.getItem('username')
            }
        },
        mounted(){
            this.getcart()
            this.getkasir()
            this.getmeja()
            
        },
        methods:{
            
            getSelectedKasir() {
                const username = localStorage.getItem('username');
                const selectedKasir = this.kasir.find(kasir => kasir.nama_petugas === username);
                
                if (selectedKasir) {
                    this.checkout.id_user = selectedKasir.id_user;
                }
            },
            getkasir() {
            axios.get('http://localhost:8000/api/getkasir')
                .then(
                    ({ data }) => {
                        console.log(data)
                        this.kasir = data
                    }
                )
            },
            getmeja() {
            axios.get('http://localhost:8000/api/getmejakosong')
                .then(
                    ({ data }) => {
                        console.log(data)
                        this.meja = data
                    }
                )
            },
            getcart() {
            axios.get('http://localhost:8000/api/getcart')
                .then(
                    ({ data }) => {
                        console.log(data)
                        this.cart = data
                    }
                )
            },
            checkoutnow() {
                swal({
                    title: 'Are you sure?',
                    icon: 'warning',
                    dangerMode: true,
                    buttons: true,
                }).then(
                    (checkout) => {
                        if (checkout) {
                            axios.put('http://localhost:8000/api/checkout', this.checkout)
                                .then(
                                    (response) => {
                                        console.log(response)
                                        swal({
                                            icon: 'success',
                                            title: 'Success'
                                        })
                                        setTimeout(() => {
                                            location.reload()
                                        }, 1200);
                                    }
                                )
                                .catch(
                                    (error) => {
                                        console.log(error)
                                        swal({
                                            title: 'Failed Check Out',
                                            icon: 'error',
                                            button: true
                                        })
                                    }
                                )
                        }
                    }
                )
            },
            hapus(menu) {
                axios.delete('http://127.0.0.1:8000/api/deletetransaksi/' + menu.id_transaksi)
                .then(
                    (response) => {
                        console.log(response)
                        swal({
                            icon: 'success',
                            title: 'success',
                            button: true
                        })
                       setTimeout(() => {
                         location.href = '/cart'
                       }, 1100);
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
                                icon: 'success'
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