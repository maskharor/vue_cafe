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
                    <li class="nav-item active">
                        <a class="nav-link" href="/datapetugas">Petugas<span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/datameja">Meja</a>
                    </li>
                    </ul>

                    <div class="user_option">
                        <a href="# " @click="logout">
                            <p class="order_online">
                            <i class="bi bi-box-arrow-right"></i>
                                ADMIN
                            </p>
                        </a>
                    </div>
                </div>
                </nav>
            </div>
            </header>
            <!-- end header section -->

            <div class="user_option fixed top-0 left-0 right-0 z-50" style="margin: 30px 10px 10px 10px ;">
                <button class="btn_add btn btn-success" data-bs-toggle="modal" data-bs-target="#addpetugas">Add Peutgas</button>
            </div>
            <table class="table table-hover table-striped">
                <thead>
                    <tr class="bg-dark text-light">
                        <th>No</th>
                        <th>Nama Petugas</th>
                        <th>username</th>
                        <th>role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(petugas, nomor) in petugas" :key="nomor">
                        <td>{{ nomor + 1 }}</td>
                        <td>{{ petugas.nama_petugas }}</td>
                        <td>{{ petugas.username }}</td>
                        <td>{{ petugas.role }}</td>
                        <td>
                            <button class="btn btn-danger" @click="hapus(petugas)" style="margin-right: 5px;">Hapus</button>
                            <button class="btn btn-warning" @click="getdetail(petugas)" data-bs-toggle="modal"
                            data-bs-target="#editpetugas" data-wow-delay="0.3s">Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- modal ADD-->
        <div class="modal fade" id="addpetugas" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title fs-5" id="exampleModalLabel">Add Petugas</h3>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">
                            <i class="bi bi-x-circle"></i>
                        </button>
                    </div>
                    <form @submit.prevent="addpetugas">
                        <div class="modal-body">

                            <label for="nama_petugas">Nama Petugas:</label>
                            <input type="text" class="form-control" v-model="petugas.nama_petugas" required autocomplete="off" placeholder="Masukkan nama petugas...">
                          
                            <label for="username">Username:</label>
                            <input type="text" class="form-control" v-model="petugas.username" required placeholder="Masukkan username...">
                          
                            <label for="role">Role</label>
                            <select required class="form-control" v-model="petugas.role" id="role">
                                <option value="admin">Adimn</option>
                                <option value="kasir">Kasir</option>
                                <option value="manager">Manager</option>
                            </select>
                            
                            <label for="password">Password:</label>
                            <input type="password"  class="form-control" v-modal="petugas.password" placeholder="Masukkan password..." required>
                            
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

        <!-- modal Edit start -->
        <div class="modal fade" id="editpetugas" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit User</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form @submit.prevent="editpetugas">
                        <div class="modal-body">

                            <label for="nama_petugas">Nama Petugas:</label>
                            <input type="text" class="form-control" v-model="detailpetugas.nama_petugas" required autocomplete="off">

                            <label for="username">username:</label>
                            <input type="username" class="form-control" v-model="detailpetugas.username" required autocomplete="off">

                            <label for="password">Password:</label>
                            <input type="password" class="form-control" v-model="detailpetugas.password" required>

                            <label for="role">Role:</label>
                            <select class="form-control" v-model="detailpetugas.role" required id="role">
                                <option value="admin">Admin</option>
                                <option value="kasir">Kasir</option>
                                <option value="manager">Manager</option>
                            </select>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- modal Edit end -->

        
    </div>
</template>
<script>
    import axios from 'axios'
    import swal from 'sweetalert'

    export default{
        data(){
            return{
                petugas: {},
                datapetugas:{},
                detailpetugas: {
                    id_user:'',
                    nama_petugas:'',
                    username:'',
                    role:'',
                    password:'',
                },
                edit: {},
            }
        },
        mounted(){
            this.getpetugas()
        },
        methods:{
            getpetugas(){
            axios.get('http://localhost:8000/api/getuser')
                .then(
                    ({ data }) => {
                        console.log(data)
                        this.petugas = data
                    }
                )
            },
            hapus(petugas){
                axios.delete('http://localhost:8000/api/deleteuser/' + petugas.id_user)
                .then(
                    (response) => {
                        console.log(response)
                        swal({
                            icon: 'success',
                            title: 'success',
                            button: true
                        })
                       setTimeout(() => {
                         location.href = '/datapetugas'
                       }, 1100);
                    }
                )
            },
            getdetail(petugas) {
                axios.get('http://localhost:8000/api/getuser/' + petugas.id_user)
                    .then(
                        (response) => {
                            console.log(response)
                            this.detailpetugas.id_user = response.data[0].id_user
                            this.detailpetugas.nama_petugas = response.data[0].nama_petugas
                            this.detailpetugas.username = response.data[0].username
                            this.detailpetugas.role = response.data[0].role
                            this.detailpetugas.password = response.data[0].password
                        }
                    )
            },
            addpetugas() {
                let form = new FormData
                form.append('nama_petugas', this.petugas.nama_petugas)
                form.append('username', this.petugas.username)
                form.append('role', this.petugas.role)
                form.append('password', this.petugas.password)

                axios.post('http://localhost:8000/api/createuser/', form)
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
            editpetugas() {
                swal({
                    icon: 'warning',
                    title: 'Are you sure?',
                    dangerMode: true,
                    buttons: true
                }).then(
                    (save) => {
                        if (save) {
                            axios.put('http://localhost:8000/api/updateuser/' + this.detailpetugas.id_user, this.detailpetugas)
                                .then(
                                    (response) => {
                                        console.log(response)
                                        swal({
                                            icon: 'success',
                                            title: 'success',
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
                                            icon: 'error',
                                            title: 'Failed Update User',
                                            buttons: true
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