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
                        <li class="nav-item">
                            <a class="nav-link" href="/datamenu">Menu</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/datapetugas">Petugas</a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="/datameja">Meja <span class="sr-only">(current)</span></a>
                        </li>
                    </ul>

                    <div class="user_option">
                        <p class="order_online">
                            ADMIN
                        </p>
                    </div>
                </div>
                </nav>
            </div>
            </header>
            <!-- end header section -->

            <!-- Table start -->
            <div class="user_option fixed top-0 left-0 right-0 z-50" style="margin: 30px 10px 10px 10px ;">
                <button class="btn_add btn btn-success" data-bs-toggle="modal" data-bs-target="#addmeja">Add Meja</button>
            </div>
            <table class="table table-hover table-striped">
                <thead>
                    <tr class="bg-dark text-light">
                        <th>No</th>
                        <th>Nomor Meja</th>
                        <th>status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(meja, nomor) in datameja" :key="nomor">
                        <td>{{ nomor + 1 }}</td>
                        <td>{{ meja.nomor_meja }}</td>
                        <td>{{ meja.status }}</td>
                        <td>
                            <button class="btn btn-danger" @click="hapus(meja)" style="margin-right: 5px;">Hapus</button>
                            <button class="btn btn-warning" @click="hapus(meja)">Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Table End -->

        <!-- modal ADD-->
        <div class="modal fade" id="addmeja" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title fs-5" id="exampleModalLabel">Add Meja</h3>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">
                            <i class="bi bi-x-circle"></i>
                        </button>
                    </div>
                    <form @submit.prevent="addmeja">
                        <div class="modal-body">

                            <label for="nomor_meja">Nomor Meja:</label>
                            <input type="text" class="form-control" v-model="meja.nomor_meja" required autocomplete="off" placeholder="Masukkan nama menu...">
                            
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- modal ADD end -->
        
    </div>
</template>
<script>
    import axios from 'axios'
    import swal from 'sweetalert'

    export default{
        data(){
            return{
                meja: {},
                datameja:{},
                detailmeja: {
                    nomor_meja:'',
                    status:'',
                    id_meja:''
                },
            }
        },
        mounted(){
            this.getmeja()
            this.getdetail()
        },
        methods:{
            getmeja() {
            axios.get('http://localhost:8000/api/getmeja')
                .then(
                    ({ data }) => {
                        console.log(data)
                        this.datameja = data
                    }
                )
            },
            hapus(meja){
                axios.delete('http://localhost:8000/api/deletemeja/' + meja.id_meja)
                .then(
                    (response) => {
                        console.log(response)
                        swal({
                            icon: 'success',
                            title: 'success',
                            button: true
                        })
                       setTimeout(() => {
                         location.href = '/datameja'
                       }, 1100);
                    }
                )
            },
            getdetail(meja) {
                axios.get('http://localhost:8000/api/getmeja/' + meja.id_meja)
                    .then(
                        (response) => {
                            console.log(response)
                            this.detailmeja.id_meja = response.data[0].id_meja
                            this.detailmeja.nomor_meja = response.data[0].nomor_meja
                            this.status = response.data[0].status                            
                        }
                    )
            },
            addmeja() {
                let form = new FormData
                form.append('nomor_meja', this.meja.nomor_meja)
                
                axios.post('http://localhost:8000/api/createmeja/', form)
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
                        (err) => {
                            console.log(err)
                            swal({
                                icon: 'error',
                                title: 'Failed Upload Menu',
                                button: true
                            })
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