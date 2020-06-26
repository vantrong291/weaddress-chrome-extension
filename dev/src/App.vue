<template>
    <div id="app" class="p-3">
        <div>
            <div class="row justify-content-center mb-3">
                <div class="col-8" style="">
                    <p class="m-0 font-weight-bold" style="font-size: 24px">Hệ thống chuẩn hóa địa chỉ</p>
                </div>
                <div class="col-4">
                    <img src="./assets/logo/WeAddress@0,5x.png" alt="" width="180">
                </div>
                <!--<div class="col-8" style="">-->
                <!--<p class="m-0 font-weight-bold text-right pt-1" style="font-size: 24px">Hệ thống chuẩn hóa địa chỉ</p>-->
                <!--</div>-->
            </div>
            <div class="row justify-content-center">
                <div class="col-12">
                    <div class="subscribe-form">
                        <div class="mb-2">
                            <form class="mt-2" action="">
                                <b-form-checkbox
                                    id="checkbox-1"
                                    v-model="commaHandle"
                                    name="checkbox-1"
                                    value="1"
                                    unchecked-value="0"
                                    inline
                                >
                                    Địa chỉ chứa dấu ", " ngăn cách
                                </b-form-checkbox>
                            </form>
                        </div>
                        <form @submit.prevent="onStandardButtonClick">
                            <input type="text" placeholder="Địa chỉ cẫn chuẩn hóa ..." v-model="rawAddress">
                            <b-button v-b-modal.result-modal-xl variant="primary" @click="onStandardButtonClick">Chuẩn
                                hóa
                            </b-button>
                        </form>
                    </div>
                </div>
            </div>
            <div style="height: 180px">
                <hr>
                <div class="justify-content-center center-align-container" v-if="standardResult.result || resultModalLoading">
                    <span class="center-align-content" v-if="resultModalLoading">
                        <beat-loader :loading="resultModalLoading" color="#5a4fdc" size="14px"></beat-loader>
                    </span>
                    <div class="h-100" v-else>
                        <div class="row mx-0">
                            <p class="m-0 font-weight-bold">Kết quả: </p>
                        </div>
                        <div class="row mx-0">
                            <p>{{standardResult.result}}</p>
                        </div>
                        <!--<div class="row mx-0">-->
                            <!--Thiếu/viết tắt:-->
                            <!--<span v-if="standardResult.missing.length !== 0">-->
                                        <!--<b-badge v-for="(item, index) in standardResult.missing" :key="index" variant="warning">{{item}}</b-badge>-->
                                    <!--</span>-->
                            <!--<span v-else>-->
                                        <!--<b-badge variant="success">Không</b-badge>-->
                                    <!--</span>-->
                        <!--</div>-->
                        <div class="row mx-0">
                            <p class="m-0 font-weight-bold">Chi tiết: </p>
                            <ul>
                                <li>Đơn vị hành chính cấp thấp:
                                    <strong v-if="this.subExecutableAddress">
                                        {{this.subExecutableAddress}}
                                    </strong>
                                    <b-badge v-else variant="secondary">Trống</b-badge>
                                </li>
                                <li>Đơn vị cấp xã/phường/thị trấn:
                                    <strong v-if="standardResult.detail.PX">
                                        {{standardResult.detail.PX}}
                                    </strong>
                                    <b-badge v-else variant="secondary">Trống</b-badge>
                                </li>
                                <li>Đơn vị cấp quận/huyện:
                                    <strong v-if="standardResult.detail.QH">
                                        {{standardResult.detail.QH}}
                                    </strong>
                                    <b-badge v-else variant="secondary">Trống</b-badge>
                                </li>
                                <li>Đơn vị cấp tỉnh/thành phố:
                                    <strong v-if="standardResult.detail.TTP">
                                        {{standardResult.detail.TTP}}
                                    </strong>
                                    <b-badge v-else variant="secondary">Trống</b-badge>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {SAMPLE_ERROR_ADDRESSES} from "./constants";
    import request from "./request";
    import BeatLoader from 'vue-spinner/src/BeatLoader.vue'

    export default {
        name: 'app',
        data() {
            return {
                // rawAddress: "khaawcniem, bawcninh, bawcninh",
                // rawAddress: "Bawsc Hải, Hai Minh, Hai Haaju, Namdinh",
                rawAddress: "",
                mainExecutableAddress: "",
                subExecutableAddress: "",
                resultModalLoading: false,
                standardResult: {},
                commaHandle: "1"
            }
        },
        components: {
            BeatLoader
        },
        created() {
            this.rawAddress = SAMPLE_ERROR_ADDRESSES[Math.floor(Math.random() * SAMPLE_ERROR_ADDRESSES.length)]
        },
        methods: {
            onStandardButtonClick: function () {
                this.resultModalLoading = true;
                const rawAddressArray = this.rawAddress.split(', ');
                const rawAddressArrayLength = rawAddressArray.length;
                const mainExecutableAddress = rawAddressArrayLength > 3 ? rawAddressArray.slice(rawAddressArrayLength - 3, rawAddressArrayLength).join(", ") : this.rawAddress;
                const subExecutableAddress = rawAddressArrayLength > 3 ? rawAddressArray.slice(0, rawAddressArrayLength - 3).join(", ") : "";
                this.mainExecutableAddress = mainExecutableAddress;
                this.subExecutableAddress = subExecutableAddress;
                const reqData = {
                    "raw_address": mainExecutableAddress,
                    "comma_handle": this.commaHandle === "1"
                };
                const path = "/api/v1/standard/";
                request.post(this, path, reqData, this.onStandardizeSuccess)
            },
            onStandardizeSuccess: function (response) {
                if (response.success) {
                    this.resultModalLoading = false;
                    // console.log(response.data);
                    this.standardResult = response.data
                }
            },
            getMapUrl: function (address) {
                return `https://www.google.com/maps/embed/v1/place?key=${MAP_JS_APIKEY}&q=${address}`
            },
        }
    }
</script>

<style lang="scss">
    @import '~bootstrap/scss/bootstrap';
    @import '~bootstrap-vue/src/index.scss';

    #app {
        font-family: 'Muli', 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width: 600px;
        height: 400px;
    }

    .subscribe-form form {
        position: relative;
        /*max-width: 600px;*/
        margin: 0px auto;
    }

    .subscribe-form input {
        padding: 17px 20px;
        width: 100%;
        border: none;
        outline: none !important;
        padding-right: 160px;
        padding-left: 20px;
        background-color: #f0f2fa;
        border-radius: 4px;
    }

    .subscribe-form button {
        position: absolute;
        top: 7px;
        right: 7px;
    }

    .btn.btn-primary {
        background-color: #5a4fdc !important;
        border: 1px solid #5a4fdc !important;
        color: #fff;
        -webkit-box-shadow: 0 4px 20px rgba(90, 79, 220, 0.15);
        box-shadow: 0 4px 20px rgba(90, 79, 220, 0.15);
    }

    .btn {
        border-radius: 3px;
        padding: 10px 24px;
        font-size: 15px !important;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
        font-weight: 700;
    }

    .center-align-container {
        height: 100%;
        position: relative;
        /*border: 3px solid green;*/

        .center-align-content {
            margin: 0;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
</style>
