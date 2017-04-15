<template>
    <div class="cropper-header">
        <img class="cropper-header-image" v-bind:src="imgUrl" alt="">
        <input class="cropper-header-file" v-on:change="selectHeaderImage" id="file" type="file" accept="image/*"/>
        <img style="display:none;" id="image" src="" alt="">
        <p class="cropper-header-btn">
            <span @click="cropperReset();" class="cropper-header-cancel">取消</span>
            <span @click="cropperCut();" class="cropper-header-select">选取</span>
        </p>
        <p>
            压缩前大小：{{imgPrev}}<br/>
            压缩后大小：{{imgAfter}}
        </p>
    </div>
</template>
<style>
    @import '../style/cropperHeader.css';
    @import '../style/cropper.min.css';
</style>
<script>
    import lrz from 'lrz'
    import 'cropperjs'

    let cropper;
    export default {
        name: 'cropper-header',
        props: [''],
        data () {
            return {
                imgUrl: '',
                imgPrev: 0,
                imgAfter: 0
            }
        },
        components: {},
        methods: {
            //选择头像
            selectHeaderImage(event){
                let image = document.getElementById('image');
                this.imgPrev = `${(parseInt(event.target.files[0].size / 1024) / 1024).toFixed(2)}MB`;
                //图片压缩
                lrz(event.target.files[0]).then((response) => {
                    image.src = response.base64;
                    this.imgAfter = `${(parseInt(response.fileLen / 1024) / 1024).toFixed(2)}MB`;
                    //实例化裁剪对象
                    cropper = new Cropper(image, {
                        aspectRatio: 1,
                        responsive: true,
                        minCropBoxWidth: 50,
                        minCropBoxHeight: 50
                    });
                });
                document.querySelector('#file').value = '';
            },
            //选取
            cropperCut(){
                this.imgUrl = cropper.getCroppedCanvas().toDataURL();
                cropper.destroy();

            },
            //取消
            cropperReset(){
                cropper.destroy();
            }
        },
        mounted(){

        },
        created(){

        }
    }
</script>