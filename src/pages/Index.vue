<template>
    <main class="flex-shrink-0">
        <div class="container">
            <div class="mb-4 mt-5 text-center">
                <img src="@/assets/logo.svg" alt="" width="72" height="57">
                <h1>مدیریت حجم</h1>
            </div>
            <div class="row">
                <div class="col-md-4 mx-auto">
                    <form @submit.prevent.trim="validate()">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="floatingInput" placeholder="نام کاربری"
                                v-model="username">
                            <label for="floatingInput">نام کاربری</label>
                        </div>

                        <button type="submit" class="w-100 btn btn-lg btn-primary mt-3" :disabled="loading">
                            <span v-if="loading" class="spinner-border spinner-border-sm"></span>
                            ورود
                        </button>
                    </form>

                </div>
            </div>
        </div>
    </main>
</template>
  
<script>
import axios from 'axios';
import { ref } from 'vue';
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router';
import { API_BASE_URL } from '@/config.js';

export default {
    name: 'Index',
    setup() {
        const username = ref('')
        const router = useRouter();
        const loading = ref(false);

        function validate() {
            if (username.value.length == 0) {
                Swal.fire(
                    'خطا!',
                    "نام کاربری الزامی می باشد",
                    'error'
                )
                return false;
            }

            doLogin();
        }

        function doLogin() {
            loading.value = true;
            // Make a request for a user with a given ID
            axios.get(`${API_BASE_URL}/users/${username.value}`)
                .then(function (response) {
                    // handle success
                    if (response.data.error) {
                        Swal.fire(
                            'خطا!',
                            response.data.message,
                            'error'
                        )
                    }

                    if (response.data.success) {
                        Swal.fire(
                            'موفق!',
                            response.data.user.email + ' خوش آمدید',
                            'success'
                        )

                        router.push({ name: "user", params: { username: response.data.user.email } })
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

        return { validate, doLogin, username, loading };
    }
}
</script>
  
<style>
body,
p,
h1 {
    font-family: 'XMYekanRegular';
    font-weight: normal;
    font-style: normal;
}
</style>