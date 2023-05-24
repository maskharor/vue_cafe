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
                    <!-- <li class="nav-item ">
                        <a class="nav-link" href="/all">All Transaction</a>
                    </li> -->
                    <li class="nav-item ">
                        <a class="nav-link" href="/filter">Filter</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="/ongoing">Profit <span class="sr-only">(current)</span></a>
                    </li>
                    </ul>

                    <div class="user_option">
                        <a href="# " @click="logout">
                            <p class="order_online">
                            <i class="bi bi-box-arrow-right"></i>
                                MANAGER
                            </p>
                        </a>
                    </div>
                </div>
                </nav>
            </div>
            </header>
            <!-- end header section -->

            <!-- Service Start -->
            <div class="container-xxl py-5">
                <div class="container">
                    <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h5 class="section-title ff-secondary text-center text-primary fw-normal">Profit Transaction</h5>
                    </div>

                    <div class="row mt-3">
                        <div class="col">
                            <input type="date" class="form-control" v-model="cari_tgl">
                        </div>
                        <div class="col">
                            <input type="month" class="form-control" v-model="cari_bulan">
                        </div>
                        <div class="col">
                            <input type="submit" @click="getdate" class="btn btn-primary">
                        </div>
                    </div>

                    <div class="card mt-4">
                        <div class="card-header">
                            Penghasilan
                        </div>
                        <div class="card-body">
                            <h5 class="card-title" v-if="this.cari_bulan">Pendapatan bulan {{ cari_bulan }} Adalah Rp.{{
                                profitbulan }}</h5>
                            <p class="card-text" v-if="this.cari_tgl">Pendapatan Tanggal {{ cari_tgl }} Adalah Rp.{{
                                profithari }}</p>
                        </div>

                         
                    </div>

                </div>
            </div>
            <!-- Service End -->

           
            <div style="width: 300px; height: 300px; margin: auto;" class="mt-4">
                <canvas id="piechart" width="300" height="300"></canvas>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import swal from 'sweetalert'
    import Chart from 'chart.js/auto'

    export default{
        data(){
            return{
                cari_bulan:'',
                cari_tgl:'',
                profitbulan:'',
                profithari:'',
                datamenu:{}
            }
        },
        mounted(){
            this.getdate()
        axios.get('http://localhost:8000/api/getmenu')
            .then(
                (response) => {
                    console.log(response)
                    const data = response.data.map(item => item.jumlah_pesan)
                    const nama = response.data.map(item => item.nama_menu)

                    let colors = []
                    for (let i = 0; i < data.length; i++) {
                        let color = '#' + Math.floor(Math.random() * 16777215).toString(16)
                        colors.push(color)
                    }

                    const chartData = {
                        labels: nama,
                        datasets: [{
                            data: data,
                            backgroundColor: colors
                        }]
                    }


                    new Chart(document.getElementById('piechart'), {
                        type: 'pie',
                        labels: 'Data Menu',
                        data: chartData,
                        options: {
                            responsive: true
                        }
                    })
                })
            .catch(
                err => {
                    console.log(err)
                }
            )
        },
        methods:{
            getdate() {
                if(this.cari_bulan){
                    axios.get('http://localhost:8000/api/getbulan/' + this.cari_bulan)
                        .then(
                            ({ data }) => {
                                console.log(data)
                                this.profitbulan = data
                            }
                        )
                }
                if(this.cari_tgl){
                    axios.get('http://localhost:8000/api/gettgl/' + this.cari_tgl)
                        .then(
                            ({ data }) => {
                                console.log(data)
                                this.profithari = data
                            }
                        )
                }  
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