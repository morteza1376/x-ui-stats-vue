<template>
    <div class="row">
        <div class="main-content">
            <div class="header bg-gradient-primary pb-8 pt-5 pt-md-8">
                <div class="container">
                    <div class="header-body">
                        <div class="row placeholder-glow" v-if="loading">
                            <h3 class="mb-3 text-muted placeholder "></h3>
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                        </div>

                        <div class="row" v-else>
                            <div class="d-flex justify-content-between">
                                <h3 class="mb-3 text-muted">
                                    <b>{{ user.email }}</b> خوش آمدید
                                </h3>

                                <div class="form-group">
                                    <router-link to="/" class="btn btn-sm btn-outline-danger">
                                        <font-awesome-icon icon="sign-out-alt" />
                                        خروج
                                    </router-link>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="alert alert-danger alert-dismissible fade show" role="alert"
                                    v-if="!user.enable">
                                    <strong>خطا</strong> حساب شما غیرفعال شده است
                                    <button type="button" class="btn-close" data-bs-dismiss="alert"
                                        aria-label="Close"></button>
                                </div>

                            </div>

                            <div class="col-xl-3 col-lg-6">
                                <div class="card card-stats mb-4 mb-xl-0">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col">
                                                <h5 class="card-title text-uppercase text-muted mb-1">حجم دانلود شده</h5>
                                                <span class="h3 font-weight-bold mb-0" dir="ltr">{{ user.down }}</span>
                                            </div>
                                            <div class="col-auto">
                                                <div class="icon icon-shape bg-success text-white rounded-circle shadow">
                                                    <font-awesome-icon icon="download" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-lg-6">
                                <div class="card card-stats mb-4 mb-xl-0">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col">
                                                <h5 class="card-title text-uppercase text-muted mb-1">حجم آپلود شده</h5>
                                                <span class="h3 font-weight-bold mb-0" dir="ltr">{{ user.up }}</span>
                                            </div>
                                            <div class="col-auto">
                                                <div class="icon icon-shape bg-danger text-white rounded-circle shadow">
                                                    <font-awesome-icon icon="upload" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-lg-6">
                                <div class="card card-stats mb-4 mb-xl-0">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col">
                                                <h5 class="card-title text-uppercase text-muted mb-1">حجم باقی مانده</h5>
                                                <span class="h3 font-weight-bold mb-0" dir="ltr">{{ user.remaining_traffic
                                                }}</span>
                                            </div>
                                            <div class="col-auto">
                                                <div class="icon icon-shape bg-yellow text-white rounded-circle shadow">
                                                    <font-awesome-icon icon="chart-bar" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-lg-6">
                                <div class="card card-stats mb-4 mb-xl-0">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col">
                                                <h5 class="card-title text-uppercase text-muted mb-1">تاریخ پایان</h5>
                                                <span class="h3 font-weight-bold mb-0" dir="ltr">{{ user.expiry_time
                                                }}</span>
                                            </div>
                                            <div class="col-auto">
                                                <div class="icon icon-shape bg-info text-white rounded-circle shadow">
                                                    <font-awesome-icon icon="calendar" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-md-6">
                                <div class="card border-secondary mb-3">
                                    <div class="card-header">نرم افزار های موردنیاز</div>
                                    <div class="card-body">
                                        <h5 class="card-title">اندروید</h5>
                                        <p class="card-text">V2rayNg</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Page content -->
        </div>

    </div>
</template>
<script>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { reactive, ref } from "vue";
import moment from "jalali-moment";
import LoadingCard from "@/components/LoadingCard.vue";
import Swal from "sweetalert2";

export default {
    name: "User",
    setup() {
        const route = useRoute();
        const router = useRouter();
        const user = reactive({})
        const loading = ref(false);

        function getUser() {
            loading.value = true;
            axios.get(`http://127.0.0.1:5000/users/${route.params.username}`)
                .then(function (response) {
                    // handle success
                    if (response.data.error) {
                        Swal.fire(
                            'خطا!',
                            response.data.message,
                            'error'
                        )
                        router.push({ name: "index"})
                    }

                    if (response.data.success) {
                        // load data
                        const rq_data = response.data.user
                        user.email = rq_data.email
                        user.down = formatBytes(rq_data.down)
                        user.up = formatBytes(rq_data.up)
                        user.sum_usage = formatBytes(rq_data.down + rq_data.up)
                        user.enable = rq_data.enable;

                        if (rq_data.total == 0) {
                            user.remaining_traffic = "نامحدود"
                            user.total = "نامحدود"
                        } else {
                            user.total = formatBytes(rq_data.total)
                            user.remaining_traffic = formatBytes(rq_data.total - rq_data.down + rq_data.up)
                        }

                        if (rq_data.expiry_time == 0) {
                            user.expiry_time = "نامحدود"
                        } else {
                            // user.expiry_time = moment().locale('fa').format('YYYY/M/D');
                            user.expiry_time = moment(rq_data.expiry_time).locale('fa').format('YYYY-M-D');
                        }

                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                    loading.value = false;
                });
        }

        getUser()

        function formatBytes(a, b = 2) { if (!+a) return "0 Bytes"; const c = 0 > b ? 0 : b, d = Math.floor(Math.log(a) / Math.log(1024)); return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${["Bytes", "KB", "MB", "GB", "TB", "PB", "EiB", "ZiB", "YiB"][d]}` }

        return { getUser, user, formatBytes, loading }
    },
    components: {
        LoadingCard
    }
}
</script>
<style>
h2,
h5,
.h2,
.h5 {
    font-family: inherit;
    font-weight: 600;
    line-height: 1.5;
    margin-bottom: .5rem;
    color: #32325d;
}

h5,
.h5 {
    font-size: .8125rem;
}

@media (min-width: 992px) {

    .col-lg-6 {
        max-width: 50%;
        flex: 0 0 50%;
    }
}

@media (min-width: 1200px) {

    .col-xl-3 {
        max-width: 25%;
        flex: 0 0 25%;
    }

    .col-xl-6 {
        max-width: 50%;
        flex: 0 0 50%;
    }
}


.bg-danger {
    background-color: #f5365c !important;
}



@media (min-width: 1200px) {

    .justify-content-xl-between {
        justify-content: space-between !important;
    }
}


.pt-5 {
    padding-top: 3rem !important;
}

.pb-8 {
    padding-bottom: 8rem !important;
}

@media (min-width: 768px) {

    .pt-md-8 {
        padding-top: 8rem !important;
    }
}

@media (min-width: 1200px) {

    .mb-xl-0 {
        margin-bottom: 0 !important;
    }
}




.font-weight-bold {
    font-weight: 600 !important;
}


a.text-success:hover,
a.text-success:focus {
    color: #24a46d !important;
}

.text-warning {
    color: #fb6340 !important;
}

a.text-warning:hover,
a.text-warning:focus {
    color: #fa3a0e !important;
}

.text-danger {
    color: #f5365c !important;
}

a.text-danger:hover,
a.text-danger:focus {
    color: #ec0c38 !important;
}

.text-white {
    color: #fff !important;
}

a.text-white:hover,
a.text-white:focus {
    color: #e6e6e6 !important;
}

.text-muted {
    color: #8898aa !important;
}

@media print {

    *,
    *::before,
    *::after {
        box-shadow: none !important;
        text-shadow: none !important;
    }

    a:not(.btn) {
        text-decoration: underline;
    }

    p,
    h2 {
        orphans: 3;
        widows: 3;
    }

    h2 {
        page-break-after: avoid;
    }

    body {
        min-width: 992px !important;
    }
}

figcaption,
main {
    display: block;
}

main {
    overflow: hidden;
}

.bg-yellow {
    background-color: #ffd600 !important;
}






.icon {
    width: 3rem;
    height: 3rem;
}

.icon i {
    font-size: 2.25rem;
}

.icon-shape {
    display: inline-flex;
    padding: 12px;
    text-align: center;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
}
</style>