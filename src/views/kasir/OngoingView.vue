    <template>
        <div>
            <div class="hero_area bg-box">
                <!-- header section strats -->
                <header style="background-color: #191825;" class="header_section">
                <div class="container">
                    <nav class="navbar navbar-expand-lg custom_nav-container ">
                    <a class="navbar-brand" href="index.html">
                        <span>
                            Wikusama Cafe
                        </span>
                    </a>

                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class=""> </span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav  mx-auto ">
                        <li class="nav-item">
                            <a class="nav-link" href="/menu">Menu</a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link" href="/cart">Cart</a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="/ongoing">On-going <span class="sr-only">(current)</span></a>
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
            </div>

            
            <!-- Meja section -->
            <section class="food_section layout_padding">
                    <div class="container">
                        <div class="heading_container heading_center">
                            <h2>
                                Meja 
                            </h2>
                        </div>

                        <div class="filters-content">
                            <div class="row grid">
                                <div class="col-sm-6 col-lg-4 all pizza">
                                <input type="number" class="form-control mb-4" v-model="cari_meja" placeholder="Cari nomor meja..." autocomplete="off">
                                    <div>
                                    <div data-bs-toggle="modal" data-bs-target="#finish" @click="handleclick(meja)" class="box wow fadeInUp" v-for="meja in filter_ongoing" :key="meja.id_meja">
                                        <div>
                                            <div class="img-box">
                                                <img src="images/favicon.png" alt="">
                                            </div>
                                            <div class="detail-box">
                                                <h5>
                                                    Meja no : {{ meja.nomor_meja }}
                                                </h5>
                                                <p>
                                                    status : {{ meja.status }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                    </div>
            </section>
            <!-- end food section -->

            <!-- FINISH TRANSAKSI -->
            <div class="modal fade" id="finish" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title fs-5" id="exampleModalLabel">SELESAIKAN TRANSAKSI</h5>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">
                                <i class="bi bi-x-lg"></i>
                            </button>
                        </div>
                        <form @submit.prevent="selesaitransaksi">
                            <div class="modal-body">
                                <span style="font-family: 'Times New Roman', Times, serif;">ATAS NAMA: <b>{{
                                    detail_ongoing.nama_pelanggan }}</b> </span>
                                <br>
                                <span style="font-family: 'Times New Roman', Times, serif;">TOTAL HARGA: <b>{{
                                    totalharga }}</b> </span>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">Selesai</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!-- END FINISH TRANSAKSI -->

        </div>
    </template>

    <script>
        import axios from 'axios'
        import swal from 'sweetalert'

        export default{
            data(){
                return{
                    ongoing: {},
                    totalharga: '',
                    detail_ongoing: {},
                    cari_meja: ''
                }
            },
            mounted() {
            this.getongoing()
            this.gettotalharga()
            },
            computed: {
                filter_ongoing() {
                    let filtered = this.ongoing
                    if (this.cari_meja) {
                        filtered = filtered.filter(meja => meja.nomor_meja.toString().toLowerCase().includes(this.cari_meja.toLowerCase()))
                    }
                    return filtered
                }
            },
            methods: {
                getongoing(){
                    axios.get('http://localhost:8000/api/getongoing')
                        .then(
                            ({ data }) => {
                                console.log(data)
                                this.ongoing = data
                            }
                        )
                },
                handleclick(meja) {
                    this.getdetailtransaksi(meja)
                    this.gettotalharga(meja)
                },
                getdetailtransaksi(meja) {
                    axios.get('http://localhost:8000/api/get_ongoing_transaksi/' + meja.id_meja)
                        .then(
                            ({ data }) => {
                                console.log(data)
                                this.detail_ongoing = data
                            }
                        )
                },
                gettotalharga(meja) {
                    axios.get('http://localhost:8000/api/gettotalharga/' + meja.id_meja)
                        .then(
                            ({ data }) => {
                                console.log(data)
                                this.totalharga = data
                            }
                        )
                },
                selesaitransaksi() {
                    swal({
                        icon: 'warning',
                        title: 'Complete the transaction?',
                        dangerMode: true,
                        buttons: true
                    }).then(
                        (response) => {
                            if (response) {
                                axios.put('http://localhost:8000/api/transaksi_done/' + this.detail_ongoing.id_meja, this.detail_ongoing.id_meja)
                                    .then(
                                        (response) => {
                                            console.log(response)
                                            swal({
                                                icon: 'success',
                                                title: 'Success'
                                            })
                                            setTimeout(() => {
                                                location.href = '/printnota/' + this.detail_ongoing.id_keranjang
                                            }, 1200);
                                        }
                                    )
                                    .catch(
                                        (error) => {
                                            console.log(error)
                                            swal({
                                                title: 'Failed',
                                                icon: 'error'
                                            })
                                        }
                                    )
                            }
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