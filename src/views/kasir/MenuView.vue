<template>
    <div>
         <div class="hero_area">
            
            <!-- header section strats -->
            <header style="background-color: #191825;" class="header_section">
            <div class="container">
                <nav class="navbar navbar-expand-lg custom_nav-container ">
                <a class="navbar-brand" href="index.html">
                    <span>
                        Catel
                    </span>
                </a>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class=""> </span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav  mx-auto ">
                    <li class="nav-item active">
                        <a class="nav-link" href="/menu">Menu <span class="sr-only">(current)</span> </a>
                    </li>
                    <li class="nav-item ">
                        <a class="nav-link" href="/cart">Cart</a>
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
        

        <!-- food section -->
        <section class="food_section layout_padding">
            <div class="container">
            <div class="heading_container heading_center">
                <h2>
                Our Menu
                </h2>
            </div>
            <!-- <input type="text" class="form-control mb-4" v-model="carimenu" placeholder="Search menu..."> -->
            <div class="filters-content" >
                <div class="row grid ">
                    <div class="col-sm-6 col-lg-3 all pizza" v-for="menu in filter_menu" :key="menu.id_menu">
                        <div class="box">
                        <div>
                            <div class="img-box">
                                <img 
                                :src="'http://localhost/DataCafe/public/images/' + menu.gambar"
                                alt="Foto menu" style="width: 800px;">
                            </div>

                            <div class="detail-box">
                            <h5>
                                {{ menu.nama_menu }}
                            </h5>
                            <!-- <p>
                                {{ menu.desc }}
                            </p> -->

                            <div class="options">
                                <h6>
                                    RP.{{ menu.price }}
                                </h6>
                                <!-- <button class="btn btn-outline-primary" data-bs-toggle="modal" @click="getdetail(menu)" data-bs-target="#addpesanan">
                                    <i class="bi bi-basket3-fill"></i>
                                </button> -->
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" @click="getdetail(menu)" data-bs-target="#addpesanan">
                                    <i class="bi bi-basket3-fill"></i>
                                </button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
           
            </div>
        </section>
    </div>
        <!-- end food section -->

        <!-- Modal -->
        <div class="modal fade" id="addpesanan" tabindex="-1" aria-labelledby="addpesanan" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">
                            <i class="bi bi-x-lg"></i>
                </button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="addtocart">
                        <div class="modal-body">
                            <label for="nama">Nama:</label>
                            <input type="text" class="form-control" v-model="detailmenu.nama_menu">
                            <input type="hidden" v-model="detailmenu.id_menu">

                            <label for="jumlah">Jumlah:</label>
                            <input type="number" class="form-control" v-model="jumlah" required>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Add to cart</button>
                        </div>
                </form>
            </div>
            
            </div>
        </div>
        </div>
        <!-- End Modal input -->
    </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert';


export default {
    data() {
        return {
            
            menu: {},
            datamenu: {},
            detailmenu: {
                nama_menu: '',
                id_menu: ''
            },
            jumlah: '',
            foto: '',
            image: '',
            carimenu: ''
        }
    },
    mounted() {
        this.getmenu()
        this.getdetail()
        this.getcart()
    },
    computed: {
        filter_menu() {
            let filter_data = this.datamenu
            if (this.carimenu) {
                filter_data = filter_data.filter(menu => menu.nama.toString().toLowerCase().includes(this.carimenu.toLowerCase()))
            }
            return filter_data
        }
    },
    methods: {
      
        getmenu() {
            axios.get('http://localhost:8000/api/getmenu')
                .then(
                    ({ data }) => {
                        this.datamenu = data
                    }
                )
        },
        getdetail(menu) {
            axios.get('http://localhost:8000/api/getmenu/' + menu.id_menu)
                .then(
                    (response) => {
                        console.log(response)
                        this.detailmenu.id_menu = response.data[0].id_menu
                        this.detailmenu.nama_menu = response.data[0].nama_menu
                        // this.image = response.data[0].foto
                        this.detailmenu.jenis = response.data[0].jenis
                        this.detailmenu.harga = response.data[0].harga
                    }
                )
        },
        addtocart() {
            let datamenu = {
                id_menu: this.detailmenu.id_menu,
                total_pesanan: this.jumlah
            }

            axios.post('http://localhost:8000/api/createtransaksi', datamenu)
                .then(
                    (response) => {
                        console.log(response)
                        swal({
                            icon: 'success',
                            title: 'success',
                            button: true
                        })
                       setTimeout(() => {
                         location.href = '/menu'
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