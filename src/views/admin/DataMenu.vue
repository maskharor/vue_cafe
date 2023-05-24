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
                    <li class="nav-item active">
                        <a class="nav-link" href="/datamenu">Menu <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/datapetugas">Petugas</a>
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
                <button class="btn_add btn btn-success" data-bs-toggle="modal" data-bs-target="#addmenu">Add Menu</button>
            </div>
            <table class="table table-hover table-striped">
                <thead>
                    <tr class="bg-dark text-light">
                        <th>No</th>
                        <th>Nama Menu</th>
                        <th>Type</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(menu, nomor) in menu" :key="nomor">
                        <td>{{ nomor + 1 }}</td>
                        <td>{{ menu.nama_menu }}</td>
                        <td>{{ menu.type }}</td>
                        <td> <img 
                                :src="'http://localhost/DataCafe/public/images/' + menu.gambar"
                                alt="Foto menu" style="width: 250px;">
                        </td>
                        <td>
                            <button class="btn btn-danger" @click="hapus(menu)" style="margin-right: 5px;">Hapus</button>
                            <button class="btn btn-warning" @click="getdetail(menu)" data-bs-toggle="modal"
                            data-bs-target="#editmenu" data-wow-delay="0.3s">Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- modal ADD-->
        <div class="modal fade" id="addmenu" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title fs-5" id="exampleModalLabel">Add Menu</h3>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">
                            <i class="bi bi-x-circle"></i>
                        </button>
                    </div>
                    <form @submit.prevent="addmenu">
                        <div class="modal-body">

                            <label for="nama_menu">Nama Menu:</label>
                            <input type="text" class="form-control" v-model="menu.nama_menu" required autocomplete="off" placeholder="Masukkan nama menu...">

                            <label for="type">Type</label>
                            <select required class="form-control" v-model="menu.type" id="type">
                                <option value="makanan">Makanan</option>
                                <option value="minuman">Minuman</option>
                            </select>

                            <label for="price">Price:</label>
                            <input type="text" class="form-control" v-model="menu.price" required placeholder="Masukkan harga...">
                            
                            <label for="gambar">Foto:</label>
                            <input type="file" id="gambar" class="form-control" @change="UploadFoto($event)" required>
                            
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
        <div class="modal fade" id="editmenu" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">EDIT MENU</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form @submit.prevent="editmenu">
                        <div class="modal-body">
                            <div class="card" style="width: 18rem;">
                                <img :src="'http://localhost/DataCafe/public/images/' + image"
                                    class="card-img-top" alt="...">
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col">
                                    <label for="nama_menu">Nama Menu:</label>
                                    <input type="text" class="form-control" v-model="detailmenu.nama_menu" required>
                                </div>

                                <div class="col">
                                    <label for="price">Harga:</label>
                                    <input type="number" class="form-control" v-model="detailmenu.price" required>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <label for="type">Type:</label>
                                    <select class="form-control" v-model="detailmenu.type" required id="type">
                                        <option value="makanan">Makanan</option>
                                        <option value="minuman">Minuman</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-info" data-bs-toggle="modal"
                                data-bs-target="#editgambar">Update Photo</button>
                            <button type="submit" class="btn btn-primary">save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- modal Edit end -->

        <!-- modal Edit menu start -->
        <div class="modal fade" id="editgambar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">UPDATE PHOTO</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form @submit.prevent="savefoto">
                        <div class="modal-body">
                            <input type="file" class="form-control" @change="updatefoto($event)" id="gambar" required>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                aria-label="Close">Close</button>
                            <button type="submit" class="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- modal Edit menu end -->

        
        
    </div>
</template>
<script>
    import axios from 'axios'
    import swal from 'sweetalert'

    export default{
        data(){
            return{
                menu: {},
                detailmenu: {},
                gambar:'',
                image:''


            }
        },
        mounted(){
            this.getmenu()
            this.getdetail()
        },
        methods:{
            getmenu() {
            axios.get('http://localhost:8000/api/getmenu')
                .then(
                    ({ data }) => {
                        console.log(data)
                        this.menu = data
                    }
                )
            },
            hapus(menu){
                axios.delete('http://localhost:8000/api/deletemenu/' + menu.id_menu)
                .then(
                    (response) => {
                        console.log(response)
                        swal({
                            icon: 'success',
                            title: 'success',
                            button: true
                        })
                       setTimeout(() => {
                         location.href = '/datamenu'
                       }, 1100);
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
                            this.image = response.data[0].gambar
                            this.detailmenu.type = response.data[0].type
                            this.detailmenu.price = response.data[0].price
                        }
                    )
            },
            UploadFoto(e) {
                this.menu.gambar = e.target.files[0]
            },
            addmenu() {
                let form = new FormData
                form.append('gambar', this.menu.gambar)
                form.append('nama_menu', this.menu.nama_menu)
                form.append('type', this.menu.type)
                form.append('desc', this.menu.desc)
                form.append('price', this.menu.price)

                axios.post('http://localhost:8000/api/createmenu/', form)
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
            editmenu() {
                swal({
                    title: 'Are you sure?',
                    icon: 'warning',
                    dangerMode: true,
                    buttons: true
                }).then(
                    (edit) => {
                        if (edit) {
                            axios.put('http://localhost:8000/api/updatemenu/' + this.detailmenu.id_menu, this.detailmenu)
                                .then(
                                    (response) => {
                                        console.log(response)
                                        swal({
                                            icon: 'success',
                                            title: 'Success Update Menu'
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
                                            title: 'Failed Update Menu'
                                        })
                                    }
                                )
                        }
                    }
                )
            },
            updatefoto(e) {
                this.gambar = e.target.files[0]
            },
            savefoto() {
                let form = new FormData
                form.append("gambar", this.gambar)

                axios.post('http://localhost:8000/api/updategambar/' + this.detailmenu.id_menu, form)
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
                                title: 'Failed Update Photo',
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