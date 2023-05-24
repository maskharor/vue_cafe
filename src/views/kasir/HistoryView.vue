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
                    <li class="nav-item ">
                        <a class="nav-link" href="/cart">Cart</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/ongoing">On-going</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="/history">History <span class="sr-only">(current)</span> </a>
                    </li>
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

    </div>
</template>